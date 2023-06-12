using Microsoft.AspNetCore.Mvc;
using Auth.Model;
using System;
using Auth.Model.Validators;
using System.Collections.Generic;
using FluentValidation.Results;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using SmartShop.Api.Attributes;
using Microsoft.AspNetCore.Authorization;

namespace Auth.API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private IUserService _userService;


        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [JwtUserAuthorization]
        [HttpGet]
        public IActionResult GetUser()
        {
            var userId = Guid.Parse((string)HttpContext.Items["id"] ?? string.Empty);
            try
            {
                var response = _userService.GetById(userId);
                return Ok(new { StatusCode = 200, User = response.Result });
            }
            catch (Exception e)
            {
                if (e.Message.Equals("Error with database connection."))
                {
                    // return BadRequest(new { StatusCode = 500, Message = e.Message });
                    return StatusCode(StatusCodes.Status500InternalServerError);
                }
                return BadRequest(new { StatusCode = 403, Message = e.Message });


            }
        }

        [JwtUserAuthorization]
        [HttpGet("GetAllSellers")]
        public async Task<IActionResult> GetAllSellers()
        {
            var userId = Guid.Parse((string)HttpContext.Items["id"] ?? string.Empty);
            var role = (string)HttpContext.Items["Role"] ?? string.Empty;
            if (userId == null)
            {
                return Unauthorized("You must authenticate as admin to see sellers!");
            }
            try
            {
                if (role == "2")
                {
                    var users = await _userService.GetAllSellers();
                    var userDto = users;
                    return Ok(userDto);
                }

                return Ok("No user found!");
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }



        [HttpPost("authenticate")]
        public IActionResult Authenticate(AuthenticateRequest model)
        {
            try
            {
                var response = _userService.Authenticate(model);
                return Ok(new { StatusCode = 200, Token = response.Result });
            }
            catch (Exception e)
            {
                if (e.Message.Equals("Error with database connection."))
                {
                    // return BadRequest(new { StatusCode = 500, Message = e.Message });
                    return StatusCode(StatusCodes.Status500InternalServerError);
                }
                return BadRequest(new { StatusCode = 403, Message = e.Message });


            }
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register(RegistrationRequest model)
        {
            if(model.Password == "")
            {
                model.Password = "somedummypass98/A";
                model.ConfirmPassword = "somedummypass98/A";
            }
            UserValidator validator = new UserValidator();
            List<string> ValidationMessages = new List<string>();
            var validationResult = validator.Validate(model);
            var response = new ResponseModel();
            if (!validationResult.IsValid)
            {
                response.IsValid = false;
                foreach (ValidationFailure failure in validationResult.Errors)
                {
                    ValidationMessages.Add(failure.ErrorMessage);
                }
                response.ValidationMessages = ValidationMessages;
                return BadRequest(new { StatusCode = 400, Message = response.ValidationMessages });
            }
            else
            {
                try
                {
                    string token = await _userService.Register(model);
                    return Ok(new { StatusCode = 200, Token = token });
                }
                catch (Exception e)
                {
                    if (e.Message.Equals("Error with database connection."))
                    {
                        // return BadRequest(new { StatusCode = 500, Message = e.Message });
                        return StatusCode(StatusCodes.Status500InternalServerError);
                    }
                    return BadRequest(new { StatusCode = 400, Message = e.Message });


                }

            }
        }

        [JwtUserAuthorization]
        [HttpPut("update")]
        public async Task<IActionResult> UpdateUserInfo(RegistrationRequest model)
        {
            var userId = Guid.Parse((string)HttpContext.Items["id"] ?? string.Empty);
            var role = (string)HttpContext.Items["Role"] ?? string.Empty;
            if (userId == null)
            {
                return Unauthorized("You must authenticate to update user info!");
            }
            try
            {
                UpdateUserValidator validator = new UpdateUserValidator();
                List<string> validationMessages = new List<string>();
                var validationResult = validator.Validate(model);
                var response = new ResponseModel();

                if (!validationResult.IsValid)
                {
                    response.IsValid = false;
                    foreach (ValidationFailure failure in validationResult.Errors)
                    {
                        validationMessages.Add(failure.ErrorMessage);
                    }

                    response.ValidationMessages = validationMessages;
                    return BadRequest(new { StatusCode = 400, Message = response.ValidationMessages });
                }
                else
                {
                    try
                    {
                        var v = await _userService.UpdateUser(model, userId);
                        if (!v)
                        {
                            return BadRequest(new { StatusCode = 400, Message = "Username or email is already taken!" });
                        }
                        return Ok(new { StatusCode = 200, Message = "User information updated successfully." });
                    }
                    catch (Exception e)
                    {
                        if (e.Message.Equals("Error with database connection."))
                        {
                            
                            return StatusCode(StatusCodes.Status500InternalServerError);
                        }

                        return BadRequest(new { StatusCode = 400, Message = e.Message });
                    }
                }

            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
            
        }

        [JwtUserAuthorization]
        [HttpPost("verify/{userIdToVerify}")]
        public async Task<IActionResult> Verify([FromRoute] Guid userIdToVerify, string status)
        {
            var userId = Guid.Parse((string)HttpContext.Items["id"] ?? string.Empty);
            var role = (string)HttpContext.Items["Role"] ?? string.Empty;
            if (userId == null)
            {
                return Unauthorized("You must authenticate as admin to verify users!");
            }
            try
            {
                if (role == "2")
                {
                    var users = await _userService.Verify(userIdToVerify, status);
                    var userDto = users;
                    return Ok(userDto);
                }

                return Ok("No user found!");
            }
            catch (Exception ex)
            {
                return Problem(ex.Message);
            }
        }        

    }
}
