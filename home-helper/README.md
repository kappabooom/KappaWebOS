# Optional on-TV birthday Home Helper

This is a **local adaptation**, not an official upstream 0.6.21 release. It routes to `com.kappabooom.birthday.preview`, retaining upstream input compatibility checks, watchdogs and persistent triple-Home emergency stop.

Upstream: https://github.com/Razdva122/clean-your-tv-lg-webos

Pinned revision: `47a886f1f4c115ff98101b1c88f4e23457038a07` (v1.4.1).

The patch changes the launcher target, adds explicit `stopBirthday`, waits four seconds after standby wake before opening the birthday app, tolerates initial HDMI restoration during that grace period, and skips redundant boot launches when an existing controller is positively identified. Real-app selections and emergency stop still cancel recovery. Local source tests and adjusted virtual-clock fixtures are included in the patch.

## Prepare and build on the computer

Requires Node 20.19+, Python 3, Git and official webOS CLI 3.2.6. Run from this repository root:

```sh
mkdir -p work
git clone https://github.com/Razdva122/clean-your-tv-lg-webos.git work/cytv
git -C work/cytv checkout 47a886f1f4c115ff98101b1c88f4e23457038a07
git -C work/cytv apply ../../home-helper/birthday-helper.patch
(cd work/cytv && npm ci --ignore-scripts)
curl -L --fail https://github.com/Razdva122/clean-your-tv-lg-webos/releases/download/v1.4.1/com.local.nativehome_0.6.19_arm.ipk -o work/published-helper.ipk
python3 scripts/build-home-helper.py --upstream-dir work/cytv --baseline-ipk work/published-helper.ipk
```

The build verifies baseline SHA-256 `52510c9115a518a05849f6618516b41886aea54b7f74ea4763ffeeaf63c03e7b`, reuses its unchanged `detach`, `relay`, `resume` binaries, and compiles the adapted JS for TV Node 0.12.2. It does not connect to the TV.

Run the relevant regression checks in the patched upstream directory:

```sh
node tests/helper-entry.cjs
node tests/helper-service-status.cjs
node tests/controller-resume.cjs
node --test tests/controller-resume-home.cjs
node tests/controller-home.cjs
```

## Review, install and configure

First install and validate your birthday launcher. Read the pinned upstream compatibility/recovery documentation. This Helper requires compatible native remote input and an active LG Developer Mode session. Do not bypass failed compatibility or permission checks. Inspect installed versions and back up any existing Helper packages and state before updating.

The result is `work/cytv/dist/com.local.nativehome_0.6.21_arm.ipk`. Installing it does not establish working controls or boot behavior. After intentional installation, copy your locally paired `.lgtv-key.json` and actual `app/apps.js` into the patched checkout as `.lgtv-key.json` and `launcher/apps.js`. These remain private; never commit them or print the key.

Use the patched `scripts/configure-tv.sh` with your own `TV_HOST` and `DEVICE` profile. It verifies transferred state-file content/permissions and requests early input restoration for the birthday ID. Never use `bash -x`; commands contain an encoded pairing key. Review registration success versus denial versus no reply separately.

Only when ready to activate:

```sh
ares-launch -d <profile> com.local.nativehome --params '{"nativeHomeStart":true}'
```

This enables input interception and requests a persistent boot activity. The computer is not needed afterward, but TV networking/pairing and Developer Mode still are. Opening the Helper tile by itself does not clear emergency stop; use explicit Start in birthday Settings.

## Recovery and verification

**Press and release Home three times within two seconds** to stop interception and return to LG Home. This stop persists across startup. To resume deliberately, open the birthday launcher and select Settings → Home control: Start. Settings also offers Stop; service call `com.local.nativehome.service/stopBirthday` requests persistent stop and disables the boot activity.

Verify physical buttons and emergency stop before standby/wake, then AC-off cold boot separately. No instant-first-screen guarantee is made. The observed 55UM7500PWA case passed Home/triple-Home and standby/wake with this adaptation; cold boot remains untested. Quick Start+ was not changed.

To revert, stop Helper first, verify LG controls work, then remove only the Helper package or restore the known-working package/state. Do not remove the birthday launcher while routing still targets it, or delete system apps. Keep backups private.
