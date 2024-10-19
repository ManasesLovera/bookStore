
using OrderService.Interface;
using OrderService.Repository;

namespace OrderService.Extensions;

public static class ServiceExtensions
{
    public static void AddPersitence(this IServiceCollection services)
    {

        #region Repository
        services.AddTransient<IOrderRepository, OrderRepository>();
        services.AddTransient<IOrderItemRepository, IOrderItemRepository>();
        services.AddTransient<IBookRepository, BookRepository>();
        #endregion
    }

}
