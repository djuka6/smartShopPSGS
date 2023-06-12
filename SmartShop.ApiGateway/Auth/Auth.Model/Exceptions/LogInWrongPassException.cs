namespace Auth.Model.Exceptions
{
    public class LogInWrongPassException : ArgumentException
    {
        public LogInWrongPassException() : base("Password is incorrect!")
        {

        }
    }
}
