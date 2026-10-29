#!/usr/bin/env bash
# Package only. Does not sync, connect, install or launch.
set -euo pipefail
cd "$(dirname "$0")/.."
if [ ! -f app/apps.js ] || [ ! -d app/icons ]; then
  echo 'Missing real TV inventory/icons: follow DEPLOY_ON_MAC.md first.' >&2
  exit 1
fi
if [ ! -f app/private/couple-reference.png ]; then
  echo 'Import your private design material first.' >&2
  exit 1
fi
mkdir -p build
if command -v ares-package >/dev/null; then
  ares-package app -o build
else
  echo 'Install the official @webos-tools/cli first; see DEPLOY_ON_MAC.md.' >&2
  exit 1
fi
