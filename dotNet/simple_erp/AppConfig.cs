using ECount.Store;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECount
{
    class AppConfig
    {
        // 제네릭 값을 포함하고 있지 않음 -> 생성할 때 동적으로 넣어줘야 함
        public static readonly Type StoreType = typeof(FileStore<>);

    }
}
