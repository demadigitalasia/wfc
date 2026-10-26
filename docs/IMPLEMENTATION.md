# Status implementasi frontend WFC

Tanggal: 26 Oktober 2026.

## Tahap implementasi

| Tahap                 | Status                  | Hasil                                                                                                                        |
| --------------------- | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Fondasi dan identitas | Selesai                 | Next.js 16.4.3, React, TypeScript, font lokal, monokrom, komponen bersama                                                    |
| Storefront            | Selesai                 | Beranda, katalog, koleksi, detail, pencarian, filter, sort, galeri, variasi                                                  |
| Alur belanja          | Selesai untuk review    | Keranjang lokal, checkout tamu, pengiriman, penagihan, ringkasan dan keadaan hasil                                           |
| Halaman informasi     | Selesai                 | About, Contact, FAQ, sizing, care, kebijakan, loading, error, 404                                                            |
| Panel studio          | Selesai untuk review    | Login frontend, dashboard, produk, koleksi/kategori, orders, shipping, enquiries, settings                                   |
| Visual                | Selesai untuk tahap ini | Semua gambar placeholder SVG lokal; tidak menggunakan foto produk eksternal                                                  |
| Gerakan saat scroll   | Selesai untuk tahap ini | Hero masuk lembut; bagian editorial, koleksi, dan kartu produk tampil bertahap saat masuk viewport; mendukung reduced motion |
| Vercel                | Siap dikonfigurasi      | Konfigurasi deployment dan dokumentasi tersedia; belum dideploy                                                              |
| Backend produksi      | Tahap berikutnya        | PostgreSQL, autentikasi server, pembayaran, carrier, email, media                                                            |

## Pemeriksaan

- TypeScript: lolos.
- Build produksi: lolos, menghasilkan 34 halaman statis serta route dinamis terkait.
- Review browser desktop: beranda, detail produk, keranjang, checkout, katalog, dan dashboard admin.
- Variasi produk wajib dipilih sebelum masuk keranjang.
- Kuantitas dan subtotal keranjang sesuai; ongkir internasional mengubah total sesuai pilihan.
- Checkout berakhir pada ringkasan tanpa transaksi atau email nyata.
- Filter kategori, pengurutan harga, dan hasil kosong diperiksa.
- Perubahan harga produk lokal tetap ada setelah refresh; nilai diperiksa lalu dikembalikan.
- Katalog mobile diperiksa pada viewport 390 × 844, tanpa overflow horizontal.

- Pemeriksaan HTTP 40 route: status sesuai (200 untuk halaman dan aset; 404 untuk URL tidak dikenal), seluruh respons preview memiliki header noindex.
- Formulir kontak mobile: validasi dan review pesan diperiksa tanpa mengirim email.
- Editor koleksi: dialog dan penyimpanan diperiksa.
- Login serta logout admin mobile diperiksa.
- Perpindahan dari ring ke pendant menghapus pilihan ukuran lama; pilihan variasi tidak terbawa antarproduk.
- Console browser pada review build produksi terakhir tidak mencatat error.
- Dashboard mobile: overflow grafik ditemukan dan diperbaiki; lebar dokumen sama dengan lebar viewport efektif.
- Grafik dashboard mengikuti nilai order yang tersimpan; harga baris pesanan memakai snapshot katalog awal.
- Gambar review tersimpan di `docs/review/home-desktop.png`, `home-mobile.png`, `admin-desktop.png`, dan `admin-mobile.png`.

Batas fungsi preview tercantum di README; jangan gunakan sebagai toko live sebelum integrasi produksi.
