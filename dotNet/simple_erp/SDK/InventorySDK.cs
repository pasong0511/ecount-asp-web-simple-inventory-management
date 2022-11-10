using ECount.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECount.Dac;

namespace ECount.SDK
{
    public class InventorySDK
    {
        //--기존--
        /*static public Dictionary<ProductModel, int> GetStatus()
        {
            return GetStatus(DateTime.Now);
        }

        static public Dictionary<ProductModel, int> GetStatus(DateTime dateTime)
        {
            return InventoryDac.GetStatus(dateTime);
        }

        static public Dictionary<ProductModel, int> GetStatus(DateTime dateTime, string productName)
        {
            return InventoryDac.GetStatus(dateTime, productName);
        }*/


        //--송희 추가--
        //날짜 선택 없음
        static public Dictionary<ProductModel, int> GetStatus()
        {
            return GetStatus(DateTime.Now); //날짜 없으면 현재날짜
        }

        //날짜 선택
        static public Dictionary<ProductModel, int> GetStatus(DateTime date)
        {
            var products = ProductSDK.Get();        //프로덕트에 입력한 저장
            return GetStatus(products, date);       //프로덕트 정보랑, 입력받은 날짜 넘겨줌
        }

        //날짜 선택 + 이름 선택
        static public Dictionary<ProductModel, int> GetStatus(DateTime date, string productName)
        {
            var product = ProductSDK.Get(productName);        //프로덕트에 입력한 저장
            return GetItemStatus(product, date, productName);       //프로덕트 정보랑, 입력받은 날짜 넘겨줌
        }

        //날짜 선택 없을때 -> 조회
        static public Dictionary<ProductModel, int> GetStatus(List<ProductModel> products)
        {
            return GetStatus(products, DateTime.Now);
        }

        //날짜 선택 있을때 -> 조회(현재는 날짜 구분 없음)
        //구매 정보 넘겨서 구매 개수 누적하기
        //-> sale 구현시 sale 정보랑 함께 뺀 후에 결과값 반환 필요
        //구매 내역에서 전체 개수 누적합
        static public Dictionary<ProductModel, int> GetStatus(List<ProductModel> products, DateTime dateTime)
        {
            var result = new Dictionary<ProductModel, int>();

            //구매 -> 개수 증가
            //프로덕트 정보를 키로 키 밸류 개수 체크
            foreach (var product in products) {
                result[product] = PurchaseSDK.GetQuantity(product) - SaleSDK.GetQuantity(product);
            }

            return result;
        }

        //날짜 선택 + 이름 선택 -> 조회
        //static public Dictionary<string, int> GetItemStatus(DateTime dateTime, string productName)
        static public Dictionary<ProductModel, int> GetItemStatus(ProductModel product, DateTime dateTime, string productName)
        {
            var result = new Dictionary<ProductModel, int>();
            result[product] = PurchaseSDK.GetItem(productName) - SaleSDK.GetItem(productName);
            return result;
        }
    }
}
