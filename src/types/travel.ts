export type CategoryType = 'tudo' | 'praias' | 'ecoturismo' | 'safari' | 'resorts' | 'voos';

export interface Destination {
  id: string;
  title: string;
  location: string;
  province: string;
  category: CategoryType;
  subCategoryText: string;
  badgeTag?: string;
  priceAmount: number;
  priceFormatted: string;
  priceUnit: string;
  rating: number;
  reviewsCount: number;
  imageUrl: string;
  galleryUrls?: string[];
  description: string;
  gastronomyDescription?: string;
  distanceKm: number;
  durationText: string;
  weatherText: string;
  inclusions: string[];
  highlights?: string[];
  instantBooking?: boolean;
  popular?: boolean;
}

export type PaymentMethodId = 'mcx' | 'ref' | 'transfer' | 'card';

export interface Booking {
  id: string;
  referenceNumber: string;
  title: string;
  location: string;
  typeBadge: string;
  status: 'confirmado' | 'pendente' | 'concluido' | 'cancelado';
  dateRange: string;
  imageUrl: string;
  travelersText: string;
  leadPassengerName: string;
  flight?: {
    airline: string;
    flightNumber: string;
    aircraft: string;
    departureCode: string;
    departureCity: string;
    departureTime: string;
    arrivalCode: string;
    arrivalCity: string;
    arrivalTime: string;
    duration: string;
    seat: string;
    gate: string;
    terminal: string;
    bookingClass: string;
  };
  paymentMethod: string;
  totalAmount: number;
  totalFormatted: string;
  isHistory?: boolean;
  historyDate?: string;
}

export interface UserProfile {
  name: string;
  nickname: string;
  email: string;
  phone: string;
  biNumber: string;
  isBiVerified: boolean;
  kwanzaMiles: number;
  avatarUrl: string;
}
