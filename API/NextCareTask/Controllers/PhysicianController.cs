using Core;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace NextCareTask.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhysicianController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public PhysicianController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet("list/select")]
        public IActionResult GetListSelect()
        {
            return Ok(_unitOfWork.Physicians.GetListSelect());
        }

        [HttpGet("list/select/{hospitalId}")]
        public IActionResult GetListSelect(long hospitalId)
        {
            return Ok(_unitOfWork.Physicians.GetPhysicianByHospital(hospitalId));
        }
    }
}
