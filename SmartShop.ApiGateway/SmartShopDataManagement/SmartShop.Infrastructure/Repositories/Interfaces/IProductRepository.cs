using SmartShop.Infrastructure.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartShop.Infrastructure.Repositories.Interfaces
{
    public interface IProductRepository
    {
        public Task<ProductEntity> Create(ProductEntity Product);
        public Task<ProductEntity> Update(ProductEntity Product);
        public Task<bool> Delete(Guid id);
        public Task<IEnumerable<ProductEntity>> GetAll();
        public Task<ProductEntity> GetById(Guid id);
        public Task<IEnumerable<ProductEntity>> GetAllSellers(Guid userId);
    }
}
