﻿using dotNet.Models;
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
            if (login != null) {
                LoginSDK.Create(login.Id, login.Password);
            }

            System.Diagnostics.Debug.WriteLine($"사용자 생성 -> {login.Id},{login.Password}");
            HttpCookie cookie = new HttpCookie("id",login.Id.ToString());
            cookie.Expires = DateTime.Now.AddMinutes(10d);
            Response.Cookies.Add(cookie);
            return new HttpStatusCodeResult(HttpStatusCode.OK);
        }

        //로그아웃
        [HttpGet]
        public ActionResult Logout()
        {
            if (Request.Cookies["id"] != null)
            {
                Response.Cookies["id"].Expires = DateTime.Now.AddDays(-1);
            }
            return new HttpStatusCodeResult(HttpStatusCode.OK);
        }

        //유저 전체 정보 가져옴
        [HttpGet]
        public ActionResult UserList()
        {
            List<LoginModel> userList = new List<LoginModel>();
            userList = LoginSDK.Get();
            return Json(userList, JsonRequestBehavior.AllowGet);
        }
    }
}