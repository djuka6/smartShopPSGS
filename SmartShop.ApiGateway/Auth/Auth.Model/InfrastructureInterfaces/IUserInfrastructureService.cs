namespace Auth.Model.InfrastructureInterfaces
{
    public interface IUserInfrastructureService
    {
        public void SaveUser(User user);
        public Task<User> GetByIdAsync(Guid id);

        public Task<List<User>> GetAllAsync();
        public Task<List<User>> GetAllSellersAsync();
        public Task<User> GetUserByUsernameAsync(string username);
        public Task UpdateUserAsync(User user);
        public Task<User> Verify(Guid id, string status);
    }
}

