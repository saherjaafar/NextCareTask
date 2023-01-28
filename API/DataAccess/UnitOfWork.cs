using Core;
using Core.Cache;
using Core.JwtAuthentication;
using Core.Models;
using Core.Repositories;
using DataAccess.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ApplicationDbContext _context;
        private readonly IJwtAuthentication _jwt;
        protected readonly CacheManager _cacheManager;

        public IRoleRepository Roles { get; private set; }
        public IUserRepository Users { get; private set; }
        public IHospitalRepository Hospitals { get; private set; }
        public IStatusRepository Statuses { get; private set; }
        public IPhysicianRepository Physicians { get; private set; }
        public IInsuredRepository Insureds { get; private set; }
        public IAdmissionRepository Admissions { get; private set; }
        public IBaseRepository<UserVerification> UserVerifications { get; private set; }

        public UnitOfWork(ApplicationDbContext context, IJwtAuthentication jwt, CacheManager cacheManager)
        {
            _context = context;
            _jwt = jwt;
            _cacheManager = cacheManager;
            Roles = new RoleRepository(_context, _cacheManager);
            Users = new UsersRepository(_context, jwt, _cacheManager);
            Hospitals = new HospitalRepository(_context, _cacheManager);
            Statuses = new StatusRepository(_context,_cacheManager);
            Physicians = new PhysicianRepository(_context,_cacheManager);
            UserVerifications = new BaseRepository<UserVerification>(_context,_cacheManager);
            Admissions = new AdmissionRepository(_context, _cacheManager);
            Insureds = new InsuredsRepository(_context, _cacheManager);
        }

        public void Save()
        {
            _context.SaveChanges();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
