using Core.Cache;
using Core.Models;
using Core.Repositories;
using Core.ViewModels.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repositories
{
    public class RoleRepository : BaseRepository<Role>, IRoleRepository
    {
        private readonly CacheManager _cacheManager;
        public RoleRepository(ApplicationDbContext context,CacheManager cacheManager) : base(context,cacheManager)
        {
            _cacheManager = cacheManager;
        }

        public IEnumerable<SelectVM> GetSelectRoles()
        {
            var roles = (from r in _context.Roles
                         select new SelectVM
                         {
                             label = r.Name,
                             value = r.Id
                         }).ToList();
            return roles;
        }
    }
}
