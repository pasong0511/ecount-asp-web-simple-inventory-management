using dotNet.Models;
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

namespace dotNet
{
    public class LoginController : Controller
    {
        static List<Data> list = new List<Data>();

        public ActionResult Login()
        {
            return View();
        }

        //로그인 정보
        [HttpPost]
        public ActionResult Login(LoginModel login)
        {
            System.Diagnostics.Debug.WriteLine($"힘들다");
            if (login != null) {
                System.Diagnostics.Debug.WriteLine($"아이디 -> {login.Id}");
                System.Diagnostics.Debug.WriteLine($"비밀번호 -> {login.Password}");
                LoginSDK.Create(login.Id, login.Password);
            }

            HttpCookie cookie = new HttpCookie("id",login.Id.ToString());
            Response.Cookies.Add(cookie);
            return new HttpStatusCodeResult(HttpStatusCode.OK);
        }

        //유저 전체 정보 가져옴
        [HttpGet]
        public ActionResult UserList()
        {
            List<LoginModel> userList = new List<LoginModel>();
            userList = LoginSDK.Get();
            System.Diagnostics.Debug.WriteLine($"출력 -> {userList}");
            return Json(userList, JsonRequestBehavior.AllowGet);
        }
    }
}