# Portfolio

这是一个基于 `Next.js App Router` 的个人网站。
当前站点主要包含首页、娱乐页、竞赛专区、足球数据页和 Jobti 职业测评模块。

## 当前路由

- `/` 首页
- `/fun` 娱乐页
- `/contest` 竞赛专区
- `/football` 足球数据页
- `/jobti` Jobti 职业测评

## 站点概览

- 首页保留黑底极简风格和首屏动效。
- `/fun` 是娱乐入口，里面放了 `Jobti` 和足球两个卡片。
- `/football` 改为国内更稳的轻量入口，提供五大联赛的赛程、积分榜和射手榜直达链接。
- `/jobti` 是独立重写的职业测评模块，直接读取 `app/jobti/career_game_data.json`。
- `website/` 目录保留为视觉和内容基准，后续调整页面时可以先对照它。

## 开发命令

```bash
pnpm install
pnpm dev
pnpm build
pnpm lint
```

## 关键文件

- [app/layout.tsx](app/layout.tsx) 全局布局、站点元信息和顶部导航
- [app/globals.css](app/globals.css) 全站基础样式与首屏动效
- [app/page.tsx](app/page.tsx) 首页
- [app/fun/page.tsx](app/fun/page.tsx) 娱乐页
- [app/contest/page.tsx](app/contest/page.tsx) 竞赛专区
- [app/football/football-widget-page.tsx](app/football/football-widget-page.tsx) 足球数据入口页
- [app/football/page.tsx](app/football/page.tsx) 足球页入口
- [app/jobti/page.tsx](app/jobti/page.tsx) Jobti 页面入口
- [app/jobti/jobti-client.tsx](app/jobti/jobti-client.tsx) Jobti 页面 UI
- [app/jobti/jobti-data.ts](app/jobti/jobti-data.ts) Jobti 数据归一化
- [app/jobti/jobti-engine.ts](app/jobti/jobti-engine.ts) Jobti 评分与岗位匹配逻辑
- [app/jobti/career_game_data.json](app/jobti/career_game_data.json) Jobti 主数据包

## Jobti

`Jobti` 目前是独立模块，直接依赖这份 JSON 数据包：

- 80 道双向题
- 16 种职业画像
- 1020 个岗位
- 能力标签与岗位映射

如果后面要改题库、岗位分布、命题语气或评分逻辑，优先改 `career_game_data.json` 和 `jobti-engine.ts`。

## 足球页

足球页现在使用国内更稳的轻量入口：

- 英超、西甲、德甲、意甲、法甲都提供赛程 / 积分榜直达
- 每个联赛也提供射手榜直达
- 如果要看国内赛事，可以直接进中国足协数据中心

当前实现不依赖项目内 API，也不需要额外配置密钥。

## 目录说明

- `website/` 是你提供的原型和视觉基准。
- `app/` 是当前 `Next.js` 站点的正式实现。
- 旧的博客式内容已经收口，不再是当前主线。
