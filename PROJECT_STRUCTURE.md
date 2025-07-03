# 项目结构索引

这是一个基于 Jekyll 的学术个人网站项目的完整结构说明文档。

## 根目录文件

### 配置文件
- **`_config.yml`** - Jekyll 主配置文件，定义网站设置、插件、集合等
- **`Gemfile`** - Ruby 依赖管理文件
- **`package.json`** - Node.js 依赖管理文件
- **`docker-compose.yaml`** - Docker 容器编排配置
- **`Dockerfile`** - Docker 镜像构建配置

### 文档文件
- **`README.md`** - 项目说明文档
- **`LICENSE`** - 开源许可证
- **`CONTRIBUTING.md`** - 贡献指南
- **`.gitignore`** - Git 忽略文件配置

### Jupyter Notebook 文件
- **`talkmap.ipynb`** - 生成演讲地图的 Jupyter 笔记本
- **`talkmap_out.ipynb`** - 演讲地图输出结果
- **`talkmap.py`** - 演讲地图生成脚本

## 核心目录结构

### `_config.yml` 相关集合目录

#### `_data/`
网站数据文件目录，存储结构化数据：
- **`navigation.yml`** - 网站导航菜单配置
- **`authors.yml`** - 作者信息数据
- **`cv.json`** - 简历数据（JSON 格式）
- **`ui-text.yml`** - 界面文本本地化配置
- **`comments/`** - 评论数据存储目录
  - `layout-comments/` - 布局相关评论
  - `markup-syntax-highlighting/` - 语法高亮相关评论
  - `welcome-to-jekyll/` - Jekyll 欢迎页面评论

#### `_includes/`
Jekyll 模板片段目录，可重用的 HTML 组件：

**核心模板组件：**
- **`archive-single.html`** - 单个归档项目模板
- **`archive-single-cv.html`** - CV 页面单个项目模板
- **`archive-single-talk.html`** - 演讲单个项目模板
- **`archive-single-talk-cv.html`** - CV 页面演讲项目模板
- **`author-profile.html`** - 作者简介侧边栏模板
- **`sidebar.html`** - 侧边栏主模板
- **`masthead.html`** - 网站头部导航模板
- **`footer.html`** - 网站底部模板

**页面功能组件：**
- **`head.html`** - HTML head 标签内容
- **`seo.html`** - SEO 优化标签
- **`scripts.html`** - JavaScript 脚本加载
- **`analytics.html`** - 网站分析代码
- **`breadcrumbs.html`** - 面包屑导航
- **`paginator.html`** - 分页组件
- **`post_pagination.html`** - 文章分页
- **`read-time.html`** - 阅读时间估算
- **`social-share.html`** - 社交分享按钮
- **`toc`** - 目录生成器
- **`nav_list`** - 导航列表生成器

**内容组件：**
- **`page__hero.html`** - 页面英雄区域
- **`page__taxonomy.html`** - 页面分类标签
- **`category-list.html`** - 分类列表
- **`tag-list.html`** - 标签列表
- **`feature_row`** - 特色内容行
- **`gallery`** - 图片画廊
- **`cv-template.html`** - CV 模板

**评论系统：**
- **`comments.html`** - 评论主模板
- **`comment.html`** - 单个评论模板
- **`comments-providers/`** - 各种评论服务提供商模板
  - `disqus.html` - Disqus 评论
  - `discourse.html` - Discourse 评论
  - `facebook.html` - Facebook 评论
  - `google-plus.html` - Google+ 评论
  - `staticman.html` - Staticman 评论
  - `custom.html` - 自定义评论
  - `scripts.html` - 评论脚本

**分析服务：**
- **`analytics-providers/`** - 各种网站分析服务模板
  - `google-analytics-4.html` - Google Analytics 4
  - `google-universal.html` - Google Universal Analytics
  - `google.html` - Google Analytics
  - `custom.html` - 自定义分析

**自定义扩展：**
- **`head/custom.html`** - 自定义 head 内容
- **`footer/custom.html`** - 自定义底部内容

**工具组件：**
- **`base_path`** - 基础路径处理
- **`group-by-array`** - 数组分组工具
- **`browser-upgrade.html`** - 浏览器升级提示

#### `_layouts/`
Jekyll 页面布局模板：
- **`default.html`** - 默认页面布局
- **`single.html`** - 单页面布局（文章、出版物等）
- **`archive.html`** - 归档页面布局
- **`archive-taxonomy.html`** - 分类归档布局
- **`splash.html`** - 启动页面布局
- **`talk.html`** - 演讲页面布局
- **`cv-layout.html`** - CV 页面专用布局
- **`compress.html`** - HTML 压缩布局

#### `_pages/`
静态页面目录：

**主要页面：**
- **`about.md`** - 关于页面
- **`cv.md`** - 简历页面
- **`publications.html`** - 出版物列表页面
- **`talks.html`** - 演讲列表页面
- **`teaching.html`** - 教学经历页面
- **`portfolio.html`** - 作品集页面

**归档页面：**
- **`archive-layout-with-content.md`** - 带内容的归档布局
- **`category-archive.html`** - 分类归档
- **`tag-archive.html`** - 标签归档
- **`year-archive.html`** - 年份归档
- **`page-archive.html`** - 页面归档
- **`collection-archive.html`** - 集合归档

**功能页面：**
- **`talkmap.html`** - 演讲地图页面
- **`cv-json.md`** - JSON 格式简历
- **`sitemap.md`** - 网站地图
- **`markdown.md`** - Markdown 语法展示
- **`404.md`** - 404 错误页面
- **`terms.md`** - 使用条款
- **`non-menu-page.md`** - 非菜单页面示例

### 内容集合目录

#### `_posts/`
博客文章目录：
- **`2012-08-14-blog-post-1.md`** - 示例博客文章 1
- **`2013-08-14-blog-post-2.md`** - 示例博客文章 2
- **`2014-08-14-blog-post-3.md`** - 示例博客文章 3
- **`2015-08-14-blog-post-4.md`** - 示例博客文章 4
- **`2199-01-01-future-post.md`** - 未来发布的文章示例

#### `_publications/`
学术出版物目录：
- **`2022-10-20-jmca.md`** - JMCA 期刊论文
- **`2022-10-26-ees.md`** - EES 期刊论文
- **`2024-03-28-jacs.md`** - JACS 期刊论文
- **`2025-05-29-angew.md`** - Angewandte Chemie 期刊论文

#### `_talks/`
演讲和报告目录：
- **`2024-11-11-talk-aus.md`** - 澳大利亚演讲记录

#### `_teaching/`
教学经历目录：
- **`2014-spring-teaching-1.md`** - 2014年春季教学经历

#### `_portfolio/`
作品集项目目录：
- **`portfolio-1.md`** - 作品集项目 1
- **`portfolio-2.html`** - 作品集项目 2

#### `_drafts/`
草稿文章目录：
- **`post-draft.md`** - 草稿文章示例

### 样式和资源目录

#### `_sass/`
Sass 样式文件目录：

**主题样式：**
- **`_syntax.scss`** - 代码语法高亮样式
- **`_themes.scss`** - 主题样式定义

**布局样式：**
- **`layout/`** - 布局相关样式
  - `_base.scss` - 基础样式
  - `_reset.scss` - CSS 重置样式
  - `_page.scss` - 页面样式
  - `_sidebar.scss` - 侧边栏样式
  - `_masthead.scss` - 头部导航样式
  - `_navigation.scss` - 导航样式
  - `_footer.scss` - 底部样式
  - `_archive.scss` - 归档页面样式
  - `_buttons.scss` - 按钮样式
  - `_forms.scss` - 表单样式
  - `_notices.scss` - 通知样式
  - `_tables.scss` - 表格样式

**工具样式：**
- **`include/`** - 样式工具
  - `_mixins.scss` - Sass 混合器
  - `_utilities.scss` - 工具类样式

**主题变体：**
- **`theme/`** - 主题变体
  - `_default.scss` - 默认主题
  - `_dark.scss` - 深色主题

#### `assets/`
静态资源目录：

**样式文件：**
- **`css/`** - CSS 样式文件
  - `main.scss` - 主样式文件
  - `academicons.css` - 学术图标样式
  - `academicons.min.css` - 学术图标样式（压缩版）
  - `collapse.css` - 折叠组件样式
  - `cv-layout.css` - CV 布局样式
  - `cv-style.css` - CV 样式

**字体文件：**
- **`fonts/`** - 字体文件
  - `academicons.eot` - 学术图标字体（EOT 格式）
  - `academicons.svg` - 学术图标字体（SVG 格式）
  - `academicons.ttf` - 学术图标字体（TTF 格式）
  - `academicons.woff` - 学术图标字体（WOFF 格式）

**Web 字体：**
- **`webfonts/`** - Web 字体文件
  - `fa-brands-400.ttf` - Font Awesome 品牌图标（TTF）
  - `fa-brands-400.woff2` - Font Awesome 品牌图标（WOFF2）
  - `fa-regular-400.ttf` - Font Awesome 常规图标（TTF）
  - `fa-regular-400.woff2` - Font Awesome 常规图标（WOFF2）
  - `fa-solid-900.ttf` - Font Awesome 实心图标（TTF）
  - `fa-solid-900.woff2` - Font Awesome 实心图标（WOFF2）
  - `fa-v4compatibility.ttf` - Font Awesome v4 兼容字体（TTF）
  - `fa-v4compatibility.woff2` - Font Awesome v4 兼容字体（WOFF2）

**JavaScript 文件：**
- **`js/`** - JavaScript 脚本
  - `_main.js` - 主要 JavaScript 功能
  - `main.min.js` - 主要 JavaScript（压缩版）
  - `collapse.js` - 折叠功能脚本
  - `theme.js` - 主题切换脚本
  - `plugins/` - JavaScript 插件目录

### 媒体和文档目录

#### `images/`
图片资源目录：

**网站图标：**
- **`favicon.ico`** - 网站图标
- **`favicon.svg`** - SVG 格式网站图标
- **`favicon-32x32.png`** - 32x32 像素图标
- **`favicon-192x192.png`** - 192x192 像素图标
- **`favicon-512x512.png`** - 512x512 像素图标
- **`apple-touch-icon-180x180.png`** - Apple 触摸图标
- **`manifest.json`** - Web 应用清单

**个人照片：**
- **`bio-photo.jpg`** - 个人简介照片
- **`bio-photo-2.jpg`** - 个人简介照片 2
- **`profile.png`** - 个人资料照片

**网站素材：**
- **`site-logo.png`** - 网站 Logo
- **`homepage.png`** - 主页截图
- **`editing-talk.png`** - 编辑演讲截图

**示例图片：**
- **`500x300.png`** - 示例图片
- **`3953273590_704e3899d5_m.jpg`** - 示例照片
- **`foo-bar-identity.jpg`** - 示例身份图片
- **`foo-bar-identity-th.jpg`** - 示例身份缩略图

**布局示例：**
- **`image-alignment-150x150.jpg`** - 图片对齐示例（150x150）
- **`image-alignment-300x200.jpg`** - 图片对齐示例（300x200）
- **`image-alignment-580x300.jpg`** - 图片对齐示例（580x300）
- **`image-alignment-1200x4002.jpg`** - 图片对齐示例（1200x4002）

**文档示例：**
- **`paragraph-indent.png`** - 段落缩进示例
- **`paragraph-no-indent.png`** - 段落无缩进示例

**主题相关：**
- **`themes/`** - 主题相关图片目录

#### `files/`
文档文件目录：

**学术文档：**
- **`paper1.pdf`** - 学术论文 1
- **`paper2.pdf`** - 学术论文 2
- **`paper3.pdf`** - 学术论文 3
- **`bibtex1.bib`** - BibTeX 引用文件

**演讲材料：**
- **`slides1.pdf`** - 演讲幻灯片 1
- **`slides2.pdf`** - 演讲幻灯片 2
- **`slides3.pdf`** - 演讲幻灯片 3

### 开发和部署目录

#### `.devcontainer/`
开发容器配置：
- **`devcontainer.json`** - VS Code 开发容器配置

#### `.github/`
GitHub 相关配置：

**Issue 模板：**
- **`ISSUE_TEMPLATE/`** - Issue 模板目录
  - `bug_report.md` - Bug 报告模板
  - `feature_request.md` - 功能请求模板

**工作流：**
- **`workflows/`** - GitHub Actions 工作流
  - `scrape_talks.yml` - 演讲数据抓取工作流

#### `markdown_generator/`
Markdown 生成工具目录（具体内容未展开）

#### `scripts/`
脚本文件目录（具体内容未展开）

#### `talkmap/`
演讲地图相关文件目录（具体内容未展开）

## 文件功能总结

### 核心功能模块
1. **内容管理**：`_posts/`、`_publications/`、`_talks/`、`_teaching/`、`_portfolio/` 管理不同类型的内容
2. **模板系统**：`_layouts/` 和 `_includes/` 提供可重用的页面模板和组件
3. **样式系统**：`_sass/` 和 `assets/css/` 管理网站样式
4. **数据管理**：`_data/` 存储结构化数据
5. **静态资源**：`assets/`、`images/`、`files/` 管理媒体和文档资源

### 配置和部署
1. **Jekyll 配置**：`_config.yml` 主配置文件
2. **依赖管理**：`Gemfile`、`package.json` 管理项目依赖
3. **容器化**：`Dockerfile`、`docker-compose.yaml` 支持 Docker 部署
4. **版本控制**：`.gitignore` 配置 Git 忽略规则
5. **CI/CD**：`.github/workflows/` GitHub Actions 自动化

### 开发工具
1. **代码生成**：`markdown_generator/` 自动生成 Markdown 文件
2. **数据可视化**：`talkmap.ipynb`、`talkmap.py` 生成演讲地图
3. **开发环境**：`.devcontainer/` VS Code 开发容器配置

这个项目是一个功能完整的学术个人网站，支持博客、出版物展示、演讲记录、教学经历和作品集等多种内容类型，具有良好的可扩展性和维护性。