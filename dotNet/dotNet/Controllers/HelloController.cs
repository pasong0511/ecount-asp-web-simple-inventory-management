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
    // controller : *Controller로 작성된 컨트롤러는 url에 ~/* 경로를 통해 접근가능 
    public class HelloController : Controller
    {
        static List<Data> list = new List<Data>();

        // action
        public ActionResult Index()
        {
            // return type string
            //return "hello~"; 
            if (!System.IO.File.Exists("testFile.txt")) {
                System.IO.File.Create("testFile.txt");
            }

            // return type ActionResult
            //return Content("hello~");
            ViewBag.Title = "제목입니다";
            return View(new Person("차은우", 24));

            // View탐색 규칙
            // 기본탐색: /Views? > /컨트롤러명? > /액션명.cshtml
        }

        public ActionResult SecondPage()
        {
            return View();
        }

        public ActionResult Product()
        {
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
            if (product != null) {
                ProductSDK.Create(product.Name, product.Type);
                System.Diagnostics.Debug.WriteLine($"생성 -> {product.Name} {product.Type}");
            }
            return new HttpStatusCodeResult(HttpStatusCode.OK);
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

        //--> dlProduct에 들어있는 정보 하나만 줌
        //[HttpGet]
        //public ActionResult ProductItem()
        //{
        //    List<ProductModel> products = new List<ProductModel>();
        //    products = ProductSDK.Get();
        //    System.Diagnostics.Debug.WriteLine($"출력 -> {products}");
        //    return Json(products, JsonRequestBehavior.AllowGet);
        //}

        //[HttpPost]
        //public ActionResult Data(Product product)
        //{
        //    System.Diagnostics.Debug.WriteLine($"밖?");
        //    System.Diagnostics.Debug.WriteLine($"{product} {product.productName} {product.productType}");

        //    if (product != null) {
        //        //ProductSDK.Create(product.Name, product.Type);
        //        System.Diagnostics.Debug.WriteLine($"안?");
        //        System.Diagnostics.Debug.WriteLine($"{product.productName} {product.productType}");
        //    }
        //    return new HttpStatusCodeResult(HttpStatusCode.OK);
        //}
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