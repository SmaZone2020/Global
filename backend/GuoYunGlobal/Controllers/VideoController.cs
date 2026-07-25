using Microsoft.AspNetCore.Mvc;
using GuoYunGlobal.Data;
using GuoYunGlobal.Models.Dtos;
using GuoYunGlobal.Services.Ai;

namespace GuoYunGlobal.Controllers;

[ApiController]
[Route("api/projects")]
public class VideoController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly AiOrchestrator _ai;
    private readonly ILogger<VideoController> _logger;

    public VideoController(AppDbContext context, AiOrchestrator ai, ILogger<VideoController> logger)
    {
        _context = context;
        _ai = ai;
        _logger = logger;
    }

    [HttpPost("{id}/videoScript")]
    public async Task<IActionResult> GenerateVideoScript(int id, [FromBody] GenerateVideoScriptRequest request)
    {
        var project = await _context.Projects.FindAsync(id);
        if (project == null)
            return NotFound(ApiResponse<object>.Fail("项目不存在"));

        if (string.IsNullOrWhiteSpace(request.Prompt))
            return BadRequest(ApiResponse<object>.Fail("请输入视频描述"));

        _logger.LogInformation("[VideoScript] project={Id} style={Style} prompt={Prompt}",
            id, request.Style, request.Prompt[..Math.Min(200, request.Prompt.Length)]);

        var script = await _ai.GenerateVideoScriptAsync(request.Prompt, request.Style);

        if (string.IsNullOrWhiteSpace(script))
            script = GetDemoScript(request.Style);

        return Ok(ApiResponse<VideoScriptResponse>.Ok(new VideoScriptResponse
        {
            Script = script,
            Style = request.Style,
            Prompt = request.Prompt
        }));
    }

    private static string GetDemoScript(string style) => style switch
    {
        "oriental" => "[0-3s] 开场：水墨山水画卷缓缓展开，远山如黛，晨雾缭绕\n"
            + "[3-6s] 过渡：镜头穿过古巷飞檐，落在一坛陈年老酒上\n"
            + "[6-10s] 主体：酒液倒入青瓷杯中，琥珀色泽在烛光下流转\n"
            + "[10-13s] 氛围：茶室内，友人举杯对饮，窗外竹影婆娑\n"
            + "[13-15s] 收尾：品牌Logo浮现，配文「百年匠心，一壶温情」",
        "trendy" => "[0-2s] 开场：霓虹灯闪烁，快速剪切城市夜景\n"
            + "[2-5s] 节奏：年轻人聚会场景，音乐节奏感强烈\n"
            + "[5-8s] 产品：瓶身特写配合动态文字弹出效果\n"
            + "[8-11s] 互动：调酒师用老酒创意调饮，色彩碰撞\n"
            + "[11-13s] 社交：分享到手机屏幕，点赞飞起\n"
            + "[13-15s] 结尾：「不一样的中国味」+ 品牌标识",
        "product" => "[0-3s] 开场：纯黑背景，产品从底部缓缓升起\n"
            + "[3-6s] 旋转：360度慢速旋转展示瓶身细节和标签\n"
            + "[6-9s] 微距：镜头推进至瓶身纹理和印章细节\n"
            + "[9-12s] 倾倒：酒液慢动作倒出，粘稠质感清晰可见\n"
            + "[12-15s] 定格：产品居中，参数信息逐行浮现，品牌落版",
        _ => "[0-3s] 开场：航拍福州三坊七巷，晨光洒落古建筑\n"
            + "[3-6s] 叙事：酿酒师傅在百年酒坊中查看酒缸，岁月感\n"
            + "[6-9s] 工艺：红曲米入缸、搅拌、封坛，匠人手部特写\n"
            + "[9-12s] 产品：酒坛开封，琥珀色酒液流出，配乐渐强\n"
            + "[12-14s] 场景：现代餐桌上，中西友人共饮，文化交融\n"
            + "[14-15s] 品牌：Logo + Slogan「From Fuzhou to the World」"
    };
}
