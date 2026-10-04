import { useState } from 'react';
import { DESTINATIONS, INITIAL_BOOKINGS, INITIAL_USER } from './data/destinations';
import { Destination, Booking, UserProfile } from './types/travel';
import { Header } from './components/Header';
import { BottomNav, TabType } from './components/BottomNav';
import { HomeView } from './components/HomeView';
import { ExploreView } from './components/ExploreView';
import { BookingsView } from './components/BookingsView';
import { FavoritesView } from './components/FavoritesView';
import { ProfileView } from './components/ProfileView';
import { DestinationDetailModal } from './components/DestinationDetailModal';
import { CheckoutModal } from './components/CheckoutModal';
import { FlightTicketModal } from './components/FlightTicketModal';
import { FilterModal } from './components/FilterModal';
import { NotificationsModal } from './components/NotificationsModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('explorar');
  const [destinations] = useState<Destination[]>(DESTINATIONS);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [user] = useState<UserProfile>(INITIAL_USER);
  const [favorites, setFavorites] = useState<string[]>(['miradouro-da-lua', 'cabo-ledo']);
  
  // Modals & Navigation state
  const [selectedDestinationForDetail, setSelectedDestinationForDetail] = useState<Destination | null>(null);
  const [selectedDestinationForCheckout, setSelectedDestinationForCheckout] = useState<Destination | null>(null);
  const [selectedBookingForFlight, setSelectedBookingForFlight] = useState<Booking | null>(null);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isNotificationsModalOpen, setIsNotificationsModalOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(2);
  const [deviceFrameMode, setDeviceFrameMode] = useState<boolean>(true);

  // Filter state
  const [appliedFilters, setAppliedFilters] = useState<{
    province: string;
    maxPrice: number;
    category: string;
  } | null>(null);

  // Filtered destinations calculation
  const displayedDestinations = destinations.filter((dest) => {
    if (!appliedFilters) return true;
    if (appliedFilters.province !== 'Todas' && dest.province !== appliedFilters.province) {
      return false;
    }
    if (dest.priceAmount > appliedFilters.maxPrice) {
      return false;
    }
    if (appliedFilters.category !== 'todas' && dest.category !== appliedFilters.category) {
      return false;
    }
    return true;
  });

  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handlePaymentSuccess = (newBooking: Booking) => {
    setBookings((prev) => [newBooking, ...prev]);
    setSelectedDestinationForCheckout(null);
    setSelectedDestinationForDetail(null);
    setActiveTab('reservas');
  };

  const activeFilterCount = appliedFilters
    ? (appliedFilters.province !== 'Todas' ? 1 : 0) +
      (appliedFilters.maxPrice < 250000 ? 1 : 0) +
      (appliedFilters.category !== 'todas' ? 1 : 0)
    : 3; // Initial demo count matching screenshots

  return (
    <div className="min-h-screen bg-[#0d211a] flex flex-col items-center justify-start text-[#191c1c] sm:py-4">
      {/* Desktop Viewport Switcher Toolbar (Hidden on mobile phones) */}
      <div className="hidden sm:flex items-center justify-between w-full max-w-md px-3 py-1 mb-2 text-white/70 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#92f7c3]" />
          <span className="font-semibold text-white">Cátia Viagens Mobile Experience</span>
        </div>
        <button
          onClick={() => setDeviceFrameMode((prev) => !prev)}
          className="hover:text-white flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-full text-[11px]"
        >
          <span className="material-symbols-outlined text-[14px]">
            {deviceFrameMode ? 'fullscreen' : 'smartphone'}
          </span>
          <span>{deviceFrameMode ? 'Ecrã Cheio' : 'Moldura iPhone'}</span>
        </button>
      </div>

      {/* Main App Container */}
      <div
        className={`w-full bg-[#f8faf9] min-h-screen flex flex-col relative overflow-x-hidden ${
          deviceFrameMode
            ? 'max-w-md sm:min-h-[880px] sm:max-h-[920px] sm:rounded-[44px] sm:shadow-[0_24px_70px_rgba(0,0,0,0.6)] sm:border-[6px] sm:border-slate-800'
            : 'max-w-xl'
        }`}
      >
        {/* Top Header */}
        <Header
          onOpenNotifications={() => setIsNotificationsModalOpen(true)}
          onOpenProfile={() => setActiveTab('perfil')}
          unreadCount={unreadCount}
        />

        {/* Scrollable View Area */}
        <main className="flex-1 flex flex-col relative w-full pt-16 pb-24 bg-[#f8faf9] overflow-y-auto no-scrollbar">
          {activeTab === 'inicio' && (
            <HomeView
              user={user}
              destinations={destinations}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              onSelectDestination={(dest) => setSelectedDestinationForDetail(dest)}
              onNavigateToExplore={(cat) => {
                setActiveTab('explorar');
              }}
              onOpenNotifications={() => setIsNotificationsModalOpen(true)}
              onOpenFilter={() => setIsFilterModalOpen(true)}
            />
          )}

          {activeTab === 'explorar' && (
            <ExploreView
              destinations={displayedDestinations}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              onSelectDestination={(dest) => setSelectedDestinationForDetail(dest)}
              onOpenFilter={() => setIsFilterModalOpen(true)}
              activeFilterCount={activeFilterCount}
            />
          )}

          {activeTab === 'favoritos' && (
            <FavoritesView
              favorites={favorites}
              destinations={destinations}
              onToggleFavorite={handleToggleFavorite}
              onSelectDestination={(dest) => setSelectedDestinationForDetail(dest)}
              onNavigateToExplore={() => setActiveTab('explorar')}
            />
          )}

          {activeTab === 'reservas' && (
            <BookingsView
              bookings={bookings}
              onOpenFlightTicket={(booking) => setSelectedBookingForFlight(booking)}
              onSelectBookingForDetails={(booking) => {
                const matched = destinations.find((d) => d.title.includes(booking.title));
                if (matched) setSelectedDestinationForDetail(matched);
              }}
            />
          )}

          {activeTab === 'perfil' && (
            <ProfileView
              user={user}
              bookingsCount={bookings.filter((b) => !b.isHistory).length}
              favoritesCount={favorites.length}
              onNavigateToBookings={() => setActiveTab('reservas')}
              onNavigateToFavorites={() => setActiveTab('favoritos')}
            />
          )}
        </main>

        {/* Fixed Floating Bottom Tab Navigation */}
        <BottomNav
          activeTab={activeTab}
          onTabChange={(tab) => setActiveTab(tab)}
          favoritesCount={favorites.length}
          bookingsCount={bookings.filter((b) => !b.isHistory).length}
        />

        {/* Destination Detail Modal */}
        {selectedDestinationForDetail && (
          <DestinationDetailModal
            destination={selectedDestinationForDetail}
            onClose={() => setSelectedDestinationForDetail(null)}
            onStartBooking={(dest) => {
              setSelectedDestinationForCheckout(dest);
            }}
          />
        )}

        {/* Checkout & Payment Modal */}
        {selectedDestinationForCheckout && (
          <CheckoutModal
            destination={selectedDestinationForCheckout}
            onClose={() => setSelectedDestinationForCheckout(null)}
            onPaymentSuccess={handlePaymentSuccess}
          />
        )}

        {/* Digital Flight Ticket Boarding Pass Modal */}
        {selectedBookingForFlight && (
          <FlightTicketModal
            booking={selectedBookingForFlight}
            onClose={() => setSelectedBookingForFlight(null)}
          />
        )}

        {/* Filter Modal */}
        {isFilterModalOpen && (
          <FilterModal
            onClose={() => setIsFilterModalOpen(false)}
            onApplyFilters={(filters) => {
              setAppliedFilters(filters);
            }}
          />
        )}

        {/* Notifications Drawer */}
        {isNotificationsModalOpen && (
          <NotificationsModal
            onClose={() => setIsNotificationsModalOpen(false)}
            onClear={() => setUnreadCount(0)}
          />
        )}
      </div>
    </div>
  );
}
