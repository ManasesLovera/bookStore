using Microsoft.EntityFrameworkCore;
using BookService.Models;

namespace BookService.Data;

public class InMemoryContext : DbContext 
{
    public InMemoryContext(DbContextOptions<InMemoryContext> options) : base(options)
    {
        
    }
    public DbSet<Book> Books { get; set; }
}