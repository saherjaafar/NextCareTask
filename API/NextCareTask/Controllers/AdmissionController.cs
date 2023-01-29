using ClosedXML.Excel;
using Core;
using Core.Consts;
using Core.Models;
using Core.ViewModels.Admission;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq.Expressions;

namespace NextCareTask.Controllers
{
    //[Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class AdmissionController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public AdmissionController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet("{admissionId}")]
        public IActionResult GetById(long admissionId)
        {
            var res = _unitOfWork.Admissions.Get(admissionId);
            if (!res.HasError)
                return Ok(res.obj);
            else
                return StatusCode(res.StatusCode, res.Message);
        }

        [HttpGet("list")]
        public IActionResult GetList(long? insuredId, long? statusId,long? hospitalId, long? physicianId,DateTime? startDate, DateTime? endDate,string orderBy = "ASC")
        {
            var criteria = _unitOfWork.Admissions.GenerateCriterias(insuredId, statusId, hospitalId, physicianId, startDate, endDate);

            var res = _unitOfWork.Admissions.List(criteria,null,null,b => b.Id,orderBy);
            return Ok(res);
        }

        [HttpPost("add")]
        public IActionResult Add([FromBody] ManageAdmission body)
        {
            var res = _unitOfWork.Admissions.Add(body);
            if (!res.HasError)
                return StatusCode(res.StatusCode, res.obj);
            else
                return StatusCode(res.StatusCode, res.Message);
        }

        [HttpPost("ExportToExcel")]
        public IActionResult ExportToExcel([FromBody] ListAdmissions body)
        {
            var content = _unitOfWork.Admissions.ExportToExcel(body);
            using (var workbook = new XLWorkbook())
            {
                using (var stream = new MemoryStream())
                {
                    return File(content, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "Admissions.xlsx");
                }
            }
        }

        [HttpPost("ExportToPdf")]
        public IActionResult ExportToPdf([FromBody] ListAdmissions body)
        {
            var content = _unitOfWork.Admissions.ExportToPdf(body);
            return content;
        }

        [HttpPut("update")]
        public IActionResult Update([FromBody] ManageAdmission body)
        {
            var res = _unitOfWork.Admissions.Update(body);
            if (!res.HasError)
                return StatusCode(res.StatusCode, res.obj);
            else
                return StatusCode(res.StatusCode, res.Message);
        }


    }
}
