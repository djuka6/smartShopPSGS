namespace Auth.Model
{
    public interface IUserService
    {
        public Task<IEnumerable<User>> GetAll();
        public Task<IEnumerable<User>> GetAllSellers();
        public Task<User> GetById(Guid id);
        Task<string> Authenticate(AuthenticateRequest model);
        Task<string> Register(RegistrationRequest model);
        Task<bool> UpdateUser(RegistrationRequest model, Guid userId);
        public Task<User> Verify(Guid id, string status);

    }
}
