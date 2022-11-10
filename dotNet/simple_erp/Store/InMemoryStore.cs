using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECount.Store
{
    // 클래스를 만들 때 공개여부는 항상 고민해야함
    class InMemoryStore<T> : IStore<T>
    {
        List<T> store = new List<T>();

        public void Save(T data)
        {
            store.Add(data);
        }

        public List<T> GetAll()
        {
            return store;
        }

        public List<T> GetAll(Predicate<T> match)
        {
            return store.FindAll(match);
        }

        // 람다식 받기
        public T Get(Predicate<T> match)
        {
            return store.Find(match);
        }



    }
}
