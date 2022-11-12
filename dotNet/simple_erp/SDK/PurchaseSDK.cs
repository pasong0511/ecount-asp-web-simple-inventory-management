using ECount.Dac;
using ECount.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECount.SDK
{
    public class PurchaseSDK
    {
        //key 빼고 다 넘겨줌
        static public string Create(string clientName, string productName, int quantity, DateTime dateTime, string userId)
        {
            var client = ClientDac.Get(clientName);    //1. 고객에 있는지 확인
            var product = ProductDac.Get(productName);  //2. 상품에 있는지 확인

            if (client == null)
            {
                throw new Exception($"고객이 존재하지 않습니다: {clientName}");   
            }

            if (product == null) {
                throw new Exception($"품목이 존재하지 않습니다: {productName}");
            }

            return PurchaseDac.Create(client, product, quantity, dateTime, userId);        //2. 상품이 이미 등록되어 있는 경우 구매정보 생성
        }

        //구매 생성 정보 가져오기
        static public List<PurchaseHistoryModel> GetHistory()
        {
            return GetHistory(DateTime.Now);
        }

        //날짜로 구매 정보 가져오기
        static public List<PurchaseHistoryModel> GetHistory(DateTime dateTime)
        {
            return PurchaseDac.GetHistory(dateTime);
        }

        // -- 추가 --
        //개수 가져오기 가져오기
        static public int GetQuantity(ProductModel product)
        {
            return GetQuantity(product, DateTime.Now);
        }

        // -- 추가 --
        //구매 개수 누적하기
        static public int GetQuantity(ProductModel product, DateTime date)
        {
            var purchases = GetHistory(date);
            var quantity = 0;
            foreach (var purchase in purchases) {
                if (product.Compare(purchase.Product)) {
                    quantity += purchase.Quantity;
                }
            }
            return quantity;
        }

        //이름 넣으면 구매 정보 가져오는 함수
        static public int GetItem(string productName)
        {
            var itemList = PurchaseDac.GetItem(productName);
            var quantity = 0;

            foreach (var item in itemList) {
                quantity += item.Quantity;
            }
            return quantity;
        }
        /*
        //이름 넣으면 구매 정보 가져오는 함수
        static public List<PurchaseHistoryModel> GetItem(string productName)
        {
            //누적해서 개수랑 정보 반환
            //var item = PurchaseDac.GetItem(productName);
            //Console.WriteLine("한개?"+item);
            return PurchaseDac.GetItem(productName);        //이름, 구매개수, 구매일자 반환
        }*/
    }
}
