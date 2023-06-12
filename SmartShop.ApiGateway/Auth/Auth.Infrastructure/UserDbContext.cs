using Auth.Infrastructure.DBO;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Auth.Infrastructure.DBO;
using System.Diagnostics;

namespace Auth.Infrastructure
{
    public class UsersDbContext : DbContext
    {
        public UsersDbContext() { }

        public UsersDbContext(DbContextOptions<UsersDbContext> options)
            : base(options)
        {
        }
        public DbSet<UserDbo> Users { get; set; }
        public DbSet<UserWaitingForVerify> WaitingList { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                var builder = new ConfigurationBuilder()
                    .SetBasePath(Directory.GetCurrentDirectory())
                    .AddJsonFile("appsettings.json");

                IConfiguration configuration = builder.Build();

                var connectionString = configuration.GetConnectionString("DbConn");

                optionsBuilder.UseSqlite(connectionString);
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // configure entity mappings here
            modelBuilder.Entity<UserDbo>(entity =>
            {
                entity.HasKey(e => e.Id)
                    .HasName("PK_Id");

                entity.ToTable("Users");

                entity.Property(e => e.Id).ValueGeneratedOnAdd();

                entity.Property(e => e.Email)
                    .IsRequired();

                entity.Property(e => e.FirstName)
                    .IsRequired();

                entity.Property(e => e.Role)
                    .IsRequired();

                entity.Property(e => e.LastName)
                   .IsRequired();

                entity.Property(e => e.Password)
                   .IsRequired();

                entity.Property(e => e.Salt)
                  .IsRequired();

                entity.Property(e => e.UserName)
                  .IsRequired();

            });           

            base.OnModelCreating(modelBuilder);
        }

        public override void Dispose()
        {
            Debug.WriteLine("Context disposed.");
            base.Dispose();
        }
    }
}