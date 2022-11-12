using ECount.Enum;
using ECount.Model;
using ECount.SDK;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using ECount.Util;

namespace dotNet.Controllers
{
    public class ClientController : Controller
    {
        public ActionResult Client()
        {

            return View();
        }

        //생성
        [HttpPost]
        public ActionResult Client(ClientModel client)
        {
            var clientInfo = new Dictionary<string, string>();

            if (client != null)
            {
                string key = ClientSDK.Create(client.Name, client.UserId);
                System.Diagnostics.Debug.WriteLine($"사용자 생성 -> {client.Name}");
                System.Diagnostics.Debug.WriteLine($"키 생성 -> {key}");
                clientInfo.Add("key", key);
            }

            return Json(clientInfo, JsonRequestBehavior.AllowGet);
        }

        //조회
        //아이디 구분 없이 Client Store에 들어있는 정보 다 줌
        [HttpGet]
        public ActionResult ClientItems()
        {
            List<ClientModel> clients = new List<ClientModel>();
            clients = ClientSDK.Get();
            System.Diagnostics.Debug.WriteLine($"출력 -> {clients}");
            return Json(clients, JsonRequestBehavior.AllowGet);
        }

        //삭제
        [HttpPost]
        public ActionResult ClientDelete(ClientDeleteModel data)
        {
            System.Diagnostics.Debug.WriteLine($"삭제?! -> {data.Key} , {data.Name}");
            ClientSDK.Del(data.Key);
            return new HttpStatusCodeResult(HttpStatusCode.OK);
        }

        //수정
        [HttpPost]
        public ActionResult ClientModify(ClientModel data)
        {
            System.Diagnostics.Debug.WriteLine($"수정?! -> {data.Name} {data.Key}");
            ClientSDK.Del(data.Key);
            ClientSDK.Modify(data.Name, data.Key, data.UserId);
            return new HttpStatusCodeResult(HttpStatusCode.OK);
        }


        //*************************** 조회 ***************************
        //등록된 id별 고객명 반환
        [HttpGet]
        public ActionResult ClientLists()
        {    //매개변수 -> string id
            var productNameList = ClientSDK.GetUserClientLists("test");
            return Json(productNameList, JsonRequestBehavior.AllowGet);
        }

        public class ClientDeleteModel
        {
            public string Name { get; set; }
            public string Key { get; set; }

            public ClientDeleteModel() { }
            public ClientDeleteModel(string name, string key)
            {
                this.Name = Name;
                this.Key = key;
            }
        }
    }
}