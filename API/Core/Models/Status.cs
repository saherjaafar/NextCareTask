using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Models
{
    public class Status
    {
        public long Id { get; set; }

        [Required, MaxLength(20)]
        public string Name { get; set; }
    }
}
