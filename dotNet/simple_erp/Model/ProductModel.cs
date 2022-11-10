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
        //상품의 이름과, 프로덕트 타입 객체를 생성한다.
        //public string Name;
        //public ProductType Type;    //enum으로 만든 타입
        
        public string Name { get; set; }
        public ProductType Type { get; set; }

        public string Key { get; set; }
        public int SafeQuantity { get; set; }
        public string userId { get; set; }


        public ProductModel() { }
        //생성자
        public ProductModel(string name, ProductType type, int safeQuantity, string userId)
        {
            this.Name = name;
            this.Type = type;

            this.Key = this.createKey();        //키 생성 함수
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

        //키생성 함수
        private string createKey()
        {
            return Guid.NewGuid().ToString();
        }
    }
}
