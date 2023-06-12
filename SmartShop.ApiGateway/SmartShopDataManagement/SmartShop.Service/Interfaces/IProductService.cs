using SmartShop.Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartShop.Service.Interfaces
{
    public interface IProductService
    {
        public Task<IEnumerable<Product>> GetProductsAsync();
        public Task<IEnumerable<Product>> GetSellerProductsAsync(Guid userId);
        public Task<Product> CreateProductAsync(Product product, Guid userId);
        public Task<Product> UpdateProductAsync(Product product);
        public Task<bool> DeleteProductAsync(Guid id);
        public Task<Product> GetById(Guid id);
    }
}
