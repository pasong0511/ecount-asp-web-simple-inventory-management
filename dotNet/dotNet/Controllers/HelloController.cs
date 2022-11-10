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
    public class HelloController: Controller
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

        public ActionResult Purchases()
        {
            return View();
        }

        public ActionResult Sale()
        {
            return View();
        }

        public ActionResult Inventory()
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
        [HttpPost]
        public ActionResult Data(Product data)
        {
            System.Diagnostics.Debug.WriteLine("테스트" + data);
            System.Diagnostics.Debug.WriteLine("테스트 이름" + data.productName);
            System.Diagnostics.Debug.WriteLine("테스트 이름" + data.productType);
            //if (data != null) {
            //    list.Add(data);
            //}
            return new HttpStatusCodeResult(HttpStatusCode.OK);
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


    //public class Product
    //{
    //    //상품의 이름과, 프로덕트 타입 객체를 생성한다.
    //    public string productName;
    //    public string productType;    //enum으로 만든 타입

    //    //생성자
    //    public Product() { }
    //    public Product(string productName, string productType)
    //    {
    //        this.productName = productName;
    //        this.productType = productType;
    //    }
    //}

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