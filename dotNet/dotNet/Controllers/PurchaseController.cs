using dotNet.Models;
using ECount.Dac;
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
    public class PurchaseController : Controller
    {
        public ActionResult Purchase()
        {
            /*string headerInfo = HttpContext.Request.Headers.Get("Cookie");

            if (headerInfo != null)
            {
                string id = Utile.CookiePaser(headerInfo);
                var productNameList = ProductSDK.GetUserProductLists(id);
                ViewBag.ID = productNameList[id];
            }
            else {
                var productNameList = ProductSDK.Get();
                ViewBag.ID = productNameList;
            }*/

            /*HttpCookie cookie = Request.Cookies["id"];
            System.Diagnostics.Debug.WriteLine($"쿠키 뒤져1 -> {cookie}");
            if (cookie != null)
            {
                string id = cookie.ToString();
                System.Diagnostics.Debug.WriteLine($"쿠키 뒤져2 -> {id}");

                var productNameList = ProductSDK.GetUserProductLists(id);
                ViewBag.ID = productNameList[id];
            }
            else {
                var productNameList = ProductSDK.Get();
                ViewBag.ID = productNameList;
            }*/
           

            return View();
        }

        [HttpPost]
        public ActionResult Purchase(PurcaseCreateModel purchase)
        {
            var purchaseInfo = new Dictionary<string, string>();

            if (purchaseInfo != null) {
                

                var parchaseDate = new DateTime(purchase.Year, purchase.Month, purchase.Day);
                System.Diagnostics.Debug.WriteLine($"{parchaseDate}");                
                
                string key = PurchaseSDK.Create(purchase.ClientName, purchase.ProductName, purchase.Quantity, parchaseDate, purchase.UserId);
                System.Diagnostics.Debug.WriteLine($"구매 {purchase.ClientName}, {purchase.ProductName}, {purchase.Quantity}, {purchase.Year} {purchase.Month} {purchase.Day}, {purchase.UserId}");
                System.Diagnostics.Debug.WriteLine($"키 생성 -> {key}");
                purchaseInfo.Add("key", key);
            }
            //return new HttpStatusCodeResult(HttpStatusCode.OK);
            return Json(purchaseInfo, JsonRequestBehavior.AllowGet);
        }

        //조회
        //아이디 구분 없이 Purchase Store에 들어있는 정보 다 줌
        [HttpGet]
        public ActionResult PurchaseItems()
        {
            List<PurchaseHistoryModel> purchases = new List<PurchaseHistoryModel>();
            //List<PurchaseHistoryModel> purchases2 = new List<PurchaseHistoryModel>();
            purchases = PurchaseSDK.GetHistory();
            //purchases2 = PurchaseDac.GetHistoryAll(DateTime.Now);

            /*System.Diagnostics.Debug.WriteLine($"출력목록 -> {purchases}");

            foreach (var purchase in purchases)
            {
                System.Diagnostics.Debug.WriteLine($"출력 -> {purchase.Product.Name} {purchase.Quantity} {purchase.DateTime.ToString()}");
            }*/

            return Json(purchases, JsonRequestBehavior.AllowGet);
        }


    }

    public class PurcaseCreateModel
    {
        public string ClientName { get; set; }
        public string ProductName { get; set; }
        public int Quantity { get; set; }
        public int Year { get; set; }
        public int Month { get; set; }
        public int Day { get; set; }
        public string UserId { get; set; }


        public PurcaseCreateModel() { }
        //생성용 생성자
        public PurcaseCreateModel(string clientName, string productName, int quantity, int year, int month, int day, string userId)
        {
            this.ClientName = clientName;
            this.ProductName = productName;
            this.Quantity = quantity;
            this.Year = year;
            this.Month = month;
            this.Day = day;
            this.UserId = userId;
        }
    }
}