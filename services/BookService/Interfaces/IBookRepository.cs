using BookService.Models;

namespace BookService.Interface;

public interface IBookRepository
{
    Task<List<Book>> GetAllAsync();
    Task<Book> GetByIdAsync(int id);
    Task<Book> GetByTitleAsync(string title);
    Task<Book> CreateAsync(Book bookModel);
    Task<Book> UpdateAsync(int id, Book bookModel);
    Task<Book> DeleteAsync(int id);
    Task<bool> ExistsAsync(int id);
    Task<Book> AddStockAsync(int id, int amount);
    Task<Book> RemoveStockAsync(int id, int amount);
}