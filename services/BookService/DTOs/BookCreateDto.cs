using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookService.DTOs;

public record BookCreateDto
(
    string Title,
    string Description,
    string Author,
    decimal Price,
    int Stock
);

