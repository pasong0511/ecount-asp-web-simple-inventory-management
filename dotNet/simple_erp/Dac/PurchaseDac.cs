using ECount.Model;
using ECount.Store;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECount.Dac
{
    class PurchaseDac
    {
        //static IStore<PurchaseHistoryModel> store = new InMemoryStore<PurchaseHistoryModel>();
        //static IStore<PurchaseHistoryModel> store = new FileStore<PurchaseHistoryModel>();
        static IStore<PurchaseHistoryModel> store = StoreResolver.GetStore<PurchaseHistoryModel>();

        //스토어에 저장
        static public void Create(ProductModel product, int quantity, DateTime dateTime)
        {
            store.Save(new PurchaseHistoryModel(product, quantity, dateTime));
        }

        //날짜로 구분해서 날짜에 매칭되는 스토어에 있는 전체 PurchaseHistoryModel가져오기
        static public List<PurchaseHistoryModel> GetHistory(DateTime dateTime)
        {
            return store.GetAll(x => x.DateTime.Date <= dateTime.Date);
        }

        //날짜로 구분해서 날짜에 매칭되는 스토어에 있는 전체 PurchaseHistoryModel가져오기
        static public List<PurchaseHistoryModel> GetItem(string productName)
        {
            return store.GetAll(x => x.Product.Name == productName);
        }
    }
}
