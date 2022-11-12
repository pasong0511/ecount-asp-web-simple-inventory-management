using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECount.Util
{
    public class Utile
    {
        //문자열로 반환해주는 함수
        static public string CookiePaser(string headerInfo)
        {
            string result = "";
            string[] cookieFull = headerInfo.Split(' ');
            
            System.Diagnostics.Debug.WriteLine($"출력ㅠㅠ -> {cookieFull}");

            if (cookieFull != null) { 
                string[] cookie = cookieFull[1].Split('=');
                result = cookie[1];

            }

            return result;
        }
    }
}
