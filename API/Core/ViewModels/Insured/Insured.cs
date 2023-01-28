using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.ViewModels.Insured
{
    public class PublicInsured
    {
        public long Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName => FirstName + " " + LastName;
        public DateTime DOB { get; set; }
        public string StrDob => DOB.Day + " " + DOB.ToString("MMMM", CultureInfo.InvariantCulture) + " " + DOB.Year;
        public string Gender { get; set; }
    }
}
