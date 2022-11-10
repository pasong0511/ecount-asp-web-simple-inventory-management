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
    public class PurchaseController : Controller
    {

        static List<Data> list = new List<Data>();

        public ActionResult Purchase()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Purchase(Data data)
        {
            if (data != null) {
                //ECount.SDK.PurchaseSDK.Create(data.productName, data.quantity, data.dateTime);
                //System.Diagnostics.Debug.WriteLine($"생성 -> {data.productName} {data.quantity} {data.dateTime}");
            }
            return new HttpStatusCodeResult(HttpStatusCode.OK);
        }




    }

    /*[SubscribeProduct(ProductEvent.ChangeProduct)]
    public void onChangeProduct(Event eventObj, object payload)
    {
        this.setComboBox();
    }*/

    public class Purcase
    {
        public string ProductName { get; set; }
        public int Quantity { get; set; }
        public string DateTime { get; set; }

        public Purcase() { }
        public Purcase(string productName, int quantity, string dateTime)
        {
            this.ProductName = productName;
            this.Quantity = quantity;
            this.DateTime = dateTime;
        }

        public override string ToString()
        {
            return $"({this.ProductName}, {this.Quantity}, {this.DateTime})";
        }
    }
}