import { useEffect } from 'react';
import { X, Clock, MapPin, Check, Backpack, ArrowRight } from 'lucide-react';
import { TourPackage, formatRupiah } from '../data/lerengAsriData';
import { ResilientImage } from './ResilientImage';

interface PackageDetailModalProps {
  pkg: TourPackage | null;
  guests: number;
  onClose: () => void;
  onBookPackage: (pkg: TourPackage) => void;
}

export function PackageDetailModal({
  pkg,
  guests,
  onClose,
  onBookPackage,
}: PackageDetailModalProps) {
  useEffect(() => {
    if (!pkg) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pkg, onClose]);

  if (!pkg) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-[#012d1d]/55 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pkg-detail-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#faf9f6] rounded-2xl border border-[#1b4332]/12 shadow-[0_10px_30px_-4px_rgba(27,67,50,0.2)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Media Header */}
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-2xl bg-[#f1eee7]">
          <ResilientImage
            src={pkg.image}
            alt={pkg.imageAlt}
            fallbackLabel={pkg.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#012d1d]/80 via-[#012d1d]/25 to-transparent" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup rincian paket"
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#fcf9f2]/95 text-[#012d1d] flex items-center justify-center hover:bg-[#ffffff] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2c694e]"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-5 left-6 right-6 text-[#fcf9f2]">
            <p className="text-xs font-medium text-[#c1ecd4] mb-1.5">
              {pkg.categoryLabel} · {pkg.durationLabel} · {pkg.elevationRange}
            </p>
            <h2
              id="pkg-detail-title"
              className="text-xl md:text-2xl font-bold tracking-tight text-balance"
            >
              {pkg.title}
            </h2>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1b4332]/10">
            <div className="space-y-1">
              <p className="text-xs font-medium text-[#414844]">
                Titik Kumpul: <span className="text-[#1c1c18] font-semibold">{pkg.meetingPoint}</span>
              </p>
              <p className="text-xs text-[#414844] tabular-nums">
                Tingkat Aktivitas: {pkg.difficulty} · Minimal {pkg.minGuests} orang (Maks. {pkg.maxGuests} orang)
              </p>
            </div>
            <div className="sm:text-right">
              <p className="text-xs text-[#414844]">Tarif per peserta</p>
              <p className="text-2xl font-bold text-[#012d1d] tabular-nums">
                {formatRupiah(pkg.pricePerPerson)}
              </p>
            </div>
          </div>

          <p className="text-base leading-relaxed text-[#414844]">{pkg.description}</p>

          {/* Itinerary Rundown */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-[#012d1d] flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#2c694e]" />
              <span>Susunan Kegiatan</span>
            </h3>
            <div className="divide-y divide-[#1b4332]/10 border border-[#1b4332]/10 rounded-xl bg-[#fcf9f2]">
              {pkg.itinerary.map((step) => (
                <div
                  key={step.time}
                  className="p-4 flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6"
                >
                  <span className="text-xs font-semibold text-[#642b00] tabular-nums shrink-0 sm:w-32 pt-0.5">
                    {step.time}
                  </span>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-[#1c1c18]">{step.title}</p>
                    <p className="text-sm text-[#414844] leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Includes & Bring List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-[#f6f3ec] space-y-3">
              <h3 className="text-sm font-semibold text-[#012d1d] flex items-center gap-2">
                <Check className="w-4 h-4 text-[#2c694e]" />
                <span>Sudah Termasuk</span>
              </h3>
              <ul className="space-y-2 text-sm text-[#414844]">
                {pkg.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="text-[#2c694e] font-bold mt-0.5">·</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-xl bg-[#f6f3ec] space-y-3">
              <h3 className="text-sm font-semibold text-[#012d1d] flex items-center gap-2">
                <Backpack className="w-4 h-4 text-[#642b00]" />
                <span>Disarankan Dibawa</span>
              </h3>
              <ul className="space-y-2 text-sm text-[#414844]">
                {pkg.bringList.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="text-[#642b00] font-bold mt-0.5">·</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sticky Action Footer inside Modal */}
          <div className="pt-4 border-t border-[#1b4332]/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-[#414844]">
              <MapPin className="w-4 h-4 text-[#2c694e] shrink-0" />
              <span className="tabular-nums">
                Diskon {pkg.groupDiscountPercent}% otomatis untuk rombongan ≥ {pkg.groupDiscountThreshold} orang
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-lg border border-[#1b4332]/25 text-sm font-semibold text-[#1b4332] hover:bg-[#f1eee7] transition-colors cursor-pointer whitespace-nowrap"
              >
                Tutup
              </button>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onBookPackage(pkg);
                }}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#1b4332] hover:bg-[#2c694e] text-[#fcf9f2] text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>Pesan Paket ({guests} Orang)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
