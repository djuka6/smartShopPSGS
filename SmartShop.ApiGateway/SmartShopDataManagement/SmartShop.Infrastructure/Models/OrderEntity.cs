using SmartShop.Infrastructure.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartShop.Infrastructure.Models
{
    public class OrderEntity
    {       
        public Guid Id { get; set; }
        public string Comment { get; set; }
        public string Address { get; set; }
        public DateTime DateTime { get; set; }
        public List<ItemEntity> Items { get; set; }
        public Guid UserId { get; set; }        
        public double TotalPrice { get; set; }
        public double DeliveryTime { get; set; }
    }
}
