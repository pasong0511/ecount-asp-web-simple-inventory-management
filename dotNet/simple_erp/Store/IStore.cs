using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECount.Store
{
    interface IStore<T>
    {
        void Save(T data);
        List<T> GetAll();
        List<T> GetAll(Predicate<T> match);
        T Get(Predicate<T> match);
    }
}
