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
    public class HospitalRepository : BaseRepository<Hospital>, IHospitalRepository
    {
        private readonly CacheManager _cacheManager;
        public HospitalRepository(ApplicationDbContext context, CacheManager cacheManager) : base(context,cacheManager)
        {
            _cacheManager = cacheManager;
        }

        public IEnumerable<SelectVM> GetListSelect()
        {
            var hospitals = new List<SelectVM>();
            if (!_cacheManager.Exist<List<SelectVM>>(CacheEnum.HospitalSelect.ToString()))
            {
                hospitals = (from h in _context.Hospitals
                             select new SelectVM { value = h.Id, label = h.Name }).ToList();
                _cacheManager.Set<List<SelectVM>>(CacheEnum.HospitalSelect.ToString(), hospitals);
            }
            else
                hospitals = _cacheManager.Get<List<SelectVM>>(CacheEnum.HospitalSelect.ToString());
            return hospitals;
        }
    }
}
