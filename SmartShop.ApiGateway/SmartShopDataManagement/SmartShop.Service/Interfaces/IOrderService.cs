using SmartShop.Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartShop.Service.Interfaces
{
    public interface IOrderService
    {
        public Task<Order> CreateAsync(Order order);
        public Task<Order> UpdateAsync(Order order);
        public Task<bool> DeleteAsync(Guid id);
        public Task<IEnumerable<Order>> GetAll(Guid userId);
        public Task<IEnumerable<Order>> GetAllSellers(Guid userId);
        public Task<IEnumerable<Order>> GetAllAdmin();
        public Task<bool> DeclineOrderAsync(Guid orderId);
    }
}
