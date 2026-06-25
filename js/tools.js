/* Drilling Toolkit — tool UI renderers */
(function () {
'use strict';

if (!window.DT || !window.DTCalc) return;

const {
  THREAD_TYPES, THREAD_FAMILIES, CASING_SPECS, DRILLPIPE_SPECS, COLLAR_SPECS, TUBING_SPECS,
  STEEL_GRADES, BOP_SPECS, WELLHEAD_SPECS, ROCK_DENSITIES,
  WELL_LOG_CURVES, WELL_LOG_LITHOLOGY, WELL_LOG_FLUID_RULES,
  MUD_ADDITIVES, MUD_ADDITIVE_CATEGORIES, IADC_BITS,
  CEMENT_GRADES, CEMENT_SULFATE_LEGEND, CEMENT_ADDITIVE_CATEGORIES, CEMENT_ADDITIVES,
  CEMENT_SLURRY_PROPERTIES, CEMENT_TEST_ITEMS, CENTRALIZER_SPECS,
  PERFORATION_SPECS, SCREEN_SPECS, ACIDIZING_CATEGORIES, ACIDIZING_FORMULAS,
  PUMPING_UNIT_SPECS, DOWNHOLE_PUMP_SPECS, SUCKER_ROD_SPECS, CHOKE_COEFFICIENTS,
  ESP_PUMP_SPECS, API_GRAVITY_REF,
  DRILLING_PARAMS_BY_HOLE, DRILLING_PARAM_ADJUSTMENTS, DRILLING_HYDRAULICS_CRITERIA, DRILLING_PARAMS_DISCLAIMER,
  UNIT_CATEGORIES, EXTERNAL_LINKS,
} = window.DT;
const {
  nozzleTFA, mudPumpDisplacement, casingBurst, casingCollapse,
  casingTension, drillpipeTorsion, drillpipeTension, wireRopeLoad, makeupTorque,
  convertUnit, decodeIADC, pipeArea, fromApiGravity, apiFromGravity,
} = window.DTCalc;

function esc(s) {
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}

function field(label, id, unit, type = 'number', step = 'any', value = '') {
  return `<div class="field">
    <label for="${id}">${label}</label>
    <div class="field-input-row">
      <input type="${type}" id="${id}" step="${step}" value="${value}" placeholder="—">
      ${unit ? `<span class="unit">${unit}</span>` : ''}
    </div>
  </div>`;
}

function selectField(label, id, options) {
  const opts = options.map((o) => `<option value="${o.v}">${esc(o.l)}</option>`).join('');
  return `<div class="field field-full">
    <label for="${id}">${label}</label>
    <select id="${id}" class="select-input">${opts}</select>
  </div>`;
}

function resultHighlight(label, value, unit) {
  return `<div class="res-highlight">
    <div class="res-label">${label}</div>
    <div class="res-val">${value}<span class="res-unit">${unit}</span></div>
  </div>`;
}

function resultRows(rows) {
  return `<div class="res-list">${rows.map(([l, v]) =>
    `<div class="res-row"><span class="res-row-label">${l}</span><span class="res-row-val">${v}</span></div>`
  ).join('')}</div>`;
}

function queryTable(headers, rows, filterId) {
  return `<div class="query-toolbar">
    <input type="search" id="${filterId}" class="search-input" placeholder="搜索…">
  </div>
  <div class="table-wrap">
    <table class="data-table" id="${filterId}-table">
      <thead><tr>${headers.map((h) => `<th>${h}</th>`).join('')}</tr></thead>
      <tbody>${rows}</tbody>
    </table>
  </div>`;
}

function bindTableFilter(filterId, extraFilter) {
  const input = document.getElementById(filterId);
  const table = document.getElementById(`${filterId}-table`);
  if (!input || !table) return;
  const apply = () => {
    const q = input.value.toLowerCase();
    table.querySelectorAll('tbody tr').forEach((tr) => {
      const matchQ = !q || tr.textContent.toLowerCase().includes(q);
      const matchExtra = !extraFilter || extraFilter(tr);
      tr.style.display = matchQ && matchExtra ? '' : 'none';
    });
  };
  input.addEventListener('input', apply);
  return apply;
}

function calcLayout(title, desc, formula, fieldsHtml, resultId) {
  return `<div class="tool-layout calc-layout">
    <div class="panel">
      <div class="panel-head">
        <h2>${title}</h2>
        <p>${desc}</p>
        ${formula ? `<span class="formula-chip">${formula}</span>` : ''}
      </div>
      <div class="panel-body"><div class="form-grid">${fieldsHtml}</div></div>
    </div>
    <div class="panel results-panel">
      <div class="panel-head"><h2>计算结果</h2><p>输入参数后自动更新</p></div>
      <div id="${resultId}" class="results-body visible">
        <div class="results-empty"><p>请输入参数</p></div>
      </div>
    </div>
  </div>`;
}

const RENDERERS = {
  'thread-type'(el) {
    const familyColors = { 'NC / IF': '#16a34a', FH: '#2563eb', REG: '#ea580c' };
    const familyPills = THREAD_FAMILIES.map((f, i) =>
      `<button type="button" class="cat-pill${i === 0 ? ' active' : ''}" data-family="${esc(f)}">${esc(f)}</button>`
    ).join('');

    const cards = THREAD_TYPES.map((r) => {
      const color = familyColors[r.family] || '#64748b';
      const searchText = [r.name, r.family, r.code, r.sizeKey, r.use, r.desc, r.pipeRange].join(' ');
      return `<article class="thread-card" data-family="${esc(r.family)}" data-size="${esc(r.sizeKey)}" data-search="${esc(searchText)}">
        <div class="thread-card-head">
          <h3 class="thread-name">${esc(r.name)}</h3>
          <span class="thread-family-tag" style="color:${color};background:${color}18">${esc(r.family)}</span>
        </div>
        <div class="thread-code">代号 <strong>${esc(r.code)}</strong></div>
        <div class="thread-specs">
          <div class="thread-spec"><span>牙型</span><strong>${esc(r.threadForm)}</strong></div>
          <div class="thread-spec"><span>每英寸扣数</span><strong>${esc(r.tpi)}</strong></div>
          <div class="thread-spec"><span>锥度</span><strong>${esc(r.taper)}</strong></div>
          <div class="thread-spec"><span>公扣小头径</span><strong>${esc(r.pinOd)}</strong></div>
          <div class="thread-spec"><span>母扣台肩内径</span><strong>${esc(r.boxId)}</strong></div>
          <div class="thread-spec"><span>适用管径</span><strong>${esc(r.pipeRange)}</strong></div>
        </div>
        <div class="thread-use-box">
          <strong>${esc(r.use)}</strong>
          <p>${esc(r.desc)}</p>
        </div>
      </article>`;
    }).join('');

    const sizePillsHtml = THREAD_FAMILIES.filter((f) => f !== '全部').map((fam) => {
      const sizes = [...new Set(THREAD_TYPES.filter((t) => t.family === fam).map((t) => t.sizeKey))];
      const allBtn = `<button type="button" class="cat-pill thread-size-pill" data-family="${esc(fam)}" data-size="全部" hidden>全部</button>`;
      const sizeBtns = sizes.map((s) =>
        `<button type="button" class="cat-pill thread-size-pill" data-family="${esc(fam)}" data-size="${esc(s)}" hidden>${esc(s)}</button>`
      ).join('');
      return allBtn + sizeBtns;
    }).join('');

    el.innerHTML = `<div class="tool-layout single">
      <div class="panel">
        <div class="panel-head">
          <h2>钻具扣型查询</h2>
          <p>API 标准钻具螺纹扣型参数库，共 ${THREAD_TYPES.length} 条。含 NC/IF、FH、REG 三大类。</p>
        </div>
        <div class="panel-body">
          <div class="query-toolbar">
            <input type="search" id="thread-filter" class="search-input" placeholder="搜索扣型名称、接头代号、管径…">
          </div>
          <div class="filter-label">按系列筛选</div>
          <div class="cat-pills" id="thread-family-pills">${familyPills}</div>
          <div class="filter-label" id="thread-size-label" style="display:none">按尺寸筛选</div>
          <div class="cat-pills" id="thread-size-pills" style="display:none">${sizePillsHtml}</div>
          <p class="additive-count" id="thread-count">共 ${THREAD_TYPES.length} 条结果</p>
          <div class="thread-grid" id="thread-cards">${cards}</div>
        </div>
      </div>
    </div>`;

    let activeFamily = '全部';
    let activeSize = '全部';
    const searchInput = document.getElementById('thread-filter');
    const sizePillsEl = document.getElementById('thread-size-pills');
    const sizeLabelEl = document.getElementById('thread-size-label');

    function updateSizePills() {
      const showBar = activeFamily !== '全部';
      sizePillsEl.style.display = showBar ? '' : 'none';
      sizeLabelEl.style.display = showBar ? '' : 'none';
      activeSize = '全部';
      if (!showBar) return;
      sizePillsEl.querySelectorAll('.thread-size-pill').forEach((btn) => {
        const match = btn.dataset.family === activeFamily;
        btn.hidden = !match;
        btn.classList.toggle('active', match && btn.dataset.size === '全部');
      });
    }

    function applyFilter() {
      const q = (searchInput?.value || '').toLowerCase();
      let shown = 0;
      document.querySelectorAll('.thread-card').forEach((card) => {
        const matchFam = activeFamily === '全部' || card.dataset.family === activeFamily;
        const matchSize = activeSize === '全部' || card.dataset.size === activeSize;
        const matchQ = !q || card.dataset.search.toLowerCase().includes(q);
        const visible = matchFam && matchSize && matchQ;
        card.style.display = visible ? '' : 'none';
        if (visible) shown++;
      });
      const countEl = document.getElementById('thread-count');
      if (countEl) countEl.textContent = `共 ${shown} 条结果`;
    }

    searchInput?.addEventListener('input', applyFilter);
    document.getElementById('thread-family-pills')?.addEventListener('click', (e) => {
      const btn = e.target.closest('.cat-pill');
      if (!btn) return;
      e.preventDefault();
      activeFamily = btn.dataset.family;
      document.querySelectorAll('#thread-family-pills .cat-pill').forEach((p) => p.classList.toggle('active', p === btn));
      updateSizePills();
      applyFilter();
    });
    sizePillsEl?.addEventListener('click', (e) => {
      const btn = e.target.closest('.thread-size-pill');
      if (!btn || btn.hidden) return;
      e.preventDefault();
      activeSize = btn.dataset.size;
      sizePillsEl.querySelectorAll('.thread-size-pill').forEach((p) => {
        if (p.dataset.family === activeFamily) p.classList.toggle('active', p === btn);
      });
      applyFilter();
    });
  },

  'casing-spec'(el) {
    const ods = [...new Set(CASING_SPECS.map((r) => r.od))];
    const grades = [...new Set(CASING_SPECS.map((r) => r.grade))].sort();
    const odPills =
      `<button type="button" class="cat-pill active" data-od="全部">全部</button>` +
      ods.map((od) => `<button type="button" class="cat-pill" data-od="${esc(od)}">${od}"</button>`).join('');
    const gradePills =
      `<button type="button" class="cat-pill casing-grade-pill active" data-grade="全部">全部</button>` +
      grades.map((g) => `<button type="button" class="cat-pill casing-grade-pill" data-grade="${esc(g)}">${esc(g)}</button>`).join('');
    const rows = CASING_SPECS.map((r) =>
      `<tr data-od="${esc(r.od)}" data-grade="${esc(r.grade)}"><td><strong>${r.od}"</strong></td><td>${r.odMm}</td><td>${r.weight}</td><td>${r.grade}</td><td>${r.wall}</td><td>${r.id}</td><td>${r.drift}</td></tr>`
    ).join('');
    el.innerHTML = `<div class="tool-layout single">
      <div class="panel">
        <div class="panel-head">
          <h2>套管规格</h2>
          <p>API 5CT 套管尺寸参数库，共 ${CASING_SPECS.length} 条、${ods.length} 种外径。单位：in / mm / lb/ft。</p>
        </div>
        <div class="panel-body">
          <div class="query-toolbar">
            <input type="search" id="casing-filter" class="search-input" placeholder="搜索外径、钢级、重量…">
          </div>
          <div class="filter-label">按外径筛选</div>
          <div class="cat-pills" id="casing-od-pills">${odPills}</div>
          <div class="filter-label">按钢级筛选</div>
          <div class="cat-pills" id="casing-grade-pills">${gradePills}</div>
          <p class="additive-count" id="casing-count">共 ${CASING_SPECS.length} 条结果</p>
          <div class="table-wrap">
            <table class="data-table" id="casing-filter-table">
              <thead><tr><th>外径</th><th>OD mm</th><th>重量 lb/ft</th><th>钢级</th><th>壁厚 mm</th><th>内径 mm</th><th>通径 mm</th></tr></thead>
              <tbody>${rows}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>`;

    let activeOd = '全部';
    let activeGrade = '全部';
    const table = document.getElementById('casing-filter-table');
    const countEl = document.getElementById('casing-count');

    function applyFilter() {
      const q = (document.getElementById('casing-filter')?.value || '').toLowerCase();
      let shown = 0;
      table?.querySelectorAll('tbody tr').forEach((tr) => {
        const matchOd = activeOd === '全部' || tr.dataset.od === activeOd;
        const matchGrade = activeGrade === '全部' || tr.dataset.grade === activeGrade;
        const matchQ = !q || tr.textContent.toLowerCase().includes(q);
        const visible = matchOd && matchGrade && matchQ;
        tr.style.display = visible ? '' : 'none';
        if (visible) shown++;
      });
      if (countEl) countEl.textContent = `共 ${shown} 条结果`;
    }

    document.getElementById('casing-filter')?.addEventListener('input', applyFilter);
    document.getElementById('casing-od-pills')?.addEventListener('click', (e) => {
      const btn = e.target.closest('.cat-pill');
      if (!btn) return;
      e.preventDefault();
      activeOd = btn.dataset.od;
      document.querySelectorAll('#casing-od-pills .cat-pill').forEach((p) => p.classList.toggle('active', p === btn));
      applyFilter();
    });
    document.getElementById('casing-grade-pills')?.addEventListener('click', (e) => {
      const btn = e.target.closest('.casing-grade-pill');
      if (!btn) return;
      e.preventDefault();
      activeGrade = btn.dataset.grade;
      document.querySelectorAll('#casing-grade-pills .casing-grade-pill').forEach((p) => p.classList.toggle('active', p === btn));
      applyFilter();
    });
  },

  'drillpipe-spec'(el) {
    const ods = [...new Set(DRILLPIPE_SPECS.map((r) => r.od))];
    const grades = ['E75', 'X95', 'G105', 'S135', 'V150'].filter((g) => DRILLPIPE_SPECS.some((r) => r.grade === g));
    const odPills =
      `<button type="button" class="cat-pill active" data-od="全部">全部</button>` +
      ods.map((od) => `<button type="button" class="cat-pill" data-od="${esc(od)}">${od}"</button>`).join('');
    const gradePills =
      `<button type="button" class="cat-pill dp-grade-pill active" data-grade="全部">全部</button>` +
      grades.map((g) => `<button type="button" class="cat-pill dp-grade-pill" data-grade="${esc(g)}">${esc(g)}</button>`).join('');
    const rows = DRILLPIPE_SPECS.map((r) =>
      `<tr data-od="${esc(r.od)}" data-grade="${esc(r.grade)}"><td><strong>${r.od}"</strong></td><td>${r.odMm}</td><td>${r.weight}</td><td>${r.grade}</td><td>${r.wall}</td><td>${r.id}</td><td>${r.toolJoint}</td><td>${r.yield}</td></tr>`
    ).join('');
    el.innerHTML = `<div class="tool-layout single">
      <div class="panel">
        <div class="panel-head">
          <h2>钻杆规格</h2>
          <p>API 5DP 钻杆尺寸参数库，共 ${DRILLPIPE_SPECS.length} 条、${ods.length} 种外径。单位：in / mm / lb/ft。</p>
        </div>
        <div class="panel-body">
          <div class="query-toolbar">
            <input type="search" id="dp-filter" class="search-input" placeholder="搜索外径、钢级、扣型、重量…">
          </div>
          <div class="filter-label">按外径筛选</div>
          <div class="cat-pills" id="dp-od-pills">${odPills}</div>
          <div class="filter-label">按钢级筛选</div>
          <div class="cat-pills" id="dp-grade-pills">${gradePills}</div>
          <p class="additive-count" id="dp-count">共 ${DRILLPIPE_SPECS.length} 条结果</p>
          <div class="table-wrap">
            <table class="data-table" id="dp-filter-table">
              <thead><tr><th>外径</th><th>OD mm</th><th>重量 lb/ft</th><th>钢级</th><th>壁厚 mm</th><th>内径 mm</th><th>扣型</th><th>屈服 MPa</th></tr></thead>
              <tbody>${rows}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>`;

    let activeOd = '全部';
    let activeGrade = '全部';
    const table = document.getElementById('dp-filter-table');
    const countEl = document.getElementById('dp-count');

    function applyFilter() {
      const q = (document.getElementById('dp-filter')?.value || '').toLowerCase();
      let shown = 0;
      table?.querySelectorAll('tbody tr').forEach((tr) => {
        const matchOd = activeOd === '全部' || tr.dataset.od === activeOd;
        const matchGrade = activeGrade === '全部' || tr.dataset.grade === activeGrade;
        const matchQ = !q || tr.textContent.toLowerCase().includes(q);
        const visible = matchOd && matchGrade && matchQ;
        tr.style.display = visible ? '' : 'none';
        if (visible) shown++;
      });
      if (countEl) countEl.textContent = `共 ${shown} 条结果`;
    }

    document.getElementById('dp-filter')?.addEventListener('input', applyFilter);
    document.getElementById('dp-od-pills')?.addEventListener('click', (e) => {
      const btn = e.target.closest('.cat-pill');
      if (!btn) return;
      e.preventDefault();
      activeOd = btn.dataset.od;
      document.querySelectorAll('#dp-od-pills .cat-pill').forEach((p) => p.classList.toggle('active', p === btn));
      applyFilter();
    });
    document.getElementById('dp-grade-pills')?.addEventListener('click', (e) => {
      const btn = e.target.closest('.dp-grade-pill');
      if (!btn) return;
      e.preventDefault();
      activeGrade = btn.dataset.grade;
      document.querySelectorAll('#dp-grade-pills .dp-grade-pill').forEach((p) => p.classList.toggle('active', p === btn));
      applyFilter();
    });
  },

  'collar-spec'(el) {
    const ods = [...new Set(COLLAR_SPECS.map((r) => r.od))];
    const types = [...new Set(COLLAR_SPECS.map((r) => r.type))];
    const odPills =
      `<button type="button" class="cat-pill active" data-od="全部">全部</button>` +
      ods.map((od) => `<button type="button" class="cat-pill" data-od="${esc(od)}">${od}"</button>`).join('');
    const typePills =
      `<button type="button" class="cat-pill dc-type-pill active" data-type="全部">全部</button>` +
      types.map((t) => `<button type="button" class="cat-pill dc-type-pill" data-type="${esc(t)}">${esc(t)}</button>`).join('');
    const rows = COLLAR_SPECS.map((r) =>
      `<tr data-od="${esc(r.od)}" data-type="${esc(r.type)}"><td><strong>${r.od}"</strong></td><td>${r.odMm}</td><td>${r.id}"</td><td>${r.idMm}</td><td>${r.weight}</td><td>${esc(r.thread)}</td><td>${r.type}</td><td>${r.length}</td></tr>`
    ).join('');
    el.innerHTML = `<div class="tool-layout single">
      <div class="panel">
        <div class="panel-head">
          <h2>钻铤规格</h2>
          <p>API 7-1 钻铤尺寸参数库，共 ${COLLAR_SPECS.length} 条、${ods.length} 种外径。单位：in / mm / lb/ft。</p>
        </div>
        <div class="panel-body">
          <div class="query-toolbar">
            <input type="search" id="dc-filter" class="search-input" placeholder="搜索外径、内径、扣型、类型…">
          </div>
          <div class="filter-label">按外径筛选</div>
          <div class="cat-pills" id="dc-od-pills">${odPills}</div>
          <div class="filter-label">按类型筛选</div>
          <div class="cat-pills" id="dc-type-pills">${typePills}</div>
          <p class="additive-count" id="dc-count">共 ${COLLAR_SPECS.length} 条结果</p>
          <div class="table-wrap">
            <table class="data-table" id="dc-filter-table">
              <thead><tr><th>外径</th><th>OD mm</th><th>内径</th><th>ID mm</th><th>重量 lb/ft</th><th>扣型</th><th>类型</th><th>长度 m</th></tr></thead>
              <tbody>${rows}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>`;

    let activeOd = '全部';
    let activeType = '全部';
    const table = document.getElementById('dc-filter-table');
    const countEl = document.getElementById('dc-count');

    function applyFilter() {
      const q = (document.getElementById('dc-filter')?.value || '').toLowerCase();
      let shown = 0;
      table?.querySelectorAll('tbody tr').forEach((tr) => {
        const matchOd = activeOd === '全部' || tr.dataset.od === activeOd;
        const matchType = activeType === '全部' || tr.dataset.type === activeType;
        const matchQ = !q || tr.textContent.toLowerCase().includes(q);
        const visible = matchOd && matchType && matchQ;
        tr.style.display = visible ? '' : 'none';
        if (visible) shown++;
      });
      if (countEl) countEl.textContent = `共 ${shown} 条结果`;
    }

    document.getElementById('dc-filter')?.addEventListener('input', applyFilter);
    document.getElementById('dc-od-pills')?.addEventListener('click', (e) => {
      const btn = e.target.closest('.cat-pill');
      if (!btn) return;
      e.preventDefault();
      activeOd = btn.dataset.od;
      document.querySelectorAll('#dc-od-pills .cat-pill').forEach((p) => p.classList.toggle('active', p === btn));
      applyFilter();
    });
    document.getElementById('dc-type-pills')?.addEventListener('click', (e) => {
      const btn = e.target.closest('.dc-type-pill');
      if (!btn) return;
      e.preventDefault();
      activeType = btn.dataset.type;
      document.querySelectorAll('#dc-type-pills .dc-type-pill').forEach((p) => p.classList.toggle('active', p === btn));
      applyFilter();
    });
  },

  'tubing-spec'(el) {
    const ods = [...new Set(TUBING_SPECS.map((r) => r.od))];
    const grades = ['J55', 'K55', 'N80', 'L80', 'P110', 'Q125'].filter((g) => TUBING_SPECS.some((r) => r.grade === g));
    const odPills =
      `<button type="button" class="cat-pill active" data-od="全部">全部</button>` +
      ods.map((od) => `<button type="button" class="cat-pill" data-od="${esc(od)}">${od}"</button>`).join('');
    const gradePills =
      `<button type="button" class="cat-pill tubing-grade-pill active" data-grade="全部">全部</button>` +
      grades.map((g) => `<button type="button" class="cat-pill tubing-grade-pill" data-grade="${esc(g)}">${esc(g)}</button>`).join('');
    const rows = TUBING_SPECS.map((r) =>
      `<tr data-od="${esc(r.od)}" data-grade="${esc(r.grade)}"><td><strong>${r.od}"</strong></td><td>${r.odMm}</td><td>${r.weight}</td><td>${r.grade}</td><td>${r.wall}</td><td>${r.id}</td></tr>`
    ).join('');
    el.innerHTML = `<div class="tool-layout single">
      <div class="panel">
        <div class="panel-head">
          <h2>油管规格</h2>
          <p>API 5CT 油管尺寸参数库，共 ${TUBING_SPECS.length} 条、${ods.length} 种外径。单位：in / mm / lb/ft。</p>
        </div>
        <div class="panel-body">
          <div class="query-toolbar">
            <input type="search" id="tubing-filter" class="search-input" placeholder="搜索外径、钢级、重量…">
          </div>
          <div class="filter-label">按外径筛选</div>
          <div class="cat-pills" id="tubing-od-pills">${odPills}</div>
          <div class="filter-label">按钢级筛选</div>
          <div class="cat-pills" id="tubing-grade-pills">${gradePills}</div>
          <p class="additive-count" id="tubing-count">共 ${TUBING_SPECS.length} 条结果</p>
          <div class="table-wrap">
            <table class="data-table" id="tubing-filter-table">
              <thead><tr><th>外径</th><th>OD mm</th><th>重量 lb/ft</th><th>钢级</th><th>壁厚 mm</th><th>内径 mm</th></tr></thead>
              <tbody>${rows}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>`;

    let activeOd = '全部';
    let activeGrade = '全部';
    const table = document.getElementById('tubing-filter-table');
    const countEl = document.getElementById('tubing-count');

    function applyFilter() {
      const q = (document.getElementById('tubing-filter')?.value || '').toLowerCase();
      let shown = 0;
      table?.querySelectorAll('tbody tr').forEach((tr) => {
        const matchOd = activeOd === '全部' || tr.dataset.od === activeOd;
        const matchGrade = activeGrade === '全部' || tr.dataset.grade === activeGrade;
        const matchQ = !q || tr.textContent.toLowerCase().includes(q);
        const visible = matchOd && matchGrade && matchQ;
        tr.style.display = visible ? '' : 'none';
        if (visible) shown++;
      });
      if (countEl) countEl.textContent = `共 ${shown} 条结果`;
    }

    document.getElementById('tubing-filter')?.addEventListener('input', applyFilter);
    document.getElementById('tubing-od-pills')?.addEventListener('click', (e) => {
      const btn = e.target.closest('.cat-pill');
      if (!btn) return;
      e.preventDefault();
      activeOd = btn.dataset.od;
      document.querySelectorAll('#tubing-od-pills .cat-pill').forEach((p) => p.classList.toggle('active', p === btn));
      applyFilter();
    });
    document.getElementById('tubing-grade-pills')?.addEventListener('click', (e) => {
      const btn = e.target.closest('.tubing-grade-pill');
      if (!btn) return;
      e.preventDefault();
      activeGrade = btn.dataset.grade;
      document.querySelectorAll('#tubing-grade-pills .tubing-grade-pill').forEach((p) => p.classList.toggle('active', p === btn));
      applyFilter();
    });
  },

  'steel-grade'(el) {
    const rows = STEEL_GRADES.map((r) =>
      `<tr><td><span class="grade-badge" style="background:${r.color}20;color:${r.color}">${r.grade}</span></td><td>${r.yield}</td><td>${r.tensile}</td><td>${r.min} ksi</td></tr>`
    ).join('');
    el.innerHTML = `<div class="tool-layout single">
      <div class="panel">
        <div class="panel-head"><h2>钢级强度</h2><p>API 套管/油管钢级最小屈服与抗拉强度（MPa）</p></div>
        <div class="panel-body">${queryTable(['钢级', '屈服 MPa', '抗拉 MPa', '等级'], rows, 'steel-filter')}</div>
      </div>
    </div>`;
    bindTableFilter('steel-filter');
  },

  'bop'(el) {
    const rows = BOP_SPECS.map((r) =>
      `<tr><td><strong>${esc(r.model)}</strong></td><td>${esc(r.type)}</td><td>${r.bore}</td><td>${r.pressure}</td><td>${esc(r.flange)}</td><td>${r.height}</td></tr>`
    ).join('');
    el.innerHTML = `<div class="tool-layout single">
      <div class="panel">
        <div class="panel-head"><h2>BOP 防喷器</h2><p>常用防喷器型号与工作压力</p></div>
        <div class="panel-body">${queryTable(['型号', '类型', '通径 mm', '压力 MPa', '法兰', '高度 mm'], rows, 'bop-filter')}</div>
      </div>
    </div>`;
    bindTableFilter('bop-filter');
  },

  'wellhead'(el) {
    const rows = WELLHEAD_SPECS.map((r) =>
      `<tr><td><strong>${esc(r.name)}</strong></td><td>${esc(r.rating)}</td><td>${esc(String(r.bore))}</td><td>${esc(r.flange)}</td></tr>`
    ).join('');
    el.innerHTML = `<div class="tool-layout single">
      <div class="panel">
        <div class="panel-head"><h2>井口工具</h2><p>套管头、油管头与法兰规格</p></div>
        <div class="panel-body">${queryTable(['名称', '额定压力', '通径 mm', '标准'], rows, 'wh-filter')}</div>
      </div>
    </div>`;
    bindTableFilter('wh-filter');
  },

  'casing-strength'(el) {
    el.innerHTML = calcLayout(
      '套管强度',
      '抗内压、抗外挤与抗拉强度估算',
      'P_burst = 2·Y·t / D',
      field('外径 OD', 'cs-od', 'mm') +
      field('壁厚', 'cs-wall', 'mm') +
      field('内径 ID', 'cs-id', 'mm') +
      field('屈服强度', 'cs-yield', 'MPa', 'number', 'any', '552') +
      field('安全系数', 'cs-sf', '—', 'number', 'any', '1.1'),
      'cs-result'
    );
    const update = () => {
      const od = +document.getElementById('cs-od').value;
      const wall = +document.getElementById('cs-wall').value;
      const id = +document.getElementById('cs-id').value;
      const y = +document.getElementById('cs-yield').value;
      const sf = +document.getElementById('cs-sf').value || 1.1;
      if (!od || !wall || !y) return;
      const burst = casingBurst(wall, y, od, sf);
      const collapse = id ? casingCollapse(wall, y, od, id, sf) : { collapse: 0, safeCollapse: 0 };
      const area = pipeArea(od, id || od - 2 * wall);
      const tension = casingTension(area, y, 1.6);
      document.getElementById('cs-result').innerHTML =
        resultHighlight('抗内压（安全）', burst.safeBurst.toFixed(1), 'MPa') +
        resultRows([
          ['抗内压（极限）', `${burst.burst.toFixed(1)} MPa`],
          ['抗外挤（安全）', id ? `${collapse.safeCollapse.toFixed(1)} MPa` : '—'],
          ['抗拉（安全）', `${tension.safeTension.toFixed(0)} kN`],
          ['金属截面积', `${area.toFixed(1)} mm²`],
        ]);
    };
    el.querySelectorAll('input').forEach((i) => i.addEventListener('input', update));
    update();
  },

  'drillpipe-strength'(el) {
    el.innerHTML = calcLayout(
      '钻杆强度',
      '抗扭与抗拉能力估算',
      'T = J·Y / (OD·SF)',
      field('外径 OD', 'ds-od', 'mm') +
      field('内径 ID', 'ds-id', 'mm') +
      field('屈服强度', 'ds-yield', 'MPa', 'number', 'any', '724'),
      'ds-result'
    );
    const update = () => {
      const od = +document.getElementById('ds-od').value;
      const id = +document.getElementById('ds-id').value;
      const y = +document.getElementById('ds-yield').value;
      if (!od || !id || !y) return;
      const torsion = drillpipeTorsion(od, id, y);
      const area = pipeArea(od, id);
      const tension = drillpipeTension(area, y);
      document.getElementById('ds-result').innerHTML =
        resultHighlight('抗扭（安全）', torsion.torque.toFixed(1), 'kN·m') +
        resultRows([
          ['抗拉（安全）', `${tension.safeTension.toFixed(0)} kN`],
          ['极惯性矩 J', `${(torsion.J / 1e4).toFixed(2)} ×10⁴ mm⁴`],
          ['金属截面积', `${area.toFixed(1)} mm²`],
        ]);
    };
    el.querySelectorAll('input').forEach((i) => i.addEventListener('input', update));
    update();
  },

  'wire-rope'(el) {
    el.innerHTML = calcLayout(
      '钢丝绳载荷',
      '根据绳径与绳股强度计算破断拉力',
      'F = σ·A / SF',
      field('绳径', 'wr-d', 'mm') +
      selectField('绳股强度', 'wr-grade', [
        { v: '1770', l: '1770 MPa' }, { v: '1960', l: '1960 MPa' }, { v: '2160', l: '2160 MPa' },
      ]) +
      field('安全系数', 'wr-sf', '—', 'number', 'any', '5'),
      'wr-result'
    );
    const update = () => {
      const d = +document.getElementById('wr-d').value;
      const grade = document.getElementById('wr-grade').value;
      const sf = +document.getElementById('wr-sf').value || 5;
      if (!d) return;
      const r = wireRopeLoad(d, grade, sf);
      document.getElementById('wr-result').innerHTML =
        resultHighlight('工作载荷', r.working.toFixed(1), 'kN') +
        resultRows([
          ['破断拉力', `${r.breaking.toFixed(1)} kN`],
          ['钢丝绳截面积', `${r.area.toFixed(1)} mm²`],
          ['安全系数', `${sf}`],
        ]);
    };
    el.querySelectorAll('input, select').forEach((i) => i.addEventListener('input', update));
    el.querySelectorAll('select').forEach((i) => i.addEventListener('change', update));
    update();
  },

  'nozzle-tfa'(el) {
    el.innerHTML = `<div class="tool-layout calc-layout">
      <div class="panel">
        <div class="panel-head">
          <h2>喷嘴流面积</h2>
          <p>输入喷嘴直径（1/32 in），自动计算总流面积 TFA</p>
          <span class="formula-chip">TFA = Σ π·(d/32)² / 4</span>
        </div>
        <div class="panel-body">
          <div class="nozzle-inputs" id="nozzle-list">
            ${[1, 2, 3].map((i) => field(`喷嘴 ${i}`, `nz-${i}`, '/32 in', 'number', '1', '12')).join('')}
          </div>
          <button class="btn btn-secondary btn-sm" id="add-nozzle">+ 添加喷嘴</button>
        </div>
      </div>
      <div class="panel results-panel">
        <div class="panel-head"><h2>计算结果</h2></div>
        <div id="nz-result" class="results-body visible"></div>
      </div>
    </div>`;
    let count = 3;
    const update = () => {
      const nozzles = [];
      document.querySelectorAll('[id^="nz-"]').forEach((inp) => {
        const v = +inp.value;
        if (v > 0) nozzles.push(v);
      });
      if (!nozzles.length) return;
      const r = nozzleTFA(nozzles);
      document.getElementById('nz-result').innerHTML =
        resultHighlight('总流面积 TFA', r.tfa.toFixed(4), 'in²') +
        resultRows([
          ['TFA', `${r.tfaMm2.toFixed(2)} mm²`],
          ['喷嘴数量', `${r.count}`],
          ['平均直径', `${(nozzles.reduce((a, b) => a + b, 0) / nozzles.length).toFixed(1)} /32 in`],
        ]);
    };
    el.addEventListener('input', update);
    document.getElementById('add-nozzle').addEventListener('click', () => {
      count++;
      const div = document.createElement('div');
      div.className = 'field';
      div.innerHTML = `<label>喷嘴 ${count}</label><div class="field-input-row"><input type="number" id="nz-${count}" step="1" placeholder="—"><span class="unit">/32 in</span></div>`;
      document.getElementById('nozzle-list').appendChild(div);
      div.querySelector('input').addEventListener('input', update);
    });
    update();
  },

  'mud-pump'(el) {
    el.innerHTML = calcLayout(
      '泥浆泵',
      '根据缸径、冲程与冲数计算排量',
      'Q = n·π·D²·S·SPM·η / 4',
      field('缸数', 'mp-cyl', '个', 'number', '1', '2') +
      field('缸径', 'mp-bore', 'mm', 'number', 'any', '170') +
      field('冲程', 'mp-stroke', 'mm', 'number', 'any', '305') +
      field('冲数 SPM', 'mp-spm', '1/min', 'number', 'any', '120') +
      field('容积效率', 'mp-eff', '—', 'number', 'any', '0.95'),
      'mp-result'
    );
    const update = () => {
      const c = +document.getElementById('mp-cyl').value;
      const b = +document.getElementById('mp-bore').value;
      const s = +document.getElementById('mp-stroke').value;
      const spm = +document.getElementById('mp-spm').value;
      const e = +document.getElementById('mp-eff').value;
      if (!c || !b || !s || !spm) return;
      const r = mudPumpDisplacement(c, b, s, spm, e);
      document.getElementById('mp-result').innerHTML =
        resultHighlight('排量', r.lps.toFixed(2), 'L/s') +
        resultRows([
          ['排量', `${r.gpm.toFixed(1)} gpm`],
          ['排量', `${r.m3min.toFixed(3)} m³/min`],
          ['每冲容积', `${r.volPerStroke.toFixed(1)} L`],
        ]);
    };
    el.querySelectorAll('input').forEach((i) => i.addEventListener('input', update));
    update();
  },

  'makeup-torque'(el) {
    el.innerHTML = calcLayout(
      '上扣扭矩',
      'API 推荐上扣扭矩估算',
      'T ≈ f·Y·A·OD',
      field('接头外径', 'mt-od', 'in', 'number', 'any', '5') +
      field('屈服系数', 'mt-factor', '—', 'number', 'any', '0.2') +
      selectField('钢级', 'mt-grade', [
        { v: '55', l: 'J-55 (55 ksi)' }, { v: '75', l: 'E-75 (75 ksi)' },
        { v: '105', l: 'G-105 (105 ksi)' }, { v: '135', l: 'S-135 (135 ksi)' },
      ]),
      'mt-result'
    );
    const update = () => {
      const od = +document.getElementById('mt-od').value;
      const factor = +document.getElementById('mt-factor').value;
      const grade = +document.getElementById('mt-grade').value;
      if (!od) return;
      const r = makeupTorque(od, factor, grade);
      document.getElementById('mt-result').innerHTML =
        resultHighlight('推荐扭矩', r.torque.toFixed(1), 'kN·m') +
        resultRows([
          ['扭矩', `${r.torqueFtLbf.toFixed(0)} lbf·ft`],
          ['接头外径', `${od} in`],
          ['钢级', `${grade} ksi`],
        ]);
    };
    el.querySelectorAll('input, select').forEach((i) => i.addEventListener('input', update));
    el.querySelectorAll('select').forEach((i) => i.addEventListener('change', update));
    update();
  },

  'unit-convert'(el) {
    const cats = Object.entries(UNIT_CATEGORIES);
    const catOpts = cats.map(([k, v]) => ({ v: k, l: v.label }));
    el.innerHTML = `<div class="tool-layout calc-layout">
      <div class="panel">
        <div class="panel-head"><h2>换算系数</h2><p>钻井工程常用单位换算</p></div>
        <div class="panel-body form-grid">
          ${selectField('类别', 'uc-cat', catOpts)}
          ${field('数值', 'uc-val', '', 'number', 'any', '1')}
          ${selectField('从', 'uc-from', [])}
          ${selectField('到', 'uc-to', [])}
        </div>
      </div>
      <div class="panel results-panel">
        <div class="panel-head"><h2>换算结果</h2></div>
        <div id="uc-result" class="results-body visible"></div>
      </div>
    </div>`;
    const fillUnits = (cat) => {
      const units = Object.keys(UNIT_CATEGORIES[cat].units);
      const opts = units.map((u) => `<option value="${u}">${u}</option>`).join('');
      document.getElementById('uc-from').innerHTML = opts;
      document.getElementById('uc-to').innerHTML = opts;
      if (units.length > 1) document.getElementById('uc-to').selectedIndex = 1;
    };
    fillUnits('length');
    const update = () => {
      const cat = document.getElementById('uc-cat').value;
      const val = +document.getElementById('uc-val').value;
      const from = document.getElementById('uc-from').value;
      const to = document.getElementById('uc-to').value;
      const u = UNIT_CATEGORIES[cat].units;
      const result = convertUnit(val, u[from], u[to]);
      document.getElementById('uc-result').innerHTML =
        resultHighlight('结果', result.toFixed(6).replace(/\.?0+$/, ''), to) +
        resultRows([['输入', `${val} ${from}`], ['类别', UNIT_CATEGORIES[cat].label]]);
    };
    document.getElementById('uc-cat').addEventListener('change', () => {
      fillUnits(document.getElementById('uc-cat').value);
      update();
    });
    el.querySelectorAll('input, select').forEach((i) => i.addEventListener('input', update));
    el.querySelectorAll('select').forEach((i) => i.addEventListener('change', update));
    update();
  },

  'bit-iadc'(el) {
    el.innerHTML = `<div class="tool-layout calc-layout">
      <div class="panel">
        <div class="panel-head"><h2>钻头 IADC 编码</h2><p>输入三码 IADC 编码，解析钻头类型与适用地层</p></div>
        <div class="panel-body">
          <div class="iadc-picker">
            ${['系列', '地层', '特征'].map((l, i) => `
              <div class="iadc-wheel">
                <label>${l}</label>
                <input type="number" id="iadc-${i}" min="1" max="9" value="${i + 1}" class="iadc-input">
              </div>`).join('')}
          </div>
          <div class="field field-full" style="margin-top:16px">
            <label>或直接输入编码</label>
            <div class="field-input-row"><input type="text" id="iadc-code" placeholder="例如 537" maxlength="3"></div>
          </div>
        </div>
      </div>
      <div class="panel results-panel">
        <div class="panel-head"><h2>解码结果</h2></div>
        <div id="iadc-result" class="results-body visible"></div>
      </div>
    </div>`;
    const update = () => {
      let code = document.getElementById('iadc-code').value;
      if (!code) {
        code = [0, 1, 2].map((i) => document.getElementById(`iadc-${i}`).value).join('');
      }
      const d = decodeIADC(code);
      [0, 1, 2].forEach((i) => { document.getElementById(`iadc-${i}`).value = d[['series', 'formation', 'feature'][i]]; });
      document.getElementById('iadc-code').value = d.code;
      document.getElementById('iadc-result').innerHTML =
        resultHighlight('IADC 编码', d.code, '') +
        resultRows([
          ['系列', IADC_BITS.seriesDesc[d.series] || '—'],
          ['地层', IADC_BITS.formationDesc[d.formation] || '—'],
          ['特征', IADC_BITS.featureDesc[d.feature] || '—'],
        ]);
    };
    el.querySelectorAll('input').forEach((i) => i.addEventListener('input', update));
    update();
  },

  'rock-density'(el) {
    const rows = ROCK_DENSITIES.map((r) =>
      `<tr><td><strong>${esc(r.rock)}</strong></td><td>${r.min}</td><td>${r.max}</td><td>${r.typical}</td><td>${esc(r.porosity)}</td></tr>`
    ).join('');
    el.innerHTML = `<div class="tool-layout single">
      <div class="panel">
        <div class="panel-head"><h2>岩石密度</h2><p>常见岩性密度范围参考（g/cm³）</p></div>
        <div class="panel-body">${queryTable(['岩性', '最小', '最大', '典型', '孔隙度'], rows, 'rock-filter')}</div>
      </div>
    </div>`;
    bindTableFilter('rock-filter');
  },

  'well-log'(el) {
    const lithoCats = [...new Set(WELL_LOG_LITHOLOGY.map((r) => r.category))];
    const catPills =
      `<button type="button" class="cat-pill active" data-cat="全部">全部</button>` +
      lithoCats.map((c) => `<button type="button" class="cat-pill log-cat-pill" data-cat="${esc(c)}">${esc(c)}</button>`).join('');

    const curveCards = WELL_LOG_CURVES.map((r) => `
      <div class="ref-card log-curve-card" data-search="${esc(r.code + r.name + r.use)}">
        <div class="ref-card-head" style="border-color:#ea580c">
          <span class="ref-card-title">${esc(r.code)} <span class="log-curve-name">${esc(r.name)}</span></span>
          <span class="ref-card-unit">${esc(r.unit)}</span>
        </div>
        <div class="ref-card-body">
          <div class="ref-row"><span>低值 →</span><span>${esc(r.low)}</span></div>
          <div class="ref-row"><span>高值 →</span><span>${esc(r.high)}</span></div>
          <div class="ref-row"><span>主要用途</span><span>${esc(r.use)}</span></div>
        </div>
      </div>`).join('');

    const lithoRows = WELL_LOG_LITHOLOGY.map((r) =>
      `<tr data-cat="${esc(r.category)}" data-search="${esc(r.litho + r.category + r.note)}">
        <td><strong>${esc(r.litho)}</strong></td>
        <td>${esc(r.gr)}</td><td>${esc(r.rhob)}</td><td>${esc(r.nphi)}</td>
        <td>${esc(r.dt)}</td><td>${esc(r.rt)}</td>
        <td class="log-note-cell">${esc(r.note)}</td>
      </tr>`
    ).join('');

    const ruleCards = WELL_LOG_FLUID_RULES.map((r) => `
      <article class="param-guide-card log-rule-card" data-search="${esc(r.title + r.criteria + r.detail)}">
        <h3 class="param-guide-title">${esc(r.title)}</h3>
        <div class="param-hydro-value">${esc(r.criteria)}</div>
        <p class="param-guide-note">${esc(r.detail)}</p>
      </article>`).join('');

    el.innerHTML = `<div class="tool-layout single">
      <div class="panel">
        <div class="panel-head">
          <h2>测井曲线</h2>
          <p>行业标准测井解释参考库：${WELL_LOG_CURVES.length} 条曲线说明、${WELL_LOG_LITHOLOGY.length} 种岩性读数、${WELL_LOG_FLUID_RULES.length} 条油气判别准则。</p>
        </div>
        <div class="panel-body">
          <div class="query-toolbar">
            <input type="search" id="log-filter" class="search-input" placeholder="搜索曲线、岩性、判别准则…">
          </div>

          <section class="param-section">
            <h3 class="param-section-title">曲线特征说明 <span class="param-section-sub">${WELL_LOG_CURVES.length} 条</span></h3>
            <div class="ref-grid" id="log-curve-grid">${curveCards}</div>
          </section>

          <section class="param-section">
            <h3 class="param-section-title">测井曲线读数 <span class="param-section-sub">按岩性</span></h3>
            <div class="filter-label">按岩性类别筛选</div>
            <div class="cat-pills" id="log-cat-pills">${catPills}</div>
            <p class="additive-count" id="log-litho-count">共 ${WELL_LOG_LITHOLOGY.length} 条结果</p>
            <div class="table-wrap">
              <table class="data-table" id="log-litho-table">
                <thead><tr>
                  <th>岩性 / 储集</th><th>GR (API)</th><th>RHOB (g/cm³)</th>
                  <th>NPHI (%)</th><th>DT (μs/ft)</th><th>RT (Ω·m)</th><th>解释要点</th>
                </tr></thead>
                <tbody>${lithoRows}</tbody>
              </table>
            </div>
          </section>

          <section class="param-section">
            <h3 class="param-section-title">油气层判别经验 <span class="param-section-sub">${WELL_LOG_FLUID_RULES.length} 条</span></h3>
            <div class="param-guide-grid" id="log-rule-grid">${ruleCards}</div>
          </section>
        </div>
      </div>
    </div>`;

    let activeCat = '全部';

    function applyFilter() {
      const q = (document.getElementById('log-filter')?.value || '').toLowerCase();
      let lithoShown = 0;
      document.querySelectorAll('#log-litho-table tbody tr').forEach((tr) => {
        const matchCat = activeCat === '全部' || tr.dataset.cat === activeCat;
        const matchQ = !q || tr.dataset.search.toLowerCase().includes(q);
        const visible = matchCat && matchQ;
        tr.style.display = visible ? '' : 'none';
        if (visible) lithoShown++;
      });
      const countEl = document.getElementById('log-litho-count');
      if (countEl) countEl.textContent = `共 ${lithoShown} 条结果`;

      document.querySelectorAll('.log-curve-card').forEach((card) => {
        const matchQ = !q || card.dataset.search.toLowerCase().includes(q);
        card.style.display = matchQ ? '' : 'none';
      });
      document.querySelectorAll('.log-rule-card').forEach((card) => {
        const matchQ = !q || card.dataset.search.toLowerCase().includes(q);
        card.style.display = matchQ ? '' : 'none';
      });
    }

    document.getElementById('log-filter')?.addEventListener('input', applyFilter);
    document.getElementById('log-cat-pills')?.addEventListener('click', (e) => {
      const btn = e.target.closest('.log-cat-pill, .cat-pill');
      if (!btn) return;
      e.preventDefault();
      activeCat = btn.dataset.cat;
      document.querySelectorAll('#log-cat-pills .cat-pill').forEach((p) => p.classList.toggle('active', p === btn));
      applyFilter();
    });
  },

  'recommended-params'(el) {
    const holeRows = DRILLING_PARAMS_BY_HOLE.map((r) =>
      `<tr><td><strong>${esc(r.hole)}</strong></td><td>${esc(r.wob)}</td><td>${esc(r.rpm)}</td><td>${esc(r.flow)}</td><td>${esc(r.mw)}</td></tr>`
    ).join('');
    const adjustCards = DRILLING_PARAM_ADJUSTMENTS.map((r) =>
      `<article class="param-guide-card">
        <h3 class="param-guide-title">${esc(r.type)}</h3>
        <div class="param-guide-meta">
          <span>钻压 <strong>${esc(r.wob)}</strong></span>
          <span>转速 <strong>${esc(r.rpm)}</strong></span>
        </div>
        <p class="param-guide-note">${esc(r.note)}</p>
      </article>`
    ).join('');
    const hydroCards = DRILLING_HYDRAULICS_CRITERIA.map((r) =>
      `<article class="param-hydro-card">
        <div class="param-hydro-head"><span class="param-hydro-item">${esc(r.item)}</span></div>
        <div class="param-hydro-value">${esc(r.value)}</div>
        <p class="param-hydro-note">${esc(r.note)}</p>
      </article>`
    ).join('');

    el.innerHTML = `<div class="tool-layout single">
      <div class="panel">
        <div class="panel-head">
          <h2>钻井参数推荐</h2>
          <p>按井眼尺寸的钻压、转速、排量与密度参考值，附地层 / 钻头调整指引与水力校核准则。</p>
        </div>
        <div class="panel-body">
          <section class="param-section">
            <h3 class="param-section-title">按井眼尺寸推荐参数</h3>
            <div class="table-wrap">
              <table class="data-table" id="hole-params-table">
                <thead><tr><th>井眼</th><th>钻压 WOB</th><th>转速 RPM</th><th>排量</th><th>密度</th></tr></thead>
                <tbody>${holeRows}</tbody>
              </table>
            </div>
          </section>

          <section class="param-section">
            <h3 class="param-section-title">参数调整指引 <span class="param-section-sub">地层 / 钻头类型</span></h3>
            <div class="param-guide-grid">${adjustCards}</div>
          </section>

          <section class="param-section">
            <h3 class="param-section-title">排量校核准则</h3>
            <div class="param-hydro-grid">${hydroCards}</div>
          </section>

          <p class="param-disclaimer">${esc(DRILLING_PARAMS_DISCLAIMER)}</p>
        </div>
      </div>
    </div>`;
  },

  'mud-additive'(el) {
    const catColors = {
      '增粘剂': '#16a34a', '降滤失剂': '#2563eb', '加重剂': '#64748b', '分散剂': '#9333ea',
      'pH 调节': '#0d9488', '防塌剂': '#dc2626', '润滑剂': '#ea580c', '防漏失': '#ca8a04',
      '消泡剂': '#6366f1', '杀菌剂': '#db2777',
    };
    const pills = MUD_ADDITIVE_CATEGORIES.map((c, i) =>
      `<button type="button" class="cat-pill${i === 0 ? ' active' : ''}" data-cat="${esc(c)}">${esc(c)}</button>`
    ).join('');
    const cards = MUD_ADDITIVES.map((r) => {
      const color = catColors[r.category] || '#64748b';
      return `<article class="additive-card" data-category="${esc(r.category)}" data-search="${esc(r.name + r.category + r.effect)}">
        <div class="additive-card-top">
          <span class="additive-cat" style="color:${color};background:${color}18">${esc(r.category)}</span>
          <h3 class="additive-name">${esc(r.name)}</h3>
        </div>
        <div class="additive-meta">
          <div class="additive-meta-item"><span>典型加量</span><strong>${esc(r.dosage)}</strong></div>
          <div class="additive-meta-item"><span>温度上限</span><strong>${esc(r.tempMax)}</strong></div>
        </div>
        <p class="additive-effect">${esc(r.effect)}</p>
      </article>`;
    }).join('');

    el.innerHTML = `<div class="tool-layout single">
      <div class="panel">
        <div class="panel-head">
          <h2>钻井液处理剂</h2>
          <p>水基钻井液常用处理剂参数库，共 ${MUD_ADDITIVES.length} 条。加量为行业参考范围，需结合现场调整。</p>
        </div>
        <div class="panel-body">
          <div class="query-toolbar">
            <input type="search" id="mud-filter" class="search-input" placeholder="搜索名称、类别、作用…">
          </div>
          <div class="filter-label">按类别筛选</div>
          <div class="cat-pills" id="mud-cat-pills">${pills}</div>
          <div class="additive-grid" id="mud-cards">${cards}</div>
          <p class="additive-count" id="mud-count">显示 ${MUD_ADDITIVES.length} / ${MUD_ADDITIVES.length} 条</p>
          <div class="external-link-banner">
            <p>需要助剂加量、混浆加重等 16 项专业计算？</p>
            <a href="${EXTERNAL_LINKS.drillingFluidCalculator}" class="btn btn-primary btn-sm" target="_blank" rel="noopener">钻井液计算器 →</a>
          </div>
        </div>
      </div>
    </div>`;

    let activeCat = '全部';
    const searchInput = document.getElementById('mud-filter');
    const cardEls = () => [...document.querySelectorAll('.additive-card')];

    function applyFilter() {
      const q = (searchInput?.value || '').toLowerCase();
      let shown = 0;
      cardEls().forEach((card) => {
        const matchCat = activeCat === '全部' || card.dataset.category === activeCat;
        const matchQ = !q || card.dataset.search.toLowerCase().includes(q);
        const visible = matchCat && matchQ;
        card.style.display = visible ? '' : 'none';
        if (visible) shown++;
      });
      const countEl = document.getElementById('mud-count');
      if (countEl) countEl.textContent = `显示 ${shown} / ${MUD_ADDITIVES.length} 条`;
    }

    searchInput?.addEventListener('input', applyFilter);
    document.getElementById('mud-cat-pills')?.addEventListener('click', (e) => {
      const btn = e.target.closest('.cat-pill');
      if (!btn) return;
      e.preventDefault();
      activeCat = btn.dataset.cat;
      document.querySelectorAll('#mud-cat-pills .cat-pill').forEach((p) => p.classList.toggle('active', p === btn));
      applyFilter();
    });
  },

  'cement-grade'(el) {
    const legendRows = CEMENT_SULFATE_LEGEND.map((r) =>
      `<tr><td><strong>${esc(r.code)}</strong></td><td>${esc(r.name)}</td><td>${esc(r.desc)}</td></tr>`
    ).join('');
    const cards = CEMENT_GRADES.map((r) => `
      <article class="cement-grade-card" data-search="${esc(r.grade + r.name + r.trait + r.note + r.sulfateCode)}">
        <div class="cement-grade-card-head">
          <span class="cement-grade-badge">${r.grade}</span>
          <h3>${esc(r.name)}</h3>
          <span class="cement-sulfate-tag">${esc(r.sulfate)}（${esc(r.sulfateCode)}）</span>
        </div>
        <p class="cement-grade-trait">${esc(r.trait)}</p>
        <div class="cement-grade-meta">
          <span>井深 <strong>${esc(r.depth)}</strong></span>
          <span>温度 <strong>${esc(r.temp)}</strong></span>
          <span>水灰比 <strong>${esc(r.wc)}</strong></span>
        </div>
        <p class="cement-grade-note">${esc(r.note)}</p>
      </article>`).join('');
    const paramRows = CEMENT_GRADES.map((r) =>
      `<tr data-search="${esc(r.grade + r.name + r.trait + r.note)}">
        <td><strong>${r.grade}</strong></td><td>${esc(r.depthFt)}</td><td>${esc(r.temp)}</td>
        <td>${esc(r.yield)}</td><td>${esc(r.density)}</td><td>${esc(r.wc)}</td>
      </tr>`
    ).join('');
    el.innerHTML = `<div class="tool-layout single">
      <div class="panel">
        <div class="panel-head">
          <h2>水泥等级</h2>
          <p>API Spec 10A 油井水泥等级与特性适用场景，共 ${CEMENT_GRADES.length} 级。G 级为国内最常用基本水泥。</p>
        </div>
        <div class="panel-body">
          <div class="query-toolbar">
            <input type="search" id="cement-grade-filter" class="search-input" placeholder="搜索等级、特性、抗硫…">
          </div>

          <section class="param-section">
            <h3 class="param-section-title">抗硫等级说明</h3>
            <div class="table-wrap">
              <table class="data-table">
                <thead><tr><th>代号</th><th>名称</th><th>说明</th></tr></thead>
                <tbody>${legendRows}</tbody>
              </table>
            </div>
          </section>

          <section class="param-section">
            <h3 class="param-section-title">特性与适用场景 <span class="param-section-sub">${CEMENT_GRADES.length} 级</span></h3>
            <p class="additive-count" id="cement-grade-count">共 ${CEMENT_GRADES.length} 条结果</p>
            <div class="cement-grade-grid" id="cement-grade-cards">${cards}</div>
          </section>

          <section class="param-section">
            <h3 class="param-section-title">技术参数对照</h3>
            <div class="table-wrap">
              <table class="data-table" id="cement-grade-table">
                <thead><tr>
                  <th>等级</th><th>适用井深（ft）</th><th>温度</th>
                  <th>造浆率</th><th>密度</th><th>水灰比</th>
                </tr></thead>
                <tbody>${paramRows}</tbody>
              </table>
            </div>
          </section>

          <div class="external-link-banner">
            <p>配浆加重、套管伸长、水泥用量、扶正器间距等工程计算？</p>
            <a href="${EXTERNAL_LINKS.wellCementingCalculator}" class="btn btn-primary btn-sm" target="_blank" rel="noopener">固井计算器 →</a>
          </div>
        </div>
      </div>
    </div>`;
    function applyFilter() {
      const q = (document.getElementById('cement-grade-filter')?.value || '').toLowerCase();
      let shown = 0;
      document.querySelectorAll('.cement-grade-card').forEach((card) => {
        const visible = !q || card.dataset.search.toLowerCase().includes(q);
        card.style.display = visible ? '' : 'none';
        if (visible) shown++;
      });
      document.querySelectorAll('#cement-grade-table tbody tr').forEach((tr) => {
        const visible = !q || tr.dataset.search.toLowerCase().includes(q);
        tr.style.display = visible ? '' : 'none';
      });
      const countEl = document.getElementById('cement-grade-count');
      if (countEl) countEl.textContent = `共 ${shown} 条结果`;
    }
    document.getElementById('cement-grade-filter')?.addEventListener('input', applyFilter);
  },

  'cement-additive'(el) {
    const catColors = {
      '促凝剂': '#ea580c', '缓凝剂': '#2563eb', '降失水剂': '#16a34a', '分散剂': '#9333ea',
      '减轻剂': '#64748b', '加重剂': '#475569', '防冻剂': '#0ea5e9', '防气窜剂': '#dc2626',
      '膨胀剂': '#ca8a04', '纤维': '#db2777', '其他': '#94a3b8',
    };
    const pills = CEMENT_ADDITIVE_CATEGORIES.map((c, i) =>
      `<button type="button" class="cat-pill${i === 0 ? ' active' : ''}" data-cat="${esc(c)}">${esc(c)}</button>`
    ).join('');
    const cards = CEMENT_ADDITIVES.map((r) => {
      const color = catColors[r.category] || '#64748b';
      return `<article class="additive-card" data-category="${esc(r.category)}" data-search="${esc(r.name + r.category + r.effect)}">
        <div class="additive-card-top">
          <span class="additive-cat" style="color:${color};background:${color}18">${esc(r.category)}</span>
          <h3 class="additive-name">${esc(r.name)}</h3>
        </div>
        <div class="additive-meta">
          <div class="additive-meta-item"><span>典型加量</span><strong>${esc(r.dosage)}</strong></div>
          <div class="additive-meta-item"><span>温度上限</span><strong>${esc(r.tempMax)}</strong></div>
        </div>
        <p class="additive-effect">${esc(r.effect)}</p>
      </article>`;
    }).join('');
    el.innerHTML = `<div class="tool-layout single">
      <div class="panel">
        <div class="panel-head">
          <h2>水泥外加剂</h2>
          <p>固井水泥浆外加剂参数库，共 ${CEMENT_ADDITIVES.length} 条。加量以 BWOC（占水泥质量百分比）为基准。</p>
        </div>
        <div class="panel-body">
          <div class="query-toolbar">
            <input type="search" id="cement-add-filter" class="search-input" placeholder="搜索名称、类别、作用…">
          </div>
          <div class="filter-label">按类别筛选</div>
          <div class="cat-pills" id="cement-add-pills">${pills}</div>
          <div class="additive-grid" id="cement-add-cards">${cards}</div>
          <p class="additive-count" id="cement-add-count">显示 ${CEMENT_ADDITIVES.length} / ${CEMENT_ADDITIVES.length} 条</p>
        </div>
      </div>
    </div>`;
    let activeCat = '全部';
    const searchInput = document.getElementById('cement-add-filter');
    const cardEls = () => [...document.querySelectorAll('#cement-add-cards .additive-card')];
    function applyFilter() {
      const q = (searchInput?.value || '').toLowerCase();
      let shown = 0;
      cardEls().forEach((card) => {
        const matchCat = activeCat === '全部' || card.dataset.category === activeCat;
        const matchQ = !q || card.dataset.search.toLowerCase().includes(q);
        const visible = matchCat && matchQ;
        card.style.display = visible ? '' : 'none';
        if (visible) shown++;
      });
      const countEl = document.getElementById('cement-add-count');
      if (countEl) countEl.textContent = `显示 ${shown} / ${CEMENT_ADDITIVES.length} 条`;
    }
    searchInput?.addEventListener('input', applyFilter);
    document.getElementById('cement-add-pills')?.addEventListener('click', (e) => {
      const btn = e.target.closest('.cat-pill');
      if (!btn) return;
      e.preventDefault();
      activeCat = btn.dataset.cat;
      document.querySelectorAll('#cement-add-pills .cat-pill').forEach((p) => p.classList.toggle('active', p === btn));
      applyFilter();
    });
  },

  'cement-slurry'(el) {
    const rows = CEMENT_SLURRY_PROPERTIES.map((r) =>
      `<tr data-search="${esc(r.scenario + r.note)}">
        <td><strong>${esc(r.scenario)}</strong></td><td>${esc(r.density)}</td><td>${esc(r.wc)}</td>
        <td>${esc(r.thickTime)}</td><td>${esc(r.fluidLoss)}</td><td>${esc(r.freeWater)}</td>
        <td>${esc(r.strength24h)}</td><td>${esc(r.strength48h)}</td>
        <td class="log-note-cell">${esc(r.note)}</td>
      </tr>`
    ).join('');
    el.innerHTML = `<div class="tool-layout single">
      <div class="panel">
        <div class="panel-head">
          <h2>水泥浆性能</h2>
          <p>按固井作业类型的水泥浆性能设计参考，共 ${CEMENT_SLURRY_PROPERTIES.length} 种场景。具体配方需经实验室复核。</p>
        </div>
        <div class="panel-body">
          <div class="query-toolbar">
            <input type="search" id="cement-slurry-filter" class="search-input" placeholder="搜索作业类型…">
          </div>
          <p class="additive-count" id="cement-slurry-count">共 ${CEMENT_SLURRY_PROPERTIES.length} 条结果</p>
          <div class="table-wrap">
            <table class="data-table" id="cement-slurry-table">
              <thead><tr>
                <th>作业类型</th><th>密度</th><th>水灰比</th><th>稠化时间</th>
                <th>失水量</th><th>游离液</th><th>24h 强度</th><th>48h 强度</th><th>说明</th>
              </tr></thead>
              <tbody>${rows}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>`;
    const table = document.getElementById('cement-slurry-table');
    const countEl = document.getElementById('cement-slurry-count');
    document.getElementById('cement-slurry-filter')?.addEventListener('input', () => {
      const q = (document.getElementById('cement-slurry-filter')?.value || '').toLowerCase();
      let shown = 0;
      table?.querySelectorAll('tbody tr').forEach((tr) => {
        const visible = !q || tr.dataset.search.toLowerCase().includes(q);
        tr.style.display = visible ? '' : 'none';
        if (visible) shown++;
      });
      if (countEl) countEl.textContent = `共 ${shown} 条结果`;
    });
  },

  'cement-test'(el) {
    const cats = [...new Set(CEMENT_TEST_ITEMS.map((r) => r.category))];
    const catPills =
      `<button type="button" class="cat-pill active" data-cat="全部">全部</button>` +
      cats.map((c) => `<button type="button" class="cat-pill cement-test-pill" data-cat="${esc(c)}">${esc(c)}</button>`).join('');
    const rows = CEMENT_TEST_ITEMS.map((r) =>
      `<tr data-cat="${esc(r.category)}" data-search="${esc(r.name + r.standard + r.note)}">
        <td><strong>${esc(r.name)}</strong></td><td>${esc(r.category)}</td><td>${esc(r.standard)}</td>
        <td>${esc(r.unit)}</td><td>${esc(r.typical)}</td><td>${esc(r.criteria)}</td>
        <td class="log-note-cell">${esc(r.note)}</td>
      </tr>`
    ).join('');
    el.innerHTML = `<div class="tool-layout single">
      <div class="panel">
        <div class="panel-head">
          <h2>试验项目</h2>
          <p>API RP 10B / GB/T 19139 固井水泥浆试验项目参考，共 ${CEMENT_TEST_ITEMS.length} 项。</p>
        </div>
        <div class="panel-body">
          <div class="query-toolbar">
            <input type="search" id="cement-test-filter" class="search-input" placeholder="搜索试验名称、标准…">
          </div>
          <div class="filter-label">按类别筛选</div>
          <div class="cat-pills" id="cement-test-pills">${catPills}</div>
          <p class="additive-count" id="cement-test-count">共 ${CEMENT_TEST_ITEMS.length} 条结果</p>
          <div class="table-wrap">
            <table class="data-table" id="cement-test-table">
              <thead><tr>
                <th>试验项目</th><th>类别</th><th>执行标准</th><th>单位</th>
                <th>典型值</th><th>判定准则</th><th>说明</th>
              </tr></thead>
              <tbody>${rows}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>`;
    let activeCat = '全部';
    const table = document.getElementById('cement-test-table');
    const countEl = document.getElementById('cement-test-count');
    function applyFilter() {
      const q = (document.getElementById('cement-test-filter')?.value || '').toLowerCase();
      let shown = 0;
      table?.querySelectorAll('tbody tr').forEach((tr) => {
        const matchCat = activeCat === '全部' || tr.dataset.cat === activeCat;
        const matchQ = !q || tr.dataset.search.toLowerCase().includes(q);
        const visible = matchCat && matchQ;
        tr.style.display = visible ? '' : 'none';
        if (visible) shown++;
      });
      if (countEl) countEl.textContent = `共 ${shown} 条结果`;
    }
    document.getElementById('cement-test-filter')?.addEventListener('input', applyFilter);
    document.getElementById('cement-test-pills')?.addEventListener('click', (e) => {
      const btn = e.target.closest('.cement-test-pill, .cat-pill');
      if (!btn) return;
      e.preventDefault();
      activeCat = btn.dataset.cat;
      document.querySelectorAll('#cement-test-pills .cat-pill').forEach((p) => p.classList.toggle('active', p === btn));
      applyFilter();
    });
  },

  'centralizer'(el) {
    const casings = [...new Set(CENTRALIZER_SPECS.map((r) => r.casing))];
    const types = [...new Set(CENTRALIZER_SPECS.map((r) => r.type))];
    const casingPills =
      `<button type="button" class="cat-pill active" data-casing="全部">全部</button>` +
      casings.map((c) => `<button type="button" class="cat-pill cent-casing-pill" data-casing="${esc(c)}">${c}"</button>`).join('');
    const typePills =
      `<button type="button" class="cat-pill cent-type-pill active" data-type="全部">全部</button>` +
      types.map((t) => `<button type="button" class="cat-pill cent-type-pill" data-type="${esc(t)}">${esc(t)}</button>`).join('');
    const rows = CENTRALIZER_SPECS.map((r) =>
      `<tr data-casing="${esc(r.casing)}" data-type="${esc(r.type)}">
        <td>${esc(r.type)}</td><td><strong>${r.casing}"</strong></td><td>${r.casingMm}</td>
        <td>${r.holeMin} ~ ${r.holeMax}</td><td>${r.od}</td><td>${r.length}</td>
        <td>${esc(r.standoff)}</td><td>${esc(r.drag)}</td>
        <td class="log-note-cell">${esc(r.note)}</td>
      </tr>`
    ).join('');
    el.innerHTML = `<div class="tool-layout single">
      <div class="panel">
        <div class="panel-head">
          <h2>扶正器</h2>
          <p>套管扶正器规格参数库，共 ${CENTRALIZER_SPECS.length} 条。含弹性、刚性、滚轮等类型。</p>
        </div>
        <div class="panel-body">
          <div class="query-toolbar">
            <input type="search" id="cent-filter" class="search-input" placeholder="搜索套管尺寸、类型…">
          </div>
          <div class="filter-label">按套管外径筛选</div>
          <div class="cat-pills" id="cent-casing-pills">${casingPills}</div>
          <div class="filter-label">按类型筛选</div>
          <div class="cat-pills" id="cent-type-pills">${typePills}</div>
          <p class="additive-count" id="cent-count">共 ${CENTRALIZER_SPECS.length} 条结果</p>
          <div class="table-wrap">
            <table class="data-table" id="cent-table">
              <thead><tr>
                <th>类型</th><th>套管</th><th>OD mm</th><th>井眼 in</th>
                <th>扶正器 OD mm</th><th>长度 mm</th><th>居中度</th><th>摩阻</th><th>说明</th>
              </tr></thead>
              <tbody>${rows}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>`;
    let activeCasing = '全部';
    let activeType = '全部';
    const table = document.getElementById('cent-table');
    const countEl = document.getElementById('cent-count');
    function applyFilter() {
      const q = (document.getElementById('cent-filter')?.value || '').toLowerCase();
      let shown = 0;
      table?.querySelectorAll('tbody tr').forEach((tr) => {
        const matchCasing = activeCasing === '全部' || tr.dataset.casing === activeCasing;
        const matchType = activeType === '全部' || tr.dataset.type === activeType;
        const matchQ = !q || tr.textContent.toLowerCase().includes(q);
        const visible = matchCasing && matchType && matchQ;
        tr.style.display = visible ? '' : 'none';
        if (visible) shown++;
      });
      if (countEl) countEl.textContent = `共 ${shown} 条结果`;
    }
    document.getElementById('cent-filter')?.addEventListener('input', applyFilter);
    document.getElementById('cent-casing-pills')?.addEventListener('click', (e) => {
      const btn = e.target.closest('.cent-casing-pill, .cat-pill');
      if (!btn) return;
      e.preventDefault();
      activeCasing = btn.dataset.casing;
      document.querySelectorAll('#cent-casing-pills .cat-pill').forEach((p) => p.classList.toggle('active', p === btn));
      applyFilter();
    });
    document.getElementById('cent-type-pills')?.addEventListener('click', (e) => {
      const btn = e.target.closest('.cent-type-pill');
      if (!btn) return;
      e.preventDefault();
      activeType = btn.dataset.type;
      document.querySelectorAll('#cent-type-pills .cent-type-pill').forEach((p) => p.classList.toggle('active', p === btn));
      applyFilter();
    });
  },

  'perforation-spec'(el) {
    const casings = [...new Set(PERFORATION_SPECS.map((r) => r.casing))];
    const pills = `<button type="button" class="cat-pill active" data-casing="全部">全部</button>` +
      casings.map((c) => `<button type="button" class="cat-pill perf-pill" data-casing="${esc(c)}">${c}"</button>`).join('');
    const rows = PERFORATION_SPECS.map((r) =>
      `<tr data-casing="${esc(r.casing)}" data-search="${esc(r.gunOd + r.casing + r.note)}">
        <td><strong>${esc(r.gunOd)}</strong></td><td>${r.casing}"</td><td>${esc(r.hole)}</td>
        <td>${esc(r.shotDensity)}</td><td>${esc(r.phasing)}</td><td>${esc(r.penetration)}</td>
        <td>${esc(r.charge)}</td><td>${esc(r.pressure)}</td><td class="log-note-cell">${esc(r.note)}</td>
      </tr>`
    ).join('');
    el.innerHTML = `<div class="tool-layout single"><div class="panel">
      <div class="panel-head"><h2>射孔参数</h2><p>API 射孔枪与弹型参数库，共 ${PERFORATION_SPECS.length} 条。SPF = shots per foot。</p></div>
      <div class="panel-body">
        <div class="query-toolbar"><input type="search" id="perf-filter" class="search-input" placeholder="搜索枪径、套管、弹型…"></div>
        <div class="filter-label">按套管外径筛选</div>
        <div class="cat-pills" id="perf-pills">${pills}</div>
        <p class="additive-count" id="perf-count">共 ${PERFORATION_SPECS.length} 条结果</p>
        <div class="table-wrap"><table class="data-table" id="perf-table">
          <thead><tr><th>枪径</th><th>套管</th><th>井眼 in</th><th>孔密 SPF</th><th>相位</th><th>穿透</th><th>弹型</th><th>压力</th><th>说明</th></tr></thead>
          <tbody>${rows}</tbody>
        </table></div>
      </div></div></div>`;
    let active = '全部';
    const table = document.getElementById('perf-table');
    const countEl = document.getElementById('perf-count');
    function apply() {
      const q = (document.getElementById('perf-filter')?.value || '').toLowerCase();
      let n = 0;
      table?.querySelectorAll('tbody tr').forEach((tr) => {
        const ok = (active === '全部' || tr.dataset.casing === active) && (!q || tr.dataset.search.toLowerCase().includes(q));
        tr.style.display = ok ? '' : 'none';
        if (ok) n++;
      });
      if (countEl) countEl.textContent = `共 ${n} 条结果`;
    }
    document.getElementById('perf-filter')?.addEventListener('input', apply);
    document.getElementById('perf-pills')?.addEventListener('click', (e) => {
      const btn = e.target.closest('.perf-pill, .cat-pill');
      if (!btn) return;
      e.preventDefault();
      active = btn.dataset.casing;
      document.querySelectorAll('#perf-pills .cat-pill').forEach((p) => p.classList.toggle('active', p === btn));
      apply();
    });
  },

  'screen-spec'(el) {
    const types = [...new Set(SCREEN_SPECS.map((r) => r.type))];
    const pills = `<button type="button" class="cat-pill active" data-type="全部">全部</button>` +
      types.map((t) => `<button type="button" class="cat-pill screen-pill" data-type="${esc(t)}">${esc(t)}</button>`).join('');
    const rows = SCREEN_SPECS.map((r) =>
      `<tr data-type="${esc(r.type)}" data-search="${esc(r.type + r.od + r.application + r.note)}">
        <td>${esc(r.type)}</td><td><strong>${r.od}"</strong></td><td>${r.odMm}</td>
        <td>${esc(r.slot)}</td><td>${esc(r.length)}</td><td>${esc(r.material)}</td>
        <td>${esc(r.application)}</td><td class="log-note-cell">${esc(r.note)}</td>
      </tr>`
    ).join('');
    el.innerHTML = `<div class="tool-layout single"><div class="panel">
      <div class="panel-head"><h2>筛管规格</h2><p>防砂筛管规格参数库，共 ${SCREEN_SPECS.length} 条。含割缝、绕丝、金属毡等类型。</p></div>
      <div class="panel-body">
        <div class="query-toolbar"><input type="search" id="screen-filter" class="search-input" placeholder="搜索类型、外径、应用…"></div>
        <div class="filter-label">按类型筛选</div>
        <div class="cat-pills" id="screen-pills">${pills}</div>
        <p class="additive-count" id="screen-count">共 ${SCREEN_SPECS.length} 条结果</p>
        <div class="table-wrap"><table class="data-table" id="screen-table">
          <thead><tr><th>类型</th><th>外径</th><th>OD mm</th><th>缝宽/精度</th><th>长度</th><th>材质</th><th>适用</th><th>说明</th></tr></thead>
          <tbody>${rows}</tbody>
        </table></div>
      </div></div></div>`;
    let active = '全部';
    const table = document.getElementById('screen-table');
    const countEl = document.getElementById('screen-count');
    function apply() {
      const q = (document.getElementById('screen-filter')?.value || '').toLowerCase();
      let n = 0;
      table?.querySelectorAll('tbody tr').forEach((tr) => {
        const ok = (active === '全部' || tr.dataset.type === active) && (!q || tr.dataset.search.toLowerCase().includes(q));
        tr.style.display = ok ? '' : 'none';
        if (ok) n++;
      });
      if (countEl) countEl.textContent = `共 ${n} 条结果`;
    }
    document.getElementById('screen-filter')?.addEventListener('input', apply);
    document.getElementById('screen-pills')?.addEventListener('click', (e) => {
      const btn = e.target.closest('.screen-pill, .cat-pill');
      if (!btn) return;
      e.preventDefault();
      active = btn.dataset.type;
      document.querySelectorAll('#screen-pills .cat-pill').forEach((p) => p.classList.toggle('active', p === btn));
      apply();
    });
  },

  'acidizing-formula'(el) {
    const catColors = {
      '常规酸化': '#ea580c', '土酸': '#16a34a', '深部酸化': '#2563eb', '压裂酸化': '#9333ea',
      '缓速酸': '#0d9488', '转向酸': '#ca8a04', '其他': '#64748b',
    };
    const pills = ACIDIZING_CATEGORIES.map((c, i) =>
      `<button type="button" class="cat-pill${i === 0 ? ' active' : ''}" data-cat="${esc(c)}">${esc(c)}</button>`
    ).join('');
    const cards = ACIDIZING_FORMULAS.map((r) => {
      const color = catColors[r.category] || '#64748b';
      return `<article class="additive-card" data-category="${esc(r.category)}" data-search="${esc(r.name + r.category + r.effect)}">
        <div class="additive-card-top"><span class="additive-cat" style="color:${color};background:${color}18">${esc(r.category)}</span>
        <h3 class="additive-name">${esc(r.name)}</h3></div>
        <div class="additive-meta">
          <div class="additive-meta-item"><span>配方</span><strong>${esc(r.composition)}</strong></div>
          <div class="additive-meta-item"><span>用量</span><strong>${esc(r.dosage)}</strong></div>
          <div class="additive-meta-item"><span>温度上限</span><strong>${esc(r.tempMax)}</strong></div>
        </div>
        <p class="additive-effect">${esc(r.effect)}</p>
      </article>`;
    }).join('');
    el.innerHTML = `<div class="tool-layout single"><div class="panel">
      <div class="panel-head"><h2>酸化液配方</h2><p>酸化施工配方参数库，共 ${ACIDIZING_FORMULAS.length} 条。配方需经实验室岩心流动试验验证。</p></div>
      <div class="panel-body">
        <div class="query-toolbar"><input type="search" id="acid-filter" class="search-input" placeholder="搜索配方、成分…"></div>
        <div class="filter-label">按类别筛选</div>
        <div class="cat-pills" id="acid-pills">${pills}</div>
        <div class="additive-grid" id="acid-cards">${cards}</div>
        <p class="additive-count" id="acid-count">显示 ${ACIDIZING_FORMULAS.length} / ${ACIDIZING_FORMULAS.length} 条</p>
      </div></div></div>`;
    let activeCat = '全部';
    const searchInput = document.getElementById('acid-filter');
    const cardEls = () => [...document.querySelectorAll('#acid-cards .additive-card')];
    function apply() {
      const q = (searchInput?.value || '').toLowerCase();
      let n = 0;
      cardEls().forEach((c) => {
        const ok = (activeCat === '全部' || c.dataset.category === activeCat) && (!q || c.dataset.search.toLowerCase().includes(q));
        c.style.display = ok ? '' : 'none';
        if (ok) n++;
      });
      const el2 = document.getElementById('acid-count');
      if (el2) el2.textContent = `显示 ${n} / ${ACIDIZING_FORMULAS.length} 条`;
    }
    searchInput?.addEventListener('input', apply);
    document.getElementById('acid-pills')?.addEventListener('click', (e) => {
      const btn = e.target.closest('.cat-pill');
      if (!btn) return;
      e.preventDefault();
      activeCat = btn.dataset.cat;
      document.querySelectorAll('#acid-pills .cat-pill').forEach((p) => p.classList.toggle('active', p === btn));
      apply();
    });
  },

  'pumping-unit'(el) {
    const rows = PUMPING_UNIT_SPECS.map((r) =>
      `<tr data-search="${esc(r.model + r.type + r.note)}">
        <td><strong>${esc(r.model)}</strong></td><td>${esc(r.type)}</td><td>${esc(r.torqueFactor)}</td>
        <td>${esc(r.stroke)}</td><td>${esc(r.load)}</td><td>${esc(r.power)}</td>
        <td>${esc(r.gearbox)}</td><td class="log-note-cell">${esc(r.note)}</td>
      </tr>`
    ).join('');
    el.innerHTML = `<div class="tool-layout single"><div class="panel">
      <div class="panel-head"><h2>抽油机</h2><p>游梁式抽油机规格参数库，共 ${PUMPING_UNIT_SPECS.length} 条。API 标准扭矩因子与冲程系列。</p></div>
      <div class="panel-body">
        <div class="query-toolbar"><input type="search" id="pu-filter" class="search-input" placeholder="搜索型号、类型…"></div>
        <p class="additive-count" id="pu-count">共 ${PUMPING_UNIT_SPECS.length} 条结果</p>
        <div class="table-wrap"><table class="data-table" id="pu-table">
          <thead><tr><th>型号</th><th>类型</th><th>扭矩因子</th><th>冲程 m</th><th>载荷</th><th>功率</th><th>减速器</th><th>说明</th></tr></thead>
          <tbody>${rows}</tbody>
        </table></div>
      </div></div></div>`;
    const table = document.getElementById('pu-table');
    const countEl = document.getElementById('pu-count');
    document.getElementById('pu-filter')?.addEventListener('input', () => {
      const q = (document.getElementById('pu-filter')?.value || '').toLowerCase();
      let n = 0;
      table?.querySelectorAll('tbody tr').forEach((tr) => {
        const ok = !q || tr.dataset.search.toLowerCase().includes(q);
        tr.style.display = ok ? '' : 'none';
        if (ok) n++;
      });
      if (countEl) countEl.textContent = `共 ${n} 条结果`;
    });
  },

  'downhole-pump'(el) {
    const types = [...new Set(DOWNHOLE_PUMP_SPECS.map((r) => r.type))];
    const pills = `<button type="button" class="cat-pill active" data-type="全部">全部</button>` +
      types.map((t) => `<button type="button" class="cat-pill dhp-pill" data-type="${esc(t)}">${esc(t)}</button>`).join('');
    const rows = DOWNHOLE_PUMP_SPECS.map((r) =>
      `<tr data-type="${esc(r.type)}" data-search="${esc(r.type + r.barrel + r.note)}">
        <td>${esc(r.type)}</td><td>${esc(r.barrel)}</td><td>${esc(r.plunger)}</td>
        <td>${esc(r.length)}</td><td>${esc(r.capacity)}</td><td>${esc(r.stroke)}</td>
        <td class="log-note-cell">${esc(r.note)}</td>
      </tr>`
    ).join('');
    el.innerHTML = `<div class="tool-layout single"><div class="panel">
      <div class="panel-head"><h2>抽油泵</h2><p>井下抽油泵规格参数库，共 ${DOWNHOLE_PUMP_SPECS.length} 条。管式泵 / 杆式泵 / 螺杆泵等。</p></div>
      <div class="panel-body">
        <div class="query-toolbar"><input type="search" id="dhp-filter" class="search-input" placeholder="搜索泵型、泵径…"></div>
        <div class="filter-label">按类型筛选</div>
        <div class="cat-pills" id="dhp-pills">${pills}</div>
        <p class="additive-count" id="dhp-count">共 ${DOWNHOLE_PUMP_SPECS.length} 条结果</p>
        <div class="table-wrap"><table class="data-table" id="dhp-table">
          <thead><tr><th>类型</th><th>泵筒 mm</th><th>柱塞</th><th>长度</th><th>排量</th><th>冲程</th><th>说明</th></tr></thead>
          <tbody>${rows}</tbody>
        </table></div>
      </div></div></div>`;
    let active = '全部';
    const table = document.getElementById('dhp-table');
    const countEl = document.getElementById('dhp-count');
    function apply() {
      const q = (document.getElementById('dhp-filter')?.value || '').toLowerCase();
      let n = 0;
      table?.querySelectorAll('tbody tr').forEach((tr) => {
        const ok = (active === '全部' || tr.dataset.type === active) && (!q || tr.dataset.search.toLowerCase().includes(q));
        tr.style.display = ok ? '' : 'none';
        if (ok) n++;
      });
      if (countEl) countEl.textContent = `共 ${n} 条结果`;
    }
    document.getElementById('dhp-filter')?.addEventListener('input', apply);
    document.getElementById('dhp-pills')?.addEventListener('click', (e) => {
      const btn = e.target.closest('.dhp-pill, .cat-pill');
      if (!btn) return;
      e.preventDefault();
      active = btn.dataset.type;
      document.querySelectorAll('#dhp-pills .cat-pill').forEach((p) => p.classList.toggle('active', p === btn));
      apply();
    });
  },

  'sucker-rod'(el) {
    const grades = [...new Set(SUCKER_ROD_SPECS.map((r) => r.grade))];
    const pills = `<button type="button" class="cat-pill active" data-grade="全部">全部</button>` +
      grades.map((g) => `<button type="button" class="cat-pill rod-pill" data-grade="${esc(g)}">${esc(g)}</button>`).join('');
    const rows = SUCKER_ROD_SPECS.map((r) =>
      `<tr data-grade="${esc(r.grade)}" data-search="${esc(r.grade + r.od + r.note)}">
        <td><strong>${esc(r.grade)}</strong></td><td>${r.od}"</td><td>${r.odMm}</td>
        <td>${r.weight}</td><td>${r.yield}</td><td>${r.tensile}</td>
        <td>${esc(r.coupling)}</td><td class="log-note-cell">${esc(r.note)}</td>
      </tr>`
    ).join('');
    el.innerHTML = `<div class="tool-layout single"><div class="panel">
      <div class="panel-head"><h2>抽油杆</h2><p>API Spec 11B 抽油杆规格参数库，共 ${SUCKER_ROD_SPECS.length} 条。钢级、杆径与螺纹扣型。</p></div>
      <div class="panel-body">
        <div class="query-toolbar"><input type="search" id="rod-filter" class="search-input" placeholder="搜索钢级、杆径…"></div>
        <div class="filter-label">按钢级筛选</div>
        <div class="cat-pills" id="rod-pills">${pills}</div>
        <p class="additive-count" id="rod-count">共 ${SUCKER_ROD_SPECS.length} 条结果</p>
        <div class="table-wrap"><table class="data-table" id="rod-table">
          <thead><tr><th>钢级</th><th>杆径</th><th>OD mm</th><th>重量 kg/m</th><th>屈服 MPa</th><th>抗拉 MPa</th><th>扣型</th><th>说明</th></tr></thead>
          <tbody>${rows}</tbody>
        </table></div>
      </div></div></div>`;
    let active = '全部';
    const table = document.getElementById('rod-table');
    const countEl = document.getElementById('rod-count');
    function apply() {
      const q = (document.getElementById('rod-filter')?.value || '').toLowerCase();
      let n = 0;
      table?.querySelectorAll('tbody tr').forEach((tr) => {
        const ok = (active === '全部' || tr.dataset.grade === active) && (!q || tr.dataset.search.toLowerCase().includes(q));
        tr.style.display = ok ? '' : 'none';
        if (ok) n++;
      });
      if (countEl) countEl.textContent = `共 ${n} 条结果`;
    }
    document.getElementById('rod-filter')?.addEventListener('input', apply);
    document.getElementById('rod-pills')?.addEventListener('click', (e) => {
      const btn = e.target.closest('.rod-pill, .cat-pill');
      if (!btn) return;
      e.preventDefault();
      active = btn.dataset.grade;
      document.querySelectorAll('#rod-pills .cat-pill').forEach((p) => p.classList.toggle('active', p === btn));
      apply();
    });
  },

  'choke-coefficient'(el) {
    const rows = CHOKE_COEFFICIENTS.map((r) =>
      `<tr data-search="${esc((r.type || '') + (r.name || '') + (r.size || '') + r.note)}">
        <td><strong>${esc(r.name || r.type)}</strong></td><td>${esc(r.size || '—')}</td>
        <td>${esc(r.cv)}</td><td>${esc(r.flow)}</td><td>${esc(r.pressure)}</td>
        <td class="log-note-cell">${esc(r.note)}</td>
      </tr>`
    ).join('');
    el.innerHTML = `<div class="tool-layout single"><div class="panel">
      <div class="panel-head"><h2>油嘴系数</h2><p>油嘴流量系数与 Bean 嘴参考，共 ${CHOKE_COEFFICIENTS.length} 条。Cv 为流量系数参考值。</p></div>
      <div class="panel-body">
        <div class="query-toolbar"><input type="search" id="choke-filter" class="search-input" placeholder="搜索油嘴尺寸、类型…"></div>
        <p class="additive-count" id="choke-count">共 ${CHOKE_COEFFICIENTS.length} 条结果</p>
        <div class="table-wrap"><table class="data-table" id="choke-table">
          <thead><tr><th>类型</th><th>尺寸</th><th>Cv</th><th>参考流量</th><th>压差条件</th><th>说明</th></tr></thead>
          <tbody>${rows}</tbody>
        </table></div>
      </div></div></div>`;
    const table = document.getElementById('choke-table');
    const countEl = document.getElementById('choke-count');
    document.getElementById('choke-filter')?.addEventListener('input', () => {
      const q = (document.getElementById('choke-filter')?.value || '').toLowerCase();
      let n = 0;
      table?.querySelectorAll('tbody tr').forEach((tr) => {
        const ok = !q || tr.dataset.search.toLowerCase().includes(q);
        tr.style.display = ok ? '' : 'none';
        if (ok) n++;
      });
      if (countEl) countEl.textContent = `共 ${n} 条结果`;
    });
  },

  'api-gravity'(el) {
    const refRows = API_GRAVITY_REF.map((r) =>
      `<tr><td><strong>${r.api}°</strong></td><td>${r.sg}</td><td>${esc(r.density)}</td><td>${esc(r.type)}</td><td>${esc(r.note)}</td></tr>`
    ).join('');
    el.innerHTML = `<div class="tool-layout single">
      <div class="panel">
        <div class="panel-head"><h2>API 度</h2><p>原油 API 重度与比重换算。公式：API° = 141.5 / SG − 131.5</p></div>
        <div class="panel-body">
          <div class="calc-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:24px">
            <div class="panel" style="border:1px solid var(--border);border-radius:var(--radius-sm);padding:16px">
              <h3 style="font-size:14px;margin-bottom:12px">比重 → API 度</h3>
              ${field('比重 SG', 'api-sg', '—', 'number', 'any', '0.85')}
              <div id="api-from-sg-result" style="margin-top:12px"></div>
            </div>
            <div class="panel" style="border:1px solid var(--border);border-radius:var(--radius-sm);padding:16px">
              <h3 style="font-size:14px;margin-bottom:12px">API 度 → 比重</h3>
              ${field('API 度', 'api-deg', '°', 'number', 'any', '35')}
              <div id="api-from-deg-result" style="margin-top:12px"></div>
            </div>
          </div>
          <section class="param-section">
            <h3 class="param-section-title">常见原油 API 度对照</h3>
            <div class="table-wrap"><table class="data-table">
              <thead><tr><th>API°</th><th>比重 SG</th><th>密度</th><th>分类</th><th>说明</th></tr></thead>
              <tbody>${refRows}</tbody>
            </table></div>
          </section>
        </div>
      </div>
    </div>`;
    const update = () => {
      const sg = +document.getElementById('api-sg')?.value;
      const deg = +document.getElementById('api-deg')?.value;
      if (sg) {
        const r = apiFromGravity(sg);
        document.getElementById('api-from-sg-result').innerHTML =
          resultHighlight('API 度', r.api.toFixed(1), '°') +
          resultRows([['密度', `${r.densityGcm3.toFixed(4)} g/cm³`]]);
      }
      if (deg || deg === 0) {
        const r = fromApiGravity(deg);
        document.getElementById('api-from-deg-result').innerHTML =
          resultHighlight('比重 SG', r.sg.toFixed(4), '') +
          resultRows([['密度', `${r.densityGcm3.toFixed(4)} g/cm³`]]);
      }
    };
    el.querySelectorAll('input').forEach((i) => i.addEventListener('input', update));
    update();
  },

  'esp-pump'(el) {
    const series = [...new Set(ESP_PUMP_SPECS.map((r) => r.series))];
    const pills = `<button type="button" class="cat-pill active" data-series="全部">全部</button>` +
      series.map((s) => `<button type="button" class="cat-pill esp-pill" data-series="${esc(s)}">${esc(s)}</button>`).join('');
    const rows = ESP_PUMP_SPECS.map((r) =>
      `<tr data-series="${esc(r.series)}" data-search="${esc(r.series + r.flow + r.note)}">
        <td><strong>${esc(r.series)}</strong></td><td>${esc(r.stages)}</td><td>${esc(r.od)}</td>
        <td>${esc(r.flow)}</td><td>${esc(r.head)}</td><td>${esc(r.power)}</td>
        <td class="log-note-cell">${esc(r.note)}</td>
      </tr>`
    ).join('');
    el.innerHTML = `<div class="tool-layout single"><div class="panel">
      <div class="panel-head"><h2>ESP 电潜泵</h2><p>电潜离心泵规格参数库，共 ${ESP_PUMP_SPECS.length} 条。系列、级数、排量与扬程。</p></div>
      <div class="panel-body">
        <div class="query-toolbar"><input type="search" id="esp-filter" class="search-input" placeholder="搜索系列、排量…"></div>
        <div class="filter-label">按系列筛选</div>
        <div class="cat-pills" id="esp-pills">${pills}</div>
        <p class="additive-count" id="esp-count">共 ${ESP_PUMP_SPECS.length} 条结果</p>
        <div class="table-wrap"><table class="data-table" id="esp-table">
          <thead><tr><th>系列</th><th>级数</th><th>外径</th><th>排量</th><th>扬程</th><th>功率</th><th>说明</th></tr></thead>
          <tbody>${rows}</tbody>
        </table></div>
      </div></div></div>`;
    let active = '全部';
    const table = document.getElementById('esp-table');
    const countEl = document.getElementById('esp-count');
    function apply() {
      const q = (document.getElementById('esp-filter')?.value || '').toLowerCase();
      let n = 0;
      table?.querySelectorAll('tbody tr').forEach((tr) => {
        const ok = (active === '全部' || tr.dataset.series === active) && (!q || tr.dataset.search.toLowerCase().includes(q));
        tr.style.display = ok ? '' : 'none';
        if (ok) n++;
      });
      if (countEl) countEl.textContent = `共 ${n} 条结果`;
    }
    document.getElementById('esp-filter')?.addEventListener('input', apply);
    document.getElementById('esp-pills')?.addEventListener('click', (e) => {
      const btn = e.target.closest('.esp-pill, .cat-pill');
      if (!btn) return;
      e.preventDefault();
      active = btn.dataset.series;
      document.querySelectorAll('#esp-pills .cat-pill').forEach((p) => p.classList.toggle('active', p === btn));
      apply();
    });
  },
};

function renderTool(id, container) {
  const fn = RENDERERS[id];
  if (!fn) {
    container.innerHTML = '<div class="empty-state"><p>该工具正在开发中</p></div>';
    return;
  }
  container.innerHTML = '';
  fn(container);
}

function getToolIcon(id) {
  const icons = {
    'thread-type': '<path d="M12 2v4M8 6h8M10 10h4M8 14h8M12 18v4"/>',
    'casing-spec': '<rect x="9" y="2" width="6" height="20" rx="3"/>',
    'drillpipe-spec': '<path d="M13 2L7 12h4l-2 10 10-14h-6l4-6z"/>',
    'collar-spec': '<rect x="7" y="4" width="10" height="16" rx="1"/><line x1="10" y1="8" x2="10" y2="16"/><line x1="14" y1="8" x2="14" y2="16"/>',
    'tubing-spec': '<ellipse cx="12" cy="12" rx="10" ry="4"/><line x1="2" y1="12" x2="22" y2="12"/>',
    'casing-strength': '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/>',
    'drillpipe-strength': '<circle cx="12" cy="12" r="9"/><path d="M8 12h8"/>',
    'steel-grade': '<path d="M12 2l8 4v6c0 5-3.5 8.5-8 10C7.5 20.5 4 17 4 12V6l8-4z"/>',
    'wire-rope': '<path d="M4 8c4-4 12-4 16 0"/><path d="M6 14h2v4H6z"/>',
    'nozzle-tfa': '<path d="M4 4h16l-6 8v8l-4-2v-6L4 4z"/>',
    'mud-pump': '<rect x="4" y="6" width="16" height="12" rx="2"/><path d="M8 10h2v4H8zM14 10h2v4h-2z"/>',
    'bit-iadc': '<path d="M12 2l3 6h6l-5 4 2 7-6-4-6 4 2-7-5-4h6z"/>',
    'rock-density': '<path d="M4 18l4-8 4 4 4-10 4 14H4z"/>',
    'well-log': '<path d="M4 18V6M8 18V10M12 18V4M16 18v-6M20 18V8"/>',
    'bop': '<path d="M12 2l8 4v6c0 4-3 7-8 9-5-2-8-5-8-9V6l8-4z"/>',
    'wellhead': '<path d="M12 4v16M8 8h8M6 12h12"/>',
    'cement-grade': '<path d="M12 4l-6 4 6 4 6-4-6-4zM6 12l6 4 6-4M6 16l6 4 6-4"/>',
    'cement-additive': '<circle cx="7" cy="8" r="1.5"/><circle cx="12" cy="6" r="1.5"/><circle cx="17" cy="9" r="1.5"/><circle cx="10" cy="13" r="1.5"/><circle cx="15" cy="15" r="1.5"/>',
    'cement-slurry': '<path d="M12 3c-4 6-8 10-8 14a8 8 0 0016 0c0-4-4-8-8-14z"/>',
    'cement-test': '<path d="M9 3h6l1 14H8L9 3z"/><path d="M8 21h8"/>',
    'centralizer': '<circle cx="12" cy="12" r="8"/><line x1="12" y1="4" x2="12" y2="20"/>',
    'perforation-spec': '<rect x="5" y="5" width="14" height="14" rx="2"/><circle cx="9" cy="9" r="1.2"/><circle cx="15" cy="9" r="1.2"/><circle cx="9" cy="15" r="1.2"/><circle cx="15" cy="15" r="1.2"/>',
    'screen-spec': '<ellipse cx="12" cy="12" rx="9" ry="5"/><line x1="3" y1="12" x2="21" y2="12"/>',
    'acidizing-formula': '<path d="M9 3h6l1 14H8L9 3z"/><path d="M10 18c0 1 1 2 2 2s2-1 2-2"/>',
    'pumping-unit': '<path d="M4 18h16M6 18V8l4-3 4 5 4-7 4 5v10"/>',
    'downhole-pump': '<rect x="9" y="3" width="6" height="18" rx="2"/><line x1="12" y1="7" x2="12" y2="17"/>',
    'sucker-rod': '<path d="M12 2v20M8 8l4-4 4 4M8 16l4 4 4-4"/>',
    'choke-coefficient': '<path d="M4 8h16l-8 10z"/><line x1="6" y1="18" x2="18" y2="18"/>',
    'api-gravity': '<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="9" ry="4"/><line x1="3" y1="12" x2="21" y2="12"/>',
    'esp-pump': '<rect x="8" y="4" width="8" height="16" rx="2"/><line x1="10" y1="8" x2="14" y2="8"/><line x1="10" y1="12" x2="14" y2="12"/><line x1="10" y1="16" x2="14" y2="16"/>',
    'recommended-params': '<line x1="8" y1="6" x2="8" y2="18"/><line x1="12" y1="6" x2="12" y2="18"/><line x1="16" y1="6" x2="16" y2="18"/>',
    'makeup-torque': '<path d="M12 2a10 10 0 1 0 0 20"/><path d="M12 6v6l4 2"/>',
    'mud-additive': '<circle cx="6" cy="8" r="2"/><circle cx="12" cy="6" r="2"/><circle cx="18" cy="10" r="2"/><circle cx="10" cy="14" r="2"/><circle cx="16" cy="16" r="2"/>',
    'unit-convert': '<path d="M4 12h16M16 8l4 4-4 4M8 16l-4-4 4-4"/>',
  };
  const path = icons[id] || '<circle cx="12" cy="12" r="8"/>';
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`;
}

window.DTTools = { renderTool, getToolIcon };
})();
