using Core;
using Core.ViewModels.Admission;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace NextCareTask.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InsuredController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public InsuredController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet("cardnumber/{cardNumber}")]
        public IActionResult GetByCardNumber(string cardNumber)
        {
            var res = _unitOfWork.Insureds.GetByCardNumber(cardNumber);
            if (!res.HasError)
                return Ok(res.obj);
            else
                return StatusCode(res.StatusCode, res.Message);
        }

        [HttpGet("list/select")]
        public IActionResult GetListSelect()
        {
            return Ok(_unitOfWork.Insureds.GetListSelect());
        }


    }
}
