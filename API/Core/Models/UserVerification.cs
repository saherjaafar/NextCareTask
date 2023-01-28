using System;
using System.ComponentModel.DataAnnotations;

namespace Core.Models
{
    public class UserVerification
    {
        public long Id { get; set; }

        public User User { get; set; }
        public long UserId { get; set; }

        [Required]
        public Guid EmailToken { get; set; }

        [Required]
        public DateTime EmailTokenExpiry { get; set; }

        [Required]
        public Guid PasswordToken { get; set; }

        [Required]
        public DateTime PasswordTokenExpiry { get; set; }

    }
}
