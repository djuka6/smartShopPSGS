using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Auth.Model
{
    public class UpdateUserRequest
    {
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }

        public string Address { get; set; }
        public byte[] ImgPath { get; set; }

        public UpdateUserRequest(string email, string firstName, string lastName, string userName, string password, string confirmPassword, string address)
        {
            Email = email;
            FirstName = firstName;
            LastName = lastName;
            UserName = userName;
            Password = password;
            ConfirmPassword = confirmPassword;
            Address = address;
        }
    }
}
