(function() {
  'use strict';

  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();
  var accent2 = style.getPropertyValue('--accent2').trim();
  var ink = style.getPropertyValue('--ink').trim();
  var muted = style.getPropertyValue('--muted').trim();
  var rule = style.getPropertyValue('--rule').trim();
  var bg2 = style.getPropertyValue('--bg2').trim();
  var danger = style.getPropertyValue('--danger').trim();
  var warn = style.getPropertyValue('--warn').trim();
  var success = style.getPropertyValue('--success').trim();

  var intlColor = '#7c3aed';

  // Store chart instances globally for lazy resize
  var charts = [];
  window.__chartInstances = charts;
  window.resizeAllCharts = function() {
    charts.forEach(function(c) {
      if (c && typeof c.resize === 'function') c.resize();
    });
  };

  // ========== Chart 1: Domestic Timeline ==========
  var chart1 = echarts.init(document.getElementById('chart-timeline-domestic'), null, { renderer: 'svg' });
  chart1.setOption({
    animation: false,
    tooltip: {
      trigger: 'item',
      appendToBody: true,
      formatter: function(p) {
        return '<b>' + p.data.name + '</b><br/>' + p.data.value[0] + '<br/>' + p.data.desc;
      }
    },
    grid: { left: '8%', right: '5%', top: 60, bottom: 60 },
    xAxis: {
      type: 'category',
      data: ['7/1', '7/6', '7/16', '7/20', '7/21', '7/22', '7/26', '7/30'],
      axisLine: { lineStyle: { color: rule } },
      axisLabel: { color: muted, fontSize: 12 },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      max: 10,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: muted, fontSize: 11 },
      splitLine: { lineStyle: { color: rule, type: 'dashed' } },
      name: '政策重要度',
      nameTextStyle: { color: muted, fontSize: 12 }
    },
    series: [{
      type: 'bar',
      data: [
        { value: 9, name: 'GB/T 47678系列标准实施', desc: '9项国家标准全面实施', itemStyle: { color: danger } },
        { value: 8, name: '城市体检经验清单(第二批)', desc: '住建部印发可复制经验', itemStyle: { color: accent } },
        { value: 7, name: '武汉城市体检启动', desc: '新增片区体检维度', itemStyle: { color: accent } },
        { value: 7, name: '南京城市体检推广', desc: '304项指标库+AI模式', itemStyle: { color: accent } },
        { value: 8, name: '天津城市体检启动', desc: '"55+17"指标体系', itemStyle: { color: accent } },
        { value: 6, name: '广州南沙专项体检', desc: '14项核心指标', itemStyle: { color: accent } },
        { value: 9, name: '自然资源部国土空间监测', desc: '19类要素+AI大模型', itemStyle: { color: accent } },
        { value: 8, name: '江苏城市体检方案', desc: '四位一体+AI体检', itemStyle: { color: accent } }
      ],
      barWidth: '50%',
      label: {
        show: true,
        position: 'top',
        color: ink,
        fontSize: 11,
        formatter: function(p) { return p.data.name.substring(0, 6); }
      },
      itemStyle: { borderRadius: [4, 4, 0, 0] }
    }]
  });

  // ========== Chart 2: International Timeline ==========
  var chart2 = echarts.init(document.getElementById('chart-timeline-international'), null, { renderer: 'svg' });
  chart2.setOption({
    animation: false,
    tooltip: {
      trigger: 'item',
      appendToBody: true,
      formatter: function(p) {
        return '<b>' + p.data.name + '</b><br/>' + p.data.desc;
      }
    },
    grid: { left: '8%', right: '5%', top: 60, bottom: 60 },
    xAxis: {
      type: 'category',
      data: ['2/9', '2/18', '3/11', '3/30', '6/23', '7/1', '7/9', '7/22'],
      axisLine: { lineStyle: { color: rule } },
      axisLabel: { color: muted, fontSize: 12 },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      max: 10,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: muted, fontSize: 11 },
      splitLine: { lineStyle: { color: rule, type: 'dashed' } },
      name: '政策影响度',
      nameTextStyle: { color: muted, fontSize: 12 }
    },
    series: [{
      type: 'bar',
      data: [
        { value: 8, name: 'ISO 14092:2026', desc: '气候适应正式国际标准', itemStyle: { color: intlColor } },
        { value: 7, name: '费城Breathe Philly', desc: '全美首个全覆盖空气监测网络', itemStyle: { color: intlColor } },
        { value: 7, name: 'ISO 37120 CD', desc: '可持续城市指标第3版修订', itemStyle: { color: intlColor } },
        { value: 8, name: '欧盟绿色城市协定基线报告', desc: '五领域强制监测指标', itemStyle: { color: intlColor } },
        { value: 6, name: '伯明翰福祉指数', desc: '心理健康城市地图集', itemStyle: { color: intlColor } },
        { value: 8, name: '英国地方成果框架', desc: '16项优先成果指标', itemStyle: { color: intlColor } },
        { value: 9, name: '欧盟交通数据条例', desc: '强制收集城市交通数据', itemStyle: { color: intlColor } },
        { value: 6, name: '日本地域幸福度调查', desc: '全国智慧城市数据调查', itemStyle: { color: intlColor } }
      ],
      barWidth: '50%',
      label: {
        show: true,
        position: 'top',
        color: ink,
        fontSize: 11,
        formatter: function(p) { return p.data.name.substring(0, 6); }
      },
      itemStyle: { borderRadius: [4, 4, 0, 0] }
    }]
  });

  // ========== Chart 3: Keywords Frequency ==========
  var keywordsData = [
    { name: '城市体检', domestic: 28, international: 5 },
    { name: '城市运行管理', domestic: 22, international: 3 },
    { name: '监测指标', domestic: 20, international: 12 },
    { name: '智慧城市', domestic: 15, international: 14 },
    { name: '城市更新', domestic: 14, international: 2 },
    { name: '一网统管', domestic: 12, international: 0 },
    { name: '可持续发展', domestic: 8, international: 18 },
    { name: '韧性城市', domestic: 6, international: 11 },
    { name: '数字孪生', domestic: 7, international: 9 },
    { name: 'AI人工智能', domestic: 10, international: 8 },
    { name: '城市治理', domestic: 11, international: 7 },
    { name: '安全监测', domestic: 9, international: 6 }
  ];

  var chart3 = echarts.init(document.getElementById('chart-keywords'), null, { renderer: 'svg' });
  chart3.setOption({
    animation: false,
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, appendToBody: true },
    legend: {
      data: ['国内', '国外'],
      top: 10,
      textStyle: { color: muted, fontSize: 12 }
    },
    grid: { left: '12%', right: '5%', top: 50, bottom: 40 },
    xAxis: {
      type: 'value',
      axisLine: { lineStyle: { color: rule } },
      axisLabel: { color: muted, fontSize: 11 },
      splitLine: { lineStyle: { color: rule, type: 'dashed' } }
    },
    yAxis: {
      type: 'category',
      data: keywordsData.map(function(d) { return d.name; }),
      axisLine: { lineStyle: { color: rule } },
      axisLabel: { color: ink, fontSize: 12 },
      axisTick: { show: false },
      inverse: true
    },
    series: [
      {
        name: '国内',
        type: 'bar',
        data: keywordsData.map(function(d) { return d.domestic; }),
        itemStyle: { color: accent, borderRadius: [0, 4, 4, 0] },
        barGap: '10%',
        barCategoryGap: '40%'
      },
      {
        name: '国外',
        type: 'bar',
        data: keywordsData.map(function(d) { return d.international; }),
        itemStyle: { color: intlColor, borderRadius: [0, 4, 4, 0] }
      }
    ]
  });

  // ========== Keyword Cloud (HTML) ==========
  var cloudEl = document.getElementById('keyword-cloud');
  if (cloudEl) {
    var allKeywords = [
      { word: '城市体检', count: 33, color: accent },
      { word: '监测指标', count: 32, color: accent2 },
      { word: '城市运行管理', count: 25, color: accent },
      { word: '智慧城市', count: 29, color: accent2 },
      { word: '可持续发展', count: 26, color: intlColor },
      { word: '城市更新', count: 16, color: accent },
      { word: '一网统管', count: 12, color: accent },
      { word: '城市治理', count: 18, color: accent2 },
      { word: 'AI人工智能', count: 18, color: danger },
      { word: '韧性城市', count: 17, color: intlColor },
      { word: '数字孪生', count: 16, color: accent2 },
      { word: '安全监测', count: 15, color: warn },
      { word: 'CIM平台', count: 8, color: accent },
      { word: '国土空间监测', count: 10, color: accent },
      { word: '城市体征', count: 12, color: danger },
      { word: '宜居城市', count: 8, color: success },
      { word: '福祉指数', count: 7, color: intlColor },
      { word: '气候适应', count: 6, color: intlColor },
      { word: '数字化转型', count: 9, color: accent2 },
      { word: '生命线安全', count: 7, color: warn }
    ];
    allKeywords.sort(function(a, b) { return b.count - a.count; });
    var maxCount = allKeywords[0].count;
    cloudEl.innerHTML = allKeywords.map(function(kw) {
      var size = 13 + Math.round((kw.count / maxCount) * 12);
      var opacity = 0.5 + (kw.count / maxCount) * 0.5;
      return '<span class="keyword-item" style="background:' + kw.color + '1a;color:' + kw.color + ';font-size:' + size + 'px;opacity:' + opacity + '">' +
             kw.word + '<span class="kw-count">' + kw.count + '</span></span>';
    }).join('');
  }

  // ========== Chart 4: Trends (2025 vs 2026) ==========
  var chart4 = echarts.init(document.getElementById('chart-trends'), null, { renderer: 'svg' });
  chart4.setOption({
    animation: false,
    tooltip: { trigger: 'axis', appendToBody: true },
    legend: {
      data: ['2025年', '2026年'],
      top: 10,
      textStyle: { color: muted, fontSize: 12 }
    },
    grid: { left: '8%', right: '5%', top: 50, bottom: 50 },
    xAxis: {
      type: 'category',
      data: ['标准化建设', '城市体检全覆盖', 'AI/数字化赋能', '指标体系分层', '安全韧性监测', '国际合作对标'],
      axisLine: { lineStyle: { color: rule } },
      axisLabel: { color: muted, fontSize: 11, interval: 0, rotate: 15 },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      max: 100,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: muted, fontSize: 11, formatter: '{value}%' },
      splitLine: { lineStyle: { color: rule, type: 'dashed' } }
    },
    series: [
      {
        name: '2025年',
        type: 'bar',
        data: [45, 55, 25, 35, 40, 30],
        itemStyle: { color: muted, borderRadius: [4, 4, 0, 0] },
        barGap: '15%'
      },
      {
        name: '2026年',
        type: 'bar',
        data: [85, 95, 70, 80, 65, 55],
        itemStyle: {
          color: function(params) {
            var colors = [accent, accent, danger, accent2, warn, intlColor];
            return colors[params.dataIndex];
          },
          borderRadius: [4, 4, 0, 0]
        }
      }
    ]
  });

  // ========== Chart 5: Radar (Domestic vs International) ==========
  var chart5 = echarts.init(document.getElementById('chart-radar'), null, { renderer: 'svg' });
  chart5.setOption({
    animation: false,
    tooltip: { appendToBody: true },
    legend: {
      data: ['国内', '国外'],
      top: 10,
      textStyle: { color: muted, fontSize: 12 }
    },
    radar: {
      indicator: [
        { name: '标准化建设', max: 100 },
        { name: '城市体检评估', max: 100 },
        { name: '智慧城市/数字化', max: 100 },
        { name: '安全韧性监测', max: 100 },
        { name: '可持续发展', max: 100 },
        { name: '公众参与/福祉', max: 100 },
        { name: '气候行动', max: 100 },
        { name: '国际合作', max: 100 }
      ],
      center: ['50%', '55%'],
      radius: '65%',
      axisName: { color: ink, fontSize: 12 },
      splitLine: { lineStyle: { color: rule } },
      splitArea: { areaStyle: { color: [bg2, 'transparent'] } },
      axisLine: { lineStyle: { color: rule } }
    },
    series: [{
      type: 'radar',
      data: [
        {
          value: [90, 95, 75, 70, 55, 45, 35, 40],
          name: '国内',
          itemStyle: { color: accent },
          lineStyle: { color: accent, width: 2 },
          areaStyle: { color: accent + '20' }
        },
        {
          value: [65, 50, 80, 65, 85, 80, 75, 90],
          name: '国外',
          itemStyle: { color: intlColor },
          lineStyle: { color: intlColor, width: 2 },
          areaStyle: { color: intlColor + '20' }
        }
      ]
    }]
  });

  // ========== Chart 6: Domestic Pie ==========
  var chart6 = echarts.init(document.getElementById('chart-pie-domestic'), null, { renderer: 'svg' });
  chart6.setOption({
    animation: false,
    tooltip: { trigger: 'item', appendToBody: true, formatter: '{b}: {c} ({d}%)' },
    legend: {
      bottom: 10,
      textStyle: { color: muted, fontSize: 12 },
      type: 'scroll'
    },
    series: [{
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['50%', '45%'],
      data: [
        { value: 5, name: '国家级政策', itemStyle: { color: accent } },
        { value: 12, name: '国家标准(GB/T)', itemStyle: { color: danger } },
        { value: 3, name: '地方标准(DB)', itemStyle: { color: accent2 } },
        { value: 2, name: '团体标准', itemStyle: { color: warn } },
        { value: 11, name: '地方政策文件', itemStyle: { color: success } },
        { value: 5, name: '地方城市体检', itemStyle: { color: '#8b5cf6' } }
      ],
      label: {
        color: ink,
        fontSize: 12,
        formatter: '{b}\n{d}%'
      },
      itemStyle: { borderColor: bg2, borderWidth: 2 }
    }]
  });

  // ========== Chart 7: International Pie ==========
  var chart7 = echarts.init(document.getElementById('chart-pie-international'), null, { renderer: 'svg' });
  chart7.setOption({
    animation: false,
    tooltip: { trigger: 'item', appendToBody: true, formatter: '{b}: {c} ({d}%)' },
    legend: {
      bottom: 10,
      textStyle: { color: muted, fontSize: 12 },
      type: 'scroll'
    },
    series: [{
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['50%', '45%'],
      data: [
        { value: 3, name: '欧盟政策', itemStyle: { color: '#3b82f6' } },
        { value: 3, name: '美国政策', itemStyle: { color: '#dc2626' } },
        { value: 2, name: '英国政策', itemStyle: { color: '#0891b2' } },
        { value: 1, name: '新加坡政策', itemStyle: { color: '#059669' } },
        { value: 2, name: '日本政策', itemStyle: { color: '#d97706' } },
        { value: 4, name: 'ISO国际标准', itemStyle: { color: '#7c3aed' } },
        { value: 2, name: '联合国报告', itemStyle: { color: '#2563eb' } },
        { value: 1, name: 'ITU标准', itemStyle: { color: '#6b7280' } }
      ],
      label: {
        color: ink,
        fontSize: 12,
        formatter: '{b}\n{d}%'
      },
      itemStyle: { borderColor: bg2, borderWidth: 2 }
    }]
  });

  // ========== Register & Resize ==========
  charts.push(chart1, chart2, chart3, chart4, chart5, chart6, chart7);

  window.addEventListener('resize', function() {
    charts.forEach(function(c) { if (c) c.resize(); });
  });

  // Also resize when fonts finish loading (dimensions may shift)
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function() {
      charts.forEach(function(c) { if (c) c.resize(); });
    });
  }

})();
