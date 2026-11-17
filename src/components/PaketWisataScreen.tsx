import { useMemo, useState } from 'react';
import { ArrowLeft, Search, Users, ArrowRight, RotateCcw } from 'lucide-react';
import {
  PackageCategory,
  ScreenId,
  TOUR_PACKAGES,
  TourPackage,
  calculatePackageEstimate,
  formatRupiah,
} from '../data/lerengAsriData';
import { ResilientImage } from './ResilientImage';
import { WhatsAppGlyph } from './WhatsAppGlyph';

type SortOption = 'unggulan' | 'harga-terendah' | 'durasi-singkat';

interface PaketWisataScreenProps {
  selectedCategory: PackageCategory;
  onSelectCategory: (category: PackageCategory) => void;
  guestCount: number;
  onChangeGuestCount: (count: number) => void;
  onNavigateScreen: (screen: ScreenId) => void;
  onSelectPackageDetail: (pkg: TourPackage) => void;
  onBookPackage: (pkg: TourPackage) => void;
}

const CATEGORY_TABS: { id: PackageCategory; label: string }[] = [
  { id: PackageCategory.SEMUA, label: 'Semua Paket' },
  { id: PackageCategory.EDUKASI_TANI, label: 'Edukasi & Tani' },
  { id: PackageCategory.JELAJAH_ALAM, label: 'Jelajah Alam' },
  { id: PackageCategory.HOMESTAY, label: 'Homestay & Menginap' },
];

export function PaketWisataScreen({
  selectedCategory,
  onSelectCategory,
  guestCount,
  onChangeGuestCount,
  onNavigateScreen,
  onSelectPackageDetail,
  onBookPackage,
}: PaketWisataScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('unggulan');
  const [isWeekend, setIsWeekend] = useState(false);

  const filteredPackages = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const list = TOUR_PACKAGES.filter((pkg) => {
      const matchesCat =
        selectedCategory === PackageCategory.SEMUA || pkg.category === selectedCategory;
      const matchesQuery =
        !q ||
        pkg.title.toLowerCase().includes(q) ||
        pkg.description.toLowerCase().includes(q) ||
        pkg.categoryLabel.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });

    if (sortBy === 'harga-terendah') {
      return [...list].sort((a, b) => a.pricePerPerson - b.pricePerPerson);
    }
    if (sortBy === 'durasi-singkat') {
      return [...list].sort((a, b) => a.durationHours - b.durationHours);
    }
    return list;
  }, [searchQuery, selectedCategory, sortBy]);

  const handleResetFilters = () => {
    onSelectCategory(PackageCategory.SEMUA);
    setSearchQuery('');
    setSortBy('unggulan');
  };

  return (
    <main className="max-w-[1240px] mx-auto px-5 md:px-10 pt-8 pb-16 space-y-10">
      {/* 1. Screen Header & Back Breadcrumb */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-[#414844]">
          <button
            type="button"
            onClick={() => onNavigateScreen(ScreenId.BERANDA)}
            className="inline-flex items-center gap-1.5 font-medium text-[#1b4332] hover:text-[#2c694e] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Beranda</span>
          </button>
          <span aria-hidden="true">/</span>
          <span className="font-semibold text-[#1c1c18]">Paket Wisata</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <h1 className="text-[clamp(2rem,3.5vw,3rem)] leading-[1.15] font-bold tracking-[-0.02em] text-[#012d1d] text-balance">
              Paket Wisata & Pengalaman Desa
            </h1>
            <p className="text-base text-[#414844] leading-relaxed">
              Seluruh tarif sudah termasuk pemandu lokal resmi Pokdarwis, perlengkapan kegiatan,
              dan kontribusi konservasi lereng gunung.
            </p>
          </div>

          {/* Interactive Group Size & Day Estimator */}
          <div className="bg-[#faf9f6] border border-[#1b4332]/12 rounded-xl p-4 flex flex-wrap items-center gap-4 shrink-0">
            <div className="space-y-1">
              <span className="block text-xs font-medium text-[#414844]">
                Simulasi Jumlah Peserta
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onChangeGuestCount(Math.max(1, guestCount - 1))}
                  aria-label="Kurangi jumlah peserta simulasi"
                  className="w-9 h-9 rounded-lg border border-[#1b4332]/20 bg-[#fcf9f2] text-[#012d1d] font-bold hover:bg-[#f1eee7] transition-colors cursor-pointer"
                >
                  −
                </button>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-bold text-[#012d1d] tabular-nums min-w-[84px] justify-center">
                  <Users className="w-4 h-4 text-[#2c694e]" />
                  {guestCount} org
                </span>
                <button
                  type="button"
                  onClick={() => onChangeGuestCount(Math.min(40, guestCount + 1))}
                  aria-label="Tambah jumlah peserta simulasi"
                  className="w-9 h-9 rounded-lg border border-[#1b4332]/20 bg-[#fcf9f2] text-[#012d1d] font-bold hover:bg-[#f1eee7] transition-colors cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            <div className="h-10 w-px bg-[#1b4332]/10 hidden sm:block" />

            <div className="space-y-1">
              <span className="block text-xs font-medium text-[#414844]">Jadwal Kunjungan</span>
              <div className="inline-flex p-1 rounded-lg bg-[#f1eee7]">
                <button
                  type="button"
                  onClick={() => setIsWeekend(false)}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    !isWeekend
                      ? 'bg-[#1b4332] text-[#fcf9f2]'
                      : 'text-[#414844] hover:text-[#012d1d]'
                  }`}
                >
                  Hari Biasa
                </button>
                <button
                  type="button"
                  onClick={() => setIsWeekend(true)}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    isWeekend
                      ? 'bg-[#1b4332] text-[#fcf9f2]'
                      : 'text-[#414844] hover:text-[#012d1d]'
                  }`}
                >
                  Akhir Pekan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Interactive Filter Tabs, Search & Sort Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[#1b4332]/10">
        <div
          role="tablist"
          aria-label="Kategori Paket Wisata"
          className="flex flex-wrap items-center gap-2"
        >
          {CATEGORY_TABS.map((tab) => {
            const isActive = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                type="button"
                onClick={() => onSelectCategory(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-[#1b4332] text-[#fcf9f2]'
                    : 'bg-[#faf9f6] text-[#414844] border border-[#1b4332]/15 hover:bg-[#f1eee7] hover:text-[#012d1d]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 sm:flex-initial sm:w-56">
            <Search className="w-4 h-4 text-[#717973] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="search"
              aria-label="Cari paket wisata"
              placeholder="Cari kopi, curug, homestay..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#faf9f6] border border-[#1b4332]/15 text-sm text-[#1c1c18] placeholder:text-[#717973] focus:outline-none focus:border-[#2c694e] focus:ring-3 focus:ring-[#2c694e]/15"
            />
          </div>

          <select
            aria-label="Urutkan paket wisata"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="px-3.5 py-2 rounded-lg bg-[#faf9f6] border border-[#1b4332]/15 text-sm font-medium text-[#1c1c18] focus:outline-none focus:border-[#2c694e] focus:ring-3 focus:ring-[#2c694e]/15"
          >
            <option value="unggulan">Urutan Unggulan</option>
            <option value="harga-terendah">Tarif Terendah</option>
            <option value="durasi-singkat">Durasi Paling Singkat</option>
          </select>
        </div>
      </div>

      {/* 3. Package Grid */}
      {filteredPackages.length === 0 ? (
        <div className="p-12 rounded-2xl bg-[#faf9f6] border border-[#1b4332]/10 text-center space-y-4">
          <p className="text-lg font-bold text-[#012d1d]">
            Tidak ada paket yang cocok dengan kata kunci “{searchQuery}”
          </p>
          <p className="text-sm text-[#414844]">
            Coba tampilkan semua kategori atau hapus kata kunci pencarian.
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#1b4332] hover:bg-[#2c694e] text-[#fcf9f2] text-sm font-semibold transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Tampilkan Semua Paket</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPackages.map((pkg) => {
            const effectiveGuests = Math.max(pkg.minGuests, guestCount);
            const estimate = calculatePackageEstimate(pkg, effectiveGuests, isWeekend);

            return (
              <article
                key={pkg.id}
                className="group bg-[#faf9f6] rounded-2xl border border-[#1b4332]/10 overflow-hidden flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[4/3] w-full overflow-hidden bg-[#ebe8e1]">
                    <ResilientImage
                      src={pkg.image}
                      alt={pkg.imageAlt}
                      fallbackLabel={pkg.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>

                  <div className="p-6 space-y-3">
                    {/* Clean unboxed metadata kicker */}
                    <p className="text-xs font-medium text-[#414844] tabular-nums">
                      {pkg.editorialNumber} · {pkg.categoryLabel} · {pkg.durationLabel} · Min.{' '}
                      {pkg.minGuests} org
                    </p>

                    <h2 className="text-lg md:text-xl font-bold text-[#012d1d] tracking-tight leading-snug">
                      {pkg.title}
                    </h2>

                    <p className="text-sm text-[#414844] leading-relaxed">{pkg.shortSubtitle}</p>

                    <ul className="pt-2 space-y-1.5 text-xs text-[#414844]">
                      {pkg.includes.slice(0, 3).map((inc) => (
                        <li key={inc} className="flex items-start gap-2">
                          <span className="text-[#2c694e] font-bold">·</span>
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Price & Action Footer */}
                <div className="px-6 pb-6 pt-4 border-t border-[#1b4332]/10 space-y-4">
                  <div className="flex items-baseline justify-between gap-2">
                    <div>
                      <p className="text-xl font-bold text-[#012d1d] tabular-nums">
                        {formatRupiah(estimate.finalUnitPrice)}
                        <span className="text-xs font-normal text-[#414844]"> / org</span>
                      </p>
                      {estimate.discountAppliedPercent > 0 ? (
                        <p className="text-xs font-semibold text-[#642b00] tabular-nums">
                          Diskon rombongan {estimate.discountAppliedPercent}% aktif
                        </p>
                      ) : (
                        <p className="text-xs text-[#414844] tabular-nums">
                          Hemat {pkg.groupDiscountPercent}% mulai {pkg.groupDiscountThreshold} org
                        </p>
                      )}
                    </div>

                    <div className="text-right">
                      <p className="text-[11px] text-[#414844] tabular-nums">
                        Estimasi ({effectiveGuests} org)
                      </p>
                      <p className="text-sm font-bold text-[#1b4332] tabular-nums">
                        {formatRupiah(estimate.totalPrice)}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => onSelectPackageDetail(pkg)}
                      className="px-3 py-2.5 rounded-lg border border-[#1b4332]/20 hover:bg-[#f1eee7] text-[#1b4332] text-xs sm:text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap"
                    >
                      Lihat Rincian
                    </button>
                    <button
                      type="button"
                      onClick={() => onBookPackage(pkg)}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-[#25D366] hover:bg-[#1ebe5d] text-[#012d1d] text-xs sm:text-sm font-bold transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <WhatsAppGlyph className="w-3.5 h-3.5 shrink-0" />
                      <span>Pesan Paket</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* 4. Tabular Package Comparison Matrix */}
      <section className="pt-6 space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-[#012d1d]">
            Perbandingan Durasi & Tarif Rombongan
          </h2>
          <p className="text-sm text-[#414844]">
            Ringkasan cepat untuk membantu koordinator keluarga, komunitas, atau sekolah memilih
            jadwal yang sesuai.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-[#1b4332]/10 bg-[#faf9f6]">
          <table className="w-full text-left border-collapse min-w-[680px]">
            <thead>
              <tr className="border-b border-[#1b4332]/10 bg-[#f6f3ec] text-xs font-semibold text-[#414844]">
                <th className="py-3.5 px-5">Nama Paket</th>
                <th className="py-3.5 px-4">Durasi</th>
                <th className="py-3.5 px-4">Medan</th>
                <th className="py-3.5 px-4">Min. Peserta</th>
                <th className="py-3.5 px-4">Diskon Grup</th>
                <th className="py-3.5 px-4 text-right">Tarif Normal</th>
                <th className="py-3.5 px-5 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1b4332]/10 text-sm">
              {TOUR_PACKAGES.map((pkg) => (
                <tr key={pkg.id} className="hover:bg-[#f6f3ec]/60 transition-colors">
                  <td className="py-3.5 px-5 font-semibold text-[#012d1d]">{pkg.title}</td>
                  <td className="py-3.5 px-4 text-[#414844] tabular-nums whitespace-nowrap">
                    {pkg.durationLabel}
                  </td>
                  <td className="py-3.5 px-4 text-[#414844] whitespace-nowrap">{pkg.difficulty}</td>
                  <td className="py-3.5 px-4 text-[#414844] tabular-nums whitespace-nowrap">
                    {pkg.minGuests} orang
                  </td>
                  <td className="py-3.5 px-4 text-[#2c694e] font-medium tabular-nums whitespace-nowrap">
                    {pkg.groupDiscountPercent}% (≥{pkg.groupDiscountThreshold} org)
                  </td>
                  <td className="py-3.5 px-4 text-right font-bold text-[#012d1d] tabular-nums whitespace-nowrap">
                    {formatRupiah(pkg.pricePerPerson)}
                  </td>
                  <td className="py-3.5 px-5 text-right whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => onSelectPackageDetail(pkg)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#1b4332] hover:text-[#2c694e] cursor-pointer"
                    >
                      <span>Rincian</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
