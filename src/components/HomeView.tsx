import React from 'react';
import { Destination, UserProfile } from '../types/travel';

interface HomeViewProps {
  user: UserProfile;
  destinations: Destination[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onSelectDestination: (dest: Destination) => void;
  onNavigateToExplore: (category?: string) => void;
  onOpenNotifications: () => void;
  onOpenFilter: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  user,
  destinations,
  favorites,
  onToggleFavorite,
  onSelectDestination,
  onNavigateToExplore,
  onOpenNotifications,
  onOpenFilter,
}) => {
  const popularDestinations = destinations.slice(0, 4);

  return (
    <div className="flex flex-col w-full pb-8">
      {/* Dark Forest Green Hero Header */}
      <div className="bg-gradient-to-b from-[#012d1d] via-[#1b4332] to-[#1b4332] text-white pt-2 px-5 pb-7 rounded-b-[36px] shadow-md relative">
        {/* Profile and Quick Actions Bar */}
        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={user.avatarUrl}
                alt={user.name}
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-full object-cover border-2 border-[#92f7c3]/70"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#1b4332] rounded-full" />
            </div>
            <div>
              <p className="text-[11px] text-white/70 font-medium leading-none">Bem-vindo,</p>
              <h2 className="text-sm font-bold tracking-tight text-white mt-0.5">
                {user.nickname} 👋
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenNotifications}
              aria-label="Notificações"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white relative backdrop-blur-sm transition-transform active:scale-95"
            >
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-[#1b4332]" />
            </button>
            <button
              onClick={onOpenFilter}
              aria-label="Filtros"
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white backdrop-blur-sm transition-transform active:scale-95"
            >
              <span className="material-symbols-outlined text-[20px]">tune</span>
            </button>
          </div>
        </div>

        {/* Hero Title */}
        <div className="mt-5 mb-4">
          <h1 className="text-2xl font-extrabold leading-tight tracking-tight text-white">
            Para onde <br />
            <span className="text-[#92f7c3]">quer ir hoje?</span>
          </h1>
        </div>

        {/* Search Input Trigger */}
        <div
          onClick={() => onNavigateToExplore()}
          className="relative flex items-center cursor-pointer group"
        >
          <div className="relative w-full">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#1b4332]">
              <span className="material-symbols-outlined text-[20px]">search</span>
            </span>
            <input
              type="text"
              readOnly
              placeholder="Pesquisar destinos, hotéis, voos..."
              className="w-full bg-white text-gray-800 text-xs font-semibold pl-10 pr-12 py-3.5 rounded-2xl border-none outline-none shadow-sm cursor-pointer"
            />
            <button
              aria-label="Abrir busca"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <span className="bg-[#92f7c3]/30 text-[#012d1d] p-1 rounded-xl w-7 h-7 flex items-center justify-center">
                <span className="material-symbols-outlined text-[15px]">swap_vert</span>
              </span>
            </button>
          </div>
        </div>

        {/* Quick Travel Categories Carousel */}
        <div className="flex items-center gap-3.5 overflow-x-auto no-scrollbar pt-5 pb-1 text-center">
          <button
            onClick={() => onNavigateToExplore('resorts')}
            className="flex flex-col items-center gap-1.5 shrink-0 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-white/10 text-[#92f7c3] flex items-center justify-center shadow-sm border border-white/5 group-hover:bg-[#92f7c3] group-hover:text-[#002114] transition-all">
              <span className="material-symbols-outlined text-[22px]">hotel</span>
            </div>
            <span className="text-[11px] font-medium text-white/80 group-hover:text-white">Hotéis</span>
          </button>

          <button
            onClick={() => onNavigateToExplore('voos')}
            className="flex flex-col items-center gap-1.5 shrink-0 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#92f7c3] text-[#002114] flex items-center justify-center shadow-md shadow-[#92f7c3]/20">
              <span className="material-symbols-outlined text-[22px]">flight</span>
            </div>
            <span className="text-[11px] font-bold text-white">Voos</span>
          </button>

          <button
            onClick={() => onNavigateToExplore('praias')}
            className="flex flex-col items-center gap-1.5 shrink-0 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-white/10 text-[#92f7c3] flex items-center justify-center shadow-sm border border-white/5 group-hover:bg-[#92f7c3] group-hover:text-[#002114] transition-all">
              <span className="material-symbols-outlined text-[22px]">beach_access</span>
            </div>
            <span className="text-[11px] font-medium text-white/80 group-hover:text-white">Praias</span>
          </button>

          <button
            onClick={() => onNavigateToExplore('safari')}
            className="flex flex-col items-center gap-1.5 shrink-0 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-white/10 text-[#92f7c3] flex items-center justify-center shadow-sm border border-white/5 group-hover:bg-[#92f7c3] group-hover:text-[#002114] transition-all">
              <span className="material-symbols-outlined text-[22px]">pets</span>
            </div>
            <span className="text-[11px] font-medium text-white/80 group-hover:text-white">Safaris</span>
          </button>

          <button
            onClick={() => onNavigateToExplore('ecoturismo')}
            className="flex flex-col items-center gap-1.5 shrink-0 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-white/10 text-[#92f7c3] flex items-center justify-center shadow-sm border border-white/5 group-hover:bg-[#92f7c3] group-hover:text-[#002114] transition-all">
              <span className="material-symbols-outlined text-[22px]">forest</span>
            </div>
            <span className="text-[11px] font-medium text-white/80 group-hover:text-white">Natureza</span>
          </button>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="px-4 pt-5 space-y-6">
        {/* Popular Travel 2x2 Grid */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-base font-bold text-gray-900 tracking-tight">Destinos Populares</h3>
              <p className="text-xs text-gray-500">Mais visitados nesta temporada</p>
            </div>
            <button
              onClick={() => onNavigateToExplore()}
              className="text-xs font-bold text-[#006c48] hover:text-[#012d1d] flex items-center gap-0.5"
            >
              <span>Explorar</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {popularDestinations.map((dest) => {
              const isFav = favorites.includes(dest.id);
              return (
                <article
                  key={dest.id}
                  onClick={() => onSelectDestination(dest)}
                  className="bg-white rounded-2xl p-2.5 shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer group"
                >
                  <div className="relative w-full h-32 rounded-xl overflow-hidden bg-slate-100">
                    <img
                      src={dest.imageUrl}
                      alt={dest.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(dest.id);
                      }}
                      aria-label="Favoritar"
                      className={`absolute top-2 right-2 w-7 h-7 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center transition-colors ${
                        isFav ? 'text-rose-400' : 'text-white'
                      }`}
                    >
                      <span
                        className={`material-symbols-outlined text-[16px] ${
                          isFav ? 'material-symbols-fill' : ''
                        }`}
                      >
                        {isFav ? 'favorite' : 'favorite_border'}
                      </span>
                    </button>
                    <span className="absolute bottom-2 left-2 bg-[#012d1d]/90 backdrop-blur-sm text-white font-bold text-[10px] px-2 py-0.5 rounded-lg">
                      {dest.priceFormatted} Kz
                    </span>
                  </div>

                  <div className="pt-2 px-1">
                    <h4 className="font-bold text-xs text-gray-900 truncate">{dest.title}</h4>
                    <div className="flex items-center justify-between mt-1 text-[11px] text-gray-500">
                      <span className="truncate max-w-[80px]">{dest.province}</span>
                      <span className="flex items-center gap-0.5 text-amber-500 font-bold shrink-0">
                        <span className="material-symbols-outlined text-[13px] material-symbols-fill">
                          star
                        </span>
                        {dest.rating}
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Special Group Tours Banner */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-base font-bold text-gray-900 tracking-tight">Excursões Especiais</h3>
              <p className="text-xs text-gray-500">Grupos organizados com guias locais</p>
            </div>
            <span className="text-[10px] bg-emerald-100 text-[#012d1d] font-bold px-2 py-0.5 rounded-full">
              Promoção -15.000 Kz
            </span>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-stone-100 flex flex-col gap-3">
            <div className="flex gap-3 items-center">
              <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 relative">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7O2tD8SccQj5pAoyBP-QpS2WcXLRA25xEJtVzVCxTc-tHXqERWovZKBPfxpo6lz4UcROL8Bcwcttn6NituSWuBYcZldA1P5NJ5MXdVNehd6oh6bW4W1mX8Xh7VY6sGXEsHroXlID8LpIf-8cbFZmFdtQeFfoU8mEbG0ftx1KC-q8C3USvkazaKxID_0951OwLkF13fjicpHy3cNLcrqrlTR8LfW5Oo8f8iVLvTgFsl7Y8xd4WK9odBg"
                  alt="Sunset Cruise Baía de Luanda"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-1 left-1 bg-[#012d1d]/90 text-white font-bold text-[8px] px-1.5 py-0.5 rounded">
                  Sunset VIP
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 text-[11px] text-amber-500 font-bold mb-0.5">
                  <span className="material-symbols-outlined text-[13px] material-symbols-fill">
                    star
                  </span>
                  <span>4.8</span>
                  <span className="text-gray-400 font-normal">(89 avaliações)</span>
                </div>
                <h4 className="font-bold text-xs text-gray-900 truncate">
                  Passeio de Barco - Baía de Luanda
                </h4>
                <p className="text-[11px] text-gray-500 mt-0.5 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[12px] text-[#006c48]">
                    location_on
                  </span>
                  Luanda • Ilha
                </p>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-[#012d1d] font-black text-sm">35.000 Kz</span>
                  <span className="text-[10px] text-gray-400">/ pessoa</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-[11px] font-semibold text-gray-600 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px] text-[#006c48]">
                    groups
                  </span>
                  +12 confirmados neste sábado
                </span>
              </div>
              <button
                onClick={() => {
                  const dest = destinations.find((d) => d.id === 'ilha-de-luanda-sunset');
                  if (dest) onSelectDestination(dest);
                }}
                className="bg-[#1b4332] hover:bg-[#012d1d] text-white text-[11px] font-bold py-1.5 px-3.5 rounded-xl shadow-xs transition-colors flex items-center gap-1 active:scale-95"
              >
                <span>Reservar</span>
                <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>

        {/* Luxury Escapes Highlight */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-bold text-gray-900 tracking-tight">Estadias Exclusivas</h3>
            <button
              onClick={() => onNavigateToExplore('resorts')}
              className="text-xs font-bold text-[#006c48]"
            >
              Ver todas
            </button>
          </div>

          <div
            onClick={() => {
              const dest = destinations.find((d) => d.id === 'pululukwa-resort');
              if (dest) onSelectDestination(dest);
            }}
            className="bg-white rounded-2xl p-3 shadow-sm border border-stone-100 flex items-center gap-3 cursor-pointer hover:shadow-md transition-shadow"
          >
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHtCgwaPhVwufnYfqk_PZ9pB8V9-6Geo6p4fnEtR6NvxPdqUg0ymNc6NzrGTd-xZvDT1-I1chJKmeTDtyPk38AenifY_1caiEf9dc7TPR77vZyBv8yX3tGDva2eIOiNMz7Z7O6b9iXXOSUUZY-fRsAG47wk6D84OFdS0sBL4Mzt3ZX6viRm0wkvC_oMU5Bbelf9j6CFqmDbVvxq9zUHNowd300Zzpi9cwJyEK5phaiUTqN3WRadcMKaw"
              alt="Pululukwa Resort"
              referrerPolicy="no-referrer"
              className="w-18 h-18 rounded-xl object-cover shrink-0"
            />
            <div className="flex-1 min-w-0">
              <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full uppercase">
                Eco-Resort de Luxo
              </span>
              <h4 className="font-bold text-xs text-gray-900 mt-1 truncate">
                Pululukwa Resort & Spa
              </h4>
              <p className="text-[11px] text-gray-400">Lubango, Huíla • Chalé Panorâmico</p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs font-black text-[#012d1d]">
                  110.000 Kz <span className="text-[10px] font-normal text-gray-500">/noite</span>
                </span>
                <span className="text-[11px] text-amber-500 font-bold flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-[13px] material-symbols-fill">
                    star
                  </span>
                  4.9
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
