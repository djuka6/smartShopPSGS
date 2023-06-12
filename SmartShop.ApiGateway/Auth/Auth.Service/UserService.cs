using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Auth.Model;
using Auth.Model.Exceptions;
using Auth.Model.InfrastructureInterfaces;
using System.Security.Cryptography;
using Auth.Model.Helpers;
using Microsoft.Extensions.Configuration;
using System.Net.Mail;
using System.Net;

namespace Auth.Service
{
    public class UserService : IUserService
    {
        private readonly IUserInfrastructureService _userInfrastructureService;
        private readonly IConfiguration _configuration;

        public string salt;

        // users hardcoded for simplicity, store in a db with hashed passwords in production applications

        public UserService(IUserInfrastructureService userInfrastructureService, IConfiguration configuration)
        {
            _userInfrastructureService = userInfrastructureService;
            _configuration = configuration;
        }

        public async Task<string> Authenticate(AuthenticateRequest model)
        {
            IEnumerable<User> allUsers;
            try
            {
                allUsers = await _userInfrastructureService.GetAllAsync();
            }
            catch (Exception e)
            {
                throw new DatabaseConnectionException();
            }
            var user = allUsers.SingleOrDefault(x => x.UserName == model.Username);
            if (user == null)
            {
                throw new LogInException();
            }

            HashedPassword hashedPassword = new HashedPassword(model.Password, user.Salt);
            string pass = PassDecoding(hashedPassword);

            if (!pass.Equals(user.Password))
            {
                throw new LogInWrongPassException();
            }


            // authentication successful so generate jwt token
            var token = generateJwtToken(user);

            return token;

        }

        public async Task<string> Register(RegistrationRequest model)
        {
            IEnumerable<User> allUsers;
            try
            {
                allUsers = await _userInfrastructureService.GetAllAsync();
            }
            catch (Exception e)
            {
                throw new DatabaseConnectionException();
            }


            // checking if username or email is already taken in database, return exception 
            foreach (var u in allUsers)
            {
                if (u.UserName.Equals(model.UserName))
                {
                    throw new UsernameIsTakenException();
                }
                else if (u.Email.Equals(model.Email))
                {
                    throw new EmailIsTakenException();
                }
            }
            
            HashedPassword hashedPassword = PassEncoding(model.Password);
            User user = new User(model.FirstName, model.LastName, model.UserName, model.Email, hashedPassword.Password, hashedPassword.Salt, model.Date, model.Role, model.Address, model.ImgPath);

            _userInfrastructureService.SaveUser(user);
            allUsers = await _userInfrastructureService.GetAllAsync();
            User userForToken = allUsers.SingleOrDefault(x => x.UserName == model.UserName);
            // authentication successful so generate jwt token
            var token = generateJwtToken(userForToken);

            return token;
        }

        public async Task<IEnumerable<User>> GetAll()
        {
            return await _userInfrastructureService.GetAllAsync();
        }

        public async Task<User> GetById(Guid id)
        {
            return await _userInfrastructureService.GetByIdAsync(id);
        }


        // xonbthryeoynrdcc
        private void SendEmail()
        {
            try
            {
                
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error -" + ex);
            }
        }

        public async Task<User> Verify(Guid id, string status)
        {
            try
            {
                MailMessage newMail = new MailMessage();
                SmtpClient client = new SmtpClient("smtp.gmail.com")
                {
                    Port = 587,
                    Credentials = new NetworkCredential("djukicdjordje98@gmail.com", _configuration["EmailPassword"]),
                    EnableSsl = true,
                };
                newMail.From = new MailAddress("djukicdjordje98@gmail.com", "SmartShop");
                newMail.To.Add("djukicdjordje98@gmail.com");
                newMail.Subject = "Verifikacija naloga";
                newMail.IsBodyHtml = true;
                newMail.Body = "<h3> Vaš nalog je verifikovan, postali ste prodavac. </h3>";

                client.Send(newMail); // Send the constructed mail
                var user = await _userInfrastructureService.Verify(id, status);
                /*var from = "djordjekanters@gmail.com";
                var to = "djukicdjordje98@gmail.com";
                var email = new MimeMessage();
                email.From.Add(MailboxAddress.Parse("djordjekanters@gmail.com"));
                email.To.Add(MailboxAddress.Parse("djukicdjordje98@gmail.com"));
                email.Subject = "Test Email Subject";
                email.Body = new TextPart(TextFormat.Html) { Text = "Vas nalog je verifikovan!" };

                using var smtp = new MailKit.Net.Smtp.SmtpClient();
                smtp.Connect("smtp.gmail.com", 587, SecureSocketOptions.StartTls);
                smtp.Authenticate("djordjekanters@gmail.com", "");
                smtp.Send(email);
                smtp.Disconnect(true);*/

                return user;
            }
            catch (Exception ex)
            {
                throw ex;
            }


        }

        private string generateJwtToken(User user)
        {
            // generate token that is valid for 7 days
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["SecretKey"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()), new Claim("Role", user.Role.ToString()) }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public static string CreateSalt(int size)
        {
            //Generate a cryptographic random number.
            RNGCryptoServiceProvider rng = new RNGCryptoServiceProvider();
            byte[] buff = new byte[size];
            rng.GetBytes(buff);

            // Return a Base64 string representation of the random number.
            return Convert.ToBase64String(buff);
        }
        private HashedPassword PassEncoding(string password)
        {
            using (var sha = SHA256.Create())
            {
                salt = CreateSalt(16);

                var computedHash = sha.ComputeHash(Encoding.Unicode.GetBytes(salt + password));
                HashedPassword hashedPassword = new HashedPassword(Convert.ToBase64String(computedHash), salt);

                return hashedPassword;
            }
        }
        private string PassDecoding(HashedPassword hashedPassword)
        {
            using (var sha = SHA256.Create())
            {
                var computedHash = sha.ComputeHash(Encoding.Unicode.GetBytes(hashedPassword.Salt + hashedPassword.Password));
                string pass = Convert.ToBase64String(computedHash);

                return pass;
            }
        }

        public async Task<bool> UpdateUser(RegistrationRequest model, Guid userId)
        {
            try
            {
                User user = await _userInfrastructureService.GetByIdAsync(userId);
                // Fetch the user by the username
                if (user == null)
                {
                    throw new UserNotFoundException();
                }

                IEnumerable<User> allUsers;
                try
                {
                    allUsers = await _userInfrastructureService.GetAllAsync();
                }
                catch (Exception e)
                {
                    throw new DatabaseConnectionException();
                }


                // checking if username or email is already taken in database, return exception 
                foreach (var u in allUsers)
                {
                    if (u.UserName.Equals(model.UserName) && u.UserName != user.UserName)
                    {
                        throw new UsernameIsTakenException();
                    }
                    else if (u.Email.Equals(model.Email) && u.Email != user.Email)
                    {
                        throw new EmailIsTakenException();
                    }
                }


                // Update the fields
                user.FirstName = model.FirstName;
                user.LastName = model.LastName;
                user.Email = model.Email;
                user.Address = model.Address;
                user.Date = model.Date;
                user.ImgPath = model.ImgPath;

                // Check if the password needs to be updated
                if (!string.IsNullOrEmpty(model.Password))
                {
                    HashedPassword hashedPassword = PassEncoding(model.Password);
                    user.Password = hashedPassword.Password;
                    user.Salt = hashedPassword.Salt;
                }

                // Save the updated user
                await _userInfrastructureService.UpdateUserAsync(user);

                return true;
            }
            catch (Exception e)
            {
                // Log the exception and return false
                Console.WriteLine(e);
                return false;
            }
        }

        public async Task<IEnumerable<User>> GetAllSellers()
        {
            try
            {
                var allSellers = await _userInfrastructureService.GetAllSellersAsync();
                return allSellers;
            }
            catch (Exception e)
            {
                // Log the exception and return false
                Console.WriteLine(e);
                throw e;
            }
        }
    }
}