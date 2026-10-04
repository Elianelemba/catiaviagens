import React from 'react';
import { Booking } from '../types/travel';

interface FlightTicketModalProps {
  booking: Booking;
  onClose: () => void;
}

export const FlightTicketModal: React.FC<FlightTicketModalProps> = ({
  booking,
  onClose,
}) => {
  const flight = booking.flight || {
    airline: 'TAAG Linhas Aéreas',
    flightNumber: 'DT-130',
    aircraft: 'Boeing 737-700',
    departureCode: 'LAD',
    departureCity: 'Luanda',
    departureTime: '08:30',
    arrivalCode: 'SDD',
    arrivalCity: 'Lubango',
    arrivalTime: '10:00',
    duration: '1h 30m',
    seat: '12A',
    gate: '04',
    terminal: 'Terminal 1',
    bookingClass: 'Económica Flex',
  };

  return (
    <div className="fixed inset-0 z-60 bg-[#012d1d]/85 backdrop-blur-md overflow-y-auto no-scrollbar flex justify-center">
      <div className="relative w-full max-w-md bg-[#f8faf9] min-h-screen flex flex-col pb-12 animate-in fade-in duration-200">
        
        {/* Top Bar matching Image 4 / HTML 2 */}
        <header className="sticky top-0 inset-x-0 z-30 bg-[#f8faf9]/95 backdrop-blur-xl pt-safe shadow-[0_4px_20px_-2px_rgba(27,67,50,0.05)] border-b border-[#eceeed]">
          <div className="h-16 px-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                aria-label="Voltar"
                className="w-10 h-10 flex items-center justify-center text-[#012d1d] rounded-full hover:bg-[#eceeed] transition-colors"
              >
                <span className="material-symbols-outlined text-[24px]">arrow_back</span>
              </button>
              <h1 className="text-base font-bold text-[#012d1d] leading-tight truncate max-w-[200px]">
                Detalhes Do Voo
              </h1>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => alert('Bilhete digital partilhado')}
                aria-label="Partilhar"
                className="w-10 h-10 flex items-center justify-center text-[#414844] hover:text-[#012d1d] transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">share</span>
              </button>
              <div className="w-8 h-8 rounded-full bg-[#012d1d] flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-[17px]">person</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <div className="px-4 py-4 space-y-4">
          
          {/* Boarding Pass Card */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-lg border border-[#eceeed] relative">
            {/* Top Pass Header */}
            <div className="bg-[#1b4332] text-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#92f7c3]">
                    <span className="material-symbols-outlined text-[18px]">airlines</span>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold leading-none">{flight.airline}</h3>
                    <span className="text-[10px] text-[#92f7c3]">Voo {flight.flightNumber} • {flight.aircraft}</span>
                  </div>
                </div>
                <span className="bg-[#92f7c3] text-[#002113] text-[9px] font-black px-2 py-0.5 rounded-full uppercase">
                  Confirmado
                </span>
              </div>

              {/* Route Display */}
              <div className="mt-5 flex items-center justify-between px-2">
                <div className="text-left">
                  <span className="text-3xl font-black text-white block leading-none tracking-tight">
                    {flight.departureCode}
                  </span>
                  <span className="text-xs text-white/70 block mt-0.5">{flight.departureCity}</span>
                  <span className="text-sm font-bold text-[#92f7c3] block mt-1">
                    {flight.departureTime}
                  </span>
                </div>

                <div className="flex-1 px-4 flex flex-col items-center">
                  <div className="w-full flex items-center relative">
                    <div className="flex-1 h-[2px] bg-white/30" />
                    <div className="w-7 h-7 rounded-full bg-[#92f7c3] flex items-center justify-center text-[#012d1d] z-10 shadow-xs">
                      <span className="material-symbols-outlined text-[15px]">flight</span>
                    </div>
                    <div className="flex-1 h-[2px] bg-white/30" />
                  </div>
                  <span className="text-[10px] font-semibold text-white/80 mt-1">
                    {flight.duration} • Directo
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-3xl font-black text-white block leading-none tracking-tight">
                    {flight.arrivalCode}
                  </span>
                  <span className="text-xs text-white/70 block mt-0.5">{flight.arrivalCity}</span>
                  <span className="text-sm font-bold text-[#92f7c3] block mt-1">
                    {flight.arrivalTime}
                  </span>
                </div>
              </div>
            </div>

            {/* Perforated Divider */}
            <div className="relative flex items-center justify-between px-3 py-1 bg-white">
              <div className="w-4 h-8 rounded-r-full bg-[#f8faf9] -ml-5 border-r border-[#eceeed]" />
              <div className="flex-1 border-t-2 border-dashed border-slate-200 mx-2" />
              <div className="w-4 h-8 rounded-l-full bg-[#f8faf9] -mr-5 border-l border-[#eceeed]" />
            </div>

            {/* Boarding Info Grid */}
            <div className="p-5 pt-2 space-y-4">
              <div className="grid grid-cols-3 gap-2 text-center bg-[#f2f4f3] rounded-2xl p-3">
                <div>
                  <span className="text-[9px] uppercase font-bold text-slate-400 block">Assento</span>
                  <span className="text-base font-black text-[#012d1d]">{flight.seat}</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase font-bold text-slate-400 block">Porta</span>
                  <span className="text-base font-black text-[#012d1d]">{flight.gate}</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase font-bold text-slate-400 block">Terminal</span>
                  <span className="text-base font-black text-[#012d1d]">{flight.terminal}</span>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span className="text-slate-400">Passageiro:</span>
                  <span className="font-bold text-[#012d1d]">{booking.leadPassengerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Classe:</span>
                  <span className="font-semibold text-[#012d1d]">{flight.bookingClass}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Data de Embarque:</span>
                  <span className="font-semibold text-[#012d1d]">{booking.dateRange}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Bagagem:</span>
                  <span className="font-semibold text-[#006c48]">2x 23kg Porão + 1x 8kg Cabine</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Localizador TAAG:</span>
                  <span className="font-mono font-bold text-[#012d1d]">{booking.referenceNumber}</span>
                </div>
              </div>

              {/* QR Code Graphic */}
              <div className="pt-3 pb-1 border-t border-slate-100 flex flex-col items-center">
                <div className="p-3 bg-white border border-slate-200 rounded-2xl shadow-xs">
                  <svg
                    className="w-36 h-36"
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Outer corners */}
                    <rect x="5" y="5" width="28" height="28" rx="4" stroke="#012d1d" strokeWidth="4" />
                    <rect x="12" y="12" width="14" height="14" fill="#012d1d" />
                    <rect x="67" y="5" width="28" height="28" rx="4" stroke="#012d1d" strokeWidth="4" />
                    <rect x="74" y="12" width="14" height="14" fill="#012d1d" />
                    <rect x="5" y="67" width="28" height="28" rx="4" stroke="#012d1d" strokeWidth="4" />
                    <rect x="12" y="74" width="14" height="14" fill="#012d1d" />
                    
                    {/* Matrix patterns */}
                    <rect x="42" y="10" width="6" height="6" fill="#012d1d" />
                    <rect x="52" y="10" width="6" height="6" fill="#012d1d" />
                    <rect x="42" y="22" width="6" height="6" fill="#012d1d" />
                    <rect x="52" y="22" width="6" height="6" fill="#012d1d" />
                    <rect x="10" y="42" width="6" height="6" fill="#012d1d" />
                    <rect x="22" y="42" width="6" height="6" fill="#012d1d" />
                    <rect x="36" y="36" width="28" height="28" rx="3" fill="#006c48" />
                    <circle cx="50" cy="50" r="8" fill="#92f7c3" />
                    <rect x="72" y="42" width="6" height="6" fill="#012d1d" />
                    <rect x="84" y="42" width="6" height="6" fill="#012d1d" />
                    <rect x="42" y="72" width="6" height="6" fill="#012d1d" />
                    <rect x="52" y="72" width="6" height="6" fill="#012d1d" />
                    <rect x="68" y="72" width="18" height="6" fill="#012d1d" />
                    <rect x="68" y="84" width="8" height="8" fill="#012d1d" />
                    <rect x="82" y="84" width="10" height="8" fill="#012d1d" />
                  </svg>
                </div>
                <span className="text-[10px] text-slate-400 font-mono mt-2">
                  Apresente este código no leitor do aeroporto
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <button
              onClick={() => alert('Bilhete digital descarregado em PDF!')}
              className="w-full h-12 rounded-full bg-[#012d1d] hover:bg-[#1b4332] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
              <span>Descarregar Bilhete PDF</span>
            </button>

            <button
              onClick={() => alert('Bilhete adicionado à carteira móvel!')}
              className="w-full h-12 rounded-full bg-white hover:bg-[#f2f4f3] text-[#012d1d] text-xs font-bold flex items-center justify-center gap-2 border border-slate-200"
            >
              <span className="material-symbols-outlined text-[18px]">wallet</span>
              <span>Guardar na Wallet</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
