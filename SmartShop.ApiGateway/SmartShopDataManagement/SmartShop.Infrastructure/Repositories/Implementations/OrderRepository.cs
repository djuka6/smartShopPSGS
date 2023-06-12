using SmartShop.Infrastructure.Models;
using SmartShop.Infrastructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;

namespace SmartShop.Infrastructure.Repositories.Implementations
{
    public class OrderRepository : IOrderRepository
    {
        private readonly SSDbContext _dbContext;
        public OrderRepository(SSDbContext dbContext)
        {
            _dbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        }

        public async Task<OrderEntity> Create(OrderEntity order)
        {
            foreach(var item in order.Items)
            {
                await UpdateProductQuantity(item.ProductId, item.Quantity);
            }
            await _dbContext.Orders.AddAsync(order);
            await _dbContext.SaveChangesAsync();
            return order;
        }

        private async Task UpdateProductQuantity(Guid productId, int quantity)
        {
            var updateProduct= await _dbContext.Products.FindAsync(productId);

            if (updateProduct != null)
            {
                updateProduct.QuantityInStock = updateProduct.QuantityInStock - quantity;
                await _dbContext.SaveChangesAsync();
                return;
            }
            else
            {
                return;
            }
        }

        public async Task<OrderEntity?> GetById(int id)
        {
            return await _dbContext.Orders.FindAsync(id);
        }

        public async Task<OrderEntity> Update(OrderEntity order)
        {
            var updateOrder = await _dbContext.Orders.Where(x => x.Id == order.Id).Include(i => i.Items).FirstOrDefaultAsync();

            if(updateOrder != null)
            {
                updateOrder.Address = order.Address;
                updateOrder.Comment = order.Comment;
                updateOrder.DateTime = order.DateTime;
                updateOrder.Items = order.Items;
                updateOrder.UserId = order.UserId;
                await _dbContext.SaveChangesAsync();
                return updateOrder;
            }
            else
            {
                return updateOrder;
            }
        }

        public async Task<bool> Delete(Guid id)
        {
            var order = await _dbContext.Orders.FirstOrDefaultAsync(x => x.Id == id);
            if(order != null)
            {
                _dbContext.Orders.Remove(order);
                await _dbContext.SaveChangesAsync();
                return true;
            }
            else
            {
                return false;
            }
        }

        public async Task<IEnumerable<OrderEntity>> GetAll(Guid userId)
        {
            var orders = await _dbContext.Orders
                .Include(x => x.Items)
                .Where(x => x.UserId.ToString().ToLower() == userId.ToString())
                .AsNoTracking()
                .ToListAsync();

            foreach (var order in orders)
            {
                foreach (var item in order.Items)
                {
                    item.Product = await FindProduct(item.ProductId);
                }
            }

            return orders;
        }

        public async Task<IEnumerable<OrderEntity>> GetAllAdmin()
        {
            var orders = await _dbContext.Orders
                .Include(x => x.Items)
                .AsNoTracking()
                .ToListAsync();

            foreach (var order in orders)
            {
                foreach (var item in order.Items)
                {
                    item.Product = await FindProduct(item.ProductId);
                }
            }

            return orders;
        }

        private async Task<ProductEntity> FindProduct(Guid id)
        {
            try
            {
                return await _dbContext.Products.FirstOrDefaultAsync(x => x.Id == id);
            }
            catch (Exception ex)
            {
                throw ex;
            }   
        }

        public Task<bool> HasProductQuantity(Guid productId, int quantity)
        {
            try
            {
                var product = _dbContext.Products.FirstOrDefaultAsync(x => x.Id == productId);

                if (product != null)
                {
                    if (product.Result.QuantityInStock >= quantity)
                    {
                        return Task.FromResult(true);
                    }
                    else
                    {
                        return Task.FromResult(false);
                    }
                }
                else { return Task.FromResult(false); }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            

            
        }

        public async Task<bool> DeclineOrderAsync(Guid id)
        {
            try
            {
                var order = await _dbContext.Orders
                                .Where(x => x.Id == id)
                                .Include(x => x.Items)
                                .AsNoTracking()
                                .FirstOrDefaultAsync();
                if (order.DeliveryTime < 1)
                {
                    return false;
                }

                foreach (var item in order.Items)
                {
                    var product = _dbContext.Products.FirstOrDefaultAsync(x => x.Id == item.ProductId);
                    product.Result.QuantityInStock = product.Result.QuantityInStock + item.Quantity;

                }
                _dbContext.SaveChanges();

                _dbContext.Orders.Remove(order);
                _dbContext.SaveChanges();
                return true;
            }
            catch(Exception ex)
            {
                throw ex;
            }
            
        }

        public async Task<IEnumerable<OrderEntity>> GetAllSellers(Guid userId)
        {
            try
            {
                var productsByUser = await _dbContext.Products
                .Where(x => x.UserId == userId)
                .ToListAsync();

                var productIds = productsByUser.Select(p => p.Id).ToList();

                var orders = await _dbContext.Orders
                    .Include(x => x.Items)
                    .ThenInclude(i => i.Product)
                    .AsNoTracking()
                    .ToListAsync();

                var ordersWithUserProducts = orders
                    .Where(o => o.Items.Any(i => productIds.Contains(i.ProductId)))
                    .ToList();

                // Filter out products in each order that were not added by the user
                foreach (var order in ordersWithUserProducts)
                {
                    order.Items = order.Items
                        .Where(i => productIds.Contains(i.ProductId))
                        .ToList();
                }

                return ordersWithUserProducts;
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }
            

    }
}
