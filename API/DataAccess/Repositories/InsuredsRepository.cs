using Core.Cache;
using Core.Models;
using Core.Repositories;
using Core.ViewModels.Insured;
using Core.ViewModels.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repositories
{
    public class InsuredsRepository : BaseRepository<Insured>, IInsuredRepository
    {
        private readonly CacheManager _cacheManager;
        public InsuredsRepository(ApplicationDbContext context, CacheManager cacheManager) : base(context, cacheManager)
        {
            _cacheManager = cacheManager;
        }

        public string GenerateCardNumber()
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            Random random = new Random();
            bool unique = false;
            string generatedCard = string.Empty;
            while (!unique)
            {
                generatedCard = new string(Enumerable.Repeat(chars, 16)
               .Select(s => s[random.Next(s.Length)]).ToArray());

                if (_context.Insureds.FirstOrDefault(i => i.CardNumber == generatedCard) == null)
                    unique = true;
            }
            return generatedCard;
        }

        public TResponseVM<PublicInsured> GetByCardNumber(string cardNumber)
        {
            var insured = _context.Insureds.FirstOrDefault(i => i.CardNumber == cardNumber);
            if (insured is not null)
            {
                return new TResponseVM<PublicInsured>
                {
                    HasError = false,
                    StatusCode = 200,
                    obj = new PublicInsured
                    {
                        Id = insured.Id,
                        FirstName = insured.FirstName,
                        LastName = insured.LastName,
                        DOB = insured.DOB,
                        Gender = insured.Gender
                    }
                };
            }
            else
                return new TResponseVM<PublicInsured> { HasError = true, StatusCode = 404, Message = $"Card Number {cardNumber} Not Exist" };
        }

        public List<SelectVM> GetListSelect()
        {
            return (from i in _context.Insureds
                    select new 
                    SelectVM { label = i.FirstName + " " + i.LastName, value = i.Id }).ToList();
        }
    }
}
