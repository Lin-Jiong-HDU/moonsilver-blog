# Portfolio

这是一个基于 `Next.js App Router` 的站点，页面内容与整体审美现在以 `website/` 目录为准。

当前保留的页面只有：

- `/` 首页
- `/fun` 娱乐页
- `/contest` 竞赛专区
- `/jobti` Jobti 职业测绘

## 开发命令

```bash
pnpm install
pnpm dev
pnpm build
pnpm lint
```

## 关键文件

- [app/layout.tsx](app/layout.tsx) 全局布局与顶部导航
- [app/globals.css](app/globals.css) 全站基础样式
- [app/page.tsx](app/page.tsx) 首页，按 `website/src/pages/Home.tsx` 落地
- [app/fun/page.tsx](app/fun/page.tsx) 娱乐页，按 `website/src/pages/Fun.tsx` 落地
- [app/contest/page.tsx](app/contest/page.tsx) 竞赛专区，按 `website/src/pages/Contest.tsx` 落地
- [app/jobti/page.tsx](app/jobti/page.tsx) Jobti 页面入口
- [app/jobti/jobti-client.tsx](app/jobti/jobti-client.tsx) Jobti 页面 UI
- [app/jobti/jobti-data.ts](app/jobti/jobti-data.ts) Jobti 数据接入
- [app/jobti/jobti-engine.ts](app/jobti/jobti-engine.ts) Jobti 评分与岗位匹配逻辑

## Jobti

`Jobti` 已经放进当前网站结构里，但数据仍然来自：

- [app/jobti/career_game_data.json](app/jobti/career_game_data.json)

如果后面继续改题库、岗位或类型映射，优先改这份 JSON 和 `jobti-engine.ts`，不要先改页面壳子。

## 说明

`website/` 目录目前作为视觉与内容基准保留，Next 站点实现需要尽量严格对齐它。
