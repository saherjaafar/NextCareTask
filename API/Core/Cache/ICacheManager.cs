using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Cache
{
    public interface ICacheManager<T> where T : class
    {
        public void Set(string key, T obj);
        public T Get(string key);
        public void Delete(string key);
        public bool Exist<T>(string key);
    }
}
