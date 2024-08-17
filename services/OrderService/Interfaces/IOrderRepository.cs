using OrderService.Models;

namespace OrderService.Interface;

public interface IOrderRepository
{
    Task<List<Order>> GetAllAsync();
    Task<Order> GetByIdAsync(int id);
    Task<Order> CreateAsync(Order orderModel);
    Task<Order> UpdateAsync(int id, Order orderModel);
    Task<Order> DeleteAsync(int id);
    Task<bool> Exists(int id);
}