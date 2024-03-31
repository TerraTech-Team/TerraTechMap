using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Terra1.Server.Data;
using Terra1.Server.Models;

namespace Terra1.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CheckpointsController : ControllerBase
    {
        private readonly Terra1ServerContext _context;

        public CheckpointsController(Terra1ServerContext context)
        {
            _context = context;
        }

        // GET: api/Checkpoints
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Checkpoint>>> GetCheckpoint()
        {
            return await _context.Checkpoint.ToListAsync();
        }

        // GET: api/Checkpoints/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Checkpoint>> GetCheckpoint(int id)
        {
            var checkpoint = await _context.Checkpoint.FindAsync(id);

            if (checkpoint == null)
            {
                return NotFound();
            }

            return checkpoint;
        }

        // PUT: api/Checkpoints/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCheckpoint(int id, Checkpoint checkpoint)
        {
            if (id != checkpoint.Id)
            {
                return BadRequest();
            }

            _context.Entry(checkpoint).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CheckpointExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Checkpoints
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Checkpoint>> PostCheckpoint(Checkpoint checkpoint)
        {
            _context.Checkpoint.Add(checkpoint);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCheckpoint", new { id = checkpoint.Id }, checkpoint);
        }

        // DELETE: api/Checkpoints/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCheckpoint(int id)
        {
            var checkpoint = await _context.Checkpoint.FindAsync(id);
            if (checkpoint == null)
            {
                return NotFound();
            }

            _context.Checkpoint.Remove(checkpoint);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CheckpointExists(int id)
        {
            return _context.Checkpoint.Any(e => e.Id == id);
        }
    }
}
