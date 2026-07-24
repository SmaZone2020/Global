using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GuoYunGlobal.Data;
using GuoYunGlobal.Models.Dtos;

namespace GuoYunGlobal.Controllers;

[ApiController]
[Route("api/projects")]
public class ProjectManageController : ControllerBase
{
    private readonly AppDbContext _context;

    public ProjectManageController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> List()
    {
        var projects = await _context.Projects
            .Include(p => p.Brand)
                .ThenInclude(b => b!.Products)
            .OrderByDescending(p => p.UpdatedAt)
            .Take(20)
            .ToListAsync();

        var responses = projects.Select(ProjectResponse.FromEntity).ToList();
        return Ok(ApiResponse<List<ProjectResponse>>.Ok(responses));
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var project = await _context.Projects.FindAsync(id);
        if (project == null)
            return NotFound(ApiResponse<object>.Fail("项目不存在"));

        _context.Projects.Remove(project);
        await _context.SaveChangesAsync();
        return Ok(ApiResponse<object>.Ok(new { }));
    }
}
