import React, { useState } from 'react';
import { Destination } from '../types/travel';

interface DestinationDetailModalProps {
  destination: Destination;
  onClose: () => void;
  onStartBooking: (dest: Destination) => void;
}

export const DestinationDetailModal: React.FC<DestinationDetailModalProps> = ({
  destination,
  onClose,
  onStartBooking,
}) => {
  const [activeTab, setActiveTab] = useState<'geral' | 'detalhes' | 'avaliacoes' | 'atividades'>('geral');
  const [selectedGalleryIdx, setSelectedGalleryIdx] = useState<number>(0);

  const images = destination.galleryUrls && destination.galleryUrls.length > 0
    ? destination.galleryUrls
    : [destination.imageUrl];

  return (
    <div className="fixed inset-0 z-50 bg-[#012d1d]/80 backdrop-blur-sm overflow-y-auto no-scrollbar flex justify-center">
      <div className="relative w-full max-w-md bg-[#faf8f5] min-h-screen flex flex-col pb-28 animate-in fade-in duration-200">
        
        {/* Hero Header with Media */}
        <div className="relative w-full h-[360px] select-none bg-slate-900">
          <img
            src={images[selectedGalleryIdx] || destination.imageUrl}
            alt={destination.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-all duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/85" />

          {/* Top Actions Bar */}
          <div className="absolute top-0 inset-x-0 pt-safe px-4 pt-3 flex items-center justify-between z-10">
            <button
              onClick={onClose}
              aria-label="Voltar"
              className="w-11 h-11 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-[#1b4332] shadow-md active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[22px]">arrow_back</span>
            </button>

            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: destination.title,
                    text: destination.description,
                    url: window.location.href,
                  }).catch(() => {});
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Link do destino copiado para a área de transferência!');
                }
              }}
              aria-label="Partilhar"
              className="w-11 h-11 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-[#1b4332] shadow-md active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[20px]">share</span>
            </button>
          </div>

          {/* Bottom Overlay Title and Mini Gallery */}
          <div className="absolute bottom-4 inset-x-0 px-5 flex items-end justify-between z-10 text-white">
            <div className="max-w-[70%]">
              <h1 className="text-2xl font-bold tracking-tight text-white mb-1 drop-shadow-sm leading-tight">
                {destination.title}
              </h1>
              <div className="flex items-center gap-1.5 text-xs text-white/90 font-medium mb-2">
                <span className="material-symbols-outlined text-[15px] text-emerald-400">
                  location_on
                </span>
                <span>{destination.location}</span>
              </div>

              {/* Stars & Rating */}
              <div className="flex items-center gap-1">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined text-[15px] material-symbols-fill"
                    >
                      star
                    </span>
                  ))}
                </div>
                <span className="text-xs font-bold text-white ml-1">
                  {destination.rating}/5
                </span>
                <span className="text-[11px] text-white/75">
                  ({destination.reviewsCount} avaliações)
                </span>
              </div>
            </div>

            {/* Mini Gallery Previews */}
            <div className="flex items-center space-x-1.5">
              {images.slice(0, 2).map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedGalleryIdx(idx)}
                  className={`w-10 h-10 rounded-xl overflow-hidden border ${
                    selectedGalleryIdx === idx ? 'border-[#92f7c3] ring-2 ring-[#92f7c3]' : 'border-white/60'
                  } shadow-md`}
                >
                  <img
                    src={img}
                    alt={`Preview ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
              <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-white/60 shadow-md bg-[#012d1d]/80 flex items-center justify-center">
                <span className="text-[10px] font-bold text-white tracking-tight">+12</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="bg-white border-b border-slate-100 px-5 pt-3 sticky top-0 z-20 shadow-xs">
          <ul className="flex items-center justify-between text-xs tracking-wide">
            <li className="relative pb-3">
              <button
                onClick={() => setActiveTab('geral')}
                className={`font-bold transition-colors ${
                  activeTab === 'geral' ? 'text-[#012d1d]' : 'text-slate-400'
                }`}
              >
                Visão Geral
              </button>
              {activeTab === 'geral' && (
                <div className="absolute bottom-0 inset-x-0 mx-auto w-6 h-[3px] bg-[#006c48] rounded-full" />
              )}
            </li>
            <li className="relative pb-3">
              <button
                onClick={() => setActiveTab('detalhes')}
                className={`font-medium transition-colors ${
                  activeTab === 'detalhes' ? 'text-[#012d1d] font-bold' : 'text-slate-400'
                }`}
              >
                Detalhes
              </button>
              {activeTab === 'detalhes' && (
                <div className="absolute bottom-0 inset-x-0 mx-auto w-6 h-[3px] bg-[#006c48] rounded-full" />
              )}
            </li>
            <li className="relative pb-3">
              <button
                onClick={() => setActiveTab('avaliacoes')}
                className={`font-medium transition-colors ${
                  activeTab === 'avaliacoes' ? 'text-[#012d1d] font-bold' : 'text-slate-400'
                }`}
              >
                Avaliações
              </button>
              {activeTab === 'avaliacoes' && (
                <div className="absolute bottom-0 inset-x-0 mx-auto w-6 h-[3px] bg-[#006c48] rounded-full" />
              )}
            </li>
            <li className="relative pb-3">
              <button
                onClick={() => setActiveTab('atividades')}
                className={`font-medium transition-colors ${
                  activeTab === 'atividades' ? 'text-[#012d1d] font-bold' : 'text-slate-400'
                }`}
              >
                Atividades
              </button>
              {activeTab === 'atividades' && (
                <div className="absolute bottom-0 inset-x-0 mx-auto w-6 h-[3px] bg-[#006c48] rounded-full" />
              )}
            </li>
          </ul>
        </nav>

        {/* Tab Content */}
        <main className="px-5 pt-4 space-y-5 flex-1">
          {activeTab === 'geral' && (
            <>
              {/* Specs Card */}
              <section className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
                <div className="grid grid-cols-3 divide-x divide-slate-100 text-center">
                  <div className="px-2 flex flex-col items-center justify-center">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Distância
                    </span>
                    <div className="flex items-center gap-1 text-[#012d1d] font-bold text-xs">
                      <span className="material-symbols-outlined text-[15px] text-emerald-600">
                        navigation
                      </span>
                      <span>{destination.distanceKm} KM</span>
                    </div>
                  </div>

                  <div className="px-2 flex flex-col items-center justify-center">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Duração
                    </span>
                    <div className="flex items-center gap-1 text-[#012d1d] font-bold text-xs">
                      <span className="material-symbols-outlined text-[15px] text-amber-500">
                        schedule
                      </span>
                      <span>{destination.durationText}</span>
                    </div>
                  </div>

                  <div className="px-2 flex flex-col items-center justify-center">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Clima
                    </span>
                    <div className="flex items-center gap-1 text-[#012d1d] font-bold text-xs">
                      <span className="material-symbols-outlined text-[15px] text-orange-500">
                        wb_sunny
                      </span>
                      <span>{destination.weatherText}</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Description Section */}
              <section className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-bold text-[#012d1d]">Descrição do Destino</h2>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                    {destination.badgeTag || 'Recomendado'}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-normal text-justify">
                  {destination.description}
                </p>
                {destination.gastronomyDescription && (
                  <p className="text-xs text-slate-600 leading-relaxed font-normal text-justify">
                    {destination.gastronomyDescription}
                  </p>
                )}
              </section>

              {/* What's included Section */}
              <section className="space-y-2.5 pt-1">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  O que está incluído
                </h3>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {destination.inclusions.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-2.5 bg-white rounded-xl border border-slate-100 shadow-xs"
                    >
                      <div className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[14px]">check</span>
                      </div>
                      <span className="text-slate-700 font-semibold text-[11px] leading-tight">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}

          {activeTab === 'detalhes' && (
            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-4 border border-slate-100 space-y-3">
                <h3 className="font-bold text-sm text-[#012d1d]">Informações de Acesso & Itinerário</h3>
                <div className="text-xs text-slate-600 space-y-2 leading-relaxed">
                  <p><strong>Ponto de Partida:</strong> Luanda (Aeroporto 4 de Fevereiro ou Hotéis da Marginal).</p>
                  <p><strong>Tipo de Viagem:</strong> Safari ecológico, litoral atlântico e relaxamento.</p>
                  <p><strong>Melhor Época:</strong> Todo o ano. Período do Cacimbo (Maio a Outubro) oferece temperaturas amenas e ondas ideais.</p>
                  <p><strong>Bagagem Recomendada:</strong> Roupa leve, protetor solar biodegradável, fato de banho e calçado para caminhada.</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-4 border border-slate-100 space-y-2">
                <h3 className="font-bold text-sm text-[#012d1d]">Garantias Cátia Viagens</h3>
                <ul className="text-xs text-slate-600 space-y-1.5">
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-emerald-600">verified_user</span>
                    <span>Agência Registada no Ministério da Hotelaria e Turismo (MINHOTUR)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-emerald-600">phone_android</span>
                    <span>Pagamento Seguro Multicaixa Express sem taxas de câmbio</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-emerald-600">support_agent</span>
                    <span>Suporte local permanente em português durante toda a viagem</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'avaliacoes' && (
            <div className="space-y-3">
              <div className="bg-white rounded-2xl p-4 border border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-3xl font-extrabold text-[#012d1d]">{destination.rating}</span>
                  <span className="text-xs text-slate-400"> / 5.0</span>
                  <div className="flex text-amber-400 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="material-symbols-outlined text-[14px] material-symbols-fill">
                        star
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-700 block">100% Recomendado</span>
                  <span className="text-[11px] text-slate-500">{destination.reviewsCount} viajantes verificados</span>
                </div>
              </div>

              {/* Review items */}
              <div className="bg-white rounded-2xl p-3 border border-slate-100 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-900 font-bold text-xs flex items-center justify-center">
                      M
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">Manuel dos Santos</p>
                      <p className="text-[10px] text-slate-400">Luanda • Setembro 2025</p>
                    </div>
                  </div>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="material-symbols-outlined text-[12px] material-symbols-fill">
                        star
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  "Experiência incrível organizada pela Cátia Viagens! O peixe grelhado em frente ao mar e as falésias foram inesquecíveis. O transporte foi pontual."
                </p>
              </div>

              <div className="bg-white rounded-2xl p-3 border border-slate-100 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-900 font-bold text-xs flex items-center justify-center">
                      T
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">Teresa Quaresma</p>
                      <p className="text-[10px] text-slate-400">Benguela • Agosto 2025</p>
                    </div>
                  </div>
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="material-symbols-outlined text-[12px] material-symbols-fill">
                        star
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  "Reserva super simples via Multicaixa Express. Fiquei fã e voltarei a viajar com a Cátia Viagens para a Huíla!"
                </p>
              </div>
            </div>
          )}

          {activeTab === 'atividades' && (
            <div className="space-y-3">
              <div className="bg-white rounded-2xl p-3 border border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">surfing</span>
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900">Aulas de Surf & Pranchas</h4>
                  <p className="text-[11px] text-slate-500">Instrutor federado com equipamento incluso</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-3 border border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">restaurant</span>
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900">Almoço Típico Costeiro</h4>
                  <p className="text-[11px] text-slate-500">Mufete tradicional, mariscos e sobremesas locais</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-3 border border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">photo_camera</span>
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-900">Trilha Fotográfica nas Falésias</h4>
                  <p className="text-[11px] text-slate-500">Miradouros panorâmicos para o Atlântico</p>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Fixed Sticky Bottom Bar */}
        <div className="fixed bottom-0 max-w-md w-full bg-white/95 backdrop-blur-md border-t border-slate-200/70 px-5 py-3.5 z-40 flex items-center justify-between shadow-lg">
          <div className="flex flex-col">
            <span className="text-[11px] font-semibold text-slate-400">Preço Especial</span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-extrabold text-[#012d1d] tracking-tight">
                {destination.priceFormatted} Kz
              </span>
              <span className="text-[11px] font-medium text-slate-500">
                {destination.priceUnit}
              </span>
            </div>
          </div>

          <button
            onClick={() => onStartBooking(destination)}
            className="bg-[#012d1d] hover:bg-[#1b4332] active:scale-95 text-white font-bold text-xs px-6 py-3.5 rounded-2xl shadow-md transition-all flex items-center gap-1.5"
          >
            <span>Reservar Agora</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

      </div>
    </div>
  );
};
