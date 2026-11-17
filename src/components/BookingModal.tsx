import { useEffect, useMemo, useState } from 'react';
import { X, CheckCircle2, Copy, Check, Calendar, Users } from 'lucide-react';
import {
  TOUR_PACKAGES,
  TourPackage,
  calculatePackageEstimate,
  formatRupiah,
} from '../data/lerengAsriData';
import { WhatsAppGlyph } from './WhatsAppGlyph';

interface BookingModalProps {
  isOpen: boolean;
  initialPackage: TourPackage | null;
  initialGuests: number;
  onClose: () => void;
}

function getDefaultVisitDate(): string {
  const date = new Date();
  date.setDate(date.getDate() + 3);
  return date.toISOString().split('T')[0];
}

function isWeekendDate(dateString: string): boolean {
  if (!dateString) return false;
  const parsed = new Date(`${dateString}T00:00:00`);
  const day = parsed.getDay();
  return day === 0 || day === 6;
}

export function BookingModal({
  isOpen,
  initialPackage,
  initialGuests,
  onClose,
}: BookingModalProps) {
  const [selectedPackageId, setSelectedPackageId] = useState<string>(
    initialPackage?.id ?? TOUR_PACKAGES[0].id,
  );
  const [guests, setGuests] = useState<number>(Math.max(2, initialGuests));
  const [visitDate, setVisitDate] = useState<string>(getDefaultVisitDate);
  const [fullName, setFullName] = useState<string>('');
  const [whatsappNumber, setWhatsappNumber] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [formError, setFormError] = useState<string>('');
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [copiedMessage, setCopiedMessage] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      if (initialPackage) {
        setSelectedPackageId(initialPackage.id);
        setGuests(Math.max(initialPackage.minGuests, initialGuests));
      } else {
        setGuests(Math.max(2, initialGuests));
      }
      setFormError('');
      setSubmittedRef(null);
      setCopiedMessage(false);
    }
  }, [isOpen, initialPackage, initialGuests]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const activePackage = useMemo(
    () => TOUR_PACKAGES.find((p) => p.id === selectedPackageId) ?? TOUR_PACKAGES[0],
    [selectedPackageId],
  );

  const weekendSelected = isWeekendDate(visitDate);

  const estimate = useMemo(
    () => calculatePackageEstimate(activePackage, guests, weekendSelected),
    [activePackage, guests, weekendSelected],
  );

  const whatsappMessageText = useMemo(() => {
    const formattedDate = visitDate
      ? new Date(`${visitDate}T00:00:00`).toLocaleDateString('id-ID', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })
      : '-';
    return [
      'Halo Pokdarwis Desa Wisata Lereng Asri,',
      `Saya *${fullName || 'Calon Pengunjung'}* ingin memesan:`,
      `- Paket: ${activePackage.title}`,
      `- Tanggal Kunjungan: ${formattedDate}`,
      `- Jumlah Peserta: ${guests} orang`,
      `- Estimasi Total: ${formatRupiah(estimate.totalPrice)}`,
      notes.trim() ? `- Catatan: ${notes.trim()}` : null,
      'Mohon konfirmasi ketersediaan jadwal dan pemandu. Terima kasih.',
    ]
      .filter(Boolean)
      .join('\n');
  }, [activePackage.title, estimate.totalPrice, fullName, guests, notes, visitDate]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedPhone = whatsappNumber.replace(/[\s-]/g, '');
    if (fullName.trim().length < 2) {
      setFormError('Mohon isi nama lengkap pemesan (minimal 2 karakter).');
      return;
    }
    if (!/^(\+62|62|0)8[0-9]{7,11}$/.test(cleanedPhone)) {
      setFormError('Mohon masukkan nomor WhatsApp Indonesia yang valid (contoh: 081234567890).');
      return;
    }
    if (!visitDate) {
      setFormError('Mohon pilih tanggal rencana kunjungan.');
      return;
    }
    if (guests < activePackage.minGuests) {
      setFormError(`Minimal peserta untuk paket ini adalah ${activePackage.minGuests} orang.`);
      return;
    }

    setFormError('');
    const code = `LA-${visitDate.replace(/-/g, '').slice(2)}-${String(guests).padStart(2, '0')}`;
    setSubmittedRef(code);
  };

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(whatsappMessageText);
      setCopiedMessage(true);
      setTimeout(() => setCopiedMessage(false), 2500);
    } catch {
      setCopiedMessage(false);
    }
  };

  const whatsappUrl = `https://wa.me/6281228409104?text=${encodeURIComponent(whatsappMessageText)}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-[#012d1d]/55 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-[#faf9f6] rounded-2xl border border-[#1b4332]/12 shadow-[0_10px_30px_-4px_rgba(27,67,50,0.2)] p-6 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 pb-5 border-b border-[#1b4332]/10">
          <div>
            <p className="text-xs font-medium text-[#2c694e] mb-1">
              Reservasi Langsung Pokdarwis
            </p>
            <h2
              id="booking-modal-title"
              className="text-xl md:text-2xl font-bold tracking-tight text-[#012d1d]"
            >
              Formulir Pemesanan Kunjungan
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup formulir pemesanan"
            className="w-10 h-10 rounded-full border border-[#1b4332]/15 bg-[#fcf9f2] text-[#012d1d] flex items-center justify-center hover:bg-[#f1eee7] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submittedRef ? (
          <div className="pt-6 space-y-6">
            <div className="p-5 rounded-xl bg-[#c1ecd4]/40 border border-[#2c694e]/25 flex items-start gap-3.5">
              <CheckCircle2 className="w-6 h-6 text-[#1b4332] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-bold text-[#012d1d]">
                  Ringkasan Reservasi Siap Dikirim (Kode: {submittedRef})
                </p>
                <p className="text-sm text-[#414844] leading-relaxed">
                  Lanjutkan mengirim pesan berikut ke admin Pokdarwis Desa Wisata Lereng Asri
                  untuk mengunci jadwal pemandu dan homestay tanpa biaya perantara.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#f1eee7] border border-[#1b4332]/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#414844]">
                  Pratinjau Pesan WhatsApp
                </span>
                <button
                  type="button"
                  onClick={handleCopyText}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1b4332] hover:text-[#2c694e] cursor-pointer"
                >
                  {copiedMessage ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Tersalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin Teks</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="whitespace-pre-wrap font-sans text-sm text-[#1c1c18] leading-relaxed">
                {whatsappMessageText}
              </pre>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={() => setSubmittedRef(null)}
                className="px-4 py-2.5 rounded-lg border border-[#1b4332]/25 text-sm font-semibold text-[#1b4332] hover:bg-[#f1eee7] transition-colors cursor-pointer"
              >
                Ubah Data Pesanan
              </button>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#25D366] hover:bg-[#1ebe5d] text-[#012d1d] text-sm font-bold transition-colors cursor-pointer"
              >
                <WhatsAppGlyph className="w-4 h-4 shrink-0" />
                <span>Kirim ke WhatsApp Pokdarwis</span>
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="pt-6 space-y-5" noValidate>
            <div className="space-y-2">
              <label htmlFor="booking-package" className="block text-sm font-semibold text-[#1c1c18]">
                Pilih Paket Wisata
              </label>
              <select
                id="booking-package"
                value={selectedPackageId}
                onChange={(e) => {
                  const nextPkg = TOUR_PACKAGES.find((p) => p.id === e.target.value);
                  setSelectedPackageId(e.target.value);
                  if (nextPkg && guests < nextPkg.minGuests) {
                    setGuests(nextPkg.minGuests);
                  }
                }}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#fcf9f2] border border-[#1b4332]/20 text-sm text-[#1c1c18] focus:outline-none focus:border-[#2c694e] focus:ring-3 focus:ring-[#2c694e]/15"
              >
                {TOUR_PACKAGES.map((pkg) => (
                  <option key={pkg.id} value={pkg.id}>
                    {pkg.title} ({formatRupiah(pkg.pricePerPerson)} / orang)
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="booking-date" className="block text-sm font-semibold text-[#1c1c18]">
                  Tanggal Kunjungan
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-[#414844] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="booking-date"
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={visitDate}
                    onChange={(e) => setVisitDate(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-lg bg-[#fcf9f2] border border-[#1b4332]/20 text-sm text-[#1c1c18] tabular-nums focus:outline-none focus:border-[#2c694e] focus:ring-3 focus:ring-[#2c694e]/15"
                  />
                </div>
                {weekendSelected && activePackage.weekendSurchargePercent > 0 && (
                  <p className="text-xs text-[#642b00]">
                    Jadwal akhir pekan (+{activePackage.weekendSurchargePercent}% penyesuaian homestay)
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="booking-guests" className="block text-sm font-semibold text-[#1c1c18]">
                  Jumlah Peserta (Min. {activePackage.minGuests} orang)
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setGuests((g) => Math.max(activePackage.minGuests, g - 1))}
                    aria-label="Kurangi jumlah peserta"
                    className="w-11 h-11 rounded-lg border border-[#1b4332]/20 bg-[#fcf9f2] text-[#012d1d] font-semibold hover:bg-[#f1eee7] transition-colors cursor-pointer"
                  >
                    −
                  </button>
                  <div className="relative flex-1">
                    <Users className="w-4 h-4 text-[#414844] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      id="booking-guests"
                      type="number"
                      min={activePackage.minGuests}
                      max={activePackage.maxGuests}
                      value={guests}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        if (!Number.isNaN(val)) {
                          setGuests(Math.min(activePackage.maxGuests, Math.max(1, val)));
                        }
                      }}
                      className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-[#fcf9f2] border border-[#1b4332]/20 text-sm font-semibold text-center text-[#1c1c18] tabular-nums focus:outline-none focus:border-[#2c694e] focus:ring-3 focus:ring-[#2c694e]/15"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setGuests((g) => Math.min(activePackage.maxGuests, g + 1))}
                    aria-label="Tambah jumlah peserta"
                    className="w-11 h-11 rounded-lg border border-[#1b4332]/20 bg-[#fcf9f2] text-[#012d1d] font-semibold hover:bg-[#f1eee7] transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="booking-name" className="block text-sm font-semibold text-[#1c1c18]">
                  Nama Lengkap Pemesan
                </label>
                <input
                  id="booking-name"
                  type="text"
                  placeholder="Contoh: Adi Nugroho"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#fcf9f2] border border-[#1b4332]/20 text-sm text-[#1c1c18] placeholder:text-[#717973] focus:outline-none focus:border-[#2c694e] focus:ring-3 focus:ring-[#2c694e]/15"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="booking-wa" className="block text-sm font-semibold text-[#1c1c18]">
                  Nomor WhatsApp Aktif
                </label>
                <input
                  id="booking-wa"
                  type="tel"
                  placeholder="081234567890"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#fcf9f2] border border-[#1b4332]/20 text-sm text-[#1c1c18] tabular-nums placeholder:text-[#717973] focus:outline-none focus:border-[#2c694e] focus:ring-3 focus:ring-[#2c694e]/15"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="booking-notes" className="block text-sm font-semibold text-[#1c1c18]">
                Catatan Khusus (Opsional)
              </label>
              <textarea
                id="booking-notes"
                rows={2}
                placeholder="Contoh: Membawa 2 anak balita, butuh menu vegetarian, atau estimasi tiba pukul 09.00 WIB."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#fcf9f2] border border-[#1b4332]/20 text-sm text-[#1c1c18] placeholder:text-[#717973] focus:outline-none focus:border-[#2c694e] focus:ring-3 focus:ring-[#2c694e]/15"
              />
            </div>

            {/* Price Breakdown Box */}
            <div className="p-4 rounded-xl bg-[#f6f3ec] border border-[#1b4332]/10 space-y-2">
              <div className="flex items-center justify-between text-sm text-[#414844]">
                <span>Tarif satuan ({guests} peserta)</span>
                <span className="tabular-nums font-medium text-[#1c1c18]">
                  {formatRupiah(estimate.finalUnitPrice)} × {guests}
                </span>
              </div>
              {estimate.discountAppliedPercent > 0 && (
                <div className="flex items-center justify-between text-xs font-semibold text-[#2c694e]">
                  <span>Potongan Rombongan (≥{activePackage.groupDiscountThreshold} orang)</span>
                  <span className="tabular-nums">−{estimate.discountAppliedPercent}%</span>
                </div>
              )}
              <div className="pt-2 border-t border-[#1b4332]/10 flex items-center justify-between">
                <span className="text-sm font-bold text-[#012d1d]">Estimasi Total Biaya</span>
                <span className="text-xl font-bold text-[#012d1d] tabular-nums">
                  {formatRupiah(estimate.totalPrice)}
                </span>
              </div>
            </div>

            {formError && (
              <p role="alert" className="text-sm font-medium text-[#ba1a1a] bg-[#ffdad6]/60 px-3.5 py-2.5 rounded-lg">
                {formError}
              </p>
            )}

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-1">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-lg border border-[#1b4332]/20 text-sm font-semibold text-[#1b4332] hover:bg-[#f1eee7] transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#25D366] hover:bg-[#1ebe5d] text-[#012d1d] text-sm font-bold transition-colors cursor-pointer"
              >
                <WhatsAppGlyph className="w-4 h-4 shrink-0" />
                <span>Buat Ringkasan Pesanan</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
