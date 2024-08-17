using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace OrderService.Models
{
    public class Payment
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public Order Order { get; set; } // Order relationship
        [StringLength(50)]
        public string PaymentMethod { get; set; }
        [StringLength(50)]
        public string PaymentStatus { get; set; }
        [StringLength(255)]
        public string TransactionId { get; set; }
        public decimal Amount { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}