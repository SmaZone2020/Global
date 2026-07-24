# 国韵 Global — API 接口标准与数据类型规范

## 通用规范

### 命名规则

- **后端 C# 类属性**：PascalCase（如 `ProjectId`）
- **JSON 序列化**：camelCase（如 `projectId`）——后端通过 `[JsonPropertyName]` 或全局 `CamelCase` 策略实现
- **前端 TypeScript**：camelCase（如 `projectId`）
- **API 路径**：kebab-case 或 camelCase（如 `/api/projects/{id}/confirmMarket`）
- **前后端字段名必须完全一致**，不允许出现后端 `project_id` 前端 `projectId` 的不一致

### 响应格式

所有 API 返回统一 JSON 结构：

```json
// 成功（有数据）
{
  "success": true,
  "data": { ... },
  "message": null
}

// 成功（列表）
{
  "success": true,
  "data": [ ... ],
  "message": null
}

// 失败
{
  "success": false,
  "data": null,
  "message": "错误描述"
}
```

### HTTP 状态码

| 状态码 | 含义              |
| --- | --------------- |
| 200 | 成功（GET / 通用）    |
| 201 | 创建成功（POST 创建资源） |
| 400 | 请求参数错误          |
| 404 | 资源不存在           |
| 500 | 服务器内部错误         |

---

## 枚举类型

### ProjectStatus

| 值                 | 说明         |
| ----------------- | ---------- |
| `draft`           | 草稿，刚创建     |
| `analyzing`       | AI 正在分析中   |
| `awaitingConfirm` | 等待用户确认国家选择 |
| `strategyReady`   | 策略已生成      |
| `assetsReady`     | 营销资产已生成    |
| `exported`        | 已导出报告      |

### AnalysisType

| 值         | 说明   |
| --------- | ---- |
| `product` | 产品分析 |
| `culture` | 文化解码 |
| `market`  | 市场洞察 |

### AssetStatus

| 值           | 说明    |
| ----------- | ----- |
| `generated` | AI 生成 |
| `edited`    | 用户已编辑 |
| `approved`  | 用户已批准 |

### CredibilityLevel（仅前端展示用）

| 值             | 颜色         | 说明                    |
| ------------- | ---------- | --------------------- |
| `verified`    | 绿色 #22c55e | 已验证事实（来自品牌资料或权威公开来源）  |
| `publicData`  | 蓝色 #3b82f6 | 公开数据（可能受样本和时间影响）      |
| `aiInference` | 金色 #c9a96e | AI 推断（模型基于事实与数据形成的判断） |
| `unverified`  | 红色 #ef4444 | 待验证假设（需通过访谈、试销确认）     |

---

## API 接口详细定义

### 1. POST /api/projects — 创建项目

**请求体** `CreateProjectRequest`:

```json
{
  "name": "福建老酒出海项目",
  "brandName": "鼓山·福建老酒",
  "brandOrigin": "福建省福州市",
  "brandHistory": "品牌历史可追溯至1842年...",
  "brandVoice": "温暖、传统、有文化底蕴",
  "prohibitedClaims": "不可宣称保健功效",
  "establishedYear": 1842,
  "products": [
    {
      "name": "鼓山福建老酒（扁瓶三坊七巷版）",
      "category": "黄酒/发酵酒",
      "sku": "FJL-500-13",
      "specs": "500mL, 13度",
      "ingredients": "糯米、红曲、水",
      "process": "红曲酿造、传统发酵",
      "domesticPrice": 25.00,
      "imageUrl": ""
    }
  ],
  "targetCountries": ["美国", "日本", "新加坡"]
}
```

**响应** `201 Created`:

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "福建老酒出海项目",
    "status": "draft",
    "createdAt": "2026-07-24T12:00:00Z",
    "updatedAt": "2026-07-24T12:00:00Z",
    "brand": {
      "id": 1,
      "projectId": 1,
      "name": "鼓山·福建老酒",
      "origin": "福建省福州市",
      "history": "...",
      "brandVoice": "...",
      "prohibitedClaims": "...",
      "establishedYear": 1842
    },
    "products": [{ ... }]
  },
  "message": null
}
```

---

### 2. POST /api/projects/demo — 初始化福建老酒 Demo

**请求体**: 无

**响应** `201 Created`: 同上，返回预置好的完整项目（含品牌、产品、所有分析结果、策略）

---

### 3. GET /api/projects/{id} — 获取项目详情

**响应** `200`: 返回完整项目数据，包含 brand, products, status

---

### 4. POST /api/projects/{id}/upload — 上传文档

**请求**: `multipart/form-data`
| 字段 | 类型 | 说明 |
|------|------|------|
| file | File | PDF/MD/DOC/DOCX 文件 |

**响应** `200`:

```json
{
  "success": true,
  "data": {
    "id": 1,
    "projectId": 1,
    "fileName": "福建老酒公司介绍.pdf",
    "fileType": "pdf",
    "parsedContent": "解析出的文本内容...",
    "uploadedAt": "2026-07-24T12:00:00Z"
  },
  "message": null
}
```

---

### 5. POST /api/projects/{id}/analyze — 触发全流程分析

**请求体**: 无（使用项目已有的品牌和产品数据）

**响应** `200`:

```json
{
  "success": true,
  "data": {
    "status": "analyzing",
    "steps": [
      { "name": "documentParsing", "label": "文档解析与信息提取", "status": "completed" },
      { "name": "productAnalysis", "label": "产品分析", "status": "inProgress" },
      { "name": "marketScan", "label": "全球市场扫描", "status": "pending" },
      { "name": "cultureDecode", "label": "文化解码", "status": "pending" },
      { "name": "marketInsight", "label": "市场深度洞察", "status": "pending" }
    ]
  },
  "message": null
}
```

注意：此接口为异步操作。前端通过轮询 `GET /api/projects/{id}/analysis` 获取最新结果。

---

### 6. GET /api/projects/{id}/analysis — 获取分析结果

**响应** `200`:

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "projectId": 1,
      "type": "product",
      "content": {
        "tags": ["传统黄酒", "发酵酒", "家庭宴席", "福建文化", "礼赠产品"],
        "sellingPoints": [
          { "point": "低度数米香发酵酒", "description": "13度，适合佐餐..." },
          { "point": "温饮体验", "description": "..." }
        ],
        "swot": {
          "strengths": ["历史品牌背书", "独特红曲工艺"],
          "weaknesses": ["海外品类认知低"],
          "opportunities": ["亚洲饮食在美增长"],
          "threats": ["清酒品类竞争"]
        },
        "overseasBarriers": [
          {
            "term": "黄酒",
            "issue": "外国消费者不理解",
            "suggestion": "Chinese Aged Rice Wine",
            "credibility": "aiInference"
          }
        ]
      },
      "sources": [
        { "title": "品牌方资料", "type": "verified", "excerpt": "品牌历史可追溯至1842年", "capturedAt": "2026-07-24" },
        { "title": "SerpAPI: chinese rice wine US market", "type": "publicData", "excerpt": "...", "capturedAt": "2026-07-24" }
      ],
      "createdAt": "2026-07-24T12:05:00Z"
    },
    {
      "id": 2,
      "projectId": 1,
      "type": "culture",
      "content": {
        "culturalAssets": [
          {
            "asset": "红曲酿造",
            "evidence": "品牌方资料第12页",
            "sourceType": "verified",
            "chineseExpression": "古法红曲酿造，传承百年工艺",
            "overseasExpression": "Traditional red-yeast rice fermentation, a centuries-old craft",
            "targetAudience": "小众发酵酒爱好者",
            "consumerNeed": "寻找差异化发酵酒",
            "confidence": 0.86
          }
        ],
        "prohibitedTranslations": [
          { "original": "养生酒", "reason": "暗示医疗功效，合规风险", "alternative": "A comforting warming experience" }
        ],
        "brandStory": "Born in the historic lanes of Fuzhou's Three Lanes and Seven Alleys...",
        "slogans": [
          "Warm your table. Share your story.",
          "The rice wine of Fuzhou, crafted for your table."
        ],
        "englishIntro": "Gushan Fujian Laojiu is a traditional Chinese aged rice wine..."
      },
      "sources": [...],
      "createdAt": "2026-07-24T12:06:00Z"
    },
    {
      "id": 3,
      "projectId": 1,
      "type": "market",
      "content": {
        "candidates": [
          {
            "country": "美国",
            "totalScore": 82,
            "dimensionScores": {
              "demand": 80,
              "cultureFit": 86,
              "competition": 65,
              "channelAccess": 78,
              "compliance": 62,
              "economics": 74
            },
            "evidence": ["亚洲餐饮市场持续增长...", "纽约、旧金山亚裔人口密集"],
            "risks": ["酒类进口标签法规严格", "需要TTB审批"],
            "recommended": true
          }
        ],
        "consumerPersonas": [
          {
            "name": "Emily",
            "age": 29,
            "city": "纽约",
            "profile": "亚洲文化爱好者",
            "needs": "寻找与中餐搭配的新酒种",
            "motivations": ["文化探索", "餐酒搭配", "社交分享"],
            "barriers": ["不了解黄酒", "不知道饮用方式"],
            "scenarios": ["餐厅点单", "家庭聚餐", "品鉴会"]
          }
        ],
        "competitorAnalysis": [
          {
            "name": "Gekkeikan (清酒)",
            "country": "日本",
            "priceRange": "$12-25",
            "positioning": "日常佐餐酒",
            "channels": ["亚洲超市", "电商", "餐厅"]
          }
        ],
        "channels": [
          { "name": "亚洲餐厅", "priority": "高", "difficulty": "中", "description": "与中餐、日料餐厅合作" },
          { "name": "亚洲超市", "priority": "高", "difficulty": "低", "description": "H Mart, 99 Ranch等" }
        ],
        "pricingSuggestion": {
          "entryLevel": { "price": "$15-20", "positioning": "日常佐餐" },
          "midRange": { "price": "$25-35", "positioning": "品质体验" },
          "premium": { "price": "$45-60", "positioning": "礼赠收藏" }
        },
        "complianceRisks": [
          { "area": "进口审批", "risk": "高", "detail": "需通过TTB审批", "note": "需由专业进口商/律师复核" }
        ]
      },
      "sources": [...],
      "createdAt": "2026-07-24T12:08:00Z"
    }
  ],
  "message": null
}
```

---

### 7. POST /api/projects/{id}/confirmMarket — 确认国家选择

**请求体** `MarketConfirmRequest`:

```json
{
  "selectedCountry": "美国"
}
```

**响应** `200`:

```json
{
  "success": true,
  "data": {
    "status": "strategyReady",
    "selectedCountry": "美国"
  },
  "message": null
}
```

---

### 8. POST /api/projects/{id}/strategy — 生成出海策略

**请求体**: 无

**响应** `200`:

```json
{
  "success": true,
  "data": {
    "id": 1,
    "projectId": 1,
    "positioning": {
      "targetCountry": "美国",
      "coreAudience": "亚洲料理与餐酒搭配消费者",
      "categoryReference": "清酒/自然酒/米酒",
      "differentiation": "中国唯一红曲黄酒品类，具有温饮文化"
    },
    "skuPlan": {
      "primary": { "name": "三坊七巷版 500mL", "role": "主推款", "reason": "饮用属性明确" },
      "test": { "name": "入门款 300mL", "role": "市场教育", "reason": "降低试错成本" },
      "premium": { "name": "陈年礼盒装", "role": "品牌形象", "reason": "礼赠场景" }
    },
    "packaging": {
      "volume": "500mL / 300mL",
      "labelInfo": ["品类名: Chinese Aged Rice Wine", "饮用方式", "产区故事"],
      "visualDirection": "现代东方美学，突出红曲色与福州建筑线条"
    },
    "pricing": {
      "strategy": "中端定位，与清酒同价格带竞争",
      "ranges": [
        { "tier": "入门", "range": "$15-20", "channel": "超市/电商" },
        { "tier": "中端", "range": "$25-35", "channel": "餐厅/专门店" },
        { "tier": "高端", "range": "$45-60", "channel": "礼赠/品鉴" }
      ],
      "costAssumptions": "到岸成本约$8-12/瓶（含物流、关税）"
    },
    "channels": {
      "priority": [
        { "channel": "亚洲餐厅", "cities": ["纽约", "旧金山", "洛杉矶"], "action": "与3-5家中餐厅合作试点" },
        { "channel": "亚洲超市", "cities": ["纽约", "旧金山"], "action": "进入H Mart/99 Ranch" }
      ]
    },
    "roadmap": {
      "phase1": {
        "period": "0-30天",
        "title": "准备与验证",
        "actions": ["完成目标客群访谈", "制作英文产品页", "准备样品"],
        "metrics": ["访谈数量", "内容点击率", "报名/询盘数"]
      },
      "phase2": {
        "period": "31-60天",
        "title": "试点测试",
        "actions": ["与餐厅/文化活动合作品鉴", "投放社媒内容"],
        "metrics": ["试饮反馈", "口味接受度", "价格意愿"]
      },
      "phase3": {
        "period": "61-90天",
        "title": "小规模试销",
        "actions": ["选择最佳渠道开展试销", "收集复购数据"],
        "metrics": ["转化率", "复购意向", "渠道反馈"]
      }
    },
    "createdAt": "2026-07-24T12:10:00Z"
  },
  "message": null
}
```

---

### 9. POST /api/projects/{id}/marketing — 生成营销内容

**请求体** `MarketingRequest`:

```json
{
  "channel": "instagram",
  "style": "premium",
  "audience": "亚洲文化探索者"
}
```

**channel 可选值**: `instagram`, `tiktok`, `facebook`, `amazon`, `website`, `email`
**style 可选值**: `premium`(高端), `youthful`(年轻), `oriental`(东方文化), `business`(商务), `storytelling`(故事化)

**响应** `200`:

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "projectId": 1,
      "channel": "instagram",
      "style": "premium",
      "audience": "亚洲文化探索者",
      "contentType": "brandStory",
      "content": "Born in the historic Three Lanes and Seven Alleys of Fuzhou...",
      "imageUrl": "",
      "status": "generated",
      "createdAt": "2026-07-24T12:15:00Z"
    },
    {
      "id": 2,
      "projectId": 1,
      "channel": "instagram",
      "style": "premium",
      "audience": "亚洲文化探索者",
      "contentType": "socialPost",
      "content": "🍶 Not sake. Not wine. Something older...\n\n#ChineseWine #RiceWine #FujianLaojiu",
      "imageUrl": "",
      "status": "generated",
      "createdAt": "2026-07-24T12:15:00Z"
    }
  ],
  "message": null
}
```

**contentType 可能值**: `brandStory`, `socialPost`, `videoScript`, `productPage`, `emailDraft`, `posterPrompt`, `seoKeywords`

---

### 10. POST /api/projects/{id}/poster — 生成海报

**请求体**:

```json
{
  "scene": "餐厅佐餐",
  "style": "premium",
  "audience": "亚洲文化探索者"
}
```

**响应** `200`:

```json
{
  "success": true,
  "data": {
    "id": 1,
    "imageUrl": "https://...",
    "prompt": "A premium product poster of Chinese aged rice wine...",
    "status": "generated"
  },
  "message": null
}
```

---

### 11. GET /api/projects/{id}/report — 获取报告数据

**响应** `200`:

```json
{
  "success": true,
  "data": {
    "project": { ... },
    "brand": { ... },
    "products": [ ... ],
    "analysisResults": [ ... ],
    "strategy": { ... },
    "generatedAssets": [ ... ],
    "sources": [
      { "title": "...", "type": "verified", "excerpt": "...", "capturedAt": "..." }
    ],
    "generatedAt": "2026-07-24T12:20:00Z"
  },
  "message": null
}
```

---

## 后端统一响应包装

后端需实现 `ApiResponse<T>` 泛型类：

```csharp
public class ApiResponse<T>
{
    [JsonPropertyName("success")]
    public bool Success { get; set; }

    [JsonPropertyName("data")]
    public T? Data { get; set; }

    [JsonPropertyName("message")]
    public string? Message { get; set; }

    public static ApiResponse<T> Ok(T data) => new() { Success = true, Data = data };
    public static ApiResponse<T> Fail(string message) => new() { Success = false, Message = message };
}
```

---

## 前端 API 调用层约定

前端 `services/api.ts` 中所有方法返回 `Promise<ApiResponse<T>>`，通过 axios 拦截器统一提取 `data` 字段：

```typescript
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || '请求失败'
    return Promise.reject(new Error(message))
  }
)
```

---

## AI 结构化输出 JSON Schema

### 产品分析输出 (AnalysisType: product)

```typescript
interface ProductAnalysisContent {
  tags: string[]
  sellingPoints: { point: string; description: string }[]
  swot: {
    strengths: string[]
    weaknesses: string[]
    opportunities: string[]
    threats: string[]
  }
  overseasBarriers: {
    term: string
    issue: string
    suggestion: string
    credibility: CredibilityLevel
  }[]
}
```

### 文化解码输出 (AnalysisType: culture)

```typescript
interface CultureDecodeContent {
  culturalAssets: {
    asset: string
    evidence: string
    sourceType: CredibilityLevel
    chineseExpression: string
    overseasExpression: string
    targetAudience: string
    consumerNeed: string
    confidence: number
  }[]
  prohibitedTranslations: {
    original: string
    reason: string
    alternative: string
  }[]
  brandStory: string
  slogans: string[]
  englishIntro: string
}
```

### 市场洞察输出 (AnalysisType: market)

```typescript
interface MarketInsightContent {
  candidates: {
    country: string
    totalScore: number
    dimensionScores: DimensionScores
    evidence: string[]
    risks: string[]
    recommended: boolean
  }[]
  consumerPersonas: {
    name: string
    age: number
    city: string
    profile: string
    needs: string
    motivations: string[]
    barriers: string[]
    scenarios: string[]
  }[]
  competitorAnalysis: {
    name: string
    country: string
    priceRange: string
    positioning: string
    channels: string[]
  }[]
  channels: {
    name: string
    priority: string
    difficulty: string
    description: string
  }[]
  pricingSuggestion: {
    entryLevel: { price: string; positioning: string }
    midRange: { price: string; positioning: string }
    premium: { price: string; positioning: string }
  }
  complianceRisks: {
    area: string
    risk: string
    detail: string
    note: string
  }[]
}
```

### DimensionScores（国家评分维度）

```typescript
interface DimensionScores {
  demand: number        // 需求机会 0-100
  cultureFit: number    // 文化匹配 0-100
  competition: number   // 竞争强度 0-100（越高越好，代表竞争不激烈）
  channelAccess: number // 渠道可达性 0-100
  compliance: number    // 合规门槛 0-100（越高越容易合规）
  economics: number     // 单位经济性 0-100
}
```
