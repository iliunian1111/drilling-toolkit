/* Drilling Toolkit — main application */
(function () {
'use strict';

if (!window.DT || !window.DTTools) {
  const main = document.getElementById('app-main');
  if (main) {
    main.innerHTML = '<div class="empty-state"><p>页面加载失败，请刷新重试</p></div>';
  }
  return;
}

const { CATEGORIES, DOMAINS, TOOLS, EXTERNAL_LINKS, WECHAT_PROMO, getTool, getCategory, getDomain, getToolsByCategory, getToolsByDomain, getToolDomain } = window.DT;
const { renderTool, getToolIcon } = window.DTTools;

const STORAGE_FAV = 'drilling-toolkit-favorites';
const STORAGE_RECENT = 'drilling-toolkit-recent';
const STORAGE_SIDEBAR = 'drilling-toolkit-sidebar-sections';

const DEFAULT_SIDEBAR_SECTIONS = {
  common: true,
  drilling: true,
  cementing: true,
  mud: true,
  completion: true,
  production: true,
};

const store = {
  get(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  },
  set(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* file:// 可能不可用 */ }
  },
  getStr(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  },
  setStr(key, value) {
    try { localStorage.setItem(key, value); } catch (e) { /* ignore */ }
  },
};

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

function getFavorites() {
  return store.get(STORAGE_FAV, []);
}

function setFavorites(favs) {
  store.set(STORAGE_FAV, favs);
}

function getRecent() {
  return store.get(STORAGE_RECENT, []);
}

function addRecent(id) {
  let r = getRecent().filter((x) => x !== id);
  r.unshift(id);
  r = r.slice(0, 6);
  store.set(STORAGE_RECENT, r);
  refreshSidebarCommon();
}

function parseRoute() {
  const hash = location.hash.slice(1) || 'home';
  const parts = hash.split('/');
  return { page: parts[0], param: parts[1] };
}

function navigate(page, param) {
  const hash = param ? `#${page}/${param}` : `#${page}`;
  if (location.hash !== hash) location.hash = hash;
}

let lastRouteKey = '';

function routeKey(route) {
  return `${route.page}|${route.param || ''}`;
}

function sidebarToolLink(tool, extraClass = '') {
  return `<a href="#tool/${tool.id}" class="sidebar-nav-link sidebar-tool-link ${extraClass}" data-tool-id="${tool.id}">
    <span class="sidebar-tool-dot" style="background:${tool.color}"></span>
    <span>${tool.name}</span>
  </a>`;
}

function getSidebarSectionsState() {
  return { ...DEFAULT_SIDEBAR_SECTIONS, ...store.get(STORAGE_SIDEBAR, {}) };
}

function saveSidebarSectionsState(state) {
  store.set(STORAGE_SIDEBAR, state);
}

function sidebarSection(id, title, bodyHtml, desc = '') {
  const state = getSidebarSectionsState();
  const expanded = state[id] !== false;
  return `<div class="sidebar-section${expanded ? '' : ' collapsed'}" data-section="${id}">
    <button type="button" class="sidebar-section-toggle" aria-expanded="${expanded}">
      <span class="sidebar-section-title">${title}</span>
      <svg class="sidebar-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
    </button>
    <div class="sidebar-section-body">
      ${desc ? `<p class="sidebar-section-desc">${desc}</p>` : ''}
      ${bodyHtml}
    </div>
  </div>`;
}

function expandSidebarSection(id) {
  const section = document.querySelector(`[data-section="${id}"]`);
  if (!section) return;
  section.classList.remove('collapsed');
  section.querySelector('.sidebar-section-toggle')?.setAttribute('aria-expanded', 'true');
  const state = getSidebarSectionsState();
  state[id] = true;
  saveSidebarSectionsState(state);
}

function renderSidebarCommon() {
  const favs = getFavorites().map(getTool).filter(Boolean);
  const recent = getRecent().map(getTool).filter(Boolean);
  const favIds = new Set(favs.map((t) => t.id));
  const recentOnly = recent.filter((t) => !favIds.has(t.id));

  let html = '';
  if (favs.length) {
    html += favs.map((t) => sidebarToolLink(t, 'sidebar-fav-link')).join('');
  }
  if (recentOnly.length) {
    html += recentOnly.map((t) => sidebarToolLink(t, 'sidebar-recent-link')).join('');
  }
  if (!html) {
    html = '<p class="sidebar-empty">打开工具后自动记录最近使用；点击星标可加入常用</p>';
  }
  return html;
}

function sidebarExternalLink(href, label) {
  return `<a href="${href}" class="sidebar-nav-link sidebar-external-link" target="_blank" rel="noopener">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
    <span>${label}</span>
  </a>`;
}

function renderSidebar() {
  const sidebar = $('#app-sidebar');
  if (!sidebar) return;

  const groupSections = DOMAINS.map((domain) => {
    const tools = getToolsByDomain(domain.id);
    const external =
      domain.id === 'cementing'
        ? sidebarExternalLink(EXTERNAL_LINKS.wellCementingCalculator, '固井计算器')
        : domain.id === 'mud'
          ? sidebarExternalLink(EXTERNAL_LINKS.drillingFluidCalculator, '钻井液计算器')
          : '';
    const body =
      `<div class="sidebar-tools">${tools.map((t) => sidebarToolLink(t)).join('')}${external}</div>`;
    return sidebarSection(domain.id, domain.name, body, domain.desc);
  }).join('');

  const commonBody = `<div class="sidebar-tools" id="sidebar-common">${renderSidebarCommon()}</div>`;

  sidebar.innerHTML = `<div class="sidebar-inner">
    <a href="#home" class="sidebar-nav-link sidebar-home-link" data-nav="home">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1V9.5z"/></svg>
      <span>首页</span>
    </a>
    ${sidebarSection('common', '常用', commonBody)}
    ${groupSections}
  </div>`;
}

function updateSidebarActive(route) {
  $$('.sidebar-nav-link').forEach((link) => link.classList.remove('active'));

  if (route.page === 'home' || !route.page) {
    $('.sidebar-home-link')?.classList.add('active');
    return;
  }
  if (route.page === 'favorites') {
    expandSidebarSection('common');
    $('.sidebar-fav-link')?.classList.add('active');
    return;
  }
  if (route.page === 'tool' && route.param) {
    const tool = getTool(route.param);
    const domain = getToolDomain(tool);
    if (domain) expandSidebarSection(domain.id);
    const favs = getFavorites();
    const recent = getRecent();
    if (favs.includes(route.param) || recent.includes(route.param)) {
      expandSidebarSection('common');
    }
    $(`.sidebar-tool-link[data-tool-id="${route.param}"]`)?.classList.add('active');
  }
}

function refreshSidebarCommon() {
  const el = $('#sidebar-common');
  if (el) el.innerHTML = renderSidebarCommon();
}

function closeSidebar() {
  document.body.classList.remove('sidebar-open');
  const backdrop = $('#sidebar-backdrop');
  if (backdrop) backdrop.hidden = true;
}

function openSidebar() {
  document.body.classList.add('sidebar-open');
  const backdrop = $('#sidebar-backdrop');
  if (backdrop) backdrop.hidden = false;
}

function toggleSidebar() {
  if (document.body.classList.contains('sidebar-open')) closeSidebar();
  else openSidebar();
}

function bindSidebarEvents() {
  $('#sidebar-toggle')?.addEventListener('click', toggleSidebar);
  $('#sidebar-backdrop')?.addEventListener('click', closeSidebar);
  $('#app-sidebar')?.addEventListener('click', (e) => {
    const toggle = e.target.closest('.sidebar-section-toggle');
    if (toggle) {
      e.preventDefault();
      const section = toggle.closest('.sidebar-section');
      const id = section?.dataset.section;
      if (!section || !id) return;
      section.classList.toggle('collapsed');
      const expanded = !section.classList.contains('collapsed');
      toggle.setAttribute('aria-expanded', expanded);
      const state = getSidebarSectionsState();
      state[id] = expanded;
      saveSidebarSectionsState(state);
      return;
    }
    const link = e.target.closest('a[href^="#"]');
    if (link && window.innerWidth <= 900) closeSidebar();
  });
}

function toolCard(tool, size = 'md') {
  const domain = getToolDomain(tool);
  return `<a href="#tool/${tool.id}" class="tool-card tool-card-${size}" data-id="${tool.id}">
    <div class="tool-card-icon" style="color:${tool.color};background:${tool.color}18">${getToolIcon(tool.id)}</div>
    <span class="tool-card-name">${tool.name}</span>
    ${size === 'lg' ? `<span class="tool-card-cat">${domain?.name || ''}</span>` : ''}
  </a>`;
}

function domainCard(domain) {
  const count = getToolsByDomain(domain.id).length;
  return `<a href="#domain/${domain.id}" class="category-card">
    <div class="category-card-icon" style="color:${domain.color};background:${domain.bg}">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/></svg>
    </div>
    <div class="category-card-text">
      <span class="category-card-name">${domain.name}</span>
      <span class="category-card-desc">${domain.desc}</span>
      <span class="category-card-count">${count} 项工具</span>
    </div>
    <svg class="category-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
  </a>`;
}

function renderWechatPromo(variant = 'hero') {
  const { image, account, tagline } = WECHAT_PROMO;
  if (variant === 'footer') {
    return `<div class="footer-promo">
      <img src="${image}" alt="微信公众号 ${account}" class="footer-promo-img" width="72" height="72" loading="lazy">
      <div class="footer-promo-text">
        <strong>微信搜索「${account}」</strong>
        <span>${tagline}</span>
      </div>
    </div>`;
  }
  return `<div class="hero-promo-card">
    <span class="hero-promo-label">关注我们</span>
    <img src="${image}" alt="微信公众号 ${account} 二维码" class="hero-promo-img" width="128" height="128" loading="lazy">
    <p class="hero-promo-title">微信搜索「${account}」</p>
    <p class="hero-promo-desc">${tagline}</p>
  </div>`;
}

function renderFooter() {
  const footer = document.querySelector('footer');
  if (!footer) return;
  footer.innerHTML = `
    ${renderWechatPromo('footer')}
    <p>钻井工具箱 · Drilling Toolkit &mdash; MIT License</p>
  `;
}

function renderHome() {
  const recent = getRecent().map(getTool).filter(Boolean);
  const favs = getFavorites().map(getTool).filter(Boolean);

  return `<section class="page-home">
    <div class="hero">
      <div class="hero-inner">
        <div class="hero-layout">
          <div class="hero-main">
            <span class="hero-badge">${TOOLS.length} 项专业工具</span>
            <h1>钻井工具箱</h1>
            <p>钻柱规格查询、强度校核、水力计算与井控装备参考 — 现场工程师的随身手册。左侧导航按施工业务分类，同类工具集中在一起。</p>
            <div class="hero-search-wrap">
              <input type="search" id="hero-search" class="hero-search" placeholder="搜索工具、规格、扣型…" autocomplete="off">
              <kbd class="search-kbd">⌘K</kbd>
            </div>
          </div>
          <aside class="hero-promo" aria-label="微信公众号">
            ${renderWechatPromo('hero')}
          </aside>
        </div>
      </div>
    </div>
    <div class="page-content">
      <section class="section">
        <h2 class="section-title">按业务浏览</h2>
        <div class="category-grid">
          ${DOMAINS.map((d) => domainCard(d)).join('')}
        </div>
      </section>
      <section class="section">
        <h2 class="section-title">业务速览</h2>
        <div class="nav-overview-grid">
          ${DOMAINS.map((d) => {
            const tools = getToolsByDomain(d.id);
            return `<div class="nav-overview-card">
              <h3>${d.name}</h3>
              <p>${d.desc}</p>
              <span class="nav-overview-count">${tools.length} 项</span>
              <div class="nav-overview-tools">
                ${tools.slice(0, 4).map((t) => `<a href="#tool/${t.id}">${t.name}</a>`).join('')}
                ${tools.length > 4 ? `<span>等 ${tools.length} 项</span>` : ''}
              </div>
            </div>`;
          }).join('')}
        </div>
      </section>
      ${recent.length ? `<section class="section">
        <h2 class="section-title">最近使用</h2>
        <div class="tool-grid tool-grid-sm">${recent.map((t) => toolCard(t, 'sm')).join('')}</div>
      </section>` : ''}
      ${favs.length ? `<section class="section">
        <h2 class="section-title">收藏</h2>
        <div class="tool-grid tool-grid-sm">${favs.map((t) => toolCard(t, 'sm')).join('')}</div>
      </section>` : ''}
    </div>
  </section>`;
}

function renderDomain(id) {
  const domain = getDomain(id);
  if (!domain) return renderHome();
  const tools = getToolsByDomain(id);
  const externalBanner =
    id === 'cementing'
      ? `<div class="external-link-banner">
          <p>配浆加重、套管伸长、水泥用量、扶正器间距等固井工程计算？</p>
          <a href="${EXTERNAL_LINKS.wellCementingCalculator}" class="btn btn-primary btn-sm" target="_blank" rel="noopener">固井计算器 →</a>
        </div>`
      : id === 'mud'
        ? `<div class="external-link-banner">
            <p>助剂加量、混浆加重等钻井液专业计算？</p>
            <a href="${EXTERNAL_LINKS.drillingFluidCalculator}" class="btn btn-primary btn-sm" target="_blank" rel="noopener">钻井液计算器 →</a>
          </div>`
        : '';
  return `<section class="page-category">
    <div class="page-header">
      <button class="back-btn" data-back><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg></button>
      <div>
        <h1>${domain.name}</h1>
        <p>${domain.desc}</p>
      </div>
    </div>
    <div class="page-content">
      <div class="tool-grid">${tools.map((t) => toolCard(t)).join('')}</div>
      ${externalBanner}
    </div>
  </section>`;
}

function renderCategory(id) {
  const cat = getCategory(id);
  if (!cat) return renderHome();
  const tools = getToolsByCategory(id);
  return `<section class="page-category">
    <div class="page-header">
      <button class="back-btn" data-back><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg></button>
      <div>
        <h1>${cat.name}</h1>
        <p>${cat.desc}</p>
      </div>
    </div>
    <div class="page-content">
      <div class="tool-grid">${tools.map((t) => toolCard(t)).join('')}</div>
    </div>
  </section>`;
}

function renderToolPage(id) {
  const tool = getTool(id);
  if (!tool) return renderHome();
  const domain = getToolDomain(tool);
  const favs = getFavorites();
  const isFav = favs.includes(id);
  addRecent(id);

  return `<section class="page-tool">
    <div class="page-header">
      <button class="back-btn" data-back><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg></button>
      <div class="tool-header-info">
        <div class="tool-header-icon" style="color:${tool.color};background:${tool.color}18">${getToolIcon(id)}</div>
        <div>
          <span class="tool-header-cat">${domain?.name || ''}</span>
          <h1>${tool.name}</h1>
        </div>
      </div>
      <button class="fav-btn ${isFav ? 'active' : ''}" data-fav="${id}" title="收藏">
        <svg viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
      </button>
    </div>
    <div class="page-content"><div id="tool-mount"></div></div>
  </section>`;
}

function renderFavorites() {
  const favs = getFavorites().map(getTool).filter(Boolean);
  return `<section class="page-category">
    <div class="page-header">
      <button class="back-btn" data-back><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg></button>
      <div><h1>收藏</h1><p>你收藏的常用工具</p></div>
    </div>
    <div class="page-content">
      ${favs.length
        ? `<div class="tool-grid">${favs.map((t) => toolCard(t)).join('')}</div>`
        : '<div class="empty-state"><p>还没有收藏任何工具</p><p class="empty-hint">打开工具后点击右上角星标即可收藏</p></div>'}
    </div>
  </section>`;
}

function renderSearchModal(query = '') {
  const q = query.toLowerCase();
  const results = q
    ? TOOLS.filter((t) =>
        t.name.toLowerCase().includes(q) ||
        t.keywords.some((k) => k.toLowerCase().includes(q))
      )
    : TOOLS;
  return `<div class="search-modal" id="search-modal">
    <div class="search-modal-backdrop" data-close-search></div>
    <div class="search-modal-panel">
      <div class="search-modal-input-wrap">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
        <input type="search" id="modal-search" value="${query}" placeholder="搜索工具…" autocomplete="off">
        <kbd>ESC</kbd>
      </div>
      <div class="search-results">
        ${results.length
          ? results.map((t) => {
              const domain = getToolDomain(t);
              return `<a href="#tool/${t.id}" class="search-result" data-close-search>
                <div class="search-result-icon" style="color:${t.color}">${getToolIcon(t.id)}</div>
                <div><strong>${t.name}</strong><span>${domain?.name || getCategory(t.category)?.name || ''}</span></div>
              </a>`;
            }).join('')
          : '<div class="empty-state"><p>未找到匹配工具</p></div>'}
      </div>
    </div>
  </div>`;
}

function updateHeader(route) {
  const title = $('#page-title');
  const backBtn = $('#header-back');
  if (!title) return;

  if (route.page === 'tool' && route.param) {
    const t = getTool(route.param);
    title.textContent = t?.name || '钻井工具箱';
    backBtn?.classList.remove('hidden');
  } else if (route.page === 'domain' && route.param) {
    const d = getDomain(route.param);
    title.textContent = d?.name || '钻井工具箱';
    backBtn?.classList.remove('hidden');
  } else if (route.page === 'cat' && route.param) {
    const c = getCategory(route.param);
    title.textContent = c?.name || '钻井工具箱';
    backBtn?.classList.remove('hidden');
  } else if (route.page === 'favorites') {
    title.textContent = '收藏';
    backBtn?.classList.remove('hidden');
  } else {
    title.textContent = '';
    backBtn?.classList.add('hidden');
  }
}

function bindEvents() {
  $$('[data-back]').forEach((btn) => {
    btn.addEventListener('click', () => history.back());
  });

  const favBtn = $('.fav-btn');
  if (favBtn) {
    favBtn.addEventListener('click', () => {
      const id = favBtn.dataset.fav;
      let favs = getFavorites();
      if (favs.includes(id)) {
        favs = favs.filter((x) => x !== id);
        favBtn.classList.remove('active');
        favBtn.querySelector('svg').setAttribute('fill', 'none');
      } else {
        favs.push(id);
        favBtn.classList.add('active');
        favBtn.querySelector('svg').setAttribute('fill', 'currentColor');
      }
      setFavorites(favs);
      refreshSidebarCommon();
    });
  }

  const heroSearch = $('#hero-search');
  if (heroSearch) {
    heroSearch.addEventListener('focus', () => openSearch(heroSearch.value));
    heroSearch.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') openSearch(heroSearch.value);
    });
  }
}

function openSearch(query = '') {
  const existing = $('#search-modal');
  if (existing) existing.remove();
  document.body.insertAdjacentHTML('beforeend', renderSearchModal(query));
  const input = $('#modal-search');
  input?.focus();
  input?.select();

  const updateResults = () => {
    const modal = $('#search-modal');
    if (!modal) return;
    modal.outerHTML = renderSearchModal(input.value);
    bindSearchModal();
    $('#modal-search')?.focus();
  };

  $('#modal-search')?.addEventListener('input', updateResults);
  bindSearchModal();
}

function bindSearchModal() {
  $$('[data-close-search]').forEach((el) => {
    el.addEventListener('click', () => {
      $('#search-modal')?.remove();
    });
  });
}

function render() {
  const route = parseRoute();
  const key = routeKey(route);
  if (key === lastRouteKey) return;
  lastRouteKey = key;

  const main = $('#app-main');
  if (!main) return;

  updateHeader(route);
  updateSidebarActive(route);

  let html = '';
  switch (route.page) {
    case 'domain':
      html = renderDomain(route.param);
      break;
    case 'cat':
      html = renderCategory(route.param);
      break;
    case 'tool':
      html = renderToolPage(route.param);
      break;
    case 'favorites':
      html = renderFavorites();
      break;
    default:
      html = renderHome();
  }

  main.innerHTML = html;
  bindEvents();

  if (route.page === 'tool' && route.param) {
    const mount = $('#tool-mount');
    if (mount) renderTool(route.param, mount);
  }

  document.title = route.page === 'tool' && getTool(route.param)
    ? `${getTool(route.param).name} · 钻井工具箱`
    : '钻井工具箱 · Drilling Toolkit';
}

function initTheme() {
  const saved = store.getStr('drilling-toolkit-theme');
  if (saved) document.documentElement.setAttribute('data-theme', saved);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  store.setStr('drilling-toolkit-theme', next);
}

function boot() {
  try {
    if (!window.DT || !window.DTTools) {
      throw new Error('数据模块未加载');
    }
    initTheme();
    renderFooter();
    renderSidebar();
    bindSidebarEvents();

    $('#theme-toggle')?.addEventListener('click', toggleTheme);
    $('#nav-favorites')?.addEventListener('click', (e) => {
      e.preventDefault();
      navigate('favorites');
    });
    $('#header-back')?.addEventListener('click', () => history.back());
    $('#open-search')?.addEventListener('click', () => openSearch());

    window.addEventListener('hashchange', render);

    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        openSearch();
      }
      if (e.key === 'Escape') $('#search-modal')?.remove();
    });

    if (!location.hash || location.hash === '#') {
      location.hash = '#home';
    } else {
      render();
    }
  } catch (err) {
    console.error(err);
    const main = document.getElementById('app-main');
    if (main) {
      main.innerHTML = '<div class="empty-state"><p>页面加载失败</p><p class="empty-hint">' + err.message + '</p></div>';
    }
  }
}

boot();
})();
