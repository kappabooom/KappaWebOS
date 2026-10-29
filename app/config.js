// Launcher configuration. Edit this file, then run webos-launcher/install.sh.
// App ids: run `python3 sync-apps.py --list` (or look in app/apps.js after a sync).
window.CONFIG = {
  tileArtwork: {
    'netflix': 'theme-icons/netflix.jpg',
    'youtube.leanback.v4': 'theme-icons/youtube.jpg',
    'com.disney.disneyplus-prod': 'theme-icons/disney.jpg',
    'spotify-beehive': 'theme-icons/spotify.jpg'
  },
  // Apps pinned to the dock row at the bottom, in this order. Missing apps are skipped.
  dockApps: ['netflix', 'youtube.leanback.v4', 'com.disney.disneyplus-prod', 'spotify-beehive'],

  // Apps never shown as tiles (inputs and Live TV are already in the Inputs menu).
  hiddenApps: [
    'com.kappabooom.birthday.preview',
    'com.gathin.tvhome',
    'com.webos.app.livetv',
    'com.webos.app.hdmi1', 'com.webos.app.hdmi2', 'com.webos.app.hdmi3', 'com.webos.app.hdmi4',
    'com.webos.app.lgchannels',   // LG Channels
    'shortcutcopilot'             // Copilot
  ],

  // The Live TV app, offered at the end of the Inputs menu. Leave empty to omit.
  liveTvApp: 'com.webos.app.livetv',

  // Tiles per row in the grid; the dock always has this many slots.
  columns: 4
};
