using ECount.Enum;
using ECount.Model;
using ECount.Store;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECount.Dac
{
    class ProductDac
    {
        //Name, ProductType 저장
        //static IStore<ProductModel> store = new InMemoryStore<ProductModel>();
        //static IStore<ProductModel> store = new FileStore<ProductModel>("product");   //메모리 저장
        static IStore<ProductModel> store = StoreResolver.GetStore<ProductModel>();

        //프로덕트 모델 생성
        static public string Create(string name, ProductType type, int safeQuantity, string userId)
        {
            //이름과 타입을 넘겨줘서 생성된 ProductModel를 리스트에 담는다.
            var product = new ProductModel(name, type, safeQuantity, userId);
            store.Save(product);

            return product.Key;
        }

        //프로덕트 모델 수정
        static public void Modify(string name, ProductType type, string key, int safeQuantity, string userId)
        {
            //이름과 타입을 넘겨줘서 생성된 ProductModel를 리스트에 담는다.
            var product = new ProductModel(name, type, key, safeQuantity, userId);
            store.Save(product);
        }

        //프로덕트 모델 겟
        static public List<ProductModel> Get()
        {
            return store.GetAll();
        }

        //이름으로 프로덕트 모델겟
        static public ProductModel Get(string name)
        {
            return store.Get(x => x.Name == name);
        }

        //키로 프로덕트 모델겟
        static public ProductModel Get(string name, string key)
        {
            return store.Get(x => x.Key == key);
        }

        //키로 프로덕트 모델겟
        static public void Del(string key)
        {
            store.Delete(x => x.Key == key);
        }

        

        /*static public ProductModel GetBykey(string key)
        {
            return store.Get(x => x.Key == key);
        }*/

        //public ProductModel GetByType(ProductType type)
        //{
        //    return store.Get(x => x.Type == type);
        //}
    }
}
