using OrderService.Interface;
using OrderService.Models;

namespace OrderService.Repository;

public class OrderRepository : IOrderRepository
{
    public Task<Order> CreateAsync(Order orderModel)
    {
        throw new NotImplementedException();
    }

    public Task<Order> DeleteAsync(int id)
    {
        throw new NotImplementedException();
    }

    public Task<bool> Exists(int id)
    {
        throw new NotImplementedException();
    }

    public Task<List<Order>> GetAllAsync()
    {
        throw new NotImplementedException();
    }

    public Task<Order?> GetByIdAsync(int id)
    {
        throw new NotImplementedException();
    }

    public Task<Order> UpdateAsync(int id, Order orderModel)
    {
        throw new NotImplementedException();
    }
}