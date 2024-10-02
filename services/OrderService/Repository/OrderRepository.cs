using Microsoft.EntityFrameworkCore;
using OrderService.Data;
using OrderService.DTOs;
using OrderService.Interface;
using OrderService.Models;

namespace OrderService.Repository;

public class OrderRepository : IOrderRepository
{
    private readonly InMemoryContext _context;

    public OrderRepository(InMemoryContext context)
    {
        _context = context;
    }

    public async Task<Order> CreateAsync(CreateOrderDto createOrderDto)
    {
        var order = new Order
        {
            UserId = createOrderDto.UserId,
            TotalAmount = createOrderDto.TotalAmount,
            Status = createOrderDto.Status,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow,
            OrderItems = createOrderDto.OrderItems.Select(item => new OrderItem
            {
                BookId = item.BookId,
                Quantity = item.Quantity,
                Price = item.Price
            }).ToList()
        };

        await _context.Orders.AddAsync(order);
        await _context.SaveChangesAsync();

        return order;
    }

    public async Task DeleteAsync(Order order)
    {
        _context.Remove(order);
        await _context.SaveChangesAsync();
    }

    public async Task<bool> Exists(int id)
    {
        var order = await _context.Orders.FindAsync(id);
        return order != null;
    }

    public async Task<List<Order>> GetAllAsync()
    {
        return await _context.Orders.ToListAsync();
    }

    public async Task<Order> GetByIdAsync(int id)
    {
        return await _context.Orders
            .Include(o => o.OrderItems)
            .ThenInclude(oi => oi.Book)
            .FirstOrDefaultAsync(o => o.Id == id);
    }

    public async Task UpdateAsync(Order orderModel)
    {
        _context.Orders.Attach(orderModel);
        _context.Orders.Entry(orderModel).State = EntityState.Modified;
        await _context.SaveChangesAsync();
    }

    public async Task Save() =>
        await _context.SaveChangesAsync();
}