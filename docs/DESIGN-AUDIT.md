# Laporan Audit Kualitas Desain dan Polish — Wild Feather Creations

**Tanggal audit:** 26 Oktober 2026  
**Cakupan:** Beranda, katalog, detail produk, About, dashboard admin, desktop dan mobile  
**Status aset:** Gambar produk masih placeholder; logo utama Opsi 4 diterapkan setelah audit ini

> Catatan: skor dan temuan di bawah merekam kondisi saat audit dibuat, sebelum logo utama dipilih. Rekomendasi finalisasi logo sudah diselesaikan dan belum dihitung ulang dalam skor ini.

## Penilaian keseluruhan

# 80/100

Website sudah memiliki arah editorial yang kuat, konsisten, dan cukup matang untuk review desain. Skor belum lebih tinggi karena placeholder belum menunjukkan tekstur dan skala perhiasan yang sebenarnya, identitas logo belum final, serta beberapa detail kecil masih kurang terbaca. Nilai ini menilai kualitas desain yang terlihat saat ini, bukan kesiapan transaksi produksi.

## Skor per area

| Area                          | Skor | Temuan singkat                                                                                                                                  |
| ----------------------------- | ---: | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Tata letak dan komposisi      |   90 | Ruang, grid, dan urutan konten terasa terencana; halaman produk memisahkan galeri dan pembelian dengan jelas.                                   |
| Hierarki belanja              |   87 | Harga, pilihan ukuran, ketersediaan, dan tombol tambah ke keranjang mudah ditemukan.                                                            |
| Tipografi                     |   86 | Serif editorial dan sans serif bekerja baik bersama; judul memberi karakter yang kuat.                                                          |
| Konsistensi ant halaman       |   85 | Warna, garis, tombol, dan pola navigasi terasa satu sistem.                                                                                     |
| Responsif                     |   85 | Header dan konten beradaptasi baik di mobile; dashboard admin masih memiliki navigasi horizontal yang mudah terpotong.                          |
| Dashboard admin               |   82 | Tata letak rapi dan selaras dengan brand; label kecil dan navigasi mobile perlu ditingkatkan.                                                   |
| Keterbacaan visual            |   77 | Teks utama jelas, tetapi sejumlah label kecil dan warna sekunder kurang kuat. Ini adalah tinjauan visual, bukan audit aksesibilitas WCAG penuh. |
| Keunikan identitas            |   73 | Arah monokrom dan editorial sudah tepat, namun wordmark serta mark bulu masih sementara.                                                        |
| Gambar produk dan kepercayaan |   60 | Placeholder menjaga konsistensi visual, tetapi belum menunjukkan kilau, tekstur, ukuran, atau bagaimana perhiasan dikenakan.                    |

## Yang sudah bekerja baik

- Beranda memiliki komposisi editorial yang mudah dikenali: visual hero besar, headline berkarakter, lalu koleksi dan cerita brand.
- Halaman katalog mudah dipindai. Kategori, filter, status produk, bahan, dan harga tersusun dengan baik.
- Halaman detail produk menempatkan galeri, harga, ketersediaan, pilihan ukuran, dan CTA dalam satu alur yang jelas.
- Palet monokrom, ruang kosong, garis tipis, dan tipografi membangun suasana modern tanpa ramai dekorasi.
- Tampilan mobile mempertahankan identitas yang sama dan tidak terasa seperti layout desktop yang diperkecil.
- Dashboard admin memiliki hierarki yang jelas antara navigasi, ringkasan, dan tindakan seperti menambah produk.

## Temuan dan rekomendasi

### Prioritas tinggi — sebelum desain dianggap final

1. **Finalkan logo WFC.** Mark bulu yang sekarang tampil sebagai motif sementara. Buat tiga alternatif yang sudah direncanakan, pilih satu, lalu terapkan konsisten pada header, footer, admin, dan favicon. Siapkan simbol ringkas agar mark tetap terbaca di ukuran kecil.
2. **Tingkatkan sistem gambar produk.** Pertahankan placeholder untuk review desain sekarang. Saat foto asli tersedia, sediakan foto produk dengan latar konsisten, detail dekat, tampak samping, skala di tangan/tubuh, serta foto proses pengerjaan. Foto inilah yang paling besar pengaruhnya terhadap kepercayaan dan pembeda WFC.
3. **Perkuat kontras teks sekunder.** Warna `--muted` saat ini `#747871` pada latar `#f8f8f4` memiliki rasio kontras sekitar **4,23:1**, sedikit di bawah target 4,5:1 untuk teks normal. Gelapkan warna sekunder, lalu cek ulang breadcrumb, label, harga mata uang, dan metadata.
4. **Naikkan ukuran informasi kecil.** Beberapa label, footer, keterangan galeri, dan teks navigasi memakai 8–10 px. Pertahankan ukuran kecil untuk ornamen editorial saja; naikkan informasi yang dibutuhkan pelanggan menjadi sekitar 11–12 px atau lebih.
5. **Pastikan CTA terlihat lebih cepat di mobile.** Pada beranda mobile, hero image dan headline panjang mendorong tombol belanja cukup jauh ke bawah. Kurangi jarak/tinggi hero pada layar kecil atau letakkan tautan belanja yang terlihat tanpa mengorbankan headline utama.

### Prioritas menengah — polish interaksi

1. **Perbesar area sentuh ikon.** Beberapa kontrol ikon memakai area sekitar 34 × 34 px. Tingkatkan area sentuh mobile menjadi sekitar 44 × 44 px, sambil mempertahankan ukuran visual ikon saat ini.
2. **Rapikan navigasi admin mobile.** Navigasi bagian dashboard dapat digeser mendatar dan sebagian label berikutnya tampak terpotong. Beri petunjuk bahwa bar dapat digeser, atau gunakan menu ringkas yang memperlihatkan semua bagian.
3. **Tambahkan detail cerita pembuat yang terverifikasi.** Halaman About sudah memiliki narasi brand yang kohesif, tetapi akan terasa lebih khas jika dilengkapi suara pemilik, foto studio, dan proses nyata. Gunakan hanya detail yang sudah dikonfirmasi pemilik.
4. **Jaga variasi placeholder tetap spesifik.** Selama foto belum tersedia, bentuk placeholder tiap kategori perlu langsung membedakan cincin, pendant, anting, dan gelang. Hindari gambar berulang yang membuat katalog terasa seperti satu produk dengan nama berbeda.

### Sebelum peluncuran produksi

- Ganti placeholder dengan foto produk yang disetujui, lalu cek crop dan konsistensi galeri pada desktop serta mobile.
- Verifikasi nama, bahan, harga, ukuran, waktu pengerjaan, cerita brand, informasi kontak, dan kebijakan bisnis.
- Tinjau ulang metadata SEO serta alt text setelah foto dan konten final tersedia.
- Ulangi review tampilan setelah logo final dan foto asli diterapkan.

## Ringkasan arah perbaikan

Pertahankan struktur editorial, warna monokrom, dan tipografi yang sudah ada. Fokus peningkatan berikutnya adalah membuat identitas WFC lebih unik melalui logo dan cerita pembuat, menyiapkan foto yang menunjukkan detail perhiasan sebenarnya, serta meningkatkan keterbacaan label dan kontrol kecil. Setelah tiga hal tersebut selesai, desain berpeluang mencapai kisaran **90/100**.

## Bukti visual yang tersedia

- [Beranda desktop](review/home-desktop.png)
- [Beranda mobile](review/home-mobile.png)
- [Dashboard admin desktop](review/admin-desktop.png)
- [Dashboard admin mobile](review/admin-mobile.png)
