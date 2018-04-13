using System.Threading.Tasks;
using GatherApp.API.Models;

namespace GatherApp.API.Data
{
    public interface IAuthRepository
    {
         Task<User> Register(User user, string password);
         Task<User> Login(string username, string user);
         Task<bool> UserExists(string username);
    }
}