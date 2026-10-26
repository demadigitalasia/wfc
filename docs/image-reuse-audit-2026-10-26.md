# Audit penggunaan ulang gambar WFC

26 Oktober 2026. Pemeriksaan kode homepage, navigasi, koleksi, dan About, serta SHA-256 seluruh file public/images.

Tidak ditemukan file identik byte-per-byte dengan nama berbeda. Namun, satu aset direferensikan di beberapa komponen. Hero JPG dan WebP juga merupakan visual yang sama dalam format berbeda, sehingga tidak tertangkap sebagai duplikat hash.

| Visual | Pemakaian sebelum perbaikan | Rekomendasi |
|---|---|---|
| Carnelian hero | Hero utama (WebP), kartu material, dropdown Shop (JPG) | Simpan foto utuh untuk hero; kartu material memakai komposisi perhiasan baru, menu memakai sudut/visual lain |
| Chrysocolla | Hero koleksi, kartu material, baris koleksi, dropdown Collections | Bedakan foto perhiasan, variasi perhiasan silver, dan thumbnail koleksi |
| Clown Doublet | Hero koleksi, kartu material, baris koleksi | Gunakan variasi perhiasan baru di kartu, foto koleksi berbeda untuk thumbnail |
| Bumble Bee Jasper | Hero koleksi, kartu material, baris koleksi | Bedakan foto pemakaian di hero dan pendant silver pada kartu |
| Craft process | Kolase hero, dropdown Client Care, halaman About | Pengulangan kontekstual boleh; idealnya tambahkan sudut proses berbeda pada iterasi berikutnya |
| Foto editorial koleksi | Kolase hero dan halaman koleksi | Boleh sebagai penghubung identitas; hindari mengulangnya lagi sebagai visual besar pada halaman yang sama |

## Arah penataan

- Hero: perhiasan dan pemakaian, untuk emosi dan skala.
- Kartu bergerak: perhiasan silversmith dengan cabochon relevan, memakai jenis produk dan komposisi berbeda dari hero.
- Daftar koleksi: gunakan aset foto koleksi yang telah tersedia agar tidak mengulang visual hero koleksi.
- Dropdown: satu foto pendukung yang relevan, tidak perlu menyajikan ulang semua foto hero.
- Halaman produk: foto yang sesuai SKU. Jangan mengganti foto barang sebenarnya dengan interpretasi AI tanpa penandaan dan validasi pemilik.

## Gambar baru

Setelah klarifikasi pengguna, gambar batu lepas tidak digunakan. Tiga gambar pengganti menampilkan perhiasan jadi: cincin silver chrysocolla, anting silver dengan cabochon biru-cream, dan pendant silver Bumble Bee Jasper. Referensi asli digunakan untuk warna batu dan karakter pengerjaan silver. Gambar merupakan konsep editorial AI, bukan foto SKU jual.

Mode: built-in image_gen. Prompt lengkap dan lokasi hasil disimpan bersama laporan setelah generasi selesai.

## Hasil yang diterapkan

- Kartu Chrysocolla: jewelry-studies/chrysocolla-ring.webp — cincin silver dengan permukaan hammered dan cabochon turquoise.
- Kartu Clown Doublet: jewelry-studies/clown-doublet-earrings.webp — anting drop silver dengan cabochon biru-cream.
- Kartu Bumble Bee Jasper: jewelry-studies/bumble-bee-pendant.webp — pendant silver dengan cabochon kuning-hitam.
- Kartu Indonesian Stone Studies memakai foto set Blue Opalized Wood yang sudah ada, menggantikan pengulangan hero carnelian.
- Baris daftar koleksi memakai collection.image, bukan mengulang gambar hero koleksi.
- Setiap gambar baru dilabeli “AI editorial concept”. Halaman detail produk dan foto SKU tidak diubah.

Semua aset baru berada di public/images/editorial/jewelry-studies/ dalam format PNG master dan WebP untuk website. Prompt lengkap: docs/jewelry-editorial-prompts.json. Dibuat dengan built-in image_gen menggunakan tiga foto hero koleksi sebagai referensi.

Rekomendasi berikutnya: gunakan crop detail silver atau sudut lain pada dropdown Shop; tambahkan foto proses yang berbeda untuk Client Care agar foto craft tidak berulang dengan halaman About. Pengulangan kecil antarnavigasi dan halaman tujuan boleh dipertahankan sebagai penghubung identitas, tetapi visual besar di halaman yang sama sebaiknya berbeda.
