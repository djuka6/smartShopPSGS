namespace Auth.Model
{
    public class RegistrationRequest
    {
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
        public DateTime Date { get; set; }
        public int Role { get; set; }
        public string Address { get; set; }
        public string ImgPath { get; set; }
        public int Status { get; set; } = 0;

        public RegistrationRequest(string email, string firstName, string lastName, string userName, string password, string confirmPassword, string address, string imgPath)
        {
            Email = email;
            FirstName = firstName;
            LastName = lastName;
            UserName = userName;
            Password = password;
            ConfirmPassword = confirmPassword;
            Address = address;
            ImgPath = imgPath;
        }
    }
}
