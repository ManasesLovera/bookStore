
namespace BookService.DTOs;

public record BookUpdateDto (
	string Title,
	string Author,
	decimal Price,
	string Description
);