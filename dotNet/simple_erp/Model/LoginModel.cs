using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECount.Model
{
    [Serializable]
    public class LoginModel
    {
        public string Id { get; set; }
        public string Password { get; set; }

        public LoginModel() { }
        public LoginModel(string id, string password)
        {
            this.Id = id;
            this.Password = password;
        }

        public override string ToString()
        {
            return $"로그인 ({this.Id}: {this.Password})";
        }
    }
}