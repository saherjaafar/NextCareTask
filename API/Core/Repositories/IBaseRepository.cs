using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Repositories
{
    public interface IBaseRepository<T> where T : class
    {
        T GetById(long id);

        IEnumerable<T> GetAll();

        T Add(T entity);
    }
}
