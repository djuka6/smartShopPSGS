using AutoMapper;
using SmartShop.Infrastructure.Implementations;
using SmartShop.Infrastructure.Models;
using SmartShop.Infrastructure.Repositories;
using SmartShop.Infrastructure.Repositories.Interfaces;
using SmartShop.Model.Models;
using SmartShop.Service.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.Design;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartShop.Service.Implementations
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IProductRepository _productRepository;
        private IMapper _mapper;
        public OrderService(IOrderRepository orderRepository, IMapper mapper, IProductRepository productRepository)
        {
            _orderRepository = orderRepository;
            _mapper = mapper;
            _productRepository = productRepository;
        }
        public async Task<Order> CreateAsync(Order order)
        {
            foreach(var item in order.Items)
            {
                var hasProductQuantity = await _orderRepository.HasProductQuantity(item.ProductId, item.Quantity);
                if (!hasProductQuantity)
                {
                    throw new Exception("Not enough product quantity in stock!");
                }
            }           

            try
            {
                var orderEntity = _mapper.Map<Order, OrderEntity>(order);
                orderEntity.DateTime = DateTime.Now;
                orderEntity.DeliveryTime = HelperDeliveryTime();
                orderEntity.Items.ForEach(x => x.Price = _productRepository.GetAll().Result.Where(i => i.Id == x.ProductId).FirstOrDefault().Price);
                orderEntity.TotalPrice = orderEntity.Items.Sum(x => x.Price * x.Quantity) + 200;

                var result = await _orderRepository.Create(orderEntity);
                return _mapper.Map<Order>(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private double HelperDeliveryTime()
        {
            Random random = new Random();
            int integerPart = random.Next(1, 7);
            int decimalPart = random.Next(0, 60);

            double randomDouble = Convert.ToDouble($"{integerPart}.{decimalPart:D2}");
            return randomDouble;           

        }

        public Task<bool> DeleteAsync(Guid id)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Order>> GetAll(Guid userId)
        {
            try
            {
                var orders = await _orderRepository.GetAll(userId);
                return _mapper.Map<IEnumerable<OrderEntity>, IEnumerable<Order>>(orders);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<IEnumerable<Order>> GetAllAdmin()
        {
            try
            {
                var orders = await _orderRepository.GetAllAdmin();
                return _mapper.Map<IEnumerable<OrderEntity>, IEnumerable<Order>>(orders);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Task<Order> UpdateAsync(Order order)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> DeclineOrderAsync(Guid orderId)
        {
            try
            {
                await _orderRepository.DeclineOrderAsync(orderId);
                return true;
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        public async Task<IEnumerable<Order>> GetAllSellers(Guid userId)
        {
            try
            {
                var orders = await _orderRepository.GetAllSellers(userId);
                return _mapper.Map<IEnumerable<OrderEntity>, IEnumerable<Order>>(orders);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
