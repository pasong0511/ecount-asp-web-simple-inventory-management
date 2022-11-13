using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECount.Dac;
using ECount.Model;

namespace ECount.SDK
{
    public class SaleSDK
    {
        //생성 key 빼고 다 넘겨줌
        static public string Create(string clientName, string productName, int quantity, DateTime dateTime, string userId)
        {
            var client = ClientDac.Get(clientName);    //1. 고객에 있는지 확인
            var product = ProductDac.Get(productName);  //2. 상품에 있는지 확인

            if (client == null)
            {
                throw new Exception($"고객이 존재하지 않습니다: {clientName}");
            }

            if (product == null)
            {
                throw new Exception($"품목이 존재하지 않습니다: {productName}");
            }

            return SaleDac.Create(client, product, quantity, dateTime, userId);        //2. 상품이 이미 등록되어 있는 경우 구매정보 생성
        }

        //수정
        static public void Modify(string clientName, string clientKey, string productName, string productKey, int quantity, DateTime dateTime, string userId, string key)
        {
            var client = ClientDac.GetByKey(clientKey);    //1. 고객에 있는지 확인
            var product = ProductDac.GetByKey(productKey);  //2. 상품에 있는지 확인

            SaleDac.Modify(client, product, quantity, dateTime, userId, key);
        }

        //삭제
        static public void Del(string key)
        {
            System.Diagnostics.Debug.WriteLine($"구매 삭제 키 체크 sdk -> {key}");
            SaleDac.Del(key);
        }

        //구매 생성 정보 가져오기
        static public List<SaleHistoryModel> GetHistory()
        {
            return GetHistory(DateTime.Now);
        }

        //날짜로 구매 정보 가져오기
        static public List<SaleHistoryModel> GetHistory(DateTime dateTime)
        {
            return SaleDac.GetHistory(dateTime);
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
            var sales = GetHistory(date);
            var quantity = 0;
            foreach (var sale in sales)
            {
                if (product.Compare(sale.Product))
                {
                    quantity += sale.Quantity;
                }
            }
            return quantity;
        }

        //이름 넣으면 구매 정보 가져오는 함수
        static public int GetItem(string productName)
        {
            var itemList = SaleDac.GetItem(productName);
            var quantity = 0;

            foreach (var item in itemList)
            {
                quantity += item.Quantity;
            }
            return quantity;
        }
    }
}