using dotNet.Models;
using ECount.Enum;
using ECount.Model;
using ECount.SDK;
using ECount.Util;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;

namespace dotNet
{
    public class SaleController : Controller
    {
        public ActionResult Sale()
        {
            /*//쿠키 id로 유저 정보 보내서 select option 체크
            string headerInfo = HttpContext.Request.Headers.Get("Cookie");
            string id = Utile.CookiePaser(headerInfo);
            var productNameList = ProductSDK.GetUserProductLists(id);
            ViewBag.ID = productNameList[id];*/

            return View();
        }

        //등록된 품목명 반환
        [HttpGet]
        public ActionResult ProductLists(string id)
        {
            var productNameList = ProductSDK.GetUserProductLists(id);
            return Json(productNameList, JsonRequestBehavior.AllowGet);
        }
    }
}