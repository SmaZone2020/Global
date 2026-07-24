using Microsoft.AspNetCore.Mvc;
using GuoYunGlobal.Data;

namespace GuoYunGlobal.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ReportController : ControllerBase
{
    private readonly AppDbContext _context;

    public ReportController(AppDbContext context)
    {
        _context = context;
    }
}
