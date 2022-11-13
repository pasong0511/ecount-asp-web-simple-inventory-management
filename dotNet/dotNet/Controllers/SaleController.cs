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
    public class SaleController : Controller
    {
        public ActionResult Sale()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Sale(SaleCreateModel sale)
        {
            var saleInfo = new Dictionary<string, string>();

            if (saleInfo != null)
            {
                var saleDate = new DateTime(sale.Year, sale.Month, sale.Day);
                System.Diagnostics.Debug.WriteLine($"{saleDate}");
                string key = SaleSDK.Create(sale.ClientName, sale.ProductName, sale.Quantity, saleDate, sale.UserId);
                System.Diagnostics.Debug.WriteLine($"판매 {sale.ClientName}, {sale.ProductName}, {sale.Quantity}, {sale.Year} {sale.Month} {sale.Day}, {sale.UserId}");
                System.Diagnostics.Debug.WriteLine($"키 생성 -> {key}");
                saleInfo.Add("key", key);
            }
            return Json(saleInfo, JsonRequestBehavior.AllowGet);
        }

        //조회
        //아이디 구분 없이 Sale Store에 들어있는 정보 다 줌
        [HttpGet]
        public ActionResult SaleItems()
        {
            List<SaleHistoryModel> sales = new List<SaleHistoryModel>();
            sales = SaleSDK.GetHistory();
            return Json(sales, JsonRequestBehavior.AllowGet);
        }

        //삭제
        [HttpPost]
        public ActionResult SaleDelete(SaleDeleteModel sale)
        {
            System.Diagnostics.Debug.WriteLine($"구매 삭제?! -> {sale.Key} {sale.UserId}");
            SaleSDK.Del(sale.Key);
            return new HttpStatusCodeResult(HttpStatusCode.OK);
        }

        //수정
        [HttpPost]
        public ActionResult SaleModify(SaleModifyModel sale)
        {
            //삭제
            SaleSDK.Del(sale.Key);

            //생성
            var saleDate = new DateTime(sale.Year, sale.Month, sale.Day);
            System.Diagnostics.Debug.WriteLine($"수정 날짜 -> {saleDate}");

            SaleSDK.Modify(sale.ClientName, sale.ClientKey, sale.ProductName, sale.ProductKey, sale.Quantity, saleDate, sale.UserId, sale.Key);

            return new HttpStatusCodeResult(HttpStatusCode.OK);
        }

    }

    public class SaleCreateModel
    {
        public string ClientName { get; set; }
        public string ProductName { get; set; }
        public int Quantity { get; set; }
        public int Year { get; set; }
        public int Month { get; set; }
        public int Day { get; set; }
        public string UserId { get; set; }


        public SaleCreateModel() { }
        public SaleCreateModel(string clientName, string productName, int quantity, int year, int month, int day, string userId, string key)
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

    public class SaleModifyModel
    {
        public string ClientName { get; set; }
        public string ClientKey { get; set; }
        public string ProductName { get; set; }
        public string ProductKey { get; set; }
        public int Quantity { get; set; }
        public int Year { get; set; }
        public int Month { get; set; }
        public int Day { get; set; }
        public string UserId { get; set; }
        public string Key { get; set; }


        public SaleModifyModel() { }
        public SaleModifyModel(string clientName, string clientkey, string productName, string productkey, int quantity, int year, int month, int day, string userId, string key)
        {
            this.ClientName = clientName;
            this.ClientKey = clientkey;
            this.ProductName = productName;
            this.ProductKey = productkey;
            this.Quantity = quantity;
            this.Year = year;
            this.Month = month;
            this.Day = day;
            this.UserId = userId;
            this.Key = key;
        }
    }

    public class SaleDeleteModel
    {
        public string Key { get; set; }
        public string UserId { get; set; }

        public SaleDeleteModel() { }
        public SaleDeleteModel(string key, string userId)
        {
            this.Key = key;
            this.UserId = userId;
        }
    }
}