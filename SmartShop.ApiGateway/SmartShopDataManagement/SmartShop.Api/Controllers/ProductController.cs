using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using SmartShop.Api.Attributes;
using SmartShop.Api.Dtos;
using SmartShop.Model.Models;
using SmartShop.Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SmartShop.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;
        private readonly IMapper _mapper;

        public ProductController(IProductService orderService, IMapper mapper)
        {
            _productService = orderService;
            _mapper = mapper;
        }

        [JwtUserAuthorization]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var userId = Guid.Parse((string)HttpContext.Items["id"] ?? string.Empty);
            var role = (string)HttpContext.Items["Role"] ?? string.Empty;
            
            try
            {
                if(role == "1")
                {
                    var productsSeller = await _productService.GetSellerProductsAsync(userId);
                    var productDtosSeller = _mapper.Map<IEnumerable<ProductDto>>(productsSeller);
                    return Ok(productDtosSeller);
                }
                else
                {
                    var products = await _productService.GetProductsAsync();
                    var productDtos = _mapper.Map<IEnumerable<ProductDto>>(products);
                    return Ok(productDtos);
                }                
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }

        [JwtUserAuthorization]
        [HttpGet("{productId}")]
        public async Task<IActionResult> GetById([FromRoute] Guid productId)
        {
            var userId = Guid.Parse((string)HttpContext.Items["id"] ?? string.Empty);
            var role = (string)HttpContext.Items["Role"] ?? string.Empty;

            try
            {
                if (role == "1")
                {
                    var productSeller = await _productService.GetById(productId);
                    var productDtoSeller = productSeller;
                    return Ok(productDtoSeller);
                }
                
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
            return Problem("Something went wrong");
        }

        [JwtUserAuthorization]
        [HttpPost]
        public async Task<IActionResult> PostProduct(CreateProductDto dto)
        {
            var userId = Guid.Parse((string)HttpContext.Items["id"] ?? string.Empty);
            var role = (string)HttpContext.Items["Role"] ?? string.Empty;
            if (userId == null)
            {
                return Unauthorized("You must authenticate to create a new product");
            }
            if(role != "1")
            {
                return Unauthorized("You must be an seller to create a new product");
            }
            try
            {
                var product = _mapper.Map<Product>(dto);
                await _productService.CreateProductAsync(product, userId);
            }
            catch (Exception ex)
            {               
                throw ex;
            }
            return Ok(new { StatusCode = 200, Message = "Successfully created new Product" });
            
        }

        [JwtUserAuthorization]
        [HttpPut("/api/Product/update")]
        public async Task<IActionResult> UpdateProduct(ProductDto dto)
        {
            var userId = Guid.Parse((string)HttpContext.Items["id"] ?? string.Empty);
            var role = (string)HttpContext.Items["Role"] ?? string.Empty;
            if (userId == null)
            {
                return Unauthorized("You must authenticate to update a new product");
            }
            if (role != "1")
            {
                return Unauthorized("You must be an seller to update a new product");
            }
            try
            {
                var product = _mapper.Map<Product>(dto);
                await _productService.UpdateProductAsync(product);
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return Ok(new { StatusCode = 200, Message = "Successfully updated product" });
        }

        [JwtUserAuthorization]
        [HttpDelete("/api/Product/delete/{productId}")]
        public async Task<IActionResult> DeleteProduct([FromRoute]Guid productId)
        {
            var userId = Guid.Parse((string)HttpContext.Items["id"] ?? string.Empty);
            var role = (string)HttpContext.Items["Role"] ?? string.Empty;
            if (userId == Guid.Empty)
            {
                return Unauthorized("You must authenticate to delete a product");
            }
            if (role != "1")
            {
                return Unauthorized("You must be an seller to delete a product");
            }
            try
            {
                await _productService.DeleteProductAsync(productId);
            }
            catch (Exception ex)
            {
                throw ex;
            }

            return Ok(new { StatusCode = 200, Message = "Successfully deleted product" });
        }

    }
}
