using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.ViewModels.Admission
{
    public class AdmissionList
    {
        public long Id { get; set; }
        public string CardNumber { get; set; }
        public string Insured { get; set; }
        public DateTime Date { get; set; }
        public string Hospital { get; set; }
        public string MedicalCase { get; set; }
        public decimal EstimatedCost { get; set; }
        public string Status { get; set; }
        public string StrDate => Date.Day + " " + Date.ToString("MMMM", CultureInfo.InvariantCulture) + " " + Date.Year;

    }

    public class ListAdmissions
    {
        public List<AdmissionList> Addmissions { get; set; }
    }
}
