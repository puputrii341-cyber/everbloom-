import { useBouquet } from "@/store/bouquetContext";

const CARD_STYLES = [
  { id: "ivory-classic", name: "Ivory Classic", desc: "Latar putih gading, border gold tipis" },
  { id: "blush-petal", name: "Blush Petal", desc: "Latar pink pucat" },
  { id: "sage-minimal", name: "Sage Minimal", desc: "Latar hijau sage pucat" },
  { id: "kraft-vintage", name: "Kraft Vintage", desc: "Latar kraft coklat" },
];

export default function StepDedication() {
  const { state, dispatch } = useBouquet();

  return (
    <div className="flex flex-col md:flex-row gap-12 pb-20">
      {/* Form */}
      <div className="w-full md:w-1/2 space-y-8">
        <div>
          <h2 className="text-2xl font-[family-name:var(--font-heading)] font-semibold text-[var(--color-accent)]">
            Kartu Ucapan
          </h2>
          <p className="text-[var(--color-text-muted)] text-sm mt-1">
            Tulis pesan personal untuk orang tersayang.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-dark)] mb-1">Dari</label>
            <input
              type="text"
              maxLength={40}
              placeholder="Nama Pengirim"
              value={state.senderName}
              onChange={(e) => dispatch({ type: "SET_DEDICATION", payload: { senderName: e.target.value } })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-dark)] mb-1">Untuk</label>
            <input
              type="text"
              maxLength={40}
              placeholder="Nama Penerima"
              value={state.receiverName}
              onChange={(e) => dispatch({ type: "SET_DEDICATION", payload: { receiverName: e.target.value } })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--color-text-dark)] mb-1">
              Pesan <span className="text-gray-400 font-normal text-xs ml-2">({state.message.length}/280)</span>
            </label>
            <textarea
              rows={4}
              maxLength={280}
              placeholder="Tulis pesan manis di sini..."
              value={state.message}
              onChange={(e) => dispatch({ type: "SET_DEDICATION", payload: { message: e.target.value } })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent resize-none"
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-[family-name:var(--font-heading)] font-semibold text-[var(--color-text-dark)] mb-4">
            Gaya Kartu
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {CARD_STYLES.map((style) => (
              <div
                key={style.id}
                onClick={() => dispatch({ type: "SET_DEDICATION", payload: { cardStyle: style.id } })}
                className={`
                  p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
                  ${state.cardStyle === style.id ? "border-[var(--color-primary)] bg-[var(--color-petal-blush)]" : "border-gray-200 bg-white hover:border-gray-300"}
                `}
              >
                <div className="font-medium text-sm text-[var(--color-text-dark)]">{style.name}</div>
                <div className="text-xs text-[var(--color-text-muted)] mt-1">{style.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="w-full md:w-1/2 flex items-start justify-center pt-8">
        <div className="sticky top-32 w-full max-w-md">
          <div className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4 text-center">
            Preview
          </div>
          <div
            className={`
              w-full aspect-[4/3] rounded-sm p-8 shadow-xl flex flex-col justify-between
              ${state.cardStyle === "ivory-classic" ? "bg-[#FFFAF0] border border-[#C4A35A]" : ""}
              ${state.cardStyle === "blush-petal" ? "bg-[#F2D7DF]" : ""}
              ${state.cardStyle === "sage-minimal" ? "bg-[#E6EFE9]" : ""}
              ${state.cardStyle === "kraft-vintage" ? "bg-[#D4C3B3]" : ""}
              ${!state.cardStyle ? "bg-white border border-gray-200" : ""}
            `}
          >
            <div className="font-[family-name:var(--font-heading)] italic text-xl text-[var(--color-text-dark)]">
              Dear {state.receiverName || "Penerima"},
            </div>
            <div className="font-[family-name:var(--font-heading)] italic text-lg text-center text-[var(--color-text-dark)] my-4 break-words">
              {state.message || "Pesan ucapanmu akan tampil di sini..."}
            </div>
            <div className="font-[family-name:var(--font-heading)] italic text-lg text-right text-[var(--color-text-dark)]">
              With love,<br />{state.senderName || "Pengirim"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
