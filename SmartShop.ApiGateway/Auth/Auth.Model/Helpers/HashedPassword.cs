namespace Auth.Model.Helpers
{
    public class HashedPassword
    {
        public string Password { get; set; }
        public string Salt { get; set; }

        public HashedPassword(string password, string salt)
        {
            Password = password;
            Salt = salt;
        }
    }
}
