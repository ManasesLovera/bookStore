using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BookService.DTOs;
using BookService.Interface;
using BookService.Models;
using Microsoft.AspNetCore.Mvc;

namespace BookService.Controllers;

[ApiController]
[Route("book")]
public class BookController : ControllerBase
{
    private readonly IBookRepository _bookRepo;
    private readonly IMapper _mapper;

    public BookController(IBookRepository bookRepository, IMapper mapper)
    {
        _bookRepo = bookRepository;
        _mapper = mapper;
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
    [HttpPost]
    public async Task<ActionResult<Book>> CreateBook([FromBody] BookCreateDto bookDto)
    {
        var bookModel = await _bookRepo.GetByTitleAsync(bookDto.Title);
        if (bookModel != null)
            return Conflict("This book already exists");

        var book = _mapper.Map<Book>(bookDto);
        book.CreatedAt = DateTime.UtcNow;
        book.UpdatedAt = DateTime.UtcNow;
        await _bookRepo.CreateAsync(book);

        return CreatedAtAction(nameof(GetBookById), new { id = book.Id }, book);
    }
}
