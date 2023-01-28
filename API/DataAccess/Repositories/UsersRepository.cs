using Core.Cache;
using Core.JwtAuthentication;
using Core.Models;
using Core.Repositories;
using Core.Utilities;
using Core.ViewModels.Response;
using Core.ViewModels.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repositories
{
    public class UsersRepository : BaseRepository<User>, IUserRepository
    {
        private readonly IJwtAuthentication _jwt;
        private readonly CacheManager _cacheManager;
        public UsersRepository(ApplicationDbContext context, IJwtAuthentication jwt, CacheManager cacheManager) : base(context,cacheManager)
        {
            _jwt = jwt;
            _cacheManager = cacheManager;
        }

        public TResponseVM<UserLoginResponse> CheckLoginToken(CheckLoginToken request)
        {
            var user = (from u in _context.Users
                       join v in _context.UserVerifications on u.Id equals v.UserId
                       into uv
                       from uvJoin in uv.DefaultIfEmpty()
                       
                       join r in _context.Roles on u.RoleId equals r.Id
                       into ur
                       from urJoin in ur.DefaultIfEmpty()
                       where u.Email == request.Email
                       select new
                       {
                           u.Id,
                           u.LoginToken,
                           u.LoginTokenExpiry,
                           u.Email,
                           u.FirstName,
                           u.LastName,
                           u.RoleId,
                           Role = urJoin.Name
                       }).FirstOrDefault();

            if (user is not null)
            {
                Guid newToken = Guid.NewGuid();
                UpdateLoginToken(user.Id, newToken);
                var token = _jwt.UserAuthentication(user.Email, user.Role);
                return new TResponseVM<UserLoginResponse>
                {
                    HasError = false,
                    StatusCode = 200,
                    obj = new UserLoginResponse
                    {
                        Email = user.Email,
                        FullName = user.FirstName + " " + user.LastName,
                        Id = user.Id,
                        JwtToken = token,
                        LoginToken = newToken,
                        Role = _context.Roles.FirstOrDefault(i => i.Id == user.RoleId)
                    }
                };
            }
            else
                return new TResponseVM<UserLoginResponse> { HasError = true, StatusCode = 401, Message = "Invalid Token" };
        }

        public TResponseVM<UserLoginResponse> Login(UserLoginRequest request)
        {
            var user = (from u in _context.Users
                        join r in _context.Roles on u.RoleId equals r.Id
                        into ur
                        from urJoin in ur.DefaultIfEmpty()
                        where u.Email == request.Email
                        select new
                        {
                            u.Id,
                            u.Password,
                            u.Email,
                            RoleId = u.RoleId,
                            Role = urJoin.Name,
                            u.IsVerified,
                            u.LoginToken,
                            u.LoginTokenExpiry,
                            u.FirstName,
                            u.LastName
                        }).FirstOrDefault();
            if (user is not null)
            {
                if (UtilClass.ValidateHash(request.Password, user.Password))
                {
                    if (user.IsVerified)
                    {
                        Guid newToken = Guid.NewGuid();
                        UpdateLoginToken(user.Id, newToken);
                        var token = _jwt.UserAuthentication(user.Email, user.Role);
                        return new TResponseVM<UserLoginResponse>
                        {
                            HasError = false,
                            StatusCode = 200,
                            obj = new UserLoginResponse
                            {
                                Email = user.Email,
                                FullName = user.FirstName + " " + user.LastName,
                                Id = user.Id,
                                JwtToken = token,
                                LoginToken = newToken,
                                Role = _context.Roles.FirstOrDefault(i => i.Id == user.RoleId)
                            }
                        };
                    }
                    else
                        return new TResponseVM<UserLoginResponse> { HasError = true, StatusCode = 401, Message = "Please Verify Your Account" };
                }
                else
                    return new TResponseVM<UserLoginResponse> { HasError = true, StatusCode = 404, Message = "Invalid Username or password" };
            }
            else
                return new TResponseVM<UserLoginResponse> { HasError = true, StatusCode = 404, Message = "Invalid Username or password" };
        }

        public void UpdateLoginToken(long userId, Guid token)
        {
            var user = _context.Users.FirstOrDefault(i => i.Id == userId);
            user.LoginToken = token;
            user.LoginTokenExpiry = DateTime.Now;
            _context.SaveChanges();
        }
    }
}
