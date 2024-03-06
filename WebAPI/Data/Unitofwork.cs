using WebAPI.Data.Repo;
using WebAPI.Interfaces;

namespace WebAPI.Data
{
    public class Unitofwork : IUnitofwork
    {
        private readonly DataContext dc;


        public Unitofwork(DataContext dc)
        {
            this.dc = dc;

        }
        public ICityRepository CityRepository => 
            new CityRepository(dc);

        public IUserRepository UserRepository => 
            new UserRepository(dc);

        public IPropertyRepository PropertyRepository =>
          new PropertyRepository(dc);

        public IPropertyTypeRepository PropertyTypeRepository =>
          new PropertyTypeRepository(dc);


        public async Task<bool> SaveAsync()
        {
            return await dc.SaveChangesAsync() > 0;
        }

    }
}