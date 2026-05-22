import LZString from "lz-string";
import { BouquetState } from "@/store/bouquetContext";

/**
 * Meng-encode state buket menjadi string Base64 yang aman untuk URL.
 */
export function encodeBouquetState(state: BouquetState): string {
  try {
    // Hanya ambil data yang diperlukan
    const dataToEncode = {
      selectedFlowers: state.selectedFlowers,
      wrapperId: state.wrapperId,
      ribbonId: state.ribbonId,
      senderName: state.senderName,
      receiverName: state.receiverName,
      message: state.message,
      cardStyle: state.cardStyle,
    };
    
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
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Failed to decode bouquet state", error);
    return null;
  }
}
