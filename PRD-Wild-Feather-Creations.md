# Product Requirements Document — Wild Feather Creations

**Status:** Frontend tahap pertama diimplementasikan; menunggu review  
**Tanggal revisi:** 26 Oktober 2026  
**Tahap saat ini:** Review frontend lokal dan persiapan preview Vercel  
**Bahasa website:** Inggris  
**Basis bisnis:** Amerika Serikat  
**Cakupan pengiriman:** Seluruh AS dan internasional

## 1. Ringkasan Produk

Wild Feather Creations (WFC) adalah brand karya handmade dengan perhiasan sebagai produk utama saat ini, termasuk wire wrapping dan kerajinan perak (_silversmithing_). Nama brand tetap luas agar dapat menaungi kategori karya lain di masa depan.

Website memperkenalkan cerita brand, menampilkan koleksi, dan pada tahap produksi memungkinkan pembelian melalui checkout serta pembayaran online. Produk mencakup stok siap kirim dan _made-to-order_. Formulir kontak dan email menjadi kanal layanan pelanggan.

Pengembangan dimulai dari seluruh frontend agar desain, konten, interaksi, dan perjalanan pelanggan maupun admin dapat ditinjau melalui URL Vercel. Integrasi PostgreSQL, autentikasi, pembayaran, pengiriman, dan email dilakukan setelah review frontend.

## 2. Keputusan yang Sudah Disepakati

| Area               | Keputusan                                                                      |
| ------------------ | ------------------------------------------------------------------------------ |
| Framework          | Versi stabil terbaru Next.js saat implementasi dimulai, App Router, TypeScript |
| Database produksi  | PostgreSQL                                                                     |
| Tahap pertama      | Seluruh frontend dengan data lokal untuk kebutuhan review                      |
| Preview awal       | Vercel                                                                         |
| Pasar              | Pelanggan di AS dan internasional                                              |
| Bahasa pelanggan   | Inggris, termasuk checkout, pesan sistem, dan email transaksi                  |
| Produk             | Siap kirim dan made-to-order                                                   |
| Penjualan produksi | Checkout dan pembayaran langsung di website                                    |
| Layanan pelanggan  | Formulir kontak dan email                                                      |
| Desain             | Modern, minimal, monokrom, geometris, dan khas WFC                             |
| SEO                | SEO teknis dan konten disiapkan sejak frontend; preview tidak diindeks         |

Versi pasti dependensi dicatat dan dikunci saat proyek dibuat. PostgreSQL tetap menjadi database tujuan meskipun preview frontend belum membutuhkan koneksi database.

## 3. Tujuan dan Pengguna

### Tujuan produk

- Menampilkan identitas WFC dan detail pengerjaan handmade secara meyakinkan.
- Memudahkan pelanggan menemukan produk, memahami bahan, ukuran, harga, ketersediaan, serta waktu pengerjaan.
- Menyediakan pengalaman belanja berbahasa Inggris untuk pengiriman domestik AS dan internasional.
- Memudahkan admin mengelola katalog, stok, pesanan, dan pertanyaan pelanggan.
- Menyediakan fondasi SEO, aksesibilitas, dan performa yang baik.

### Tujuan tahap frontend

- Seluruh halaman pelanggan dan admin dapat dibuka dan ditinjau online.
- Perjalanan utama dapat dicoba dari katalog sampai ringkasan checkout.
- Desain dan konten dapat direvisi sebelum integrasi layanan produksi.
- Struktur data dan komponen dapat digunakan kembali saat backend dihubungkan.

### Pengguna

**Pembeli:** pelanggan AS dan internasional yang mencari perhiasan handmade atau karya artisan, baik siap kirim maupun dibuat berdasarkan pesanan.

**Admin WFC:** pemilik atau pengelola yang memperbarui katalog, stok, pesanan, pengiriman, serta pertanyaan pelanggan tanpa mengubah kode.

## 4. Identitas dan Arah Desain

Nama Wild Feather Creations terinspirasi oleh kecintaan pemilik pada burung dan bulu yang ditemukan. Cerita ini dapat menjadi narasi brand; bulu tidak diasumsikan sebagai bahan produk.

- Gunakan hitam, putih, dan abu-abu dengan detail perak sebagai bahasa visual antarmuka. Warna asli batu dan produk tetap ditampilkan secara akurat.
- Gunakan bentuk geometris, garis tegas, ruang kosong, dan hierarki tipografi yang berkarakter.
- Susun beranda secara editorial: karya unggulan, koleksi terkurasi, detail pengerjaan, dan cerita pembuat.
- Tampilkan produk sebagai objek dan saat dikenakan agar ukuran serta bentuk mudah dipahami.
- Motif bulu dapat muncul secara halus jika mendukung identitas. Arah utama tetap modern dan geometris.
- Hindari dekorasi berlebihan, foto stok yang tidak relevan, dan komponen berulang yang membuat situs terasa generik.
- Navigasi, filter, formulir, dan checkout harus tetap mudah digunakan di mobile maupun desktop.
- Animasi scroll bersifat ringan dan sekali tampil: hero masuk secara halus, lalu bagian editorial, koleksi, dan kartu produk muncul bertahap ketika masuk viewport.
- Hindari mengunci scroll pada halaman katalog atau checkout; hormati preferensi pengurangan gerakan, dan tampilkan konten normal jika CSS scroll-driven animation tidak didukung.

### Referensi desain yang disepakati

| Referensi                                         | Prinsip yang diambil                                           |
| ------------------------------------------------- | -------------------------------------------------------------- |
| [Becki Chan](https://beckichan.com/)              | Geometri dan pendekatan arsitektural pada karya handmade       |
| [SHIHARA](https://shihara.com/)                   | Presentasi minimal yang menonjolkan struktur dan detail produk |
| [Sarah Catherine Co.](https://sarahcatherine.co/) | Cerita pembuat dan koleksi yang terhubung dengan produk        |
| [NINO SEPO](https://ninosepo.com/)                | Penyajian editorial dan foto objek dibandingkan saat dikenakan |
| [MUTESCENE](https://mutescene.com/)               | Navigasi kategori dan informasi belanja internasional          |

Referensi digunakan sebagai prinsip desain. Komposisi, identitas, teks, dan aset WFC dikembangkan secara khusus.

## 5. Tahapan Pengerjaan

### Tahap 1 — Seluruh frontend dan preview Vercel

Bangun seluruh halaman, komponen, tampilan responsif, konten awal, serta interaksi pelanggan dan admin menggunakan data lokal yang konsisten. Semua navigasi dan tombol utama harus menghasilkan interaksi atau tujuan yang jelas.

Preview harus dapat dibangun dan dibuka di Vercel tanpa PostgreSQL, kredensial pembayaran, layanan pengiriman, atau layanan email. Hasil tahap ini adalah frontend yang siap ditinjau, bukan toko yang sudah menerima transaksi nyata.

### Tahap 2 — Backend dan integrasi

Hubungkan PostgreSQL, autentikasi admin, penyimpanan media, katalog, stok, pesanan, formulir kontak, pembayaran, pengiriman, dan email. Pertahankan kontrak data yang digunakan frontend sejauh memungkinkan.

### Tahap 3 — Persiapan produksi

Ganti konten awal dengan katalog dan kebijakan yang disetujui, tetapkan domain utama, selesaikan konfigurasi layanan, verifikasi transaksi serta pengiriman, lalu aktifkan pengindeksan pada domain produksi.

## 6. Cakupan Frontend Pelanggan

| Halaman/alur    | Kebutuhan                                                                                                                                |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Beranda         | Identitas brand, hero karya unggulan, koleksi, cerita singkat, detail handmade, dan ajakan berbelanja                                    |
| Shop            | Daftar produk, pencarian, filter kategori/bahan/ketersediaan, pengurutan, hasil kosong, dan reset filter                                 |
| Koleksi         | Cerita koleksi, foto editorial, dan produk terkait                                                                                       |
| Detail produk   | Galeri, foto saat dikenakan, harga/mata uang, variasi, bahan, ukuran, perawatan, ketersediaan, waktu pengerjaan, dan tambah ke keranjang |
| Keranjang       | Ubah jumlah/variasi, hapus item, subtotal, status kosong, dan lanjut ke checkout                                                         |
| Checkout tamu   | Kontak, alamat AS/internasional, pilihan pengiriman, ringkasan biaya, validasi input, dan tampilan pembayaran                            |
| Hasil checkout  | Tampilan ringkasan pesanan serta keadaan berhasil, tertunda, gagal, dan dibatalkan untuk kebutuhan review                                |
| About           | Cerita WFC, inspirasi nama, pembuat, dan proses pengerjaan                                                                               |
| Contact         | Nama, email, subjek, pesan, rujukan produk opsional, validasi, dan keadaan pengiriman formulir                                           |
| Panduan dan FAQ | Ukuran, perawatan, pengiriman, dan pertanyaan made-to-order                                                                              |
| Kebijakan       | Shipping, returns/refunds, cancellation, privacy, terms, serta informasi pajak/bea masuk                                                 |
| Halaman sistem  | Loading, error dengan tindakan pemulihan, dan 404                                                                                        |

Semua halaman menggunakan bahasa Inggris dan memiliki navigasi header/footer yang konsisten. Akun pelanggan, wishlist, ulasan, loyalty, kupon kompleks, marketplace, dan konfigurator visual berada di luar MVP.

## 7. Cakupan Frontend Admin

- Halaman masuk dan tampilan sesi berakhir/tidak memiliki akses.
- Dashboard ringkasan aktivitas dan pesanan.
- Daftar, pencarian, filter, dan editor produk; pengaturan variasi, foto, kategori, publikasi, stok, serta waktu pengerjaan.
- Daftar dan editor kategori/koleksi.
- Daftar dan detail pesanan, termasuk status pembayaran, item, alamat, dan pemenuhan.
- Tampilan pengiriman dan informasi pelacakan.
- Daftar dan detail pertanyaan formulir kontak.
- Tampilan pengaturan bisnis, mata uang, pengiriman, dan informasi kontak.

Pada tahap pertama, perubahan admin menggunakan state lokal. Halaman login menjadi bagian dari review antarmuka; pembatasan akses yang sebenarnya dihubungkan pada tahap backend. Akses preview admin dikendalikan melalui konfigurasi preview sebelum tautan dibagikan.

## 8. Konten dan Data untuk Review

- Sediakan katalog awal yang realistis dan konsisten, mencakup berbagai kategori, bahan, variasi ukuran, produk siap kirim, habis, serta made-to-order.
- Setiap produk memiliki nama, slug, deskripsi Inggris, harga, kode mata uang, galeri, bahan, ukuran, perawatan, dan ketersediaan yang selaras.
- Gunakan konten editorial yang utuh; hindari lorem ipsum, gambar rusak, dan ruang konten yang belum diisi.
- Jangan tampilkan kata “sample”, “dummy”, “demo data”, atau penjelasan teknis tentang sumber data di antarmuka pelanggan maupun admin.
- Data untuk kebutuhan review boleh diberi nama teknis di kode dan dokumentasi internal agar pengembang memahami asalnya.
- Sediakan contoh pesanan, pertanyaan kontak, dan status pengiriman dengan identitas fiktif; jangan gunakan data pribadi pelanggan nyata.
- Tahap frontend menggunakan placeholder gambar lokal sesuai arahan terbaru. Tidak perlu mengambil foto produk eksternal. Placeholder diganti dengan foto WFC yang disetujui sebelum produksi.
- Untuk konsistensi tampilan awal, USD dapat digunakan sebagai asumsi sementara; mata uang transaksi produksi tetap perlu dikonfirmasi.

### Batas interaksi preview

Keranjang, filter, variasi, dan formulir bekerja secara lokal. State keranjang dapat bertahan saat refresh pada perangkat yang sama. Data pribadi dari input checkout/formulir tidak perlu disimpan di browser untuk review.

Tampilan pembayaran tidak mengumpulkan nomor kartu atau membebankan pembayaran nyata. Alur review dapat membuka ringkasan pesanan dan keadaan hasil transaksi tanpa mengklaim pembayaran benar-benar diterima. Formulir kontak menampilkan validasi dan state antarmuka tanpa mengirim email nyata pada tahap pertama.

Penjelasan batas preview disediakan dalam catatan review internal dan pesan berbagi tautan, sehingga antarmuka tetap bersih tanpa label teknis pada produk.

## 9. Persyaratan Produksi Setelah Integrasi

- Katalog dan stok berasal dari PostgreSQL; kategori dapat ditambah untuk karya selain perhiasan.
- Checkout tamu memvalidasi harga, variasi, stok, tujuan, ongkir, mata uang, dan total di server.
- Produk siap kirim dan made-to-order memiliki aturan ketersediaan serta waktu pemenuhan yang jelas. Pesanan campuran menjelaskan estimasi pengiriman.
- Pesanan menyimpan snapshot nama, variasi, harga, mata uang, dan jumlah saat pembelian.
- Pembayaran menggunakan gateway yang dipilih WFC. Data kartu ditangani penyedia pembayaran; status terbayar mengikuti konfirmasi server yang sah.
- Pengurangan stok dan pemrosesan callback pembayaran konsisten serta tidak memproses transaksi yang sama berulang kali.
- Pengiriman mendukung seluruh AS dan tujuan internasional yang dikonfigurasi; tujuan yang tidak dapat dilayani diblokir sebelum pembayaran.
- Ongkir, estimasi, pajak, bea masuk, dan tanggung jawab pembayarannya dijelaskan sebelum pembelian.
- Email konfirmasi pesanan dan pembaruan pengiriman menggunakan layanan email yang dipilih.
- Formulir kontak mengirim pertanyaan ke email bisnis dan memiliki perlindungan spam.
- Admin memiliki autentikasi dan otorisasi; perubahan penting pada pesanan tercatat.

## 10. Arsitektur dan Data

- **Frontend:** Next.js stable terbaru, App Router, TypeScript, komponen dan design tokens yang konsisten.
- **Sumber data tahap pertama:** modul data lokal dengan tipe yang jelas dan fungsi akses data terpusat.
- **Database produksi:** PostgreSQL dengan migrasi skema.
- **Integrasi bertahap:** komponen tampilan menggunakan lapisan akses data agar sumber lokal dapat diganti dengan API/database tanpa menulis ulang halaman.
- **Media:** file yang dioptimalkan untuk preview; object storage atau layanan gambar untuk produksi. PostgreSQL menyimpan referensi media.
- **Konfigurasi:** pisahkan konfigurasi preview dan produksi; rahasia layanan hanya berada di server.

Entitas tujuan: Product, ProductVariant, ProductImage, Category, Collection, Inventory, Customer/Address, Order/OrderItem, Payment, Shipment, ContactInquiry, dan AdminUser. Bentuk data frontend mempertimbangkan entitas tersebut tanpa mewajibkan backend sudah tersedia.

## 11. SEO, Performa, dan Aksesibilitas

- Konten utama halaman publik tersedia melalui rendering Next.js yang dapat dibaca mesin pencari.
- Setiap halaman memiliki title dan description Inggris yang sesuai, heading semantik, URL deskriptif, tautan internal, dan alt text yang relevan.
- Siapkan canonical URL, Open Graph, sitemap, robots.txt, dan data terstruktur yang akurat untuk domain produksi.
- Halaman cart, checkout, admin, dan hasil pesanan tidak ditujukan untuk pengindeksan.
- Preview Vercel menggunakan noindex; sitemap produksi dan pengindeksan baru diaktifkan pada domain utama setelah katalog/kebijakan disetujui.
- Filter dan parameter tidak menghasilkan halaman duplikat yang diindeks tanpa tujuan.
- Optimalkan gambar, font, JavaScript, dan pergeseran tata letak. Hindari animasi berat yang mengganggu belanja.
- Pastikan navigasi keyboard, fokus terlihat, label formulir, pesan validasi, kontras, dan pengurangan gerakan berfungsi.
- Desain responsif mencakup mobile, tablet, dan desktop tanpa konten terpotong atau scroll horizontal yang tidak diperlukan.

## 12. Rencana Preview Vercel

1. Bangun frontend dan konten lokal hingga seluruh halaman utama tersedia.
2. Pastikan proses build tidak bergantung pada database atau kredensial layanan produksi.
3. Jalankan pemeriksaan build, tipe, navigasi, tampilan responsif, serta alur pelanggan/admin yang relevan.
4. Deploy sebagai preview di Vercel dengan konfigurasi lingkungan yang sesuai dan noindex.
5. Bagikan URL untuk review desain, konten, navigasi, dan interaksi. Sertakan batas fungsi preview dalam catatan review.
6. Catat masukan berdasarkan halaman, perbaiki, dan terbitkan preview berikutnya sampai frontend disepakati.

Hosting produksi final dapat diputuskan setelah kebutuhan backend dan operasional jelas. Rencana tahap ini menggunakan Vercel untuk review online terlebih dahulu.

## 13. Kriteria Penerimaan

### Tahap pertama — frontend siap ditinjau

- Seluruh halaman pelanggan dan admin dalam cakupan tersedia dengan konten yang konsisten.
- Semua tautan, tombol utama, pencarian, filter, variasi, dan keranjang memiliki perilaku yang dapat ditinjau.
- Checkout dapat dinavigasi dan divalidasi; keadaan ringkasan/hasil dapat dilihat tanpa transaksi nyata.
- Formulir kontak dan editor admin memiliki keadaan validasi, loading, berhasil, gagal, dan kosong yang relevan.
- Tidak ada label “sample” atau “dummy”, lorem ipsum, atau gambar rusak pada antarmuka.
- Gaya minimalis monokrom WFC konsisten dan detail produk tetap mudah dilihat.
- Preview Vercel dapat dibuka melalui URL review, tanpa dependensi backend, dan tidak ditujukan untuk pengindeksan.
- Build dan pemeriksaan tipe berhasil; navigasi serta interaksi utama telah diperiksa pada mobile dan desktop.

### Tahap produksi — toko siap menerima transaksi

- PostgreSQL, autentikasi admin, pembayaran, pengiriman, email, dan media telah dihubungkan.
- Harga, stok, pesanan, pembayaran, serta biaya pengiriman tervalidasi di server.
- Katalog, kebijakan, negara tujuan, mata uang, dan konten bisnis telah disetujui.
- Domain, metadata, canonical, sitemap, dan pengindeksan produksi dikonfigurasi.

## 14. Keputusan Terbuka dan Ketergantungan

Keputusan berikut dapat berjalan paralel dengan pembangunan frontend; keputusan ini diperlukan sebelum toko produksi diluncurkan:

1. Mata uang pembayaran: USD saja atau beberapa mata uang.
2. Payment gateway dan metode pembayaran yang diterima.
3. Negara tujuan internasional yang dikecualikan, alamat asal pengiriman, carrier, dan aturan tarif ongkir.
4. Penanganan pajak/bea masuk serta kebijakan pengembalian, pembatalan, perbaikan, dan refund.
5. Waktu pengerjaan made-to-order, batas jumlah pesanan, opsi custom, dan pengiriman pesanan campuran.
6. Logo final, foto produk, katalog asli, cerita pembuat, serta alamat email bisnis.
7. Domain utama, penyedia email/media, dan akses Vercel untuk deployment.

Riwayat penjualan melalui toko tertentu tidak dijadikan asumsi. Brief awal “wiorerape” ditafsirkan sebagai wire wrapping dan “silver smith” sebagai silversmithing.
