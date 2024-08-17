using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OrderService.Models
{
    public class OrderItem
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public Order Order { get; set; } // Order relationship
        public int BookId { get; set; }
        public Book Book { get; set; } // Book relationship
        public int Quantity { get; set; }
        public decimal Price { get; set; }
    }
}