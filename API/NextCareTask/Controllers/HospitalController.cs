using Core;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace NextCareTask.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HospitalController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public HospitalController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet("list/select")]
        public IActionResult GetListSelect()
        {
            return Ok(_unitOfWork.Hospitals.GetListSelect());
        }
    }
}
