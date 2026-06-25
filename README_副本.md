# 钻井工具箱 · Drilling Toolkit

专业钻井参数计算与查询网页工具，涵盖管柱规格、强度校核、水力计算、钻头地层与井控装备等 **20 项功能**。纯静态单文件，本地双击或 GitHub Pages 均可使用。

## 本地使用

**直接双击打开** `index.html` 即可，无需安装、无需启动任何服务。

> 请确认打开的是 `drilling-toolkit/index.html` 完整单文件（约 **80 KB**）。  
> 若文件只有几 KB，说明是旧版或未打包成功，请在项目目录运行 `./build.sh` 重新生成。

修改源码后重新打包：

```bash
./build.sh
```

## 在线访问

部署后地址：`https://<你的用户名>.github.io/drilling-toolkit/`

## 功能分类

### 管柱与扣型
钻具扣型、套管规格、钻杆规格、钻铤规格、油管规格

### 强度与载荷
套管强度、钻杆强度、钢级强度、钢丝绳载荷

### 水力与泵送
喷嘴流面积、泥浆泵排量计算

### 钻头与地层
钻头 IADC 解码、岩石密度、测井曲线参考

### 井控与井口
BOP 防喷器、井口工具规格

### 工程辅助
钻井参数推荐、上扣扭矩、钻井液处理剂、单位换算

## 特性

- Apple 风格 UI：毛玻璃顶栏、大圆角卡片、实时计算
- 全局搜索（`⌘K` / `Ctrl+K`）
- 收藏与最近使用（本地存储）
- 深色模式
- 响应式布局，支持手机与平板

## 发布到 GitHub Pages

本项目为**单文件** `index.html`（CSS 与 JS 已全部内嵌），推送到 GitHub 即可使用，无需额外构建或启动服务。

### 1. 创建仓库并推送

```bash
cd drilling-toolkit
git init
git add index.html README.md LICENSE .nojekyll .gitignore
git commit -m "Initial release: drilling toolkit"
git branch -M main
git remote add origin https://github.com/<你的用户名>/drilling-toolkit.git
git push -u origin main
```

> 只需推送 `index.html` 即可上线。`js/` 和 `css/` 目录为开发用源文件，可选推送。

### 2. 开启 Pages

1. 打开仓库 **Settings → Pages**
2. **Branch** 选 `main`，**Folder** 选 **`/ (root)`**
3. 保存

访问：`https://<你的用户名>.github.io/drilling-toolkit/`

### 3. 配套工具

[钻井液计算器](https://iliunian1111.github.io/drilling-fluid-calculator/) — 助剂加量、混浆加重等 16 项专业计算（工具箱内「钻井液处理剂」页可一键跳转）

## License

MIT
