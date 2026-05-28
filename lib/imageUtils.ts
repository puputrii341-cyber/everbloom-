import { useState, useEffect } from "react";

export interface CropRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

const cropCache = new Map<string, CropRect>();

export function getCropRect(imageSrc: string): Promise<CropRect | null> {
  if (cropCache.has(imageSrc)) {
    return Promise.resolve(cropCache.get(imageSrc)!);
  }

  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      // Scale down to a max of 300px for scanning to keep it fast but accurate
      const maxDim = 300;
      let scale = 1;
      if (img.width > maxDim || img.height > maxDim) {
        scale = maxDim / Math.max(img.width, img.height);
      }
      
      canvas.width = Math.max(1, img.width * scale);
      canvas.height = Math.max(1, img.height * scale);
      
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return resolve(null);
      
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      
      let top = null, bottom = null, left = null, right = null;
      const w = canvas.width;
      
      // Optimize loop by iterating directly over the pixel array
      for (let i = 3, len = data.length; i < len; i += 4) {
        if (data[i] > 20) {
          const pixelIndex = (i - 3) / 4;
          const y = Math.floor(pixelIndex / w);
          const x = pixelIndex % w;
          
          if (top === null) top = y;
          bottom = y;
          if (left === null || x < left) left = x;
          if (right === null || x > right) right = x;
        }
      }
      
      if (top === null || left === null || bottom === null || right === null) {
        return resolve(null); // Completely transparent image?
      }

      // Map back to original image coordinates
      const padding = 2; // small padding
      const originalLeft = Math.max(0, (left - padding) / scale);
      const originalTop = Math.max(0, (top - padding) / scale);
      const originalRight = Math.min(img.width, (right + padding) / scale);
      const originalBottom = Math.min(img.height, (bottom + padding) / scale);

      const rect = {
        x: Math.round(originalLeft),
        y: Math.round(originalTop),
        width: Math.round(originalRight - originalLeft + 1),
        height: Math.round(originalBottom - originalTop + 1)
      };

      cropCache.set(imageSrc, rect);
      resolve(rect);
    };
    img.onerror = () => resolve(null);
    img.src = imageSrc;
  });
}

export function useCropRect(imageSrc: string) {
  const [crop, setCrop] = useState<CropRect | null>(cropCache.get(imageSrc) || null);

  useEffect(() => {
    if (!cropCache.has(imageSrc)) {
      getCropRect(imageSrc).then((rect) => {
        if (rect) setCrop(rect);
      });
    } else {
      setCrop(cropCache.get(imageSrc)!);
    }
  }, [imageSrc]);

  return crop;
}
