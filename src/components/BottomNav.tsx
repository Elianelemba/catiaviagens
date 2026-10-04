import React from 'react';

export type TabType = 'inicio' | 'explorar' | 'favoritos' | 'reservas' | 'perfil';

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  favoritesCount: number;
  bookingsCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  favoritesCount,
  bookingsCount,
}) => {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 pb-safe pointer-events-none px-4 mb-2">
      <nav className="pointer-events-auto mx-auto max-w-md bg-[#1b4332]/95 backdrop-blur-xl rounded-full shadow-[0_12px_32px_-4px_rgba(22,56,50,0.35)] px-2 py-1 border border-white/10">
        <div className="flex items-center justify-between h-14">
          {/* Início */}
          <button
            onClick={() => onTabChange('inicio')}
            className={`flex-1 flex flex-col items-center justify-center min-h-[44px] transition-all rounded-full ${
              activeTab === 'inicio'
                ? 'text-[#92f7c3] font-bold scale-105'
                : 'text-[#e1e3e2]/75 hover:text-white'
            }`}
          >
            <span
              className={`material-symbols-outlined text-[21px] ${
                activeTab === 'inicio' ? 'material-symbols-fill' : ''
              }`}
            >
              home
            </span>
            <span className="text-[11px] font-semibold mt-0.5 tracking-tight">Início</span>
          </button>

          {/* Explorar */}
          <button
            onClick={() => onTabChange('explorar')}
            className={`flex-1 flex flex-col items-center justify-center min-h-[44px] transition-all rounded-full ${
              activeTab === 'explorar'
                ? 'text-[#92f7c3] font-bold scale-105'
                : 'text-[#e1e3e2]/75 hover:text-white'
            }`}
          >
            <span
              className={`material-symbols-outlined text-[21px] ${
                activeTab === 'explorar' ? 'material-symbols-fill' : ''
              }`}
            >
              travel_explore
            </span>
            <span className="text-[11px] font-semibold mt-0.5 tracking-tight">Explorar</span>
          </button>

          {/* Favoritos */}
          <button
            onClick={() => onTabChange('favoritos')}
            className={`flex-1 flex flex-col items-center justify-center min-h-[44px] transition-all relative rounded-full ${
              activeTab === 'favoritos'
                ? 'text-[#92f7c3] font-bold scale-105'
                : 'text-[#e1e3e2]/75 hover:text-white'
            }`}
          >
            <div className="relative">
              <span
                className={`material-symbols-outlined text-[21px] ${
                  activeTab === 'favoritos' ? 'material-symbols-fill' : ''
                }`}
              >
                favorite
              </span>
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-emerald-400 text-[#002114] text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </div>
            <span className="text-[11px] font-semibold mt-0.5 tracking-tight">Favoritos</span>
          </button>

          {/* Reservas */}
          <button
            onClick={() => onTabChange('reservas')}
            className={`flex-1 flex flex-col items-center justify-center min-h-[44px] transition-all relative rounded-full ${
              activeTab === 'reservas'
                ? 'text-[#92f7c3] font-bold scale-105'
                : 'text-[#e1e3e2]/75 hover:text-white'
            }`}
          >
            <div className="relative">
              <span
                className={`material-symbols-outlined text-[21px] ${
                  activeTab === 'reservas' ? 'material-symbols-fill' : ''
                }`}
              >
                confirmation_number
              </span>
              {bookingsCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-[#92f7c3] text-[#002114] text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {bookingsCount}
                </span>
              )}
            </div>
            <span className="text-[11px] font-semibold mt-0.5 tracking-tight">Reservas</span>
          </button>

          {/* Perfil */}
          <button
            onClick={() => onTabChange('perfil')}
            className={`flex-1 flex flex-col items-center justify-center min-h-[44px] transition-all rounded-full ${
              activeTab === 'perfil'
                ? 'text-[#92f7c3] font-bold scale-105'
                : 'text-[#e1e3e2]/75 hover:text-white'
            }`}
          >
            <span
              className={`material-symbols-outlined text-[21px] ${
                activeTab === 'perfil' ? 'material-symbols-fill' : ''
              }`}
            >
              account_circle
            </span>
            <span className="text-[11px] font-semibold mt-0.5 tracking-tight">Perfil</span>
          </button>
        </div>
      </nav>
    </div>
  );
};
