using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace Q1WebAPI.Models
{
    public class LibraryManagementContext : DbContext
    {
        public LibraryManagementContext(DbContextOptions<LibraryManagementContext> options) : base(options) { }
        public DbSet<Book> Book { get; set; }
    }
}
