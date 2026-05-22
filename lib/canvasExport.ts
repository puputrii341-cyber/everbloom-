import Konva from "konva";

/**
 * Meng-export Konva Stage menjadi file gambar (PNG) dan memicu proses download.
 */
export function exportCanvasToImage(stageRef: React.RefObject<Konva.Stage | null>, filename: string = "everbloom-bouquet.png") {
  if (!stageRef.current) return;

  const dataURL = stageRef.current.toDataURL({
    pixelRatio: 2, // Kualitas HD
    mimeType: "image/png",
  });

  const link = document.createElement("a");
  link.download = filename;
  link.href = dataURL;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
