import { BouquetProvider } from "@/store/bouquetContext";

export default function BuildLayout({ children }: { children: React.ReactNode }) {
  return <BouquetProvider>{children}</BouquetProvider>;
}
