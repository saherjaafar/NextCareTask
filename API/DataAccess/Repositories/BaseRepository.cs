using Core.Cache;
using Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repositories
{
    public class BaseRepository<T> : IBaseRepository<T> where T : class
    {
        protected ApplicationDbContext _context;
        protected CacheManager _cacheManager;

        public BaseRepository(ApplicationDbContext context,CacheManager cacheManager)
        {
            _context = context;
            _cacheManager = cacheManager;
        }

        public T Add(T entity)
        {
            _context.Set<T>().Add(entity);
            return entity;
        }

        public IEnumerable<T> GetAll()
        {
            return _context.Set<T>().ToList();
        }

        public T GetById(long id)
        {
            return _context.Set<T>().Find(id);
        }
    }
}
