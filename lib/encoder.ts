import LZString from "lz-string";
import { BouquetState } from "@/store/bouquetContext";

/**
 * Meng-encode state buket menjadi string Base64 yang aman untuk URL.
 */
export function encodeBouquetState(state: BouquetState): string {
  try {
    // Gunakan format array (tuple) yang sangat padat agar hasil kompresi jauh lebih pendek
    const compactFlowers = state.selectedFlowers.map(f => [
      f.flowerId,
      Math.round(f.x || 150),
      Math.round(f.y || 150),
      f.scaleX ? Number(f.scaleX.toFixed(3)) : null,
      Math.round(f.rotation || 0)
    ]);

    const dataToEncode = [
      compactFlowers,
      state.wrapperId,
      state.ribbonId,
      state.senderName,
      state.receiverName,
      state.message,
      state.cardStyle
    ];
    
    const jsonStr = JSON.stringify(dataToEncode);
    // Compress dan encode ke URI-safe Base64
    return LZString.compressToEncodedURIComponent(jsonStr);
  } catch (error) {
    console.error("Failed to encode bouquet state", error);
    return "";
  }
}

/**
 * Men-decode string Base64 kembali menjadi state buket.
 */
export function decodeBouquetState(encodedStr: string): Partial<BouquetState> | null {
  try {
    const jsonStr = LZString.decompressFromEncodedURIComponent(encodedStr);
    if (!jsonStr) return null;
    
    const decoded = JSON.parse(jsonStr);
    
    // Cek apakah menggunakan format array padat yang baru
    if (Array.isArray(decoded)) {
      return {
        selectedFlowers: decoded[0].map((f: any, i: number) => ({
          id: `flower-${i}`,
          flowerId: f[0],
          x: f[1],
          y: f[2],
          scaleX: f[3] === null ? undefined : f[3],
          scaleY: f[3] === null ? undefined : f[3],
          rotation: f[4]
        })),
        wrapperId: decoded[1],
        ribbonId: decoded[2],
        senderName: decoded[3],
        receiverName: decoded[4],
        message: decoded[5],
        cardStyle: decoded[6],
      };
    }
    
    // Fallback jika ada URL lama dengan format object utuh
    return decoded;
  } catch (error) {
    console.error("Failed to decode bouquet state", error);
    return null;
  }
}
