(function () {
  'use strict';
  var audio = document.createElement('audio');
  audio.id = 'birthdayAudio';
  audio.src = 'media/happy-birthday.wav';
  audio.loop = true;
  audio.preload = 'auto';
  audio.volume = 0.45;
  document.body.appendChild(audio);
  var enabled = true;
  var blocked = false;
  try { enabled = localStorage.getItem('birthday.music') !== 'off'; } catch (e) {}
  function play() {
    if (!enabled || document.hidden) return;
    try {
      var result = audio.play();
      if (result && result.catch) result.catch(function () { blocked = true; });
    } catch (e) { blocked = true; }
  }
  function set(value) {
    enabled = value;
    try { localStorage.setItem('birthday.music', value ? 'on' : 'off'); } catch (e) {}
    if (enabled) play(); else audio.pause();
  }
  audio.addEventListener('playing', function () { blocked = false; });
  audio.addEventListener('error', function () { blocked = true; });
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) audio.pause(); else play();
  });
  window.addEventListener('pagehide', function () { audio.pause(); });
  window.addEventListener('pageshow', play);
  document.addEventListener('webOSRelaunch', play);
  // A remote key or click retries autoplay when the browser requires a gesture.
  document.addEventListener('keydown', function () { if (enabled && audio.paused) play(); });
  document.addEventListener('click', function () { if (enabled && audio.paused) play(); });
  window.BirthdayAudio = {
    set: set,
    get: function () { return enabled; },
    status: function () { return { enabled: enabled, paused: audio.paused, blocked: blocked, time: audio.currentTime, ready: audio.readyState, error: audio.error ? audio.error.code : null }; }
  };
  play();
})();
