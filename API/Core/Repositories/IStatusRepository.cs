using Core.Models;
using Core.ViewModels.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Repositories
{
    public interface IStatusRepository : IBaseRepository<Status>
    {
        public IEnumerable<SelectVM> GetListSelect();
    }
}
