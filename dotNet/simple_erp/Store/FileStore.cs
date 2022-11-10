using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.Serialization.Formatters.Binary;
using System.Text;
using System.Threading.Tasks;

namespace ECount.Store
{
    // 클래스를 만들 때 공개여부는 항상 고민해야함
    class FileStore<T> : IStore<T>
    {
        List<T> store;
        public string Name { get; set; }
        private string fileName
        {
            get {
                return $"{Name}.dat";
            }
        }

        // 함수 이름 따로 빼기
        public FileStore()
        {
            this.Name = typeof(T).Name;

            if (!File.Exists(this.fileName)) {
                File.Create(this.fileName).Close();
            }

            using (var fs = File.OpenRead(this.fileName)) {
                if (fs.Length == 0) {
                    store = new List<T>();
                } else {
                    var formatter = new BinaryFormatter();
                    store = (List<T>)formatter.Deserialize(fs);
                }
            }
        }

        public FileStore(string name)
        {
            this.Name = name;

            if (!File.Exists(this.fileName)) {
                File.Create(this.fileName).Close();
            }

            using (var fs = File.OpenRead(this.fileName)) {
                if (fs.Length == 0) {
                    store = new List<T>();
                } else {
                    var formatter = new BinaryFormatter();
                    store = (List<T>)formatter.Deserialize(fs);
                }
            }
        }

        public void Save(T data)
        {
            store.Add(data);
            this.SaveFile();
        }

        private void SaveFile()
        {
            // 밑의 작업을 기다릴 이유가 없음 -> 비동기 처리가 효율적
            // Task = 자바스크립트의 Promise와 같은 역할
            // 서로 다른 쓰레드에서 작업을 하게 만듦
            Task.Run(() => {
                using (var fs = File.OpenWrite(this.fileName))
                {
                    var formatter = new BinaryFormatter();
                    formatter.Serialize(fs, store);
                }
            });
        }

        public void Delete(Predicate<T> match) {
            store.RemoveAll(match);
            this.SaveFile();
        }

        public List<T> GetAll()
        {
            return store;
        }

        public List<T> GetAll(Predicate<T> match)
        {
            return store.FindAll(match);
        }

        // 람다식 받기
        public T Get(Predicate<T> match)
        {
            return store.Find(match);
        }
    }
}
