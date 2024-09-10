using Microsoft.EntityFrameworkCore;
using OrderService.Data;
using OrderService.Models;
using OrderService.Repository;

namespace OrderService.Models;

public class OrderItemRepository : IOrderItemRepository
{

    private readonly InMemoryContext _context;

    public OrderItemRepository(InMemoryContext context)
    {
        _context = context;
    }

    public async Task CreateAsync(OrderItem orderItemModel)
    {
        await _context.OrderItems.AddAsync(orderItemModel);
    }

    public async Task DeleteAsync(OrderItem orderItemModel)
    {
        _context.Remove(orderItemModel);
    }

    public async Task<bool> Exists(int id)
    {
        var order = await _context.OrderItems.FirstAsync(x => x.Id == id);
        return order == null ? true : false;
    }

    public async Task<List<OrderItem>> GetAllAsync()
    {
        var orderList = await _context.OrderItems.ToListAsync();
        return orderList;
    }

    public async Task<OrderItem> GetByIdAsync(int id)
    {
        var order = await _context.OrderItems.FindAsync(id);
        return order;
    }

    public async Task UpdateAsync(OrderItem orderItemModel)
    {
        _context.OrderItems.Attach(orderItemModel);
        _context.OrderItems.Entry(orderItemModel).State = EntityState.Modified;
    }
    public async Task Save() =>
        await _context.SaveChangesAsync();

}