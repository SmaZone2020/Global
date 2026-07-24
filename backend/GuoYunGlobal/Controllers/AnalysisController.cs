using Microsoft.AspNetCore.Mvc;
using GuoYunGlobal.Data;

namespace GuoYunGlobal.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AnalysisController : ControllerBase
{
    private readonly AppDbContext _context;

    public AnalysisController(AppDbContext context)
    {
        _context = context;
    }
}
