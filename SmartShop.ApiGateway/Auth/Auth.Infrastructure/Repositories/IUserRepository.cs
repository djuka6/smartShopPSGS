using Auth.Infrastructure.DBO;

namespace Auth.Infrastructure.Repositories
{
    public interface IUserRepository 
    {
        public Task<UserDbo> CreateNewUserAsync(UserDbo user);
        public Task<UserDbo> GetByIdAsync(Guid id);
        public Task<List<UserDbo>> GetAllAsync();
        public Task<List<UserDbo>> GetAllSellersAsync();
        public Task<UserDbo> GetUserByUsernameAsync(string username);
        public Task UpdateUserAsync(UserDbo user);
        public Task<UserDbo> Verify(Guid id, string role);

    }
}
