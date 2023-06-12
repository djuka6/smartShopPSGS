using Auth.Infrastructure.DBO;
using Auth.Infrastructure.Mappers;
using Auth.Infrastructure.Repositories;
using Auth.Model;
using Auth.Model.InfrastructureInterfaces;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;


namespace Auth.Service
{
    public class UserInfrastructureService : IUserInfrastructureService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UserInfrastructureService(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }        

        public void SaveUser(User user)
        {
            _userRepository.CreateNewUserAsync(_mapper.Map<User, UserDbo>(user));
        }

        public async Task<User> GetByIdAsync(Guid id)
        {
            var var = await _userRepository.GetByIdAsync(id);
            return _mapper.Map<UserDbo, User>(var);
        }

        public async Task<List<User>> GetAllAsync()
        {
            var v = await _userRepository.GetAllAsync();
            return _mapper.Map<List<UserDbo>, List<User>>(v);
        }

        public async Task<User> GetUserByUsernameAsync(string username)
        {
            var user = await _userRepository.GetUserByUsernameAsync(username);
            return _mapper.Map<UserDbo, User>(user);
        }

        public async Task UpdateUserAsync(User user)
        {
            await _userRepository.UpdateUserAsync(_mapper.Map<User, UserDbo>(user));
        }
        
        public async Task<User> Verify(Guid id, string status)
        {
            var user = await _userRepository.Verify(id, status);
            return _mapper.Map<User>(user);
        }

        public async Task<List<User>> GetAllSellersAsync()
        {
            var v = await _userRepository.GetAllSellersAsync();
            return _mapper.Map<List<UserDbo>, List<User>>(v);
        }
    }
}
