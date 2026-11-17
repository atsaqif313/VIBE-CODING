import { MapPin, Clock, Phone } from 'lucide-react';
import { ScreenId } from '../data/lerengAsriData';

interface FooterProps {
  onNavigateScreen: (screen: ScreenId, sectionId?: string) => void;
}

export function Footer({ onNavigateScreen }: FooterProps) {
  return (
    <footer className="bg-[#1b4332] text-[#fcf9f2] mt-16 border-t border-[#012d1d]">
      <div className="max-w-[1240px] mx-auto px-5 md:px-10 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-[#fcf9f2]/15">
          <div className="md:col-span-5 space-y-4">
            <p className="text-xl font-bold tracking-tight text-[#fcf9f2]">
              Desa Wisata Lereng Asri
            </p>
            <p className="text-sm leading-relaxed text-[#fcf9f2]/80 max-w-md">
              Dikelola langsung oleh Kelompok Sadar Wisata (Pokdarwis) Lereng Asri.
              Menjaga kelestarian lereng pegunungan sekaligus membuka pintu keramahan desa
              melalui pertanian organik, kopi rakyat, dan homestay warga.
            </p>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h3 className="text-sm font-semibold tracking-wide text-[#a5d0b9]">
              Halaman & Layanan
            </h3>
            <ul className="space-y-2.5 text-sm text-[#fcf9f2]/85">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateScreen(ScreenId.BERANDA)}
                  className="hover:text-[#fcf9f2] hover:underline underline-offset-4 transition-colors cursor-pointer"
                >
                  Beranda — Desa Wisata Lereng Asri
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateScreen(ScreenId.PAKET_WISATA)}
                  className="hover:text-[#fcf9f2] hover:underline underline-offset-4 transition-colors cursor-pointer"
                >
                  Katalog Paket Wisata
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateScreen(ScreenId.BERANDA, 'homestay-section')}
                  className="hover:text-[#fcf9f2] hover:underline underline-offset-4 transition-colors cursor-pointer"
                >
                  Homestay Warga Bersertifikat
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateScreen(ScreenId.BERANDA, 'lokasi-section')}
                  className="hover:text-[#fcf9f2] hover:underline underline-offset-4 transition-colors cursor-pointer"
                >
                  Peta Jalur & Lokasi Pendopo
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-3">
            <h3 className="text-sm font-semibold tracking-wide text-[#a5d0b9]">
              Sekretariat Pokdarwis
            </h3>
            <div className="space-y-2.5 text-sm text-[#fcf9f2]/85">
              <p className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-[#a5d0b9]" />
                <span>
                  Dusun Krajan RT 02/RW 04, Desa Lereng Asri, Kecamatan Ngablak,
                  Jawa Tengah 56194
                </span>
              </p>
              <p className="flex items-center gap-2.5 tabular-nums">
                <Clock className="w-4 h-4 shrink-0 text-[#a5d0b9]" />
                <span>Layanan Kunjungan Harian: 07.00 – 17.00 WIB</span>
              </p>
              <p className="flex items-center gap-2.5 tabular-nums">
                <Phone className="w-4 h-4 shrink-0 text-[#a5d0b9]" />
                <span>WhatsApp Resmi Pokdarwis: +62 812-2840-9104</span>
              </p>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#fcf9f2]/70">
          <p>© 2026 Pokdarwis Desa Wisata Lereng Asri. Hak cipta dilindungi.</p>
          <p>Wisata Berkelanjutan · Pertanian Organik · Keramahan Desa</p>
        </div>
      </div>
    </footer>
  );
}
