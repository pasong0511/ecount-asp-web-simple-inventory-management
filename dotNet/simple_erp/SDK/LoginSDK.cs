using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECount.Store;
using ECount.Model;
using ECount.Enum;
using ECount.Dac;

namespace ECount.SDK
{
    public class LoginSDK
    {
        static public void Create(string id, string password)
        {
            var prevUser = Get();

            System.Diagnostics.Debug.WriteLine($"생성 -> {id} {password}");

            LoginDac.Create(id, password);
        }

        //아무것도 넘기지 않고 GET 요청을 통해 ProductModel : Name, ProductType 반환 요청
        static public List<LoginModel> Get()
        {
            return LoginDac.Get();
        }

        //아이디 넘겨서 특정 아이디
        static public LoginModel Get(string id)
        {
            return LoginDac.Get(id);
        }
    }
}
