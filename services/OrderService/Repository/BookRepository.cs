using OrderService.Interface;
using OrderService.Models;

namespace OrderService.Repository;

public class BookRepository : IBookRepository
{
    public Task<Book> CreateAsync(Book bookModel)
    {
        throw new NotImplementedException();
    }

    public Task<Book> DeleteAsync(int id)
    {
        throw new NotImplementedException();
    }

    public Task<bool> Exists(int id)
    {
        throw new NotImplementedException();
    }

    public Task<List<Book>> GetAllAsync()
    {
        throw new NotImplementedException();
    }

    public Task<Book?> GetByIdAsync(int id)
    {
        throw new NotImplementedException();
    }

    public Task<Book> UpdateAsync(int id, Book bookModel)
    {
        throw new NotImplementedException();
    }
}