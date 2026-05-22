import { useRef, useEffect } from "react";
import { Image as KonvaImage, Transformer, Group } from "react-konva";
import useImage from "use-image";
import { FlowerItem } from "@/store/bouquetContext";

interface FlowerNodeProps {
  item: FlowerItem;
  imageSrc: string;
  isSelected: boolean;
  onSelect: () => void;
  onChange: (newAttrs: any) => void;
}

export default function FlowerNode({ item, imageSrc, isSelected, onSelect, onChange }: FlowerNodeProps) {
  // @ts-ignore - useImage types might be slightly off
  const [image] = useImage(imageSrc, "anonymous");
  const shapeRef = useRef<any>(null);
  const trRef = useRef<any>(null);

  useEffect(() => {
    if (isSelected && trRef.current && shapeRef.current) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  if (!image) return null;

  // Tentukan ukuran default berdasarkan gambar, skala ke maks 150px agar muat di kanvas
  const defaultScale = 150 / Math.max(image.width, image.height, 1);

  return (
    <Group>
      <KonvaImage
        ref={shapeRef}
        image={image}
        x={item.x || 150}
        y={item.y || 150}
        scaleX={item.scaleX || defaultScale}
        scaleY={item.scaleY || defaultScale}
        rotation={item.rotation || 0}
        draggable
        onClick={onSelect}
        onTap={onSelect}
        onDragEnd={(e) => {
          onChange({
            ...item,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          onChange({
            ...item,
            x: node.x(),
            y: node.y(),
            scaleX: node.scaleX(),
            scaleY: node.scaleY(),
            rotation: node.rotation(),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // Batasi ukuran minimal
            if (newBox.width < 50 || newBox.height < 50) {
              return oldBox;
            }
            return newBox;
          }}
          enabledAnchors={["top-left", "top-right", "bottom-left", "bottom-right"]}
        />
      )}
    </Group>
  );
}
