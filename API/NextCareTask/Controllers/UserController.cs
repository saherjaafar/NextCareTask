using Core;
using Core.Models;
using Core.Repositories;
using Core.ViewModels.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace NextCareTask.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public UserController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [Authorize]
        [HttpGet("{id}")]
        public IActionResult GetById(long id)
        {
            var user = _unitOfWork.Users.GetById(id);
            if (user is not null)
                return Ok(user);
            else
                return NotFound($"User Id {id} Not Exist");
        }


        [HttpPost("Login")]
        public IActionResult Login([FromBody] UserLoginRequest user)
        {
            var res = _unitOfWork.Users.Login(user);
            if (!res.HasError)
                return Ok(res.obj);
            else
                return StatusCode(res.StatusCode, res.Message);
        }

        [HttpPost("CheckLoginToken")]
        public IActionResult CheckLoginToken([FromBody] CheckLoginToken body)
        {
            var res = _unitOfWork.Users.CheckLoginToken(body);
            if (!res.HasError)
                return Ok(res.obj);
            else
                return StatusCode(res.StatusCode, res.Message);
        }
    }
}
