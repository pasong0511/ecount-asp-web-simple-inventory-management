using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECount.Model
{
    [Serializable]
    public class ClientModel
    {
        public string Name { get; set; }
        public string Key { get; set; }
        public string UserId { get; set; }


        public ClientModel() { }
        //생성용 생성자
        public ClientModel(string name, string userId)
        {
            this.Name = name;

            this.Key = this.createKey();        //키 생성 함수
            this.UserId = userId;
        }

        //수정용 생성자 -> key 추가
        public ClientModel(string name, string key, string userId)
        {
            this.Name = name;
            this.Key = key;
            this.UserId = userId;
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
