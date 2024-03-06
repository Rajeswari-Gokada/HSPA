namespace WebAPI.Interfaces
{
    public interface IUnitofwork
    {
         ICityRepository CityRepository {get; }

         IUserRepository UserRepository {get; }

         IPropertyRepository PropertyRepository {get; }

         IPropertyTypeRepository PropertyTypeRepository{get; }
         Task<bool> SaveAsync();
    }
}