using Core.Models;
using Core.ViewModels.Response;
using Core.ViewModels.User;
using System;

namespace Core.Repositories
{
    public interface IUserRepository : IBaseRepository<User>
    {
        TResponseVM<UserLoginResponse> Login(UserLoginRequest request);

        TResponseVM<UserLoginResponse> CheckLoginToken(CheckLoginToken request);

        void UpdateLoginToken(long userId, Guid token);

    }
}
