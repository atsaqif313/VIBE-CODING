import { useState } from 'react';
import {
  ArrowRight,
  MapPin,
  Clock,
  Footprints,
  CheckCircle2,
  Compass,
} from 'lucide-react';
import {
  HERO_IMAGE,
  HOMESTAY_SPOTLIGHTS,
  PackageCategory,
  ScreenId,
  TOUR_PACKAGES,
  TourPackage,
  VILLAGE_TRAIL_NODES,
  VISITOR_TESTIMONIALS,
  formatRupiah,
} from '../data/lerengAsriData';
import { ResilientImage } from './ResilientImage';
import { WhatsAppGlyph } from './WhatsAppGlyph';

interface BerandaScreenProps {
  onNavigateToPackages: (category?: PackageCategory) => void;
  onSelectPackageDetail: (pkg: TourPackage) => void;
  onBookPackage: (pkg: TourPackage) => void;
}

export function BerandaScreen({
  onNavigateToPackages,
  onSelectPackageDetail,
  onBookPackage,
}: BerandaScreenProps) {
  const [activeNodeId, setActiveNodeId] = useState<string>(VILLAGE_TRAIL_NODES[0].id);

  // Consultation form state
  const [visitorName, setVisitorName] = useState('');
  const [visitorWa, setVisitorWa] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [guestCount, setGuestCount] = useState('4');
  const [interest, setInterest] = useState('Edukasi Kopi & Kebun Organik');
  const [consultError, setConsultError] = useState('');
  const [consultSubmitted, setConsultSubmitted] = useState(false);

  const activeNode =
    VILLAGE_TRAIL_NODES.find((node) => node.id === activeNodeId) ?? VILLAGE_TRAIL_NODES[0];
  const relatedNodePackage =
    TOUR_PACKAGES.find((p) => p.id === activeNode.relatedPackageId) ?? TOUR_PACKAGES[0];

  const featuredMarquee = TOUR_PACKAGES[0]; // Edukasi Kopi
  const featuredSecondary = [TOUR_PACKAGES[1], TOUR_PACKAGES[2], TOUR_PACKAGES[3]];

  const handleConsultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedPhone = visitorWa.replace(/[\s-]/g, '');
    if (visitorName.trim().length < 2) {
      setConsultError('Mohon masukkan nama lengkap Anda.');
      return;
    }
    if (!/^(\+62|62|0)8[0-9]{7,11}$/.test(cleanedPhone)) {
      setConsultError('Mohon masukkan nomor WhatsApp aktif yang valid (contoh: 081234567890).');
      return;
    }
    setConsultError('');
    setConsultSubmitted(true);
  };

  const scrollToLokasi = () => {
    const el = document.getElementById('lokasi-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const consultWaUrl = `https://wa.me/6281228409104?text=${encodeURIComponent(
    `Halo Pokdarwis Desa Wisata Lereng Asri, saya ${visitorName || 'calon pengunjung'} (${guestCount || 2} orang) ingin berkonsultasi rencana kunjungan${visitDate ? ` pada ${visitDate}` : ''} untuk minat ${interest}.`,
  )}`;

  return (
    <main>
      {/* 1. Hero Split Section */}
      <section className="max-w-[1240px] mx-auto px-5 md:px-10 pt-8 pb-10 md:pt-12 md:pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-between py-2 space-y-6">
            <div className="space-y-5">
              <p className="text-sm font-medium text-[#2c694e] tracking-tight">
                Desa Wisata Agro & Konservasi · Kecamatan Ngablak · 1.240 mdpl
              </p>

              <h1 className="text-[clamp(2.25rem,4vw,3.45rem)] leading-[1.12] font-bold tracking-[-0.02em] text-[#012d1d] text-balance">
                Kembali ke Ritme Alam di Lereng Asri
              </h1>

              <p className="text-base md:text-lg leading-[1.6] text-[#414844] max-w-xl">
                Nikmati pengalaman agro-wisata autentik di kaki pegunungan: memetik ceri kopi
                arabika, memanen sayur organik bersama petani, hingga bermalam di homestay kayu
                warga yang sejuk dan bersertifikat.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => onNavigateToPackages(PackageCategory.SEMUA)}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-lg bg-[#1b4332] hover:bg-[#2c694e] text-[#fcf9f2] text-sm md:text-base font-semibold transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2c694e] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fcf9f2]"
              >
                <span>Jelajahi Paket Wisata</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>

              <button
                type="button"
                onClick={scrollToLokasi}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-lg border border-[#1b4332]/25 hover:bg-[#f1eee7] text-[#1b4332] text-sm md:text-base font-semibold transition-colors cursor-pointer whitespace-nowrap"
              >
                <Compass className="w-4 h-4 shrink-0" />
                <span>Lihat Peta Desa</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative h-full min-h-[280px] sm:min-h-[360px] lg:min-h-[430px] rounded-2xl overflow-hidden bg-[#ebe8e1] border border-[#1b4332]/10">
              <ResilientImage
                src={HERO_IMAGE}
                alt="Pemandangan matahari terbit di Pendopo Desa Wisata Lereng Asri dengan hamparan kebun teh dan terasering hijau"
                fallbackLabel="Panorama Desa Wisata Lereng Asri"
                className="w-full h-full lg:h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#012d1d]/75 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-end justify-between gap-2 text-[#fcf9f2]">
                <div>
                  <p className="text-xs font-medium text-[#c1ecd4]">
                    Pendopo Utama Lereng Asri · Sektor Timur
                  </p>
                  <p className="text-sm md:text-base font-semibold">
                    Panorama Pagi 18°C & Terasering Teh Rakyat
                  </p>
                </div>
                <span className="text-xs font-medium text-[#fcf9f2]/90 tabular-nums">
                  2,5 jam dari Yogyakarta / Semarang
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Full-Width 4-Column Quick Village Highlights Strip */}
        <div className="mt-10 pt-8 border-t border-[#1b4332]/10 grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <div className="space-y-1">
            <p className="text-2xl md:text-3xl font-bold text-[#012d1d] tabular-nums">
              1.240 mdpl
            </p>
            <p className="text-sm text-[#414844]">
              Ketinggian desa dengan udara sejuk sepanjang hari
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl md:text-3xl font-bold text-[#012d1d] tabular-nums">
              14 Homestay
            </p>
            <p className="text-sm text-[#414844]">
              Rumah kayu & bambu warga bersertifikat CHSE
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl md:text-3xl font-bold text-[#012d1d] tabular-nums">
              6 Paket Terpadu
            </p>
            <p className="text-sm text-[#414844]">
              Kopi arabika, panen organik, curug, dan menginap
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-2xl md:text-3xl font-bold text-[#012d1d] tabular-nums">
              07.00 – 17.00
            </p>
            <p className="text-sm text-[#414844]">
              Jam layanan pendopo & pemandu resmi Pokdarwis
            </p>
          </div>
        </div>
      </section>

      {/* 3. Asymmetric Bento Showcase — Pengalaman Utama Desa */}
      <section className="bg-[#f6f3ec] border-y border-[#1b4332]/10 py-14 md:py-20">
        <div className="max-w-[1240px] mx-auto px-5 md:px-10 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <p className="text-xs font-semibold tracking-wide text-[#2c694e]">
                Ragam Aktivitas Agro-Wisata
              </p>
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-[#012d1d] text-balance">
                Pengalaman Utama di Desa Lereng Asri
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigateToPackages(PackageCategory.SEMUA)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#1b4332] hover:text-[#2c694e] transition-colors cursor-pointer self-start md:self-auto whitespace-nowrap"
            >
              <span>Lihat semua 6 paket wisata</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Marquee Card (col-span-2) */}
            <article className="lg:col-span-2 group bg-[#faf9f6] rounded-2xl border border-[#1b4332]/10 overflow-hidden flex flex-col">
              <div className="aspect-[16/9] w-full overflow-hidden bg-[#ebe8e1]">
                <ResilientImage
                  src={featuredMarquee.image}
                  alt={featuredMarquee.imageAlt}
                  fallbackLabel={featuredMarquee.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between gap-5">
                <div className="space-y-3">
                  <p className="text-xs font-medium text-[#414844] tabular-nums">
                    {featuredMarquee.editorialNumber}. {featuredMarquee.categoryLabel} ·{' '}
                    {featuredMarquee.durationLabel} · {featuredMarquee.elevationRange}
                  </p>
                  <h3 className="text-xl md:text-2xl font-bold text-[#012d1d] tracking-tight">
                    {featuredMarquee.title}
                  </h3>
                  <p className="text-sm md:text-base leading-relaxed text-[#414844]">
                    {featuredMarquee.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#1b4332]/10 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-xs text-[#414844]">Mulai dari</span>
                    <p className="text-lg font-bold text-[#012d1d] tabular-nums">
                      {formatRupiah(featuredMarquee.pricePerPerson)}{' '}
                      <span className="text-xs font-normal text-[#414844]">/ orang</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => onSelectPackageDetail(featuredMarquee)}
                      className="px-4 py-2 rounded-lg border border-[#1b4332]/20 text-sm font-semibold text-[#1b4332] hover:bg-[#f1eee7] transition-colors cursor-pointer whitespace-nowrap"
                    >
                      Rincian Jadwal
                    </button>
                    <button
                      type="button"
                      onClick={() => onBookPackage(featuredMarquee)}
                      className="px-4 py-2 rounded-lg bg-[#1b4332] hover:bg-[#2c694e] text-[#fcf9f2] text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap"
                    >
                      Pesan Paket
                    </button>
                  </div>
                </div>
              </div>
            </article>

            {/* Right Column Featured Card */}
            <article className="group bg-[#faf9f6] rounded-2xl border border-[#1b4332]/10 overflow-hidden flex flex-col">
              <div className="aspect-[4/3] w-full overflow-hidden bg-[#ebe8e1]">
                <ResilientImage
                  src={featuredSecondary[0].image}
                  alt={featuredSecondary[0].imageAlt}
                  fallbackLabel={featuredSecondary[0].title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between gap-4">
                <div className="space-y-2.5">
                  <p className="text-xs font-medium text-[#414844] tabular-nums">
                    {featuredSecondary[0].editorialNumber}. {featuredSecondary[0].categoryLabel} ·{' '}
                    {featuredSecondary[0].durationLabel}
                  </p>
                  <h3 className="text-lg md:text-xl font-bold text-[#012d1d] tracking-tight">
                    {featuredSecondary[0].title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#414844]">
                    {featuredSecondary[0].shortSubtitle}
                  </p>
                </div>
                <div className="pt-4 border-t border-[#1b4332]/10 flex items-center justify-between gap-3">
                  <p className="text-base font-bold text-[#012d1d] tabular-nums">
                    {formatRupiah(featuredSecondary[0].pricePerPerson)}
                    <span className="text-xs font-normal text-[#414844]"> / org</span>
                  </p>
                  <button
                    type="button"
                    onClick={() => onSelectPackageDetail(featuredSecondary[0])}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1b4332] hover:text-[#2c694e] cursor-pointer whitespace-nowrap"
                  >
                    <span>Lihat detail</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </article>

            {/* Bottom Row Secondary Cards */}
            {featuredSecondary.slice(1).map((pkg) => (
              <article
                key={pkg.id}
                className="group bg-[#faf9f6] rounded-2xl border border-[#1b4332]/10 overflow-hidden flex flex-col"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-[#ebe8e1]">
                  <ResilientImage
                    src={pkg.image}
                    alt={pkg.imageAlt}
                    fallbackLabel={pkg.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between gap-4">
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-[#414844] tabular-nums">
                      {pkg.editorialNumber}. {pkg.categoryLabel} · {pkg.durationLabel}
                    </p>
                    <h3 className="text-lg font-bold text-[#012d1d] tracking-tight">
                      {pkg.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#414844]">{pkg.shortSubtitle}</p>
                  </div>
                  <div className="pt-4 border-t border-[#1b4332]/10 flex items-center justify-between gap-3">
                    <p className="text-base font-bold text-[#012d1d] tabular-nums">
                      {formatRupiah(pkg.pricePerPerson)}
                      <span className="text-xs font-normal text-[#414844]"> / org</span>
                    </p>
                    <button
                      type="button"
                      onClick={() => onSelectPackageDetail(pkg)}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1b4332] hover:text-[#2c694e] cursor-pointer whitespace-nowrap"
                    >
                      <span>Lihat detail</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </article>
            ))}

            {/* Quick Navigation Callout Card into Screen 2 */}
            <div className="bg-[#1b4332] text-[#fcf9f2] rounded-2xl p-6 md:p-7 flex flex-col justify-between gap-6">
              <div className="space-y-3">
                <p className="text-xs font-medium text-[#a5d0b9]">
                  Katalog Lengkap & Kalkulator Rombongan
                </p>
                <h3 className="text-xl font-bold tracking-tight text-balance">
                  Rencanakan Kunjungan Keluarga atau Rombongan Sekolah
                </h3>
                <p className="text-sm leading-relaxed text-[#fcf9f2]/80">
                  Hitung otomatis estimasi biaya berdasarkan jumlah peserta, bandingkan rundown
                  kegiatan, dan dapatkan potongan khusus rombongan 10–15%.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigateToPackages(PackageCategory.SEMUA)}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#fcf9f2] hover:bg-[#f1eee7] text-[#012d1d] text-sm font-bold transition-colors cursor-pointer"
              >
                <span>Buka Halaman Paket Wisata</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Homestay Warga & Keramahan Desa + Claim-to-Proof Testimoni */}
      <section
        id="homestay-section"
        className="max-w-[1240px] mx-auto px-5 md:px-10 py-14 md:py-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left: Certified Village Homestays */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <p className="text-xs font-semibold text-[#2c694e]">
                Keramahan Desa & Akomodasi Lokal
              </p>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#012d1d] text-balance">
                Homestay Kayu Bersertifikat & Dapur Tungku
              </h2>
              <p className="text-sm md:text-base text-[#414844] leading-relaxed">
                Seluruh homestay dikelola oleh keluarga warga dengan standar kebersihan CHSE, air
                hangat, serta sajian masakan rumahan dari hasil kebun sendiri.
              </p>
            </div>

            <div className="space-y-4">
              {HOMESTAY_SPOTLIGHTS.map((hs) => (
                <div
                  key={hs.id}
                  className="p-6 rounded-2xl bg-[#faf9f6] border border-[#1b4332]/10 space-y-3"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-lg font-bold text-[#012d1d]">{hs.name}</h3>
                    <span className="text-base font-bold text-[#012d1d] tabular-nums">
                      {formatRupiah(hs.pricePerNight)}
                      <span className="text-xs font-normal text-[#414844]"> / malam</span>
                    </span>
                  </div>
                  <p className="text-xs font-medium text-[#2c694e] tabular-nums">
                    {hs.hostName} · {hs.roomsAvailable} Kamar Tersedia · {hs.capacityLabel}
                  </p>
                  <p className="text-sm text-[#414844] leading-relaxed">{hs.description}</p>
                  <p className="text-xs text-[#414844] pt-1">
                    {hs.highlights.join(' · ')}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onNavigateToPackages(PackageCategory.HOMESTAY)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1b4332] hover:bg-[#2c694e] text-[#fcf9f2] text-sm font-semibold transition-colors cursor-pointer"
              >
                <span>Lihat Paket Menginap</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right: Attributable Visitor Proof adjacent to Homestay claims */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <p className="text-xs font-semibold text-[#642b00]">
                Catatan Pengunjung Terverifikasi
              </p>
              <h3 className="text-xl md:text-2xl font-bold tracking-tight text-[#012d1d]">
                Pengalaman Keluarga & Rombongan Sekolah
              </h3>
            </div>

            <div className="space-y-5">
              {VISITOR_TESTIMONIALS.map((item) => (
                <blockquote
                  key={item.id}
                  className="p-6 rounded-2xl bg-[#f6f3ec] border border-[#1b4332]/10 space-y-4"
                >
                  <p className="text-xs font-medium text-[#414844]">
                    {item.packageVisited} · {item.visitDate}
                  </p>
                  <p className="text-sm md:text-base leading-relaxed text-[#1c1c18]">
                    “{item.beforeAfterQuote}”
                  </p>
                  <footer className="pt-3 border-t border-[#1b4332]/10">
                    <p className="text-sm font-bold text-[#012d1d]">{item.name}</p>
                    <p className="text-xs text-[#414844]">
                      {item.role} · {item.organization}
                    </p>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Peta Topografi Interaktif & Formulir Rencana Kunjungan */}
      <section
        id="lokasi-section"
        className="bg-[#f6f3ec] border-t border-[#1b4332]/10 py-14 md:py-20"
      >
        <div className="max-w-[1240px] mx-auto px-5 md:px-10 space-y-10">
          <div className="space-y-2 max-w-2xl">
            <p className="text-xs font-semibold text-[#2c694e]">
              Orientasi Jalur & Konsultasi
            </p>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#012d1d] text-balance">
              Peta Topografi Desa & Rencana Kunjungan
            </h2>
            <p className="text-sm md:text-base text-[#414844] leading-relaxed">
              Pilih titik lokasi pada peta kontur untuk melihat ketinggian dan jarak tempuh berjalan
              kaki dari Pendopo Utama.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Interactive Topographic Map Panel */}
            <div className="lg:col-span-7 bg-[#faf9f6] rounded-2xl border border-[#1b4332]/10 p-5 md:p-6 space-y-5">
              {/* Topographic Map Canvas */}
              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-[#efeadd] border border-[#1b4332]/12">
                {/* Contours SVG */}
                <svg
                  viewBox="0 0 800 500"
                  className="w-full h-full"
                  aria-label="Peta kontur topografi Desa Wisata Lereng Asri"
                >
                  <rect width="800" height="500" fill="#efeadd" />
                  {/* Subtle elevation contour paths */}
                  <path
                    d="M -40 430 Q 180 370 360 400 T 830 330"
                    fill="none"
                    stroke="#2c694e"
                    strokeOpacity="0.16"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M -40 360 Q 200 280 410 315 T 840 245"
                    fill="none"
                    stroke="#2c694e"
                    strokeOpacity="0.2"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M -30 270 Q 220 190 430 220 T 830 155"
                    fill="none"
                    stroke="#2c694e"
                    strokeOpacity="0.22"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M 40 170 Q 260 95 490 130 T 840 70"
                    fill="none"
                    stroke="#1b4332"
                    strokeOpacity="0.18"
                    strokeWidth="1.5"
                  />
                  {/* Walking trail dashed connector */}
                  <path
                    d="M 176 320 L 272 160 L 368 240 L 496 350 M 368 240 L 624 120"
                    fill="none"
                    stroke="#642b00"
                    strokeOpacity="0.45"
                    strokeWidth="2.5"
                    strokeDasharray="6 6"
                  />
                  {/* Subtle compass indicator */}
                  <g transform="translate(740, 52)">
                    <circle r="20" fill="#faf9f6" stroke="#1b4332" strokeOpacity="0.2" />
                    <text
                      x="0"
                      y="5"
                      textAnchor="middle"
                      fontSize="12"
                      fontWeight="700"
                      fill="#1b4332"
                    >
                      U
                    </text>
                  </g>
                </svg>

                {/* Interactive Node Markers */}
                {VILLAGE_TRAIL_NODES.map((node) => {
                  const isActive = node.id === activeNode.id;
                  return (
                    <button
                      key={node.id}
                      type="button"
                      onClick={() => setActiveNodeId(node.id)}
                      style={{
                        left: `${node.xPercent}%`,
                        top: `${node.yPercent}%`,
                      }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold transition-transform cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1b4332] ${
                        isActive
                          ? 'bg-[#1b4332] text-[#fcf9f2] scale-105 shadow-[0_4px_14px_rgba(27,67,50,0.28)] z-10'
                          : 'bg-[#faf9f6] text-[#012d1d] border border-[#1b4332]/25 hover:bg-[#c1ecd4]'
                      }`}
                    >
                      <span className="tabular-nums font-bold">{node.code}.</span>
                      <span className="hidden sm:inline whitespace-nowrap">
                        {node.name.split(' ')[0]} {node.name.split(' ')[1]}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Selected Node Detail */}
              <div className="p-5 rounded-xl bg-[#fcf9f2] border border-[#1b4332]/10 space-y-3">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="text-xs font-medium text-[#2c694e]">
                      Titik {activeNode.code} · {activeNode.zone}
                    </p>
                    <h3 className="text-lg font-bold text-[#012d1d]">{activeNode.name}</h3>
                  </div>
                  <span className="text-xs font-semibold text-[#642b00] tabular-nums">
                    {activeNode.elevation}
                  </span>
                </div>

                <p className="text-sm text-[#414844] leading-relaxed">{activeNode.description}</p>

                <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-[#1b4332]/10">
                  <div className="flex flex-wrap items-center gap-4 text-xs text-[#414844] tabular-nums">
                    <span className="inline-flex items-center gap-1.5">
                      <Footprints className="w-3.5 h-3.5 text-[#2c694e]" />
                      {activeNode.walkTimeFromPendopo}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#2c694e]" />
                      {activeNode.bestTime}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectPackageDetail(relatedNodePackage)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1b4332] hover:text-[#2c694e] cursor-pointer whitespace-nowrap"
                  >
                    <span>Lihat paket terkait</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Lead Capture / Rencana Kunjungan Form */}
            <div className="lg:col-span-5 bg-[#faf9f6] rounded-2xl border border-[#1b4332]/10 p-6 md:p-7 space-y-5">
              <div className="space-y-1.5">
                <h3 className="text-xl font-bold text-[#012d1d]">
                  Konsultasi Rencana Kunjungan
                </h3>
                <p className="text-sm text-[#414844]">
                  Butuh penjadwalan khusus rombongan sekolah, kantor, atau keluarga besar? Kirim
                  rencana singkat Anda kepada pengurus desa.
                </p>
              </div>

              {consultSubmitted ? (
                <div className="p-5 rounded-xl bg-[#c1ecd4]/40 border border-[#2c694e]/25 space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#1b4332] shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-[#012d1d]">
                        Rencana Kunjungan Tercatat
                      </p>
                      <p className="text-sm text-[#414844]">
                        Terima kasih, {visitorName}. Rencana untuk {guestCount} orang ({interest})
                        siap diteruskan ke WhatsApp Pokdarwis.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={consultWaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#25D366] hover:bg-[#1ebe5d] text-[#012d1d] text-sm font-bold transition-colors"
                    >
                      <WhatsAppGlyph className="w-4 h-4" />
                      <span>Lanjut ke WhatsApp</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => setConsultSubmitted(false)}
                      className="px-4 py-2.5 rounded-lg border border-[#1b4332]/20 text-sm font-semibold text-[#1b4332] hover:bg-[#f1eee7] transition-colors cursor-pointer"
                    >
                      Kirim Ulang
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleConsultSubmit} className="space-y-4" noValidate>
                  <div className="space-y-1.5">
                    <label
                      htmlFor="consult-name"
                      className="block text-xs font-semibold text-[#1c1c18]"
                    >
                      Nama Lengkap
                    </label>
                    <input
                      id="consult-name"
                      type="text"
                      placeholder="Nama penanggung jawab"
                      value={visitorName}
                      onChange={(e) => setVisitorName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#fcf9f2] border border-[#1b4332]/20 text-sm text-[#1c1c18] placeholder:text-[#717973] focus:outline-none focus:border-[#2c694e] focus:ring-3 focus:ring-[#2c694e]/15"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="consult-wa"
                      className="block text-xs font-semibold text-[#1c1c18]"
                    >
                      Nomor WhatsApp
                    </label>
                    <input
                      id="consult-wa"
                      type="tel"
                      placeholder="081234567890"
                      value={visitorWa}
                      onChange={(e) => setVisitorWa(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#fcf9f2] border border-[#1b4332]/20 text-sm text-[#1c1c18] tabular-nums placeholder:text-[#717973] focus:outline-none focus:border-[#2c694e] focus:ring-3 focus:ring-[#2c694e]/15"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="consult-date"
                        className="block text-xs font-semibold text-[#1c1c18]"
                      >
                        Tanggal Rencana
                      </label>
                      <input
                        id="consult-date"
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                        value={visitDate}
                        onChange={(e) => setVisitDate(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-lg bg-[#fcf9f2] border border-[#1b4332]/20 text-sm text-[#1c1c18] tabular-nums focus:outline-none focus:border-[#2c694e] focus:ring-3 focus:ring-[#2c694e]/15"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label
                        htmlFor="consult-guests"
                        className="block text-xs font-semibold text-[#1c1c18]"
                      >
                        Perkiraan Peserta
                      </label>
                      <input
                        id="consult-guests"
                        type="number"
                        min={1}
                        max={120}
                        value={guestCount}
                        onChange={(e) => setGuestCount(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-lg bg-[#fcf9f2] border border-[#1b4332]/20 text-sm text-[#1c1c18] tabular-nums focus:outline-none focus:border-[#2c694e] focus:ring-3 focus:ring-[#2c694e]/15"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="consult-interest"
                      className="block text-xs font-semibold text-[#1c1c18]"
                    >
                      Minat Utama
                    </label>
                    <select
                      id="consult-interest"
                      value={interest}
                      onChange={(e) => setInterest(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#fcf9f2] border border-[#1b4332]/20 text-sm text-[#1c1c18] focus:outline-none focus:border-[#2c694e] focus:ring-3 focus:ring-[#2c694e]/15"
                    >
                      <option value="Edukasi Kopi & Kebun Organik">
                        Edukasi Kopi & Kebun Organik
                      </option>
                      <option value="Menginap Homestay Keluarga (2H1M)">
                        Menginap Homestay Keluarga (2H1M)
                      </option>
                      <option value="Trekking Hutan Pinus & Curug">
                        Trekking Hutan Pinus & Curug
                      </option>
                      <option value="Study Tour Sekolah / Kunjungan Komunitas">
                        Study Tour Sekolah / Kunjungan Komunitas
                      </option>
                    </select>
                  </div>

                  {consultError && (
                    <p
                      role="alert"
                      className="text-xs font-medium text-[#ba1a1a] bg-[#ffdad6]/60 px-3 py-2 rounded-lg"
                    >
                      {consultError}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#25D366] hover:bg-[#1ebe5d] text-[#012d1d] text-sm font-bold transition-colors cursor-pointer"
                  >
                    <WhatsAppGlyph className="w-4 h-4 shrink-0" />
                    <span>Kirim Rencana Kunjungan</span>
                  </button>

                  <p className="text-xs text-[#414844] flex items-center gap-1.5 pt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#2c694e] shrink-0" />
                    <span>Pendopo Lereng Asri, Kec. Ngablak · Respon admin 07.00–20.00 WIB</span>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
