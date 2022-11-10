using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECount.Store
{
    class StoreResolver
    {
        public static IStore<T> GetStore<T>()
        {
            var type = AppConfig.StoreType.MakeGenericType(typeof(T)); // 타입 객체 넘겨주기
            return (IStore<T>)Activator.CreateInstance(type);
        }
    }
}
