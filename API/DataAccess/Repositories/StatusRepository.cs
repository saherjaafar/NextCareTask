using Core.Cache;
using Core.Enums;
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
    public class StatusRepository : BaseRepository<Status>, IStatusRepository
    {
        private readonly CacheManager _cacheManager;
        public StatusRepository(ApplicationDbContext context,CacheManager cacheManager) : base(context,cacheManager)
        {
            _cacheManager = cacheManager;
        }

        public IEnumerable<SelectVM> GetListSelect()
        {
            var statuses = new List<SelectVM>();
            if (!_cacheManager.Exist<List<SelectVM>>(CacheEnum.StatusSelect.ToString()))
            {
                statuses = (from s in _context.Statuses
                            select new SelectVM { value = s.Id, label = s.Name }).ToList();
                _cacheManager.Set<List<SelectVM>>(CacheEnum.StatusSelect.ToString(), statuses);
            }
            else
                statuses = _cacheManager.Get<List<SelectVM>>(CacheEnum.StatusSelect.ToString());
            return statuses;
        }
    }
}
