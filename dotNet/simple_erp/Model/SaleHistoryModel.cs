using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECount.Model
{
    [Serializable]
    public class SaleHistoryModel
    {
        public ClientModel Client { get; set; }
        public ProductModel Product { get; set; }
        public int Quantity { get; set; }
        public DateTime DateTime { get; set; }
        public string UserId { get; set; }
        public string Key { get; set; }

        public SaleHistoryModel() { }
        public SaleHistoryModel(ClientModel client, ProductModel product, int quantity, DateTime dateTime, string userId)
        {
            this.Client = client;
            this.Product = product;
            this.Quantity = quantity;
            this.DateTime = dateTime;
            this.UserId = userId;
            this.Key = this.createKey();        //자동 생성
        }

        public override string ToString()
        {
            return $"구매 ({this.Product.Name}: {this.Quantity} 구매일: {this.DateTime.ToString("yyyy-MM-dd")})";
        }

        //수정용 생성자 -> key 추가
        public SaleHistoryModel(ClientModel client, ProductModel product, int quantity, DateTime dateTime, string userId, string key)
        {
            this.Client = client;
            this.Product = product;
            this.Quantity = quantity;
            this.DateTime = dateTime;
            this.UserId = userId;
            this.Key = key;
        }

        //키생성 함수 -> 해시함수
        private string createKey()
        {
            return Guid.NewGuid().ToString();
        }
    }
}
