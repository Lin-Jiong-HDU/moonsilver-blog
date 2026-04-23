# Blog Content

把博客文章放在这个文件夹里即可。每篇文章一个 `JSON` 文件，文件名就是文章的 slug。

最小字段：

```json
{
  "title": "文章标题",
  "excerpt": "一段简介，会显示在列表页。",
  "publishedAt": "2026-04-23",
  "updatedAt": "2026-04-23",
  "tags": ["标签一", "标签二"],
  "contentHtml": "<p>正文内容。</p>"
}
```

建议：

- 文章文件名尽量用英文小写和连字符，比如 `local-first-blog.json`
- 正文可以直接写 HTML
- 新增、修改后直接提交并推送，站点会在构建时读取这里的内容
