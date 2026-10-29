# Birthday Launcher for LG webOS

Version **0.1.7**: a locally personalized birthday launcher for older LG webOS TVs. Includes a cream/blush/rose-gold theme, themed Netflix / YouTube / Disney+ / Spotify tiles, a looping locally synthesized birthday melody, remote navigation, long-OK rearranging and reduced-motion navigation optimized for Chromium 53.

## Local setup

```sh
python3 scripts/prepare.py
python3 scripts/import-assets.py /path/to/private-materials.zip
# Edit app/birthday-config.js locally: name, greeting, signature and date.
python3 -m http.server 8000 --bind 127.0.0.1 --directory app
```

Open `http://127.0.0.1:8000/?preview=1` for simulated apps. Without that flag the launcher uses only your synchronized TV inventory. Imported artwork is a cropped excerpt of the supplied design, not a newly extracted transparent portrait. The import script expects the filenames in the original materials package.

The first row is Netflix, YouTube, Disney+ and Spotify, provided those apps are installed. Settings controls animation, music and the optional on-TV Home Helper. Music pauses when the page is hidden. If autoplay needs a gesture, a remote key or click retries it. Theme images fall back to the original TV icons if loading fails.

## TV deployment

Read [DEPLOY_ON_MAC.md](DEPLOY_ON_MAC.md). Use official LG Developer Mode; no root or firmware modification is required. This app alone does not intercept Home. The optional [on-TV Helper integration](home-helper/README.md) routes Home and supports startup without an always-on computer.

## Privacy and reproducibility

This public repository contains program code and nonpersonal generated media. **Private photos, actual birthday text, TV inventories, original TV icons, pairing keys, IPKs, runtime state and diagnostic backups are excluded.** The source archive used during installation contained those local inputs; importing them again is required to reproduce the personalized screen. Public sample configuration is deliberately generic. Shared emoji/music assets live in `app/media/`; the running private installation used equivalent files under its private asset directory.

## Validation scope

- Tested device: LG 55UM7500PWA, firmware 05.40.97, SDK 4.10.0; actual app engine Chromium 53.
- App 0.1.7: installed/launched, all four themed first-row images loaded, Chinese greeting did not overflow. Earlier UI checks covered navigation, Settings and entering/cancelling sorting. User accepted the smoother 0.1.5 navigation and confirmed audible music in 0.1.2.
- Local Helper 0.6.21: user confirmed short Home, triple-Home emergency stop and remote standby/wake to the birthday launcher. True AC-off cold boot and all third-party shortcuts remain unverified.
- The public export omits personal data and relocates shared media; its static checks pass. It is not a separate end-to-end TV acceptance run.

```sh
npm ci --ignore-scripts
npm run check
```

No universal compatibility claim is made. Developer Mode must remain active.

## Attribution

Launcher foundation: OmkarK97/webos-vibehack, MIT (see LICENSE and upstream references). On-TV Helper: Razdva122/clean-your-tv-lg-webos, MIT, pinned source and local patch in `home-helper/`. Outfit: SIL OFL in `app/fonts/`. Twemoji: CC BY 4.0, license in `app/media/`. Birthday melody is a new local synthesized instrumental rendering. Themed app graphics were created with built-in image_gen; [prompts](docs/icon-design-prompts.md). Brand identities belong to their respective owners; this is an unofficial personal launcher.
