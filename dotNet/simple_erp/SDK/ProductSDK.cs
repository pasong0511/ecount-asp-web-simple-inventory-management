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
        static public void Create(string name, ProductType type)
        {
            var prevProducts = Get();

            foreach (var product in prevProducts) {
                if (product.Name == name) {
                    throw new Exception($"이미 들어간 제품입니다.");
                }
            }

            ProductDac.Create(name, type);
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
    }

}
