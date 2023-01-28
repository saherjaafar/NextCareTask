using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.JwtAuthentication
{
    public interface IJwtAuthentication
    {
        string UserAuthentication(string Email, string Role);
    }
}
