# Portfolio

这是一个基于 `Next.js App Router` 的个人站点。

## 当前路由

- `/` 首页
- `/fun` 娱乐页
- `/blog` 博客页
- `/contest` 竞赛专区
- `/football` 足球数据页
- `/jobti` Jobti 职业测评
- `/account` 登录

## 站点结构

- 首页保留黑底极简风格和首屏动效。
- `/fun` 作为娱乐入口，放置 `Jobti` 和足球两块内容。
- `/blog` 是站内博客页，文章通过站点服务器统一保存，管理员登录后可以在前端直接新增、编辑和删除。
- `/contest` 需要先登录才能查看。
- `/football` 采用站内嵌入式足球数据面板，保留赛程、积分榜和射手榜这类轻量内容。
- `/jobti` 是独立重写的职业测评模块，读取 `app/jobti/career_game_data.json`。

## 账号规则

- 普通用户通过 `/account` 登录体验账号。
- 账号列表保存在 `data/accounts.json`，你可以直接在这里增删发放账号。
- 登录后可以查看 `/contest`。
- 只有管理员账号 `moonsilver / msv` 可以编辑 `/blog`。

## 博客共享方式

- 博客内容通过 `/api/blog` 读写。
- 服务端会把文章保存到 `data/blog-posts.json`。
- 所有访问者打开 `/blog` 时，读取的都是同一份文章数据。
- 编辑器支持加粗、斜体、下划线，以及字号、行距、段落间距调整。
- 这和 `localStorage` 不同，关闭浏览器后也不会只保留在某一台机器上。

## 开发命令

```bash
pnpm install
pnpm dev
pnpm build
pnpm lint
```

## 关键文件

- [app/layout.tsx](app/layout.tsx) 全局布局、主题脚本和站点框架
- [app/components/auth-provider.tsx](app/components/auth-provider.tsx) 本地登录状态与权限
- [app/components/site-navbar.tsx](app/components/site-navbar.tsx) 顶部导航、主题切换和账号入口
- [app/components/site-footer.tsx](app/components/site-footer.tsx) 底部友站、GitHub 和登录入口
- [app/api/auth/route.ts](app/api/auth/route.ts) 登录接口
- [app/api/blog/route.ts](app/api/blog/route.ts) 博客文章读写接口
- [app/lib/auth-data.ts](app/lib/auth-data.ts) 账号数据类型
- [app/lib/auth-store.ts](app/lib/auth-store.ts) 账号文件存储逻辑
- [app/lib/blog-data.ts](app/lib/blog-data.ts) 博客数据类型和默认内容
- [app/lib/blog-store.ts](app/lib/blog-store.ts) 博客文件存储逻辑
- [app/account/page.tsx](app/account/page.tsx) 登录页入口
- [app/account/account-client.tsx](app/account/account-client.tsx) 登录 UI
- [app/blog/page.tsx](app/blog/page.tsx) 博客页入口
- [app/blog/blog-client.tsx](app/blog/blog-client.tsx) 博客页 UI 和编辑器
- [app/contest/page.tsx](app/contest/page.tsx) 竞赛专区
- [app/fun/page.tsx](app/fun/page.tsx) 娱乐页入口
- [app/football/football-widget-page.tsx](app/football/football-widget-page.tsx) 足球数据嵌入页
- [app/jobti/page.tsx](app/jobti/page.tsx) Jobti 页面入口
- [app/jobti/jobti-client.tsx](app/jobti/jobti-client.tsx) Jobti 页面 UI
- [app/jobti/jobti-data.ts](app/jobti/jobti-data.ts) Jobti 数据归一化
- [app/jobti/jobti-engine.ts](app/jobti/jobti-engine.ts) Jobti 评分与岗位匹配逻辑
- [app/jobti/career_game_data.json](app/jobti/career_game_data.json) Jobti 主数据包
- [data/accounts.json](data/accounts.json) 发放账号列表
- [data/blog-posts.json](data/blog-posts.json) 博客文章列表
