using Auth.Infrastructure.DBO;
using Auth.Model;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Auth.Service.Modules
{
    public class MappingProfileService : Profile
    {
        public MappingProfileService()
        {
            CreateMap<User, UserDbo>().ReverseMap();
            ;
        }

    }
}
