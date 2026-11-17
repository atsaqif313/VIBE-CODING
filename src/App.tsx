import { useCallback, useEffect, useState } from 'react';
import {
  PackageCategory,
  ScreenId,
  TOUR_PACKAGES,
  TourPackage,
} from './data/lerengAsriData';
import { TopNav } from './components/TopNav';
import { BerandaScreen } from './components/BerandaScreen';
import { PaketWisataScreen } from './components/PaketWisataScreen';
import { PackageDetailModal } from './components/PackageDetailModal';
import { BookingModal } from './components/BookingModal';
import { Footer } from './components/Footer';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ScreenId>(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#paket-wisata') {
      return ScreenId.PAKET_WISATA;
    }
    return ScreenId.BERANDA;
  });

  const [selectedCategory, setSelectedCategory] = useState<PackageCategory>(
    PackageCategory.SEMUA,
  );
  const [guestCount, setGuestCount] = useState<number>(4);
  const [detailPackage, setDetailPackage] = useState<TourPackage | null>(null);
  const [bookingState, setBookingState] = useState<{
    isOpen: boolean;
    pkg: TourPackage | null;
  }>({
    isOpen: false,
    pkg: null,
  });

  // Update document title to match active screen
  useEffect(() => {
    if (activeScreen === ScreenId.PAKET_WISATA) {
      document.title = 'Paket Wisata — Desa Wisata Lereng Asri';
    } else {
      document.title = 'Beranda — Desa Wisata Lereng Asri';
    }
  }, [activeScreen]);

  // Sync browser hash changes (Back/Forward support)
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#paket-wisata') {
        setActiveScreen(ScreenId.PAKET_WISATA);
      } else {
        setActiveScreen(ScreenId.BERANDA);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateScreen = useCallback((screen: ScreenId, sectionId?: string) => {
    setActiveScreen(screen);
    if (typeof window !== 'undefined') {
      const targetHash = screen === ScreenId.PAKET_WISATA ? '#paket-wisata' : '#beranda';
      if (window.location.hash !== targetHash) {
        window.history.pushState(null, '', targetHash);
      }
    }

    if (sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 60);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const handleNavigateToPackages = useCallback(
    (category: PackageCategory = PackageCategory.SEMUA) => {
      setSelectedCategory(category);
      navigateScreen(ScreenId.PAKET_WISATA);
    },
    [navigateScreen],
  );

  const handleOpenBooking = useCallback((pkg: TourPackage | null) => {
    setBookingState({
      isOpen: true,
      pkg: pkg ?? TOUR_PACKAGES[0],
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#fcf9f2] text-[#1c1c18]">
      <TopNav
        activeScreen={activeScreen}
        onNavigateScreen={navigateScreen}
        onOpenQuickBooking={() => handleOpenBooking(null)}
      />

      <div className="flex-1">
        {activeScreen === ScreenId.BERANDA ? (
          <BerandaScreen
            onNavigateToPackages={handleNavigateToPackages}
            onSelectPackageDetail={(pkg) => setDetailPackage(pkg)}
            onBookPackage={(pkg) => handleOpenBooking(pkg)}
          />
        ) : (
          <PaketWisataScreen
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            guestCount={guestCount}
            onChangeGuestCount={setGuestCount}
            onNavigateScreen={navigateScreen}
            onSelectPackageDetail={(pkg) => setDetailPackage(pkg)}
            onBookPackage={(pkg) => handleOpenBooking(pkg)}
          />
        )}
      </div>

      <Footer onNavigateScreen={navigateScreen} />

      <PackageDetailModal
        pkg={detailPackage}
        guests={guestCount}
        onClose={() => setDetailPackage(null)}
        onBookPackage={(pkg) => handleOpenBooking(pkg)}
      />

      <BookingModal
        isOpen={bookingState.isOpen}
        initialPackage={bookingState.pkg}
        initialGuests={guestCount}
        onClose={() => setBookingState({ isOpen: false, pkg: null })}
      />
    </div>
  );
}
