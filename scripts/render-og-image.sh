#!/usr/bin/env bash
# Regenerate public/og-image.png (1200×630 social link preview) from scripts/og-banner.html
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
HTML="$ROOT/scripts/og-banner.html"
OUT="$ROOT/public/og-image.png"
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
if [[ ! -x "$CHROME" ]]; then
  echo "Google Chrome not found at $CHROME" >&2
  exit 1
fi
"$CHROME" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
  --window-size=1200,630 \
  --screenshot="$OUT" \
  --virtual-time-budget=8000 \
  "file://$HTML"
echo "Wrote $OUT"
file "$OUT"
