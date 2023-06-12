using SmartShop.Model.Models.Helpers;
using System.Text.Json.Serialization;

namespace SmartShop.Api.Dtos
{
    public class OrderDto
    {
        public List<ItemDto> Items { get; set; }
        public string Comment { get; set; }
        public string Address { get; set; }        
        public Guid UserId { get; set; }
        public double TotalPrice { get; set; }
        public double DeliveryTime { get; set; }
    }
}
