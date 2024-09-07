using OrderService.Models;
using OrderService.Repository;

namespace OrderService.Models;

public class OrderItemRepository : IOrderItemRepository
{
    public Task<OrderItem> CreateAsync(OrderItem orderItemModel)
    {
        throw new NotImplementedException();
    }

    public Task<OrderItem> DeleteAsync(int id)
    {
        throw new NotImplementedException();
    }

    public Task<bool> Exists(int id)
    {
        throw new NotImplementedException();
    }

    public Task<List<OrderItem>> GetAllAsync()
    {
        throw new NotImplementedException();
    }

    public Task<OrderItem> GetByIdAsync(int id)
    {
        throw new NotImplementedException();
    }

    public Task<OrderItem> UpdateAsync(int id, OrderItem orderItemModel)
    {
        throw new NotImplementedException();
    }
}