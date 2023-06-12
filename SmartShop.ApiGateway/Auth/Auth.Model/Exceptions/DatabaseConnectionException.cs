namespace Auth.Model.Exceptions
{
    public class DatabaseConnectionException : ArgumentException
    {
        public DatabaseConnectionException() : base("Error with database connection.")
        {

        }
    }
}
