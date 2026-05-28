import { useState, useEffect } from "react";
import { useBouquet } from "@/store/bouquetContext";
import { encodeBouquetState } from "@/lib/encoder";
import { generateQRCodeUrl } from "@/lib/qrcode";
import { Check, Copy, Share2, Download } from "lucide-react";

export default function StepDelivery() {
  const { state } = useBouquet();
  const [shareUrl, setShareUrl] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(true);

  useEffect(() => {
    async function generateLink() {
      if (typeof window === "undefined") return;
      const baseUrl = window.location.origin;
      try {
        const res = await fetch("/api/bouquet", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(state),
        });
        const data = await res.json();
        
        if (data.id) {
          const url = `${baseUrl}/view?id=${data.id}`;
          setShareUrl(url);
          generateQRCodeUrl(url).then(setQrCodeUrl);
        } else {
          throw new Error("No ID returned");
        }
      } catch (err) {
        console.error("API failed, falling back to long URL");
        const encodedState = encodeBouquetState(state);
        const url = `${baseUrl}/view?b=${encodedState}`;
        setShareUrl(url);
        generateQRCodeUrl(url).then(setQrCodeUrl);
      } finally {
        setIsGenerating(false);
      }
    }
    
    generateLink();
  }, [state]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const handleWhatsAppShare = () => {
    const text = `Halo! Aku merangkai buket bunga digital spesial untukmu: ${shareUrl}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="max-w-2xl mx-auto py-12 text-center space-y-10 pb-20">
      <div>
        <h2 className="text-3xl font-[family-name:var(--font-heading)] font-bold text-[var(--color-primary)]">
          Buketmu Siap Dibagikan!
        </h2>
        <p className="text-[var(--color-text-muted)] mt-2">
          Kirim tautan ini atau tunjukkan QR Code kepada {state.receiverName || "orang tersayang"}.
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-8 min-h-[300px]">
        {isGenerating ? (
          <div className="h-full flex flex-col items-center justify-center py-20 text-[var(--color-text-muted)] animate-pulse">
            <p>Membuat tautan buket unikmu...</p>
          </div>
        ) : (
          <>
            {/* URL Link Box */}
            <div className="bg-gray-50 p-4 rounded-xl flex items-center gap-4">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="w-full bg-transparent border-none text-sm text-[var(--color-text-dark)] focus:outline-none"
              />
              <button
                onClick={handleCopyLink}
                className="shrink-0 flex items-center justify-center p-2 rounded-lg bg-[var(--color-petal-blush)] text-[var(--color-primary)] hover:bg-opacity-80 transition-colors"
                title="Salin Tautan"
              >
                {copied ? <Check size={20} /> : <Copy size={20} />}
              </button>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={handleWhatsAppShare}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#25D366] text-white font-medium hover:bg-opacity-90 transition-colors"
              >
                <Share2 size={18} />
                Kirim via WhatsApp
              </button>
              
              <a
                href={shareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-[var(--color-primary)] text-[var(--color-primary)] font-medium hover:bg-[var(--color-petal-blush)] transition-colors"
              >
                Buka Buket
              </a>
            </div>

            {/* QR Code */}
            {qrCodeUrl && (
              <div className="pt-8 border-t border-gray-100 flex flex-col items-center">
                <p className="text-sm font-medium text-[var(--color-text-muted)] mb-4 uppercase tracking-wider">Atau Pindai QR Code</p>
                <img src={qrCodeUrl} alt="QR Code" className="w-48 h-48 rounded-xl shadow-sm border border-gray-100 p-2" />
                <a
                  href={qrCodeUrl}
                  download="everbloom-qr.png"
                  className="mt-4 flex items-center gap-2 text-sm text-[var(--color-primary)] hover:underline"
                >
                  <Download size={16} /> Simpan QR Code
                </a>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
