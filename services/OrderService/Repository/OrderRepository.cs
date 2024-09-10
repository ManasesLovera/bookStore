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
    }

    public async Task DeleteAsync(Order order)
    {
        _context.Remove(order);
    }

    public async Task<bool> Exists(int id)
    {
        var order = await _context.Orders.FirstAsync(x => x.Id == id);
        return order == null ? true : false;
    }

    public async Task<List<Order>> GetAllAsync()
    {
        var orderList = await _context.Orders.ToListAsync();
        return orderList;
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
    }

    public async Task Save() =>
        await _context.SaveChangesAsync();
}