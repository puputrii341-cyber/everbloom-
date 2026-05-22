import { FlowerData } from "@/lib/mockData";
import { Plus, Minus } from "lucide-react";

interface FlowerCardProps {
  flower: FlowerData;
  count: number;
  onAdd: () => void;
  onRemove: () => void;
  disabled: boolean;
}

export default function FlowerCard({ flower, count, onAdd, onRemove, disabled }: FlowerCardProps) {
  const isSelected = count > 0;

  return (
    <div
      className={`
        relative group flex flex-col rounded-xl overflow-hidden border-2
        transition-all duration-[var(--transition-base)]
        ${isSelected ? "border-[var(--color-primary)] bg-[var(--color-canvas-bg)]" : "border-[#E8CDD5] bg-white"}
        ${!isSelected && disabled ? "opacity-50" : "hover:scale-[1.03]"}
      `}
    >
      {/* Image Area */}
      <div
        className="w-full aspect-square flex items-center justify-center p-4 transition-colors relative cursor-pointer"
        style={{ backgroundColor: isSelected ? "transparent" : flower.bgColor }}
        onClick={() => {
          if (!disabled) onAdd();
        }}
      >
        <img 
          src={flower.image} 
          alt={flower.name} 
          className="w-full h-full object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-110" 
        />
        {/* Selection Overlay Indicator */}
        {isSelected && (
          <div className="absolute top-2 right-2 bg-[var(--color-primary)] text-white rounded-full min-w-6 h-6 px-2 flex items-center justify-center shadow-sm text-xs font-bold">
            {count}
          </div>
        )}
      </div>

      {/* Details & Controls */}
      <div className="p-3 text-center border-t border-gray-100 flex-1 flex flex-col justify-between">
        <div>
          <h4 className="font-[family-name:var(--font-heading)] italic text-[13px] text-[var(--color-text-dark)] leading-tight">
            {flower.name}
          </h4>
          <p className="font-[family-name:var(--font-body)] text-[11px] text-[var(--color-text-muted)] truncate mt-1 mb-3">
            {flower.meaning}
          </p>
        </div>

        {/* Counter Controls */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            disabled={count === 0}
            className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Kurangi"
          >
            <Minus size={14} />
          </button>
          
          <span className="text-sm font-medium w-4">{count}</span>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAdd();
            }}
            disabled={disabled}
            className="w-6 h-6 flex items-center justify-center rounded-full bg-[var(--color-primary)] text-white hover:bg-opacity-90 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Tambah"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
