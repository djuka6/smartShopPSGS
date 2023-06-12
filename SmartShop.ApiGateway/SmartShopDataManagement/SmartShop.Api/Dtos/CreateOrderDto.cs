using System.Text.Json.Serialization;

namespace SmartShop.Api.Dtos
{
    public class CreateOrderDto
    {
        public List<ProductQuantityDto> ProductQuantities { get; set; }
        public string Comment { get; set; }
        public string Address { get; set; }
        [JsonIgnore]
        public Guid UserId { get; set; }
    }

    public class ProductQuantityDto
    {
        public Guid ProductId { get; set; }
        public int Quantity { get; set; }
    }
}
