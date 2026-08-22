(() => {
  const STORAGE_KEY = "jiaying-desktop-language";
  const ENGLISH = "en";
  const CHINESE = "zh-CN";

  const translations = {
    "About Jiaying": "关于 Jiaying",
    "Research.txt": "研究方向.txt",
    "Publications": "科研成果",
    "Academic Activities": "学术动态",
    "Curriculum Vitae": "个人简历",
    "Academic Links": "学术链接",
    "Language": "切换语言",
    "Restart in Chinese": "重启并进入中文",
    "Jiaying Peng — Academic Profile": "Jiaying Peng — 学术主页",
    "Electrochemical materials researcher": "电化学材料研究者",
    "Current appointment": "当前身份",
    "PhD Candidate at BUCT": "北京化工大学博士研究生",
    "Joint training": "联合培养",
    "Joint PhD Researcher at NUS": "新加坡国立大学联合培养博士研究生",
    "Research area": "研究领域",
    "Electrochemical Energy Storage": "电化学储能",
    "Academic profiles": "学术主页",
    "More links...": "更多链接……",
    "WELCOME TO MY ACADEMIC DESKTOP": "欢迎来到我的学术桌面",
    "PhD Candidate at BUCT · Joint PhD Researcher at NUS": "北京化工大学博士研究生 · 新加坡国立大学联合培养博士研究生",
    "I am a doctoral researcher in materials science and engineering. My work develops functional inorganic nanofibers and bio-inspired electrolyte architectures for safer, longer-lasting rechargeable batteries, connecting materials design with ion transport and electrode–electrolyte interfaces.": "我是一名材料科学与工程专业的博士研究者，致力于开发功能无机纳米纤维与仿生电解质结构，以构建更安全、更耐久的可充电电池，并将材料设计与离子传输及电极—电解质界面研究相结合。",
    "Current research focus": "当前研究重点",
    "Functional nanofibers": "功能纳米纤维",
    "Advanced electrolytes": "先进电解质",
    "Stable interfaces": "稳定界面",
    "A connected materials-to-device research program.": "从材料设计贯通至器件应用的研究体系。",
    "Open Research.txt": "打开“研究方向.txt”",
    "ACADEMIC ACTIVITY LOG": "学术动态记录",
    "Recent updates": "近期动态",
    "Open Activities": "打开学术动态",
    "29 MAY": "5月29日",
    "11 NOV": "11月11日",
    "AWARD": "获奖",
    "28 MAR": "3月28日",
    "09 MAY": "5月9日",
    "26 OCT": "10月26日",
    "First-author paper in Angewandte Chemie": "第一作者论文发表于《德国应用化学》",
    "Published a bone-inspired sustainable hydrogel electrolyte for Zn metal batteries, combining rapid Zn": "发表用于锌金属电池的仿骨可持续水凝胶电解质，实现快速 Zn",
    "transport with recyclability and biodegradability.": "传输，同时具备可回收性与生物降解性。",
    "View DOI ↗": "查看 DOI ↗",
    "Oral presentation at ICACSI 2024": "在 ICACSI 2024 作口头报告",
    "Presented work on an interface-enhanced continuous 2D-carbon network for high-performance silicon anodes in Sydney, Australia.": "在澳大利亚悉尼报告界面增强型连续二维碳网络用于高性能硅负极的研究。",
    "National Scholarship for Doctoral Students": "博士研究生国家奖学金",
    "Recognized for doctoral research performance and academic achievement.": "因博士阶段的科研表现与学术成绩获此奖励。",
    "First-author paper in JACS": "第一作者论文发表于 JACS",
    "Reported lithium-superionic-conductive nanofibers that reinforce polymer electrolytes for solid-state batteries.": "报道以锂超离子导电纳米纤维增强固态电池聚合物电解质的研究。",
    "Research article in Angewandte Chemie": "研究论文发表于《德国应用化学》",
    "Contributed to an ultraconformal, chemically bonded interface between an elastic solid electrolyte and a lithium-metal anode.": "参与构建弹性固态电解质与锂金属负极之间超共形、化学键合的界面。",
    "Co-first-author paper in Energy & Environmental Science": "共同第一作者论文发表于《Energy & Environmental Science》",
    "Investigated lithium deposition mechanisms on silicon and copper substrates in carbonate electrolyte.": "研究碳酸酯电解液中锂在硅与铜基底上的沉积机制。",
    "Ready": "就绪",
    "Research · outputs · activities": "研究 · 成果 · 动态",
    "Updated 24 July 2026": "更新于 2026 年 7 月 24 日",
    "Research.txt - Notepad": "研究方向.txt - 记事本",
    "C:\\JIAYING\\RESEARCH.TXT": "C:\\JIAYING\\研究方向.TXT",
    "Designing pathways for ions": "为离子设计传输通道",
    "Materials architecture for safer, longer-lasting metal batteries.": "面向更安全、更耐久金属电池的材料架构。",
    "Continuous ion transport": "连续离子传输",
    "Safer metal batteries": "更安全的金属电池",
    "01 · OVERVIEW": "01 · 研究概述",
    "My research sits at the intersection of materials chemistry and electrochemical energy storage. I use one-dimensional inorganic nanofibers, polymer matrices, bio-inspired structures, and interfacial engineering to connect microscopic transport mechanisms with practical battery performance.": "我的研究位于材料化学与电化学储能的交叉领域。我通过一维无机纳米纤维、聚合物基体、仿生结构和界面工程，将微观传输机制与实际电池性能联系起来。",
    "02 · RESEARCH PROGRAMS": "02 · 研究方向",
    "Nanofiber-reinforced solid polymer electrolytes": "纳米纤维增强固态聚合物电解质",
    "Ultralong lithium-containing hydroxyapatite nanofibers form robust, continuous pathways that improve Li": "超长含锂羟基磷灰石纳米纤维构建稳固、连续的通道，提升 Li",
    "transport and stabilize lithium-metal interfaces.": "传输并稳定锂金属界面。",
    "Multi-channel ion transport": "多通道离子传输",
    "Dielectric and superionic conductors act as active components that regulate polymer-chain motion, local electric fields, and interconnected transport channels.": "介电材料与超离子导体作为活性组分，调控聚合物链运动、局部电场和相互连通的传输通道。",
    "Bone-inspired sustainable hydrogels": "仿骨可持续水凝胶",
    "Zinc-doped hydroxyapatite nanofibers and gelatin combine rapid Zn": "掺锌羟基磷灰石纳米纤维与明胶相结合，实现快速 Zn",
    "transport with water retention, mechanical integrity, recyclability, and biodegradability.": "传输，并兼具保水性、机械完整性、可回收性与生物降解性。",
    "Electrode and interface architectures": "电极与界面架构",
    "Substrate chemistry, current distribution, and conductive carbon networks are studied to understand lithium deposition and stabilize silicon anodes.": "通过研究基底化学、电流分布和导电碳网络，理解锂沉积行为并稳定硅负极。",
    "03 · MATERIALS & METHODS": "03 · 材料与方法",
    "Inorganic nanofibers": "无机纳米纤维",
    "Hydroxyapatite conductors": "羟基磷灰石导体",
    "Polymer & gelatin matrices": "聚合物与明胶基体",
    "Electrochemical analysis": "电化学分析",
    "Interface characterization": "界面表征",
    "Mechanism-guided design": "机制导向设计",
    "04 · NEXT DIRECTIONS": "04 · 下一步方向",
    "Fiber-based solid and gel electrolytes for metal batteries; advanced separators and functional fibrous membranes; and scalable manufacturing routes that translate nanofiber architectures into deployable energy-storage components.": "面向金属电池的纤维基固态与凝胶电解质；先进隔膜与功能纤维膜；以及将纳米纤维架构转化为可应用储能组件的规模化制造路线。",
    "KEYWORDS": "关键词",
    "· solid-state batteries · aqueous zinc batteries · nanofibers · hydroxyapatite · ion transport · electrode interfaces": "· 固态电池 · 水系锌电池 · 纳米纤维 · 羟基磷灰石 · 离子传输 · 电极界面",
    "Exploring — Research Outputs": "资源管理器 — 科研成果",
    "← Back": "← 后退",
    "→ Forward": "→ 前进",
    "Address": "地址",
    "C:\\Jiaying\\Research Outputs": "C:\\Jiaying\\科研成果",
    "Research Outputs": "科研成果",
    "Peer-reviewed papers and patents across electrolytes, interfaces, and electrode materials.": "涵盖电解质、界面与电极材料的同行评议论文和专利。",
    "7 selected object(s)": "已选择 7 个对象",
    "FOLDERS": "文件夹",
    "Lead-author Papers": "第一作者论文",
    "4 selected": "已选择 4 项",
    "Collaborative Papers": "合作论文",
    "1 selected": "已选择 1 项",
    "Patents": "专利",
    "2 records": "2 条记录",
    "Bone-Inspired Sustainable Hydrogel Electrolytes for Zn Metal Batteries": "用于锌金属电池的仿骨可持续水凝胶电解质",
    "FIRST AUTHOR": "第一作者",
    "A recyclable and biodegradable bone-like Zn-HA/gelatin electrolyte enabling rapid Zn": "一种可回收、可生物降解的仿骨 Zn-HA/明胶电解质，可实现快速 Zn",
    "transport and durable zinc-metal cycling.": "传输和持久的锌金属循环。",
    "NEW": "最新",
    "Lithium Superionic Conductive Nanofiber-Reinforcing High-Performance Polymer Electrolytes for Solid-State Batteries": "锂超离子导电纳米纤维增强的高性能固态电池聚合物电解质",
    "COVER ARTICLE": "封面论文",
    "Ultralong Li-HA-F nanofibers create continuous dual-conductive pathways, strengthening polymer electrolytes while improving ion transport and interfacial stability.": "超长 Li-HA-F 纳米纤维构建连续双导电通道，在增强聚合物电解质的同时改善离子传输与界面稳定性。",
    "An Interface-Enhanced Continuous 2D-Carbon Network Enabling High-Performance Si Anodes": "实现高性能硅负极的界面增强型连续二维碳网络",
    "A gelatin-derived 2D carbon network improves electrical transport, lithium-ion diffusion, and structural stability in high-capacity silicon anodes.": "明胶衍生二维碳网络改善高容量硅负极中的电子传输、锂离子扩散与结构稳定性。",
    "Lithium Deposition Mechanism on Si and Cu Substrates in the Carbonate Electrolyte": "碳酸酯电解液中锂在硅和铜基底上的沉积机制",
    "CO-FIRST AUTHOR": "共同第一作者",
    "Imaging, simulation, and electrochemistry reveal how substrate and current density govern lithium growth morphology and whisker formation.": "成像、模拟与电化学研究揭示基底和电流密度如何调控锂的生长形貌与晶须形成。",
    "A Chemically Bonded Ultraconformal Layer between the Elastic Solid Electrolyte and Lithium Anode": "弹性固态电解质与锂负极之间的化学键合超共形层",
    "CO-AUTHOR": "共同作者",
    "A conformal, chemically bonded interlayer reduces interfacial impedance and accommodates lithium-metal volume changes for stable cycling.": "共形化学键合中间层可降低界面阻抗并适应锂金属体积变化，实现稳定循环。",
    "Inorganic Superionic Conductor Materials, Preparation and Applications": "无机超离子导体材料、制备方法及应用",
    "Chinese invention patent": "中国发明专利",
    "GRANTED": "已授权",
    "Covers inorganic superionic conductor materials, inorganic solid-electrolyte membranes, and their use in lithium batteries.": "涵盖无机超离子导体材料、无机固态电解质膜及其在锂电池中的应用。",
    "Dielectric Piezoelectric Ceramic Material, Preparation and Applications": "介电压电陶瓷材料、制备方法及应用",
    "Chinese invention patent application": "中国发明专利申请",
    "FILED": "已申请",
    "Describes a dielectric piezoelectric ceramic material and its preparation route for functional materials applications.": "介绍介电压电陶瓷材料及其面向功能材料应用的制备路线。",
    "Application No. 202610541862.8": "申请号：202610541862.8",
    "Papers open via DOI · patent records are listed in place": "论文通过 DOI 打开 · 专利记录在此列出",
    "Academic Activities — News, Talks & Honors": "学术动态 — 新闻、报告与荣誉",
    "NEWS": "新闻",
    "29 May 2025": "2025 年 5 月 29 日",
    "First-author paper published in Angewandte Chemie": "第一作者论文发表于《德国应用化学》",
    "TALKS & CONFERENCES": "报告与会议",
    "11 Nov 2024": "2024 年 11 月 11 日",
    "Oral presentation at ICACSI 2024, Sydney": "在悉尼 ICACSI 2024 作口头报告",
    "Doctoral Forum at the State Key Laboratory": "国家重点实验室博士生论坛",
    "Jing–Jin Electrochemical Energy Storage Youth Salon": "京津电化学储能青年沙龙",
    "Selected": "精选",
    "University forums and research exchanges": "高校论坛与科研交流",
    "HONORS & AWARDS": "荣誉与奖励",
    "Selected scholarships and presentation awards": "代表性奖学金与报告奖励",
    "Bone-inspired sustainable hydrogel electrolytes": "仿骨可持续水凝胶电解质",
    "Published online 29 May 2025 · Angewandte Chemie International Edition": "2025 年 5 月 29 日在线发表 · Angewandte Chemie International Edition",
    "Jiaying Peng is the first author of a study introducing Zn-HA-Gel, a bone-inspired hydrogel electrolyte composed of zinc-doped hydroxyapatite nanofibers and a gelatin matrix.": "Jiaying Peng 以第一作者身份报道 Zn-HA-Gel：一种由掺锌羟基磷灰石纳米纤维与明胶基体组成的仿骨水凝胶电解质。",
    "The design combines fast Zn": "该设计实现快速 Zn",
    "transport with water retention, mechanical strength, recyclability, biodegradability, and stable zinc plating/stripping.": "传输，同时兼具保水性、机械强度、可回收性、生物降解性以及稳定的锌沉积/剥离性能。",
    "Open publication ↗": "打开论文 ↗",
    "11 November 2024 · Sydney, Australia · International oral presentation": "2024 年 11 月 11 日 · 澳大利亚悉尼 · 国际会议口头报告",
    "CONFERENCE PHOTO": "会议照片",
    "Reserved for a future verified image": "预留用于后续添加经确认的图片",
    "Presented research on an interface-enhanced continuous 2D-carbon network for high-performance silicon anodes at the International Conference on Advanced and Applied Chemistry, Sydney.": "在悉尼国际先进与应用化学会议上报告界面增强型连续二维碳网络用于高性能硅负极的研究。",
    "Related work:": "相关工作：",
    "Doctoral Forum — State Key Laboratory": "博士生论坛 — 国家重点实验室",
    "2025 · Oral presentation · First Prize": "2025 · 口头报告 · 一等奖",
    "PRESENTATION PHOTO": "报告照片",
    "Presented doctoral research on functional nanofiber-based electrolytes and their role in continuous ion transport and stable metal-battery interfaces.": "报告功能纳米纤维基电解质及其在连续离子传输和稳定金属电池界面中的作用。",
    "The presentation received a first-prize oral-presentation award.": "该报告获口头报告一等奖。",
    "2024–2025 · Oral presentations · Best Oral Presentation awards": "2024–2025 · 口头报告 · 最佳口头报告奖",
    "EVENT PHOTO": "活动照片",
    "Shared research progress with the regional electrochemical energy-storage community and received Best Oral Presentation recognition in both 2024 and 2025.": "与区域电化学储能学术共同体分享研究进展，并于 2024 年和 2025 年两次获得最佳口头报告奖。",
    "Selected academic activities · China": "代表性学术活动 · 中国",
    "ACTIVITY PHOTO": "活动照片",
    "Additional research presentations and academic exchanges have included the BUCT Boxue Forum, events at Tianjin University and Sun Yat-sen University, and forums organized by a State Key Laboratory.": "其他科研报告与学术交流包括北京化工大学博学论坛、天津大学和中山大学的相关活动，以及国家重点实验室组织的论坛。",
    "Specific talk titles and dates will be added when the event records are finalized.": "待活动记录最终确认后，将补充具体报告题目与日期。",
    "Selected Honors & Awards": "代表性荣誉与奖励",
    "A concise selection of competitive doctoral and presentation honors": "博士阶段竞争性奖项与报告荣誉精选",
    "National-level doctoral scholarship": "国家级博士研究生奖学金",
    "BUCT Presidential Scholarship for Doctoral Students": "北京化工大学博士研究生校长奖学金",
    "Beijing University of Chemical Technology": "北京化工大学",
    "First Prize, Doctoral Forum Oral Presentation": "博士生论坛口头报告一等奖",
    "State Key Laboratory forum": "国家重点实验室论坛",
    "Best Oral Presentation": "最佳口头报告",
    "Additional scholarships and forum awards are included in the web CV.": "更多奖学金与论坛奖项见网页版个人简历。",
    "News · Talks & Conferences · Honors & Awards": "新闻 · 报告与会议 · 荣誉与奖励",
    "Curriculum Vitae — Jiaying Peng": "个人简历 — Jiaying Peng",
    "CURRICULUM VITAE": "个人简历",
    "Materials Science & Engineering · Electrochemical Energy Storage": "材料科学与工程 · 电化学储能",
    "Education & Joint Training": "教育经历与联合培养",
    "2026.02 — Present": "2026.02 — 至今",
    "Joint PhD Researcher": "联合培养博士研究生",
    "College of Design and Engineering, National University of Singapore": "新加坡国立大学设计与工程学院",
    "Advisor: Prof. Hui Ying Yang": "导师：杨慧颖教授",
    "2021.09 — Present": "2021.09 — 至今",
    "PhD Candidate, Materials Science and Engineering": "材料科学与工程博士研究生",
    "Direct doctoral program · Advisor: Prof. Feng Wang": "直博项目 · 导师：王峰教授",
    "BEng, Materials Science and Engineering": "材料科学与工程学士",
    "Research Profile": "研究概况",
    "Functional inorganic nanofibers, solid polymer and hydrogel electrolytes, metal-anode interfaces, lithium and zinc batteries, silicon–carbon anodes, and mechanism-guided design of continuous ion-transport pathways.": "功能无机纳米纤维、固态聚合物与水凝胶电解质、金属负极界面、锂电池与锌电池、硅碳负极，以及机制导向的连续离子传输通道设计。",
    "Selected Publications": "代表性论文",
    "(2025), first author. Bone-inspired sustainable hydrogel electrolytes for Zn metal batteries.": "（2025），第一作者。用于锌金属电池的仿骨可持续水凝胶电解质。",
    "(2024), first author, cover article. Lithium superionic conductive nanofiber-reinforcing polymer electrolytes.": "（2024），第一作者、封面论文。锂超离子导电纳米纤维增强聚合物电解质。",
    "(2022), co-first author. Lithium deposition mechanism on Si and Cu substrates.": "（2022），共同第一作者。锂在硅与铜基底上的沉积机制。",
    "(2022), first author. Continuous 2D-carbon network for high-performance Si anodes.": "（2022），第一作者。用于高性能硅负极的连续二维碳网络。",
    "— Inorganic superionic conductor materials, preparation and applications; inorganic solid-electrolyte membranes and lithium batteries.": "— 无机超离子导体材料、制备方法及应用；无机固态电解质膜与锂电池。",
    "— Dielectric piezoelectric ceramic material, preparation method and applications.": "— 介电压电陶瓷材料、制备方法及应用。",
    "Granted": "已授权",
    "Filed": "已申请",
    "Selected Honors": "代表性荣誉",
    "2024 · National Scholarship for Doctoral Students": "2024 · 博士研究生国家奖学金",
    "2025 · First Prize, State Key Laboratory Doctoral Forum": "2025 · 国家重点实验室博士生论坛一等奖",
    "2025 · Best Oral Presentation, Jing–Jin Youth Salon": "2025 · 京津青年沙龙最佳口头报告",
    "Selected Talks & Academic Activities": "代表性报告与学术活动",
    "2024 · Oral presentation, ICACSI 2024, Sydney, Australia": "2024 · ICACSI 2024 口头报告，澳大利亚悉尼",
    "2024–2025 · Jing–Jin Electrochemical Energy Storage Youth Salon": "2024–2025 · 京津电化学储能青年沙龙",
    "Doctoral forums and research exchanges at BUCT, Tianjin University, Sun Yat-sen University, and a State Key Laboratory": "在北京化工大学、天津大学、中山大学及国家重点实验室参加博士生论坛与科研交流",
    "Future Research Directions": "未来研究方向",
    "Fiber-based solid and gel electrolytes for metal batteries; advanced separators and functional fibrous membranes; and scalable manufacturing strategies for electrochemical energy-storage materials.": "面向金属电池的纤维基固态与凝胶电解质；先进隔膜与功能纤维膜；以及电化学储能材料的规模化制造策略。",
    "Web CV · Updated 24 July 2026": "网页版简历 · 更新于 2026 年 7 月 24 日",
    "Internet Explorer — Academic Links": "Internet Explorer — 学术链接",
    "Connect to the Internet": "连接到互联网",
    "Verified academic identifiers and institutional resources.": "经核实的学术身份标识与机构资源。",
    "Publications and citation profile": "论文与引用概况",
    "Research profile and website source": "研究主页与网站源代码",
    "Institutional website": "机构网站",
    "NUS College of Design and Engineering": "新加坡国立大学设计与工程学院",
    "Joint doctoral training institution": "博士联合培养机构",
    "Internet zone": "Internet 区域",
    "Academic profile": "学术主页",
    "Research themes and directions": "研究主题与方向",
    "Papers and patents": "论文与专利",
    "News · talks · honors": "新闻 · 报告 · 荣誉",
    "Education and experience": "教育与经历",
    "Scholar · ORCID · GitHub": "学者主页 · ORCID · GitHub",
    "About this site...": "关于本站……",
    "Windows 98 academic edition": "Windows 98 学术版",
    "Start": "开始",
    "About This Academic Desktop": "关于此学术桌面",
    "Jiaying Peng Academic Desktop": "Jiaying Peng 学术桌面",
    "Academic Desktop · Prototype 1.0": "学术桌面 · 1.0 版",
    "A static academic profile designed for clarity, personality, and easy long-term maintenance.": "一个清晰、富有个性且便于长期维护的静态学术主页。",
    "OK": "确定"
  };

  const attributeTranslations = {
    "Jiaying Peng academic desktop": "Jiaying Peng 学术桌面",
    "Desktop shortcuts": "桌面快捷方式",
    "Switch the desktop language to Chinese": "将桌面语言切换为中文",
    "About Jiaying Peng": "关于 Jiaying Peng",
    "Application menu": "应用程序菜单",
    "Reserved portrait area": "预留肖像区域",
    "Research interests": "研究方向",
    "Research pathway": "研究路径",
    "Selected publications": "代表性科研成果",
    "Research output folders": "科研成果文件夹",
    "Academic activities": "学术动态",
    "Conference photo placeholder": "会议照片预留区域",
    "Presentation photo placeholder": "报告照片预留区域",
    "Academic salon photo placeholder": "学术沙龙照片预留区域",
    "Research exchange photo placeholder": "科研交流照片预留区域",
    "Curriculum vitae": "个人简历",
    "Academic profile links": "学术主页链接",
    "Taskbar": "任务栏",
    "Local date and time": "本地日期和时间",
    "Minimize": "最小化",
    "Maximize": "最大化",
    "Close": "关闭",
    "Jiaying Peng": "Jiaying Peng",
    "Research.txt": "研究方向.txt",
    "Publications": "科研成果",
    "Academic Activities": "学术动态",
    "Curriculum Vitae": "个人简历",
    "Academic Links": "学术链接"
  };

  const menuTranslations = {
    "File": "文件",
    "View": "查看",
    "Research": "研究",
    "News": "动态",
    "Help": "帮助",
    "Edit": "编辑",
    "Search": "搜索",
    "Go": "转到",
    "Favorites": "收藏夹",
    "Message": "消息",
    "Print": "打印"
  };

  const originalText = new WeakMap();
  const originalAttributes = new WeakMap();
  const originalMenus = new Map();
  const metaDescription = document.querySelector('meta[name="description"]');
  const originalMetaDescription = metaDescription ? metaDescription.content : "";
  const originalTitle = document.title;
  let currentLanguage = readSavedLanguage();
  let restartInProgress = false;

  function normalize(value) {
    return value.replace(/\s+/g, " ").trim();
  }

  function readSavedLanguage() {
    try {
      return window.localStorage.getItem(STORAGE_KEY) === CHINESE ? CHINESE : ENGLISH;
    } catch (error) {
      return ENGLISH;
    }
  }

  function saveLanguage(language) {
    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch (error) {
      // The language still changes for this visit when storage is unavailable.
    }
  }

  function translateTextNodes(language) {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node = walker.nextNode();

    while (node) {
      const parent = node.parentElement;
      const ignored = !parent || parent.closest("script, style, noscript, .menu-bar, [data-i18n-ignore]");

      if (!ignored && normalize(node.nodeValue)) {
        if (!originalText.has(node)) originalText.set(node, node.nodeValue);
        const source = originalText.get(node);
        const key = normalize(source);

        if (language === CHINESE && translations[key]) {
          const leading = source.match(/^\s*/)[0];
          const trailing = source.match(/\s*$/)[0];
          node.nodeValue = `${leading}${translations[key]}${trailing}`;
        } else {
          node.nodeValue = source;
        }
      }

      node = walker.nextNode();
    }
  }

  function translateAttributes(language) {
    document.querySelectorAll("[aria-label], [data-title]").forEach((element) => {
      if (!originalAttributes.has(element)) {
        originalAttributes.set(element, {
          ariaLabel: element.getAttribute("aria-label"),
          dataTitle: element.getAttribute("data-title")
        });
      }

      const originals = originalAttributes.get(element);
      ["ariaLabel", "dataTitle"].forEach((property) => {
        const attribute = property === "ariaLabel" ? "aria-label" : "data-title";
        const source = originals[property];
        if (source === null) return;
        element.setAttribute(
          attribute,
          language === CHINESE && attributeTranslations[source] ? attributeTranslations[source] : source
        );
      });
    });
  }

  function translateMenus(language) {
    document.querySelectorAll(".menu-bar button").forEach((button) => {
      if (!originalMenus.has(button)) originalMenus.set(button, button.innerHTML);
      const englishLabel = normalize(button.textContent);

      if (language === CHINESE) {
        button.textContent = menuTranslations[englishLabel] || englishLabel;
      } else {
        button.innerHTML = originalMenus.get(button);
      }
    });
  }

  function updateLanguageControls(language) {
    const switchingToChinese = language === ENGLISH;
    document.querySelectorAll("[data-language-switch]").forEach((button) => {
      button.setAttribute(
        "aria-label",
        switchingToChinese ? "Switch the desktop language to Chinese" : "切换桌面语言为英文"
      );
    });

    const desktopLabel = document.querySelector(".language-app > span");
    if (desktopLabel) desktopLabel.textContent = language === CHINESE ? "切换语言" : "Language";

    const startLabel = document.querySelector("#start-menu [data-language-switch] strong");
    const startHint = document.querySelector("#start-menu [data-language-switch] small");
    if (startLabel) startLabel.textContent = language === CHINESE ? "切换语言" : "Language";
    if (startHint) startHint.textContent = language === CHINESE ? "重启并进入英文" : "Restart in Chinese";
  }

  function applyLanguage(language, announce = true) {
    currentLanguage = language;
    document.documentElement.lang = language;
    document.title = language === CHINESE ? "Jiaying Peng — 学术桌面" : originalTitle;
    if (metaDescription) {
      metaDescription.content = language === CHINESE
        ? "Jiaying Peng — 从事先进电解质与下一代电池电极材料研究的博士研究者。"
        : originalMetaDescription;
    }

    translateTextNodes(language);
    translateAttributes(language);
    translateMenus(language);
    updateLanguageControls(language);

    if (announce) {
      document.dispatchEvent(new CustomEvent("academic-language-change", {
        detail: { language }
      }));
    }
  }

  function restartInto(language) {
    if (restartInProgress) return;
    restartInProgress = true;

    const overlay = document.getElementById("reboot-screen");
    const message = document.getElementById("reboot-message");
    const hint = document.getElementById("reboot-hint");
    const startMenu = document.getElementById("start-menu");
    const startButton = document.getElementById("start-button");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const switchDelay = reducedMotion ? 450 : 1250;
    const finishDelay = reducedMotion ? 850 : 2100;

    if (startMenu) {
      startMenu.classList.remove("is-open");
      startMenu.setAttribute("aria-hidden", "true");
    }
    if (startButton) {
      startButton.classList.remove("is-active");
      startButton.setAttribute("aria-expanded", "false");
    }

    message.textContent = currentLanguage === CHINESE ? "Windows 正在重新启动……" : "Windows is restarting...";
    hint.textContent = currentLanguage === CHINESE
      ? "请稍候，正在应用语言设置。"
      : "Please wait while your language settings are applied.";
    overlay.hidden = false;
    overlay.setAttribute("aria-busy", "true");
    document.body.classList.add("is-restarting");
    window.requestAnimationFrame(() => overlay.classList.add("is-visible"));

    window.setTimeout(() => {
      applyLanguage(language);
      saveLanguage(language);
      message.textContent = language === CHINESE ? "正在载入中文桌面……" : "Loading the English desktop...";
      hint.textContent = language === CHINESE ? "语言设置已应用。" : "Language settings applied.";
    }, switchDelay);

    window.setTimeout(() => {
      overlay.classList.remove("is-visible");
      overlay.setAttribute("aria-busy", "false");
      document.body.classList.remove("is-restarting");
      window.setTimeout(() => {
        overlay.hidden = true;
        restartInProgress = false;
        const languageButton = document.querySelector(".language-app");
        if (languageButton) languageButton.focus({ preventScroll: true });
      }, 180);
    }, finishDelay);
  }

  document.querySelectorAll("[data-language-switch]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      restartInto(currentLanguage === CHINESE ? ENGLISH : CHINESE);
    });
  });

  applyLanguage(currentLanguage, false);

  window.academicDesktopI18n = {
    get language() {
      return currentLanguage;
    },
    switchLanguage() {
      restartInto(currentLanguage === CHINESE ? ENGLISH : CHINESE);
    }
  };
})();
