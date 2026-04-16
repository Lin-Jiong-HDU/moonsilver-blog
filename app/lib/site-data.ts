export type PostSection = {
  title: string;
  paragraphs: string[];
  quote?: string;
  bullets?: string[];
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  tags: string[];
  heroLabel: string;
  heroSummary: string;
  sections: PostSection[];
};

export const siteNavigation = [
  { href: "/", label: "Home" },
  { href: "/writing", label: "Writing" },
  { href: "/notes", label: "Notes" },
  { href: "/about", label: "About" },
];

export const currentFocus = [
  "把首页做得像作者名片，而不是一个堆满卡片的内容入口。",
  "建立统一的排版、留白和信息层级，后续接真实文章时不需要重做。",
  "先用少量示例内容把品牌气质定住，再慢慢扩展项目页、归档和搜索。",
];

export const designPrinciples = [
  {
    title: "留白要成为内容的一部分",
    description:
      "不是为了显得高级而空，而是让文字有呼吸，让阅读更像在纸面上展开。",
  },
  {
    title: "每个层级都要能一眼看懂",
    description:
      "标题、摘要、分类、日期各自承担职责，页面不靠装饰去制造存在感。",
  },
  {
    title: "动效存在，但不抢戏",
    description:
      "轻微的悬浮和模糊已经足够，用户应该先感受到从容，再注意到细节。",
  },
];

export const posts: Post[] = [
  {
    slug: "building-a-quiet-blog",
    title: "做一个安静、耐读、不着急的个人博客",
    excerpt:
      "个人博客真正稀缺的不是功能，而是气质。第一版应该先解决“读起来舒不舒服、看起来像不像你”这两个问题。",
    category: "设计与品牌",
    date: "2026.04.16",
    readTime: "6 min read",
    tags: ["Brand", "Interface", "Writing"],
    heroLabel: "A quieter internet",
    heroSummary:
      "当大多数网页都在争夺注意力时，个人博客反而更适合成为一个让读者慢下来的地方。",
    sections: [
      {
        title: "先定义气质，而不是先堆功能",
        paragraphs: [
          "很多个人博客一开始就急着接文章系统、评论、标签、搜索和统计，结果结构越来越完整，气质却越来越模糊。最后网站当然能用，但一打开就像另一套模板，没有作者本人。",
          "如果你的目标是做一个长期留下来的个人网站，第一阶段更重要的是回答三个问题：它看起来像什么样的人写的，它让读者以什么节奏阅读，它和常见的资讯流有什么区别。",
        ],
        quote:
          "博客的第一任务不是证明你会写代码，而是让人愿意停下来读你写的东西。",
      },
      {
        title: "苹果气质的关键是克制，而不是冰冷",
        paragraphs: [
          "很多人把 Apple 风格理解成纯白、细字、圆角和玻璃感，但真正让它成立的是节奏控制。什么地方可以极简，什么地方必须给足分量，什么地方应该退后，让内容站在最前面，这才是关键。",
          "落到博客里，就是大标题要有足够重量，摘要要清楚，正文宽度要舒服，辅助信息要低调但不能失踪。这样页面会显得安静，却不空洞。",
        ],
      },
      {
        title: "第一版应该先做三件事",
        paragraphs: [
          "第一，先把首页、写作列表页和文章页的骨架搭稳，因为这三页决定了网站的主体验。第二，建立可复用的设计变量和内容数据结构，避免后续样式漂移。第三，只放少量示例内容，但每一条都要像成品。",
        ],
        bullets: [
          "首页负责定义品牌感和阅读入口。",
          "列表页负责建立节奏和秩序。",
          "文章页负责把真正的阅读体验做扎实。",
        ],
      },
    ],
  },
  {
    slug: "apple-like-interface-details",
    title: "想做出 Apple 感，页面细节应该盯哪些地方",
    excerpt:
      "真正拉开差距的不是某一个大招，而是边框、留白、字重、行宽、对齐方式这些看起来不起眼的细节。",
    category: "界面细节",
    date: "2026.04.15",
    readTime: "5 min read",
    tags: ["Typography", "Spacing", "UI"],
    heroLabel: "Small details, big calm",
    heroSummary:
      "当页面足够克制时，任何一个过重的阴影和多余的按钮都会立刻破坏整体气质。",
    sections: [
      {
        title: "先把字体和宽度关系调顺",
        paragraphs: [
          "一个页面高级与否，很多时候第一眼取决于文字。标题的字距、正文的行高、段落之间的间距、列表摘要的宽度，这些决定了页面是否像在认真说话。",
          "博客比产品官网更依赖排版，因为用户停留时间更长。阅读宽度、节奏和页面呼吸感，比任何视觉特效都更重要。",
        ],
      },
      {
        title: "边框应该像空气，不应该像格子纸",
        paragraphs: [
          "Apple 系网页面的边框通常只是为了帮助分层，而不是为了强调模块存在。它们轻、薄、透明，更多时候像一层秩序，而不是一道围墙。",
          "如果边框太重、阴影太黑、卡片太密，页面会瞬间从克制走向拥挤。你会发现信息都在，但气质已经不见了。",
        ],
        quote:
          "高级感往往不是来自于你加了什么，而是来自于你忍住了什么。",
      },
      {
        title: "交互反馈要轻到像呼吸",
        paragraphs: [
          "悬浮时轻微抬起、按钮颜色微调、导航背景轻轻模糊，这些已经足够传达精致。再复杂的动画如果没有服务信息层级，反而会显得刻意。",
        ],
        bullets: [
          "Hover 位移建议在 2 到 4 像素之间。",
          "阴影只要暗示层级，不要制造压迫感。",
          "动效持续时间保持短促，避免拖泥带水。",
        ],
      },
    ],
  },
  {
    slug: "write-before-you-build",
    title: "先写几篇像样的文章，再决定博客系统怎么做",
    excerpt:
      "技术选型应该服务内容，而不是反过来塑造内容。先写三篇好文章，很多系统需求会自己浮出来。",
    category: "内容策略",
    date: "2026.04.14",
    readTime: "4 min read",
    tags: ["Content", "MDX", "Workflow"],
    heroLabel: "Content first",
    heroSummary:
      "你真正需要的文章系统，通常不是脑子里想出来的，而是在连续写作过程中被逼出来的。",
    sections: [
      {
        title: "内容结构会反向决定系统结构",
        paragraphs: [
          "当你真的开始写作，你会立刻知道自己是否需要目录、脚注、代码高亮、摘要卡片、系列文章和归档页面。很多“先做系统”的讨论，在没有真实内容之前其实都只是猜测。",
          "所以更好的做法是先写，再观察。哪怕先用假数据或本地文件，只要页面结构已经稳，系统演进就会更有方向。",
        ],
      },
      {
        title: "先做小而稳的内容模型",
        paragraphs: [
          "第一版博客的数据模型不必复杂。标题、摘要、日期、分类、阅读时长、正文内容，其实已经足够支撑非常成熟的阅读体验。",
          "当文章数量上来之后，再考虑标签、系列、相关推荐、全文搜索。这些扩展应该顺着内容自然长出来，而不是一开始就压在项目上。",
        ],
      },
      {
        title: "把注意力留给长期产出",
        paragraphs: [
          "博客真正有价值的地方，是一年之后你仍然愿意回来看，五年之后别人仍然能通过它认识你。为了这个目标，结构、样式、写作流程都应该尽量轻。",
        ],
        bullets: [
          "能少配置一步，就少配置一步。",
          "能先用本地内容，就不要急着上后端。",
          "能让写作更顺，就值得优先做。",
        ],
      },
    ],
  },
];

export const notes = [
  {
    title: "导航不应该抢走正文的第一眼",
    body:
      "如果读者一进来先注意到导航样式，而不是文章标题，说明顶部 chrome 的存在感已经太强了。",
    tag: "Navigation",
    date: "Apr 16",
  },
  {
    title: "好的摘要像一口气说清楚了为什么值得点开",
    body:
      "摘要不是复述标题，而是补全阅读预期。它应该帮助读者判断这篇内容会给自己带来什么。",
    tag: "Writing",
    date: "Apr 15",
  },
  {
    title: "边框淡一点，页面就会立刻安静下来",
    body:
      "很多时候不是布局有问题，而是分割线和卡片边界太重，导致页面从容感不够。",
    tag: "Visual",
    date: "Apr 14",
  },
  {
    title: "先把首页做成喜欢的样子，才会愿意长期维护",
    body:
      "个人博客是一项长期工程，最开始的视觉认同感会直接影响你后面还有没有动力继续写。",
    tag: "Process",
    date: "Apr 13",
  },
];

export const aboutHighlights = [
  "关注前端体验、产品表达和长期写作。",
  "喜欢把复杂问题整理成清楚、耐读的结构。",
  "相信个人网站应该像一间慢慢长出来的工作室。",
];

export function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug);
}
