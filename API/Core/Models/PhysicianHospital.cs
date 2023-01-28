using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models
{
    public class PhysicianHospital
    {
        public long Id { get; set; }
        public Hospital Hospital { get; set; }
        public long HospitalId { get; set; }

        public Physician Physician { get; set; }
        public long PhysicianId { get; set; }
    }
}
