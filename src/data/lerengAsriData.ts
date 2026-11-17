export enum ScreenId {
  BERANDA = 'beranda',
  PAKET_WISATA = 'paket-wisata',
}

export enum PackageCategory {
  SEMUA = 'semua',
  EDUKASI_TANI = 'edukasi-tani',
  JELAJAH_ALAM = 'jelajah-alam',
  HOMESTAY = 'homestay',
}

export enum DifficultyLevel {
  SANTAI = 'Santai',
  SEDANG = 'Menengah',
  MENANTANG = 'Menantang',
}

export interface ItineraryStep {
  time: string;
  title: string;
  description: string;
}

export interface TourPackage {
  id: string;
  slug: string;
  editorialNumber: string;
  category: Exclude<PackageCategory, PackageCategory.SEMUA>;
  categoryLabel: string;
  title: string;
  shortSubtitle: string;
  description: string;
  image: string;
  imageAlt: string;
  durationLabel: string;
  durationHours: number;
  pricePerPerson: number;
  weekendSurchargePercent: number;
  groupDiscountThreshold: number;
  groupDiscountPercent: number;
  minGuests: number;
  maxGuests: number;
  difficulty: DifficultyLevel;
  elevationRange: string;
  meetingPoint: string;
  seasonalNote?: string;
  includes: string[];
  bringList: string[];
  itinerary: ItineraryStep[];
}

export interface VillageTrailNode {
  id: string;
  code: string;
  name: string;
  zone: string;
  elevation: string;
  walkTimeFromPendopo: string;
  bestTime: string;
  description: string;
  relatedPackageId: string;
  xPercent: number;
  yPercent: number;
}

export interface HomestaySpotlight {
  id: string;
  name: string;
  hostName: string;
  roomsAvailable: number;
  capacityLabel: string;
  pricePerNight: number;
  highlights: string[];
  description: string;
}

export interface VisitorTestimonial {
  id: string;
  name: string;
  role: string;
  organization: string;
  packageVisited: string;
  visitDate: string;
  beforeAfterQuote: string;
}

export const HERO_IMAGE = '/src/assets/images/hero_lereng_asri_1794888221822.jpg';

export const TOUR_PACKAGES: TourPackage[] = [
  {
    id: 'edukasi-kopi',
    slug: 'edukasi-kopi-arabika',
    editorialNumber: '01',
    category: PackageCategory.EDUKASI_TANI,
    categoryLabel: 'Edukasi & Tani',
    title: 'Edukasi Kopi Arabika & Sangrai Tanah Liat',
    shortSubtitle: 'Petik ceri kopi di kebun lereng dan sangrai tradisional bersama petani.',
    description:
      'Ikuti alur lengkap kopi pegunungan mulai dari pemetikan ceri merah di ketinggian 1.320 mdpl, proses pascapanen basah, hingga menyangrai biji kopi di atas wajan gerabah berbahan bakar kayu.',
    image: '/src/assets/images/paket_edukasi_kopi_1794888223788.jpg',
    imageAlt: 'Petani Desa Lereng Asri menyangrai biji kopi arabika di wajan tanah liat dengan keranjang bambu berisi ceri kopi merah',
    durationLabel: '4 Jam',
    durationHours: 4,
    pricePerPerson: 165000,
    weekendSurchargePercent: 0,
    groupDiscountThreshold: 10,
    groupDiscountPercent: 12,
    minGuests: 2,
    maxGuests: 30,
    difficulty: DifficultyLevel.SANTAI,
    elevationRange: '1.240 – 1.320 mdpl',
    meetingPoint: 'Pendopo Utama Desa Lereng Asri',
    seasonalNote: 'Panen Raya Mei – September',
    includes: [
      'Pendampingan petani kopi & pemandu lokal',
      '100g kopi sangrai bawa pulang per peserta',
      'Sesi seduh tubruk & V60 plus kudapan singkong rebus',
      'Topi caping pinjaman dan keranjang petik bambu',
    ],
    bringList: [
      'Sepatu jalan bertapak tidak licin',
      'Jaket tipis untuk udara pagi pegunungan',
      'Botol minum isi ulang pribadi',
    ],
    itinerary: [
      {
        time: '08.00 – 08.30',
        title: 'Penyambutan & Kopi Pagi di Pendopo',
        description: 'Pengenalan varietas kopi Arabika Lereng Asri dan pembagian keranjang panen bambu.',
      },
      {
        time: '08.30 – 10.00',
        title: 'Petik Ceri Merah di Kebun Blok B',
        description: 'Belajar memilih tingkat kematangan buah kopi bersama anggota kelompok tani.',
      },
      {
        time: '10.00 – 11.15',
        title: 'Sangrai Tanah Liat & Penggilingan',
        description: 'Menyangrai biji kopi di atas tungku kayu dan menggiling secara manual.',
      },
      {
        time: '11.15 – 12.00',
        title: 'Sesi Seduh & Pengemasan Oleh-oleh',
        description: 'Mencicipi hasil sangrai sendiri dengan kudapan desa dan membungkus kopi bawa pulang.',
      },
    ],
  },
  {
    id: 'homestay-desa',
    slug: 'homestay-kayu-dapur-tungku',
    editorialNumber: '02',
    category: PackageCategory.HOMESTAY,
    categoryLabel: 'Homestay & Menginap',
    title: 'Menginap di Homestay Kayu & Dapur Tungku',
    shortSubtitle: 'Dua hari satu malam tinggal bersama keluarga tuan rumah bersertifikat Pokdarwis.',
    description:
      'Nikmati suasana malam pegunungan yang tenang di rumah kayu jati dan anyaman bambu warga. Termasuk makan malam masakan rumahan dapur tungku, api unggun ringan, dan jalan pagi menyusuri terasering.',
    image: '/src/assets/images/paket_homestay_desa_1794888224209.jpg',
    imageAlt: 'Teras homestay kayu dan bambu Desa Lereng Asri menghadap sawah terasering berkabut saat fajar dengan dua cangkir teh hangat',
    durationLabel: '2 Hari 1 Malam',
    durationHours: 28,
    pricePerPerson: 425000,
    weekendSurchargePercent: 10,
    groupDiscountThreshold: 8,
    groupDiscountPercent: 10,
    minGuests: 2,
    maxGuests: 24,
    difficulty: DifficultyLevel.SANTAI,
    elevationRange: '1.260 mdpl',
    meetingPoint: 'Balai Tamu Kampung Atas',
    seasonalNote: 'Tersedia Sepanjang Tahun',
    includes: [
      '1 malam kamar privat homestay bersertifikat CHSE',
      '3x makan masakan rumahan lokal (makan malam, sarapan, makan siang)',
      'Wedang jahe & pisang goreng sore di beranda',
      'Jalan pagi terasering bersama tuan rumah',
    ],
    bringList: [
      'Baju hangat untuk suhu malam 15–17°C',
      'Perlengkapan mandi pribadi (handuk disediakan)',
      'Senter kecil atau headlamp opsional',
    ],
    itinerary: [
      {
        time: 'Hari 1 · 14.00',
        title: 'Check-in & Sambutan Tuan Rumah',
        description: 'Menempati kamar homestay dan menikmati teh pegunungan hangat di beranda.',
      },
      {
        time: 'Hari 1 · 18.30',
        title: 'Makan Malam Dapur Tungku',
        description: 'Menyantap sayur lodeh, tempe mendoan hangat, dan nasi jagung bersama keluarga desa.',
      },
      {
        time: 'Hari 2 · 06.00',
        title: 'Jalan Pagi Menyusuri Pematang Sawah',
        description: 'Menyaksikan kabut pagi terangkat dari lembah terasering sebelum sarapan.',
      },
      {
        time: 'Hari 2 · 11.00',
        title: 'Belajar Anyaman Bambu & Check-out',
        description: 'Sesi singkat kerajinan bambu suvenir sebelum kepulangan.',
      },
    ],
  },
  {
    id: 'trekking-curug',
    slug: 'trekking-pinus-curug-sinar-pagi',
    editorialNumber: '03',
    category: PackageCategory.JELAJAH_ALAM,
    categoryLabel: 'Jelajah Alam',
    title: 'Trekking Hutan Pinus & Curug Sinar Pagi',
    shortSubtitle: 'Menyusuri jalur setapak hutan pinus menuju air terjun alami berair jernih.',
    description:
      'Jalur trekking ramah keluarga sepanjang 4,2 km pulang-pergi melintasi tegakan pinus, kebun pakis, dan aliran sungai berbatu vulkanik hingga mencapai kolam alami Curug Sinar Pagi.',
    image: '/src/assets/images/paket_trekking_curug_1794888229088.jpg',
    imageAlt: 'Jalur trekking hutan pinus tropis menuju air terjun Curug Sinar Pagi dengan batuan berlumut dan aliran air jernih',
    durationLabel: '3,5 Jam',
    durationHours: 3.5,
    pricePerPerson: 135000,
    weekendSurchargePercent: 0,
    groupDiscountThreshold: 12,
    groupDiscountPercent: 15,
    minGuests: 2,
    maxGuests: 25,
    difficulty: DifficultyLevel.SEDANG,
    elevationRange: '1.240 – 1.420 mdpl',
    meetingPoint: 'Gerbang Rimba Lereng Asri',
    includes: [
      'Pemandu jelajah alam bersertifikat & P3K jalur',
      'Tiket masuk kawasan konservasi desa',
      'Tongkat trekking bambu & jas hujan ponco siaga',
      'Bekal makan siang nasi bungkus daun pisang',
    ],
    bringList: [
      'Sepatu outdoor atau sandal gunung bertali',
      'Pakaian ganti bila ingin bermain air di curug',
      'Tas punggung kecil tahan percikan air',
    ],
    itinerary: [
      {
        time: '07.30 – 07.50',
        title: 'Pemanasan & Pengarahan Jalur',
        description: 'Pengecekan alas kaki dan pembagian tongkat trekking bambu di Gerbang Rimba.',
      },
      {
        time: '07.50 – 09.15',
        title: 'Lintas Hutan Pinus & Kebun Pakis',
        description: 'Berjalan santai mengenal flora endemik lereng gunung dan mata air desa.',
      },
      {
        time: '09.15 – 10.15',
        title: 'Istirahat di Curug Sinar Pagi',
        description: 'Menikmati segarnya air terjun dan makan siang bungkus daun pisang di tepi sungai.',
      },
      {
        time: '10.15 – 11.00',
        title: 'Kembali Melalui Jalur Punggung Bukit',
        description: 'Rute pulang landai dengan pemandangan panorama lembah selatan.',
      },
    ],
  },
  {
    id: 'panen-organik',
    slug: 'panen-sayur-organik-stroberi',
    editorialNumber: '04',
    category: PackageCategory.EDUKASI_TANI,
    categoryLabel: 'Edukasi & Tani',
    title: 'Panen Sayur Organik & Kebun Stroberi Vulkanik',
    shortSubtitle: 'Belajar pertanian tanpa pestisida kimia dan membawa pulang hasil panen segar.',
    description:
      'Dirancang khusus untuk keluarga dan rombongan pelajar. Peserta mempraktikkan pembuatan kompos daun, mengenal irigasi tetes terasering, serta memetik langsung wortel, kale, dan stroberi dataran tinggi.',
    image: '/src/assets/images/paket_panen_organik_1794888224726.jpg',
    imageAlt: 'Kebun sayur organik dan stroberi terasering di tanah vulkanik subur dengan peti kayu hasil panen segar',
    durationLabel: '3 Jam',
    durationHours: 3,
    pricePerPerson: 120000,
    weekendSurchargePercent: 0,
    groupDiscountThreshold: 15,
    groupDiscountPercent: 15,
    minGuests: 2,
    maxGuests: 40,
    difficulty: DifficultyLevel.SANTAI,
    elevationRange: '1.280 mdpl',
    meetingPoint: 'Pergola Kebun Tani Lestari',
    seasonalNote: 'Cocok untuk Keluarga & Anak',
    includes: [
      'Pendampingan penyuluh tani organik desa',
      'Paket bawa pulang 1 kg sayur organik & 250g stroberi',
      'Minuman jus stroberi segar & ubi cilembu bakar',
      'Peralatan berkebun ramah anak',
    ],
    bringList: [
      'Pakaian santai yang nyaman untuk berkebun',
      'Tabir surya alami atau topi lebar',
      'Tas kain belanja untuk membawa hasil panen',
    ],
    itinerary: [
      {
        time: '08.30 – 09.15',
        title: 'Pengenalan Tanah Vulkanik & Kompos',
        description: 'Melihat langsung pengolahan pupuk organik dari limbah kebun dan ternak warga.',
      },
      {
        time: '09.15 – 10.30',
        title: 'Panen Sayur & Stroberi di Terasering',
        description: 'Memilih sayuran siap panen dan stroberi merah manis langsung dari bedengan.',
      },
      {
        time: '10.30 – 11.30',
        title: 'Sajian Kebun & Pengemasan Hasil Panen',
        description: 'Mencuci hasil panen dengan air pegunungan dan menikmati ubi bakar hangat.',
      },
    ],
  },
  {
    id: 'keluarga-lengkap',
    slug: 'paket-keluarga-akhir-pekan-2h1m',
    editorialNumber: '05',
    category: PackageCategory.HOMESTAY,
    categoryLabel: 'Homestay & Menginap',
    title: 'Paket Keluarga Akhir Pekan Lengkap (2H1M)',
    shortSubtitle: 'Kombinasi homestay nyaman, panen pagi, dan kelas sangrai kopi untuk keluarga.',
    description:
      'Paket terpadu paling diminati keluarga kota. Menggabungkan pengalaman menginap 1 malam di homestay warga, sesi panen sayur organik untuk anak-anak, serta lokakarya kopi bagi orang tua.',
    image: '/src/assets/images/hero_lereng_asri_1794888221822.jpg',
    imageAlt: 'Panorama Pendopo Desa Lereng Asri dikelilingi terasering hijau dan pegunungan saat matahari terbit',
    durationLabel: '2 Hari 1 Malam',
    durationHours: 30,
    pricePerPerson: 580000,
    weekendSurchargePercent: 8,
    groupDiscountThreshold: 6,
    groupDiscountPercent: 12,
    minGuests: 4,
    maxGuests: 20,
    difficulty: DifficultyLevel.SANTAI,
    elevationRange: '1.240 – 1.320 mdpl',
    meetingPoint: 'Pendopo Utama Desa Lereng Asri',
    seasonalNote: 'Hemat 12% untuk ≥6 Orang',
    includes: [
      'Homestay keluarga privat (maks. 4 orang per unit)',
      'Semua makan & kudapan khas desa (4x sajian)',
      'Sesi panen kebun organik + edukasi kopi arabika',
      'Dokumentasi foto keluarga di terasering pagi',
    ],
    bringList: [
      'Pakaian hangat berlapis untuk pagi dan malam',
      'Sepatu nyaman untuk berjalan di jalan setapak desa',
      'Obat-obatan pribadi keluarga',
    ],
    itinerary: [
      {
        time: 'Hari 1 · 13.30',
        title: 'Kedatangan & Makan Siang di Pendopo',
        description: 'Sambutan tim Pokdarwis, makan siang liwetan desa, dan menuju homestay.',
      },
      {
        time: 'Hari 1 · 15.30',
        title: 'Panen Kebun Stroberi & Sayur Organik',
        description: 'Aktivitas sore santai yang ramah bagi anak usia 4 tahun ke atas.',
      },
      {
        time: 'Hari 2 · 07.30',
        title: 'Edukasi Kopi & Jalan Pagi Lembah',
        description: 'Mengenal proses kopi desa sambil menikmati udara pagi yang jernih.',
      },
      {
        time: 'Hari 2 · 12.00',
        title: 'Makan Siang Perpisahan & Oleh-oleh',
        description: 'Membawa pulang hasil panen sayur dan kopi sebelum kembali ke kota.',
      },
    ],
  },
  {
    id: 'sunrise-bukit-teh',
    slug: 'jelajah-sunrise-bukit-teh',
    editorialNumber: '06',
    category: PackageCategory.JELAJAH_ALAM,
    categoryLabel: 'Jelajah Alam',
    title: 'Jelajah Matahari Terbit Puncak Bukit & Teh Desa',
    shortSubtitle: 'Pendakian ringan fajar menuju gardu pandang timur dengan seduhan teh hangat.',
    description:
      'Berangkat sebelum fajar melalui jalur kebun teh rakyat menuju titik pandang 1.410 mdpl. Saksikan lautan kabut lembah tersibak sinar matahari sambil menyeruput teh oolong lokal.',
    image: '/src/assets/images/hero_lereng_asri_1794888221822.jpg',
    imageAlt: 'Sinar matahari pagi menyinari terasering teh dan puncak gunung dari gardu pandang Lereng Asri',
    durationLabel: '3 Jam',
    durationHours: 3,
    pricePerPerson: 110000,
    weekendSurchargePercent: 0,
    groupDiscountThreshold: 10,
    groupDiscountPercent: 10,
    minGuests: 2,
    maxGuests: 25,
    difficulty: DifficultyLevel.SEDANG,
    elevationRange: '1.240 – 1.410 mdpl',
    meetingPoint: 'Pendopo Utama Desa Lereng Asri',
    includes: [
      'Pemandu jalur fajar & senter kepala pinjaman',
      'Seduhan teh gunung hangat & kue tradisional di puncak',
      'Tiket gardu pandang timur',
    ],
    bringList: [
      'Jaket tahan angin & sarung tangan tipis',
      'Sepatu jalan dengan daya cengkeram baik',
      'Kamera atau ponsel baterai penuh',
    ],
    itinerary: [
      {
        time: '04.45 – 05.35',
        title: 'Pendakian Ringan Melintasi Kebun Teh',
        description: 'Berjalan perlahan menyusuri tangga batu setapak menuju titik pandang.',
      },
      {
        time: '05.35 – 06.45',
        title: 'Matahari Terbit & Seduh Teh Hangat',
        description: 'Menikmati panorama dua puncak gunung dengan teh panas dan klepon hangat.',
      },
      {
        time: '06.45 – 07.45',
        title: 'Turun Santai Melalui Jalur Terasering',
        description: 'Berfoto di hamparan kebun teh yang baru disinari matahari pagi.',
      },
    ],
  },
];

export const VILLAGE_TRAIL_NODES: VillageTrailNode[] = [
  {
    id: 'pendopo',
    code: 'A',
    name: 'Pendopo Utama Lereng Asri',
    zone: 'Pusat Informasi & Parkir',
    elevation: '1.240 mdpl',
    walkTimeFromPendopo: 'Titik Awal (0 menit)',
    bestTime: '07.00 – 17.00 WIB',
    description:
      'Titik temu resmi wisatawan, pos registrasi Pokdarwis, galeri produk UMKM desa, serta area parkir minibus dan mobil keluarga.',
    relatedPackageId: 'keluarga-lengkap',
    xPercent: 22,
    yPercent: 64,
  },
  {
    id: 'kebun-kopi',
    code: 'B',
    name: 'Kebun Kopi Blok B & Rumah Sangrai',
    zone: 'Zona Agro-Edukasi Timur',
    elevation: '1.320 mdpl',
    walkTimeFromPendopo: '12 menit jalan kaki',
    bestTime: '08.00 – 11.30 WIB',
    description:
      'Lahan kopi arabika naungan pohon lamtoro yang terhubung langsung dengan rumah sangrai gerabah milik kelompok tani.',
    relatedPackageId: 'edukasi-kopi',
    xPercent: 46,
    yPercent: 48,
  },
  {
    id: 'homestay-atas',
    code: 'C',
    name: 'Klaster Homestay Kampung Atas',
    zone: 'Permukiman Ramah Wisata',
    elevation: '1.275 mdpl',
    walkTimeFromPendopo: '8 menit jalan kaki',
    bestTime: 'Check-in 14.00 WIB',
    description:
      '14 rumah warga berarsitektur kayu jati dan anyaman bambu yang menghadap langsung ke bentang sawah terasering.',
    relatedPackageId: 'homestay-desa',
    xPercent: 34,
    yPercent: 32,
  },
  {
    id: 'lahan-organik',
    code: 'D',
    name: 'Lahan Stroberi & Sayur Organik',
    zone: 'Terasering Vulkanik Selatan',
    elevation: '1.280 mdpl',
    walkTimeFromPendopo: '10 menit jalan kaki',
    bestTime: '08.30 – 11.00 WIB',
    description:
      'Bedengan sayur kale, wortel, dan stroberi dataran tinggi bebas pestisida kimia dengan pergola bambu ramah anak.',
    relatedPackageId: 'panen-organik',
    xPercent: 62,
    yPercent: 70,
  },
  {
    id: 'curug-sinar',
    code: 'E',
    name: 'Curug Sinar Pagi & Hutan Pinus',
    zone: 'Zona Konservasi Utara',
    elevation: '1.420 mdpl',
    walkTimeFromPendopo: '45 menit trekking',
    bestTime: '07.30 – 10.30 WIB',
    description:
      'Air terjun alami di tengah tegakan hutan pinus dengan kolam air jernih dan jalur setapak berbatu yang terawat warga.',
    relatedPackageId: 'trekking-curug',
    xPercent: 78,
    yPercent: 24,
  },
];

export const HOMESTAY_SPOTLIGHTS: HomestaySpotlight[] = [
  {
    id: 'hs-merbabu',
    name: 'Homestay Griya Jati Bapak Slamet',
    hostName: 'Keluarga Bapak Slamet & Ibu Sari',
    roomsAvailable: 3,
    capacityLabel: '2–6 Tamu',
    pricePerNight: 320000,
    highlights: ['Beranda hadap lembah', 'Air hangat tenaga surya', 'Sarapan dapur tungku'],
    description:
      'Rumah kayu jati terawat dengan beranda bambu luas menghadap terasering padi dan kebun kopi rakyat.',
  },
  {
    id: 'hs-pinus',
    name: 'Pondok Bambu Lestari Ibu Wati',
    hostName: 'Keluarga Ibu Wati',
    roomsAvailable: 2,
    capacityLabel: '2–4 Tamu',
    pricePerNight: 295000,
    highlights: ['Dekat jalur hutan pinus', 'Kebun teh halaman belakang', 'Sertifikasi CHSE'],
    description:
      'Suasana tenang di tepi kebun teh dengan kamar berdinding anyaman bambu rapi dan selimut tenun hangat.',
  },
];

export const VISITOR_TESTIMONIALS: VisitorTestimonial[] = [
  {
    id: 'testi-1',
    name: 'Ratri Kusumawardhani',
    role: 'Koordinator Program Kesiswaan',
    organization: 'SMP Alam Nusantara Semarang',
    packageVisited: 'Edukasi Kopi & Panen Organik',
    visitDate: 'Oktober 2026',
    beforeAfterQuote:
      'Sebelumnya kami kesulitan mencari lokasi outing edukatif yang tidak terasa seperti taman hiburan buatan. Setelah mengikuti program panen organik dan sangrai kopi bersama petani Lereng Asri, 38 siswa kami pulang dengan pemahaman nyata soal pertanian tanpa pestisida dan catatan lapangan yang lengkap.',
  },
  {
    id: 'testi-2',
    name: 'Bagas Prakoso',
    role: 'Kepala Keluarga (Rombongan 6 Orang)',
    organization: 'Yogyakarta',
    packageVisited: 'Paket Keluarga Akhir Pekan (2H1M)',
    visitDate: 'September 2026',
    beforeAfterQuote:
      'Kami mencari liburan singkat tanpa keramaian mal atau kemacetan tempat wisata populer. Menginap di Homestay Bapak Slamet membuat orang tua dan anak-anak kami benar-benar beristirahat—bangun pukul lima pagi disambut kabut lembah, sarapan nasi jagung hangat, lalu jalan santai ke curug.',
  },
];

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function calculatePackageEstimate(
  pkg: TourPackage,
  guests: number,
  isWeekend: boolean,
): {
  baseUnitPrice: number;
  weekendAdjustedUnit: number;
  discountAppliedPercent: number;
  finalUnitPrice: number;
  totalPrice: number;
} {
  const safeGuests = Math.max(1, guests);
  const weekendAdjustedUnit = Math.round(
    pkg.pricePerPerson * (1 + (isWeekend ? pkg.weekendSurchargePercent : 0) / 100),
  );
  const qualifiesGroupDiscount = safeGuests >= pkg.groupDiscountThreshold;
  const discountAppliedPercent = qualifiesGroupDiscount ? pkg.groupDiscountPercent : 0;
  const finalUnitPrice = Math.round(
    weekendAdjustedUnit * (1 - discountAppliedPercent / 100),
  );
  return {
    baseUnitPrice: pkg.pricePerPerson,
    weekendAdjustedUnit,
    discountAppliedPercent,
    finalUnitPrice,
    totalPrice: finalUnitPrice * safeGuests,
  };
}
