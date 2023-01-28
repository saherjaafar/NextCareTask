using Core.Models;
using Core.ViewModels.Insured;
using Core.ViewModels.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Repositories
{
    public interface IInsuredRepository : IBaseRepository<Insured>
    {
        public string GenerateCardNumber();

        TResponseVM<PublicInsured> GetByCardNumber(string cardNumber);

        public List<SelectVM> GetListSelect();
    }
}
