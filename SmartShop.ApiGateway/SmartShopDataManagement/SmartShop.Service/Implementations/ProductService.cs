using AutoMapper;
using SmartShop.Infrastructure.Models;
using SmartShop.Infrastructure.Repositories.Interfaces;
using SmartShop.Model.Models;
using SmartShop.Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.WebSockets;
using System.Text;
using System.Threading.Tasks;

namespace SmartShop.Service.Implementations
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;
        private IMapper _mapper;
        public ProductService(IProductRepository productRepository, IMapper mapper) { 
            _productRepository = productRepository;
            _mapper = mapper;
        }

        public async Task<Product> CreateProductAsync(Product product, Guid userId)
        {
            product.Id = Guid.NewGuid();
            try
            {
                var productEntity = _mapper.Map<Product, ProductEntity>(product);
                productEntity.UserId = userId;
                var result = await _productRepository.Create(productEntity);
                return _mapper.Map<Product>(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<bool> DeleteProductAsync(Guid id)
        {
            try
            {
                return await _productRepository.Delete(id);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public async Task<Product> GetById(Guid id)
        {
            try
            {
                var product = await _productRepository.GetById(id);
                return _mapper.Map<ProductEntity, Product>(product);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<IEnumerable<Product>> GetProductsAsync()
        {
            try
            {
                var products = await _productRepository.GetAll();
                return _mapper.Map<IEnumerable<ProductEntity>, IEnumerable<Product>> (products);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public async Task<IEnumerable<Product>> GetSellerProductsAsync(Guid userId)
        {
            try
            {
                var products = await _productRepository.GetAllSellers(userId);
                return _mapper.Map<IEnumerable<ProductEntity>, IEnumerable<Product>>(products);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<Product> UpdateProductAsync(Product product)
        {
            try
            {
                var productEntity = _mapper.Map<Product, ProductEntity>(product);
                var result = await _productRepository.Update(productEntity);
                return _mapper.Map<ProductEntity, Product>(result);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }
    }
}
