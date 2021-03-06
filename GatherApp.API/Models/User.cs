using System.Collections.Generic;

namespace GatherApp.API.Models
{
    public class User
    {   
        public int Id { get; set; }
        public string Name {get; set;}
        public string LastName {get; set;}
        public string Department {get; set;}
        public string Username { get; set; }
        public byte[] PasswordHash{ get; set; }
        public byte[] PasswordSalt{ get; set; }
        public ICollection<Meeting> Meetings {get; set;} 
    }
}