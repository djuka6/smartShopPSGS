using SmartShop.Infrastructure.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartShop.Infrastructure.Repositories.Interfaces
{
    public interface IOrderRepository
    {
        public Task<OrderEntity> Create(OrderEntity order);
        public Task<OrderEntity> Update(OrderEntity order);
        public Task<bool> Delete(Guid id);
        public Task<IEnumerable<OrderEntity>> GetAll(Guid userId);
        public Task<IEnumerable<OrderEntity>> GetAllSellers(Guid userId);
        public Task<IEnumerable<OrderEntity>> GetAllAdmin();

        public Task<bool> DeclineOrderAsync(Guid id);
        public Task<bool> HasProductQuantity(Guid productId, int quantity);
    }
}
