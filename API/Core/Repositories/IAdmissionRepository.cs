using Core.Consts;
using Core.Models;
using Core.ViewModels.Admission;
using Core.ViewModels.Response;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Core.Repositories
{
    public interface IAdmissionRepository : IBaseRepository<Adminssion>
    {
        public List<AdmissionList> List(List<Expression<Func<Adminssion, bool>>>? criteria, int? take, int? skip, Expression<Func<AdmissionList, object>> orderBy = null, string orderByDirection = OrderBy.Ascending);
        TResponseVM<Adminssion> Add(ManageAdmission admission);
        TResponseVM<Adminssion> Update(ManageAdmission admission);
        TResponseVM<AdmissionDetails> Get(long admissionId);
        List<Expression<Func<Adminssion, bool>>> GenerateCriterias(long? insuredId, long? statusId, long? hospitalId, long? physicianId, DateTime? startDate, DateTime? endDate);

        public byte[] ExportToExcel(ListAdmissions admissions);
        public FileContentResult ExportToPdf(ListAdmissions admissions);
    }
}
