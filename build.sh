#!/bin/bash
# 将 css + js 打包为单文件 index.html（本地双击 / GitHub Pages 均可使用）
cd "$(dirname "$0")"
python3 << 'PYEOF'
from pathlib import Path

css = Path('css/styles.css').read_text(encoding='utf-8')
data = Path('js/data.js').read_text(encoding='utf-8')
calc = Path('js/calc.js').read_text(encoding='utf-8')
tools = Path('js/tools.js').read_text(encoding='utf-8')
app = Path('js/app.js').read_text(encoding='utf-8')

html = f'''<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="钻井工具箱 — 钻井、固井、完井增产、采油等专业工具与标准参数库，共 34 项">
  <meta name="theme-color" content="#0d9488">
  <title>钻井工具箱 · Drilling Toolkit</title>
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='22' fill='%230d9488'/><path d='M50 20v60M30 40h40M35 55h30' stroke='white' stroke-width='6' stroke-linecap='round' fill='none'/></svg>">
  <style>
{css}
  </style>
</head>
<body>
  <header>
    <div class="header-inner">
      <button class="header-back hidden" id="header-back" aria-label="返回">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
      <button class="icon-btn sidebar-toggle" id="sidebar-toggle" aria-label="打开导航">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
      </button>
      <a href="#home" class="logo">
        <div class="logo-mark">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M8 8h8M6 14h12"/></svg>
        </div>
        <span class="logo-text">钻井工具箱</span>
      </a>
      <span id="page-title"></span>
      <div class="header-actions">
        <button class="icon-btn" id="open-search" aria-label="搜索">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
        </button>
        <button class="icon-btn" id="nav-favorites" aria-label="收藏">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        </button>
        <button class="icon-btn" id="theme-toggle" aria-label="切换主题">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
        </button>
      </div>
    </div>
  </header>

  <div class="app-shell">
    <aside class="sidebar" id="app-sidebar" aria-label="工具导航"></aside>
    <div class="sidebar-backdrop" id="sidebar-backdrop" hidden></div>
    <div class="app-content">
      <main id="app-main"></main>
      <footer></footer>
    </div>
  </div>

  <script>
{data}
  </script>
  <script>
{calc}
  </script>
  <script>
{tools}
  </script>
  <script>
{app}
  </script>
</body>
</html>
'''

Path('index.html').write_text(html, encoding='utf-8')
print('✓ index.html 已生成 ({:,} 字节)'.format(len(html.encode('utf-8'))))
PYEOF
