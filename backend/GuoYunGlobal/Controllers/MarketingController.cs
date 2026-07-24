using Microsoft.AspNetCore.Mvc;
using GuoYunGlobal.Data;

namespace GuoYunGlobal.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MarketingController : ControllerBase
{
    private readonly AppDbContext _context;

    public MarketingController(AppDbContext context)
    {
        _context = context;
    }
}
