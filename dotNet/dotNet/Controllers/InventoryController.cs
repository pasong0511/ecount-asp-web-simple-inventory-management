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
using ECount.Util;

namespace dotNet
{
    public class InventoryController : Controller
    {

        public ActionResult Inventory()
        {

            return View();
        }

    }
}