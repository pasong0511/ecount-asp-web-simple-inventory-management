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
        List<SaleHistoryModel> sales = new List<SaleHistoryModel>();

        static public void Create(string productName, int quantity, DateTime dateTime)
        {
            //1. 상품 정보에 있는지 먼저 확인하기
            var product = ProductDac.Get(productName);

            //2. 상품이 등록되어있지 않으면 버리기
            if (product == null) {
                throw new Exception($"품목이 존재하지 않습니다: {productName}");
            }

            var purchase = PurchaseSDK.GetQuantity(product);
            var sale = GetQuantity(product) + quantity;

            if (purchase - sale < 0) {
                throw new Exception($"재고가 없는디요. {productName}");
            }

            //3. 상품이 이미 등록되어 있는 경우 구매정보 생성
            SaleDac.Create(product, quantity, dateTime);
        }

        //판매 정보 가져오기
        static public List<SaleHistoryModel> GetHistory()
        {
            return GetHistory(DateTime.Now);
        }

        //날짜로 판매정보 가져오기
        static public List<SaleHistoryModel> GetHistory(DateTime dateTime)
        {
            return SaleDac.GetHistory(dateTime);
        }

        static public int GetQuantity(ProductModel product)
        {
            return GetQuantity(product, DateTime.Now);
        }

        static public int GetQuantity(ProductModel product, DateTime date)
        {
            var sales = GetHistory(date);
            var quantity = 0;
            foreach (var sale in sales) {
                if (product.Compare(sale.Product)) {
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

            foreach (var item in itemList) {
                quantity += item.Quantity;
            }
            return quantity;
        }
    }
}
