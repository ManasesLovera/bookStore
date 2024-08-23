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

        return book;
    }
    // [HttpPost]
    // public async Task<ActionResult<Book>> CreateBook([FromBody] BookCreateDto bookDto)
    // {
    //     // var bookModel = await _bookRepo.GetByIdAsync(bookDto.
    //     await _bookRepo.CreateAsync(book);

    //     return CreatedAtAction(nameof(GetBookById), new { id = book.Id }, book);
    // }
}