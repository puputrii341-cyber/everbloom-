export interface FlowerData {
  id: string;
  name: string;
  meaning: string;
  color: string;
  mood: string;
  bgColor: string; // for mock placeholder
  image: string;
}

export const MOODS = ["Semua", "Romantis", "Persahabatan", "Simpati", "Perayaan"];
export const COLORS = ["Semua", "Merah", "Pink", "Putih", "Kuning", "Ungu", "Biru", "Oranye"];

export const FLOWERS: FlowerData[] = [
  { id: "mawar-merah", name: "Mawar Merah", meaning: "Cinta dan gairah", color: "Merah", mood: "Romantis", bgColor: "#ffebee", image: "/images/Mawar Merah.webp" },
  { id: "daisy-putih", name: "Daisy Putih", meaning: "Kepolosan & persahabatan", color: "Putih", mood: "Persahabatan", bgColor: "#f5f5f5", image: "/images/Daisy-Putih.webp" },
  { id: "matahari", name: "Bunga Matahari", meaning: "Keceriaan & Adorasi", color: "Kuning", mood: "Perayaan", bgColor: "#fff3e0", image: "/images/Matahari.webp" },
  { id: "lili-merah-muda", name: "Lili Merah Muda", meaning: "Kemakmuran & kelembutan", color: "Pink", mood: "Romantis", bgColor: "#fce4ec", image: "/images/Lilli Merah Muda.webp" },
  { id: "iris-ungu", name: "Iris Ungu", meaning: "Kebijaksanaan & Keanggunan", color: "Ungu", mood: "Simpati", bgColor: "#e1bee7", image: "/images/Iris Ungu.webp" },
  { id: "tulip", name: "Tulip", meaning: "Deklarasi cinta", color: "Campur", mood: "Romantis", bgColor: "#f8bbd0", image: "/images/Tulip.webp" },
  { id: "peony", name: "Peony Krem-Merah Muda", meaning: "Kekayaan & Kehormatan", color: "Pink", mood: "Perayaan", bgColor: "#fce4ec", image: "/images/Peony Krem-Merah Mudah.webp" },
  { id: "ranunculus", name: "Ranunculus", meaning: "Pesona berseri-seri", color: "Campur", mood: "Persahabatan", bgColor: "#ffe0b2", image: "/images/Ranuculus.webp" },
  { id: "anemon", name: "Anemon Biru-Hijau", meaning: "Antisipasi & perlindungan", color: "Biru", mood: "Simpati", bgColor: "#e3f2fd", image: "/images/Anemon Biru-Hijau.webp" },
  { id: "dahlia", name: "Dahlia Pom-pom Karang", meaning: "Keanggunan & martabat", color: "Oranye", mood: "Perayaan", bgColor: "#fff3e0", image: "/images/Dahlia Pom-pom Karang.webp" },
  { id: "zinnia", name: "Zinnia Magenta", meaning: "Pikiran tentang kawan yang absen", color: "Ungu", mood: "Persahabatan", bgColor: "#f3e5f5", image: "/images/Zinnia Magenta.webp" },
];

export const WRAPPERS = [
  { id: "kraft", name: "Kraft", color: "#d7ccc8" },
  { id: "white", name: "Putih Bersih", color: "#ffffff" },
  { id: "blush", name: "Blush Pink", color: "#fce4ec" },
  { id: "lavender", name: "Lavender", color: "#f3e5f5" },
  { id: "sage", name: "Sage Green", color: "#dcedc8" },
  { id: "polkadot", name: "Polka Dot Krem", color: "#fff3e0" }, // Mock pattern can be done via CSS later
  { id: "floral", name: "Floral Linen", color: "#fbe9e7" },
  { id: "frosted", name: "Transparan Frosted", color: "rgba(255,255,255,0.6)" },
];

export const RIBBONS = [
  { id: "satin-dusty-rose", name: "Satin Dusty Rose", color: "#B07490" },
  { id: "satin-mauve", name: "Satin Mauve", color: "#8B6F8E" },
  { id: "organza-krem", name: "Organza Krem", color: "#fff8e1" },
  { id: "renda-putih", name: "Renda Putih", color: "#fafafa" },
  { id: "twine-natural", name: "Twine Natural", color: "#8d6e63" },
  { id: "velvet-burgundy", name: "Velvet Burgundy", color: "#880e4f" },
];
