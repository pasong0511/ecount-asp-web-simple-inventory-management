using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECount.Model;
using ECount.Store;

namespace ECount.Dac
{
    class SaleDac
    {
        static IStore<SaleHistoryModel> store = new FileStore<SaleHistoryModel>();

        //스토어에 저장 -> 키 제외
        static public string Create(ClientModel client, ProductModel product, int quantity, DateTime dateTime, string userId)
        {
            var sale = new SaleHistoryModel(client, product, quantity, dateTime, userId);
            store.Save(sale);

            return sale.Key;
        }

        //수정 -> 키 포함
        static public void Modify(ClientModel client, ProductModel product, int quantity, DateTime dateTime, string userId, string key)
        {
            var sale = new SaleHistoryModel(client, product, quantity, dateTime, userId, key);
            store.Save(sale);
        }

        //키로 프로덕트 모델겟
        static public void Del(string key)
        {
            store.Delete(x => x.Key == key);
        }

        //날짜로 구분해서 날짜에 매칭되는 스토어에 있는 전체 SaleHistoryModel가져오기
        static public List<SaleHistoryModel> GetHistory(DateTime dateTime)
        {
            return store.GetAll(x => x.DateTime.Date <= dateTime.Date);
        }

        //날짜로 구분해서 날짜에 매칭되는 스토어에 있는 전체 SaleHistoryModel가져오기
        static public List<SaleHistoryModel> GetItem(string productName)
        {
            return store.GetAll(x => x.Product.Name == productName);
        }
    }
}
