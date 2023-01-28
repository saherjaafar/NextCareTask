using Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.ViewModels.User
{
    public class UserLoginResponse
    {
        public long Id { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public Guid LoginToken { get; set; }
        public string JwtToken { get; set; }
        public Role Role{ get; set; }
    }

    public class UserLoginRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class CheckLoginToken
    {
        public Guid Token { get; set; }
        public string Email { get; set; }
    }
}
