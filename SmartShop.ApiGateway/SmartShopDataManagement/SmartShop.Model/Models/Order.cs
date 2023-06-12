using SmartShop.Model.Models.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartShop.Model.Models
{
    public class Order
    {
        public Guid Id { get; set; }
        public List<Item> Items { get; set; }
        public string Comment { get; set; }
        public string Address { get; set; }

        public DateTime DateTime { get; set; }
        public Guid Userid { get; set; }

        public double TotalPrice { get; set; }

        public double DeliveryTime { get; set; }
    }
}
