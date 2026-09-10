# Sistem Pendukung Keputusan (SPK) Pemilihan Karyawan Terbaik

## 📋 Deskripsi Proyek

Aplikasi web interaktif untuk membantu perusahaan dalam memilih karyawan terbaik menggunakan **Metode Simple Additive Weighting (SAW)**, salah satu metode pengambilan keputusan multi-kriteria yang paling populer dan efektif.

## 🎯 Fitur Utama

- ✅ **Setup Kriteria** - Tentukan kriteria seleksi dengan bobot masing-masing
- ✅ **Input Data Karyawan** - Masukkan data karyawan beserta nilainya untuk setiap kriteria
- ✅ **Perhitungan Otomatis** - Sistem secara otomatis menghitung skor menggunakan metode SAW
- ✅ **Tampil Hasil** - Lihat matriks ternormalisasi, perhitungan skor, dan perangkingan
- ✅ **Download Hasil** - Export hasil analisis dalam format CSV

## 📐 Metode SAW (Simple Additive Weighting)

### Langkah-langkah Perhitungan:

1. **Normalisasi Matriks**
   - Untuk kriteria Benefit: `r_ij = X_ij / max(X_ij)`
   - Untuk kriteria Cost: `r_ij = min(X_ij) / X_ij`

2. **Perhitungan Skor Preferensi**
   - `V_i = Σ (w_j × r_ij)`
   - Dimana: w_j adalah bobot kriteria, r_ij adalah nilai normalisasi

3. **Perangkingan**
   - Urutkan alternatif berdasarkan skor dari tertinggi ke terendah

## 🚀 Cara Menggunakan

### 1. Setup Kriteria
- Masuk ke tab "Setup Kriteria"
- Tentukan nama kriteria yang relevan dengan seleksi karyawan
- Pilih tipe kriteria:
  - **Benefit**: Semakin tinggi nilainya, semakin baik (contoh: pengalaman, kemampuan teknis)
  - **Cost**: Semakin rendah nilainya, semakin baik (contoh: usia, lama izin)
- Tentukan bobot untuk setiap kriteria (total harus 100%)
- Klik "Lanjut ke Input Data"

### 2. Input Data Karyawan
- Masuk ke tab "Input Data"
- Klik "Tambah Karyawan" untuk menambah data
- Isi nama karyawan dan nilainya untuk setiap kriteria
- Pastikan semua data terisi dengan lengkap
- Klik "Hitung Hasil"

### 3. Lihat Hasil Analisis
- Sistem akan menampilkan:
  - **Matriks Ternormalisasi**: Nilai yang sudah dinormalisasi
  - **Perhitungan Skor Preferensi**: Detail perhitungan untuk setiap karyawan
  - **Hasil Perangkingan**: Urutan karyawan dari yang terbaik
- Download hasil dalam format CSV jika diperlukan

## 📂 Struktur File
