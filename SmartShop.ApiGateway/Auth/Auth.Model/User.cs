using System.Text.Json.Serialization;


namespace Auth.Model
{
    public class User
    {
        public Guid Id { get;  set; }
        public string FirstName { get; set; }
        public string LastName { get;  set; }
        public string UserName { get; set; }
        public string Email { get;  set; }
        public int Role { get;  set; }
        public string Status { get; set; }

        public string Address { get; set; }
        public string ImgPath { get; set; }
        public DateTime Date { get; set; }


        [JsonIgnore]
        public string Password { get; set; }
        [JsonIgnore]
        public string Confirm { get; set; }

        [JsonIgnore]
        public string Salt { get; set; }
        public User(string fName, string lName, string uName, string mail, string pass, string salt, DateTime date, int role, string address, string imgPath)
        {
            FirstName = fName;
            LastName = lName;
            UserName = uName;
            Email = mail;
            Password = pass;
            Role = role;
            Date = date;
            Salt = salt;
            Address = address;
            ImgPath = imgPath;
        }
        public User(string fName, string lName, string uName, string mail, string pass, Guid id, string salt, DateTime date, int role, string address, string imgPath)
        {
            Id = id;
            FirstName = fName;
            LastName = lName;
            UserName = uName;
            Email = mail;
            Password = pass;
            Role = role;
            Date = date;
            Salt = salt;
            Address = address;
            ImgPath = imgPath;
        }
        public User()
        {
        }

    }
}
