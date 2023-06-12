using Microsoft.EntityFrameworkCore;
using SmartShop.Infrastructure.Models;
using SmartShop.Infrastructure.Repositories.Interfaces;

namespace SmartShop.Infrastructure.Implementations
{
    public class ProductRepository : IProductRepository
    {
        private readonly SSDbContext _dbContext;
        public ProductRepository(SSDbContext dbContext)
        {
            _dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        }

        public async Task<ProductEntity> Create(ProductEntity Product)
        {
            await _dbContext.Products.AddAsync(Product);
            await _dbContext.SaveChangesAsync();
            return Product;
        }

        public async Task<bool> Delete(Guid id)
        {
            var product = await _dbContext.Products.FirstOrDefaultAsync(x => x.Id == id);
            if (product != null)
            {
                _dbContext.Products.Remove(product);
                await _dbContext.SaveChangesAsync();
                return true;
            }
            else
            {
                return false;
            }
        }

        public async Task<IEnumerable<ProductEntity>> GetAll()
        {
            return await _dbContext.Products.Where(x => x.QuantityInStock > 0).AsNoTracking().ToListAsync();
        }

        public async Task<IEnumerable<ProductEntity>> GetAllSellers(Guid userId)
        {
            return await _dbContext.Products.Where(x => x.UserId == userId).AsNoTracking().ToListAsync();
        }

        public async Task<ProductEntity> GetById(Guid id)
        {
            return await _dbContext.Products.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<ProductEntity> Update(ProductEntity product)
        {
            var updateProduct = await _dbContext.Products.Where(x => x.Id == product.Id).FirstOrDefaultAsync();

            if (updateProduct != null)
            {
                updateProduct.Price = product.Price;
                updateProduct.Description = product.Description;
                updateProduct.Name = product.Name;
                updateProduct.ImgSrc = product.ImgSrc;
                updateProduct.Quantity = product.Quantity;

                await _dbContext.SaveChangesAsync();
                return updateProduct;
            }
            else
            {
                return updateProduct;
            }
        }
    }
}
