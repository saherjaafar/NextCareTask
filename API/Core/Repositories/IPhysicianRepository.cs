using Core.Models;
using Core.ViewModels.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Repositories
{
    public interface IPhysicianRepository : IBaseRepository<Physician>
    {
        public IEnumerable<SelectVM> GetListSelect();
        public IEnumerable<SelectVM> GetPhysicianByHospital(long hospitalId);

    }
}
