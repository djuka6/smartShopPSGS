using AutoMapper;
using SmartShop.Infrastructure.Models;
using SmartShop.Model.Models.Helpers;
using SmartShop.Model.Models;
using SmartShop.Api.Dtos;

namespace SmartShop.Api.Modules
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Product, ProductDto>().ReverseMap();
            CreateMap<Order, OrderDto>().ReverseMap();
            CreateMap<Item, ItemDto>().ReverseMap();
            CreateMap<Product, CreateProductDto>().ReverseMap();
            CreateMap<Order, CreateOrderDto>();
            CreateMap<Order, CreateOrderDto>()
            .ForMember(dest => dest.ProductQuantities, opt => opt.MapFrom(src => src.Items.Select(i => new ProductQuantityDto { ProductId = i.ProductId, Quantity = i.Quantity }).ToList()))
            .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.Userid))
            .ReverseMap()
            .ForMember(dest => dest.Items, opt => opt.MapFrom(src => src.ProductQuantities.Select(pq => new Item { ProductId = pq.ProductId, Quantity = pq.Quantity }).ToList()))
            .ForMember(dest => dest.Userid, opt => opt.MapFrom(src => src.UserId));

            CreateMap<List<Order>, List<OrderDto>>().ConvertUsing(MapOrdersToOrderDtos);


        }
        private List<OrderDto> MapOrdersToOrderDtos(List<Order> orders, List<OrderDto> orderDtos, ResolutionContext context)
        {
            orderDtos ??= new List<OrderDto>();

            foreach (var order in orders)
            {
                var orderDto = context.Mapper.Map<OrderDto>(order);
                orderDtos.Add(orderDto);
            }

            return orderDtos;
        }

    }
}
