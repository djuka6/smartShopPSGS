using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using SmartShop.Infrastructure.Models;
using System.Diagnostics;

namespace SmartShop.Infrastructure
{
    public class SSDbContext : DbContext
    {
        public SSDbContext() { }

        public SSDbContext(DbContextOptions<SSDbContext> options)
            : base(options)
        {
        }
        public DbSet<OrderEntity> Orders { get; set; }
        public DbSet<ProductEntity> Products { get; set; }
        public DbSet<ItemEntity> Items { get; set; }
        

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
            modelBuilder.Entity<OrderEntity>(entity =>
            {
                entity.HasKey(e => e.Id)
                    .HasName("PK_Id");

                entity.ToTable("Orders");

                entity.Property(e => e.Id).ValueGeneratedOnAdd();

                entity.Property(e => e.UserId)
                    .IsRequired();

                entity.Property(e => e.Address)
                    .IsRequired();

                entity.Property(e => e.Comment)
                    .IsRequired();

                entity.Property(e => e.DateTime)
                   .IsRequired();

                entity
                    .HasMany(e => e.Items)
                    .WithOne(e => e.Order)
                    .HasForeignKey(e => e.OrderId);
            });

            modelBuilder.Entity<ItemEntity>(entity =>
            {
                entity.HasKey(e => e.Id)
                    .HasName("PK_Id");

                entity.ToTable("Items");

                entity.Property(e => e.Id).ValueGeneratedOnAdd();

                entity.Property(e => e.Quantity)
                    .IsRequired();                

                entity.Property(e => e.OrderId)
                   .IsRequired();
                entity
                   .HasOne(e => e.Product);                
            });           

            modelBuilder.Entity<ProductEntity>(entity =>
            {
                entity.HasKey(e => e.Id)
                    .HasName("PK_Id");

                entity.ToTable("Products");

                entity.Property(e => e.Id).ValueGeneratedOnAdd();

                entity.Property(e => e.Name)
                    .IsRequired();

                entity.Property(e => e.Quantity)
                    .IsRequired();

                entity.Property(e => e.Description)
                    .IsRequired();

                entity.Property(e => e.Price)
                    .IsRequired();

                entity.Property(e => e.ImgSrc)
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