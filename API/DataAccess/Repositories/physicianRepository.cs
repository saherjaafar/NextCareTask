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
    public class PhysicianRepository : BaseRepository<Physician>, IPhysicianRepository
    {
        private readonly CacheManager _cacheManager;
        public PhysicianRepository(ApplicationDbContext context,CacheManager cacheManager) : base(context,cacheManager)
        {
            _cacheManager = cacheManager;
        }

        public IEnumerable<SelectVM> GetListSelect()
        {
            var Physicians = new List<SelectVM>();
            if (!_cacheManager.Exist<List<SelectVM>>(CacheEnum.PhysiciansSelect.ToString()))
            {
                Physicians = (from p in _context.physicians
                              select new SelectVM { value = p.Id, label = p.FirstName + " " + p.LastName }).ToList();
                _cacheManager.Set<List<SelectVM>>(CacheEnum.PhysiciansSelect.ToString(), Physicians);
            }
            else
                Physicians = _cacheManager.Get<List<SelectVM>>(CacheEnum.PhysiciansSelect.ToString());
            return Physicians;
        }

        public IEnumerable<SelectVM> GetPhysicianByHospital(long hospitalId)
        {
            var Physicians = new List<SelectVM>();
            if (!_cacheManager.Exist<List<SelectVM>>(CacheEnum.PhysiciansSelect.ToString()+"Hospital-"+hospitalId))
            {
                Physicians = (from p in _context.physicians
                              join h in _context.PhysicianHospitals on p.Id equals h.PhysicianId
                              into ph
                              from phJoin in ph.DefaultIfEmpty()
                              where phJoin.HospitalId == hospitalId
                              select new SelectVM { value = p.Id, label = p.FirstName + " " + p.LastName }).ToList();
                _cacheManager.Set<List<SelectVM>>(CacheEnum.PhysiciansSelect.ToString() + "Hospital-" + hospitalId, Physicians);
            }
            else
                Physicians = _cacheManager.Get<List<SelectVM>>(CacheEnum.PhysiciansSelect.ToString() + "Hospital-" + hospitalId);
            return Physicians;
        }
    }
}
