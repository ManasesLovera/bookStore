using Microsoft.EntityFrameworkCore;
using OrderService.Data;
using OrderService.Interface;
using OrderService.Models;

namespace OrderService.Repository;

public class BookRepository : IBookRepository
{
    private readonly ApplicationDbContext _context;

    public BookRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Book> AddStockAsync(int id, int amount)
    {
        var book = await _context.Books.FindAsync(id);

        if (book == null)
            return null;

        book.Stock += amount;
        await _context.SaveChangesAsync();

        return book;
    }

    public async Task<Book> CreateAsync(Book bookModel)
    {
        await _context.Books.AddAsync(bookModel);
        await _context.SaveChangesAsync();

        return await GetByIdAsync(bookModel.Id) ?? bookModel;
    }

    public async Task<Book> DeleteAsync(int id)
    {
        var book = await _context.Books.FindAsync(id);

        if (book == null)
            return null;

        _context.Books.Remove(book);
        await _context.SaveChangesAsync();

        return book;
    }

    public async Task<bool> ExistsAsync(int id)
    {
        var book = await _context.Books.FindAsync(id);
        return book != null ? true : false;
    }

    public async Task<List<Book>> GetAllAsync()
    {
        return await _context.Books.ToListAsync();
    }

    public async Task<Book> GetByIdAsync(int id)
    {
        var book = await _context.Books.FindAsync(id);
        return book;
    }

    public async Task<Book> RemoveStockAsync(int id, int amount)
    {
        var book = await _context.Books.FindAsync(id);

        if (book == null)
            return null;

        if (book.Stock - amount > 0)
            book.Stock -= amount;

        return book;
    }

    public async Task<Book> UpdateAsync(int id, Book bookModel)
    {
        var book = await _context.Books.FindAsync(id);

        book.Title = bookModel.Title;
        book.Author = bookModel.Author;
        book.Description = bookModel.Description;
        book.Price = bookModel.Price;
        book.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return book;
    }
}