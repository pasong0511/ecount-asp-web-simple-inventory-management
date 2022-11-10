using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECount
{
    delegate void OnChangeServerStatus(string status);
    delegate void EventHandler(Event eventObj, object payload);

    class Event
    {
        public string Name;             //"onClick"
        public Event(string name)       //콜백함수
        {
            this.Name = name;
        }
    }

    interface HasSubscribeAttrType
    {
        Type SubscribeAttrType { get; }
    }


    class EventService<TEventName>
    {
        //이벤트 이름과 콜백 함수를 저장하는 이벤트 전용 딕셔너리
        Dictionary<TEventName, EventHandler> handlerDic = new Dictionary<TEventName, EventHandler>();   //onClick이랑 콜백

        //이벤트 핸들러
        public void RegistEventHandler(TEventName eventName, EventHandler handler)
        {
            // 있으면 모아주기
            if (handlerDic.ContainsKey(eventName)) {
                handlerDic[eventName] += handler;
            } else { // 없으면 새로 등록
                handlerDic.Add(eventName, handler);
            }
        }

        //이벤트 실행
        protected void EventEmit(TEventName eventName, object payload = null)
        {
            if (!handlerDic.ContainsKey(eventName)) {
                return;
            }
            var handler = handlerDic[eventName];
            if (handler == null) {
                return;
            }

            var eventObj = new Event(eventName.ToString());
            handler(eventObj, payload);
        }
    }
}
