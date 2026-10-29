(function () {
  'use strict';
  var c = window.BIRTHDAY;
  ['Name', 'Subtitle', 'Date', 'Message', 'Signature'].forEach(function (key) {
    document.getElementById('birthday' + key).textContent = c[key.toLowerCase()];
  });
  // Keep the exact Unicode text while drawing emoji on older TV font stacks.
  var message = document.getElementById('birthdayMessage');
  var parts = c.message.split('🥰');
  message.textContent = '';
  parts.forEach(function (part, index) {
    if (index) {
      var emoji = document.createElement('span');
      emoji.className = 'birthday-emoji';
      emoji.textContent = '🥰';
      message.appendChild(emoji);
    }
    message.appendChild(document.createTextNode(part));
  });
  var mode = c.motion;
  try { mode = localStorage.getItem('birthday.motion') || mode; } catch (e) {}
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches && mode === 'full') mode = 'reduced';
  function applyMotion(value) {
    mode = value;
    document.body.setAttribute('data-motion', mode);
    try { localStorage.setItem('birthday.motion', mode); } catch (e) {}
  }
  window.BirthdayMotion = { set: applyMotion, get: function () { return mode; } };
  applyMotion(mode);
  var image = document.getElementById('coupleArt');
  image.onerror = function () { image.style.display = 'none'; document.getElementById('artMissing').style.display = 'block'; };
  function fit() {
    var scale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
    var screen = document.getElementById('screen');
    screen.style.transform = 'scale(' + scale + ')';
    screen.style.left = Math.max(0, (window.innerWidth - 1920 * scale) / 2) + 'px';
    screen.style.top = Math.max(0, (window.innerHeight - 1080 * scale) / 2) + 'px';
    window.BirthdayScale = scale;
  }
  window.addEventListener('resize', fit); fit();
})();
