/* Drilling Toolkit — categories, tools & reference data */
(function () {
'use strict';

/** 关联的独立计算器页面 */
const EXTERNAL_LINKS = {
  drillingFluidCalculator: 'https://iliunian1111.github.io/drilling-fluid-calculator/',
  wellCementingCalculator: 'https://iliunian1111.github.io/well-cementing/',
};

/** 微信公众号推广 */
const WECHAT_PROMO = {
  image: 'wechat-promo.png',
  account: '能源数库',
  tagline: '获取更多钻井干货、实用工具与行业资料',
};

const CATEGORIES = [
  {
    id: 'tubular',
    name: '管柱与扣型',
    desc: '钻杆、套管、钻铤、油管规格与螺纹扣型查询',
    color: '#16a34a',
    bg: 'rgba(22, 163, 74, 0.1)',
  },
  {
    id: 'strength',
    name: '强度与载荷',
    desc: '管柱强度校核、钢级参数与钢丝绳载荷计算',
    color: '#9333ea',
    bg: 'rgba(147, 51, 234, 0.1)',
  },
  {
    id: 'hydraulics',
    name: '水力与泵送',
    desc: '喷嘴流面积、泥浆泵排量与泵压估算',
    color: '#2563eb',
    bg: 'rgba(37, 99, 235, 0.1)',
  },
  {
    id: 'bit-formation',
    name: '钻头与地层',
    desc: 'IADC 钻头编码、岩石密度与测井曲线参考',
    color: '#ea580c',
    bg: 'rgba(234, 88, 12, 0.1)',
  },
  {
    id: 'wellcontrol',
    name: '井控与井口',
    desc: '防喷器型号与井口工具规格查询',
    color: '#dc2626',
    bg: 'rgba(220, 38, 38, 0.1)',
  },
  {
    id: 'cementing',
    name: '固井',
    desc: '油井水泥等级、外加剂、浆体性能、试验标准与扶正器规格',
    color: '#ea580c',
    bg: 'rgba(234, 88, 12, 0.1)',
  },
  {
    id: 'completion',
    name: '完井增产',
    desc: '射孔、筛管与酸化施工参数',
    color: '#ea580c',
    bg: 'rgba(234, 88, 12, 0.1)',
  },
  {
    id: 'production',
    name: '采油',
    desc: '机采设备规格、抽油杆柱与流量参数',
    color: '#0d9488',
    bg: 'rgba(13, 148, 136, 0.1)',
  },
  {
    id: 'engineering',
    name: '工程辅助',
    desc: '钻井参数推荐、扭矩换算、单位转换等',
    color: '#0d9488',
    bg: 'rgba(13, 148, 136, 0.1)',
  },
];

/** 侧栏与首页按油气井施工业务域分组 */
const DOMAINS = [
  {
    id: 'drilling',
    name: '钻井',
    desc: '钻柱规格、强度校核、水力计算、钻头地层、测井与井控',
    color: '#2563eb',
    bg: 'rgba(37, 99, 235, 0.1)',
  },
  {
    id: 'cementing',
    name: '固井',
    desc: '水泥等级、外加剂、浆体性能、试验标准与扶正器',
    color: '#ea580c',
    bg: 'rgba(234, 88, 12, 0.1)',
  },
  {
    id: 'mud',
    name: '钻井液',
    desc: '钻井液处理剂加量与配方参考',
    color: '#16a34a',
    bg: 'rgba(22, 163, 74, 0.1)',
  },
  {
    id: 'completion',
    name: '完井增产',
    desc: '射孔参数、防砂筛管与酸化液配方',
    color: '#9333ea',
    bg: 'rgba(147, 51, 234, 0.1)',
  },
  {
    id: 'production',
    name: '采油',
    desc: '油管规格、机采设备与流体参数',
    color: '#0d9488',
    bg: 'rgba(13, 148, 136, 0.1)',
  },
];

const TOOLS = [
  { id: 'thread-type', name: '钻具扣型', domain: 'drilling', category: 'tubular', type: 'query', color: '#16a34a', keywords: ['API', '螺纹', '扣型', 'NC', 'REG', 'FH', 'IF', '接头代号'] },
  { id: 'casing-spec', name: '套管规格', domain: 'drilling', category: 'tubular', type: 'query', color: '#ea580c', keywords: ['套管', '外径', '壁厚', '钢级'] },
  { id: 'drillpipe-spec', name: '钻杆规格', domain: 'drilling', category: 'tubular', type: 'query', color: '#db2777', keywords: ['钻杆', 'API', '5DP', 'E75', 'G105', 'S135'] },
  { id: 'collar-spec', name: '钻铤规格', domain: 'drilling', category: 'tubular', type: 'query', color: '#16a34a', keywords: ['钻铤', 'DC', '螺旋', '加重钻杆'] },
  { id: 'tubing-spec', name: '油管规格', domain: 'production', category: 'tubular', type: 'query', color: '#0d9488', keywords: ['油管', 'API', '5CT', 'J55', 'N80', 'P110'] },
  { id: 'casing-strength', name: '套管强度', domain: 'drilling', category: 'strength', type: 'calc', color: '#9333ea', keywords: ['抗内压', '抗外挤', '抗拉'] },
  { id: 'drillpipe-strength', name: '钻杆强度', domain: 'drilling', category: 'strength', type: 'calc', color: '#ca8a04', keywords: ['扭转', '拉伸', '屈服'] },
  { id: 'steel-grade', name: '钢级强度', domain: 'drilling', category: 'strength', type: 'query', color: '#16a34a', keywords: ['H40', 'J55', 'P110', 'Q125'] },
  { id: 'wire-rope', name: '钢丝绳载荷', domain: 'drilling', category: 'strength', type: 'calc', color: '#ea580c', keywords: ['破断', '安全系数', '吊载'] },
  { id: 'nozzle-tfa', name: '喷嘴流面积', domain: 'drilling', category: 'hydraulics', type: 'calc', color: '#2563eb', keywords: ['TFA', '喷嘴', '水力'] },
  { id: 'mud-pump', name: '泥浆泵', domain: 'drilling', category: 'hydraulics', type: 'calc', color: '#dc2626', keywords: ['排量', '冲程', '缸径'] },
  { id: 'bit-iadc', name: '钻头 IADC', domain: 'drilling', category: 'bit-formation', type: 'reference', color: '#2563eb', keywords: ['三码', '钻头', '地层'] },
  { id: 'rock-density', name: '岩石密度', domain: 'drilling', category: 'bit-formation', type: 'reference', color: '#2563eb', keywords: ['岩性', '密度', '孔隙度'] },
  { id: 'well-log', name: '测井曲线', domain: 'drilling', category: 'bit-formation', type: 'reference', color: '#ea580c', keywords: ['GR', 'RHOB', 'NPHI', '电阻率', '声波', '岩性', '油气层'] },
  { id: 'bop', name: 'BOP 防喷器', domain: 'drilling', category: 'wellcontrol', type: 'query', color: '#ea580c', keywords: ['闸板', '环形', '工作压力'] },
  { id: 'wellhead', name: '井口工具', domain: 'drilling', category: 'wellcontrol', type: 'query', color: '#db2777', keywords: ['套管头', '法兰', '采油树'] },
  { id: 'cement-grade', name: '水泥等级', domain: 'cementing', category: 'cementing', type: 'query', color: '#ea580c', keywords: ['API', '10A', 'G级', 'H级', '油井水泥'] },
  { id: 'cement-additive', name: '水泥外加剂', domain: 'cementing', category: 'cementing', type: 'reference', color: '#db2777', keywords: ['促凝', '缓凝', '降失水', '减轻', '加重'] },
  { id: 'cement-slurry', name: '水泥浆性能', domain: 'cementing', category: 'cementing', type: 'reference', color: '#16a34a', keywords: ['密度', '稠化', '失水', '抗压', '固井'] },
  { id: 'cement-test', name: '试验项目', domain: 'cementing', category: 'cementing', type: 'reference', color: '#0d9488', keywords: ['API', '10B', '实验室', '检测'] },
  { id: 'centralizer', name: '扶正器', domain: 'cementing', category: 'cementing', type: 'query', color: '#9333ea', keywords: ['扶正', '套管', '居中度', '弹性', '刚性'] },
  { id: 'perforation-spec', name: '射孔参数', domain: 'completion', category: 'completion', type: 'reference', color: '#ea580c', keywords: ['射孔', '孔密', '相位', '穿透', '弹型'] },
  { id: 'screen-spec', name: '筛管规格', domain: 'completion', category: 'completion', type: 'query', color: '#db2777', keywords: ['筛管', '砾石', '防砂', '割缝', '绕丝'] },
  { id: 'acidizing-formula', name: '酸化液配方', domain: 'completion', category: 'completion', type: 'reference', color: '#16a34a', keywords: ['酸化', '盐酸', 'HF', '土酸', '压裂酸'] },
  { id: 'pumping-unit', name: '抽油机', domain: 'production', category: 'production', type: 'query', color: '#0d9488', keywords: ['抽油机', '游梁', 'API', 'CYJ', '扭矩'] },
  { id: 'downhole-pump', name: '抽油泵', domain: 'production', category: 'production', type: 'query', color: '#9333ea', keywords: ['抽油泵', '管式泵', '杆式泵', '柱塞', '泵径'] },
  { id: 'sucker-rod', name: '抽油杆', domain: 'production', category: 'production', type: 'query', color: '#ea580c', keywords: ['抽油杆', 'API', 'D级', 'K级', '杆柱'] },
  { id: 'choke-coefficient', name: '油嘴系数', domain: 'production', category: 'production', type: 'reference', color: '#dc2626', keywords: ['油嘴', '嘴子', '流量系数', 'Bean'] },
  { id: 'api-gravity', name: 'API 度', domain: 'production', category: 'production', type: 'calc', color: '#db2777', keywords: ['API', '比重', '密度', '原油'] },
  { id: 'esp-pump', name: 'ESP 电潜泵', domain: 'production', category: 'production', type: 'query', color: '#16a34a', keywords: ['电潜泵', 'ESP', '离心泵', '扬程', '排量'] },
  { id: 'recommended-params', name: '钻井参数推荐', domain: 'drilling', category: 'engineering', type: 'reference', color: '#ea580c', keywords: ['钻压', '转速', '排量', '井眼', '环空返速', 'WOB'] },
  { id: 'makeup-torque', name: '上扣扭矩', domain: 'drilling', category: 'engineering', type: 'calc', color: '#0d9488', keywords: ['扭矩', '上扣', '螺纹'] },
  { id: 'mud-additive', name: '钻井液处理剂', domain: 'mud', category: 'engineering', type: 'reference', color: '#db2777', keywords: ['处理剂', '加量', '钻井液'], external: 'https://github.com' },
  { id: 'unit-convert', name: '换算系数', domain: 'drilling', category: 'engineering', type: 'calc', color: '#0d9488', keywords: ['单位', '换算', '压力', '密度'] },
];

const THREAD_FAMILIES = ['全部', 'NC / IF', 'FH', 'REG'];

const THREAD_TYPES = [
  // ── NC 系列 ──
  { name: 'NC26 (2-3/8")', family: 'NC / IF', sizeKey: '2-3/8"', code: 'NC26×NC26', threadForm: 'V-0.038', tpi: '4 扣/英寸', taper: '2"/ft（径向）', pinOd: '65.08 mm', boxId: '84.14 mm', pipeRange: '2-3/8"', use: '小尺寸钻杆、工具接头', desc: 'API 标准数字扣型，台肩密封，水力通路较好' },
  { name: 'NC31 (2-7/8")', family: 'NC / IF', sizeKey: '2-7/8"', code: 'NC31×NC31', threadForm: 'V-0.038', tpi: '4 扣/英寸', taper: '2"/ft（径向）', pinOd: '76.20 mm', boxId: '96.84 mm', pipeRange: '2-7/8"', use: '钻杆、钻铤、短节', desc: '中浅井常用，与 2-7/8" 钻杆配套' },
  { name: 'NC38 (3-1/2")', family: 'NC / IF', sizeKey: '3-1/2"', code: 'NC38×NC38', threadForm: 'V-0.038', tpi: '4 扣/英寸', taper: '2"/ft（径向）', pinOd: '92.08 mm', boxId: '114.30 mm', pipeRange: '3-1/2"', use: '钻杆、钻铤', desc: '常规水基钻井最常用扣型之一' },
  { name: 'NC40 (4")', family: 'NC / IF', sizeKey: '4"', code: 'NC40×NC40', threadForm: 'V-0.038', tpi: '4 扣/英寸', taper: '2"/ft（径向）', pinOd: '104.78 mm', boxId: '127.00 mm', pipeRange: '4"', use: '钻杆、工具接头', desc: '4" 钻杆标准扣型' },
  { name: 'NC46 (4-1/2")', family: 'NC / IF', sizeKey: '4-1/2"', code: 'NC46×NC46', threadForm: 'V-0.038', tpi: '4 扣/英寸', taper: '2"/ft（径向）', pinOd: '117.48 mm', boxId: '141.29 mm', pipeRange: '4-1/2"', use: '钻杆、方钻杆、钻铤', desc: '中深井 4-1/2" 钻杆主流扣型' },
  { name: 'NC50 (5")', family: 'NC / IF', sizeKey: '5"', code: 'NC50×NC50', threadForm: 'V-0.038', tpi: '4 扣/英寸', taper: '2"/ft（径向）', pinOd: '130.18 mm', boxId: '154.78 mm', pipeRange: '5"', use: '钻杆、钻铤', desc: '深井大扭矩传递，5" 钻杆标准扣' },
  { name: 'NC56 (5-1/2")', family: 'NC / IF', sizeKey: '5-1/2"', code: 'NC56×NC56', threadForm: 'V-0.038', tpi: '4 扣/英寸', taper: '2"/ft（径向）', pinOd: '142.88 mm', boxId: '168.28 mm', pipeRange: '5-1/2"', use: '钻杆', desc: '大尺寸钻杆，高抗扭' },
  { name: 'NC61 (6-5/8")', family: 'NC / IF', sizeKey: '6-5/8"', code: 'NC61×NC61', threadForm: 'V-0.038', tpi: '4 扣/英寸', taper: '2"/ft（径向）', pinOd: '168.28 mm', boxId: '195.58 mm', pipeRange: '6-5/8"', use: '钻铤、特殊工具', desc: '大尺寸 NC 扣，钻铤上端常用' },

  // ── IF 内平式 ──
  { name: 'IF (2-3/8")', family: 'NC / IF', sizeKey: '2-3/8"', code: 'IF×IF', threadForm: 'V-0.038', tpi: '4 扣/英寸', taper: '2"/ft（径向）', pinOd: '65.08 mm', boxId: '73.02 mm', pipeRange: '2-3/8"', use: '内平式钻杆', desc: '内径平齐，水力性能好，降低压耗' },
  { name: 'IF (2-7/8")', family: 'NC / IF', sizeKey: '2-7/8"', code: 'IF×IF', threadForm: 'V-0.038', tpi: '4 扣/英寸', taper: '2"/ft（径向）', pinOd: '76.20 mm', boxId: '85.73 mm', pipeRange: '2-7/8"', use: '内平式钻杆', desc: '内平结构，环空紊流好' },
  { name: 'IF (4")', family: 'NC / IF', sizeKey: '4"', code: 'IF×IF', threadForm: 'V-0.038', tpi: '4 扣/英寸', taper: '2"/ft（径向）', pinOd: '104.78 mm', boxId: '114.30 mm', pipeRange: '4"', use: '内平式钻杆', desc: '大排量钻进优选扣型' },
  { name: 'IF (4-1/2")', family: 'NC / IF', sizeKey: '4-1/2"', code: 'IF×IF', threadForm: 'V-0.038', tpi: '4 扣/英寸', taper: '2"/ft（径向）', pinOd: '117.48 mm', boxId: '127.00 mm', pipeRange: '4-1/2"', use: '内平式钻杆', desc: '深井大排量，内平水力优化' },
  { name: 'IF (5-1/2")', family: 'NC / IF', sizeKey: '5-1/2"', code: 'IF×IF', threadForm: 'V-0.038', tpi: '4 扣/英寸', taper: '2"/ft（径向）', pinOd: '142.88 mm', boxId: '154.78 mm', pipeRange: '5-1/2"', use: '内平式钻杆', desc: '5-1/2" 内平钻杆配套扣型' },

  // ── FH 全孔式 ──
  { name: 'FH (4-1/2")', family: 'FH', sizeKey: '4-1/2"', code: 'FH×FH', threadForm: '平式', tpi: '4 扣/英寸', taper: '2"/ft（径向）', pinOd: '117.48 mm', boxId: '127.00 mm', pipeRange: '4-1/2"', use: '顶部驱动、特殊钻具', desc: '全孔式，金属密封，耐高压' },
  { name: 'FH (6-5/8")', family: 'FH', sizeKey: '6-5/8"', code: 'FH×FH', threadForm: '平式', tpi: '4 扣/英寸', taper: '2"/ft（径向）', pinOd: '168.28 mm', boxId: '181.61 mm', pipeRange: '6-5/8"', use: '钻铤、震击器、加速器', desc: '大尺寸工具接头，抗内压强' },
  { name: 'FH (8")', family: 'FH', sizeKey: '8"', code: 'FH×FH', threadForm: '平式', tpi: '4 扣/英寸', taper: '2"/ft（径向）', pinOd: '203.20 mm', boxId: '219.08 mm', pipeRange: '8"', use: '钻铤、特殊工具', desc: '大井眼钻铤连接，全孔金属密封' },
  { name: 'FH (9-1/2")', family: 'FH', sizeKey: '9-1/2"', code: 'FH×FH', threadForm: '平式', tpi: '4 扣/英寸', taper: '2"/ft（径向）', pinOd: '241.30 mm', boxId: '260.35 mm', pipeRange: '9-1/2"', use: '大尺寸钻铤', desc: '海上深井大尺寸钻具连接' },

  // ── REG 正规扣（钻头 / 工具） ──
  { name: '2-3/8" REG', family: 'REG', sizeKey: '2-3/8"', code: '231A×231A', threadForm: 'V-0.040', tpi: '5 扣/英寸', taper: '1:4 (3"/ft)', pinOd: '47.62 mm', boxId: '68.20 mm', pipeRange: '2-3/8" ~ 3-1/2"', use: '小钻头、取芯工具', desc: '壁厚大、抗扭强、水力差，用于小井眼钻头连接' },
  { name: '2-7/8" REG', family: 'REG', sizeKey: '2-7/8"', code: '287A×287A', threadForm: 'V-0.040', tpi: '5 扣/英寸', taper: '1:4 (3"/ft)', pinOd: '57.15 mm', boxId: '77.79 mm', pipeRange: '2-7/8" ~ 4"', use: '钻头、螺杆、工具', desc: '小井眼 PDC / 牙轮钻头常用' },
  { name: '3-1/2" REG', family: 'REG', sizeKey: '3-1/2"', code: '350A×350A', threadForm: 'V-0.040', tpi: '5 扣/英寸', taper: '1:4 (3"/ft)', pinOd: '69.85 mm', boxId: '95.25 mm', pipeRange: '3-1/2" ~ 4-1/2"', use: '钻头、震击器', desc: '中等尺寸钻头连接，抗扭性能好' },
  { name: '4-1/2" REG', family: 'REG', sizeKey: '4-1/2"', code: '450A×450A', threadForm: 'V-0.040', tpi: '5 扣/英寸', taper: '1:4 (3"/ft)', pinOd: '88.90 mm', boxId: '120.65 mm', pipeRange: '4-1/2" ~ 6"', use: '钻头、井下马达', desc: '常规井眼钻头主流 REG 扣型' },
  { name: '5-1/2" REG', family: 'REG', sizeKey: '5-1/2"', code: '550A×550A', threadForm: 'V-0.040', tpi: '5 扣/英寸', taper: '1:4 (3"/ft)', pinOd: '107.95 mm', boxId: '146.05 mm', pipeRange: '5-1/2" ~ 7"', use: '钻头、扩眼器', desc: '大井眼钻头连接，承载扭矩高' },
  { name: '6-5/8" REG', family: 'REG', sizeKey: '6-5/8"', code: '658A×658A', threadForm: 'V-0.040', tpi: '5 扣/英寸', taper: '1:4 (3"/ft)', pinOd: '130.18 mm', boxId: '174.63 mm', pipeRange: '6-5/8" ~ 8"', use: '钻头、特殊工具', desc: '大尺寸钻头，壁厚大抗扭强' },
  { name: '7-5/8" REG', family: 'REG', sizeKey: '7-5/8"', code: '758A×758A', threadForm: 'V-0.040', tpi: '5 扣/英寸', taper: '1:4 (3"/ft)', pinOd: '149.23 mm', boxId: '200.03 mm', pipeRange: '7-5/8" ~ 9"', use: '大钻头、取芯筒', desc: '海上大井眼、取芯作业常用' },
  { name: '8-5/8" REG', family: 'REG', sizeKey: '8-5/8"', code: '858A×858A', threadForm: 'V-0.040', tpi: '5 扣/英寸', taper: '1:4 (3"/ft)', pinOd: '174.63 mm', boxId: '225.43 mm', pipeRange: '8-5/8" ~ 10"', use: '大尺寸钻头', desc: '表层 / 大尺寸井眼钻头连接' },
];

const CASING_SPECS = [
  // 4-1/2" (114.3 mm)
  { od: '4-1/2', odMm: 114.3, weight: 9.5, grade: 'J55', wall: 5.21, id: 103.88, drift: 101.6 },
  { od: '4-1/2', odMm: 114.3, weight: 11.6, grade: 'N80', wall: 6.35, id: 101.6, drift: 99.3 },
  { od: '4-1/2', odMm: 114.3, weight: 13.5, grade: 'P110', wall: 7.37, id: 99.54, drift: 97.2 },
  { od: '4-1/2', odMm: 114.3, weight: 15.1, grade: 'P110', wall: 8.05, id: 98.42, drift: 96.1 },

  // 5" (127.0 mm)
  { od: '5', odMm: 127.0, weight: 11.5, grade: 'J55', wall: 5.59, id: 115.82, drift: 113.5 },
  { od: '5', odMm: 127.0, weight: 15.0, grade: 'P110', wall: 7.52, id: 111.96, drift: 109.5 },
  { od: '5', odMm: 127.0, weight: 18.0, grade: 'P110', wall: 8.85, id: 109.30, drift: 106.9 },

  // 5-1/2" (139.7 mm)
  { od: '5-1/2', odMm: 139.7, weight: 14.0, grade: 'J55', wall: 5.51, id: 128.68, drift: 126.4 },
  { od: '5-1/2', odMm: 139.7, weight: 17.0, grade: 'N80', wall: 7.72, id: 124.26, drift: 121.9 },
  { od: '5-1/2', odMm: 139.7, weight: 20.0, grade: 'P110', wall: 9.17, id: 121.36, drift: 119.0 },
  { od: '5-1/2', odMm: 139.7, weight: 23.0, grade: 'P110', wall: 10.54, id: 118.62, drift: 116.3 },
  { od: '5-1/2', odMm: 139.7, weight: 26.0, grade: 'P110', wall: 11.99, id: 115.72, drift: 113.4 },

  // 6-5/8" (168.3 mm)
  { od: '6-5/8', odMm: 168.3, weight: 20.0, grade: 'J55', wall: 6.88, id: 154.54, drift: 152.2 },
  { od: '6-5/8', odMm: 168.3, weight: 24.0, grade: 'N80', wall: 8.28, id: 151.74, drift: 149.4 },
  { od: '6-5/8', odMm: 168.3, weight: 28.0, grade: 'P110', wall: 9.49, id: 149.32, drift: 147.0 },
  { od: '6-5/8', odMm: 168.3, weight: 32.0, grade: 'P110', wall: 10.59, id: 147.12, drift: 144.8 },

  // 7" (177.8 mm)
  { od: '7', odMm: 177.8, weight: 17.0, grade: 'J55', wall: 5.87, id: 166.06, drift: 163.8 },
  { od: '7', odMm: 177.8, weight: 20.0, grade: 'N80', wall: 6.91, id: 163.98, drift: 161.7 },
  { od: '7', odMm: 177.8, weight: 23.0, grade: 'J55', wall: 7.72, id: 162.36, drift: 159.4 },
  { od: '7', odMm: 177.8, weight: 26.0, grade: 'N80', wall: 8.94, id: 159.92, drift: 157.0 },
  { od: '7', odMm: 177.8, weight: 29.0, grade: 'P110', wall: 9.91, id: 157.98, drift: 155.0 },
  { od: '7', odMm: 177.8, weight: 32.0, grade: 'P110', wall: 11.51, id: 154.78, drift: 151.9 },
  { od: '7', odMm: 177.8, weight: 35.0, grade: 'P110', wall: 12.65, id: 152.50, drift: 149.6 },
  { od: '7', odMm: 177.8, weight: 38.0, grade: 'P110', wall: 13.72, id: 150.36, drift: 147.5 },

  // 7-5/8" (193.7 mm)
  { od: '7-5/8', odMm: 193.7, weight: 20.0, grade: 'N80', wall: 6.35, id: 181.00, drift: 178.7 },
  { od: '7-5/8', odMm: 193.7, weight: 24.0, grade: 'N80', wall: 7.62, id: 178.46, drift: 175.7 },
  { od: '7-5/8', odMm: 193.7, weight: 26.4, grade: 'P110', wall: 8.33, id: 177.04, drift: 174.3 },
  { od: '7-5/8', odMm: 193.7, weight: 29.7, grade: 'P110', wall: 9.35, id: 175.00, drift: 172.2 },
  { od: '7-5/8', odMm: 193.7, weight: 33.7, grade: 'P110', wall: 10.54, id: 172.62, drift: 169.9 },
  { od: '7-5/8', odMm: 193.7, weight: 39.0, grade: 'P110', wall: 12.14, id: 169.42, drift: 166.7 },

  // 7-3/4" (196.9 mm)
  { od: '7-3/4', odMm: 196.9, weight: 20.0, grade: 'N80', wall: 6.35, id: 184.20, drift: 181.9 },
  { od: '7-3/4', odMm: 196.9, weight: 24.0, grade: 'N80', wall: 7.62, id: 181.66, drift: 179.4 },
  { od: '7-3/4', odMm: 196.9, weight: 46.1, grade: 'P110', wall: 14.15, id: 168.60, drift: 166.3 },

  // 8-5/8" (219.1 mm)
  { od: '8-5/8', odMm: 219.1, weight: 24.0, grade: 'J55', wall: 6.35, id: 206.40, drift: 204.1 },
  { od: '8-5/8', odMm: 219.1, weight: 28.0, grade: 'N80', wall: 7.39, id: 204.32, drift: 202.0 },
  { od: '8-5/8', odMm: 219.1, weight: 32.0, grade: 'P110', wall: 8.38, id: 202.34, drift: 200.0 },
  { od: '8-5/8', odMm: 219.1, weight: 36.0, grade: 'P110', wall: 9.27, id: 200.56, drift: 198.3 },
  { od: '8-5/8', odMm: 219.1, weight: 40.0, grade: 'P110', wall: 10.16, id: 198.78, drift: 196.5 },
  { od: '8-5/8', odMm: 219.1, weight: 44.0, grade: 'Q125', wall: 11.05, id: 197.00, drift: 194.7 },
  { od: '8-5/8', odMm: 219.1, weight: 49.0, grade: 'Q125', wall: 12.24, id: 194.62, drift: 192.3 },

  // 8-3/4" (222.3 mm)
  { od: '8-3/4', odMm: 222.3, weight: 36.0, grade: 'P110', wall: 9.17, id: 203.96, drift: 201.7 },
  { od: '8-3/4', odMm: 222.3, weight: 40.0, grade: 'P110', wall: 10.16, id: 201.98, drift: 199.7 },
  { od: '8-3/4', odMm: 222.3, weight: 49.0, grade: 'Q125', wall: 12.24, id: 197.82, drift: 195.5 },

  // 9-5/8" (244.5 mm)
  { od: '9-5/8', odMm: 244.5, weight: 32.3, grade: 'J55', wall: 7.01, id: 230.48, drift: 228.2 },
  { od: '9-5/8', odMm: 244.5, weight: 36.0, grade: 'N80', wall: 8.94, id: 226.62, drift: 223.8 },
  { od: '9-5/8', odMm: 244.5, weight: 40.0, grade: 'N80', wall: 10.03, id: 224.44, drift: 221.7 },
  { od: '9-5/8', odMm: 244.5, weight: 43.5, grade: 'P110', wall: 10.03, id: 224.44, drift: 221.7 },
  { od: '9-5/8', odMm: 244.5, weight: 47.0, grade: 'P110', wall: 11.99, id: 220.52, drift: 217.7 },
  { od: '9-5/8', odMm: 244.5, weight: 53.5, grade: 'Q125', wall: 13.84, id: 216.82, drift: 214.0 },
  { od: '9-5/8', odMm: 244.5, weight: 58.4, grade: 'Q125', wall: 15.11, id: 214.28, drift: 211.5 },

  // 10-3/4" (273.1 mm)
  { od: '10-3/4', odMm: 273.1, weight: 32.75, grade: 'N80', wall: 7.39, id: 258.32, drift: 255.9 },
  { od: '10-3/4', odMm: 273.1, weight: 40.5, grade: 'P110', wall: 8.94, id: 255.22, drift: 252.8 },
  { od: '10-3/4', odMm: 273.1, weight: 45.5, grade: 'P110', wall: 9.98, id: 253.14, drift: 250.7 },
  { od: '10-3/4', odMm: 273.1, weight: 51.0, grade: 'P110', wall: 11.10, id: 250.90, drift: 248.5 },
  { od: '10-3/4', odMm: 273.1, weight: 55.5, grade: 'P110', wall: 12.06, id: 248.98, drift: 246.6 },
  { od: '10-3/4', odMm: 273.1, weight: 60.7, grade: 'P110', wall: 13.06, id: 246.98, drift: 244.6 },

  // 11-3/4" (298.5 mm)
  { od: '11-3/4', odMm: 298.5, weight: 42.0, grade: 'N80', wall: 8.38, id: 281.74, drift: 279.3 },
  { od: '11-3/4', odMm: 298.5, weight: 47.0, grade: 'N80', wall: 9.35, id: 279.80, drift: 277.4 },
  { od: '11-3/4', odMm: 298.5, weight: 54.0, grade: 'P110', wall: 10.59, id: 277.32, drift: 274.9 },
  { od: '11-3/4', odMm: 298.5, weight: 60.0, grade: 'P110', wall: 11.73, id: 275.04, drift: 272.6 },

  // 13-3/8" (339.7 mm)
  { od: '13-3/8', odMm: 339.7, weight: 48.0, grade: 'K55', wall: 7.72, id: 324.26, drift: 321.6 },
  { od: '13-3/8', odMm: 339.7, weight: 54.5, grade: 'K55', wall: 8.38, id: 322.94, drift: 320.1 },
  { od: '13-3/8', odMm: 339.7, weight: 61.0, grade: 'N80', wall: 9.35, id: 321.00, drift: 318.2 },
  { od: '13-3/8', odMm: 339.7, weight: 68.0, grade: 'N80', wall: 10.92, id: 317.86, drift: 315.0 },
  { od: '13-3/8', odMm: 339.7, weight: 72.0, grade: 'P110', wall: 11.65, id: 316.40, drift: 313.5 },
  { od: '13-3/8', odMm: 339.7, weight: 77.0, grade: 'P110', wall: 12.42, id: 314.86, drift: 312.0 },
  { od: '13-3/8', odMm: 339.7, weight: 85.0, grade: 'P110', wall: 13.72, id: 312.26, drift: 309.4 },

  // 16" (406.4 mm)
  { od: '16', odMm: 406.4, weight: 65.0, grade: 'N80', wall: 8.38, id: 389.64, drift: 387.1 },
  { od: '16', odMm: 406.4, weight: 75.0, grade: 'N80', wall: 9.65, id: 387.10, drift: 384.6 },
  { od: '16', odMm: 406.4, weight: 84.0, grade: 'P110', wall: 10.67, id: 385.06, drift: 382.5 },
  { od: '16', odMm: 406.4, weight: 97.0, grade: 'P110', wall: 12.27, id: 381.86, drift: 379.3 },
  { od: '16', odMm: 406.4, weight: 109.0, grade: 'Q125', wall: 13.72, id: 378.96, drift: 376.4 },

  // 18-5/8" (473.1 mm)
  { od: '18-5/8', odMm: 473.1, weight: 87.5, grade: 'K55', wall: 9.65, id: 453.80, drift: 451.1 },
  { od: '18-5/8', odMm: 473.1, weight: 97.5, grade: 'N80', wall: 10.67, id: 451.76, drift: 449.1 },
  { od: '18-5/8', odMm: 473.1, weight: 106.5, grade: 'P110', wall: 11.65, id: 449.80, drift: 447.1 },

  // 20" (508.0 mm)
  { od: '20', odMm: 508.0, weight: 94.0, grade: 'N80', wall: 9.53, id: 488.94, drift: 486.2 },
  { od: '20', odMm: 508.0, weight: 103.0, grade: 'P110', wall: 10.54, id: 486.92, drift: 484.2 },
  { od: '20', odMm: 508.0, weight: 112.0, grade: 'P110', wall: 11.43, id: 485.14, drift: 482.4 },
  { od: '20', odMm: 508.0, weight: 133.0, grade: 'Q125', wall: 13.46, id: 481.08, drift: 478.3 },

  // 24" (609.6 mm)
  { od: '24', odMm: 609.6, weight: 133.3, grade: 'N80', wall: 11.05, id: 587.50, drift: 584.7 },
  { od: '24', odMm: 609.6, weight: 151.0, grade: 'P110', wall: 12.42, id: 584.76, drift: 582.0 },
];

const DRILLPIPE_SPECS = [
  // 2-3/8" (60.3 mm) — NC26
  { od: '2-3/8', odMm: 60.3, weight: 6.65, grade: 'E75', wall: 5.54, id: 49.22, toolJoint: 'NC26', yield: 517 },
  { od: '2-3/8', odMm: 60.3, weight: 6.65, grade: 'G105', wall: 5.54, id: 49.22, toolJoint: 'NC26', yield: 724 },
  { od: '2-3/8', odMm: 60.3, weight: 6.65, grade: 'S135', wall: 5.54, id: 49.22, toolJoint: 'NC26', yield: 931 },

  // 2-7/8" (73.0 mm) — NC31
  { od: '2-7/8', odMm: 73.0, weight: 9.50, grade: 'E75', wall: 5.51, id: 61.98, toolJoint: 'NC31', yield: 517 },
  { od: '2-7/8', odMm: 73.0, weight: 9.50, grade: 'X95', wall: 5.51, id: 61.98, toolJoint: 'NC31', yield: 655 },
  { od: '2-7/8', odMm: 73.0, weight: 9.50, grade: 'G105', wall: 5.51, id: 61.98, toolJoint: 'NC31', yield: 724 },
  { od: '2-7/8', odMm: 73.0, weight: 9.50, grade: 'S135', wall: 5.51, id: 61.98, toolJoint: 'NC31', yield: 931 },
  { od: '2-7/8', odMm: 73.0, weight: 10.40, grade: 'G105', wall: 5.51, id: 61.98, toolJoint: 'NC31', yield: 724 },
  { od: '2-7/8', odMm: 73.0, weight: 10.40, grade: 'S135', wall: 5.51, id: 61.98, toolJoint: 'NC31', yield: 931 },

  // 3-1/2" (88.9 mm) — NC38
  { od: '3-1/2', odMm: 88.9, weight: 9.50, grade: 'E75', wall: 4.85, id: 79.19, toolJoint: 'NC38', yield: 517 },
  { od: '3-1/2', odMm: 88.9, weight: 9.50, grade: 'G105', wall: 4.85, id: 79.19, toolJoint: 'NC38', yield: 724 },
  { od: '3-1/2', odMm: 88.9, weight: 13.30, grade: 'E75', wall: 6.45, id: 76.00, toolJoint: 'NC38', yield: 517 },
  { od: '3-1/2', odMm: 88.9, weight: 13.30, grade: 'X95', wall: 6.45, id: 76.00, toolJoint: 'NC38', yield: 655 },
  { od: '3-1/2', odMm: 88.9, weight: 13.30, grade: 'G105', wall: 6.45, id: 76.00, toolJoint: 'NC38', yield: 724 },
  { od: '3-1/2', odMm: 88.9, weight: 13.30, grade: 'S135', wall: 6.45, id: 76.00, toolJoint: 'NC38', yield: 931 },
  { od: '3-1/2', odMm: 88.9, weight: 15.50, grade: 'G105', wall: 7.72, id: 73.03, toolJoint: 'NC38', yield: 724 },
  { od: '3-1/2', odMm: 88.9, weight: 15.50, grade: 'S135', wall: 7.72, id: 73.03, toolJoint: 'NC38', yield: 931 },

  // 4" (101.6 mm) — NC40
  { od: '4', odMm: 101.6, weight: 14.00, grade: 'E75', wall: 6.65, id: 88.29, toolJoint: 'NC40', yield: 517 },
  { od: '4', odMm: 101.6, weight: 14.00, grade: 'G105', wall: 6.65, id: 88.29, toolJoint: 'NC40', yield: 724 },
  { od: '4', odMm: 101.6, weight: 14.00, grade: 'S135', wall: 6.65, id: 88.29, toolJoint: 'NC40', yield: 931 },
  { od: '4', odMm: 101.6, weight: 15.70, grade: 'G105', wall: 8.38, id: 85.10, toolJoint: 'NC40', yield: 724 },
  { od: '4', odMm: 101.6, weight: 15.70, grade: 'S135', wall: 8.38, id: 85.10, toolJoint: 'NC40', yield: 931 },

  // 4-1/2" (114.3 mm) — NC46
  { od: '4-1/2', odMm: 114.3, weight: 13.75, grade: 'E75', wall: 6.35, id: 101.60, toolJoint: 'NC46', yield: 517 },
  { od: '4-1/2', odMm: 114.3, weight: 16.60, grade: 'E75', wall: 7.11, id: 100.19, toolJoint: 'NC46', yield: 517 },
  { od: '4-1/2', odMm: 114.3, weight: 16.60, grade: 'G105', wall: 7.11, id: 100.19, toolJoint: 'NC46', yield: 724 },
  { od: '4-1/2', odMm: 114.3, weight: 16.60, grade: 'S135', wall: 7.11, id: 100.19, toolJoint: 'NC46', yield: 931 },
  { od: '4-1/2', odMm: 114.3, weight: 19.50, grade: 'G105', wall: 8.38, id: 97.18, toolJoint: 'NC46', yield: 724 },
  { od: '4-1/2', odMm: 114.3, weight: 19.50, grade: 'S135', wall: 8.38, id: 97.18, toolJoint: 'NC46', yield: 931 },
  { od: '4-1/2', odMm: 114.3, weight: 20.00, grade: 'S135', wall: 8.89, id: 96.62, toolJoint: 'NC46', yield: 931 },

  // 5" (127.0 mm) — NC50
  { od: '5', odMm: 127.0, weight: 19.50, grade: 'E75', wall: 7.37, id: 112.26, toolJoint: 'NC50', yield: 517 },
  { od: '5', odMm: 127.0, weight: 19.50, grade: 'G105', wall: 7.37, id: 112.26, toolJoint: 'NC50', yield: 724 },
  { od: '5', odMm: 127.0, weight: 19.50, grade: 'S135', wall: 7.37, id: 112.26, toolJoint: 'NC50', yield: 931 },
  { od: '5', odMm: 127.0, weight: 21.90, grade: 'G105', wall: 8.38, id: 110.36, toolJoint: 'NC50', yield: 724 },
  { od: '5', odMm: 127.0, weight: 21.90, grade: 'S135', wall: 8.38, id: 110.36, toolJoint: 'NC50', yield: 931 },
  { od: '5', odMm: 127.0, weight: 21.90, grade: 'V150', wall: 8.38, id: 110.36, toolJoint: 'NC50', yield: 1034 },

  // 5-1/2" (139.7 mm) — NC56
  { od: '5-1/2', odMm: 139.7, weight: 21.90, grade: 'G105', wall: 7.72, id: 124.26, toolJoint: 'NC56', yield: 724 },
  { od: '5-1/2', odMm: 139.7, weight: 21.90, grade: 'S135', wall: 7.72, id: 124.26, toolJoint: 'NC56', yield: 931 },
  { od: '5-1/2', odMm: 139.7, weight: 24.70, grade: 'S135', wall: 9.19, id: 121.36, toolJoint: 'NC56', yield: 931 },
  { od: '5-1/2', odMm: 139.7, weight: 24.70, grade: 'V150', wall: 9.19, id: 121.36, toolJoint: 'NC56', yield: 1034 },

  // 6-5/8" (168.3 mm) — 6-5/8 FH
  { od: '6-5/8', odMm: 168.3, weight: 27.70, grade: 'G105', wall: 9.19, id: 150.37, toolJoint: '6-5/8 FH', yield: 724 },
  { od: '6-5/8', odMm: 168.3, weight: 27.70, grade: 'S135', wall: 9.19, id: 150.37, toolJoint: '6-5/8 FH', yield: 931 },
];

const COLLAR_SPECS = [
  // 3-1/8" (79.4 mm)
  { od: '3-1/8', odMm: 79.4, id: '1-1/2', idMm: 38.1, weight: 28.0, thread: 'NC31', length: 9.14, type: '常规' },

  // 4-1/8" (104.8 mm)
  { od: '4-1/8', odMm: 104.8, id: '1-1/2', idMm: 38.1, weight: 46.5, thread: 'NC38', length: 9.14, type: '常规' },
  { od: '4-1/8', odMm: 104.8, id: '2-1/8', idMm: 54.0, weight: 41.0, thread: 'NC38', length: 9.14, type: '常规' },

  // 4-3/4" (120.7 mm)
  { od: '4-3/4', odMm: 120.7, id: '2-1/8', idMm: 54.0, weight: 46.0, thread: 'NC38', length: 9.14, type: '常规' },
  { od: '4-3/4', odMm: 120.7, id: '2-3/8', idMm: 60.3, weight: 52.0, thread: 'NC38', length: 9.14, type: '常规' },
  { od: '4-3/4', odMm: 120.7, id: '2-1/2', idMm: 63.5, weight: 49.0, thread: 'NC38', length: 9.14, type: '常规' },

  // 5" (127.0 mm)
  { od: '5', odMm: 127.0, id: '2-3/8', idMm: 60.3, weight: 58.0, thread: 'NC50', length: 9.14, type: '常规' },
  { od: '5', odMm: 127.0, id: '2-7/8', idMm: 73.0, weight: 53.5, thread: 'NC50', length: 9.14, type: '常规' },

  // 5-1/2" (139.7 mm)
  { od: '5-1/2', odMm: 139.7, id: '2-3/8', idMm: 60.3, weight: 67.5, thread: 'NC50', length: 9.14, type: '常规' },
  { od: '5-1/2', odMm: 139.7, id: '2-7/8', idMm: 73.0, weight: 62.0, thread: 'NC50', length: 9.14, type: '常规' },

  // 6-1/4" (158.8 mm)
  { od: '6-1/4', odMm: 158.8, id: '2-3/8', idMm: 60.3, weight: 83.5, thread: 'NC46', length: 9.14, type: '常规' },
  { od: '6-1/4', odMm: 158.8, id: '2-7/8', idMm: 73.0, weight: 78.0, thread: 'NC46', length: 9.14, type: '常规' },

  // 6-1/2" (165.1 mm)
  { od: '6-1/2', odMm: 165.1, id: '2-3/8', idMm: 60.3, weight: 92.0, thread: 'NC46', length: 9.14, type: '常规' },
  { od: '6-1/2', odMm: 165.1, id: '2-7/8', idMm: 73.0, weight: 83.0, thread: 'NC46', length: 9.14, type: '常规' },
  { od: '6-1/2', odMm: 165.1, id: '2-7/8', idMm: 73.0, weight: 83.0, thread: 'NC46', length: 9.14, type: '螺旋' },
  { od: '6-1/2', odMm: 165.1, id: '3-1/8', idMm: 79.4, weight: 76.0, thread: 'NC46', length: 9.14, type: '常规' },

  // 6-3/4" (171.5 mm)
  { od: '6-3/4', odMm: 171.5, id: '2-7/8', idMm: 73.0, weight: 90.0, thread: 'NC50', length: 9.14, type: '常规' },
  { od: '6-3/4', odMm: 171.5, id: '3-1/8', idMm: 79.4, weight: 84.0, thread: 'NC50', length: 9.14, type: '常规' },

  // 7" (177.8 mm)
  { od: '7', odMm: 177.8, id: '2-7/8', idMm: 73.0, weight: 102.0, thread: 'NC50', length: 9.14, type: '常规' },
  { od: '7', odMm: 177.8, id: '3-1/8', idMm: 79.4, weight: 95.0, thread: 'NC50', length: 9.14, type: '常规' },

  // 7-3/4" (196.9 mm)
  { od: '7-3/4', odMm: 196.9, id: '3-1/8', idMm: 79.4, weight: 118.0, thread: 'NC50', length: 9.14, type: '常规' },

  // 8" (203.2 mm)
  { od: '8', odMm: 203.2, id: '2-7/8', idMm: 73.0, weight: 136.0, thread: 'NC50', length: 9.14, type: '常规' },
  { od: '8', odMm: 203.2, id: '2-7/8', idMm: 73.0, weight: 136.0, thread: 'NC50', length: 9.14, type: '螺旋' },
  { od: '8', odMm: 203.2, id: '3-1/8', idMm: 79.4, weight: 124.0, thread: 'NC50', length: 9.14, type: '常规' },
  { od: '8', odMm: 203.2, id: '3-1/2', idMm: 88.9, weight: 115.0, thread: 'NC50', length: 9.14, type: '常规' },

  // 8-1/4" (209.6 mm)
  { od: '8-1/4', odMm: 209.6, id: '3-1/8', idMm: 79.4, weight: 133.0, thread: 'NC56', length: 9.14, type: '常规' },

  // 9" (228.6 mm)
  { od: '9', odMm: 228.6, id: '3-1/8', idMm: 79.4, weight: 152.0, thread: 'NC56', length: 9.14, type: '常规' },

  // 9-1/2" (241.3 mm)
  { od: '9-1/2', odMm: 241.3, id: '3-1/8', idMm: 79.4, weight: 177.0, thread: 'NC56', length: 9.14, type: '常规' },
  { od: '9-1/2', odMm: 241.3, id: '3-1/8', idMm: 79.4, weight: 177.0, thread: 'NC56', length: 9.14, type: '螺旋' },
  { od: '9-1/2', odMm: 241.3, id: '3-1/2', idMm: 88.9, weight: 163.0, thread: 'NC56', length: 9.14, type: '常规' },

  // 9-5/8" (244.3 mm)
  { od: '9-5/8', odMm: 244.3, id: '3-1/2', idMm: 88.9, weight: 168.0, thread: 'NC56', length: 9.14, type: '常规' },

  // 10" (254.0 mm)
  { od: '10', odMm: 254.0, id: '3-1/2', idMm: 88.9, weight: 184.0, thread: 'NC56', length: 9.14, type: '常规' },

  // 11" (279.4 mm)
  { od: '11', odMm: 279.4, id: '3-1/2', idMm: 88.9, weight: 216.0, thread: '6-5/8 REG', length: 9.14, type: '常规' },
];

const TUBING_SPECS = [
  // 1.05" (26.7 mm)
  { od: '1.05', odMm: 26.7, weight: 1.20, grade: 'J55', wall: 2.41, id: 21.88 },
  { od: '1.05', odMm: 26.7, weight: 1.40, grade: 'N80', wall: 2.92, id: 20.86 },

  // 1.315" (33.4 mm)
  { od: '1.315', odMm: 33.4, weight: 1.80, grade: 'J55', wall: 2.41, id: 28.58 },
  { od: '1.315', odMm: 33.4, weight: 2.30, grade: 'N80', wall: 3.18, id: 27.04 },

  // 1.66" (42.2 mm)
  { od: '1.66', odMm: 42.2, weight: 2.40, grade: 'J55', wall: 2.41, id: 37.38 },
  { od: '1.66', odMm: 42.2, weight: 3.00, grade: 'N80', wall: 3.18, id: 35.84 },

  // 1.9" (48.3 mm)
  { od: '1.9', odMm: 48.3, weight: 2.90, grade: 'J55', wall: 2.41, id: 43.48 },
  { od: '1.9', odMm: 48.3, weight: 3.65, grade: 'N80', wall: 3.18, id: 41.94 },
  { od: '1.9', odMm: 48.3, weight: 4.50, grade: 'P110', wall: 3.91, id: 40.48 },

  // 2-3/8" (60.3 mm)
  { od: '2-3/8', odMm: 60.3, weight: 4.00, grade: 'J55', wall: 3.18, id: 53.98 },
  { od: '2-3/8', odMm: 60.3, weight: 4.60, grade: 'J55', wall: 3.53, id: 53.24 },
  { od: '2-3/8', odMm: 60.3, weight: 4.70, grade: 'J55', wall: 3.91, id: 52.48 },
  { od: '2-3/8', odMm: 60.3, weight: 4.70, grade: 'N80', wall: 3.91, id: 52.48 },
  { od: '2-3/8', odMm: 60.3, weight: 5.80, grade: 'N80', wall: 4.24, id: 51.82 },
  { od: '2-3/8', odMm: 60.3, weight: 6.40, grade: 'N80', wall: 4.83, id: 50.64 },
  { od: '2-3/8', odMm: 60.3, weight: 6.50, grade: 'N80', wall: 5.51, id: 49.28 },
  { od: '2-3/8', odMm: 60.3, weight: 6.50, grade: 'P110', wall: 5.51, id: 49.28 },
  { od: '2-3/8', odMm: 60.3, weight: 7.70, grade: 'P110', wall: 6.45, id: 47.40 },

  // 2-7/8" (73.0 mm)
  { od: '2-7/8', odMm: 73.0, weight: 6.40, grade: 'J55', wall: 4.24, id: 64.52 },
  { od: '2-7/8', odMm: 73.0, weight: 6.50, grade: 'J55', wall: 4.24, id: 64.52 },
  { od: '2-7/8', odMm: 73.0, weight: 7.90, grade: 'N80', wall: 5.16, id: 62.68 },
  { od: '2-7/8', odMm: 73.0, weight: 8.60, grade: 'N80', wall: 5.51, id: 61.98 },
  { od: '2-7/8', odMm: 73.0, weight: 8.60, grade: 'P110', wall: 5.51, id: 61.98 },
  { od: '2-7/8', odMm: 73.0, weight: 9.35, grade: 'P110', wall: 5.72, id: 61.56 },
  { od: '2-7/8', odMm: 73.0, weight: 10.40, grade: 'P110', wall: 6.45, id: 60.10 },

  // 3-1/2" (88.9 mm)
  { od: '3-1/2', odMm: 88.9, weight: 7.70, grade: 'J55', wall: 3.91, id: 81.08 },
  { od: '3-1/2', odMm: 88.9, weight: 9.20, grade: 'J55', wall: 4.83, id: 79.24 },
  { od: '3-1/2', odMm: 88.9, weight: 9.30, grade: 'J55', wall: 4.24, id: 80.42 },
  { od: '3-1/2', odMm: 88.9, weight: 9.20, grade: 'N80', wall: 4.83, id: 79.24 },
  { od: '3-1/2', odMm: 88.9, weight: 10.20, grade: 'N80', wall: 5.16, id: 78.58 },
  { od: '3-1/2', odMm: 88.9, weight: 12.70, grade: 'N80', wall: 5.72, id: 77.46 },
  { od: '3-1/2', odMm: 88.9, weight: 12.70, grade: 'P110', wall: 5.72, id: 77.46 },
  { od: '3-1/2', odMm: 88.9, weight: 12.95, grade: 'P110', wall: 6.45, id: 76.00 },
  { od: '3-1/2', odMm: 88.9, weight: 15.50, grade: 'P110', wall: 7.72, id: 73.46 },

  // 4" (101.6 mm)
  { od: '4', odMm: 101.6, weight: 9.50, grade: 'J55', wall: 4.24, id: 93.12 },
  { od: '4', odMm: 101.6, weight: 11.00, grade: 'N80', wall: 5.16, id: 91.28 },
  { od: '4', odMm: 101.6, weight: 11.60, grade: 'N80', wall: 5.51, id: 90.58 },
  { od: '4', odMm: 101.6, weight: 13.40, grade: 'P110', wall: 6.45, id: 88.70 },

  // 4-1/2" (114.3 mm)
  { od: '4-1/2', odMm: 114.3, weight: 9.50, grade: 'J55', wall: 4.24, id: 106.12 },
  { od: '4-1/2', odMm: 114.3, weight: 10.50, grade: 'N80', wall: 4.83, id: 105.54 },
  { od: '4-1/2', odMm: 114.3, weight: 12.60, grade: 'N80', wall: 5.72, id: 103.76 },
  { od: '4-1/2', odMm: 114.3, weight: 13.50, grade: 'P110', wall: 6.35, id: 102.60 },
  { od: '4-1/2', odMm: 114.3, weight: 15.10, grade: 'P110', wall: 7.11, id: 101.08 },
];

const STEEL_GRADES = [
  { grade: 'H-40', yield: 276, tensile: 414, min: 40, color: '#94a3b8' },
  { grade: 'J-55', yield: 379, tensile: 517, min: 55, color: '#16a34a' },
  { grade: 'K-55', yield: 379, tensile: 655, min: 55, color: '#16a34a' },
  { grade: 'N-80', yield: 552, tensile: 689, min: 80, color: '#2563eb' },
  { grade: 'L-80', yield: 552, tensile: 655, min: 80, color: '#2563eb' },
  { grade: 'C-90', yield: 621, tensile: 689, min: 90, color: '#9333ea' },
  { grade: 'T-95', yield: 655, tensile: 758, min: 95, color: '#9333ea' },
  { grade: 'P-110', yield: 758, tensile: 862, min: 110, color: '#ea580c' },
  { grade: 'Q-125', yield: 862, tensile: 931, min: 125, color: '#dc2626' },
];

const BOP_SPECS = [
  { model: 'FZ18-35', type: '单闸板', bore: 180, pressure: 35, flange: '11"', height: 680 },
  { model: 'FZ28-35', type: '单闸板', bore: 280, pressure: 35, flange: '13-5/8"', height: 780 },
  { model: 'FZ35-70', type: '双闸板', bore: 346, pressure: 70, flange: '13-5/8"', height: 1200 },
  { model: 'FZ35-105', type: '双闸板', bore: 346, pressure: 105, flange: '13-5/8"', height: 1350 },
  { model: 'FZ18-70', type: '环形', bore: 180, pressure: 70, flange: '11"', height: 920 },
  { model: 'FZ28-70', type: '环形', bore: 280, pressure: 70, flange: '13-5/8"', height: 1050 },
  { model: 'FZ35-70', type: '环形', bore: 346, pressure: 70, flange: '13-5/8"', height: 1180 },
  { model: 'FZ35-105', type: '环形+闸板', bore: 346, pressure: 105, flange: '13-5/8"', height: 2100 },
];

const WELLHEAD_SPECS = [
  { name: '套管头 13-5/8"×11"×7"', rating: '35 MPa', bore: '346×280×178', flange: 'API 6A' },
  { name: '套管头 13-5/8"×9-5/8"', rating: '70 MPa', bore: '346×244', flange: 'API 6A' },
  { name: '油管头 7-1/16"', rating: '35 MPa', bore: 180, flange: 'API 6A' },
  { name: '采油树 2-1/16"', rating: '35 MPa', bore: 52, flange: 'API 6A' },
  { name: '法兰 11" 3000', rating: '35 MPa', bore: 280, flange: 'API 6A' },
  { name: '法兰 13-5/8" 5000', rating: '70 MPa', bore: 346, flange: 'API 6A' },
];

const ROCK_DENSITIES = [
  { rock: '砂岩', min: 2.2, max: 2.7, typical: 2.45, porosity: '5–25%' },
  { rock: '页岩', min: 2.4, max: 2.8, typical: 2.55, porosity: '1–10%' },
  { rock: '石灰岩', min: 2.5, max: 2.8, typical: 2.65, porosity: '1–20%' },
  { rock: '白云岩', min: 2.7, max: 2.9, typical: 2.80, porosity: '1–15%' },
  { rock: '盐岩', min: 2.1, max: 2.3, typical: 2.20, porosity: '<1%' },
  { rock: '花岗岩', min: 2.6, max: 2.8, typical: 2.70, porosity: '<1%' },
  { rock: '煤', min: 1.2, max: 1.5, typical: 1.35, porosity: '5–15%' },
  { rock: '泥岩', min: 2.2, max: 2.6, typical: 2.40, porosity: '5–20%' },
];

const WELL_LOG_CURVES = [
  { code: 'GR', name: '自然伽马', unit: 'API', low: '砂岩、碳酸盐岩', high: '泥岩、页岩', use: '岩性识别、地层对比、Vsh 计算' },
  { code: 'SP', name: '自然电位', unit: 'mV', low: '渗透层（相对泥岩负异常）', high: '泥岩基线', use: '渗透层识别、地层水电阻率估算' },
  { code: 'CALI', name: '井径', unit: 'in', low: '钻头尺寸附近（泥饼正常）', high: '扩径、坍塌井段', use: '井壁稳定性评价、曲线质量检查' },
  { code: 'RT', name: '深探测电阻率', unit: 'Ω·m', low: '水层、矿化水层', high: '油气层、致密层', use: '流体识别、含油气性评价' },
  { code: 'RXO', name: '冲洗带电阻率', unit: 'Ω·m', low: '冲洗带含水、侵入深', high: '泥饼影响、低侵入', use: '侵入特性分析、RXO/RT 比值判别' },
  { code: 'RM', name: '泥浆电阻率', unit: 'Ω·m', low: '淡水泥浆', high: '盐水泥浆、重泥浆', use: 'SP 解释、侵入校正' },
  { code: 'RHOB', name: '体积密度', unit: 'g/cm³', low: '气层、煤层、孔隙度高', high: '致密层、硬石膏、灰岩', use: '孔隙度计算、岩性识别、气层检测' },
  { code: 'NPHI', name: '中子孔隙度', unit: '%', low: '气层（气效应）、致密层、盐岩', high: '泥岩、石膏、高孔层', use: '孔隙度计算、气层识别、岩性判别' },
  { code: 'DT', name: '声波时差', unit: 'μs/ft', low: '致密灰岩（~47）、白云岩（~43）', high: '泥岩（~100–120）、疏松层', use: '孔隙度计算、岩性识别、力学参数' },
  { code: 'PEF', name: '光电吸收指数', unit: 'b/e', low: '砂岩（~1.8）、煤层', high: '灰岩（~5.1）、硬石膏（~5.0）', use: '岩性识别（砂泥灰区分）' },
  { code: 'SGR', name: '无铀伽马', unit: 'API', low: '碳酸盐岩、蒸发岩', high: '泥质含量高的地层', use: '消除铀影响、精细岩性分析' },
  { code: 'CNL', name: '补偿中子', unit: '%', low: '气层、致密层', high: '泥岩、含水层', use: '孔隙度、气层校正' },
  { code: 'ILD', name: '深感应电阻率', unit: 'Ω·m', low: '水层', high: '油气层', use: '中深探测电阻率，淡水泥浆井' },
  { code: 'LLD', name: '双侧向电阻率', unit: 'Ω·m', low: '水层', high: '油气层、致密层', use: '盐水泥浆井深电阻率测量' },
  { code: 'MSFL', name: '微球形聚焦', unit: 'Ω·m', low: '冲洗带含水', high: '泥饼、低侵入油气层', use: '冲洗带电阻率、侵入直径估算' },
  { code: 'TEMP', name: '井温', unit: '°C', low: '近地表低温', high: '深部高温异常', use: '地层温度梯度、产层判断' },
];

const WELL_LOG_LITHOLOGY = [
  // 储集层 — 砂岩
  { litho: '纯净砂岩（含水）', category: '储集层', gr: '15 ~ 30', rhob: '2.05 ~ 2.40', nphi: '15 ~ 35', dt: '75 ~ 95', rt: '< 5', note: '水层电阻率低，SP 明显负异常' },
  { litho: '纯净砂岩（含油）', category: '储集层', gr: '15 ~ 30', rhob: '1.95 ~ 2.30', nphi: '15 ~ 35', dt: '75 ~ 95', rt: '10 ~ 200', note: '油层电阻率高，密度略低于水层' },
  { litho: '纯净砂岩（含气）', category: '储集层', gr: '15 ~ 30', rhob: '1.85 ~ 2.20', nphi: '5 ~ 25', dt: '75 ~ 100', rt: '> 20', note: '气层 NPHI 减小、密度低（气效应）' },
  { litho: '泥质砂岩', category: '储集层', gr: '30 ~ 75', rhob: '2.20 ~ 2.55', nphi: '20 ~ 40', dt: '80 ~ 110', rt: '5 ~ 50', note: '含泥量增加，GR 升高，孔隙度偏低' },
  { litho: '致密砂岩（干层）', category: '储集层', gr: '20 ~ 60', rhob: '2.55 ~ 2.75', nphi: '3 ~ 12', dt: '55 ~ 70', rt: '> 100', note: '孔隙度低，需压裂改造，DT 低值' },
  { litho: '页岩气储层', category: '储集层', gr: '120 ~ 350', rhob: '2.30 ~ 2.55', nphi: '15 ~ 35', dt: '90 ~ 140', rt: '10 ~ 500', note: '富有机质页岩，高 GR，含气时密度降低' },

  // 储集层 — 碳酸盐岩
  { litho: '纯净灰岩（致密）', category: '储集层', gr: '5 ~ 15', rhob: '2.65 ~ 2.71', nphi: '0 ~ 8', dt: '47 ~ 55', rt: '> 100', note: '低 GR、高密度、低声波时差' },
  { litho: '灰岩（含油 / 孔洞）', category: '储集层', gr: '5 ~ 15', rhob: '2.30 ~ 2.55', nphi: '5 ~ 25', dt: '50 ~ 80', rt: '10 ~ 200', note: '溶孔发育，密度和声波时差增大' },
  { litho: '白云岩（致密）', category: '储集层', gr: '5 ~ 20', rhob: '2.80 ~ 2.87', nphi: '0 ~ 5', dt: '43 ~ 50', rt: '> 100', note: 'PEF ~3.1，DT 低于灰岩' },
  { litho: '白云岩（含油）', category: '储集层', gr: '5 ~ 20', rhob: '2.45 ~ 2.75', nphi: '5 ~ 20', dt: '45 ~ 70', rt: '10 ~ 200', note: '晶间孔发育，电阻率明显升高' },

  // 盖层 / 非储层
  { litho: '泥岩（盖层）', category: '盖层', gr: '75 ~ 200', rhob: '2.20 ~ 2.65', nphi: '25 ~ 45', dt: '100 ~ 140', rt: '1 ~ 10', note: '高 GR、高孔、高声波时差，良好盖层' },
  { litho: '页岩', category: '盖层', gr: '100 ~ 250', rhob: '2.30 ~ 2.60', nphi: '20 ~ 40', dt: '90 ~ 130', rt: '2 ~ 20', note: '极高 GR，层状页岩与粉砂互层需注意' },
  { litho: '粉砂质泥岩', category: '盖层', gr: '60 ~ 120', rhob: '2.30 ~ 2.55', nphi: '20 ~ 35', dt: '85 ~ 115', rt: '2 ~ 15', note: 'GR 中等偏高，封盖能力一般' },

  // 蒸发岩
  { litho: '岩盐 Halite', category: '蒸发岩', gr: '0 ~ 5', rhob: '2.04 ~ 2.16', nphi: '-5 ~ 5', dt: '65 ~ 75', rt: '> 1000', note: '极低 GR，中子异常低值，易蠕变' },
  { litho: '硬石膏 Anhydrite', category: '蒸发岩', gr: '0 ~ 10', rhob: '2.95 ~ 2.98', nphi: '-2 ~ 3', dt: '50 ~ 55', rt: '> 500', note: '极高密度，PEF ~5.0，低孔' },
  { litho: '石膏 Gypsum', category: '蒸发岩', gr: '0 ~ 10', rhob: '2.30 ~ 2.35', nphi: '50 ~ 60', dt: '55 ~ 65', rt: '> 100', note: '结晶水导致中子异常高值' },
  { litho: '钾盐 Sylvite', category: '蒸发岩', gr: '100 ~ 300', rhob: '1.85 ~ 1.95', nphi: '30 ~ 50', dt: '80 ~ 100', rt: '> 100', note: '高 GR（含钾），低密度' },

  // 特殊岩性
  { litho: '煤层（烟煤）', category: '特殊岩性', gr: '30 ~ 150', rhob: '1.20 ~ 1.55', nphi: '40 ~ 60', dt: '110 ~ 160', rt: '> 500', note: '低密度、高声波时差、高电阻率' },
  { litho: '煤层（无烟煤）', category: '特殊岩性', gr: '20 ~ 80', rhob: '1.35 ~ 1.70', nphi: '30 ~ 50', dt: '90 ~ 130', rt: '> 300', note: '密度略高于烟煤，GR 较低' },
  { litho: '凝灰岩', category: '特殊岩性', gr: '80 ~ 200', rhob: '2.20 ~ 2.50', nphi: '15 ~ 30', dt: '70 ~ 100', rt: '5 ~ 50', note: '火山碎屑岩，GR 高、成分变化大' },

  // 火成岩 / 变质岩
  { litho: '玄武岩', category: '火成岩', gr: '10 ~ 60', rhob: '2.85 ~ 3.00', nphi: '0 ~ 5', dt: '45 ~ 55', rt: '> 500', note: '高密度、低孔、高电阻率' },
  { litho: '花岗岩（基底）', category: '火成岩', gr: '100 ~ 250', rhob: '2.60 ~ 2.75', nphi: '0 ~ 3', dt: '50 ~ 60', rt: '> 1000', note: '变质基底，高 GR（含钾），致密' },
  { litho: '片麻岩', category: '火成岩', gr: '50 ~ 150', rhob: '2.55 ~ 2.70', nphi: '0 ~ 5', dt: '50 ~ 65', rt: '> 500', note: '变质岩，各向异性明显' },
];

const WELL_LOG_FLUID_RULES = [
  { title: '油气层快速识别', criteria: 'GR 低 + RHOB 偏低 + RT > 20 Ω·m', detail: '三条件同时满足时优先考虑油气层；需结合区域经验与试油验证。' },
  { title: '气层特征', criteria: 'NPHI 突然减小 + RHOB 减小', detail: '密度-中子交会出现"蛤蟆嘴"（气效应）；RT 通常明显高于水层。' },
  { title: '油层特征', criteria: '深浅电阻率差异小，RT 中高（10 ~ 200 Ω·m）', detail: '中子-密度交会偏离气层特征；SP 负异常，含油性综合判断。' },
  { title: '水层特征', criteria: 'RT 接近地层水电阻率，通常 < 5 Ω·m', detail: 'RXO ≈ RT；SP 明显负异常；密度-中子交会接近含水点。' },
  { title: '泥岩 / 干层', criteria: 'GR > 75 或 致密（RHOB > 2.65，DT < 70）', detail: '泥岩为非储层；致密层虽电阻率高但无产能，需与油气层区分。' },
  { title: '冲洗带对比（侵入）', criteria: 'RXO < RT → 油气层（低侵入）', detail: 'RXO > RT → 水层（高侵入）；侵入直径 DI 可定量评价。' },
  { title: '碳酸盐岩油气层', criteria: 'GR 低 + RT 高 + 孔洞发育（RHOB 降低）', detail: '溶孔、裂缝发育层段，声波时差增大，注意泥浆侵入影响。' },
  { title: '页岩气层', criteria: '高 GR + 高 RT + 含气时 RHOB 降低', detail: '总有机碳含量高，电阻率受含气饱和度影响显著，需结合岩心分析。' },
];

// 兼容旧引用
const WELL_LOG_REF = WELL_LOG_CURVES.map((r) => ({
  curve: `${r.code} (${r.name})`,
  unit: r.unit,
  low: r.low,
  high: r.high,
  use: r.use,
}));

const MUD_ADDITIVE_CATEGORIES = [
  '全部', '增粘剂', '降滤失剂', '加重剂', '分散剂', 'pH 调节', '防塌剂', '润滑剂', '防漏失', '消泡剂', '杀菌剂',
];

const MUD_ADDITIVES = [
  // 增粘剂
  { name: '膨润土', category: '增粘剂', dosage: '20 ~ 60 kg/m³', tempMax: '200 °C', effect: '基础水基钻井液主体；含膨润土量 35–50 g/L 起作用' },
  { name: '黄原胶 XC', category: '增粘剂', dosage: '0.5 ~ 3.0 kg/m³', tempMax: '100 °C', effect: '生物聚合物，剪切稀释性好，适合定向井 / 水平井' },
  { name: 'PAC HV（聚阴离子纤维素）', category: '增粘剂', dosage: '1 ~ 6 kg/m³', tempMax: '130 °C', effect: '兼具降滤失，淡水 / 微咸水适用' },
  { name: 'CMC HV（羧甲基纤维素）', category: '增粘剂', dosage: '2 ~ 10 kg/m³', tempMax: '120 °C', effect: '常规水基钻井液主增粘剂' },
  { name: 'HEC（羟乙基纤维素）', category: '增粘剂', dosage: '1 ~ 4 kg/m³', tempMax: '130 °C', effect: '清洁完井液优选，生物降解性好' },
  { name: '凹凸棒土', category: '增粘剂', dosage: '5 ~ 15 kg/m³', tempMax: '150 °C', effect: '抗盐增粘，盐卤水体系适用' },
  { name: '预胶化淀粉', category: '增粘剂', dosage: '2 ~ 8 kg/m³', tempMax: '120 °C', effect: '可降解增粘，储层保护性能好' },

  // 降滤失剂
  { name: 'CMC LV', category: '降滤失剂', dosage: '3 ~ 15 kg/m³', tempMax: '120 °C', effect: '低粘 CMC，仅降滤失不显著增粘' },
  { name: 'PAC LV', category: '降滤失剂', dosage: '1 ~ 5 kg/m³', tempMax: '130 °C', effect: '低粘 PAC，抗盐降滤失' },
  { name: '改性淀粉', category: '降滤失剂', dosage: '3 ~ 12 kg/m³', tempMax: '110 °C', effect: '天然聚合物降滤失，环保可降解' },
  { name: '褐煤树脂', category: '降滤失剂', dosage: '2 ~ 8 kg/m³', tempMax: '180 °C', effect: '耐高温降滤失，深井常用' },
  { name: '天然沥青', category: '降滤失剂', dosage: '10 ~ 30 kg/m³', tempMax: '160 °C', effect: '同时改善泥饼质量，抑制页岩' },
  { name: '聚胺降滤失剂', category: '降滤失剂', dosage: '1 ~ 4 kg/m³', tempMax: '150 °C', effect: '水基深井高温降滤失' },

  // 加重剂
  { name: '重晶石（BaSO₄）', category: '加重剂', dosage: '按需', tempMax: '—', effect: '最常用加重剂，密度可达约 2.40 g/cm³' },
  { name: '石灰石粉（CaCO₃）', category: '加重剂', dosage: '按需', tempMax: '—', effect: '酸溶性加重剂，储层完井适用' },
  { name: '赤铁矿粉（Fe₂O₃）', category: '加重剂', dosage: '按需', tempMax: '—', effect: '高密度加重，可达 2.50 g/cm³ 以上' },
  { name: '钛铁矿粉', category: '加重剂', dosage: '按需', tempMax: '—', effect: '超高密度加重，现场配制较少' },

  // 分散剂
  { name: '褐煤（铬褐煤）', category: '分散剂', dosage: '2 ~ 10 kg/m³', tempMax: '180 °C', effect: '降粘分散，改善高温流变' },
  { name: '无铬褐煤', category: '分散剂', dosage: '2 ~ 10 kg/m³', tempMax: '180 °C', effect: '环保型降粘分散剂' },
  { name: '木质素磺酸盐', category: '分散剂', dosage: '1 ~ 5 kg/m³', tempMax: '130 °C', effect: '温和降粘，维持适当切力' },
  { name: 'SMT（磺化单宁）', category: '分散剂', dosage: '1 ~ 4 kg/m³', tempMax: '150 °C', effect: '耐高温降粘，深井适用' },
  { name: '单宁提取物', category: '分散剂', dosage: '1 ~ 3 kg/m³', tempMax: '120 °C', effect: '天然降粘剂，中浅井常用' },

  // pH 调节
  { name: '纯碱（Na₂CO₃）', category: 'pH 调节', dosage: '0.2 ~ 0.5 kg/m³', tempMax: '—', effect: '除钙降粘，改善膨润土造浆' },
  { name: '烧碱（NaOH）', category: 'pH 调节', dosage: '0.1 ~ 0.3 kg/m³', tempMax: '—', effect: '提高 pH，抑制粘土过度水化' },
  { name: '石灰（Ca(OH)₂）', category: 'pH 调节', dosage: '0.5 ~ 2 kg/m³', tempMax: '—', effect: '低 pH 石灰钻井液体系，防塌' },

  // 防塌剂
  { name: 'KCl', category: '防塌剂', dosage: '30 ~ 70 kg/m³', tempMax: '—', effect: '抑制页岩水化膨胀，最常用防塌盐' },
  { name: 'CaCl₂', category: '防塌剂', dosage: '10 ~ 50 kg/m³', tempMax: '—', effect: '强抑制，微裂缝页岩适用' },
  { name: '聚醇（Glycol）', category: '防塌剂', dosage: '30 ~ 80 kg/m³', tempMax: '120 °C', effect: '封堵微裂缝，抑制页岩分散' },
  { name: '硅酸盐', category: '防塌剂', dosage: '20 ~ 60 kg/m³', tempMax: '90 °C', effect: '形成凝胶膜，强页岩抑制' },
  { name: '胺类页岩抑制剂', category: '防塌剂', dosage: '5 ~ 20 kg/m³', tempMax: '150 °C', effect: '吸附抑制，水敏地层有效' },
  { name: 'NPAN（硝化沥青）', category: '防塌剂', dosage: '10 ~ 25 kg/m³', tempMax: '160 °C', effect: '封堵渗流通道，改善泥饼' },

  // 润滑剂
  { name: '液体润滑剂', category: '润滑剂', dosage: '10 ~ 30 kg/m³', tempMax: '—', effect: '降低摩阻扭矩，改善定向段钻进' },
  { name: '植物油润滑剂', category: '润滑剂', dosage: '10 ~ 25 kg/m³', tempMax: '—', effect: '环保润滑，储层友好' },
  { name: '极压润滑剂', category: '润滑剂', dosage: '5 ~ 15 kg/m³', tempMax: '150 °C', effect: '高温高压井段减摩' },
  { name: '柴油 / 原油', category: '润滑剂', dosage: '10 ~ 50 kg/m³', tempMax: '—', effect: '传统润滑方式，油基过渡使用' },

  // 防漏失
  { name: '核桃壳（粗 / 中 / 细）', category: '防漏失', dosage: '10 ~ 50 kg/m³', tempMax: '—', effect: '架桥堵漏，渗透性漏失' },
  { name: '锯末 / 纤维素纤维', category: '防漏失', dosage: '10 ~ 40 kg/m³', tempMax: '—', effect: '架桥配合堵漏，可降解' },
  { name: '超细碳酸钙', category: '防漏失', dosage: '20 ~ 80 kg/m³', tempMax: '—', effect: '填充孔隙，微裂缝堵漏' },
  { name: '复合堵漏剂', category: '防漏失', dosage: '15 ~ 60 kg/m³', tempMax: '—', effect: '多粒级配方，裂缝性漏失' },
  { name: '凝胶堵漏剂', category: '防漏失', dosage: '按需', tempMax: '120 °C', effect: '高失水封堵，严重漏失段' },

  // 消泡剂
  { name: '有机硅消泡剂', category: '消泡剂', dosage: '0.05 ~ 0.3 kg/m³', tempMax: '—', effect: '消除循环过程中产生的泡沫' },
  { name: '脂肪醇消泡剂', category: '消泡剂', dosage: '0.1 ~ 0.5 kg/m³', tempMax: '—', effect: '表面活性体系消泡' },

  // 杀菌剂
  { name: '甲醛合剂', category: '杀菌剂', dosage: '0.2 ~ 1.0 kg/m³', tempMax: '—', effect: '抑制细菌繁殖，降解聚合物' },
  { name: '异噻唑啉酮类', category: '杀菌剂', dosage: '0.05 ~ 0.2 kg/m³', tempMax: '—', effect: '广谱杀菌，低加量高效' },
  { name: '季铵盐杀菌剂', category: '杀菌剂', dosage: '0.1 ~ 0.5 kg/m³', tempMax: '—', effect: '抑制硫酸盐还原菌（SRB）' },
];

const IADC_BITS = {
  series: ['1', '2', '3', '4', '5', '6', '7', '8'],
  seriesDesc: {
    '1': '软地层 — 长牙轮齿，高转速',
    '2': '软-中软地层',
    '3': '中硬地层 — 自锐齿',
    '4': '中硬-硬地层',
    '5': '硬地层 — 短齿',
    '6': '极硬地层',
    '7': '特殊用途',
    '8': 'PDC / 复合钻头',
  },
  formation: ['1', '2', '3', '4'],
  formationDesc: {
    '1': '软 — 页岩、盐岩',
    '2': '中软 — 软砂岩、灰岩',
    '3': '中硬 — 硬砂岩、白云岩',
    '4': '硬 — 燧石、花岗岩',
  },
  feature: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
  featureDesc: {
    '1': '钢齿',
    '2': '镶齿',
    '3': '保径',
    '4': '流体导向',
    '5': '液压设计',
    '6': '特殊特征',
    '7': 'PDC 固定齿',
    '8': '复合钻头',
    '9': '其他',
  },
};

/** 按井眼尺寸推荐钻井参数 */
const DRILLING_PARAMS_BY_HOLE = [
  { hole: '36"', wob: '5 ~ 15 t', rpm: '40 ~ 80', flow: '60 ~ 100 L/s', mw: '1.05 ~ 1.20 g/cm³' },
  { hole: '26"', wob: '8 ~ 20 t', rpm: '50 ~ 100', flow: '50 ~ 90 L/s', mw: '1.05 ~ 1.20 g/cm³' },
  { hole: '17-1/2"', wob: '15 ~ 30 t', rpm: '80 ~ 150', flow: '40 ~ 70 L/s', mw: '1.10 ~ 1.30 g/cm³' },
  { hole: '12-1/4"', wob: '15 ~ 35 t', rpm: '100 ~ 180', flow: '30 ~ 55 L/s', mw: '1.15 ~ 1.50 g/cm³' },
  { hole: '8-1/2"', wob: '8 ~ 25 t', rpm: '120 ~ 220', flow: '18 ~ 32 L/s', mw: '1.20 ~ 1.80 g/cm³' },
  { hole: '6"', wob: '5 ~ 15 t', rpm: '150 ~ 250', flow: '10 ~ 20 L/s', mw: '1.20 ~ 1.80 g/cm³' },
  { hole: '4-3/4"', wob: '3 ~ 10 t', rpm: '180 ~ 300', flow: '6 ~ 13 L/s', mw: '1.20 ~ 1.80 g/cm³' },
];

/** 参数调整指引（地层 / 钻头类型） */
const DRILLING_PARAM_ADJUSTMENTS = [
  { type: '软地层', wob: '取下限', rpm: '取上限', note: '低钻压、高转速，避免泥包，靠 PDC 切削破岩' },
  { type: '中硬地层', wob: '中等', rpm: '中等', note: '平衡钻压与扭矩，常规 PDC 钻头表现最佳' },
  { type: '硬地层 / 研磨性', wob: '取上限', rpm: '取下限', note: '高钻压、低转速，减少 PDC 齿缘磨损' },
  { type: 'PDC 钻头', wob: '中–高', rpm: '中–高', note: '以剪切破岩为主' },
  { type: '牙轮钻头', wob: '中–高', rpm: '低–中', note: '以冲击破岩为主，转速过高易损轴承' },
  { type: '弯接头 / 螺杆', wob: '中等', rpm: '看转盘', note: '螺杆自带转速约 60–200 RPM，需从总转速中扣除' },
];

/** 排量与水力校核准则 */
const DRILLING_HYDRAULICS_CRITERIA = [
  { item: '环空返速', value: '> 0.6 m/s（直井）/ > 0.9 m/s（水平井）', note: '保证岩屑携带至地面' },
  { item: '钻头水眼喷射速度', value: '90 ~ 120 m/s', note: '清洗井底，维持有效破岩' },
  { item: '钻头压降', value: '占总循环压降 50 ~ 65%', note: '水力优化（最大射流功率准则）' },
  { item: '泥浆性能 YP/PV', value: '≥ 0.7（页岩段 ≥ 1.0）', note: '稳定流变性与岩屑悬浮' },
];

const DRILLING_PARAMS_DISCLAIMER =
  '参考值仅作起始建议，实际需根据钻头响应、地层硬度、井底温度及泥浆性能综合调整。';

// ── 固井模块 ──

const CEMENT_GRADES = [
  {
    grade: 'A', name: 'A 级',
    trait: '普通用途，与硅酸盐水泥 ASTM Type I 相当，适用于无特殊性能要求的浅层固井。',
    sulfate: '无', sulfateCode: 'O',
    depth: '0 ~ 1,830 m', depthFt: '0 ~ 6,000 ft', temp: '≤ 38 °C',
    yield: '1.18 m³/t', density: '1.90 g/cm³', wc: '0.58 ~ 0.76',
    note: '油井现场已较少单独使用，通常由 G 级配合外加剂替代',
  },
  {
    grade: 'B', name: 'B 级',
    trait: '中或高抗硫酸盐性，适用于存在硫酸盐腐蚀风险的浅层井段。',
    sulfate: '中 ~ 高', sulfateCode: 'MSR / HSR',
    depth: '0 ~ 1,830 m', depthFt: '0 ~ 6,000 ft', temp: '≤ 38 °C',
    yield: '1.18 m³/t', density: '1.90 g/cm³', wc: '0.58 ~ 0.76',
    note: '盐膏层、盐碱地层等腐蚀环境浅层封固可选用',
  },
  {
    grade: 'C', name: 'C 级',
    trait: '高早强（24 h 内），需水量较高，适用于要求快速封固的浅层井段。',
    sulfate: '中 ~ 高', sulfateCode: 'MSR / HSR',
    depth: '0 ~ 1,830 m', depthFt: '0 ~ 6,000 ft', temp: '≤ 38 °C',
    yield: '1.18 m³/t', density: '1.90 g/cm³', wc: '0.58 ~ 0.76',
    note: '早强特性突出，需快速封隔地表水层时优选',
  },
  {
    grade: 'D', name: 'D 级',
    trait: '中深井缓凝型，出厂即具缓凝性能，保证中长井段的泵送时间。',
    sulfate: '中 ~ 高', sulfateCode: 'MSR / HSR',
    depth: '1,830 ~ 3,050 m', depthFt: '6,000 ~ 10,000 ft', temp: '60 ~ 88 °C',
    yield: '1.18 m³/t', density: '1.90 g/cm³', wc: '0.44 ~ 0.58',
    note: '中深井、中温井常用，现场仍常配合外加剂微调稠化时间',
  },
  {
    grade: 'E', name: 'E 级',
    trait: '深井缓凝型，比 D 级缓凝时间更长，适应更深、更高温的井底条件。',
    sulfate: '中 ~ 高', sulfateCode: 'MSR / HSR',
    depth: '3,050 ~ 4,270 m', depthFt: '10,000 ~ 14,000 ft', temp: '77 ~ 110 °C',
    yield: '1.18 m³/t', density: '1.90 g/cm³', wc: '0.44 ~ 0.58',
    note: '深井固井基础等级之一，需结合井温做配方设计',
  },
  {
    grade: 'F', name: 'F 级',
    trait: '极深井专用缓凝型，适应更高温压，稠化时间比 E 级更长。',
    sulfate: '中 ~ 高', sulfateCode: 'MSR / HSR',
    depth: '3,050 ~ 4,880 m', depthFt: '10,000 ~ 16,000 ft', temp: '110 ~ 143 °C',
    yield: '1.18 m³/t', density: '1.90 g/cm³', wc: '0.44 ~ 0.58',
    note: '超深井、超高温井段使用，配方须经实验室验证',
  },
  {
    grade: 'G', name: 'G 级',
    trait: '基本油井水泥，应用最广；可通过外加剂灵活调节密度、稠化时间与失水等性能。',
    sulfate: '中 ~ 高', sulfateCode: 'MSR / HSR',
    depth: '0 ~ 2,440 m（出厂）', depthFt: '0 ~ 8,000 ft', temp: '0 ~ 93 °C（出厂）',
    yield: '1.18 m³/t', density: '1.90 g/cm³', wc: '0.44 ~ 0.62',
    note: '国内及东半球最常用；配合外加剂可覆盖浅层至深井绝大多数固井需求',
  },
  {
    grade: 'H', name: 'H 级',
    trait: '基本油井水泥，与 G 级化学成分相同但颗粒更粗，对缓凝剂反应更敏感。',
    sulfate: '中 ~ 高', sulfateCode: 'MSR / HSR',
    depth: '0 ~ 2,440 m（出厂）', depthFt: '0 ~ 8,000 ft', temp: '0 ~ 93 °C（出厂）',
    yield: '1.18 m³/t', density: '1.90 g/cm³', wc: '0.38 ~ 0.50',
    note: '北美及西半球更常见；国内现场多以 G 级为主，H 级需按配方调整缓凝剂加量',
  },
];

const CEMENT_SULFATE_LEGEND = [
  { code: 'O', name: '普通（Ordinary）', desc: '无特殊抗硫要求，适用于一般地层' },
  { code: 'MSR', name: '中抗硫（Moderate Sulfate Resistant）', desc: '中等硫酸盐侵蚀环境' },
  { code: 'HSR', name: '高抗硫（High Sulfate Resistant）', desc: '高硫酸盐或强腐蚀环境' },
];

const CEMENT_ADDITIVE_CATEGORIES = [
  '全部', '促凝剂', '缓凝剂', '降失水剂', '分散剂', '减轻剂', '加重剂', '防冻剂', '防气窜剂', '膨胀剂', '纤维', '其他',
];

const CEMENT_ADDITIVES = [
  // 促凝剂
  { name: '氯化钙 CaCl₂', category: '促凝剂', dosage: '1% ~ 4%（BWOC）', tempMax: '120 °C', effect: '最常用的促凝剂，显著缩短稠化时间；浓度过高影响长期强度' },
  { name: '氯化钠 NaCl', category: '促凝剂', dosage: '≤ 15%（BWOC）', tempMax: '150 °C', effect: '低加量促凝，高加量（饱和盐水）可作减轻/隔离；盐膏层固井常用' },
  { name: '硅酸钠', category: '促凝剂', dosage: '0.5% ~ 2%（BWOC）', tempMax: '100 °C', effect: '低温井和堵漏水泥浆促凝，反应快' },
  { name: '硫酸钙（石膏）', category: '促凝剂', dosage: '1% ~ 5%（BWOC）', tempMax: '110 °C', effect: '调节凝结时间，兼有微膨胀作用' },

  // 缓凝剂
  { name: '木质素磺酸盐', category: '缓凝剂', dosage: '0.1% ~ 1.5%（BWOC）', tempMax: '150 °C', effect: '通用缓凝剂，兼降滤失；超量会导致强度下降' },
  { name: '羧甲基纤维素钠 CMC', category: '缓凝剂', dosage: '0.1% ~ 0.8%（BWOC）', tempMax: '130 °C', effect: '缓凝兼降失水，淡水体系常用' },
  { name: '柠檬酸', category: '缓凝剂', dosage: '0.05% ~ 0.3%（BWOC）', tempMax: '180 °C', effect: '中高温缓凝，深井固井常用有机酸类' },
  { name: '酒石酸', category: '缓凝剂', dosage: '0.05% ~ 0.2%（BWOC）', tempMax: '200 °C', effect: '高温缓凝效果好，超高温井适用' },
  { name: '葡萄糖酸钠', category: '缓凝剂', dosage: '0.1% ~ 0.5%（BWOC）', tempMax: '160 °C', effect: '环保型缓凝剂，对早期强度影响较小' },
  { name: 'AMPS 共聚物', category: '缓凝剂', dosage: '0.2% ~ 1.0%（BWOC）', tempMax: '200 °C', effect: '高温缓凝降失水一体剂，深井首选之一' },

  // 降失水剂
  { name: '聚阴离子纤维素 PAC', category: '降失水剂', dosage: '0.3% ~ 1.5%（BWOC）', tempMax: '180 °C', effect: 'API 标准降失水剂，淡水/盐水均适用' },
  { name: 'HEC 羟乙基纤维素', category: '降失水剂', dosage: '0.3% ~ 1.0%（BWOC）', tempMax: '150 °C', effect: '低滤失，改善水泥浆悬浮性' },
  { name: '乳胶（丁苯/腈类）', category: '降失水剂', dosage: '3% ~ 8%（BWOC）', tempMax: '180 °C', effect: '优异降失水与防气窜，页岩气固井常用' },
  { name: '磺化三聚氰胺甲醛', category: '降失水剂', dosage: '0.5% ~ 2.0%（BWOC）', tempMax: '200 °C', effect: '高温降失水，深井固井标准配置' },
  { name: '氧化石墨烯（新型）', category: '降失水剂', dosage: '0.01% ~ 0.05%（BWOC）', tempMax: '150 °C', effect: '极低加量降失水，改善浆体稳定性（新型材料）' },

  // 分散剂
  { name: '聚萘磺酸盐 PNS', category: '分散剂', dosage: '0.2% ~ 1.0%（BWOC）', tempMax: '180 °C', effect: '降低屈服值，改善泵送性，高密度水泥浆必备' },
  { name: '聚磺酸盐', category: '分散剂', dosage: '0.3% ~ 1.2%（BWOC）', tempMax: '200 °C', effect: '高温分散，兼缓凝，深井高密度体系' },
  { name: '木质素磺酸钠', category: '分散剂', dosage: '0.2% ~ 0.8%（BWOC）', tempMax: '130 °C', effect: '温和分散，中浅井低密度浆体' },

  // 减轻剂
  { name: '膨润土', category: '减轻剂', dosage: '2% ~ 10%（BWOC）', tempMax: '120 °C', effect: '降低密度至约 1.55 ~ 1.85 g/cm³，增加屈服值' },
  { name: '粉煤灰', category: '减轻剂', dosage: '10% ~ 40%（BWOC）', tempMax: '150 °C', effect: '减轻剂兼填充，降低水化热，尾管/长封固段常用' },
  { name: '微硅粉', category: '减轻剂', dosage: '5% ~ 15%（BWOC）', tempMax: '200 °C', effect: '减轻兼增韧，改善高温强度和抗渗透性' },
  { name: '珍珠岩', category: '减轻剂', dosage: '5% ~ 20%（BWOC）', tempMax: '100 °C', effect: '超低密度水泥浆（泡沫水泥除外），漏失层固井' },
  { name: '空心微珠', category: '减轻剂', dosage: '5% ~ 25%（BWOC）', tempMax: '120 °C', effect: '超低密度体系，漏失层、易漏地层封固' },

  // 加重剂
  { name: '赤铁矿粉 Fe₂O₃', category: '加重剂', dosage: '按需', tempMax: '—', effect: '加重至 2.30 g/cm³ 以上，对强度影响较小' },
  { name: '重晶石 BaSO₄', category: '加重剂', dosage: '按需', tempMax: '—', effect: '最常用加重剂，可达约 2.40 g/cm³' },
  { name: '钛铁矿粉', category: '加重剂', dosage: '按需', tempMax: '—', effect: '超高密度水泥浆，可达 2.50 g/cm³ 以上' },
  { name: '锰矿粉', category: '加重剂', dosage: '按需', tempMax: '—', effect: '中等密度加重，现场配制灵活' },

  // 防冻剂
  { name: '氯化钙（防冻）', category: '防冻剂', dosage: '2% ~ 4%（BWOC）', tempMax: '—', effect: '降低冰点，寒冷地区冬季固井防冻' },
  { name: '尿素', category: '防冻剂', dosage: '1% ~ 3%（BWOC）', tempMax: '—', effect: '防冻兼缓凝，低温施工辅助' },

  // 防气窜剂
  { name: '胶乳（防气窜型）', category: '防气窜剂', dosage: '3% ~ 6%（BWOC）', tempMax: '180 °C', effect: '形成弹性膜，降低气窜通道，气井固井关键添加剂' },
  { name: '刚性粒子（超细碳酸钙）', category: '防气窜剂', dosage: '2% ~ 5%（BWOC）', tempMax: '150 °C', effect: '物理封堵气体运移通道' },
  { name: '纤维（防气窜）', category: '防气窜剂', dosage: '0.1% ~ 0.3%（BWOC）', tempMax: '150 °C', effect: '桥堵微裂缝，辅助防气窜' },

  // 膨胀剂
  { name: '钙矾石类膨胀剂', category: '膨胀剂', dosage: '0.5% ~ 2%（BWOC）', tempMax: '150 °C', effect: '补偿水泥收缩，改善套管与地层胶结' },
  { name: '氧化镁膨胀剂', category: '膨胀剂', dosage: '0.3% ~ 1%（BWOC）', tempMax: '200 °C', effect: '延迟膨胀，深井长效补偿收缩' },
  { name: '铝粉', category: '膨胀剂', dosage: '0.05% ~ 0.2%（BWOC）', tempMax: '200 °C', effect: '高温膨胀，深井油层固井防收缩' },

  // 纤维
  { name: '聚丙烯纤维', category: '纤维', dosage: '0.1% ~ 0.5%（BWOC）', tempMax: '150 °C', effect: '防窜、增韧，漏失层和水平井固井' },
  { name: '矿物纤维', category: '纤维', dosage: '0.2% ~ 0.8%（BWOC）', tempMax: '200 °C', effect: '高温下保持桥堵能力，深井漏失封堵' },

  // 其他
  { name: '消泡剂', category: '其他', dosage: '0.05% ~ 0.2%（BWOC）', tempMax: '—', effect: '消除水泥浆搅拌和泵送过程中产生的气泡' },
  { name: '防漏剂（桥堵粒子）', category: '其他', dosage: '1% ~ 5%（BWOC）', tempMax: '150 °C', effect: '漏失层固井桥堵，粒径级配设计' },
  { name: '冲洗液（Spacer）', category: '其他', dosage: '领浆前注入', tempMax: '—', effect: '隔离钻井液与水泥浆，提高界面胶结质量' },
];

const CEMENT_SLURRY_PROPERTIES = [
  { scenario: '表层套管固井', density: '1.55 ~ 1.90 g/cm³', wc: '0.56 ~ 0.76', thickTime: '3 ~ 5 h（70 BC）', fluidLoss: '< 200 mL/30min', freeWater: '< 0.5%', strength24h: '≥ 3.5 MPa', strength48h: '≥ 7.0 MPa', note: '低密度、早强，要求快速封隔地表水层' },
  { scenario: '技术套管固井', density: '1.85 ~ 1.95 g/cm³', wc: '0.44 ~ 0.56', thickTime: '4 ~ 6 h（70 BC）', fluidLoss: '< 100 mL/30min', freeWater: '< 0.5%', strength24h: '≥ 10 MPa', strength48h: '≥ 14 MPa', note: '封隔复杂地层，兼顾防漏与强度发展' },
  { scenario: '生产套管固井', density: '1.90 ~ 2.10 g/cm³', wc: '0.44 ~ 0.50', thickTime: '5 ~ 8 h（70 BC）', fluidLoss: '< 50 mL/30min', freeWater: '< 0.2%', strength24h: '≥ 14 MPa', strength48h: '≥ 21 MPa', note: '油层封固核心，低失水、高强度、防气窜' },
  { scenario: '尾管固井', density: '1.85 ~ 2.00 g/cm³', wc: '0.44 ~ 0.52', thickTime: '4 ~ 7 h（70 BC）', fluidLoss: '< 50 mL/30min', freeWater: '< 0.3%', strength24h: '≥ 12 MPa', strength48h: '≥ 18 MPa', note: '悬挂器附近需注意稠化时间过渡' },
  { scenario: '挤水泥', density: '1.90 ~ 2.20 g/cm³', wc: '0.40 ~ 0.48', thickTime: '2 ~ 4 h（70 BC）', fluidLoss: '< 50 mL/30min', freeWater: '< 0.2%', strength24h: '≥ 14 MPa', strength48h: '≥ 21 MPa', note: '短稠化时间，高失水控制，封堵漏层/层间' },
  { scenario: '水泥塞（打塞）', density: '1.90 ~ 2.10 g/cm³', wc: '0.44 ~ 0.50', thickTime: '2 ~ 5 h（70 BC）', fluidLoss: '< 100 mL/30min', freeWater: '< 0.5%', strength24h: '≥ 10 MPa', strength48h: '≥ 14 MPa', note: '要求快速凝固，便于钻除；钻塞性能兼顾' },
  { scenario: '水平井固井', density: '1.85 ~ 2.00 g/cm³', wc: '0.44 ~ 0.52', thickTime: '5 ~ 8 h（70 BC）', fluidLoss: '< 50 mL/30min', freeWater: '< 0.2%', strength24h: '≥ 12 MPa', strength48h: '≥ 18 MPa', note: '低屈服值、优悬浮，防止水泥在水平段沉降' },
  { scenario: '页岩气固井', density: '1.88 ~ 2.05 g/cm³', wc: '0.44 ~ 0.50', thickTime: '6 ~ 10 h（70 BC）', fluidLoss: '< 50 mL/30min', freeWater: '< 0.2%', strength24h: '≥ 14 MPa', strength48h: '≥ 21 MPa', note: '防气窜体系（胶乳+纤维），低滤失长封固' },
  { scenario: '高温深井固井', density: '1.90 ~ 2.20 g/cm³', wc: '0.38 ~ 0.46', thickTime: '8 ~ 12 h（70 BC）', fluidLoss: '< 50 mL/30min', freeWater: '< 0.2%', strength24h: '≥ 14 MPa', strength48h: '≥ 24 MPa', note: 'H级水泥+高温缓凝降失水剂，注意静胶凝强度发展' },
  { scenario: '漏失层固井', density: '1.55 ~ 1.85 g/cm³', wc: '0.50 ~ 0.80', thickTime: '3 ~ 6 h（70 BC）', fluidLoss: '< 200 mL/30min', freeWater: '< 1.0%', strength24h: '≥ 7 MPa', strength48h: '≥ 10 MPa', note: '减轻剂/纤维/桥堵粒子，分次注入堵漏' },
];

const CEMENT_TEST_ITEMS = [
  { name: '稠化时间', category: '常规性能', standard: 'API RP 10B-2 / GB/T 19139', unit: 'min', typical: '按设计（70 BC）', criteria: '达到 70 BC 的时间在设计范围内', note: '固井施工最关键指标，受温度压力影响大' },
  { name: '抗压强度', category: '常规性能', standard: 'API RP 10B-2 / GB/T 19139', unit: 'MPa', typical: '12h / 24h / 48h', criteria: '达到设计强度要求', note: '养护温度需模拟井底温度' },
  { name: 'API 失水量', category: '常规性能', standard: 'API RP 10B-6', unit: 'mL/30min', typical: '< 50 ~ 200', criteria: '生产套管一般 < 50 mL', note: '高温高压失水仪（HTHP）用于深井' },
  { name: '游离液', category: '常规性能', standard: 'API RP 10B-11', unit: '%', typical: '< 0.5', criteria: '倾斜试管法，不超过 0.5%', note: '游离液导致层间窜流和强度不均' },
  { name: '密度', category: '常规性能', standard: 'API RP 10B-2', unit: 'g/cm³', typical: '设计值 ± 0.02', criteria: '现场连续测量与实验室复核', note: '加重/减轻配方需精确控制' },
  { name: '流变性（范式）', category: '流变性能', standard: 'API RP 10B-2', unit: 'Pa·s / Pa', typical: 'PV / YP', criteria: 'YP 低利于泵送，过高易沉降', note: '旋转粘度计，600/300 rpm 读数计算' },
  { name: '静胶凝强度', category: '流变性能', standard: 'API RP 10B-5 / 10B-4', unit: 'Pa', typical: '10 ~ 70 Pa 过渡', criteria: 'SGS 发展曲线平滑，防气窜关键', note: '过渡时间过短易气窜，过长影响候凝' },
  { name: '初凝 / 终凝时间', category: '常规性能', standard: 'GB/T 1346（类比）', unit: 'h', typical: '按配方', criteria: '与稠化时间相互印证', note: '现场常用稠化时间替代' },
  { name: '渗透率（胶结面）', category: '界面性能', standard: 'API 标准方法', unit: 'mD', typical: '越低越好', criteria: '界面冲洗和隔离液效果评价', note: '评价套管-水泥环胶结质量' },
  { name: '相容性试验', category: '界面性能', standard: 'API RP 10B-2', unit: '—', typical: '无异常增稠', criteria: '水泥浆与钻井液混合后性能', note: '混浆后稠化时间不应大幅缩短' },
  { name: '隔离液冲洗效率', category: '界面性能', standard: 'API RP 10B-2', unit: '%', typical: '> 90%', criteria: '泥饼清除率', note: '冲洗液+隔离液体系评价' },
  { name: '沉降稳定性', category: '稳定性', standard: 'API RP 10B-2', unit: 'g/cm³', typical: '密度差 < 0.03', criteria: '静置后上下密度差', note: '水平井和长封固段必测' },
  { name: '游离液（倾斜）', category: '稳定性', standard: 'API RP 10B-11', unit: 'mL', typical: '< 1.0 mL', criteria: '45° 倾斜 2h', note: '模拟倾斜井段游离液析出' },
  { name: '膨胀率', category: '特殊性能', standard: 'GB/T 50082', unit: '%', typical: '0.05% ~ 0.3%', criteria: '补偿收缩要求', note: '含膨胀剂配方必测' },
  { name: '防气窜（过渡时间）', category: '特殊性能', standard: '企业标准 / API 指南', unit: 'min', typical: '> 30 min', criteria: 'SGS 10→70 Pa 过渡时间', note: '气井固井评价核心指标之一' },
  { name: '钻塞时间', category: '施工评价', standard: '现场实测', unit: 'h', typical: '24 ~ 48 h 后', criteria: '水泥石可钻性', note: '打塞作业评价水泥浆适用性' },
];

const CENTRALIZER_SPECS = [
  // 弹性扶正器 — 4-1/2" 套管
  { type: '弹性', casing: '4-1/2', casingMm: 114.3, holeMin: 6, holeMax: 8.5, od: 146, length: 300, standoff: '50% ~ 67%', drag: '低 ~ 中', note: '浅井、中浅井常用，过盈量小' },
  { type: '弹性', casing: '4-1/2', casingMm: 114.3, holeMin: 8.5, holeMax: 12.25, od: 210, length: 300, standoff: '50% ~ 67%', drag: '中', note: '大尺寸井眼弹性扶正' },

  // 5-1/2" 套管
  { type: '弹性', casing: '5-1/2', casingMm: 139.7, holeMin: 7.875, holeMax: 12.25, od: 210, length: 300, standoff: '50% ~ 67%', drag: '中', note: '常规技术套管尺寸' },
  { type: '刚性', casing: '5-1/2', casingMm: 139.7, holeMin: 8.5, holeMax: 12.25, od: 210, length: 305, standoff: '66% ~ 70%', drag: '中 ~ 高', note: '直井段保证居中度' },

  // 7" 套管
  { type: '弹性', casing: '7', casingMm: 177.8, holeMin: 8.5, holeMax: 12.25, od: 210, length: 300, standoff: '50% ~ 67%', drag: '中', note: '7" 套管小井眼段' },
  { type: '弹性', casing: '7', casingMm: 177.8, holeMin: 12.25, holeMax: 17.5, od: 330, length: 300, standoff: '50% ~ 67%', drag: '中 ~ 高', note: '生产套管常见井眼配合' },
  { type: '刚性', casing: '7', casingMm: 177.8, holeMin: 12.25, holeMax: 17.5, od: 330, length: 305, standoff: '66% ~ 70%', drag: '高', note: '大井眼刚性扶正，注意下套管摩阻' },
  { type: '弓形弹性', casing: '7', casingMm: 177.8, holeMin: 8.375, holeMax: 12.25, od: 210, length: 300, standoff: '55% ~ 67%', drag: '低 ~ 中', note: '过缩径段能力强' },

  // 9-5/8" 套管
  { type: '弹性', casing: '9-5/8', casingMm: 244.5, holeMin: 12.25, holeMax: 17.5, od: 330, length: 300, standoff: '50% ~ 67%', drag: '中', note: '技术套管 / 表层大套管' },
  { type: '弹性', casing: '9-5/8', casingMm: 244.5, holeMin: 17.5, holeMax: 26, od: 508, length: 300, standoff: '50% ~ 67%', drag: '高', note: '大尺寸井眼，需计算下入摩阻' },
  { type: '刚性', casing: '9-5/8', casingMm: 244.5, holeMin: 12.25, holeMax: 17.5, od: 330, length: 305, standoff: '66% ~ 70%', drag: '高', note: '直井段高居中度' },
  { type: '滚轮扶正器', casing: '9-5/8', casingMm: 244.5, holeMin: 12.25, holeMax: 17.5, od: 330, length: 305, standoff: '66% ~ 70%', drag: '低', note: '水平井和大位移井降低摩阻' },

  // 13-3/8" 套管
  { type: '弹性', casing: '13-3/8', casingMm: 339.7, holeMin: 17.5, holeMax: 26, od: 508, length: 300, standoff: '50% ~ 67%', drag: '高', note: '表层套管大井眼扶正' },
  { type: '刚性', casing: '13-3/8', casingMm: 339.7, holeMin: 17.5, holeMax: 26, od: 508, length: 305, standoff: '66% ~ 70%', drag: '很高', note: '表层直井段，间距可放宽' },

  // 特殊
  { type: '扶正短节', casing: '5-1/2', casingMm: 139.7, holeMin: 8.5, holeMax: 12.25, od: 210, length: 600, standoff: '—', drag: '中', note: '一体化扶正短节，长度 600 mm' },
  { type: '扶正短节', casing: '7', casingMm: 177.8, holeMin: 12.25, holeMax: 17.5, od: 330, length: 600, standoff: '—', drag: '中 ~ 高', note: '减径井段或特殊井身结构' },
];

const PERFORATION_SPECS = [
  { gunOd: '2-1/8', casing: '4-1/2', hole: '6 ~ 8.5', shotDensity: '4 ~ 6 SPF', phasing: '0° / 60° / 90° / 120°', penetration: '300 ~ 500 mm', charge: 'DP / SP', pressure: '35 ~ 70 MPa', note: '浅层气井、油井常规射孔' },
  { gunOd: '2-7/8', casing: '5-1/2', hole: '7.875 ~ 12.25', shotDensity: '6 ~ 12 SPF', phasing: '60° / 90° / 120°', penetration: '400 ~ 600 mm', charge: 'DP / BH', pressure: '50 ~ 105 MPa', note: '中深井主力射孔枪尺寸' },
  { gunOd: '3-3/8', casing: '7', hole: '8.5 ~ 12.25', shotDensity: '6 ~ 12 SPF', phasing: '60° / 90°', penetration: '450 ~ 650 mm', charge: 'BH / DH', pressure: '70 ~ 105 MPa', note: '深穿透弹，致密储层' },
  { gunOd: '3-3/8', casing: '7', hole: '8.5 ~ 9.625', shotDensity: '12 ~ 16 SPF', phasing: '60° / 90°', penetration: '350 ~ 500 mm', charge: 'DP', pressure: '70 MPa', note: '高孔密，裂缝性储层' },
  { gunOd: '4', casing: '9-5/8', hole: '12.25 ~ 14.75', shotDensity: '6 ~ 10 SPF', phasing: '60° / 90° / 120°', penetration: '500 ~ 700 mm', charge: 'BH / DH', pressure: '70 ~ 105 MPa', note: '技术套管、生产套管大尺寸' },
  { gunOd: '4-1/2', casing: '10-3/4', hole: '12.25 ~ 17.5', shotDensity: '6 ~ 12 SPF', phasing: '60° / 90°', penetration: '500 ~ 750 mm', charge: 'BH', pressure: '70 ~ 105 MPa', note: '大井眼生产套管射孔' },
  { gunOd: '5', casing: '13-3/8', hole: '17.5 ~ 22', shotDensity: '4 ~ 8 SPF', phasing: '60° / 90°', penetration: '600 ~ 800 mm', charge: 'BH', pressure: '70 MPa', note: '表层套管或大尺寸完井' },
  { gunOd: '2-1/8', casing: '4-1/2', hole: '6 ~ 8.5', shotDensity: '12 ~ 20 SPF', phasing: '90° / 120°', penetration: '250 ~ 400 mm', charge: 'SP', pressure: '35 ~ 70 MPa', note: '超深穿透低孔密，防砂前置' },
  { gunOd: '2-7/8', casing: '5-1/2', hole: '7.875 ~ 9.625', shotDensity: '16 ~ 24 SPF', phasing: '60° / 90°', penetration: '300 ~ 450 mm', charge: 'DP', pressure: '70 MPa', note: '页岩气压裂前射孔，高孔密' },
  { gunOd: '3-1/8', casing: '7', hole: '8.5 ~ 9.625', shotDensity: '8 ~ 12 SPF', phasing: '0° / 180°', penetration: '400 ~ 550 mm', charge: 'DP', pressure: '70 MPa', note: '水平井定向射孔，0°/180° 相位' },
  { gunOd: '3-3/8', casing: '7-5/8', hole: '9.625 ~ 12.25', shotDensity: '6 ~ 10 SPF', phasing: '60° / 90°', penetration: '450 ~ 600 mm', charge: 'BH', pressure: '70 ~ 105 MPa', note: '常规中深井生产套管' },
  { gunOd: '4', casing: '9-5/8', hole: '12.25 ~ 14.75', shotDensity: '8 ~ 14 SPF', phasing: '60° / 90°', penetration: '500 ~ 650 mm', charge: 'BH / DH', pressure: '70 ~ 105 MPa', note: '碳酸盐岩储层深穿透' },
  { gunOd: '2-1/8', casing: '5', hole: '7.875 ~ 8.5', shotDensity: '6 ~ 10 SPF', phasing: '60° / 90°', penetration: '350 ~ 500 mm', charge: 'DP', pressure: '50 ~ 70 MPa', note: '小套管完井' },
  { gunOd: 'TCP 枪', casing: '5-1/2', hole: '裸眼 / 套管', shotDensity: '4 ~ 8 SPF', phasing: '60° / 90°', penetration: '500 ~ 900 mm', charge: 'BH / DH', pressure: '105 MPa', note: '油管输送射孔，深井、超深井' },
  { gunOd: 'TCP 枪', casing: '7', hole: '裸眼 / 套管', shotDensity: '4 ~ 10 SPF', phasing: '60° / 90°', penetration: '600 ~ 1000 mm', charge: 'DH', pressure: '105 MPa', note: '超深穿透，致密油气藏' },
  { gunOd: '2-1/8', casing: '4-1/2', hole: '6 ~ 8.5', shotDensity: '6 ~ 8 SPF', phasing: '120°', penetration: '300 ~ 450 mm', charge: 'SP', pressure: '35 MPa', note: '负压射孔，降低压实伤害' },
  { gunOd: '3-3/8', casing: '7', hole: '8.5 ~ 9.625', shotDensity: '10 ~ 14 SPF', phasing: '90°', penetration: '350 ~ 500 mm', charge: 'DP', pressure: '70 MPa', note: '砾岩、砂岩常规射孔' },
  { gunOd: '4-1/2', casing: '11-3/4', hole: '14.75 ~ 17.5', shotDensity: '4 ~ 8 SPF', phasing: '60° / 90°', penetration: '550 ~ 750 mm', charge: 'BH', pressure: '70 MPa', note: '大套管完井' },
];

const SCREEN_SPECS = [
  { type: '割缝筛管', od: '4-1/2', odMm: 114.3, slot: '0.15 ~ 0.40 mm', length: '3 ~ 12 m', material: 'J55 / N80', application: '中粗砂岩防砂', note: '成本低，适合粒径 > 0.5 mm 地层' },
  { type: '割缝筛管', od: '5-1/2', odMm: 139.7, slot: '0.15 ~ 0.50 mm', length: '3 ~ 12 m', material: 'N80 / P110', application: '常规砂岩防砂', note: '国内陆上油田最常用' },
  { type: '割缝筛管', od: '7', odMm: 177.8, slot: '0.20 ~ 0.50 mm', length: '3 ~ 12 m', material: 'N80 / P110', application: '大排量出液井', note: '大通道，适合高产能井' },
  { type: '绕丝筛管', od: '4-1/2', odMm: 114.3, slot: '0.10 ~ 0.30 mm', length: '3 ~ 9 m', material: '不锈钢绕丝', application: '粉细砂防砂', note: '控砂精度高，成本较高' },
  { type: '绕丝筛管', od: '5-1/2', odMm: 139.7, slot: '0.10 ~ 0.35 mm', length: '3 ~ 9 m', material: '不锈钢绕丝', application: '粉砂岩油藏', note: '粒径 0.1 ~ 0.5 mm 地层优选' },
  { type: '绕丝筛管', od: '7', odMm: 177.8, slot: '0.15 ~ 0.40 mm', length: '3 ~ 9 m', material: '不锈钢绕丝', application: '海上及高含砂井', note: '耐腐蚀性能好' },
  { type: '金属毡筛管', od: '5-1/2', odMm: 139.7, slot: '0.08 ~ 0.20 mm', length: '3 ~ 6 m', material: '粉末烧结金属', application: '超细粉砂', note: '控砂精度最高，渗透率较低' },
  { type: '预充填砾石筛管', od: '7', odMm: 177.8, slot: '0.30 ~ 0.50 mm', length: '3 ~ 9 m', material: 'N80 + 砾石', application: '疏松砂岩', note: '筛管外预充填 16/20 目砾石' },
  { type: '膨胀筛管', od: '5-1/2', odMm: 139.7, slot: '0.15 ~ 0.35 mm', length: '3 ~ 6 m', material: '特种合金', application: '裸眼完井防砂', note: '膨胀封隔井壁，一体化完井' },
  { type: '膨胀筛管', od: '7', odMm: 177.8, slot: '0.20 ~ 0.40 mm', length: '3 ~ 6 m', material: '特种合金', application: '水平井裸眼防砂', note: '减少沉砂环空' },
  { type: '复合筛管', od: '5-1/2', odMm: 139.7, slot: '0.12 ~ 0.30 mm', length: '3 ~ 9 m', material: '绕丝 + 金属毡', application: '粉细砂油藏', note: '双层过滤，兼顾精度与渗透' },
  { type: '割缝筛管', od: '3-1/2', odMm: 88.9, slot: '0.10 ~ 0.25 mm', length: '3 ~ 6 m', material: 'N80', application: '小井眼 / 侧钻井', note: '配套 3-1/2" 套管' },
  { type: '绕丝筛管', od: '9-5/8', odMm: 244.5, slot: '0.25 ~ 0.50 mm', length: '3 ~ 12 m', application: '大直径生产套管', material: '不锈钢绕丝', note: '大排量海上井' },
  { type: '砾石充填筛管', od: '7', odMm: 177.8, slot: '0.30 ~ 0.50 mm', length: '3 ~ 9 m', material: 'N80', application: '砾石充填防砂', note: '配合 16/20 ~ 20/40 目砾石' },
  { type: '割缝筛管', od: '6-5/8', odMm: 168.3, slot: '0.15 ~ 0.40 mm', length: '3 ~ 9 m', material: 'N80 / P110', application: '中深井防砂', note: '介于 5-1/2" 与 7" 之间' },
];

const ACIDIZING_CATEGORIES = ['全部', '常规酸化', '土酸', '深部酸化', '压裂酸化', '缓速酸', '转向酸', '其他'];

const ACIDIZING_FORMULAS = [
  { name: '常规盐酸酸化', category: '常规酸化', composition: 'HCl 10% ~ 15%', dosage: '按孔隙体积 1 ~ 3 PV', tempMax: '120 °C', effect: '碳酸盐岩溶蚀增渗，灰岩、白云岩油藏' },
  { name: '土酸（常规）', category: '土酸', composition: 'HCl 8% ~ 12% + HF 3% ~ 6%', dosage: '1 ~ 2 PV', tempMax: '150 °C', effect: '砂岩储层溶蚀石英、粘土矿物，解除污染' },
  { name: '土酸（深部）', category: '深部酸化', composition: 'HCl 5% ~ 8% + HF 1% ~ 3%', dosage: '2 ~ 4 PV', tempMax: '180 °C', effect: '深部穿透，低 HF 浓度延缓反应' },
  { name: '自生土酸', category: '深部酸化', composition: 'NH₄F / HCl 前置 + 反应生成 HF', dosage: '1.5 ~ 3 PV', tempMax: '160 °C', effect: '缓速深穿透，降低管壁腐蚀' },
  { name: '胶凝酸', category: '压裂酸化', composition: 'HCl 15% ~ 20% + 增粘剂', dosage: '按裂缝体积', tempMax: '150 °C', effect: '碳酸盐岩压裂酸化，提高裂缝导流能力' },
  { name: '交联酸', category: '压裂酸化', composition: 'HCl 15% ~ 28% + 交联剂', dosage: '按裂缝体积', tempMax: '160 °C', effect: '高粘度携砂酸压，深井碳酸盐岩' },
  { name: '泡沫酸', category: '压裂酸化', composition: 'HCl 10% ~ 20% + 氮气 / CO₂', dosage: '1 ~ 2 PV', tempMax: '140 °C', effect: '低压漏失层酸化，减少滤失' },
  { name: '缓速酸（Emulsified）', category: '缓速酸', composition: 'HCl + 柴油乳化', dosage: '1 ~ 2 PV', tempMax: '130 °C', effect: '延缓酸岩反应速度，深部均匀酸化' },
  { name: '缓速酸（胶束）', category: '缓速酸', composition: 'HCl + 表面活性剂胶束', dosage: '1 ~ 2 PV', tempMax: '150 °C', effect: '表面活性剂缓速，高温砂岩适用' },
  { name: '转向酸', category: '转向酸', composition: 'HCl + 转向剂（VES / 聚合物）', dosage: '1 ~ 3 PV', tempMax: '150 °C', effect: '高渗层封堵，低渗层深穿透' },
  { name: '稠化酸', category: '常规酸化', composition: 'HCl 10% ~ 15% + 聚合物增粘', dosage: '1 ~ 2 PV', tempMax: '120 °C', effect: '提高悬浮能力，携脏能力好' },
  { name: '有机酸（甲酸）', category: '其他', composition: 'HCOOH 5% ~ 10%', dosage: '1 ~ 2 PV', tempMax: '200 °C', effect: '高温深井，腐蚀性低于盐酸' },
  { name: '有机酸（乙酸）', category: '其他', composition: 'CH₃COOH 5% ~ 10%', dosage: '1 ~ 2 PV', tempMax: '180 °C', effect: '灰岩溶解，缓速性好' },
  { name: '复合酸（酸+表面活性剂）', category: '常规酸化', composition: 'HCl 10% + 氟碳表面活性剂', dosage: '1 ~ 2 PV', tempMax: '130 °C', effect: '降低界面张力，助排，解除水锁' },
  { name: '压裂前置酸', category: '压裂酸化', composition: 'HCl 5% ~ 8% 低粘度', dosage: '0.5 ~ 1 PV', tempMax: '150 °C', effect: '压裂前清洗裂缝面，改善胶结' },
  { name: '酸化后置液', category: '其他', composition: 'NH₄Cl 2% ~ 5% 或清水', dosage: '0.5 ~ 1 PV', tempMax: '—', effect: '置换残酸，防止二次沉淀' },
  { name: '铁稳定剂配方', category: '其他', composition: '酸液 + 铁螯合剂 1% ~ 3%', dosage: '随主酸液', tempMax: '150 °C', effect: '防止 Fe³⁺沉淀堵塞地层' },
  { name: '防膨剂配方', category: '土酸', composition: '土酸 + KCl 2% ~ 3% 或 Claystab', dosage: '随主酸液', tempMax: '150 °C', effect: '抑制粘土膨胀，保护储层' },
  { name: '低浓度 HF 酸', category: '土酸', composition: 'HCl 5% + HF 0.5% ~ 1.5%', dosage: '2 ~ 3 PV', tempMax: '180 °C', effect: '敏感砂岩，降低矿物溶蚀伤害' },
  { name: '碳酸盐岩深穿透酸', category: '深部酸化', composition: 'HCl 15% ~ 20% + 缓速剂', dosage: '1.5 ~ 3 PV', tempMax: '160 °C', effect: '缝洞型碳酸盐岩深部改造' },
];

const PUMPING_UNIT_SPECS = [
  { model: 'C912', type: '常规游梁', torqueFactor: '0.90 ~ 1.05', stroke: '1.8 / 2.4 / 3.0 m', load: '90 kN', power: '11 kW', gearbox: '45 kN·m', note: '浅井、小排量，低冲程' },
  { model: 'C1010', type: '常规游梁', torqueFactor: '0.95 ~ 1.10', stroke: '2.0 / 2.5 / 3.0 m', load: '100 kN', power: '15 kW', gearbox: '57 kN·m', note: '中浅井常用' },
  { model: 'C1214', type: '常规游梁', torqueFactor: '1.00 ~ 1.15', stroke: '2.4 / 3.0 / 3.6 m', load: '120 kN', power: '22 kW', gearbox: '86 kN·m', note: '陆上常规油井主力机型' },
  { model: 'C1416', type: '常规游梁', torqueFactor: '1.05 ~ 1.20', stroke: '2.4 / 3.0 / 3.6 m', load: '140 kN', power: '30 kW', gearbox: '114 kN·m', note: '中等载荷井' },
  { model: 'C1616', type: '常规游梁', torqueFactor: '1.05 ~ 1.22', stroke: '2.4 / 3.0 / 3.6 m', load: '160 kN', power: '37 kW', gearbox: '143 kN·m', note: '中大排量抽油' },
  { model: 'C1816', type: '常规游梁', torqueFactor: '1.08 ~ 1.25', stroke: '2.4 / 3.0 / 3.6 m', load: '180 kN', power: '45 kW', gearbox: '172 kN·m', note: '深井、大泵径' },
  { model: 'C2016', type: '常规游梁', torqueFactor: '1.10 ~ 1.28', stroke: '2.4 / 3.0 / 3.6 m', load: '200 kN', power: '55 kW', gearbox: '229 kN·m', note: '高载荷深井' },
  { model: 'C228', type: '常规游梁', torqueFactor: '1.12 ~ 1.30', stroke: '3.0 / 3.6 / 4.2 m', load: '220 kN', power: '75 kW', gearbox: '286 kN·m', note: '大冲程、大载荷' },
  { model: 'C2515', type: '常规游梁', torqueFactor: '1.15 ~ 1.32', stroke: '3.0 / 3.6 / 4.2 m', load: '250 kN', power: '90 kW', gearbox: '343 kN·m', note: '重载深井' },
  { model: 'C2815', type: '常规游梁', torqueFactor: '1.18 ~ 1.35', stroke: '3.0 / 3.6 / 4.2 m', load: '280 kN', power: '110 kW', gearbox: '400 kN·m', note: '超重载机型' },
  { model: 'CYJ10-3-37HB', type: '异型游梁', torqueFactor: '1.00 ~ 1.15', stroke: '1.8 / 2.4 / 3.0 m', load: '100 kN', power: '37 kW', gearbox: '86 kN·m', note: '节能型，平衡优化' },
  { model: 'CYJ12-4-55HB', type: '异型游梁', torqueFactor: '1.05 ~ 1.20', stroke: '2.4 / 3.0 / 3.6 m', load: '120 kN', power: '55 kW', gearbox: '114 kN·m', note: '长冲程节能机' },
  { model: 'CYJ14-6-89HB', type: '异型游梁', torqueFactor: '1.08 ~ 1.25', stroke: '3.0 / 3.6 / 4.2 m', load: '140 kN', power: '89 kW', gearbox: '172 kN·m', note: '大冲程低冲次' },
  { model: '前置式抽油机', type: '前置式', torqueFactor: '1.10 ~ 1.28', stroke: '3.0 / 3.6 / 4.2 m', load: '160 ~ 200 kN', power: '55 ~ 75 kW', gearbox: '172 ~ 229 kN·m', note: '紧凑布局，海上平台适用' },
  { model: '塔式抽油机', type: '塔式', torqueFactor: '1.05 ~ 1.22', stroke: '3.6 / 4.2 / 5.0 m', load: '200 ~ 280 kN', power: '90 ~ 110 kW', gearbox: '286 ~ 400 kN·m', note: '超长冲程，低冲次大排量' },
];

const DOWNHOLE_PUMP_SPECS = [
  { type: '管式泵', barrel: '32 mm', plunger: '32 mm', length: '3 ~ 12 m', capacity: '8 ~ 25 m³/d', stroke: '1.8 ~ 4.2 m', note: '小泵径浅井，配套 2-1/2" 油管' },
  { type: '管式泵', barrel: '38 mm', plunger: '38 mm', length: '3 ~ 12 m', capacity: '12 ~ 40 m³/d', stroke: '2.4 ~ 4.2 m', note: '常规中浅井主力泵径' },
  { type: '管式泵', barrel: '44 mm', plunger: '44 mm', length: '3 ~ 12 m', capacity: '20 ~ 60 m³/d', stroke: '2.4 ~ 4.2 m', note: '中等排量油井' },
  { type: '管式泵', barrel: '50 mm', plunger: '50 mm', length: '3 ~ 12 m', capacity: '30 ~ 80 m³/d', stroke: '3.0 ~ 4.2 m', note: '大排量常规泵' },
  { type: '管式泵', barrel: '57 mm', plunger: '57 mm', length: '3 ~ 12 m', capacity: '40 ~ 120 m³/d', stroke: '3.0 ~ 4.2 m', note: '高产能井' },
  { type: '管式泵', barrel: '64 mm', plunger: '64 mm', length: '3 ~ 12 m', capacity: '60 ~ 160 m³/d', stroke: '3.0 ~ 5.0 m', note: '大泵径，需校核杆柱强度' },
  { type: '管式泵', barrel: '70 mm', plunger: '70 mm', length: '3 ~ 12 m', capacity: '80 ~ 200 m³/d', stroke: '3.6 ~ 5.0 m', note: '大排量井，常用 3-1/2" 油管' },
  { type: '杆式泵', barrel: '38 mm', plunger: '38 mm', length: '3 ~ 9 m', capacity: '10 ~ 35 m³/d', stroke: '2.4 ~ 4.2 m', note: '检泵方便，不需起油管' },
  { type: '杆式泵', barrel: '44 mm', plunger: '44 mm', length: '3 ~ 9 m', capacity: '18 ~ 55 m³/d', stroke: '2.4 ~ 4.2 m', note: '斜井、定向井常用' },
  { type: '杆式泵', barrel: '50 mm', plunger: '50 mm', length: '3 ~ 9 m', capacity: '25 ~ 70 m³/d', stroke: '3.0 ~ 4.2 m', note: '中等排量，维护成本低' },
  { type: '杆式泵', barrel: '57 mm', plunger: '57 mm', length: '3 ~ 9 m', capacity: '35 ~ 100 m³/d', stroke: '3.0 ~ 4.2 m', note: '大排量杆式泵' },
  { type: '螺杆泵', barrel: '—', plunger: '50 ~ 120 mm', length: '1.5 ~ 3 m', capacity: '10 ~ 200 m³/d', stroke: '连续', note: '稠油、含砂井，低转速' },
  { type: '螺杆泵', barrel: '—', plunger: '80 ~ 150 mm', length: '2 ~ 4 m', capacity: '30 ~ 400 m³/d', stroke: '连续', note: '高粘度原油开采' },
  { type: '防砂泵', barrel: '44 mm', plunger: '44 mm', length: '3 ~ 9 m', capacity: '15 ~ 50 m³/d', stroke: '2.4 ~ 3.6 m', note: '泵入口滤网 + 沉砂杯' },
  { type: '防砂泵', barrel: '50 mm', plunger: '50 mm', length: '3 ~ 9 m', capacity: '25 ~ 70 m³/d', stroke: '3.0 ~ 4.2 m', note: '出砂井配套' },
  { type: '双金属泵', barrel: '44 mm', plunger: '44 mm', length: '3 ~ 12 m', capacity: '18 ~ 55 m³/d', stroke: '2.4 ~ 4.2 m', note: '耐腐蚀，含 CO₂ / H₂S 井' },
  { type: '双金属泵', barrel: '57 mm', plunger: '57 mm', length: '3 ~ 12 m', capacity: '35 ~ 100 m³/d', stroke: '3.0 ~ 4.2 m', note: '腐蚀环境大排量' },
  { type: '整筒式泵', barrel: '38 mm', plunger: '38 mm', length: '3 ~ 12 m', capacity: '12 ~ 40 m³/d', stroke: '2.4 ~ 4.2 m', note: '整筒结构，密封性好' },
  { type: '整筒式泵', barrel: '44 mm', plunger: '44 mm', length: '3 ~ 12 m', capacity: '20 ~ 60 m³/d', stroke: '2.4 ~ 4.2 m', note: '中深井常规配置' },
  { type: '串联泵', barrel: '38 + 32 mm', plunger: '双级', length: '6 ~ 18 m', capacity: '15 ~ 45 m³/d', stroke: '3.0 ~ 4.2 m', note: '深井提液，降低杆柱载荷' },
];

const SUCKER_ROD_SPECS = [
  { grade: 'C', od: '5/8', odMm: 15.9, weight: 1.58, yield: 414, tensile: 655, coupling: 'SM / SH', note: '轻载荷浅井' },
  { grade: 'C', od: '3/4', odMm: 19.1, weight: 2.30, yield: 414, tensile: 655, coupling: 'SM / SH', note: '常规浅井' },
  { grade: 'C', od: '7/8', odMm: 22.2, weight: 3.07, yield: 414, tensile: 655, coupling: 'SM / SH', note: '中浅井' },
  { grade: 'D', od: '5/8', odMm: 15.9, weight: 1.58, yield: 517, tensile: 793, coupling: 'SM / SH', note: 'API 最常用钢级' },
  { grade: 'D', od: '3/4', odMm: 19.1, weight: 2.30, yield: 517, tensile: 793, coupling: 'SM / SH', note: '常规油井主力杆径' },
  { grade: 'D', od: '7/8', odMm: 22.2, weight: 3.07, yield: 517, tensile: 793, coupling: 'SM / SH', note: '中等载荷' },
  { grade: 'D', od: '1', odMm: 25.4, weight: 4.08, yield: 517, tensile: 793, coupling: 'SM / SH', note: '大泵径、大冲程' },
  { grade: 'D', od: '1-1/8', odMm: 28.6, weight: 5.16, yield: 517, tensile: 793, coupling: 'SM / SH', note: '高载荷井' },
  { grade: 'KD', od: '3/4', odMm: 19.1, weight: 2.30, yield: 620, tensile: 862, coupling: 'SM / SH', note: '高应力 D 级改良' },
  { grade: 'KD', od: '7/8', odMm: 22.2, weight: 3.07, yield: 620, tensile: 862, coupling: 'SM / SH', note: '深井、定向井' },
  { grade: 'KD', od: '1', odMm: 25.4, weight: 4.08, yield: 620, tensile: 862, coupling: 'SM / SH', note: '高冲程深井' },
  { grade: 'HL', od: '3/4', odMm: 19.1, weight: 2.30, yield: 552, tensile: 862, coupling: 'SM / SH', note: '耐腐蚀，含 H₂S 井' },
  { grade: 'HL', od: '7/8', odMm: 22.2, weight: 3.07, yield: 552, tensile: 862, coupling: 'SM / SH', note: '腐蚀环境' },
  { grade: 'K', od: '3/4', odMm: 19.1, weight: 2.30, yield: 655, tensile: 965, coupling: 'SM / SH', note: '超高强度，深井' },
  { grade: 'K', od: '7/8', odMm: 22.2, weight: 3.07, yield: 655, tensile: 965, coupling: 'SM / SH', note: '深井大载荷' },
  { grade: 'K', od: '1', odMm: 25.4, weight: 4.08, yield: 655, tensile: 965, coupling: 'SM / SH', note: '超重载杆柱' },
  { grade: 'D', od: '1-1/4', odMm: 31.8, weight: 6.35, yield: 517, tensile: 793, coupling: 'SM / SH', note: '特重载荷，需校核螺纹' },
  { grade: '玻璃钢杆', od: '1', odMm: 25.4, weight: 1.10, yield: '—', tensile: 400, coupling: '专用', note: '腐蚀介质，减轻杆柱重量' },
];

const CHOKE_COEFFICIENTS = [
  { type: '固定油嘴', size: '2 mm', cv: '0.08', flow: '1 ~ 5 m³/d', pressure: 'ΔP 依赖', note: '极小流量控制' },
  { type: '固定油嘴', size: '3 mm', cv: '0.18', flow: '3 ~ 12 m³/d', pressure: 'ΔP 依赖', note: '低产井' },
  { type: '固定油嘴', size: '4 mm', cv: '0.32', flow: '6 ~ 20 m³/d', pressure: 'ΔP 依赖', note: '常规低产井' },
  { type: '固定油嘴', size: '5 mm', cv: '0.50', flow: '10 ~ 35 m³/d', pressure: 'ΔP 依赖', note: '中产井常用' },
  { type: '固定油嘴', size: '6 mm', cv: '0.72', flow: '15 ~ 50 m³/d', pressure: 'ΔP 依赖', note: '中等产量' },
  { type: '固定油嘴', size: '8 mm', cv: '1.28', flow: '25 ~ 90 m³/d', pressure: 'ΔP 依赖', note: '高产井' },
  { type: '固定油嘴', size: '10 mm', cv: '2.00', flow: '40 ~ 140 m³/d', pressure: 'ΔP 依赖', note: '大排量井' },
  { type: '固定油嘴', size: '12 mm', cv: '2.88', flow: '60 ~ 200 m³/d', pressure: 'ΔP 依赖', note: '高产能井' },
  { type: '固定油嘴', size: '16 mm', cv: '5.12', flow: '100 ~ 350 m³/d', pressure: 'ΔP 依赖', note: '大油嘴' },
  { type: '可调油嘴', size: '4 ~ 12 mm', cv: '可调', flow: '按开度', pressure: 'ΔP 依赖', note: '针阀式，地面调节产量' },
  { type: '井下节流嘴', size: '2 ~ 6 mm', cv: '0.1 ~ 0.7', flow: '5 ~ 40 m³/d', pressure: '井筒温压', note: '井下节流，改善温压分布' },
  { type: '气井油嘴', size: '3 ~ 8 mm', cv: '0.2 ~ 1.3', flow: '按气量', pressure: 'ΔP 依赖', note: '气井产量控制，防携液' },
  { name: '流量公式', type: '参考', size: '—', cv: 'Q = Cv·√(ΔP/ρ)', flow: '—', pressure: '—', note: 'Bean 嘴公式简化，ρ 为流体密度' },
  { name: '临界流', type: '参考', size: '—', cv: '—', flow: 'Q ∝ P上游', pressure: 'P下游/P上游 < 0.55', note: '气井临界流动条件（近似）' },
  { name: '嘴损系数', type: '参考', size: '—', cv: 'β = ΔP / (ρv²/2)', flow: '—', pressure: '—', note: '局部阻力系数，工程设计校核' },
];

const ESP_PUMP_SPECS = [
  { series: '400 系列', stages: '50 ~ 200', od: '4 in', odMm: 102, flow: '50 ~ 200 m³/d', head: '500 ~ 2000 m', power: '15 ~ 75 kW', note: '小排量浅井电潜泵' },
  { series: '400 系列', stages: '100 ~ 300', od: '4 in', odMm: 102, flow: '80 ~ 300 m³/d', head: '800 ~ 2500 m', power: '30 ~ 110 kW', note: '中浅井常规配置' },
  { series: '500 系列', stages: '100 ~ 400', od: '5 in', odMm: 127, flow: '100 ~ 500 m³/d', head: '1000 ~ 3000 m', power: '45 ~ 185 kW', note: '国内海上及陆地主力' },
  { series: '500 系列', stages: '150 ~ 500', od: '5 in', odMm: 127, flow: '150 ~ 600 m³/d', head: '1200 ~ 3500 m', power: '75 ~ 250 kW', note: '中高排量井' },
  { series: '538 系列', stages: '200 ~ 600', od: '5.38 in', odMm: 137, flow: '200 ~ 800 m³/d', head: '1500 ~ 4000 m', power: '110 ~ 350 kW', note: '大排量电潜泵' },
  { series: '675 系列', stages: '200 ~ 800', od: '6.75 in', odMm: 171, flow: '300 ~ 1500 m³/d', head: '1500 ~ 4500 m', power: '150 ~ 500 kW', note: '大排量、高扬程' },
  { series: '675 系列', stages: '300 ~ 1000', od: '6.75 in', odMm: 171, flow: '400 ~ 2000 m³/d', head: '2000 ~ 5000 m', power: '250 ~ 750 kW', note: '海上高产能井' },
  { series: '800 系列', stages: '300 ~ 1200', od: '8 in', odMm: 203, flow: '500 ~ 3000 m³/d', head: '2000 ~ 5500 m', power: '350 ~ 1200 kW', note: '超大排量，气举辅助' },
  { series: 'YQY 系列', stages: '100 ~ 400', od: '5 in', odMm: 127, flow: '80 ~ 400 m³/d', head: '800 ~ 2800 m', power: '37 ~ 160 kW', note: '国产常规电潜泵' },
  { series: 'YQY 系列', stages: '150 ~ 600', od: '5.38 in', odMm: 137, flow: '120 ~ 600 m³/d', head: '1000 ~ 3500 m', power: '75 ~ 280 kW', note: '国产中大排量' },
  { series: '耐腐蚀泵', stages: '100 ~ 500', od: '5 in', odMm: 127, flow: '100 ~ 500 m³/d', head: '1000 ~ 3500 m', power: '55 ~ 250 kW', note: 'Ni-Resist / 不锈钢，含 H₂S / CO₂' },
  { series: '永磁同步 ESP', stages: '100 ~ 600', od: '5 ~ 6.75 in', odMm: 127, flow: '100 ~ 1200 m³/d', head: '1000 ~ 4000 m', power: '45 ~ 600 kW', note: '永磁电机，效率高 5% ~ 10%' },
  { series: '斜井泵', stages: '100 ~ 400', od: '5 in', odMm: 127, flow: '80 ~ 400 m³/d', head: '800 ~ 2800 m', power: '45 ~ 185 kW', note: '泵节带扶正器，斜井 / 水平井' },
  { series: '小管柱 ESP', stages: '50 ~ 200', od: '3.75 in', odMm: 95, flow: '30 ~ 150 m³/d', head: '500 ~ 2000 m', power: '15 ~ 75 kW', note: '小套管完井，3-1/2" 套管' },
  { series: '高温 ESP', stages: '100 ~ 500', od: '5 in', odMm: 127, flow: '100 ~ 500 m³/d', head: '1000 ~ 3500 m', power: '75 ~ 280 kW', note: '耐温 150 ~ 180 °C，深井热采' },
];

const API_GRAVITY_REF = [
  { api: '10', sg: 1.000, density: '1.000 g/cm³', type: '超重质原油', note: 'API < 10 为沥青或超重油' },
  { api: '15', sg: 0.966, density: '0.966 g/cm³', type: '重质原油', note: '需加热或稀释输送' },
  { api: '20', sg: 0.934, density: '0.934 g/cm³', type: '中重质原油', note: '常规稠油上限' },
  { api: '28', sg: 0.887, density: '0.887 g/cm³', type: '中质原油', note: '国内陆上常见' },
  { api: '35', sg: 0.850, density: '0.850 g/cm³', type: '轻质原油', note: '炼厂优选' },
  { api: '40', sg: 0.825, density: '0.825 g/cm³', type: '轻质原油', note: '中东轻质油典型值' },
  { api: '45', sg: 0.802, density: '0.802 g/cm³', type: '超轻质原油', note: '凝析油边界' },
  { api: '50', sg: 0.780, density: '0.780 g/cm³', type: '凝析油', note: '气藏凝析油' },
];

const UNIT_CATEGORIES = {
  length: { label: '长度', units: { m: 1, ft: 0.3048, in: 0.0254, mm: 0.001 } },
  pressure: { label: '压力', units: { MPa: 1, psi: 0.00689476, kPa: 0.001, bar: 0.1 } },
  density: { label: '密度', units: { 'g/cm³': 1, 'lb/gal': 0.119826, 'kg/m³': 0.001, ppg: 0.119826 } },
  flow: { label: '排量', units: { 'L/s': 1, 'm³/min': 16.667, gpm: 0.06309, 'bbl/min': 2.649 } },
  force: { label: '力', units: { kN: 1, 'lbf': 0.004448, tonf: 9.807, 'kgf': 0.009807 } },
  torque: { label: '扭矩', units: { 'kN·m': 1, 'N·m': 0.001, 'lbf·ft': 0.001356, 'kgf·m': 0.009807 } },
  area: { label: '面积', units: { 'in²': 1, 'mm²': 0.00155, 'cm²': 0.155 } },
};

function getTool(id) {
  return TOOLS.find((t) => t.id === id);
}

function getCategory(id) {
  return CATEGORIES.find((c) => c.id === id);
}

function getToolsByCategory(catId) {
  return TOOLS.filter((t) => t.category === catId);
}

function getDomain(id) {
  return DOMAINS.find((d) => d.id === id);
}

function getToolsByDomain(domainId) {
  return TOOLS.filter((t) => t.domain === domainId);
}

function getToolDomain(tool) {
  if (!tool) return null;
  return getDomain(tool.domain);
}

window.DT = {
  EXTERNAL_LINKS,
  WECHAT_PROMO,
  CATEGORIES,
  DOMAINS,
  TOOLS,
  THREAD_FAMILIES,
  THREAD_TYPES,
  CASING_SPECS,
  DRILLPIPE_SPECS,
  COLLAR_SPECS,
  TUBING_SPECS,
  STEEL_GRADES,
  BOP_SPECS,
  WELLHEAD_SPECS,
  ROCK_DENSITIES,
  WELL_LOG_CURVES,
  WELL_LOG_LITHOLOGY,
  WELL_LOG_FLUID_RULES,
  WELL_LOG_REF,
  MUD_ADDITIVE_CATEGORIES,
  MUD_ADDITIVES,
  IADC_BITS,
  DRILLING_PARAMS_BY_HOLE,
  DRILLING_PARAM_ADJUSTMENTS,
  DRILLING_HYDRAULICS_CRITERIA,
  DRILLING_PARAMS_DISCLAIMER,
  CEMENT_GRADES,
  CEMENT_SULFATE_LEGEND,
  CEMENT_ADDITIVE_CATEGORIES,
  CEMENT_ADDITIVES,
  CEMENT_SLURRY_PROPERTIES,
  CEMENT_TEST_ITEMS,
  CENTRALIZER_SPECS,
  PERFORATION_SPECS,
  SCREEN_SPECS,
  ACIDIZING_CATEGORIES,
  ACIDIZING_FORMULAS,
  PUMPING_UNIT_SPECS,
  DOWNHOLE_PUMP_SPECS,
  SUCKER_ROD_SPECS,
  CHOKE_COEFFICIENTS,
  ESP_PUMP_SPECS,
  API_GRAVITY_REF,
  UNIT_CATEGORIES,
  getTool,
  getCategory,
  getToolsByCategory,
  getDomain,
  getToolsByDomain,
  getToolDomain,
};
})();
