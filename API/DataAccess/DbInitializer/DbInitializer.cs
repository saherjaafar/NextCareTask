using Core.Enums;
using Core.Utilities;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.DbInitializer
{
    public class DbInitializer
    {
        public static void Seed(IApplicationBuilder builder)
        {
            using (var serviceScope = builder.ApplicationServices.CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetService<ApplicationDbContext>();

                // Add Role
                var role = new Core.Models.Role
                {
                    Name = "Admin"
                };
                if (!context.Roles.Any())
                {
                    context.Roles.Add(role);
                    context.SaveChanges();
                }

                // Add User
                if (!context.Users.Any())
                {
                    var user = new Core.Models.User
                    {
                        FirstName = "Test",
                        LastName = "User",
                        Email = "test@user.com",
                        IsVerified = true,
                        Password = UtilClass.HashText("p@ssw0rd"),
                        RoleId = role.Id,
                        LoginToken = Guid.NewGuid(),
                        LoginTokenExpiry = DateTime.Now
                    };
                    context.Users.Add(user);
                    context.SaveChanges();

                    var verifications = new Core.Models.UserVerification
                    {
                        EmailToken = Guid.NewGuid(),
                        EmailTokenExpiry = DateTime.Now,
                        PasswordToken = Guid.NewGuid(),
                        PasswordTokenExpiry = DateTime.Now,
                        UserId = user.Id,
                    };
                    context.UserVerifications.Add(verifications);
                    context.SaveChanges();
                }

                // Add Hospital
                if (!context.Hospitals.Any())
                {
                    List<Core.Models.Hospital> hospitals = new List<Core.Models.Hospital>();
                    hospitals.Add(new Core.Models.Hospital { Name = "Hotel Dieu" });
                    hospitals.Add(new Core.Models.Hospital { Name = "AUB" });
                    hospitals.Add(new Core.Models.Hospital { Name = "Ayn w zain" });
                    context.Hospitals.AddRange(hospitals);
                    context.SaveChanges();

                    // Add Physicians
                    List<Core.Models.Physician> physicians = new List<Core.Models.Physician>();
                    physicians.Add(new Core.Models.Physician { FirstName = "Geaorge", LastName = "Boueiz" });
                    physicians.Add(new Core.Models.Physician { FirstName = "Ali", LastName = "Ali" });
                    physicians.Add(new Core.Models.Physician { FirstName = "Michel", LastName = "Rezk" });
                    context.physicians.AddRange(physicians);
                    context.SaveChanges();

                    List<Core.Models.PhysicianHospital> physiciansHospitals = new List<Core.Models.PhysicianHospital>();
                    physiciansHospitals.Add(new Core.Models.PhysicianHospital { HospitalId = hospitals[0].Id, PhysicianId = physicians[0].Id });
                    physiciansHospitals.Add(new Core.Models.PhysicianHospital { HospitalId = hospitals[0].Id, PhysicianId = physicians[1].Id });
                    physiciansHospitals.Add(new Core.Models.PhysicianHospital { HospitalId = hospitals[0].Id, PhysicianId = physicians[2].Id });
                    physiciansHospitals.Add(new Core.Models.PhysicianHospital { HospitalId = hospitals[1].Id, PhysicianId = physicians[1].Id });
                    physiciansHospitals.Add(new Core.Models.PhysicianHospital { HospitalId = hospitals[2].Id, PhysicianId = physicians[2].Id });
                    context.PhysicianHospitals.AddRange(physiciansHospitals);
                    context.SaveChanges();

                }

                // Add Statuses
                if (!context.Statuses.Any())
                {
                    context.Statuses.Add(new Core.Models.Status { Name = "Covered" });
                    context.Statuses.Add(new Core.Models.Status { Name = "Not Covered" });
                    context.Statuses.Add(new Core.Models.Status { Name = "Pending" });
                    context.SaveChanges();
                }

                // Add Insureds
                if (!context.Insureds.Any())
                {
                    context.Insureds.Add(new Core.Models.Insured
                    {
                        CardNumber = "ABGY1E55KSBGT000",
                        CreationDate = DateTime.Now,
                        DOB = new DateTime(1990,01,01),
                        FirstName = "lAMA",
                        LastName = "Khattar",
                        Gender = GenderEnum.Female.ToString(),
                        ModefyDate = DateTime.Now,
                    });
                    context.SaveChanges();
                }
            }
        }
    }
}
