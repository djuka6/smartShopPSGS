using Auth.Infrastructure.DBO;
using Auth.Model;
using AutoMapper;

namespace Auth.API.Modules
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<User, UserDbo>().ReverseMap();
        }
    }
}