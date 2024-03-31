using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Terra1.Server.Models;

namespace Terra1.Server.Data
{
    public class Terra1ServerContext : DbContext
    {
        public Terra1ServerContext (DbContextOptions<Terra1ServerContext> options)
            : base(options)
        {
        }

        public DbSet<Terra1.Server.Models.Checkpoint> Checkpoint { get; set; } = default!;
    }
}
