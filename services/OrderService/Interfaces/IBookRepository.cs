using OrderService.Models;

namespace OrderService.Interface;

public interface IBookRepository
{
    Task<List<Book>> GetAllAsync();
    Task<Book> GetByIdAsync(int id);
    Task<Book> CreateAsync(Book bookModel);
    Task<Book> UpdateAsync(int id, Book bookModel);
    Task<Book> DeleteAsync(int id);
    Task<bool> Exists(int id);
}