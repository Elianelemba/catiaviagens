import React from 'react';

interface HeaderProps {
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
  unreadCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenNotifications,
  onOpenProfile,
  unreadCount = 2,
}) => {
  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-[#f8faf9]/90 backdrop-blur-xl pt-safe shadow-[0_4px_20px_-2px_rgba(27,67,50,0.05)] border-b border-[#eceeed]/60">
      <div className="h-16 px-4 max-w-md mx-auto flex items-center justify-between">
        {/* Brand Lockup */}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-full bg-[#1b4332] flex items-center justify-center shadow-xs">
            <span className="material-symbols-outlined text-[#92f7c3] text-[22px]">flight_takeoff</span>
          </div>
          <div>
            <span className="text-[10px] font-bold text-[#006c48] uppercase tracking-wider block leading-none">
              Angola
            </span>
            <h1 className="text-[17px] font-bold text-[#012d1d] leading-tight tracking-tight">
              Cátia Viagens
            </h1>
          </div>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={onOpenNotifications}
            aria-label="Notificações"
            className="w-10 h-10 rounded-full flex items-center justify-center text-[#414844] hover:text-[#012d1d] hover:bg-[#eceeed] relative transition-colors"
          >
            <span className="material-symbols-outlined text-[24px]">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white animate-pulse" />
            )}
          </button>
          
          <button
            onClick={onOpenProfile}
            aria-label="Perfil do Utilizador"
            className="w-9 h-9 rounded-full bg-[#012d1d] flex items-center justify-center text-white hover:bg-[#1b4332] active:scale-95 transition-all shadow-xs"
          >
            <span className="material-symbols-outlined text-[18px]">person</span>
          </button>
        </div>
      </div>
    </header>
  );
};
