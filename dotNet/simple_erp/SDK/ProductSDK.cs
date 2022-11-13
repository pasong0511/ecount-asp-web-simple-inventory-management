using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECount.Store;
using ECount.Model;
using ECount.Enum;
using ECount.Dac;

namespace ECount.SDK
{
    public class ProductSDK
    {
        //상품의 name, type을 정의 받으면 ProductDac에 상품 정보 생성 요청
        static public string Create(string name, ProductType type, int safeQuantity, string userId)
        {
            var prevProducts = Get();

            foreach (var product in prevProducts) {
                if (product.Name == name) {
                    throw new Exception($"이미 들어간 제품입니다.");
                }
            }

            return ProductDac.Create(name, type, safeQuantity, userId);
        }

        //상품의 name, type을 정의 받으면 ProductDac에 상품 정보 생성 요청
        static public void Modify(string name, ProductType type, string key, int safeQuantity, string userId)
        {
            //사용자 검증 로직 추가 필요
            ProductDac.Modify(name, type, key, safeQuantity, userId);
        }

        static public void Del(string key)
        {
            ProductDac.Del(key);
        }

        //userid에 해당하는 등록정보 딕셔너리로 생성 key : userid, value : name
        static public List<string> GetUserProductLists(string userId)
        {
            List<string> list = new List<string>();
            var products = Get();

            foreach (var product in products)
            {
                if (product.userId == userId)
                {
                    list.Add(product.Name);
                }
            }
            return list;
        }

        //아무것도 넘기지 않고 GET 요청을 통해 ProductModel : Name, ProductType 반환 요청
        static public List<ProductModel> Get()
        {
            return ProductDac.Get();
        }

        //이름 넘겨서 특정 상품 꺼내오기
        static public ProductModel Get(string name)
        {
            return ProductDac.Get(name);
        }

        /*//키 넘겨서 특정 상품 꺼내오기
        static public ProductModel GetBykey(string key)
        {
            return ProductDac.GetBykey(key);
        }*/


    }

}
