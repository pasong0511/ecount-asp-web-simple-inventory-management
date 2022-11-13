using ECount.Enum;
using ECount.Model;
using ECount.Store;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECount.Dac
{
    class ClientDac
    {
        static IStore<ClientModel> store = StoreResolver.GetStore<ClientModel>();

        //생성 -> 키 제외
        static public string Create(string name, string userId)
        {
            var Client = new ClientModel(name, userId);
            store.Save(Client);

            return Client.Key;
        }

        //수정 -> 키 포함
        static public void Modify(string name, string key, string userId)
        {
            var Client = new ClientModel(name, userId);
            store.Save(Client);
        }

        //삭제 -> 키만
        static public void Del(string key)
        {
            store.Delete(x => x.Key == key);
        }

        static public List<ClientModel> Get()
        {
            return store.GetAll();
        }

        static public ClientModel Get(string name)
        {
            return store.Get(x => x.Name == name);
        }

        static public ClientModel Get(string name, string key)
        {
            return store.Get(x => x.Key == key);
        }

        static public ClientModel GetByKey(string key)
        {
            return store.Get(x => x.Key == key);
        }

    }
}
