# Deploy from macOS

Use a supported local Node.js runtime (CLI 3.2.6 requires Node 20+) and Python 3. Never paste a TV pairing passphrase into chat, shell arguments or a committed file.

1. Prepare local content with the README, then install official `@webos-tools/cli`.
2. On the TV, enable official Developer Mode, perform its requested restart and enable Key Server. Keep the official session active.
3. Use `ares-setup-device` interactively to add your TV's current LAN address, port 9922, user `prisoner`. Give it your own profile name.
4. Run `ares-novacom -d <profile> --getkey`; enter the TV passphrase only at the local interactive prompt.
5. Read device information using `ares-device -d <profile> -i`; inspect installed packages with `ares-install -d <profile> -F`. If the target ID already exists, identify its version and retain the original source/IPK before any update. CLI listing is not a full installed-package backup.

Install the local synchronization dependency and import the real inventory:

```bash
python3 -m venv .venv
.venv/bin/pip install -r requirements.txt
read -r -p 'TV LAN IP: ' TV_HOST
.venv/bin/python sync-apps.py "$TV_HOST"
# Accept the connection request on the TV if shown.
bash scripts/package.sh
```

The script only packages. Review the exact ID `com.kappabooom.birthday.preview` and produced filename, then install and open explicitly:

```sh
ares-install -d <profile> build/com.kappabooom.birthday.preview_0.1.7_all.ipk
ares-launch -d <profile> com.kappabooom.birthday.preview
```

Separately verify version readback, actual rendering, remote controls, music and at least one installed shortcut. Keep original IPKs private: personalized packages contain your imported media and app inventory.

For Home interception and startup, follow [home-helper/README.md](home-helper/README.md). Test emergency stop first. Do not replace LG Home, root the TV or change firmware. Without Helper, Home opens LG Home normally. Standby/wake and AC-off cold boot are separate tests; neither immediate startup nor support for all models is promised.

To remove only this launcher, first stop any Helper routing to it, then use the TV app manager or `ares-install -d <profile> --remove com.kappabooom.birthday.preview`. Never remove system apps. Restore an earlier verified IPK when reverting an update. Watch LG Developer Mode's official timer; expiry may remove development apps.
