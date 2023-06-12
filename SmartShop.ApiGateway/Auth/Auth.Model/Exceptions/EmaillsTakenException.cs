namespace Auth.Model.Exceptions
{
    public class EmailIsTakenException : ArgumentException
    {
        public EmailIsTakenException() : base("Email is already taken!")
        {

        }
    }
}
