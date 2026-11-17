import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { ScreenId } from '../data/lerengAsriData';
import { WhatsAppGlyph } from './WhatsAppGlyph';

interface TopNavProps {
  activeScreen: ScreenId;
  onNavigateScreen: (screen: ScreenId, sectionId?: string) => void;
  onOpenQuickBooking: () => void;
}

export function TopNav({
  activeScreen,
  onNavigateScreen,
  onOpenQuickBooking,
}: TopNavProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (screen: ScreenId, sectionId?: string) => {
    setMobileMenuOpen(false);
    onNavigateScreen(screen, sectionId);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#fcf9f2]/95 backdrop-blur-md border-b border-[#1b4332]/10">
      <div className="max-w-[1240px] mx-auto px-5 md:px-10 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-element Brand Wordmark */}
        <button
          type="button"
          onClick={() => handleNavClick(ScreenId.BERANDA)}
          className="text-lg md:text-xl font-bold tracking-tight text-[#012d1d] hover:text-[#2c694e] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2c694e] rounded-md px-1 -ml-1 cursor-pointer"
        >
          Desa Lereng Asri
        </button>

        {/* Zone 2: 4 Concise Single-Line Text Nav Links */}
        <nav
          aria-label="Navigasi Utama"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#414844]"
        >
          <button
            type="button"
            onClick={() => handleNavClick(ScreenId.BERANDA)}
            className={`py-1.5 border-b-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2c694e] ${
              activeScreen === ScreenId.BERANDA
                ? 'border-[#1b4332] text-[#012d1d] font-semibold'
                : 'border-transparent hover:text-[#012d1d] hover:border-[#1b4332]/30'
            }`}
          >
            Beranda
          </button>
          <button
            type="button"
            onClick={() => handleNavClick(ScreenId.PAKET_WISATA)}
            className={`py-1.5 border-b-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2c694e] ${
              activeScreen === ScreenId.PAKET_WISATA
                ? 'border-[#1b4332] text-[#012d1d] font-semibold'
                : 'border-transparent hover:text-[#012d1d] hover:border-[#1b4332]/30'
            }`}
          >
            Paket Wisata
          </button>
          <button
            type="button"
            onClick={() => handleNavClick(ScreenId.BERANDA, 'homestay-section')}
            className="py-1.5 border-b-2 border-transparent hover:text-[#012d1d] hover:border-[#1b4332]/30 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2c694e]"
          >
            Homestay
          </button>
          <button
            type="button"
            onClick={() => handleNavClick(ScreenId.BERANDA, 'lokasi-section')}
            className="py-1.5 border-b-2 border-transparent hover:text-[#012d1d] hover:border-[#1b4332]/30 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2c694e]"
          >
            Lokasi
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action + Mobile Menu Toggle */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onOpenQuickBooking}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#25D366] hover:bg-[#1ebe5d] text-[#012d1d] text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1b4332] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fcf9f2]"
          >
            <WhatsAppGlyph className="w-4 h-4 shrink-0" />
            <span>Pesan via WhatsApp</span>
          </button>

          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-[#1b4332]/15 bg-[#faf9f6] text-[#012d1d] hover:bg-[#f1eee7] transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#1b4332]/10 bg-[#faf9f6] px-5 py-4 space-y-2">
          <button
            type="button"
            onClick={() => handleNavClick(ScreenId.BERANDA)}
            className={`w-full text-left px-3 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              activeScreen === ScreenId.BERANDA
                ? 'bg-[#1b4332] text-[#fcf9f2] font-semibold'
                : 'text-[#1c1c18] hover:bg-[#f1eee7]'
            }`}
          >
            Beranda — Desa Wisata Lereng Asri
          </button>
          <button
            type="button"
            onClick={() => handleNavClick(ScreenId.PAKET_WISATA)}
            className={`w-full text-left px-3 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              activeScreen === ScreenId.PAKET_WISATA
                ? 'bg-[#1b4332] text-[#fcf9f2] font-semibold'
                : 'text-[#1c1c18] hover:bg-[#f1eee7]'
            }`}
          >
            Paket Wisata
          </button>
          <button
            type="button"
            onClick={() => handleNavClick(ScreenId.BERANDA, 'homestay-section')}
            className="w-full text-left px-3 py-3 rounded-lg text-sm font-medium text-[#1c1c18] hover:bg-[#f1eee7] transition-colors cursor-pointer"
          >
            Homestay Warga Bersertifikat
          </button>
          <button
            type="button"
            onClick={() => handleNavClick(ScreenId.BERANDA, 'lokasi-section')}
            className="w-full text-left px-3 py-3 rounded-lg text-sm font-medium text-[#1c1c18] hover:bg-[#f1eee7] transition-colors cursor-pointer"
          >
            Lokasi & Peta Desa
          </button>
          <div className="pt-2 border-t border-[#1b4332]/10">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuickBooking();
              }}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#25D366] hover:bg-[#1ebe5d] text-[#012d1d] text-sm font-semibold transition-colors cursor-pointer"
            >
              <WhatsAppGlyph className="w-4 h-4 shrink-0" />
              <span>Pesan via WhatsApp</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
