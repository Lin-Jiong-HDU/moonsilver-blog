# Moonsilver Blog

这是一个 `Next.js App Router` 项目，当前已经从个人博客形态收口成一个极简导航站。

目前主要入口是：

- `Jobti`：职业测绘与岗位匹配页
- `超级间谍赛车`：NES ROM 的独立入口页

## 快速开始

安装依赖：

```bash
pnpm install
```

本地开发：

```bash
pnpm dev
```

生产构建：

```bash
pnpm build
```

代码检查：

```bash
pnpm lint
```

## 站点结构

- `/` 主页导航站
- `/jobti` Jobti 职业测绘页
- `/super-spy-racer` 超级间谍赛车入口页
- `/writing` 原写作列表
- `/notes` 原笔记页
- `/about` 原关于页

## 关键文件

- [app/page.tsx](app/page.tsx) 主页，当前只负责双入口导航
- [app/layout.tsx](app/layout.tsx) 全局布局、站点元信息和导航壳
- [app/globals.css](app/globals.css) 全站样式变量与基础视觉
- [app/lib/site-data.ts](app/lib/site-data.ts) 顶部导航数据
- [app/jobti/page.tsx](app/jobti/page.tsx) Jobti 页面入口
- [app/jobti/jobti-client.tsx](app/jobti/jobti-client.tsx) Jobti 客户端交互 UI
- [app/jobti/jobti-data.ts](app/jobti/jobti-data.ts) 岗位、题库和能力维度数据
- [app/jobti/jobti-engine.ts](app/jobti/jobti-engine.ts) Jobti 评分与匹配逻辑
- [app/super-spy-racer/page.tsx](app/super-spy-racer/page.tsx) 赛车入口页
- [public/roms/super-spy-racer.nes](public/roms/super-spy-racer.nes) ROM 文件

## Jobti 说明

Jobti 目前是独立重写过的职业测绘模块，不再依赖旧的压缩静态包。

它的结构分成三层：

1. `jobti-data.ts` 维护岗位、题库和能力维度
2. `jobti-engine.ts` 负责计算分数和岗位匹配
3. `jobti-client.tsx` 只处理界面和交互

如果后面要改题库或新增岗位，优先改 `jobti-data.ts`，通常不需要动页面壳子。

## 修改建议

- 想改首页入口，优先看 [app/page.tsx](app/page.tsx)
- 想调整顶部导航，改 [app/lib/site-data.ts](app/lib/site-data.ts)
- 想扩展 Jobti 的题库、岗位或评分，改 [app/jobti/jobti-data.ts](app/jobti/jobti-data.ts) 和 [app/jobti/jobti-engine.ts](app/jobti/jobti-engine.ts)
- 想替换 NES 文件，直接更新 [public/roms/super-spy-racer.nes](public/roms/super-spy-racer.nes)

## 备注

`public/jobti-platform/` 里保留的是旧版静态产物，当前不作为 Jobti 的主实现来源。

如果以后要继续瘦身仓库，可以考虑把这份旧静态页清理掉，或者明确改成归档说明。
