// Explicit desktop-only simulation. Never populates the TV inventory.
(function () {
  'use strict';
  window.BIRTHDAY_PREVIEW = !window.PalmServiceBridge && /(?:[?&])preview=1(?:&|$)/.test(location.search);
  if (!window.BIRTHDAY_PREVIEW) return;
  var names = ['YouTube', 'Netflix', 'Prime Video', 'Apple TV', '相片', '音樂', '瀏覽器', '媒體播放器'];
  var colors = ['#ffffff', '#ffffff', '#0965ef', '#080808', '#824d69', '#45294e', '#333d59', '#544269'];
  window.TV_APPS = { apps: names.map(function (name, i) {
    var ink = i === 1 ? '#e50914' : i === 0 ? '#111111' : '#ffffff';
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="360" height="202"><rect width="360" height="202" fill="' + colors[i] + '"/><text x="180" y="116" text-anchor="middle" fill="' + ink + '" font-family="sans-serif" font-weight="bold" font-size="38">' + name + '</text></svg>';
    return { id: 'preview.' + i, title: name, icon: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg), iconColor: colors[i] };
  }), inputs: [{ appId: 'preview.hdmi1', label: 'HDMI 1 · 模擬' }, { appId: 'preview.hdmi2', label: 'HDMI 2 · 模擬' }] };
  document.getElementById('previewBadge').textContent = '電腦模擬 · 未連線電視';
  document.getElementById('previewBadge').style.display = 'block';
})();
