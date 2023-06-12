using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartShop.Infrastructure.Models
{
    public class ItemEntity
    {
        public Guid Id { get; set; }       
        public ProductEntity Product { get; set; }
        public Guid ProductId { get; set; }
        public int Quantity { get; set; }
        public OrderEntity Order { get; set; }
        public Guid OrderId { get; set; }
        public double Price { get; set; }
    }
}
