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
    public class ClientSDK
    {
        static public string Create(string name,string userId)
        {
            var prevClients = Get();

            foreach (var client in prevClients)
            {
                if (client.Name == name)
                {
                    throw new Exception($"이미 들어간 거래처입니다.");
                }
            }

            return ClientDac.Create(name, userId);
        }

        static public void Modify(string name, string key, string userId)
        {
            ClientDac.Modify(name, key, userId);
        }

        static public List<ClientModel> Get()
        {
            return ClientDac.Get();     //스토어에 있는 모든 클라이언트 모델 정보 가져오기
        }

        static public ClientModel Get(string name)
        {
            return ClientDac.Get(name);
        }

        static public void Del(string key)
        {
            ClientDac.Del(key);
        }

        //userid에 해당하는 등록정보 딕셔너리로 생성 key : userid, value : name
        static public Dictionary<string, List<string>> GetUserClientLists(string userId)
        {

            var clientInfo = new Dictionary<string, List<string>>();
            List<string> list = new List<string>();

            var clients = Get();
            foreach (var client in clients)
            {
                if (client.UserId == userId)        //사용자 정보가 같은 경우 이름 넘김
                {
                    list.Add(client.Name);
                }
            }

            clientInfo.Add(userId, list);
            return clientInfo;
        }
    }
}
