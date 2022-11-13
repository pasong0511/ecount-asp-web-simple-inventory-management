using ECount.Enum;
using ECount.Model;
using ECount.SDK;
using dotNet.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;

namespace dotNet
{
    public class HelloController : Controller
    {
        static List<Data> list = new List<Data>();

        // action
        public ActionResult Index()
        {
            ViewBag.Title = "제목입니다";
            return View(new Person("차은우", 24));
        }

        public ActionResult Product()
        {
            ViewBag.Test = ProductSDK.Get();
            return View();
        }

        // GET API
        public ActionResult Data()
        {
            //var list = new object[] {
            //    new { Content = "운동하기" },
            //    new { Content = "게임하기" },
            //    new { Content = "영화보기" },
            //};

            return Json(list, JsonRequestBehavior.AllowGet);
        }

        // POST API
        // Content하나만 받아왔을때 된다.
        //[HttpPost]
        //public ActionResult Data(Data data)
        //{
        //    System.Diagnostics.Debug.WriteLine("테스트->" + data);
        //    System.Diagnostics.Debug.WriteLine("테스트->" + data.Content);
        //    if (data != null) {
        //        list.Add(data);
        //    }
        //    return new HttpStatusCodeResult(HttpStatusCode.OK);
        //}

        // POST API
        //[HttpPost]
        //public ActionResult Data(Product data)
        //{
        //    System.Diagnostics.Debug.WriteLine("테스트" + data);
        //    System.Diagnostics.Debug.WriteLine("테스트 이름" + data.productName);
        //    System.Diagnostics.Debug.WriteLine("테스트 이름" + data.productType);
        //    //if (data != null) {
        //    //    list.Add(data);
        //    //}
        //    return new HttpStatusCodeResult(HttpStatusCode.OK);
        //}

        //POST API
        //[HttpPost]
        //public ActionResult Data(Product data)
        //{
        //    System.Diagnostics.Debug.WriteLine("테스트" + data);
        //    System.Diagnostics.Debug.WriteLine("테스트 이름" + data.productName);
        //    System.Diagnostics.Debug.WriteLine("테스트 이름" + data.productType);
        //    //if (data != null) {
        //    //    list.Add(data);
        //    //}
        //    return new HttpStatusCodeResult(HttpStatusCode.OK);
        //}

        //Product 생성
        [HttpPost]
        public ActionResult Product(ProductModel product)
        {
            var productInfo = new Dictionary<string, string>();

            if (product != null) {
                string key = ProductSDK.Create(product.Name, product.Type, product.SafeQuantity, product.userId);
                System.Diagnostics.Debug.WriteLine($"상품 생성 -> {product.Name} {product.Type} {product.SafeQuantity} {product.userId}");
                System.Diagnostics.Debug.WriteLine($"키 생성 -> {key}");
                productInfo.Add("key", key);
            }

            return Json(productInfo, JsonRequestBehavior.AllowGet);
        }

        //Product 들어있는 정보 다 줌
        [HttpGet]
        public ActionResult ProductItems()
        {
            List<ProductModel> products = new List<ProductModel>();
            products = ProductSDK.Get();
            System.Diagnostics.Debug.WriteLine($"출력 -> {products}");
            return Json(products, JsonRequestBehavior.AllowGet);
        }

        //삭제
        [HttpPost]
        public ActionResult ProductDelete(DeleteModel data)
        {
            ProductSDK.Del(data.Key);
            return new HttpStatusCodeResult(HttpStatusCode.OK);
        }

        //수정
        [HttpPost]
        public ActionResult ProductModify(ProductModel data)
        {
            System.Diagnostics.Debug.WriteLine($"수정오냐?! -> {data.Name} {data.Type} {data.Key} {data.SafeQuantity} {data.userId}");
            ProductSDK.Del(data.Key);
            ProductSDK.Modify(data.Name, data.Type, data.Key, data.SafeQuantity, data.userId);

            return new HttpStatusCodeResult(HttpStatusCode.OK);
        }
    }

    /*public class UserIdModel
    {
        public string UserId { get; set; }

        public UserIdModel() { }
        public UserIdModel(string userId)
        {
            this.UserId = userId;
        }
    }*/

    public class DeleteModel
    {
        public string Key { get; set; }
        public string userId { get; set; }

        public DeleteModel() { }
        public DeleteModel(string key, string userId)
        {
            this.Key = key;
            this.userId = userId;
        }
    }

    public class Data
    {
        public string Content { get; set; }

        public Data() { } // 주고받을 애들은 기본생성자를 꼭 제공해주기.
        public Data(string content)
        {
            this.Content = content;
        }
    }


    public class Product
    {
        public string productName { get; set; }
        public string productType { get; set; }

        public Product() { }
        public Product(string productName, string productType)
        {
            this.productName = productName;
            this.productType = productType;
        }

        public override string ToString()
        {
            return $"({this.productName}, {this.productType})";
        }
    }
}