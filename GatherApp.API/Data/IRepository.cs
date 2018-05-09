using System.Collections.Generic;

namespace GatherApp.API.Data
{
    public interface IRepository <T> where T : class
    {
        IEnumerable<T> GetAll();
        T GetById(int id);
    }
}