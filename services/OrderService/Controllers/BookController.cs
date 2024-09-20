using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using OrderService.DTOs;
using OrderService.Interface;
using OrderService.Models;

namespace OrderService.Controllers;

[ApiController]
[Route("api/book")]
public class BookController : MyControllerBase
{
    private readonly IBookRepository _bookRepo;
    public BookController(IMapper mapper, IBookRepository bookRepository) : base(mapper)
    {
        _bookRepo = bookRepository;
    }
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Book>>> GetBooks()
    {
        return await _bookRepo.GetAllAsync();
    }
    [HttpGet("{id:int}")]
    public async Task<ActionResult<Book>> GetBookById(int id)
    {
        var book = await _bookRepo.GetByIdAsync(id);

        if (book == null)
        {
            return NotFound();
        }

        return Ok(book);
    }
    [HttpGet("/title/{title}")]
    public async Task<ActionResult<Book>> GetBookByTitle(string title)
    {
        var book = await _bookRepo.GetByTitleAsync(title);

        if (book == null)
            return NotFound();

        return Ok(book);
    }
    [HttpPost]
    public async Task<ActionResult<Book>> CreateBook([FromBody] BookCreateDto bookDto)
    {
        var bookModel = await _bookRepo.GetByTitleAsync(bookDto.Title);

        if (bookModel != null)
            return Conflict("Book already exists");

        Book book = new Book() {
            Description = bookDto.Description,
            Title = bookDto.Title,
            Author = bookDto.Author,
            Price = bookDto.Price,
            Stock = bookDto.Stock,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        await _bookRepo.CreateAsync(book);

        return CreatedAtAction(nameof(GetBookByTitle), new { id = book.Title }, book);
    }
    [HttpDelete("{id:int}")]
    public async Task<ActionResult> DeleteBookById(int id)
    {
        bool result = await _bookRepo.DeleteAsync(id);

        if (!result)
            return NotFound();

        return Ok(new{ message= "Deleted Successfully!"});
    }
}