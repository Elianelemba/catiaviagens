import React from 'react';
import { Destination } from '../types/travel';

interface FavoritesViewProps {
  favorites: string[];
  destinations: Destination[];
  onToggleFavorite: (id: string) => void;
  onSelectDestination: (dest: Destination) => void;
  onNavigateToExplore: () => void;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  favorites,
  destinations,
  onToggleFavorite,
  onSelectDestination,
  onNavigateToExplore,
}) => {
  const favoriteDestinations = destinations.filter((d) => favorites.includes(d.id));

  return (
    <div className="flex flex-col w-full pb-8">
      {/* Title */}
      <div className="px-4 pt-3 pb-2">
        <span className="text-[10px] font-bold text-[#006c48] uppercase tracking-wider block">
          Lista de Desejos
        </span>
        <h2 className="text-2xl font-bold text-[#012d1d] tracking-tight">
          Meus Favoritos
        </h2>
        <p className="text-xs text-[#414844] mt-0.5">
          {favoriteDestinations.length}{' '}
          {favoriteDestinations.length === 1 ? 'destino guardado' : 'destinos guardados'} para as suas férias
        </p>
      </div>

      {favoriteDestinations.length === 0 ? (
        <div className="px-4 py-12 text-center">
          <div className="w-16 h-16 rounded-full bg-[#f2f4f3] flex items-center justify-center text-[#717973] mx-auto mb-3">
            <span className="material-symbols-outlined text-[32px]">favorite_border</span>
          </div>
          <h3 className="text-base font-bold text-[#012d1d]">Nenhum favorito ainda</h3>
          <p className="text-xs text-[#414844] mt-1 max-w-xs mx-auto">
            Toque no ícone de coração nos destinos que gostaria de visitar para acompanhar ofertas e disponibilidade.
          </p>
          <button
            onClick={onNavigateToExplore}
            className="mt-4 px-6 py-2.5 rounded-full bg-[#1b4332] text-white text-xs font-bold shadow-sm"
          >
            Explorar Destinos em Angola
          </button>
        </div>
      ) : (
        <div className="px-4 space-y-3 pt-2">
          {favoriteDestinations.map((dest) => (
            <div
              key={dest.id}
              onClick={() => onSelectDestination(dest)}
              className="bg-white rounded-2xl p-3 shadow-sm border border-[#eceeed] flex items-center gap-3.5 cursor-pointer hover:shadow-md transition-shadow relative"
            >
              <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                <img
                  src={dest.imageUrl}
                  alt={dest.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0 pr-6">
                <span className="text-[10px] text-[#006c48] font-bold block uppercase tracking-wider">
                  {dest.location}
                </span>
                <h4 className="text-sm font-bold text-[#012d1d] truncate mt-0.5">
                  {dest.title}
                </h4>
                <div className="flex items-center gap-1.5 text-xs text-amber-500 font-bold mt-0.5">
                  <span className="material-symbols-outlined text-[13px] material-symbols-fill">
                    star
                  </span>
                  <span>{dest.rating}</span>
                  <span className="text-[10px] text-slate-400 font-normal">
                    ({dest.reviewsCount})
                  </span>
                </div>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-sm font-black text-[#012d1d]">
                    {dest.priceFormatted} Kz
                  </span>
                  <span className="text-[10px] text-slate-500">{dest.priceUnit}</span>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(dest.id);
                }}
                aria-label="Remover dos favoritos"
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#f2f4f3] flex items-center justify-center text-rose-500 hover:bg-rose-50 transition-colors"
              >
                <span className="material-symbols-outlined text-[17px] material-symbols-fill">
                  favorite
                </span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
