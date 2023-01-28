using Core.ViewModels.Insured;
using Core.ViewModels.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.ViewModels.Admission
{
    public class ManageAdmission
    {
        public long AdmissionId { get; set; }
        public string CardNumber { get; set; }
        public long HospitalId { get; set; }
        public DateTime AdmissionDate { get; set; }
        public string MedicalCase { get; set; }
        public decimal Cost { get; set; }
        public long PhysicianId { get; set; }
        public long StatusId { get; set; }
        public string Remarks { get; set; }
    }

    public class AdmissionDetails
    {
        public long AdmissionId { get; set; }
        public string CardNumber { get; set; }
        public PublicInsured Insured { get; set; }
        public SelectVM Hospital { get; set; }
        public DateTime AdmissionDate { get; set; }
        public string MedicalCase { get; set; }
        public decimal Cost { get; set; }
        public SelectVM Physician { get; set; }
        public long Status { get; set; }
        public string Remarks { get; set; }
    }
}
