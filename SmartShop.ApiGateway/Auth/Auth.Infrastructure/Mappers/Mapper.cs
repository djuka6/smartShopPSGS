using Auth.Infrastructure.DBO;
using Auth.Model;

namespace Auth.Infrastructure.Mappers
{
    public class Mapper
    {
        public static User Map(UserDbo dbo)
        {
            if (dbo == null) return null;
            return new User(dbo.FirstName,
                dbo.LastName,
                dbo.UserName,
                dbo.Email,
                dbo.Password,
                dbo.Id,
                dbo.Salt,
                dbo.Date,
                dbo.Role,
                dbo.Address,
                dbo.ImgPath
                );
        }

        public static List<User> Map(List<UserDbo> dbos)
        {
            var users = new List<User>();
            if (dbos == null) return null;
            foreach(var item in dbos) {
                User dbo = new User
                {
                    FirstName = item.FirstName,
                    LastName = item.LastName,
                    UserName = item.UserName,
                    Email = item.Email,
                    Password = item.Password,
                    Role = item.Role,
                    Salt = item.Salt
                };
            }
            return users;
        }

        public static UserDbo Map(User user)
        {
            if (user == null) return null;

            UserDbo dbo = new UserDbo
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                UserName = user.UserName,
                Email = user.Email,
                Password = user.Password,
                Role = user.Role,
                Salt = user.Salt
            };
            return dbo;
        }
    }
}
