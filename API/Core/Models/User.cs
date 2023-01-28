using System;
using System.ComponentModel.DataAnnotations;

namespace Core.Models
{
    public class User
    {
        public long Id { get; set; }

        [Required, MaxLength(50)]
        public string FirstName { get; set; }

        [Required, MaxLength(50)]
        public string LastName { get; set; }

        [Required, EmailAddress]
        public string Email { get; set; }

        [Required, MaxLength(255)]
        public string Password { get; set; }

        public Role Role { get; set; }
        public long RoleId { get; set; }

        [Required]
        public bool IsVerified { get; set; }

        [Required]
        public Guid LoginToken { get; set; }

        [Required]
        public DateTime LoginTokenExpiry { get; set; }
    }
}
