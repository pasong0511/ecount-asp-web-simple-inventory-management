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
    class LoginDac
    {
        static IStore<LoginModel> store = StoreResolver.GetStore<LoginModel>();

        //프로덕트 모델 생성
        static public void Create(string id, string password)
        {
            //이름과 타입을 넘겨줘서 생성된 ProductModel를 리스트에 담는다.
            store.Save(new LoginModel(id, password));
        }

        //모든 아이디 찾기
        static public List<LoginModel> Get()
        {
            return store.GetAll();
        }

        //아이디 하나 찾기
        static public LoginModel Get(string id)
        {
            return store.Get(x => x.Id == id);
        }
    }
}
