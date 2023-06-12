using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SmartShop.Api.Attributes;
using SmartShop.Api.Dtos;
using SmartShop.Model.Models;
using SmartShop.Service.Implementations;
using SmartShop.Service.Interfaces;
using System.Security.Claims;

namespace SmartShop.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderService _orderService;
        private readonly IMapper _mapper;

        public OrdersController(IOrderService orderService, IMapper mapper)
        {
            _orderService = orderService;
            _mapper = mapper;
        }

        [JwtUserAuthorization]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var userId = Guid.Parse((string)HttpContext.Items["id"] ?? string.Empty);
            var role = (string)HttpContext.Items["Role"] ?? string.Empty;
            if(userId == null)
            {
                return Unauthorized("You must authenticate to see your orders!");
            }
            try
            {
                if(role == "0" || role == "1")
                {
                    var orders = await _orderService.GetAll(userId);
                    var orderDtos = orders;
                    return Ok(orderDtos);
                }
                if (role == "2")
                {
                    var orders = await _orderService.GetAllAdmin();
                    var orderDtos = orders;
                    return Ok(orderDtos);
                }

                return Ok("No orders found!");
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        [JwtUserAuthorization]
        [HttpGet("sellers")]
        public async Task<IActionResult> GetAllSellers()
        {
            var userId = Guid.Parse((string)HttpContext.Items["id"] ?? string.Empty);
            var role = (string)HttpContext.Items["Role"] ?? string.Empty;
            if (userId == null)
            {
                return Unauthorized("You must authenticate to see your orders!");
            }
            try
            {
                if (role == "1" || role == "2")
                {
                    var orders = await _orderService.GetAllSellers(userId);
                    var orderDtos = orders.Where(x => x.DeliveryTime > 0);
                    return Ok(orderDtos);
                }
                

                return Ok("No orders found!");
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        [JwtUserAuthorization]
        [HttpGet("sellers-old")]
        public async Task<IActionResult> GetAllOldSellers()
        {
            var userId = Guid.Parse((string)HttpContext.Items["id"] ?? string.Empty);
            var role = (string)HttpContext.Items["Role"] ?? string.Empty;
            if (userId == null)
            {
                return Unauthorized("You must authenticate to see your orders!");
            }
            try
            {
                if (role == "1" || role == "2")
                {
                    var orders = await _orderService.GetAllSellers(userId);
                    var orderDtos = orders.Where(x => x.DeliveryTime <= 0);
                    return Ok(orderDtos);
                }


                return Ok("No orders found!");
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }


        [JwtUserAuthorization]
        [HttpPost]
        public IActionResult PostOrder(CreateOrderDto dto)
        {           
            var userId = Guid.Parse((string)HttpContext.Items["id"] ?? string.Empty);
            var role = (string)HttpContext.Items["Role"] ?? string.Empty;
                      
            if (userId == null)
            {
                return Unauthorized("You must authenticate to see your orders!");
            }            
            try
            {
                dto.UserId = userId;
                var order = _mapper.Map<Order>(dto);
                var returnedOrder = _orderService.CreateAsync(order);
                if(returnedOrder.Exception != null)
                {
                    
                    return BadRequest(returnedOrder.Exception.InnerException.Message);
                }
            }
            catch (Exception ex)
            {
            
                throw ex;
            }
            return Ok("Successfully created new Order");
        }

        [HttpPut("{id:Guid}")]
        public IActionResult UpdateOrder(Guid id, OrderDto dto)
        {
            try
            {
                var order = _mapper.Map<Order>(dto);
                order.Id = id;
                _orderService.UpdateAsync(order);
                return Ok("Successfully updated Order");
            }
            catch (Exception ex)
            {
                
                throw ex;
            }
        }
        [HttpPost("decline/{orderId}")]
        public async Task<IActionResult> DeclineOrderAsync([FromRoute]Guid orderId)
        {
            try
            {
               var pom = await _orderService.DeclineOrderAsync(orderId);
                if (pom)
                {
                    return (Ok("Successfully declined Order"));
                }
                else
                {
                    return BadRequest("Order is on the way!");
                }
               
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

    }

}

