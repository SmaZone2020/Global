using Microsoft.AspNetCore.Mvc;
using GuoYunGlobal.Data;

namespace GuoYunGlobal.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProjectController : ControllerBase
{
    private readonly AppDbContext _context;

    public ProjectController(AppDbContext context)
    {
        _context = context;
    }
}
