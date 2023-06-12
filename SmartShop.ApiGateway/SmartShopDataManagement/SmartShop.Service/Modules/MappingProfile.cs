using AutoMapper;
using SmartShop.Infrastructure.Models;
using SmartShop.Model.Models;
using SmartShop.Model.Models.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartShop.Service.Modules
{
    public class MappingProfileService : Profile
    {
        public MappingProfileService() {
            CreateMap<Order, OrderEntity>().ReverseMap();
            CreateMap<Product, ProductEntity>().ReverseMap();
            CreateMap<Item, ItemEntity>().ReverseMap();
        }
        
    }
}
