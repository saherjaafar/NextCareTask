using Core.Models;
using Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core
{
    public interface IUnitOfWork : IDisposable
    {
        IRoleRepository Roles { get; }
        IUserRepository Users { get; }
        IHospitalRepository Hospitals { get; }
        IStatusRepository Statuses { get; }
        IPhysicianRepository Physicians { get; }
        IInsuredRepository Insureds { get; }
        IAdmissionRepository Admissions { get; }
        IBaseRepository<UserVerification> UserVerifications { get; }

        void Save();
    }
}
