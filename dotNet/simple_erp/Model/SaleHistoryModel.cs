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
        public ProductModel Product;
        public int Quantity;
        public DateTime DateTime;

        public SaleHistoryModel(ProductModel product, int quantity, DateTime dateTime)
        {
            this.Product = product;
            this.Quantity = quantity;
            this.DateTime = dateTime;
        }

        public override string ToString()
        {
            return $"판매 ({this.Product.Name}: {this.Quantity} 판매일: {this.DateTime.ToString("yyyy-MM-dd")})";
        }
    }
}
