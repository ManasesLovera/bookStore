using OrderService.Models;

namespace OrderService.Repository;

public interface IOrderItemRepository
{
    Task<List<OrderItem>> GetAllAsync();
    Task<OrderItem> GetByIdAsync(int id);
    Task<OrderItem> CreateAsync(OrderItem orderItemModel);
    Task<OrderItem> UpdateAsync(int id, OrderItem orderItemModel);
    Task<OrderItem> DeleteAsync(int id);
    Task<bool> Exists(int id);
}