﻿using ECount.Model;
using ECount.Store;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECount.Dac
{
    public class PurchaseDac
    {
        static IStore<PurchaseHistoryModel> store = StoreResolver.GetStore<PurchaseHistoryModel>();

        //스토어에 저장 -> 모든 데이터
        static public string Create(ClientModel client, ProductModel product, int quantity, DateTime dateTime, string userId)
        {
            var purchase = new PurchaseHistoryModel(client, product, quantity, dateTime, userId);
            store.Save(purchase);

            return purchase.Key;
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

        //날짜로 구분해서 날짜에 매칭되는 스토어에 있는 전체 PurchaseHistoryModel가져오기
        /*static public List<PurchaseHistoryModel> GetHistoryAll(DateTime dateTime)
        {
            List<PurchaseHistoryModel> list = new List<PurchaseHistoryModel>();

            list = store.GetAll(x => x.DateTime.Date <= dateTime.Date);

            foreach (var item in list) {
                System.Diagnostics.Debug.WriteLine($"반복문 출력 -> {item.Product} {item.DateTime.ToString()}");
            }

            return store.GetAll(x => x.DateTime.Date <= dateTime.Date);
        }*/
    }
}
