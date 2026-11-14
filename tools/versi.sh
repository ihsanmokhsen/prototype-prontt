#!/bin/sh
# Pasang nomor versi baru di semua link js/css lokal, agar browser
# mengambil file terbaru setelah push (GitHub Pages menyimpan cache 10 menit).
# Jalankan sebelum commit:  sh tools/versi.sh
cd "$(dirname "$0")/.." || exit 1
V=$(date +%Y%m%d%H%M)
for f in index.html pages/*.html; do
  sed -E -i '' "s#((src|href)=\"(\.\./)?(js|css)/[A-Za-z0-9_-]+\.(js|css))(\?v=[0-9]+)?\"#\1?v=$V\"#g" "$f"
done
echo "versi $V"
