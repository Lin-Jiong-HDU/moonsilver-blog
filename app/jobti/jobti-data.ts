export type DimensionId =
  | "analysis"
  | "systems"
  | "execution"
  | "people"
  | "influence"
  | "creativity"
  | "craft"
  | "adaptability";

export type WeightedScores = Record<DimensionId, number>;

export type Dimension = {
  id: DimensionId;
  label: string;
  shortLabel: string;
  emoji: string;
  description: string;
  strongSignal: string;
  growthTip: string;
  color: string;
};

export type Career = {
  id: string;
  name: string;
  category: string;
  summary: string;
  fitSignal: string;
  environment: string;
  goodAt: string[];
  watchOut: string[];
  weights: WeightedScores;
};

export type QuestionOption = {
  title: string;
  detail: string;
  weights: Partial<WeightedScores>;
};

export type Question = {
  id: string;
  theme: string;
  prompt: string;
  detail: string;
  options: QuestionOption[];
};

export const DIMENSIONS: Dimension[] = [
  {
    id: "analysis",
    label: "分析判断",
    shortLabel: "分析",
    emoji: "🧠",
    description: "把模糊问题拆开、抓重点、识别因果与优先级的能力。",
    strongSignal: "你更容易在复杂问题里找到结构，而不是被信息量淹没。",
    growthTip: "继续训练用数据、案例和边界条件去支撑你的判断。",
    color: "#7de7ff",
  },
  {
    id: "systems",
    label: "系统建构",
    shortLabel: "系统",
    emoji: "🧩",
    description: "搭框架、建流程、设计机制，让事情可复制可维护。",
    strongSignal: "你不只会解决眼前问题，还会想怎样让同类问题少发生。",
    growthTip: "多练习把零散经验沉淀成流程、模板或规则。",
    color: "#82aaff",
  },
  {
    id: "execution",
    label: "推进执行",
    shortLabel: "执行",
    emoji: "🚀",
    description: "顶住不确定性，把目标拉回现实进度并持续交付。",
    strongSignal: "你对截止时间、节奏和结果有天然敏感度，能推动事情往前走。",
    growthTip: "保持推进力的同时，给关键节点留下复盘和校准空间。",
    color: "#69f0ae",
  },
  {
    id: "people",
    label: "沟通共情",
    shortLabel: "共情",
    emoji: "🤝",
    description: "理解他人诉求、感受和语境，并把沟通做成有效连接。",
    strongSignal: "你更容易捕捉人的真实顾虑，能让协作对象愿意继续说。",
    growthTip: "把共情继续升级成提问结构与反馈框架，会更有穿透力。",
    color: "#ffd166",
  },
  {
    id: "influence",
    label: "组织影响",
    shortLabel: "影响",
    emoji: "🎯",
    description: "整合资源、达成共识、推动多方朝同一方向移动。",
    strongSignal: "你擅长在不同利益和意见之间寻找推进路径，而不是只给建议。",
    growthTip: "尝试把影响力建立在目标清晰和节奏设计上，而不只是气场。",
    color: "#ff9f6e",
  },
  {
    id: "creativity",
    label: "创意表达",
    shortLabel: "创意",
    emoji: "✨",
    description: "提出新角度、新表达和新方案，让内容或产品更有辨识度。",
    strongSignal: "你往往能从常规答案之外，给出更有记忆点的方向。",
    growthTip: "给创意增加目标约束，能让你的点子更容易被采用。",
    color: "#f78cff",
  },
  {
    id: "craft",
    label: "细节打磨",
    shortLabel: "打磨",
    emoji: "🔬",
    description: "对质量、准确度、体验细节和完成度有持续要求。",
    strongSignal: "你对瑕疵和粗糙感很敏感，愿意把成品再做一层。",
    growthTip: "把审美和标准写成可复用的清单，会让你的打磨更高效。",
    color: "#c3c7ff",
  },
  {
    id: "adaptability",
    label: "探索应变",
    shortLabel: "应变",
    emoji: "🛰️",
    description: "面对新领域、变化环境和不完整信息时的学习与调整速度。",
    strongSignal: "你不怕陌生局面，愿意边探索边修正路线。",
    growthTip: "如果再补一点复盘习惯，你的试错效率会更高。",
    color: "#4ee3c2",
  },
];

export const CAREERS: Career[] = [
  {
    id: "product-manager",
    name: "产品经理",
    category: "产品与策略",
    summary: "适合把用户问题、业务目标和实现约束拉到一张桌上处理的人。",
    fitSignal: "如果你喜欢定义问题、排优先级、组织跨团队推进，这条线会很合适。",
    environment: "多角色协作、需求不完全清晰、需要持续取舍的团队环境。",
    goodAt: ["需求拆解", "方案比较", "跨团队推进"],
    watchOut: ["别只会协调，不沉到问题本身", "别让结论长期停留在口头"],
    weights: {
      analysis: 8,
      systems: 8,
      execution: 8,
      people: 7,
      influence: 7,
      creativity: 5,
      craft: 4,
      adaptability: 7,
    },
  },
  {
    id: "data-analyst",
    name: "数据分析师",
    category: "数据与研究",
    summary: "适合在复杂现象里找模式、验证假设、把感觉变成证据的人。",
    fitSignal: "如果你更享受解释问题本身，而不是做大量对外推动，这会更舒服。",
    environment: "重视指标口径、实验设计、归因分析和复盘闭环的环境。",
    goodAt: ["指标建模", "异常归因", "实验评估"],
    watchOut: ["不要把结论停在图表上", "需要学会把洞察翻译给业务听懂"],
    weights: {
      analysis: 10,
      systems: 7,
      execution: 6,
      people: 3,
      influence: 2,
      creativity: 3,
      craft: 7,
      adaptability: 5,
    },
  },
  {
    id: "frontend-engineer",
    name: "前端工程师",
    category: "技术与体验",
    summary: "适合既在意交互体验，又愿意把实现细节抠到顺手的人。",
    fitSignal: "如果你会同时在意结构、视觉、可用性和落地质量，这条线更有发挥空间。",
    environment: "产品变化快、用户体验权重大、需要跨设计和工程对齐的场景。",
    goodAt: ["界面实现", "交互细节", "体验优化"],
    watchOut: ["别只盯外观，忽略状态管理和长期维护", "别因为追求完美拖慢关键节奏"],
    weights: {
      analysis: 7,
      systems: 7,
      execution: 7,
      people: 4,
      influence: 3,
      creativity: 6,
      craft: 9,
      adaptability: 5,
    },
  },
  {
    id: "backend-engineer",
    name: "后端工程师",
    category: "技术与架构",
    summary: "适合愿意构建底层结构、把复杂逻辑做稳的人。",
    fitSignal: "如果你看到一个混乱系统会先想怎么重构、抽象和稳定，它会很适合你。",
    environment: "强调可靠性、性能、数据一致性和长期可维护性的环境。",
    goodAt: ["系统抽象", "服务设计", "稳定性建设"],
    watchOut: ["别把抽象做得脱离业务", "别只顾技术完整性而忽略交付顺序"],
    weights: {
      analysis: 8,
      systems: 10,
      execution: 7,
      people: 3,
      influence: 2,
      creativity: 3,
      craft: 8,
      adaptability: 4,
    },
  },
  {
    id: "ux-designer",
    name: "UX / UI 设计师",
    category: "设计与体验",
    summary: "适合能理解人、会表达方案、又愿意把体验细节推到成品的人。",
    fitSignal: "如果你对感受、结构和呈现方式都敏感，这条线会比纯执行更有发挥。",
    environment: "用户体验重要、需要持续做验证与打磨的产品团队。",
    goodAt: ["信息结构", "交互方案", "视觉打磨"],
    watchOut: ["别只追求好看", "要把设计理由说清楚并参与落地"],
    weights: {
      analysis: 6,
      systems: 5,
      execution: 6,
      people: 8,
      influence: 4,
      creativity: 9,
      craft: 9,
      adaptability: 6,
    },
  },
  {
    id: "brand-content",
    name: "品牌 / 内容策划",
    category: "内容与传播",
    summary: "适合能抓住受众情绪、会讲故事、又不满足于平庸表达的人。",
    fitSignal: "如果你天然会想标题、叙事角度和信息包装，这类岗位会很吃香。",
    environment: "需要持续产出表达、品牌感知和传播策略的内容场景。",
    goodAt: ["选题包装", "叙事表达", "内容判断"],
    watchOut: ["别只追求灵感，忽略复用机制", "表达力要和业务目标绑定"],
    weights: {
      analysis: 5,
      systems: 4,
      execution: 6,
      people: 7,
      influence: 6,
      creativity: 10,
      craft: 7,
      adaptability: 7,
    },
  },
  {
    id: "growth-operator",
    name: "增长运营",
    category: "增长与运营",
    summary: "适合喜欢拉数据、做实验、盯节奏并愿意为结果持续迭代的人。",
    fitSignal: "如果你看到目标会自然想渠道、动作、转化和复盘，这条线很对味。",
    environment: "节奏快、目标明确、需要持续试验和优化漏斗的业务场景。",
    goodAt: ["活动推进", "转化优化", "增长实验"],
    watchOut: ["别被短期数字绑住", "要把经验沉淀成可复制方法"],
    weights: {
      analysis: 7,
      systems: 5,
      execution: 10,
      people: 6,
      influence: 6,
      creativity: 5,
      craft: 5,
      adaptability: 8,
    },
  },
  {
    id: "sales-bd",
    name: "销售 / 商务拓展",
    category: "商业与合作",
    summary: "适合在对外场景里快速判断人和机会，并能主动推进成交的人。",
    fitSignal: "如果你面对陌生人不发怵，还能持续跟进并拿结果，这类岗位很适合。",
    environment: "对外沟通频繁、目标导向强、需要资源整合和关系经营的场景。",
    goodAt: ["机会判断", "关系推进", "谈判成交"],
    watchOut: ["别只顾短期成交", "要补足方法化和客户长期经营"],
    weights: {
      analysis: 4,
      systems: 3,
      execution: 8,
      people: 9,
      influence: 10,
      creativity: 4,
      craft: 3,
      adaptability: 8,
    },
  },
  {
    id: "delivery-manager",
    name: "项目 / 交付经理",
    category: "管理与协同",
    summary: "适合能压节奏、控风险、调资源并守住交付结果的人。",
    fitSignal: "如果你天然会盯依赖关系、时间点和责任归属，这条线会很稳。",
    environment: "参与方多、交付周期长、需要持续协调与风险预警的环境。",
    goodAt: ["计划拆解", "依赖协调", "风险控制"],
    watchOut: ["别只盯进度表", "需要理解业务目标而不是只做催办"],
    weights: {
      analysis: 6,
      systems: 7,
      execution: 10,
      people: 7,
      influence: 8,
      creativity: 3,
      craft: 6,
      adaptability: 7,
    },
  },
  {
    id: "hr-recruiter",
    name: "HR / 招聘顾问",
    category: "人才与组织",
    summary: "适合能看人、会沟通、擅长在岗位和候选人之间做高质量匹配的人。",
    fitSignal: "如果你对人的状态、动机和适配度很敏感，这会是一个明显优势。",
    environment: "需要大量访谈、评估、沟通和流程协调的人才场景。",
    goodAt: ["候选人判断", "沟通跟进", "组织协作"],
    watchOut: ["别只凭感觉看人", "要把判断标准结构化"],
    weights: {
      analysis: 5,
      systems: 4,
      execution: 6,
      people: 10,
      influence: 7,
      creativity: 4,
      craft: 4,
      adaptability: 7,
    },
  },
  {
    id: "consultant",
    name: "咨询顾问",
    category: "策略与咨询",
    summary: "适合逻辑强、框架感好、能在高压和陌生议题下快速产出结构的人。",
    fitSignal: "如果你在复杂问题、信息不全和高要求反馈里依然能保持清晰，这条线有潜力。",
    environment: "问题复杂、节奏快、表达标准高、需要快速学习行业语境的环境。",
    goodAt: ["问题定义", "结构化表达", "快速学习"],
    watchOut: ["别只会讲框架", "结论必须能落到可执行建议上"],
    weights: {
      analysis: 10,
      systems: 8,
      execution: 8,
      people: 6,
      influence: 7,
      creativity: 4,
      craft: 6,
      adaptability: 6,
    },
  },
  {
    id: "game-planner",
    name: "游戏策划",
    category: "创意与系统",
    summary: "适合同时对机制、体验节奏和世界观表达有兴趣的人。",
    fitSignal: "如果你一边在想玩法结构，一边在想玩家感受和新鲜感，这会很适合你。",
    environment: "需要持续做机制平衡、内容创意和体验调优的团队环境。",
    goodAt: ["玩法机制", "体验节奏", "内容创意"],
    watchOut: ["别只停留在灵感层", "机制设计要能被数据和测试验证"],
    weights: {
      analysis: 6,
      systems: 6,
      execution: 6,
      people: 6,
      influence: 5,
      creativity: 10,
      craft: 6,
      adaptability: 8,
    },
  },
];

export const QUESTIONS: Question[] = [
  {
    id: "q1",
    theme: "模糊需求",
    prompt: "你接到一个很模糊的新需求，第一反应更像哪种？",
    detail: "还没有清晰范围、负责人也没完全想明白。",
    options: [
      {
        title: "先拆目标和约束，画出问题边界。",
        detail: "把问题先定义清楚，再动手。",
        weights: { analysis: 3, systems: 2 },
      },
      {
        title: "先找关键人聊，弄懂真实诉求。",
        detail: "先确认人和场景，再谈方案。",
        weights: { people: 3, analysis: 2 },
      },
      {
        title: "先做一个可行小样，边试边收敛。",
        detail: "让事情尽快从空谈变成可见结果。",
        weights: { execution: 3, adaptability: 2 },
      },
      {
        title: "先发散几个方向，找更有新意的解法。",
        detail: "模糊期最适合拉开思路。",
        weights: { creativity: 3, adaptability: 2 },
      },
    ],
  },
  {
    id: "q2",
    theme: "项目启动",
    prompt: "启动一个新项目时，你最想先补上的是什么？",
    detail: "团队刚刚开跑，很多东西都还没有定形。",
    options: [
      {
        title: "整体框架和里程碑。",
        detail: "有骨架以后，后面的人更好接。",
        weights: { systems: 3, execution: 2 },
      },
      {
        title: "用户问题和使用场景。",
        detail: "先确认这件事到底在替谁解决什么。",
        weights: { people: 2, analysis: 3 },
      },
      {
        title: "第一版能交付什么。",
        detail: "先打出可落地的起手式。",
        weights: { execution: 3, craft: 1, adaptability: 1 },
      },
      {
        title: "它能不能做得更有辨识度。",
        detail: "想先找到别人会记住它的地方。",
        weights: { creativity: 3, craft: 2 },
      },
    ],
  },
  {
    id: "q3",
    theme: "团队卡点",
    prompt: "团队讨论卡住、谁也说服不了谁时，你通常怎么做？",
    detail: "意见分歧已经影响了推进节奏。",
    options: [
      {
        title: "把争议点列清楚，回到事实和标准。",
        detail: "先把争论从情绪拉回问题本身。",
        weights: { analysis: 3, influence: 1, systems: 1 },
      },
      {
        title: "分别沟通各方，找能接受的共识区。",
        detail: "先把人稳住，再收拢方案。",
        weights: { people: 3, influence: 2 },
      },
      {
        title: "拍一个临时决策，让团队先往前走。",
        detail: "不能一直停在会议室里。",
        weights: { execution: 3, influence: 2 },
      },
      {
        title: "提出一个折中但更巧的替代方案。",
        detail: "试着绕开原来的二选一。",
        weights: { creativity: 3, adaptability: 2 },
      },
    ],
  },
  {
    id: "q4",
    theme: "失败复盘",
    prompt: "一个结果不理想的项目结束后，你最关心哪一类问题？",
    detail: "不是追责，而是真想知道问题出在哪。",
    options: [
      {
        title: "判断链路哪里出了偏差。",
        detail: "想知道前面的分析有没有看错。",
        weights: { analysis: 3, craft: 2 },
      },
      {
        title: "流程是不是设计得不合理。",
        detail: "同类问题以后能不能少发生。",
        weights: { systems: 3, execution: 2 },
      },
      {
        title: "关键推进节点为什么没有守住。",
        detail: "节奏和资源是否失控。",
        weights: { execution: 3, influence: 2 },
      },
      {
        title: "用户或对象当时到底在想什么。",
        detail: "真实反馈和情绪有没有被忽略。",
        weights: { people: 3, adaptability: 2 },
      },
    ],
  },
  {
    id: "q5",
    theme: "做决定",
    prompt: "面对两个都还不错的方案，你更依赖什么来决策？",
    detail: "二者都说得通，但资源不够同时做。",
    options: [
      {
        title: "看证据、风险和收益比。",
        detail: "优先做更稳妥也更划算的那个。",
        weights: { analysis: 3, craft: 1, systems: 1 },
      },
      {
        title: "看是否更符合长期机制。",
        detail: "短期好用不代表长期合适。",
        weights: { systems: 3, analysis: 2 },
      },
      {
        title: "看哪一个更能快速产生结果。",
        detail: "先赢一小步，再继续迭代。",
        weights: { execution: 3, adaptability: 2 },
      },
      {
        title: "看哪一个更能打动人。",
        detail: "判断传播力、体验感和记忆点。",
        weights: { creativity: 2, people: 2, influence: 1 },
      },
    ],
  },
  {
    id: "q6",
    theme: "学习方式",
    prompt: "学一项全新技能时，你最自然的切入方式是什么？",
    detail: "没有人手把手带，只能靠自己摸索。",
    options: [
      {
        title: "先理解原理和知识地图。",
        detail: "知道全局结构以后更安心。",
        weights: { analysis: 2, systems: 3 },
      },
      {
        title: "先找真实案例和高手经验。",
        detail: "通过别人的路径快速建立判断。",
        weights: { people: 2, analysis: 2, adaptability: 1 },
      },
      {
        title: "先上手做一个最小作品。",
        detail: "边做边学最快。",
        weights: { execution: 3, adaptability: 2 },
      },
      {
        title: "先模仿优秀样本，再加入自己的改法。",
        detail: "从感受和表达切入。",
        weights: { creativity: 2, craft: 3 },
      },
    ],
  },
  {
    id: "q7",
    theme: "会议角色",
    prompt: "在一场信息很多的会议里，你更像哪种人？",
    detail: "每个人都在说，但不一定都在解决问题。",
    options: [
      {
        title: "负责抓重点和澄清逻辑的人。",
        detail: "会不断追问真正的问题是什么。",
        weights: { analysis: 3, influence: 1, systems: 1 },
      },
      {
        title: "负责听出各方顾虑的人。",
        detail: "会注意谁其实还没被说服。",
        weights: { people: 3, influence: 2 },
      },
      {
        title: "负责收口结论和下一步的人。",
        detail: "会让会议从讨论变成行动。",
        weights: { execution: 3, influence: 2 },
      },
      {
        title: "负责把东西讲得更清楚更有画面的人。",
        detail: "会重组表达，让方案更容易被理解。",
        weights: { creativity: 2, people: 1, craft: 2 },
      },
    ],
  },
  {
    id: "q8",
    theme: "交付压力",
    prompt: "离截止时间很近时，你最容易进入哪种状态？",
    detail: "事情多、时间少、别人也在盯。",
    options: [
      {
        title: "迅速做优先级切割，保关键结果。",
        detail: "先守住主线，不让项目整体崩掉。",
        weights: { execution: 3, analysis: 2 },
      },
      {
        title: "重排流程和依赖，尽量消除卡点。",
        detail: "把阻塞拆开才能真正提速。",
        weights: { systems: 3, execution: 2 },
      },
      {
        title: "去对齐相关人，避免误解越滚越大。",
        detail: "高压下更需要沟通共识。",
        weights: { people: 2, influence: 3 },
      },
      {
        title: "盯质量细节，保证交出去的东西不垮。",
        detail: "越赶越不能让成品失真。",
        weights: { craft: 3, execution: 2 },
      },
    ],
  },
  {
    id: "q9",
    theme: "用户反馈",
    prompt: "收到很尖锐的负面反馈时，你更关注什么？",
    detail: "对方说得不客气，但问题可能是真问题。",
    options: [
      {
        title: "先分辨是个例情绪，还是结构性问题。",
        detail: "不急着被情绪带走。",
        weights: { analysis: 3, craft: 2 },
      },
      {
        title: "先理解他为什么会这么不爽。",
        detail: "情绪背后常有真实体验问题。",
        weights: { people: 3, adaptability: 2 },
      },
      {
        title: "先给出补救动作，减少损失。",
        detail: "先处理现场，再慢慢追根源。",
        weights: { execution: 3, influence: 1, people: 1 },
      },
      {
        title: "把它转成一个更完整的改进方案。",
        detail: "希望把坏体验变成产品进化的契机。",
        weights: { creativity: 2, systems: 2, craft: 1 },
      },
    ],
  },
  {
    id: "q10",
    theme: "表达任务",
    prompt: "要做一份对外展示材料，你最容易先下手的是哪部分？",
    detail: "这份材料既要说服人，也要让人记住。",
    options: [
      {
        title: "先搭故事结构和信息顺序。",
        detail: "让听的人一路顺下来。",
        weights: { systems: 2, analysis: 2, influence: 1 },
      },
      {
        title: "先想对方最在乎什么。",
        detail: "表达要从受众脑子里开始。",
        weights: { people: 3, influence: 2 },
      },
      {
        title: "先把关键信息和结论打出来。",
        detail: "让材料尽快能用。",
        weights: { execution: 3, analysis: 2 },
      },
      {
        title: "先找视觉或文案上的记忆点。",
        detail: "让它不只是清楚，还能留下印象。",
        weights: { creativity: 3, craft: 2 },
      },
    ],
  },
  {
    id: "q11",
    theme: "数据异常",
    prompt: "发现一项核心指标突然异常，你最像怎么查？",
    detail: "还不知道是系统问题、流程问题还是用户行为变化。",
    options: [
      {
        title: "先排查口径、样本和时间点。",
        detail: "先确认是不是假异常。",
        weights: { analysis: 3, craft: 2 },
      },
      {
        title: "先顺着链路看上下游有没有变化。",
        detail: "单点异常往往来自系统联动。",
        weights: { systems: 3, analysis: 2 },
      },
      {
        title: "先找责任人同步，快速收集现场信息。",
        detail: "现场信息往往比猜测更快。",
        weights: { execution: 2, people: 1, influence: 2 },
      },
      {
        title: "先提出几种可能场景做快速验证。",
        detail: "用假设驱动缩小搜索范围。",
        weights: { adaptability: 3, analysis: 2 },
      },
    ],
  },
  {
    id: "q12",
    theme: "带人做事",
    prompt: "如果让你带一个新同学，你最自然会先做什么？",
    detail: "你不是他的直属主管，但需要让他尽快进入状态。",
    options: [
      {
        title: "先讲清楚判断标准和关键原则。",
        detail: "有标准才能独立做判断。",
        weights: { analysis: 2, systems: 2, influence: 1 },
      },
      {
        title: "先了解他的习惯和卡点。",
        detail: "不同的人要用不同的带法。",
        weights: { people: 3, adaptability: 2 },
      },
      {
        title: "先给一个小任务，让他快速上手。",
        detail: "边做边带比纯讲更有效。",
        weights: { execution: 3, influence: 2 },
      },
      {
        title: "先给一个高标准样本让他感受差距。",
        detail: "有参照物更容易建立质量感。",
        weights: { craft: 3, creativity: 1, people: 1 },
      },
    ],
  },
  {
    id: "q13",
    theme: "空档时间",
    prompt: "突然有一周自由时间，你最可能把它投入到哪里？",
    detail: "没有明确 KPI，只看你自然会被什么吸引。",
    options: [
      {
        title: "研究一个复杂问题，把它想透。",
        detail: "喜欢花时间建立完整判断。",
        weights: { analysis: 3, systems: 2 },
      },
      {
        title: "整理流程、工具或方法，让以后更顺。",
        detail: "希望把混乱变成稳定机制。",
        weights: { systems: 3, craft: 1, execution: 1 },
      },
      {
        title: "做一个小项目，看看能不能真的跑起来。",
        detail: "更想要可见成果，而不是只停在想法层。",
        weights: { execution: 3, adaptability: 2 },
      },
      {
        title: "尝试新的表达、作品或内容方向。",
        detail: "想做点有个人味道的东西。",
        weights: { creativity: 3, craft: 2 },
      },
    ],
  },
  {
    id: "q14",
    theme: "协作偏好",
    prompt: "理想的合作对象更像哪一种？",
    detail: "你跟谁一起做事最容易进入状态。",
    options: [
      {
        title: "思路清晰、能讲逻辑的人。",
        detail: "一起拆问题会很舒服。",
        weights: { analysis: 3, systems: 2 },
      },
      {
        title: "目标明确、能快速行动的人。",
        detail: "你喜欢有推进感的搭档。",
        weights: { execution: 3, influence: 1, adaptability: 1 },
      },
      {
        title: "会沟通、愿意对齐的人。",
        detail: "合作体验本身也很重要。",
        weights: { people: 3, influence: 2 },
      },
      {
        title: "有品味、有想法的人。",
        detail: "你会被好表达和新点子激发。",
        weights: { creativity: 3, craft: 2 },
      },
    ],
  },
  {
    id: "q15",
    theme: "资源不足",
    prompt: "预算、人手都不够时，你更像怎么处理？",
    detail: "环境不理想，但事情还得往前推。",
    options: [
      {
        title: "砍掉次要问题，留下最关键的一刀。",
        detail: "资源越少越要精确取舍。",
        weights: { analysis: 3, execution: 2 },
      },
      {
        title: "重排流程，争取一套更省资源的方法。",
        detail: "靠机制优化来换空间。",
        weights: { systems: 3, adaptability: 2 },
      },
      {
        title: "去协调资源、找外部支持或内部盟友。",
        detail: "很多资源是谈出来的。",
        weights: { influence: 3, people: 2 },
      },
      {
        title: "换一种更轻巧但更有创意的做法。",
        detail: "资源少不一定只能做差版本。",
        weights: { creativity: 3, adaptability: 2 },
      },
    ],
  },
  {
    id: "q16",
    theme: "成就来源",
    prompt: "哪种瞬间最容易让你觉得这活干得值？",
    detail: "不是别人觉得值，而是你自己真的会开心。",
    options: [
      {
        title: "把一个复杂问题解释清楚了。",
        detail: "认知上的清晰会让你很有满足感。",
        weights: { analysis: 3, systems: 2 },
      },
      {
        title: "东西终于按计划落地并跑起来。",
        detail: "推进后的成就感非常直接。",
        weights: { execution: 3, influence: 1, craft: 1 },
      },
      {
        title: "一个人因为你的方案或沟通被真正打动。",
        detail: "你很在意人有没有被准确连接。",
        weights: { people: 3, influence: 2 },
      },
      {
        title: "成品终于有了很强的完成度和辨识度。",
        detail: "你享受把东西做漂亮、做顺手。",
        weights: { craft: 3, creativity: 2 },
      },
    ],
  },
  {
    id: "q17",
    theme: "接受反馈",
    prompt: "别人指出你做的东西有问题时，你最自然的反应是什么？",
    detail: "不是被冒犯，而是你会本能地先做什么。",
    options: [
      {
        title: "先追问具体在哪里、依据是什么。",
        detail: "想知道问题是不是成立。",
        weights: { analysis: 3, craft: 2 },
      },
      {
        title: "先理解对方为什么会这样感受。",
        detail: "反馈的语气和背景也值得看。",
        weights: { people: 3, adaptability: 2 },
      },
      {
        title: "先把能改的部分尽快改掉。",
        detail: "不想让问题挂在那里太久。",
        weights: { execution: 3, craft: 2 },
      },
      {
        title: "先想能不能顺便把方案升级一版。",
        detail: "把反馈转成更好的表达。",
        weights: { creativity: 2, craft: 2, adaptability: 1 },
      },
    ],
  },
  {
    id: "q18",
    theme: "多任务冲突",
    prompt: "三件事同时压过来时，你最像怎么处理？",
    detail: "每件都挺重要，但时间不够。",
    options: [
      {
        title: "先根据影响和风险排优先级。",
        detail: "先做最值的，不被焦虑拖走。",
        weights: { analysis: 3, execution: 2 },
      },
      {
        title: "先看依赖关系，找最关键的起点。",
        detail: "顺序对了，后面会省很多力气。",
        weights: { systems: 3, execution: 2 },
      },
      {
        title: "先和相关人同步预期，重新约定节奏。",
        detail: "让各方知道你接下来怎么处理。",
        weights: { influence: 3, people: 2 },
      },
      {
        title: "先选最有机会打开局面的那个试一把。",
        detail: "用突破口带动剩下的任务。",
        weights: { adaptability: 3, execution: 2 },
      },
    ],
  },
  {
    id: "q19",
    theme: "未知市场",
    prompt: "进入一个完全陌生的行业或市场，你更想先摸什么？",
    detail: "手头资料不多，只能先选一个入口。",
    options: [
      {
        title: "市场结构、玩家格局和关键变量。",
        detail: "先把大地图搭起来。",
        weights: { analysis: 3, systems: 2 },
      },
      {
        title: "真实用户、客户或从业者的想法。",
        detail: "先听人说，会更接近现场。",
        weights: { people: 3, adaptability: 2 },
      },
      {
        title: "有没有可以快速验证的小切口。",
        detail: "先试一刀，比空想更快。",
        weights: { execution: 2, adaptability: 3 },
      },
      {
        title: "有哪些被忽略的机会和表达方式。",
        detail: "想从差异化角度切进去。",
        weights: { creativity: 3, analysis: 1, adaptability: 1 },
      },
    ],
  },
  {
    id: "q20",
    theme: "工具偏好",
    prompt: "你更容易对哪类工具或工作流上瘾？",
    detail: "那种一用就会忍不住想一直优化的东西。",
    options: [
      {
        title: "能让信息更有条理的系统工具。",
        detail: "比如结构化笔记、看板、框架模板。",
        weights: { systems: 3, analysis: 2 },
      },
      {
        title: "能让交付更快的效率工具。",
        detail: "比如自动化、脚本、协作推进工具。",
        weights: { execution: 3, adaptability: 2 },
      },
      {
        title: "能帮助沟通和理解用户的工具。",
        detail: "比如访谈、反馈、社群或 CRM 相关。",
        weights: { people: 3, influence: 2 },
      },
      {
        title: "能让作品更精致或更有表现力的工具。",
        detail: "比如设计、编辑、内容创作工具。",
        weights: { creativity: 2, craft: 3 },
      },
    ],
  },
  {
    id: "q21",
    theme: "对外沟通",
    prompt: "要向一个陌生对象争取合作机会，你会怎么准备？",
    detail: "对方时间很少，不会耐心听你绕圈。",
    options: [
      {
        title: "准备清楚逻辑、数据和合作价值。",
        detail: "先让对方觉得你靠谱。",
        weights: { analysis: 2, influence: 2, craft: 1 },
      },
      {
        title: "研究对方处境，找他的真正关注点。",
        detail: "先从对方视角切进去。",
        weights: { people: 3, influence: 2 },
      },
      {
        title: "准备一条很短的行动路径，降低决策成本。",
        detail: "先让第一步足够容易发生。",
        weights: { execution: 3, influence: 2 },
      },
      {
        title: "准备一个有记忆点的切入角度。",
        detail: "希望对方一下记住你。",
        weights: { creativity: 3, people: 1, influence: 1 },
      },
    ],
  },
  {
    id: "q22",
    theme: "速度与质量",
    prompt: "如果必须在速度和完成度之间做选择，你通常更像哪边？",
    detail: "不是极端二选一，而是你本能更先守什么。",
    options: [
      {
        title: "先把方向判断对，再谈快慢。",
        detail: "错误方向上的快没意义。",
        weights: { analysis: 3, craft: 2 },
      },
      {
        title: "先把骨架搭对，质量就更容易守住。",
        detail: "结构决定后面的效率上限。",
        weights: { systems: 3, craft: 2 },
      },
      {
        title: "先交付一个够用版本，后面再补。",
        detail: "真实反馈比闭门打磨更重要。",
        weights: { execution: 3, adaptability: 2 },
      },
      {
        title: "宁可慢一点，也希望它有更强完成度。",
        detail: "粗糙成品会让你很难受。",
        weights: { craft: 3, creativity: 1, execution: 1 },
      },
    ],
  },
  {
    id: "q23",
    theme: "长期成长",
    prompt: "你更希望自己三年后因为什么被记住？",
    detail: "不是职位名，而是别人想到你时最鲜明的印象。",
    options: [
      {
        title: "判断力很强，复杂问题到他手里会变清楚。",
        detail: "以认知和分析见长。",
        weights: { analysis: 3, systems: 2 },
      },
      {
        title: "能把混乱事情做成稳定体系。",
        detail: "以机制和建构能力见长。",
        weights: { systems: 3, execution: 2 },
      },
      {
        title: "很会带节奏，事情总能被他推进落地。",
        detail: "以结果和组织推进见长。",
        weights: { execution: 3, influence: 2 },
      },
      {
        title: "做出来的东西总有自己的味道和水准。",
        detail: "以表达、体验或作品见长。",
        weights: { creativity: 2, craft: 3 },
      },
    ],
  },
  {
    id: "q24",
    theme: "理想工作日",
    prompt: "哪种工作日结束后，你最可能觉得“今天值了”？",
    detail: "选最让你有生命力的一种。",
    options: [
      {
        title: "理清了一个复杂问题，还形成了可靠判断。",
        detail: "脑子很累，但会很满足。",
        weights: { analysis: 3, systems: 2 },
      },
      {
        title: "推进了几个关键节点，项目明显往前走了。",
        detail: "你会因为节奏被带起来。",
        weights: { execution: 3, influence: 2 },
      },
      {
        title: "和人聊透了，关系和共识都更进一步。",
        detail: "你会因为连接感而有能量。",
        weights: { people: 3, influence: 2 },
      },
      {
        title: "做出了一版很顺、很美或很有记忆点的成品。",
        detail: "你会因为作品质量而满足。",
        weights: { creativity: 2, craft: 3 },
      },
    ],
  },
];

export function createEmptyScores(): WeightedScores {
  return {
    analysis: 0,
    systems: 0,
    execution: 0,
    people: 0,
    influence: 0,
    creativity: 0,
    craft: 0,
    adaptability: 0,
  };
}
