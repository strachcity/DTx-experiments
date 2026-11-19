#!/usr/bin/env bash
# Rebuild newco-routing.vsdx (and .pdf if LibreOffice is installed)
# from newco-routing-map.html. Run from anywhere.
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
IVR="$(dirname "$HERE")"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
MAP="$IVR/newco-routing-map.html" node "$HERE/layout.cjs" "$TMP/layout.json"
mkdir "$TMP/single"
python3 "$HERE/build.py" "$TMP/layout.json" "$IVR/newco-routing.vsdx" "$TMP/single"
if command -v soffice >/dev/null && command -v pdfunite >/dev/null; then
  # LibreOffice gives every page the size of the largest, so convert pages one at a time.
  (cd "$TMP/single" && for f in p*.vsdx; do soffice --headless --convert-to pdf "$f" >/dev/null 2>&1; done)
  pdfunite "$TMP"/single/p*.pdf "$IVR/newco-routing.pdf"
  echo "Wrote newco-routing.vsdx and newco-routing.pdf"
else
  echo "Wrote newco-routing.vsdx (no LibreOffice, so the PDF wasn't rebuilt)"
fi
