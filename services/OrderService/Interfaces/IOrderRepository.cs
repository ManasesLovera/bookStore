using OrderService.DTOs;
using OrderService.Interfaces;
using OrderService.Models;

namespace OrderService.Interface;

public interface IOrderRepository
{
    Task<Order> CreateAsync(CreateOrderDto createOrderDto);
    Task<Order> GetByIdAsync(int id);
}