namespace Auth.Model.Exceptions
{
    public class LogInException : ArgumentException
    {
        public LogInException() : base("Username does not exist!")
        {

        }
    }
}
