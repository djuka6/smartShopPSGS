using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SmartShop.Infrastructure
{
    public class SSDbContextFactory : IDesignTimeDbContextFactory<SSDbContext>
    {
        public SSDbContext CreateDbContext(string[] args)
        {
            var builder = new ConfigurationBuilder()
                    .SetBasePath(Directory.GetCurrentDirectory())
                    .AddJsonFile("appsettings.json");

            IConfiguration configuration = builder.Build();
            var connectionString = configuration.GetConnectionString("DbConn");

            var optionsBuilder = new DbContextOptionsBuilder<SSDbContext>();
            optionsBuilder.UseSqlite(connectionString);
            return new SSDbContext(optionsBuilder.Options);
        }
    }
}
