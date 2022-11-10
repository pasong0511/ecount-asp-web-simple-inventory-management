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
    public class InventoryController : Controller
    {

        static List<Data> list = new List<Data>();

        public ActionResult Inventory()
        {
            return View();
        }

    }
}