using Microsoft.EntityFrameworkCore;
using OrderService.Data;
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

    public async Task CreateAsync(Order orderModel)
    {
        await _context.AddAsync(orderModel);
        await _context.SaveChangesAsync();
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
        var order = await _context.Orders.FindAsync(id);
        return order;
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