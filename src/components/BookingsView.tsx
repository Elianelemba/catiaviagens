import React, { useState } from 'react';
import { Booking } from '../types/travel';

interface BookingsViewProps {
  bookings: Booking[];
  onOpenFlightTicket: (booking: Booking) => void;
  onSelectBookingForDetails?: (booking: Booking) => void;
}

export const BookingsView: React.FC<BookingsViewProps> = ({
  bookings,
  onOpenFlightTicket,
}) => {
  const [activeTab, setActiveTab] = useState<'confirmadas' | 'historico'>('confirmadas');

  const activeBookings = bookings.filter((b) => !b.isHistory);
  const historyBookings = bookings.filter((b) => b.isHistory);

  return (
    <div className="flex flex-col w-full pb-8">
      {/* Page Title */}
      <div className="px-4 pt-3 pb-2">
        <div className="flex items-center justify-between mb-1">
          <div>
            <span className="text-[10px] font-bold text-[#006c48] uppercase tracking-wider block">
              Minha Viagem
            </span>
            <h2 className="text-2xl font-bold text-[#012d1d] tracking-tight">
              Minhas Reservas
            </h2>
          </div>
          <button
            onClick={() => alert('Filtro de reservas')}
            aria-label="Filtrar viagens"
            className="w-10 h-10 rounded-full bg-[#eceeed] flex items-center justify-center text-[#012d1d] active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-[20px]">tune</span>
          </button>
        </div>
        <p className="text-xs text-[#414844]">
          Acompanhe voos, estadias e itinerários em Angola.
        </p>
      </div>

      {/* Segmented Tablist */}
      <div className="px-4 py-2">
        <div className="p-1 bg-[#eceeed] rounded-full flex items-center justify-between" role="tablist">
          <button
            role="tab"
            aria-selected={activeTab === 'confirmadas'}
            onClick={() => setActiveTab('confirmadas')}
            className={`flex-1 py-2 rounded-full text-xs font-bold text-center transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'confirmadas'
                ? 'bg-[#1b4332] text-white shadow-sm'
                : 'text-[#414844] hover:text-[#012d1d]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#92f7c3] animate-pulse" />
            Confirmadas ({activeBookings.length})
          </button>

          <button
            role="tab"
            aria-selected={activeTab === 'historico'}
            onClick={() => setActiveTab('historico')}
            className={`flex-1 py-2 rounded-full text-xs font-bold text-center transition-all ${
              activeTab === 'historico'
                ? 'bg-[#1b4332] text-white shadow-sm'
                : 'text-[#414844] hover:text-[#012d1d]'
            }`}
          >
            Histórico ({historyBookings.length})
          </button>
        </div>
      </div>

      {/* Active Confirmadas Content */}
      {activeTab === 'confirmadas' && (
        <div className="flex flex-col gap-4 px-4 pt-1">
          {activeBookings.map((b) => {
            const hasFlight = !!b.flight;
            return (
              <div
                key={b.id}
                className="w-full bg-white rounded-2xl shadow-[0_4px_20px_-2px_rgba(27,67,50,0.06)] border border-[#eceeed]/80 overflow-hidden"
              >
                {/* Visual Banner */}
                <div className="relative w-full h-44 bg-slate-100">
                  <img
                    src={b.imageUrl}
                    alt={b.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#012d1d]/85 via-transparent to-black/25" />

                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-[#92f7c3] text-[#002113] text-[10px] font-bold flex items-center gap-1 shadow-sm">
                      <span className="material-symbols-outlined text-[13px]">check_circle</span>
                      Confirmado
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#012d1d] text-[10px] font-bold">
                      {b.typeBadge}
                    </span>
                  </div>

                  <button
                    onClick={() => alert(`Reserva ${b.referenceNumber} partilhada`)}
                    aria-label="Partilhar reserva"
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center active:scale-90 transition-transform"
                  >
                    <span className="material-symbols-outlined text-[17px]">share</span>
                  </button>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[11px] font-bold text-[#92f7c3] block">{b.location}</span>
                    <h3 className="text-base font-bold text-white leading-tight">{b.title}</h3>
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-4 flex flex-col gap-3">
                  {hasFlight && b.flight && (
                    <div className="bg-[#f2f4f3] rounded-xl p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-[#1b4332] flex items-center justify-center text-white">
                            <span className="material-symbols-outlined text-[15px]">airlines</span>
                          </div>
                          <div>
                            <span className="text-[11px] font-bold text-[#012d1d] block leading-none">
                              {b.flight.airline}
                            </span>
                            <span className="text-[10px] text-[#414844]">
                              Voo {b.flight.flightNumber} • {b.flight.aircraft}
                            </span>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-[#006c48] bg-[#e1e3e2] px-2 py-0.5 rounded-full">
                          Directo
                        </span>
                      </div>

                      <div className="mt-3 flex items-center justify-between px-2">
                        <div className="text-left">
                          <span className="text-xl font-black text-[#012d1d] block leading-none">
                            {b.flight.departureCode}
                          </span>
                          <span className="text-[10px] text-[#414844]">{b.flight.departureCity}</span>
                          <span className="text-xs text-[#012d1d] font-bold block mt-0.5">
                            {b.flight.departureTime}
                          </span>
                        </div>

                        <div className="flex-1 px-4 flex flex-col items-center">
                          <div className="w-full flex items-center relative">
                            <div className="flex-1 h-[2px] bg-[#006c48]/30" />
                            <div className="w-6 h-6 rounded-full bg-[#92f7c3] flex items-center justify-center text-[#012d1d] z-10 shadow-xs">
                              <span className="material-symbols-outlined text-[14px]">flight</span>
                            </div>
                            <div className="flex-1 h-[2px] bg-[#006c48]/30" />
                          </div>
                          <span className="text-[10px] font-semibold text-[#414844] mt-1">
                            {b.flight.duration}
                          </span>
                        </div>

                        <div className="text-right">
                          <span className="text-xl font-black text-[#012d1d] block leading-none">
                            {b.flight.arrivalCode}
                          </span>
                          <span className="text-[10px] text-[#414844]">{b.flight.arrivalCity}</span>
                          <span className="text-xs text-[#012d1d] font-bold block mt-0.5">
                            {b.flight.arrivalTime}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Dates & Guests */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-2 p-2.5 bg-[#f8faf9] rounded-xl border border-[#eceeed]">
                      <span className="material-symbols-outlined text-[#006c48] text-[18px]">
                        calendar_today
                      </span>
                      <div>
                        <span className="text-[9px] text-[#717973] uppercase font-bold block">
                          Data da Viagem
                        </span>
                        <span className="text-[11px] font-bold text-[#012d1d]">
                          {b.dateRange}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 p-2.5 bg-[#f8faf9] rounded-xl border border-[#eceeed]">
                      <span className="material-symbols-outlined text-[#006c48] text-[18px]">
                        group
                      </span>
                      <div>
                        <span className="text-[9px] text-[#717973] uppercase font-bold block">
                          Passageiros
                        </span>
                        <span className="text-[11px] font-bold text-[#012d1d]">
                          {b.travelersText}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Info */}
                  <div className="p-3 bg-[#f8faf9] rounded-xl border border-[#eceeed] flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[#006c48] text-[15px]">
                          verified
                        </span>
                        <span className="text-xs text-[#414844] font-semibold">
                          Pago via {b.paymentMethod}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 block font-mono">
                        Ref: {b.referenceNumber}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-[#414844] block">Valor Total</span>
                      <span className="text-base font-black text-[#012d1d]">
                        {b.totalFormatted}{' '}
                        <span className="text-xs text-[#006c48] font-bold">Kz</span>
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => onOpenFlightTicket(b)}
                      className="flex-1 h-12 rounded-full bg-[#012d1d] hover:bg-[#1b4332] text-white text-xs font-bold flex items-center justify-center gap-2 active:scale-98 transition-all shadow-sm"
                    >
                      <span className="material-symbols-outlined text-[18px]">qr_code_2</span>
                      <span>Ver Bilhete Digital</span>
                    </button>
                    <button
                      onClick={() => alert(`Comprovativo ${b.referenceNumber} pronto a exportar`)}
                      aria-label="Mais opções"
                      className="h-12 px-4 rounded-full bg-[#eceeed] text-[#012d1d] flex items-center justify-center active:scale-95 transition-transform"
                    >
                      <span className="material-symbols-outlined text-[18px]">more_horiz</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Dedicated Support Card */}
          <div className="w-full bg-gradient-to-br from-[#1b4332] to-[#012d1d] rounded-2xl p-4 text-white shadow-md relative overflow-hidden">
            <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-[#92f7c3]/10 pointer-events-none" />
            <div className="flex items-start gap-3 relative z-10">
              <div className="w-11 h-11 rounded-full bg-[#92f7c3] text-[#012d1d] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[22px]">support_agent</span>
              </div>
              <div className="flex-1">
                <span className="text-[10px] font-bold text-[#92f7c3] uppercase tracking-wider block">
                  Atendimento Dedicado
                </span>
                <h4 className="text-sm font-bold text-white mt-0.5">
                  Precisa de Apoio na Reserva?
                </h4>
                <p className="text-xs text-white/80 mt-1 leading-relaxed">
                  Nossos consultores locais da Cátia Viagens estão disponíveis para alterações ou dúvidas.
                </p>
              </div>
            </div>

            <div className="mt-4 pt-2 flex items-center gap-2 relative z-10">
              <a
                href="https://wa.me/244923456789"
                target="_blank"
                rel="noreferrer"
                className="flex-1 h-11 rounded-full bg-[#92f7c3] text-[#002113] text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm active:scale-98 transition-transform"
              >
                <span className="material-symbols-outlined text-[17px]">chat</span>
                <span>WhatsApp Cátia</span>
              </a>
              <a
                href="tel:+244923456789"
                className="h-11 px-4 rounded-full bg-white/10 backdrop-blur-md text-white text-xs font-bold flex items-center justify-center gap-1.5 active:bg-white/20 transition-colors"
              >
                <span className="material-symbols-outlined text-[17px]">call</span>
                <span>Ligar</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* History Content */}
      {activeTab === 'historico' && (
        <div className="flex flex-col gap-3 px-4 pt-1">
          {historyBookings.map((h) => (
            <div
              key={h.id}
              className="w-full bg-white rounded-2xl p-4 shadow-sm border border-[#eceeed] flex flex-col gap-2.5 opacity-95"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-slate-400" />
                  <span className="text-[10px] font-bold text-slate-500 uppercase">
                    Concluído • {h.historyDate}
                  </span>
                </div>
                <span className="text-[10px] text-[#006c48] font-bold bg-[#f2f4f3] px-2.5 py-0.5 rounded-full">
                  {h.typeBadge}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                  <img
                    src={h.imageUrl}
                    alt={h.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-[#012d1d] truncate">{h.title}</h4>
                  <span className="text-[11px] text-[#414844] block">{h.dateRange}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#eceeed] flex items-center justify-between">
                <span className="text-xs text-[#414844]">Total: {h.totalFormatted} Kz</span>
                <button
                  onClick={() => alert(`A preparar nova reserva para ${h.title}`)}
                  className="px-4 py-1.5 rounded-full bg-[#eceeed] hover:bg-[#e1e3e2] text-[#012d1d] text-[11px] font-bold active:scale-95 transition-transform"
                >
                  Reservar Novamente
                </button>
              </div>
            </div>
          ))}

          {/* Archived archive box */}
          <div className="p-6 rounded-2xl bg-[#f2f4f3] text-center flex flex-col items-center mt-2 border border-[#eceeed]">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#006c48] mb-2 shadow-xs">
              <span className="material-symbols-outlined text-[24px]">archive</span>
            </div>
            <span className="text-xs font-bold text-[#012d1d]">
              Deseja buscar viagens mais antigas?
            </span>
            <p className="text-[11px] text-[#414844] mt-1 max-w-xs leading-relaxed">
              Aceda ao arquivo anual para relatórios de despesas e comprovativos de bilheteira.
            </p>
            <button
              onClick={() => alert('Arquivo de 2024 enviado para o seu email elianelemba3@gmail.com')}
              className="mt-3 px-5 py-2 rounded-full bg-white text-[#012d1d] text-xs font-bold shadow-xs active:scale-95 transition-transform"
            >
              Solicitar Histórico 2024
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
