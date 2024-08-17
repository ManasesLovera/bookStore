using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace OrderService.Models
{
    public class Order
    {
        [Key]
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; } // User relationship
        [Range(0, 99999999.99)]
        [RegularExpression(@"^\d{1,8}(\.\d{1,2})?$")]
        public decimal TotalAmount { get; set; }
        public string Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        // SQL relationships
        public ICollection<OrderItem> OrderItems { get; set; }
        public Payment Payment { get; set; }        
    }
}