using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OrderService.DTOs
{
    public record CreateOrderDto
    (
        int UserId,
        List<CreateOrderItemDto> OrderItems,
        decimal TotalAmount,
        string Status
    );
}
