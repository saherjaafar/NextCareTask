using System;
using System.ComponentModel.DataAnnotations;

namespace Core.Models
{
    public class Insured
    {
        public long Id { get; set; }

        [Required, MaxLength(50)]
        public string FirstName { get; set; }

        [Required, MaxLength(50)]
        public string LastName { get; set; }

        [Required]
        public DateTime DOB { get; set; }

        [Required]
        public string Gender { get; set; }

        [Required, StringLength(16)]
        public string CardNumber { get; set; }

        public DateTime CreationDate { get; set; }

        public DateTime ModefyDate { get; set; }
    }
}
