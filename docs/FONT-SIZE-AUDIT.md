# Audit Ukuran Font — Wild Feather Creations

**Tanggal:** 26 Oktober 2026  
**Ruang lingkup:** beranda, aturan tipografi umum, titik responsif storefront, serta panel studio/admin  
**Sumber pemeriksaan:** baseline CSS dan computed style sebelum perbaikan, serta konfirmasi browser lokal setelah perubahan pada viewport desktop. Screenshot review mobile 375 × 812 px yang dirujuk adalah baseline sebelum perubahan.

## Ringkasan

WFC sudah memiliki hierarki visual yang kuat: judul memakai Instrument Serif, sedangkan isi dan antarmuka memakai DM Sans. Ukuran hero besar cocok dengan arah editorial brand. Audit awal menemukan teks produk dan label mobile terlalu kecil. Perbaikan prioritas sudah diterapkan; rincian di bawah membedakan ukuran awal dari perubahan terbaru.

**Skor baseline sebelum perbaikan: 67/100.** Ini penilaian heuristik untuk hierarki, keterbacaan layar kecil, dan konsistensi sistem font; bukan audit aksesibilitas formal. Perubahan terbaru sudah dicek secara visual di desktop; audit skor penuh lintas route dan viewport mobile belum diulang.

| Aspek | Skor | Catatan |
| --- | ---: | --- |
| Hierarki judul | 87/100 | Perbedaan serif display dan sans-serif isi memberi karakter editorial yang jelas. |
| Keterbacaan isi | 64/100 | Baseline body 14 px; beberapa deskripsi penting hanya 11–13 px. |
| Keterbacaan mobile | 55/100 | Baseline beberapa informasi produk turun ke 6–9 px pada lebar kecil. |
| Konsistensi skala | 50/100 | Ada ratusan deklarasi ukuran dan 56 nilai piksel unik dalam satu stylesheet. |

## Baseline ukuran sebelum perbaikan

### Beranda desktop

Computed style di browser lokal pada lebar viewport 1493 px menunjukkan:

| Elemen | Ukuran terukur | Penilaian |
| --- | ---: | --- |
| Teks dasar halaman | 14 px, line-height 22.4 px | Cukup untuk antarmuka, sedikit kecil untuk isi editorial panjang. |
| Navigasi utama | 11 px, line-height 17.6 px | Ringkas tetapi masih terbaca pada desktop. |
| H1 hero | 95.6 px, line-height 92.7 px | Dramatis dan sesuai desain editorial; perlu batas yang halus di tablet. |
| Judul bagian koleksi | 49 px, line-height 51.5 px | Kuat dan jelas. |
| Judul editorial | 89.6 px, line-height 89.6 px | Sangat besar; tepat sebagai display, bukan pola untuk judul isi biasa. |
| Deskripsi hero | 12 px, line-height 22.8 px | Spasi baris lega, tetapi ukuran glyph masih kecil. |
| Nama produk | 11 px | Sedikit kecil untuk elemen katalog utama. |
| Bahan dan harga produk | 10 px | Informasi penting untuk keputusan beli; sebaiknya lebih besar. |
| Eyebrow/label bagian | 9–10 px | Cocok sebagai aksen, bukan untuk informasi penting. |

### Beranda mobile

Screenshot review berukuran 375 × 812 px dan aturan `max-width: 600px` menunjukkan:

| Elemen | Ukuran baseline | Catatan |
| --- | ---: | --- |
| H1 hero | 75 px | Menarik perhatian tetapi mengambil ruang vertikal besar pada ponsel. |
| Deskripsi hero | 12 px | Masih di bawah ukuran nyaman untuk isi utama. |
| Eyebrow hero/bagian | 8 px | Terlalu kecil jika harus dibaca, terutama dengan tracking huruf lebar. |
| Brand strip | 6 px | Terlalu kecil untuk teks yang mengandung klaim layanan/keunggulan. |
| Nama produk | 10 px | Kecil untuk label produk pada katalog mobile. |
| Harga | 9 px | Sulit dipindai sebagai informasi transaksi. |
| Bahan produk | 8 px | Terlalu kecil untuk detail produk. |
| Label “Made to order” | 6 px | Sulit dibaca dan menyampaikan status produk yang penting. |
| Nomor/kode foto | 7 px | Bisa tetap dekoratif jika bukan satu-satunya penanda informasi. |

Pada baseline ada loncatan breakpoint pada judul hero: `61px` pada rentang `max-width: 800px`, kemudian menjadi `75px` pada `max-width: 600px`. Judul membesar saat layar mengecil. Aturan ini sekarang memakai token fluid yang sama pada breakpoint tablet dan mobile.

### Panel studio/admin

Panel admin memiliki ukuran yang lebih rapat: judul panel sekitar 13 px, label metrik 9–10 px, tombol sekitar 9–10 px, beberapa catatan 7–9 px, dan label kecil lain turun lebih rendah. Untuk layar kerja, ukuran tersebut berpotensi memperlambat pemindaian tabel, status, serta informasi pesanan. Angka grafik dekoratif dapat kecil, tetapi isi utama admin sebaiknya lebih besar.

## Temuan sistem font

- Keluarga font sudah konsisten: **Instrument Serif** untuk judul/editorial dan **DM Sans** untuk isi/UI.
- Sebelum perbaikan, body default memakai `14px/1.6`; paragraf global memiliki `line-height: 1.8`.
- Scan baseline stylesheet menemukan **357 deklarasi `font-size` dalam piksel** dan **56 nilai piksel unik**, belum termasuk ukuran `clamp()` dan ukuran dalam shorthand `font`.
- Pada baseline belum ada sistem token ukuran untuk skala yang konsisten. Perubahan terbaru menambahkan token inti; penerapan ke semua deklarasi khusus masih bertahap.
- Temuan ini mengarah pada dua hal: teks mikro yang terlalu kecil dan beban perawatan visual ketika halaman atau komponen diperbarui.

## Rekomendasi

### Prioritas 1 — Perbesar teks katalog dan pembelian

- Body utama: **16 px** desktop dan mobile, dengan line-height sekitar **1.6–1.75**.
- Nama produk: **14 px** minimum.
- Harga dan detail bahan: **12–14 px**, utamakan **13–14 px** pada mobile.
- Deskripsi penting dan status made-to-order: **12 px minimum**; ideal **13–14 px**.
- Tombol utama: teks **13–14 px**; teks tombol tidak perlu menyusut hanya untuk mengejar tampilan ringkas.

### Prioritas 2 — Batasi teks mikro

- Pertahankan eyebrow dekoratif di **10–11 px** desktop dan **9–10 px** mobile.
- Naikkan klaim di brand strip, label stok, filter, harga, metadata, dan status transaksi ke **12 px minimum** pada mobile.
- Nomor koleksi atau indeks dekoratif boleh lebih kecil jika tidak menyampaikan informasi penting dan kontrasnya memadai.
- Hindari uppercase dan letter-spacing lebar pada teks kecil; kombinasi keduanya membuat label lebih sulit dibaca.

### Prioritas 3 — Gunakan skala responsif yang mulus

- Pertahankan ukuran H1 desktop sekitar **72–96 px** sesuai panjang judul.
- Untuk hero mobile, gunakan rentang responsif seperti `clamp(58px, 8vw, 68px)` sebagai titik awal, lalu cek pada lebar 320, 375, dan 430 px.
- Judul bagian mobile dapat berada di rentang **32–40 px**; judul desktop umumnya **42–56 px**.
- Hindari aturan breakpoint yang membuat font display membesar ketika viewport mengecil.

### Prioritas 4 — Buat token tipografi

Tambahkan token di `:root` untuk body, body-small, label, button, heading section, dan display. Gunakan token tersebut pada komponen bersama dan batasi pengecualian per halaman. Sasaran awal yang disarankan:

| Token/Peran | Desktop | Mobile |
| --- | ---: | ---: |
| Body utama | 16 px | 16 px |
| Body sekunder | 14 px | 14 px |
| Nama produk | 14 px | 13–14 px |
| Harga/status | 13–14 px | 12–14 px |
| Label UI penting | 12 px | 12 px |
| Eyebrow dekoratif | 10–11 px | 9–10 px |
| Judul bagian | 42–56 px | 32–40 px |
| Display hero | 72–96 px | 58–68 px responsif |

Gunakan skala ini sebagai baseline, bukan aturan kaku untuk semua konteks. Jika suatu label harus di bawah 12 px, pastikan itu hanya metadata sekunder yang tidak diperlukan untuk memilih atau membeli produk.

## Status penerapan rekomendasi

- Token skala tipografi sekarang tersedia di `:root` untuk display, heading, body, kontrol, metadata, dan label.
- Body default naik dari 14 px menjadi 16 px. Deskripsi hero memakai 16 px dan navigasi utama memakai 12 px.
- Kartu produk desktop memakai nama 14 px, bahan 12 px, harga 14 px, dan status 12 px. Pada mobile nama 13 px, bahan/harga 12 px, dan label status 12 px.
- Ukuran hero mobile memakai `clamp(58px, 8vw, 68px)` yang sama pada tablet/mobile; judul bagian mobile memakai `clamp(34px, 10vw, 40px)`.
- Deskripsi halaman utama, about, contact, FAQ, panduan, dan produk dinaikkan ke skala body 14–16 px. Input mobile memakai 16 px.
- Label panel admin, tombol, grafik, serta isi tabel dinaikkan; tabel menjadi 12 px desktop dan 11 px pada viewport sempit.
- Browser lokal mengonfirmasi setelah perubahan: body 16 px, navigasi 12 px, hero H1 87.36 px pada viewport 1365 px, deskripsi hero 16 px, nama produk 14 px, bahan 12 px, dan harga 14 px.
- Bukti tampilan desktop terbaru tersimpan di `docs/review/home-desktop-type.png`. Perlu review visual tambahan pada viewport 320, 375, dan 430 px serta route checkout/admin.

## Batas audit

Audit ini menilai ukuran dan hierarki font dari stylesheet serta tampilan lokal yang tersedia. Ini bukan audit kontras warna, pembesaran teks browser, screen reader, atau kepatuhan WCAG secara penuh. Lakukan review visual ulang pada viewport 320, 375, dan 430 px serta route checkout/admin sebelum peluncuran.
