using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BookService.DTOs;
using BookService.Interface;
using BookService.Models;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace BookService.Controllers;

[ApiController]
[Route("book")]
public class BookController : ControllerBase
{
    private readonly IBookRepository _bookRepo;
    private readonly IMapper _mapper;
    private readonly IValidator<BookCreateDto> _bookCreateValidator;
    private readonly IValidator<BookUpdateDto> _bookUpdateValidator;

    public BookController(IBookRepository bookRepository, IMapper mapper, 
        IValidator<BookCreateDto> validator, IValidator<BookUpdateDto> validatorUpdate)
    {
        _bookRepo = bookRepository;
        _mapper = mapper;
        _bookCreateValidator = validator;
        _bookUpdateValidator = validatorUpdate;
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
        var validationResult = await _bookCreateValidator.ValidateAsync(bookDto);
        if (!validationResult.IsValid)
        {
            return BadRequest(validationResult.Errors);
        }

        var bookModel = await _bookRepo.GetByTitleAsync(bookDto.Title);
        if (bookModel != null)
            return Conflict("This book already exists");


        var book = _mapper.Map<Book>(bookDto);
        book.CreatedAt = DateTime.UtcNow;
        book.UpdatedAt = DateTime.UtcNow;
        await _bookRepo.CreateAsync(book);

        return CreatedAtAction(nameof(GetBookById), new { id = book.Id }, book);
    }

    [HttpDelete("{id:int}")]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    public async Task<ActionResult> DeleteBookById(int id)
    {
        var book = await _bookRepo.DeleteAsync(id);

        return book == null ? NotFound() : NoContent();
    }

    [HttpPatch("stock/add")]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<Book>> AddStock([FromBody] BookStockDto bookStockDto)
    {
        var book = await _bookRepo.AddStockAsync(bookStockDto.Id, bookStockDto.Amount);

        return book == null ? NotFound() : Ok(book);
    }

    //Api/book/book/1/3
    //Remove/reduce stocks to a book by id and amount
    [HttpPatch("stock/remove")]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult> RemoveStock([FromBody] BookStockDto bookStockDto)
    {
        var book = await _bookRepo.RemoveStockAsync(bookStockDto.Id, bookStockDto.Amount);

        return book == null ? NotFound() : Ok(book);
    }

    [HttpPut("{id:int}")]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<Book>> UpdateBook( int id,[FromBody]BookUpdateDto bookUpdateDto)
    {
        var validationResult = await _bookUpdateValidator.ValidateAsync(bookUpdateDto);
        if (!validationResult.IsValid)
        {
            return BadRequest(validationResult.Errors);
        }

        var bookMapper = _mapper.Map<Book>(bookUpdateDto);
        bookMapper.UpdatedAt = DateTime.UtcNow;

        var book = await _bookRepo.UpdateAsync(id, bookMapper);

        return book == null ? NotFound() : Ok(book);
    }

}
