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
            var ClientRoutes = RouteTable.Routes;

            // 제품 라우팅 등록 -> 추후 클래스로 만들어서 빼기
            routes.MapRoute("Default"
                , "{controller}/{action}/{id}"
                , new { controller = "Hello", action ="Index", id = UrlParameter.Optional } // 라우팅 기본값 부여 가능
            );

            PurchaseRoutes.MapRoute("Purchase"
                , "{controller}/{action}/{id}"
                , new { controller = "Purchase", action = "Index", id = UrlParameter.Optional } // 라우팅 기본값 부여 가능
            );

            SaleRoutes.MapRoute("Sale"
                , "{controller}/{action}/{id}"
                , new { controller = "Sale", action = "Index", id = UrlParameter.Optional } // 라우팅 기본값 부여 가능
            );

            InventoryRoutes.MapRoute("Inventory"
                , "{controller}/{action}/{id}"
                , new { controller = "Inventory", action = "Index", id = UrlParameter.Optional } // 라우팅 기본값 부여 가능
            );

            LoginRoutes.MapRoute("Login"
                , "{controller}/{action}/{id}"
                , new { controller = "Login", action = "Index", id = UrlParameter.Optional } // 라우팅 기본값 부여 가능
            );

            ClientRoutes.MapRoute("Client"
                , "{controller}/{action}/{id}"
                , new { controller = "Client", action = "Index", id = UrlParameter.Optional } // 라우팅 기본값 부여 가능
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