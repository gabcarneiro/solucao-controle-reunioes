using System.Collections.Generic;
using GatherApp.API.Models;
using System.Linq;

namespace GatherApp.API.Data
{
    public class UserRepository : IUserRepository, IRepository<User>
    {
        private readonly DataContext _context;

        public UserRepository(DataContext context)
        {
            _context = context;
        }

        public IEnumerable<User> GetAll(){
            return _context.Users.ToList();
        }

        public User GetById(int id)
        {
            return _context.Users.FirstOrDefault(u => u.Id == id);
        }

    }
}