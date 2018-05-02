using System.Collections.Generic;

namespace GatherApp.API.Data
{
    public interface Repository <T> where T : class
    {
        IEnumerable<T> GetAll();
        T GetById(int id);
    }
}