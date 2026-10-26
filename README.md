# Wild Feather Creations

Frontend toko perhiasan WFC untuk review desain dan interaksi, dibangun dengan Next.js 16.4.3, App Router, React, dan TypeScript. Website berbahasa Inggris, menggunakan desain monokrom, data lokal, dan placeholder gambar SVG lokal. PostgreSQL tetap menjadi database tujuan pada tahap integrasi berikutnya.

## Menjalankan proyek

```bash
npm ci
npm run dev
```

Buka `http://localhost:3000`. Untuk pemeriksaan produksi:

```bash
npm run typecheck
npm run format:check
npm run build
npm start
```

## Cakupan yang tersedia

- Beranda editorial, katalog dengan pencarian/filter/pengurutan, koleksi, dan detail produk.
- Pemilihan variasi/ukuran, stok, keranjang persisten, checkout tamu bertahap, alamat pengiriman dan penagihan, pilihan pengiriman, serta ringkasan pesanan.
- About, Contact, FAQ, size guide, care guide, shipping, returns, privacy, terms, loading, error, dan 404.
- Panel studio: dashboard, produk dan galeri, koleksi/kategori, pesanan, pengiriman, enquiries, dan pengaturan.
- Metadata, canonical URL, gambar Open Graph, robots, sitemap, fokus keyboard, validasi formulir, dan layout mobile/desktop.
- Seluruh gambar adalah placeholder lokal. Font disimpan lokal beserta lisensinya.

## Panel studio untuk review

Buka `/admin/login` menggunakan kredensial **khusus antarmuka review**:

- Email: `studio@wildfeathercreations.com`
- Password: `WildFeather2026!`

Login ini adalah gate frontend berbasis session browser, **bukan autentikasi produksi**. Tidak ada akun bisnis yang dibuat atau layanan eksternal yang dihubungkan. Gunakan Vercel Deployment Protection sesuai akses akun ketika membagikan preview. Jangan memasukkan data pelanggan nyata. Fitur Restore workspace di Settings mengembalikan state pada perangkat ini.

## Batas fungsi tahap frontend

- Produk, keranjang, perubahan admin, dan pengaturan disimpan di localStorage perangkat yang sama; perubahan tidak tersinkron antar-browser atau antar-reviewer.
- Alamat/email yang diisi pada checkout tidak dipersistenkan. Ringkasan sesi hanya menyimpan item, angka biaya, dan negara tujuan.
- Checkout berhenti di ringkasan sebelum pembayaran. Tidak ada tagihan, reservasi stok di server, atau pesanan sungguhan.
- Tarif dan waktu pengiriman adalah konten awal untuk review, bukan rate carrier yang sudah disetujui.
- Contact menyiapkan ringkasan pesan dan menyediakan salin pesan; belum mengirim email. Balasan enquiry admin juga dapat disalin, tidak dikirim.
- Status pembayaran pada catatan admin adalah bagian dari konten awal; tidak terhubung ke gateway.
- Belum ada koneksi PostgreSQL, autentikasi server, payment gateway, carrier, email, atau pengumpulan analitik eksternal.
- Metadata server memakai katalog awal. Perubahan produk lokal di admin tidak mengubah metadata server; sinkronisasi ini diselesaikan bersama backend.
- Konten kebijakan adalah draf editorial dan harus ditetapkan oleh WFC sebelum toko menerima transaksi.

## Preview di Vercel

Proyek disiapkan untuk deployment Next.js biasa; tidak membutuhkan database atau secret agar build frontend berhasil.

1. Hubungkan folder/repository ini ke proyek Vercel, atau gunakan Vercel CLI dengan akun yang dituju.
2. Gunakan root proyek ini, install command `npm ci`, dan build command `npm run build`.
3. Biarkan `NEXT_PUBLIC_ENABLE_INDEXING=false` selama review.
4. `NEXT_PUBLIC_SITE_URL` dapat diisi URL preview. Jika tidak diisi, aplikasi menggunakan `VERCEL_URL` yang disediakan platform.
5. Aktifkan pengaturan perlindungan preview yang tersedia pada akun sebelum membagikan akses admin.
6. Setelah deployment berhasil, bagikan URL preview untuk meninjau storefront dan panel studio.

Deployment belum dilakukan oleh implementasi lokal ini. Folder `.vercel` dan kredensial akun tidak disertakan.

Untuk domain produksi, konfigurasikan `NEXT_PUBLIC_SITE_URL` ke domain final dan aktifkan pengindeksan hanya setelah katalog, backend, dan kebijakan disetujui. Deployment dengan `VERCEL_ENV=preview` tetap noindex meski flag indexing dinyalakan.

## Struktur kode

- `src/app`: route, metadata, halaman sistem, dan stylesheet.
- `src/components/home.tsx`: beranda editorial.
- `src/components/storefront.tsx`: katalog, detail, koleksi, dan konten informasi.
- `src/components/checkout.tsx`: keranjang dan alur checkout review.
- `src/components/admin.tsx`: panel studio.
- `src/components/store-provider.tsx`: state lokal dan fungsi perubahan data.
- `src/lib/data.ts`: tipe dan katalog/konten awal terpusat.
- `src/lib/site.ts`: URL situs dan aturan pengindeksan.
- `public/images`: placeholder SVG yang dapat diganti dengan foto produk.
- `docs/IMPLEMENTATION.md`: status tahap dan hasil pemeriksaan.

## Tahap berikutnya

Review dan revisi frontend melalui Vercel, lalu integrasikan PostgreSQL, autentikasi admin yang sebenarnya, media storage, pembayaran, pengiriman, dan email. Backend harus memvalidasi ulang stok, harga, tujuan, mata uang, dan status pembayaran di server. Provider lokal diganti dengan lapisan akses data yang sesuai, sambil mempertahankan komponen tampilan.
