**✿ Everbloom**

_Platform Buket Digital Interaktif_

_Beautiful flowers, delivered digitally._

Product Requirements Document (PRD)

Versi 1.0 | Mei 2025

| **Status**     | Draft - Untuk Review Internal                        |
| -------------- | ---------------------------------------------------- |
| **Versi**      | 1.0                                                  |
| **Tanggal**    | Mei 2025                                             |
| **Penulis**    | Tim Produk Everbloom                                 |
| **Tech Stack** | Next.js 16 · Tailwind CSS · Konva.js · Framer Motion |
| **Deployment** | Google Cloud Run (containerised)                     |
| **Storage**    | localStorage (session-based, no backend)             |

# **1\. Ringkasan Eksekutif**

Everbloom adalah aplikasi web front-end-only yang memungkinkan pengguna merangkai buket bunga digital secara interaktif, mempersonalisasikannya dengan pesan ucapan, lalu membagikannya kepada orang tersayang melalui tautan unik-tanpa memerlukan akun, login, maupun database.

Terinspirasi dari konsep Digibouquet, Everbloom hadir dengan identitas visual baru bertema Elegant & Romantic: palet pastel lembut, tipografi serif, dan micro-interaction yang terasa hangat dan personal. Semua data buket disimpan hanya di sesi browser pengguna (localStorage) sehingga arsitektur tetap ringan, privat, dan mudah di-deploy.

Deployment menggunakan Google Cloud Run dengan image Docker dari Next.js 16 (standalone output), memastikan skalabilitas tanpa mengelola server secara manual.

# **2\. Tujuan & Sasaran Produk**

## **2.1 Pernyataan Masalah**

Mengirim bunga fisik dibatasi jarak dan biaya. Solusi digital yang ada (pesan instan, e-card) terasa generik dan tidak personal. Belum ada platform yang memberi pengalaman merangkai buket secara nyata sekaligus mudah dibagikan-tanpa hambatan registrasi.

## **2.2 Proposisi Nilai Everbloom**

- Zero friction: tidak perlu buat akun, langsung bisa merangkai dan berbagi.
- Estetika premium: desain Elegant & Romantic yang berbeda dari platform serupa.
- Privacy-first: data hanya ada di browser pengirim, tidak tersimpan di server.
- Ringan & cepat: pure front-end, CDN global via Cloud Run, tidak ada API call ke database.

## **2.3 Metrik Keberhasilan (MVP)**

| **Objective**         | **Key Result**                                    | **Target**          |
| --------------------- | ------------------------------------------------- | ------------------- |
| Keterlibatan Pengguna | Buket berhasil diselesaikan & link dibagikan      | 60% completion rate |
| Performa Loading      | Largest Contentful Paint (LCP) halaman utama      | < 2.0 detik         |
| Performa Kanvas       | Frame rate saat drag-drop di desktop              | ≥ 55 fps            |
| Mobile Experience     | Completion rate di perangkat mobile               | ≥ 50%               |
| Kepuasan Penerima     | Skor CSAT dari survei pasca-buka buket (opsional) | ≥ 4.3 / 5.0         |

# **3\. Identitas Visual & Design Language**

## **3.1 Tema: Elegant & Romantic**

Everbloom menggunakan bahasa visual yang berbeda dari Digibouquet. Di mana Digibouquet tampil ilustratif dan playful, Everbloom memilih pendekatan yang lebih halus, dewasa, dan emosional.

## **3.2 Palet Warna**

| **Token**            | **Nilai & Penggunaan**                                           |
| -------------------- | ---------------------------------------------------------------- |
| \--color-primary     | #B07490 - Dusty rose. CTA utama, heading, border aktif           |
| \--color-accent      | #8B6F8E - Mauve purple. Heading sekunder, ikon, badge            |
| \--color-gold        | #C4A35A - Warm gold. Aksen dekoratif, divider, highlight premium |
| \--color-canvas-bg   | #FDF6F0 - Cream linen. Latar kanvas & halaman utama              |
| \--color-surface     | #FFFFFF - Putih bersih. Kartu, modal, sidebar                    |
| \--color-text-dark   | #2D2020 - Near-black warm. Body text utama                       |
| \--color-text-muted  | #9E8A8A - Warm grey. Label, placeholder, metadata                |
| \--color-petal-blush | #F2D7DF - Sangat muda. Background chip bunga terpilih            |

## **3.3 Sistem Tipografi**

| **Elemen**         | **Spesifikasi**                                            |
| ------------------ | ---------------------------------------------------------- |
| Brand / H1         | Cormorant Garamond - 48-64px - Bold Italic - color-primary |
| Heading H2         | Cormorant Garamond - 28-36px - SemiBold - color-accent     |
| Heading H3         | Cormorant Garamond - 20px - Regular Italic - color-primary |
| Body / Label       | Inter - 15-16px - Regular / Medium - color-text-dark       |
| CTA Button         | Inter - 13px - SemiBold - Spaced 0.08em - uppercase        |
| Nama bunga (kartu) | Cormorant Garamond - 13px - Italic - color-text-muted      |
| Pesan ucapan       | Cormorant Garamond - 16px - Italic - color-text-dark       |

## **3.4 Diferensiasi Visual dari Digibouquet**

| **Aspek**      | **Digibouquet vs Everbloom**                                                           |
| -------------- | -------------------------------------------------------------------------------------- |
| Gaya ilustrasi | Sketch hitam + watercolor splash → Ilustrasi bunga lembut full-color, no outline kasar |
| Tipografi      | Bold display script (dekoratif) → Cormorant Garamond (elegan, feminin, klasik)         |
| Warna dominan  | Hitam + warna cerah → Dusty rose, mauve, cream linen                                   |
| Button style   | CTA hitam solid besar → CTA rounded, outline subtle dengan hover fill lembut           |
| Kanvas         | Latar off-white polos → Latar krem bertekstur linen dengan vignette halus              |
| Motion         | Minimal → Petal-drift animation saat loading; smooth spring physics saat drag          |

# **4\. User Journey & Fitur Utama (MVP)**

Seluruh alur berlangsung dalam satu sesi browser tanpa login. State buket disimpan sementara di sessionStorage selama proses berlangsung, dan dihapus otomatis saat tab ditutup.

## **Tahap 0 - Landing Page**

- **Hero section: animasi petal-drift lembut (SVG/Lottie) di latar cream linen.**
- Brand mark: wordmark 'Everbloom' dalam Cormorant Garamond bold italic + ikon bunga kecil.
- Tagline: "Beautiful flowers, delivered digitally."
- Satu CTA utama: tombol \[Build a Bouquet\] - rounded, dusty rose.
- Deskripsi singkat cara kerja dalam 3 ikon langkah (Pick · Arrange · Share).

## **Tahap 1 - The Selection (Pilih Bunga)**

Pengguna memilih 6-10 bunga dari galeri interaktif.

- **Grid responsif bunga (2 kolom mobile / 4-5 kolom desktop).**
- Tiap kartu: ilustrasi bunga (PNG transparan), nama, makna singkat, warna dominan.
- State terpilih: border dusty rose + checkmark ikon; chip counter 'X/10 dipilih' di header.
- **Filter & Sort**
- Filter warna: Merah, Pink, Putih, Kuning, Ungu, Biru, Oranye, Campur.
- Filter mood: Romantis, Persahabatan, Simpati, Perayaan.
- Sort: Nama A-Z, Warna, Populer (urutan statis).
- **Pilihan Wrapping Paper (Kertas Pembungkus)**
- 8 opsi: Kraft, Putih Bersih, Blush Pink, Lavender, Sage Green, Polka Dot Krem, Floral Linen, Transparan Frosted.
- Preview thumbnail 80×80px + nama.
- **Pilihan Ribbon (Pita)**
- 6 opsi: Satin Dusty Rose, Satin Mauve, Organza Krem, Renda Putih, Twine Natural, Velvet Burgundy.

## **Tahap 2 - The Arrangement (Kanvas Drag & Drop)**

Inti pengalaman Everbloom: kanvas 2D interaktif berbasis Konva.js di atas kertas pembungkus virtual.

- **Kanvas**
- Ukuran render: 600×600px (desktop), skala proporsional di mobile.
- Latar: gambar wrapping paper yang dipilih, dengan vignette overlay tipis.
- Pita/ribbon dirender di bagian bawah kanvas sebagai elemen dekoratif tetap.
- **Interaksi Objek Bunga**
- Drag & Drop bebas ke seluruh area kanvas.
- Rotasi via handle bulat di pojok kanan atas objek (klik-tahan-putar).
- Scale via pinch gesture (mobile) atau Shift+drag handle (desktop).
- Klik objek: tampilkan selection ring dusty rose + handle kontrol.
- **Layer Management**
- Tombol 'Ke Depan' (↑) dan 'Ke Belakang' (↓) di toolbar kanvas.
- Klik kanan objek → context menu: Duplikat, Hapus, Ke Depan, Ke Belakang.
- **Undo / Redo - maks. 15 langkah per sesi.**
- **Tombol Reset Kanvas dengan konfirmasi modal.**
- **Preset Template - 5 susunan siap pakai (Spiral, Fan, Half-Moon, Cascade, Compact Round).**

## **Tahap 3 - The Dedication (Kartu Ucapan)**

Panel samping (desktop) atau step terpisah (mobile) untuk personalisasi pesan.

- **Form Kartu Ucapan**
- Nama pengirim (maks. 40 karakter).
- Nama penerima (maks. 40 karakter) - digunakan sebagai bagian URL slug.
- Pesan ucapan (maks. 280 karakter) - ditampilkan dalam Cormorant Garamond italic.
- Karakter counter real-time.
- **Pilihan Gaya Kartu - 4 opsi:**
- Ivory Classic: latar putih gading, border gold tipis.
- Blush Petal: latar pink pucat, ilustrasi petal kecil di sudut.
- Sage Minimal: latar hijau sage sangat muda, tipografi bersih.
- Kraft Vintage: latar kraft coklat, teks seolah ditulis tangan.
- **Preview kartu ucapan real-time di samping form.**

## **Tahap 4 - The Delivery (Bagikan Buket)**

Buket difinalisasi dan siap dibagikan. Tidak ada data yang dikirim ke server-seluruh state buket diencode ke URL atau disimpan lokal.

- **Generate Shareable URL**
- State buket (posisi bunga, wrapping, ribbon, pesan) diencode sebagai JSON → Base64 → URL query param.
- Contoh: everbloom.app/view?b=\[base64-encoded-state\]
- URL dapat dibagikan langsung; penerima tidak perlu akun.
- **Share Sheet (Bottom Sheet Modal)**
- Salin Link ke Clipboard.
- Bagikan via WhatsApp (wa.me intent link).
- Download QR Code (PNG 512×512) untuk dicetak atau dikirim sebagai gambar.
- Download buket sebagai gambar PNG (export kanvas Konva.js).
- **Halaman Penerima (/view)**
- Decode Base64 dari URL param → rebuild state buket di client.
- Animasi pembukaan: kertas pembungkus 'unfold' (Framer Motion spring), bunga muncul satu per satu dengan stagger delay.
- Kartu ucapan slide-in dari bawah setelah animasi buket selesai (~3 detik total).
- Tombol: Simpan sebagai Gambar (PNG) · Buat Buket Saya Sendiri (kembali ke landing).

# **5\. Arsitektur Teknis**

## **5.1 Prinsip Utama**

- Zero backend: tidak ada API server, tidak ada database, tidak ada autentikasi.
- State management: React Context + useReducer untuk state kanvas dalam sesi. sessionStorage sebagai buffer sementara antar step.
- URL sebagai transport: data buket dikodekan ke URL param sehingga halaman penerima dapat me-reconstruct buket tanpa server.

## **5.2 Tech Stack**

| **Layer**      | **Teknologi**                             | **Alasan Pemilihan**                         |
| -------------- | ----------------------------------------- | -------------------------------------------- |
| Framework      | Next.js 16 (App Router)                   | SSG/SSR, Image Optimization, fast DX         |
| Styling        | Tailwind CSS v4                           | Utility-first, konsisten dengan design token |
| Canvas Engine  | Konva.js / react-konva                    | 2D object manipulation tanpa WebGL overhead  |
| Animasi        | Framer Motion v11                         | Spring physics, stagger, layout animation    |
| Ikon & Aset    | SVG inline + PNG .webp transparan         | Scalable, ringan, no external icon library   |
| State (sesi)   | React Context + sessionStorage            | Cukup untuk satu alur tanpa login            |
| URL Encoding   | JSON → Base64 (btoa/atob)                 | Simpan state buket di URL param tanpa server |
| QR Code        | qrcode (npm library, client-side)         | Generate QR di browser, no server call       |
| Containerisasi | Docker (node:alpine + Next.js standalone) | Image kecil ~120MB, siap Cloud Run           |
| Deployment     | Google Cloud Run                          | Autoscale to zero, bayar per request, CDN    |

## **5.3 Struktur Proyek Next.js 16**

Struktur direktori yang direkomendasikan untuk menjaga codebase tetap bersih:

| **Path**                 | **Konten**                                                          |
| ------------------------ | ------------------------------------------------------------------- |
| app/page.tsx             | Landing page - hero, cara kerja, CTA                                |
| app/build/page.tsx       | Stepper multi-step: Selection → Arrangement → Dedication → Delivery |
| app/view/page.tsx        | Halaman penerima: decode URL param, render animasi buket            |
| components/canvas/       | KonvaStage, FlowerNode, ControlHandles, LayerToolbar                |
| components/ui/           | Button, Card, Modal, BottomSheet, Badge, Chip                       |
| components/bouquet/      | FlowerGrid, FlowerCard, WrapperPicker, RibbonPicker, MessageCard    |
| lib/encoder.ts           | encodeBouquet() / decodeBouquet() - JSON ↔ Base64 URL param         |
| lib/canvasExport.ts      | Export kanvas Konva.js ke Blob PNG                                  |
| lib/qrcode.ts            | generateQR(url) → PNG data URL                                      |
| store/bouquetContext.tsx | React Context + useReducer untuk global bouquet state               |
| public/flowers/          | Aset PNG bunga (nama: rose-red.webp, lily-white.webp, dst.)         |
| public/wrappers/         | Aset texture kertas pembungkus                                      |
| public/ribbons/          | Aset SVG/PNG pita                                                   |
| styles/tokens.css        | CSS custom properties: warna, font, spacing, radius                 |

# **6\. Data & State Management**

## **6.1 Prinsip No-Backend**

Everbloom tidak memiliki server API atau database. Semua data bersifat ephemeral (hidup di memori browser) kecuali yang secara eksplisit di-encode ke URL saat sharing.

## **6.2 Skema State Buket (TypeScript)**

Berikut adalah interface TypeScript yang merepresentasikan seluruh data sebuah buket:

| **Field**    | **Tipe & Keterangan**                                                                   |
| ------------ | --------------------------------------------------------------------------------------- |
| flowers      | FlowerItem\[\] - Array bunga: { id, assetPath, x, y, rotation, scaleX, scaleY, zIndex } |
| wrappingId   | string - ID kertas pembungkus terpilih (mis. 'blush-pink')                              |
| ribbonId     | string - ID pita terpilih (mis. 'satin-dusty-rose')                                     |
| senderName   | string - Maks. 40 karakter                                                              |
| receiverName | string - Maks. 40 karakter; digunakan sebagai bagian URL display                        |
| message      | string - Maks. 280 karakter                                                             |
| cardStyle    | string - ID gaya kartu ucapan (mis. 'ivory-classic')                                    |
| createdAt    | number - Unix timestamp saat link di-generate (display only)                            |

## **6.3 Alur Encoding URL**

- Pengguna selesai di tahap Delivery → klik tombol \[Generate Link\].
- State buket di-serialize ke JSON string.
- JSON string di-compress (opsional: fflate/lz-string) lalu di-encode ke Base64.
- URL dibentuk: everbloom.app/view?b=\[base64string\]
- Penerima membuka URL → Next.js decode query param → rebuild state → render animasi.

Catatan ukuran URL: estimasi 10 bunga × ~60 byte/item + metadata = ~800 byte raw JSON → ~1.1KB Base64. Masih dalam batas aman URL (≤2KB).

## **6.4 sessionStorage (In-Progress State)**

Untuk mencegah kehilangan progress saat pengguna tidak sengaja refresh di tengah proses, state buket yang sedang dibuat disimpan sementara di sessionStorage dengan key 'everbloom_draft'. Data ini dihapus otomatis saat tab ditutup dan tidak pernah dikirim ke server.

# **7\. Deployment: Google Cloud Run**

## **7.1 Strategi Containerisasi**

Menggunakan Next.js standalone output untuk menghasilkan image Docker sekecil mungkin:

| **Langkah**           | **Detail**                                                                                               |
| --------------------- | -------------------------------------------------------------------------------------------------------- |
| next.config.js        | output: 'standalone' - Next.js menghasilkan folder .next/standalone yang sudah termasuk semua dependency |
| Dockerfile base image | node:20-alpine - image kecil (~5MB base)                                                                 |
| Multi-stage build     | Stage 1 (builder): install deps + build. Stage 2 (runner): copy standalone saja → image final ~120-150MB |
| Port                  | Container berjalan di port 3000; Cloud Run expose ke HTTPS otomatis                                      |
| Environment variable  | NEXT_PUBLIC_BASE_URL=<https://everbloom.app> - untuk generate URL yang benar                             |

## **7.2 Konfigurasi Cloud Run**

| **Parameter**   | **Nilai yang Direkomendasikan**                                       |
| --------------- | --------------------------------------------------------------------- |
| Region          | asia-southeast1 (Singapura) - terdekat dengan pengguna Indonesia      |
| Min instances   | 0 (scale to zero saat tidak ada traffic)                              |
| Max instances   | 10                                                                    |
| CPU             | 1 vCPU                                                                |
| Memory          | 512MB                                                                 |
| Request timeout | 30 detik                                                              |
| Concurrency     | 80 request/instance                                                   |
| Ingress         | All traffic (HTTPS only via Cloud Run domain)                         |
| Custom domain   | everbloom.app → map ke Cloud Run service via Cloud Run domain mapping |

## **7.3 CI/CD Pipeline**

- Push ke branch main di GitHub.
- Google Cloud Build trigger otomatis: build Docker image → push ke Artifact Registry.
- Cloud Run deploy revision baru secara otomatis (zero-downtime rolling deploy).
- Smoke test otomatis: ping /api/health endpoint.

# **8\. Performa & Aksesibilitas**

## **8.1 Target Core Web Vitals**

| **Metrik**                            | **Target**                               |
| ------------------------------------- | ---------------------------------------- |
| LCP (Largest Contentful Paint)        | < 2.0 detik (koneksi 4G)                 |
| FID / INP (Interaction to Next Paint) | < 100ms                                  |
| CLS (Cumulative Layout Shift)         | < 0.05                                   |
| Bundle JS awal (gzip)                 | < 180KB                                  |
| Aset bunga per item                   | < 60KB (.webp transparan, max 400×400px) |
| Time to Interactive                   | < 3.5 detik                              |

## **8.2 Strategi Optimasi**

- next/image untuk semua aset bunga: lazy load, WebP auto-convert, responsive srcset.
- Dynamic import untuk Konva.js: hanya dimuat saat pengguna masuk ke tahap Arrangement.
- Font subsetting: Cormorant Garamond & Inter di-load hanya karakter Latin yang digunakan (next/font).
- Preload aset bunga yang terpilih di tahap Selection agar kanvas muncul instan.
- Debounce update sessionStorage saat drag objek di kanvas (max 1 write/300ms).

## **8.3 Aksesibilitas (a11y)**

- Semua tombol interaktif memiliki aria-label deskriptif.
- Warna memenuhi rasio kontras WCAG AA (min. 4.5:1 untuk teks body).
- Navigasi keyboard penuh untuk flow Selection dan Dedication.
- Kanvas Konva.js: objek bunga memiliki role='img' dan aria-label nama bunga.
- Animasi: respek prefers-reduced-motion - animasi dinonaktifkan bila pengguna memintanya.

# **9\. Komponen UI yang Perlu Dibangun**

| **Komponen**               | **Deskripsi**                                                         | **Prioritas** |
| -------------------------- | --------------------------------------------------------------------- | ------------- |
| &lt;HeroSection&gt;        | Animasi petal-drift, wordmark, tagline, CTA button                    | P0 - MVP      |
| &lt;StepperNav&gt;         | Navigasi 4 langkah dengan progress bar dusty rose                     | P0 - MVP      |
| &lt;FlowerCard&gt;         | Kartu grid bunga: ilustrasi, nama, makna, badge warna, state terpilih | P0 - MVP      |
| &lt;FlowerGrid&gt;         | Grid responsif dengan filter warna & mood                             | P0 - MVP      |
| &lt;WrapperPicker&gt;      | Grid thumbnail kertas pembungkus dengan preview aktif                 | P0 - MVP      |
| &lt;RibbonPicker&gt;       | Grid thumbnail pita dengan label                                      | P0 - MVP      |
| &lt;KonvaStage&gt;         | Canvas area: wrapping bg, flower nodes, ribbon dekoratif              | P0 - MVP      |
| &lt;FlowerNode&gt;         | Konva Image node dengan drag, rotate, scale, selection ring           | P0 - MVP      |
| &lt;CanvasToolbar&gt;      | Tombol Undo/Redo, Layer up/down, Reset, Template                      | P0 - MVP      |
| &lt;MessageForm&gt;        | Input nama pengirim/penerima, textarea pesan, karakter counter        | P0 - MVP      |
| &lt;CardStylePicker&gt;    | 4 thumbnail gaya kartu dengan preview                                 | P0 - MVP      |
| &lt;MessageCardPreview&gt; | Preview kartu ucapan real-time                                        | P0 - MVP      |
| &lt;ShareSheet&gt;         | Bottom sheet: salin link, WhatsApp, QR Code, download PNG             | P0 - MVP      |
| &lt;OpeningAnimation&gt;   | Framer Motion: unfold wrapping → bunga muncul → kartu slide-in        | P0 - MVP      |
| &lt;TemplatePicker&gt;     | Modal 5 preset susunan buket (Spiral, Fan, dll.)                      | P1            |
| &lt;MoodFilter&gt;         | Filter bunga berdasarkan mood/kesempatan                              | P1            |

# **10\. Roadmap Produk**

## **Phase 1 - MVP (Bulan 1-2)**

- Setup: Next.js 16 + Tailwind + Konva.js + Framer Motion + Docker + Cloud Run CI/CD.
- Aset bunga awal: 20 bunga, 8 wrapping, 6 ribbon, 4 gaya kartu (semua .webp < 60KB).
- Implementasi 4 tahap flow: Selection → Arrangement → Dedication → Delivery.
- URL encoding/decoding (Base64) dan halaman penerima /view dengan animasi.
- Share sheet: salin link, WhatsApp intent, QR Code, download PNG.
- Responsif mobile (portrait) + touch gesture di kanvas.

## **Phase 2 - Polish & Growth (Bulan 3-4)**

- Ekspansi aset: +30 bunga, tema musiman (Lebaran, Natal, Valentine, Wisuda).
- 5 preset template susunan buket.
- Filter mood & occasion di halaman Selection.
- Animasi pembukaan variasi berdasarkan gaya kartu yang dipilih.
- PWA manifest + service worker: installable di home screen mobile.

## **Phase 3 - Monetisasi (Bulan 5-8)**

- Fitur Premium (opsional via Stripe): bunga eksklusif, animasi khusus, URL custom slug.
- Kolaborasi real-time: dua pengguna merangkai bersama via WebRTC/Partykit.
- API sederhana untuk integrasi korporat (buket ucapan hari jadi kerja, onboarding).

# **11\. Manajemen Risiko**

| **Risiko**                               | **Dampak / Kemungkinan** | **Mitigasi**                                                   |
| ---------------------------------------- | ------------------------ | -------------------------------------------------------------- |
| URL terlalu panjang saat banyak bunga    | Sedang / Sedang          | Kompresi lz-string sebelum Base64; batasi maks. 10 bunga       |
| Performa kanvas lambat di low-end mobile | Tinggi / Sedang          | Batasi maks. 10 objek; gunakan Konva cache(); lazy-load        |
| Link rusak jika URL di-truncate oleh app | Tinggi / Rendah          | Tambahkan QR Code & opsi download PNG sebagai fallback         |
| Animasi patah di browser lama            | Sedang / Rendah          | Framer Motion graceful degradation; prefers-reduced-motion     |
| Aset bunga tidak konsisten secara visual | Sedang / Tinggi          | Style guide ilustrasi: satu ilustrator, satu gaya, satu palet  |
| Cloud Run cold start (scale-to-zero)     | Rendah / Tinggi          | Min instances 1 saat traffic tinggi; atau Cloudflare CDN cache |

# **12\. Open Questions**

- Apakah URL Base64 cukup atau perlu shortener eksternal (bit.ly/TinyURL) agar link terlihat rapi?
- Siapa yang membuat aset ilustrasi bunga? In-house desainer, freelancer, atau lisensi dari library komersial?
- Apakah perlu analytics event (misal: Plausible/umami) yang privacy-friendly untuk mengukur funnel completion?
- Apakah halaman /view perlu Open Graph image (preview thumbnail saat link dibagikan di WhatsApp/Twitter)?
- Target browser minimum: Chrome 100+, Safari 16+? Perlu diputuskan sebelum memilih API browser yang digunakan.

# **13\. Glosarium**

| **Istilah**    | **Definisi**                                                                 |
| -------------- | ---------------------------------------------------------------------------- |
| MVP            | Minimum Viable Product - versi produk paling awal dengan fitur inti          |
| SSG/SSR        | Static Site Generation / Server-Side Rendering - strategi rendering Next.js  |
| Konva.js       | Library JavaScript untuk manipulasi objek 2D di HTML5 Canvas                 |
| Framer Motion  | Library animasi React dengan spring physics dan stagger animation            |
| sessionStorage | Web Storage API yang menyimpan data hanya selama tab browser terbuka         |
| Base64         | Skema encoding biner-ke-teks; digunakan untuk menyimpan state buket di URL   |
| Cloud Run      | Layanan serverless container Google Cloud yang autoscale berdasarkan traffic |
| Standalone     | Output mode Next.js yang menghasilkan bundle minimal siap container          |
| LCP / CLS      | Metrik Core Web Vitals Google: kecepatan muat & stabilitas layout            |
| lz-string      | Library kompresi string JavaScript untuk memperkecil payload URL             |
| QR Code        | Quick Response Code - kode matriks 2D yang encode URL untuk dipindai         |
| Petal-drift    | Animasi dekoratif: kelopak bunga melayang perlahan di latar halaman          |

_- Akhir Dokumen PRD Everbloom v1.0 -_
