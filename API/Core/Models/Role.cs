using System.ComponentModel.DataAnnotations;

namespace Core.Models
{
    public class Role
    {
        public long Id { get; set; }

        [Required, MaxLength(20)]
        public string Name { get; set; }

    }
}
