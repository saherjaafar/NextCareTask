using Core.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Status> Statuses { get; set; }
        public DbSet<Physician> physicians { get; set; }
        public DbSet<Hospital> Hospitals { get; set; }
        public DbSet<PhysicianHospital> PhysicianHospitals { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserVerification> UserVerifications { get; set; }
        public DbSet<Insured> Insureds { get; set; }
        public DbSet<Adminssion> Admissions { get; set; }

    }
}
