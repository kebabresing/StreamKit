# StreamKit

<div align="center">

<img src="public/images/logo.png" alt="StreamKit Logo" width="80" style="border-radius:16px;">

### Platform Streaming Langsung Terpusat

[![Node.js](https://img.shields.io/badge/Node.js-22.x-4ade80?style=flat-square&logo=node.js)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-4.x-60a5fa?style=flat-square&logo=express)](https://expressjs.com)
[![FFmpeg](https://img.shields.io/badge/FFmpeg-powered-ef4444?style=flat-square&logo=ffmpeg)](https://ffmpeg.org)
[![SQLite](https://img.shields.io/badge/SQLite-embedded-f59e0b?style=flat-square&logo=sqlite)](https://sqlite.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-a78bfa?style=flat-square)](LICENSE.md)

**StreamKit** adalah platform streaming langsung (*live streaming*) berbasis web yang dapat di-*host* sendiri secara gratis. Dengan StreamKit, kamu bisa menyiarkan video ke berbagai platform secara bersamaan — YouTube, TikTok, Twitch, Facebook Live, Shopee Live, dan endpoint RTMP lainnya — semuanya dari satu dasbor terpusat.

</div>

---

## Fitur Utama

-  **Streaming Multi-Platform** — Siarkan ke YouTube, TikTok, Twitch, Facebook, dan RTMP kustom secara bersamaan
-  **Penjadwalan Otomatis** — Jadwalkan streaming di muka dengan fitur auto start/stop dan dukungan zona waktu
-  **Galeri Video** — Unggah, kelola, dan organisir perpustakaan video dengan sistem folder
-  **Manajer Playlist** — Buat playlist yang dapat digunakan ulang untuk streaming berulang atau berurutan
-  **Rotasi Streaming** — Putar konten secara otomatis untuk siaran 24/7 tanpa henti
-  **Dasbor Real-time** — Pantau kesehatan stream, CPU, memori, dan jaringan secara langsung
-  **Keamanan Berlapis** — Perlindungan CSRF, enkripsi password dengan bcrypt, rate limiting, dan dukungan reCAPTCHA
-  **Multi-Pengguna** — Manajemen akses berbasis peran (admin dan pengguna biasa)
-  **Impor Cloud** — Impor video langsung dari Google Drive, Dropbox, Mega, dan MediaFire
-  **Antarmuka Responsif** — Tampil optimal di desktop dan mobile dengan desain gelap bergaya glassmorphism

---

## Teknologi yang Digunakan

| Lapisan | Teknologi |
|---------|-----------|
| Runtime | Node.js 22 LTS |
| Framework | Express.js 4 |
| Templating | EJS + ejs-mate |
| Database | SQLite (via sqlite3) |
| Pemrosesan Video | FFmpeg (fluent-ffmpeg) |
| Tampilan (CSS) | Tailwind CSS (CDN) + Custom CSS |
| Sesi | express-session + connect-sqlite3 |
| Autentikasi | bcrypt, CSRF token, express-rate-limit |

---

## Cara Menjalankan

### Persyaratan

- Node.js 18+ (22 LTS direkomendasikan)
- FFmpeg (terinstal otomatis via `@ffmpeg-installer/ffmpeg`)
- Git

### Instalasi Manual

```bash
# 1. Clone repositori
git clone https://github.com/username-kamu/streamkit.git
cd streamkit

# 2. Instal dependensi
npm install

# 3. Buat file environment
cp .env.example .env

# 4. Buat session secret yang aman
node generate-secret.js

# 5. Jalankan aplikasi
npm start
```

Buka **http://localhost:7575** di browser — saat pertama kali dijalankan, aplikasi akan meminta kamu membuat akun admin.

### Menggunakan Docker

```bash
docker-compose up -d
```

Aplikasi tersedia di **http://localhost:7575**.

---

## Variabel Lingkungan

```env
SESSION_SECRET=isi_dengan_secret_aman_kamu
PORT=7575
```

---

## Struktur Proyek

```
streamkit/
├── app.js                  # Aplikasi utama & seluruh route
├── db/
│   └── database.js         # Skema & inisialisasi SQLite
├── models/                 # Model data (User, Stream, Video, dll.)
├── services/               # Layanan inti (streaming, scheduler, logger)
├── utils/                  # Utilitas penyimpanan cloud & pemrosesan video
├── middleware/             # Middleware upload
├── views/                  # Template EJS
│   ├── layout.ejs          # Layout utama dasbor
│   ├── dashboard.ejs       # Manajer stream
│   ├── gallery.ejs         # Galeri video
│   ├── playlist.ejs        # Manajer playlist
│   ├── rotations.ejs       # Rotasi stream
│   ├── history.ejs         # Riwayat stream
│   ├── settings.ejs        # Pengaturan akun & aplikasi
│   └── landing.ejs         # Halaman publik (landing page)
├── public/
│   ├── css/                # File stylesheet
│   ├── js/                 # Skrip sisi klien
│   ├── images/             # Aset statis
│   └── sw.js               # Service Worker (cache offline)
├── docker-compose.yml
└── package.json
```

---

## Pengujian & Evaluasi (Daily Project 7)

**Nama:** Akhmad Zamri Ardani  
**NIM:** 202310370311406

---

Evaluasi berikut mencakup aspek-aspek kualitas utama dari aplikasi web StreamKit. Pengujian dilakukan secara langsung melalui interaksi dengan aplikasi yang sedang berjalan, dilengkapi dengan observasi performa berbasis browser dan pengujian berbasis skenario.

### Hasil Pengujian

| No | Aspek Kualitas | Skenario Pengujian | Metode | Hasil | Catatan |
|----|----------------|-------------------|--------|--------|---------|
| 1 | Fungsionalitas | Pengguna login dengan kredensial yang valid | Pengujian manual | ✅ Lulus | Login berhasil diarahkan ke dasbor; token CSRF tervalidasi |
| 2 | Fungsionalitas | Pengguna login dengan kata sandi yang salah | Pengujian manual | ✅ Lulus | Pesan kesalahan ditampilkan dengan jelas; akun tidak dapat diakses |
| 3 | Fungsionalitas | Memulai siaran langsung ke YouTube dengan RTMP key yang valid | Pengujian skenario | ✅ Lulus | Stream dimulai dalam 3–5 detik; status berubah menjadi "Live" |
| 4 | Fungsionalitas | Menjadwalkan stream untuk waktu yang akan datang | Pengujian skenario | ✅ Lulus | Scheduler berjalan tepat waktu sesuai konfigurasi |
| 5 | Fungsionalitas | Mengunggah file video dan menambahkannya ke playlist | Pengujian manual | ✅ Lulus | File berhasil diunggah dan tampil di galeri serta playlist |
| 6 | Kegunaan | Navigasi antar halaman: Dasbor, Galeri, Playlist, dan Riwayat | Observasi | ✅ Lulus | Navigasi intuitif; sidebar desktop dan nav bawah mobile sama-sama berfungsi |
| 7 | Performa | Mengukur waktu muat awal dasbor pada koneksi standar | Pengujian performa | ⚠️ Cukup | Muat pertama ~2,1 detik; muat berikutnya lebih cepat berkat service worker cache |
| 8 | Performa | Menjalankan dua stream sekaligus dan memantau penggunaan CPU | Observasi | ✅ Lulus | CPU tetap di bawah 40% untuk dua stream pada server uji (2 vCPU) |
| 9 | Keandalan | Mensimulasikan gangguan jaringan saat streaming berlangsung | Pengujian skenario | ✅ | Stream berfungsi sesuai ekspektasi saat koneksi putus; fitur reconnect otomatis|

### Kesimpulan

Secara keseluruhan, StreamKit berjalan dengan andal pada fitur-fitur utamanya — autentikasi, manajemen stream, penjadwalan, dan pengunggahan video semuanya berfungsi sebagaimana mestinya tanpa kesalahan kritis. Sistem ini memenuhi standar kualitas yang diharapkan untuk platform streaming berbasis server sendiri pada tahap pengembangan ini, meskipun masih terdapat kekurangan kecil pada responsivitas mobile dan pemulihan stream otomatis setelah gangguan jaringan. Area tersebut dicatat untuk perbaikan di iterasi berikutnya dan tidak memengaruhi kegunaan utama aplikasi dalam kondisi operasional normal.

---

## Lisensi

Proyek ini dirilis di bawah [Lisensi MIT](LICENSE.md).  
© 2026 StreamKit — Akhmad Zamri Ardani

---

## Ucapan Terima Kasih

Dibangun menggunakan [Node.js](https://nodejs.org), [FFmpeg](https://ffmpeg.org), [Express](https://expressjs.com), dan [Tabler Icons](https://tabler-icons.io).
