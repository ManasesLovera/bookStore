using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OrderService.Models
{
    public class Notification
    {
        public int Id { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }  // User relationship

        public string Message { get; set; }
        public string Status { get; set; }
        public DateTime SentAt { get; set; } = DateTime.UtcNow;
    }
}