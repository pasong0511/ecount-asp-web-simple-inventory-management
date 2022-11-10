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
        //static IStore<SaleHistoryModel> store = new InMemoryStore<SaleHistoryModel>();
        static IStore<SaleHistoryModel> store = new FileStore<SaleHistoryModel>();

        static public void Create(ProductModel product, int quantity, DateTime dateTime)
        {
            store.Save(new SaleHistoryModel(product, quantity, dateTime));
        }

        static public List<SaleHistoryModel> GetHistory(DateTime dateTime)
        {
            return store.GetAll(x => x.DateTime.Date <= dateTime.Date);
        }

        static public List<SaleHistoryModel> GetItem(string productName)
        {
            return store.GetAll(x => x.Product.Name == productName);
        }
    }
}
