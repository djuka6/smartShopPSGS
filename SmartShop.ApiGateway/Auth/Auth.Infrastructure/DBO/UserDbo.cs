namespace Auth.Infrastructure.DBO
{
    public class UserDbo
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public int Role { get; set; }
        public string Password { get; set; }
        public string Salt { get; set; }
        public string Status { get; set; } 
        public DateTime Date { get; set; }
        public string Address { get; set; }
        public string ImgPath { get; set; }


    }
}
