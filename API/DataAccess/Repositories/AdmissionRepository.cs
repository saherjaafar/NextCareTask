using Aspose.Pdf;
using ClosedXML.Excel;
using Core.Cache;
using Core.Consts;
using Core.Enums;
using Core.Models;
using Core.Repositories;
using Core.ViewModels.Admission;
using Core.ViewModels.Response;
using Microsoft.AspNetCore.Mvc;
using Serilog;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repositories
{
    public class AdmissionRepository : BaseRepository<Adminssion>, IAdmissionRepository
    {
        private readonly CacheManager _cacheManager;
        public AdmissionRepository(ApplicationDbContext context, CacheManager cacheManager) : base(context, cacheManager)
        {
            _cacheManager = cacheManager;
        }

        public List<AdmissionList> List(List<Expression<Func<Adminssion, bool>>> criteria, int? take, int? skip, Expression<Func<AdmissionList, object>> orderBy = null, string orderByDirection = OrderBy.Ascending)
        {
            var qqq = _context.Admissions.Where(i => i.InsuredId == 1).ToList();

            IQueryable<Adminssion> adminssions = _context.Admissions.AsQueryable();
            if (criteria != null)
            {
                foreach (var x in criteria)
                    adminssions = adminssions.Where(x);
            }

            IQueryable<AdmissionList> query = (from a in adminssions
                                               join h in _context.Hospitals on a.HospitalId equals h.Id
                                               into ah
                                               from ahJoin in ah.DefaultIfEmpty()

                                               join s in _context.Statuses on a.StatusId equals s.Id
                                               into sa
                                               from saJoin in sa.DefaultIfEmpty()

                                               join i in _context.Insureds on a.InsuredId equals i.Id
                                               into ai
                                               from aiJoin in ai.DefaultIfEmpty()

                                               select new AdmissionList
                                               {
                                                   Id = a.Id,
                                                   Date = a.Date,
                                                   Hospital = ahJoin.Name,
                                                   Status = saJoin.Name,
                                                   Insured = aiJoin.FirstName + " " + aiJoin.LastName,
                                                   CardNumber = aiJoin.CardNumber,
                                                   EstimatedCost = a.EstimatedCost,
                                                   MedicalCase = a.MedicalCase,
                                               });
            if (take.HasValue)
                query = query.Take(take.Value);
            if (skip.HasValue)
                query.Skip(skip.Value);
            if (orderBy != null)
            {
                if (orderByDirection == OrderBy.Ascending)
                    query.OrderBy(orderBy).GroupBy(x => x.Date);
                else
                    query = query.OrderByDescending(orderBy);
            }
            return query.ToList();
        }

        public TResponseVM<AdmissionDetails> Get(long admissionId)
        {
            var admission = new AdmissionDetails();
            if (!_cacheManager.Exist<AdmissionDetails>(CacheEnum.Admission.ToString() + admissionId))
            {
                admission = (from a in _context.Admissions
                             join h in _context.Hospitals on a.HospitalId equals h.Id
                             into ah
                             from ahJoin in ah.DefaultIfEmpty()

                             join p in _context.physicians on a.PhysicianId equals p.Id
                             into ap
                             from apJoin in ap.DefaultIfEmpty()

                             join i in _context.Insureds on a.InsuredId equals i.Id
                             into ai
                             from aiJoin in ai.DefaultIfEmpty()

                             where a.Id == admissionId
                             select new AdmissionDetails
                             {
                                 AdmissionDate = a.Date,
                                 AdmissionId = a.Id,
                                 CardNumber = aiJoin.CardNumber,
                                 Cost = a.EstimatedCost,
                                 Hospital = new SelectVM { value = ahJoin.Id, label = ahJoin.Name },
                                 Insured = new Core.ViewModels.Insured.PublicInsured
                                 {
                                     FirstName = aiJoin.FirstName,
                                     LastName = aiJoin.LastName,
                                     DOB = aiJoin.DOB,
                                     Gender = aiJoin.Gender,
                                 },
                                 MedicalCase = a.MedicalCase,
                                 Physician = new SelectVM { value = apJoin.Id, label = apJoin.FirstName + " " + apJoin.LastName },
                                 Remarks = a.Remarks,
                                 Status = a.StatusId
                             }).FirstOrDefault();
                if (admission is not null)
                    _cacheManager.Set<AdmissionDetails>(CacheEnum.Admission.ToString() + admissionId, admission);
            }
            else
                admission = _cacheManager.Get<AdmissionDetails>(CacheEnum.Admission.ToString() + admissionId);


            if (admission is not null)
                return new TResponseVM<AdmissionDetails> { HasError = false, StatusCode = 200, obj = admission };
            else
                return new TResponseVM<AdmissionDetails> { HasError = true, StatusCode = 404, Message = $"Admission Id {admissionId} Not Exist" };
        }

        public TResponseVM<Adminssion> Add(ManageAdmission vm)
        {
            // check card number
            var insured = _context.Insureds.FirstOrDefault(i => i.CardNumber == vm.CardNumber);
            if (insured is not null)
            {
                Adminssion adminssion = new Adminssion
                {
                    Date = vm.AdmissionDate,
                    EstimatedCost = vm.Cost,
                    HospitalId = vm.HospitalId,
                    MedicalCase = vm.MedicalCase,
                    PhysicianId = vm.PhysicianId,
                    Remarks = vm.Remarks,
                    StatusId = vm.StatusId,
                    InsuredId = insured.Id
                };
                _context.Add(adminssion);
                _context.SaveChanges();
                return new TResponseVM<Adminssion> { HasError = false, StatusCode = 200, obj = adminssion };
            }
            else
                return new TResponseVM<Adminssion> { HasError = true, StatusCode = 404, Message = $"Card Number Not Exist" };
        }

        public TResponseVM<Adminssion> Update(ManageAdmission vm)
        {
            var admission = _context.Admissions.FirstOrDefault(i => i.Id == vm.AdmissionId);
            if (admission is not null)
            {
                admission.StatusId = vm.StatusId;
                admission.MedicalCase = vm.MedicalCase;
                admission.MedicalCase = vm.MedicalCase;
                admission.HospitalId = vm.HospitalId;
                admission.PhysicianId = vm.PhysicianId;
                admission.Remarks = vm.Remarks;
                admission.EstimatedCost = vm.Cost;
                admission.Date = vm.AdmissionDate;

                _context.SaveChanges();
                _cacheManager.Remove(CacheEnum.Admission.ToString() + admission.Id);
                return new TResponseVM<Adminssion> { HasError = false, StatusCode = 200, obj = admission };
            }
            else
                return new TResponseVM<Adminssion> { HasError = true, StatusCode = 404, Message = $"Admission Id {vm.AdmissionId} Not Exist" };
        }

        public List<Expression<Func<Adminssion, bool>>> GenerateCriterias(long? insuredId, long? statusId, long? hospitalId, long? physicianId, DateTime? startDate, DateTime? endDate)
        {
            List<Expression<Func<Adminssion, bool>>> criteria = new List<Expression<Func<Adminssion, bool>>>();
            if (insuredId.HasValue)
                criteria.Add(c => c.InsuredId == insuredId);
            if (statusId.HasValue)
                criteria.Add(c => c.StatusId == statusId);
            if (hospitalId.HasValue)
                criteria.Add(c => c.HospitalId == hospitalId);
            if (physicianId.HasValue)
                criteria.Add(c => c.PhysicianId == physicianId);
            if (startDate.HasValue)
                criteria.Add(c => c.Date > startDate);
            if (endDate.HasValue)
                criteria.Add(c => c.Date < endDate);
            return criteria;
        }

        public byte[] ExportToExcel(ListAdmissions admissions)
        {
            using (var workbook = new XLWorkbook())
            {
                var worksheet = workbook.Worksheets.Add("Admissions");
                var currentRow = 1;

                #region Header
                worksheet.Cell(currentRow, 1).Value = "Date";
                worksheet.Cell(currentRow, 2).Value = "Card Number";
                worksheet.Cell(currentRow, 3).Value = "Name";
                worksheet.Cell(currentRow, 4).Value = "Name";
                worksheet.Cell(currentRow, 5).Value = "Medical Case";
                worksheet.Cell(currentRow, 6).Value = "Estimated Cost";
                worksheet.Cell(currentRow, 7).Value = "Status";
                #endregion

                foreach (var admission in admissions.Addmissions)
                {
                    currentRow++;
                    worksheet.Cell(currentRow, 1).Value = admission.StrDate;
                    worksheet.Cell(currentRow, 2).Value = admission.CardNumber;
                    worksheet.Cell(currentRow, 3).Value = admission.Insured;
                    worksheet.Cell(currentRow, 4).Value = admission.Hospital;
                    worksheet.Cell(currentRow, 5).Value = admission.MedicalCase;
                    worksheet.Cell(currentRow, 6).Value = admission.EstimatedCost;
                    worksheet.Cell(currentRow, 7).Value = admission.Status;
                }

                using(var stream = new MemoryStream())
                {
                    workbook.SaveAs(stream);
                    var content = stream.ToArray();
                    return content;
                }
            }
        }

        public FileContentResult ExportToPdf(ListAdmissions admissionsList)
        {
            try
            {
                Log.Information("admissions List", admissionsList);
                var document = new Document
                {
                    PageInfo = new PageInfo
                    {
                        Margin = new MarginInfo(28, 28, 28, 40)
                    }
                };
                var pdfPage = document.Pages.Add();
                Table table = new Table
                {
                    ColumnWidths = "15% 15% 15% 15% 15% 10% 15%",
                    DefaultCellPadding = new MarginInfo(10, 5, 10, 5),
                    Border = new BorderInfo(BorderSide.All, .5f, Color.Black),
                    DefaultCellBorder = new BorderInfo(BorderSide.All, .2f, Color.Black),
                };

                DataTable dt = new DataTable();
                dt.Columns.Add("Date");
                dt.Columns.Add("Card Number");
                dt.Columns.Add("Name");
                dt.Columns.Add("Hospital");
                dt.Columns.Add("Medical Case");
                dt.Columns.Add("Estimated Cost");
                dt.Columns.Add("Status");

                foreach (var admission in admissionsList.Addmissions)
                {
                    var row = dt.NewRow();

                    row["Date"] = admission.StrDate;
                    row["Card Number"] = admission.CardNumber;
                    row["Name"] = admission.Insured;
                    row["Hospital"] = admission.Hospital;
                    row["Medical Case"] = admission.MedicalCase;
                    row["Estimated Cost"] = admission.EstimatedCost;
                    row["Status"] = admission.Status;
                    dt.Rows.Add(row);
                }

                table.ImportDataTable(dt, true, 0, 0);
                document.Pages[1].Paragraphs.Add(table);

                using (var stream = new MemoryStream())
                {
                    document.Save(stream);
                    return new FileContentResult(stream.ToArray(), "application/pdf")
                    {
                        FileDownloadName = "Admissions.pdf"
                    };
                }
            }
            catch(Exception ex)
            {
                return null;
            }
        }
    }
}
