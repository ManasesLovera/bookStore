namespace OrderService.DTOs;

public record BookCreateDto 
(
    string Description,
    string Title,
    string Author,
    decimal Price,
    int Stock
);