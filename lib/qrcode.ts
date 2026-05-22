import QRCode from "qrcode";

/**
 * Menghasilkan Data URL (Base64 PNG) dari sebuah teks/URL menggunakan library qrcode.
 * Fungsi ini berjalan secara sinkron/asinkron di sisi klien.
 */
export async function generateQRCodeUrl(text: string): Promise<string> {
  try {
    const url = await QRCode.toDataURL(text, {
      width: 512,
      margin: 2,
      color: {
        dark: "#2D2020", // --color-text-dark
        light: "#FFFFFF",
      },
    });
    return url;
  } catch (err) {
    console.error("Gagal menghasilkan QR Code", err);
    return "";
  }
}
