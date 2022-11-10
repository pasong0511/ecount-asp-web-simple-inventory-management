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
        //상품 이름, 구매 개수, 구매 시간으로 구매정보 생성
        static public void Create(string productName, int quantity, DateTime dateTime)
        {
            //1. 상품 정보에 있는지 먼저 확인하기
            var product = ProductDac.Get(productName);

            //2. 상품이 등록되어있지 않으면 버리기
            if (product == null) {
                throw new Exception($"품목이 존재하지 않습니다: {productName}");
            }

            //3. 상품이 이미 등록되어 있는 경우 구매정보 생성
            PurchaseDac.Create(product, quantity, dateTime);
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
