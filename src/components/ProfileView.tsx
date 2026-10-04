import React from 'react';
import { UserProfile } from '../types/travel';

interface ProfileViewProps {
  user: UserProfile;
  bookingsCount: number;
  favoritesCount: number;
  onNavigateToBookings: () => void;
  onNavigateToFavorites: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  bookingsCount,
  favoritesCount,
  onNavigateToBookings,
  onNavigateToFavorites,
}) => {
  return (
    <div className="flex flex-col w-full pb-8">
      {/* Profile Header */}
      <div className="px-4 pt-3 pb-3">
        <span className="text-[10px] font-bold text-[#006c48] uppercase tracking-wider block">
          Minha Conta
        </span>
        <h2 className="text-2xl font-bold text-[#012d1d] tracking-tight">
          Perfil do Viajante
        </h2>
      </div>

      <div className="px-4 space-y-4">
        {/* User Identity Card */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-[#eceeed] flex items-center gap-4">
          <div className="relative">
            <img
              src={user.avatarUrl}
              alt={user.name}
              referrerPolicy="no-referrer"
              className="w-16 h-16 rounded-full object-cover border-2 border-[#92f7c3]"
            />
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className="text-base font-bold text-[#012d1d] truncate">{user.name}</h3>
            </div>
            <p className="text-xs text-slate-500 truncate">{user.email}</p>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-[10px] bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-100 flex items-center gap-1">
                <span className="material-symbols-outlined text-[12px]">verified</span>
                BI Verificado
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                {user.biNumber}
              </span>
            </div>
          </div>
        </div>

        {/* Loyalty Points / Kwanza Miles Card */}
        <div className="bg-gradient-to-r from-[#1b4332] to-[#006c48] rounded-3xl p-4 text-white shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#92f7c3] tracking-wider block">
              Programa de Fidelidade
            </span>
            <span className="text-2xl font-black block mt-0.5">
              {user.kwanzaMiles.toLocaleString('pt-AO')}{' '}
              <span className="text-xs font-normal text-white/80">Kz Miles</span>
            </span>
            <span className="text-[11px] text-white/70 block mt-0.5">
              Equivalente a 14.500 Kz em descontos de voos TAAG
            </span>
          </div>

          <button
            onClick={() => alert('Pontos resgatáveis na finalização do próximo checkout!')}
            className="px-3.5 py-2 rounded-xl bg-white text-[#012d1d] text-xs font-bold shadow-sm active:scale-95 transition-transform shrink-0"
          >
            Resgatar
          </button>
        </div>

        {/* Quick Summary Grid */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onNavigateToBookings}
            className="p-3.5 bg-white rounded-2xl border border-[#eceeed] text-left hover:shadow-sm transition-all"
          >
            <span className="material-symbols-outlined text-[20px] text-[#006c48]">
              confirmation_number
            </span>
            <span className="text-lg font-bold text-[#012d1d] block mt-1">
              {bookingsCount}
            </span>
            <span className="text-[11px] text-slate-500">Reservas Activas</span>
          </button>

          <button
            onClick={onNavigateToFavorites}
            className="p-3.5 bg-white rounded-2xl border border-[#eceeed] text-left hover:shadow-sm transition-all"
          >
            <span className="material-symbols-outlined text-[20px] text-rose-500">
              favorite
            </span>
            <span className="text-lg font-bold text-[#012d1d] block mt-1">
              {favoritesCount}
            </span>
            <span className="text-[11px] text-slate-500">Destinos Favoritos</span>
          </button>
        </div>

        {/* Settings and Info Rows */}
        <div className="bg-white rounded-3xl p-2 border border-[#eceeed] divide-y divide-slate-100 text-xs">
          <div className="flex items-center justify-between p-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#f2f4f3] flex items-center justify-center text-[#012d1d]">
                <span className="material-symbols-outlined text-[17px]">phone_android</span>
              </div>
              <div>
                <span className="font-bold text-[#012d1d] block">Multicaixa Express</span>
                <span className="text-[11px] text-slate-500">+244 {user.phone}</span>
              </div>
            </div>
            <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
              Activo
            </span>
          </div>

          <div className="flex items-center justify-between p-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#f2f4f3] flex items-center justify-center text-[#012d1d]">
                <span className="material-symbols-outlined text-[17px]">payments</span>
              </div>
              <div>
                <span className="font-bold text-[#012d1d] block">Moeda Principal</span>
                <span className="text-[11px] text-slate-500">Kwanza Angolano (AOA / Kz)</span>
              </div>
            </div>
            <span className="text-[11px] font-bold text-slate-600">AOA</span>
          </div>

          <a
            href="https://wa.me/244923456789"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between p-3 hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#f2f4f3] flex items-center justify-center text-[#006c48]">
                <span className="material-symbols-outlined text-[17px]">chat</span>
              </div>
              <div>
                <span className="font-bold text-[#012d1d] block">Suporte Cátia Viagens</span>
                <span className="text-[11px] text-slate-500">Atendimento 24/7 via WhatsApp</span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[16px] text-slate-400">chevron_right</span>
          </a>

          <div className="flex items-center justify-between p-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#f2f4f3] flex items-center justify-center text-[#012d1d]">
                <span className="material-symbols-outlined text-[17px]">security</span>
              </div>
              <div>
                <span className="font-bold text-[#012d1d] block">Segurança & Termos</span>
                <span className="text-[11px] text-slate-500">Licença MINHOTUR Nº 042/AO</span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[16px] text-slate-400">chevron_right</span>
          </div>
        </div>

        {/* Logout button */}
        <button
          onClick={() => alert('Sessão mantida com segurança.')}
          className="w-full py-3 rounded-full text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 transition-colors flex items-center justify-center gap-1.5"
        >
          <span className="material-symbols-outlined text-[16px]">logout</span>
          <span>Terminar Sessão</span>
        </button>
      </div>
    </div>
  );
};
