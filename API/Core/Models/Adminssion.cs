using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models
{
    public class Adminssion
    {
        public long Id { get; set; }

        public Insured Insured { get; set; }
        public long InsuredId { get; set; }

        public Hospital Hospital { get; set; }
        public long HospitalId { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required, MaxLength(255)]
        public string MedicalCase { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal EstimatedCost { get; set; }

        public Physician Physician { get; set; }
        public long PhysicianId { get; set; }

        public Status Status { get; set; }
        public long StatusId { get; set; }

        public string Remarks { get; set; }


    }
}
