using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OrderService.DTOs
{
    public record CreateOrderItemDto
    (
        int BookId,
        int Quantity,
        decimal Price
    );
}
