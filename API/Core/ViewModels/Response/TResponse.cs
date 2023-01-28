using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.ViewModels.Response
{
    public class TResponseVM<T>
    {
        public bool HasError { get; set; }
        public int StatusCode { get; set; }
        public T obj { get; set; }
        public List<T> ListObj { get; set; }
        public string Message { get; set; }
    }
}
