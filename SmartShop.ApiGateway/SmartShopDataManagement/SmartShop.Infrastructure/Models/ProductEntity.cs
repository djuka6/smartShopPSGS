using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartShop.Infrastructure.Models
{
    public class ProductEntity
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public int Quantity { get; set; }
        public string Description { get; set; }
        public string ImgSrc { get; set; }
        public int QuantityInStock { get; set; }
        public Guid UserId { get; set; }
    }
}
