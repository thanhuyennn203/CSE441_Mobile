using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Q1WebAPI.Models;

namespace Q1WebAPI.Controllers
{
    [Route("/[controller]")]
    [ApiController]
    public class BookController : ControllerBase 
    {
        private readonly LibraryManagementContext _context;

        public BookController(LibraryManagementContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Book>>> GetBooks()
        {
            var books = await _context.Book.ToListAsync();
            return Ok(books); 
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Book>> GetBook(int id)
        {
            var book = await _context.Book.FindAsync(id);

            if (book == null)
            {
                return NotFound();
            }

            return Ok(book);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutBook(int id, Book book)
        {
            if (id != book.BookId)
            {
                return BadRequest(); 
            }

            _context.Entry(book).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent(); 
        }

       
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            var book = await _context.Book.FindAsync(id);
            if (book == null)
            {
                return NotFound(); 
            }

            _context.Book.Remove(book);
            await _context.SaveChangesAsync();

            return NoContent(); 
        }
    }
}
