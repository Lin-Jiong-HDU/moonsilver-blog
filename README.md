# MOONSILVER

这是我的个人站点主仓库，主应用基于 `Next.js App Router`。现在这份 README 只保留最常用的项目导航，方便以后快速找文件、少翻上下文。

## 现在主要看哪里

- `/` 首页
- `/fun` 娱乐入口
- `/fun/2048` 2048 小游戏
- `/fun/tetris` 俄罗斯方块
- `/blog` 博客
- `/contest` 竞赛页
- `/football` 足球数据页
- `/jobti` 职业测评页
- `/account` 登录页

## 内容怎么改

- 博客文章放在 `content/blog/`
- 每篇文章一个 JSON 文件，文件名就是 slug
- 示例文件：
  - `content/blog/README.md`
  - `content/blog/local-first-blog.json`
  - `content/blog/site-notes.json`
- Jobti 数据放在 `app/jobti/career_game_data.json`

## 代码结构

- `app/` 主站 Next.js 页面和组件
- `app/components/` 站点导航、页脚、登录态等通用组件
- `app/lib/` 站点公共逻辑
- `app/fun/` 娱乐模块，里面包含 `2048` 和 `tetris`
- `content/blog/` 本地博客内容目录
- `data/` 账号与站点数据
- `public/` 静态资源
- `website/` 独立的旧前端项目，当前不参与主站页面开发
- `web-design-skill/` 单独保留的设计 skill 资源

## 开发命令

```bash
pnpm install
pnpm dev
pnpm build
pnpm lint
```

## 维护提醒

- 主页和 `fun` 入口会跟着主题切换，改样式时优先看 `app/globals.css`
- 博客现在是文件驱动，不再依赖站内编辑器
- `website/` 和 `web-design-skill/` 是独立内容，不要和主站页面混在一起改
- 生成产物如 `.next/`、`tsconfig.tsbuildinfo` 不需要手动维护
