namespace SmartShop.Api.Dtos
{
    public class CreateProductDto
    {
        public string Name { get; set; }
        public double Price { get; set; }
        public string Description { get; set; }
        public string ImgSrc { get; set; }
        public int QuantityInStock { get; set; }
    }
}
