using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Routing;
using System.Web.Security;
using System.Web.SessionState;
using System.Web.Mvc;

namespace dotNet
{
    public class Global : System.Web.HttpApplication
    {

        protected void Application_Start(object sender, EventArgs e)
        {
            // 전역 라우팅 목록
            var routes = RouteTable.Routes;
            var PurchaseRoutes = RouteTable.Routes;
            var SaleRoutes = RouteTable.Routes;
            var InventoryRoutes = RouteTable.Routes;
            var LoginRoutes = RouteTable.Routes;

            // 제품 라우팅 등록 -> 추후 클래스로 만들어서 빼기
            routes.MapRoute("Default"
                , "{controller}/{action}"
                , new { controller = "Hello", action ="Index"} // 라우팅 기본값 부여 가능
            );

            // 구매 라우팅 등록
            PurchaseRoutes.MapRoute("Purchase"
                , "{controller}/{action}"
                , new { controller = "Purchase", action = "Index" } // 라우팅 기본값 부여 가능
            );

            // 구매 라우팅 등록
            SaleRoutes.MapRoute("Sale"
                , "{controller}/{action}"
                , new { controller = "Sale", action = "Index" } // 라우팅 기본값 부여 가능
            );

            // 구매 라우팅 등록
            InventoryRoutes.MapRoute("Inventory"
                , "{controller}/{action}"
                , new { controller = "Inventory", action = "Index" } // 라우팅 기본값 부여 가능
            );

            // 구매 라우팅 등록
            LoginRoutes.MapRoute("Login"
                , "{controller}/{action}"
                , new { controller = "Login", action = "Index" } // 라우팅 기본값 부여 가능
            );
        }

        protected void Session_Start(object sender, EventArgs e)
        {

        }

        protected void Application_BeginRequest(object sender, EventArgs e)
        {

        }

        protected void Application_AuthenticateRequest(object sender, EventArgs e)
        {

        }

        protected void Application_Error(object sender, EventArgs e)
        {

        }

        protected void Session_End(object sender, EventArgs e)
        {

        }

        protected void Application_End(object sender, EventArgs e)
        {

        }
    }
}