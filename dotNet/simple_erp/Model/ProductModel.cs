using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECount.Enum;

namespace ECount.Model
{
    [Serializable]
    public class ProductModel
    {
        public string Name { get; set; }
        public ProductType Type { get; set; }

        public string Key { get; set; }
        public int SafeQuantity { get; set; }
        public string userId { get; set; }


        public ProductModel() { }
        //생성용 생성자
        public ProductModel(string name, ProductType type, int safeQuantity, string userId)
        {
            this.Name = name;
            this.Type = type;

            this.Key = this.createKey();        //키 생성 함수
            this.SafeQuantity = safeQuantity;
            this.userId = userId;
        }

        //수정용 생성자 -> key 추가
        public ProductModel(string name, ProductType type, string key, int safeQuantity, string userId)
        {
            this.Name = name;
            this.Type = type;

            this.Key = key;        //키 생성 함수
            this.SafeQuantity = safeQuantity;
            this.userId = userId;
        }

        //문자열로 반환해주는 함수
        public override string ToString()
        {
            return this.Name;
        }

        //이름 비교
        public bool Compare(ProductModel product)
        {
            return this.Name == product.Name;
        }

        //키생성 함수 -> 해시함수
        private string createKey()
        {
            return Guid.NewGuid().ToString();
        }
    }
}
