using Microsoft.Extensions.Logging; // Add this
using Auth.Infrastructure.DBO;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Collections.Generic;
using System;
using System.Linq; // Add this if not already added

namespace Auth.Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly UsersDbContext _dbContext;
        private readonly ILogger<UserRepository> _logger;

        public UserRepository(UsersDbContext context, ILogger<UserRepository> logger)
        {
            _dbContext = context;
            _logger = logger;
        }

        public async Task<UserDbo> CreateNewUserAsync(UserDbo user)
        {
            user.Status = "0";
            try
            {
                _logger.LogInformation("Creating a new user");
                await _dbContext.Users.AddAsync(user);
                await _dbContext.SaveChangesAsync();
                return user;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while creating a new user");
                throw;
            }
        }

        public async Task<List<UserDbo>> GetAllAsync()
        {
            try
            {
                _logger.LogInformation("Getting all users");
                return await _dbContext.Users.ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while getting all users");
                throw;
            }
        }

        public async Task<List<UserDbo>> GetAllSellersAsync()
        {
            try
            {
                _logger.LogInformation("Getting all sellers");
                return await _dbContext.Users.Where(x => x.Role == 1 && x.Status == "0").ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while getting all sellers");
                throw;
            }
        }

        public async Task<UserDbo> GetByIdAsync(Guid id)
        {
            try
            {
                _logger.LogInformation($"Getting user by id: {id}");
                return await _dbContext.Users.FirstOrDefaultAsync(x => x.Id == id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"An error occurred while getting user by id: {id}");
                throw;
            }
        }

        public async Task<UserDbo> GetUserByUsernameAsync(string username)
        {
            try
            {
                _logger.LogInformation($"Getting user by username: {username}");
                return await _dbContext.Users.FirstOrDefaultAsync(x => x.UserName == username);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"An error occurred while getting user by username: {username}");
                throw;
            }
        }

        public async Task UpdateUserAsync(UserDbo user)
        {
            var userToUpdate = _dbContext.Users.FirstOrDefault(x => x.Id == user.Id);

            try
            {
                _logger.LogInformation($"Updating user with id: {user.Id}");
                userToUpdate.Email = user.Email;
                userToUpdate.FirstName = user.FirstName;
                userToUpdate.LastName = user.LastName;
                userToUpdate.UserName = user.UserName;
                userToUpdate.Password = user.Password;
                userToUpdate.LastName = user.LastName;
                userToUpdate.Salt = user.Salt;
                userToUpdate.Date = user.Date;
                userToUpdate.ImgPath = user.ImgPath;
                userToUpdate.Address = user.Address;

                await _dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"An error occurred while updating user with id: {user.Id}");
                throw;
            }
        }

        public async Task<UserDbo> Verify(Guid id, string role)
        {
            var user = _dbContext.Users.FirstOrDefault(x => x.Id == id);

            try
            {
                _logger.LogInformation($"Verifying user with id: {id}");
                user.Status = role;
                await _dbContext.SaveChangesAsync();

                return user;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"An error occurred while verifying user with id: {id}");
                throw;
            }
        }
    }
}
