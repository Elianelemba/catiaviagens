import React, { useState } from 'react';
import { Destination, CategoryType } from '../types/travel';

interface ExploreViewProps {
  destinations: Destination[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onSelectDestination: (dest: Destination) => void;
  onOpenFilter: () => void;
  activeFilterCount: number;
}

export const ExploreView: React.FC<ExploreViewProps> = ({
  destinations,
  favorites,
  onToggleFavorite,
  onSelectDestination,
  onOpenFilter,
  activeFilterCount,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('tudo');
  const [sortOption, setSortOption] = useState<'Recomendados' | 'Menor Preço' | 'Mais Populares' | 'Avaliação'>('Recomendados');

  const filterCategories: { key: CategoryType; label: string; icon: string }[] = [
    { key: 'tudo', label: 'Tudo', icon: 'done' },
    { key: 'praias', label: 'Praias de Angola', icon: 'beach_access' },
    { key: 'ecoturismo', label: 'Ecoturismo', icon: 'forest' },
    { key: 'safari', label: 'Safaris & Parques', icon: 'pets' },
    { key: 'resorts', label: 'Resorts', icon: 'hotel' },
    { key: 'voos', label: 'Voos Domésticos', icon: 'flight' },
  ];

  // Filtering
  const filtered = destinations.filter((dest) => {
    // category filter
    if (selectedCategory !== 'tudo') {
      if (selectedCategory === 'voos') {
        if (!dest.badgeTag?.toLowerCase().includes('voo') && dest.id !== 'kalandula-pedras-negras') {
          return false;
        }
      } else if (dest.category !== selectedCategory) {
        return false;
      }
    }
    // search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = dest.title.toLowerCase().includes(q);
      const matchLoc = dest.location.toLowerCase().includes(q);
      const matchProv = dest.province.toLowerCase().includes(q);
      const matchDesc = dest.description.toLowerCase().includes(q);
      if (!matchTitle && !matchLoc && !matchProv && !matchDesc) {
        return false;
      }
    }
    return true;
  });

  // Sorting
  const sorted = [...filtered].sort((a, b) => {
    if (sortOption === 'Menor Preço') return a.priceAmount - b.priceAmount;
    if (sortOption === 'Mais Populares') return b.reviewsCount - a.reviewsCount;
    if (sortOption === 'Avaliação') return b.rating - a.rating;
    return 0; // default Recomendados
  });

  const cycleSort = () => {
    const options: ('Recomendados' | 'Menor Preço' | 'Mais Populares' | 'Avaliação')[] = [
      'Recomendados',
      'Menor Preço',
      'Mais Populares',
      'Avaliação',
    ];
    const nextIdx = (options.indexOf(sortOption) + 1) % options.length;
    setSortOption(options[nextIdx]);
  };

  return (
    <div className="flex flex-col w-full pb-6">
      {/* Search & Filter Header Area */}
      <div className="px-4 pt-2 pb-3 space-y-3">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#012d1d]/60 text-[20px]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Luanda, Benguela, Namibe..."
              aria-label="Pesquisar destinos em Angola"
              className="w-full h-12 pl-11 pr-10 rounded-full bg-white text-[#191c1c] text-sm font-medium shadow-[0_4px_20px_-2px_rgba(27,67,50,0.06)] border border-[#eceeed] focus:outline-none focus:ring-2 focus:ring-[#006c48] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                aria-label="Limpar pesquisa"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center text-[#717973] hover:text-[#012d1d] transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            )}
          </div>

          <button
            onClick={onOpenFilter}
            aria-label="Abrir filtros avançados"
            className="relative w-12 h-12 rounded-full bg-[#012d1d] flex items-center justify-center text-white shadow-[0_4px_16px_rgba(1,45,29,0.2)] active:scale-95 transition-transform shrink-0"
          >
            <span className="material-symbols-outlined text-[20px]">tune</span>
            {activeFilterCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#92f7c3] text-[#002113] text-[11px] font-bold flex items-center justify-center shadow-xs">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Category Pills Scroller */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 -mx-4 px-4">
          {filterCategories.map((cat) => {
            const isActive = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold shrink-0 transition-all ${
                  isActive
                    ? 'bg-[#012d1d] text-white shadow-sm'
                    : 'bg-white text-[#414844] shadow-[0_2px_8px_rgba(27,67,50,0.04)] border border-[#eceeed]/80 hover:bg-[#f2f4f3]'
                }`}
              >
                {isActive ? (
                  <span className="material-symbols-outlined text-[15px]">done</span>
                ) : (
                  <span className="material-symbols-outlined text-[15px] text-[#006c48]">
                    {cat.icon}
                  </span>
                )}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Header */}
      <div className="px-4 pt-1 pb-2 flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          <h2 className="text-[19px] font-bold text-[#012d1d] tracking-tight">Resultados</h2>
          <span className="text-xs font-semibold text-[#006c48] bg-[#c1ecd4]/60 px-2.5 py-0.5 rounded-full">
            {sorted.length} {sorted.length === 1 ? 'destino' : 'destinos'}
          </span>
        </div>

        <button
          onClick={cycleSort}
          className="flex items-center gap-1 text-[#414844] hover:text-[#012d1d] text-xs font-semibold py-1 transition-colors"
        >
          <span className="material-symbols-outlined text-[16px]">swap_vert</span>
          <span>{sortOption}</span>
        </button>
      </div>

      {/* Destination Cards List */}
      <div className="px-4 py-1 space-y-4">
        {sorted.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-[#eceeed]">
            <span className="material-symbols-outlined text-[36px] text-[#717973] mb-2">
              travel_explore
            </span>
            <h3 className="font-bold text-[#012d1d] text-base">Nenhum destino encontrado</h3>
            <p className="text-xs text-[#414844] mt-1 max-w-xs mx-auto">
              Experimente pesquisar por outra província como Luanda, Huíla, Benguela ou Malanje.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('tudo');
              }}
              className="mt-4 px-4 py-2 rounded-full bg-[#1b4332] text-white text-xs font-bold"
            >
              Ver todos os destinos
            </button>
          </div>
        ) : (
          sorted.map((dest) => {
            const isFav = favorites.includes(dest.id);
            return (
              <article
                key={dest.id}
                onClick={() => onSelectDestination(dest)}
                className="cursor-pointer bg-white rounded-2xl overflow-hidden shadow-[0_6px_24px_-4px_rgba(27,67,50,0.08)] border border-[#eceeed]/70 transition-all duration-300 hover:shadow-lg active:scale-[0.99] flex flex-col"
              >
                {/* Image Cover */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={dest.imageUrl}
                    alt={dest.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#012d1d]/80 via-transparent to-black/25 pointer-events-none" />

                  {/* Category Chip */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-[#92f7c3]/95 backdrop-blur-md px-3 py-1 rounded-full shadow-sm">
                    <span className="material-symbols-outlined text-[13px] text-[#002113]">
                      terrain
                    </span>
                    <span className="text-[10px] font-bold text-[#002113] uppercase tracking-wider">
                      {dest.subCategoryText}
                    </span>
                  </div>

                  {/* Favorite Heart Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(dest.id);
                    }}
                    aria-label="Salvar nos favoritos"
                    className={`absolute top-3 right-3 w-10 h-10 rounded-full bg-white/85 backdrop-blur-md flex items-center justify-center shadow-sm hover:bg-white active:scale-90 transition-all ${
                      isFav ? 'text-rose-500' : 'text-[#012d1d]'
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined text-[20px] transition-colors ${
                        isFav ? 'material-symbols-fill text-rose-500' : ''
                      }`}
                    >
                      {isFav ? 'favorite' : 'favorite_border'}
                    </span>
                  </button>

                  {/* Bottom Stats Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between pointer-events-none">
                    <div className="flex items-center gap-1 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full shadow-sm">
                      <span className="material-symbols-outlined text-[15px] text-amber-500 material-symbols-fill">
                        star
                      </span>
                      <span className="text-xs text-[#012d1d] font-bold">{dest.rating}</span>
                      <span className="text-[11px] text-[#414844]">({dest.reviewsCount})</span>
                    </div>

                    {dest.badgeTag && (
                      <div className="bg-[#1b4332]/95 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                        <span className="material-symbols-outlined text-[#92f7c3] text-[13px]">
                          bolt
                        </span>
                        <span className="text-[10px] font-bold text-white tracking-wide">
                          {dest.badgeTag}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Info Content */}
                <div className="p-4 flex flex-col justify-between gap-3 flex-1">
                  <div>
                    <div className="flex items-center gap-1 text-[#006c48] mb-1">
                      <span className="material-symbols-outlined text-[15px]">location_on</span>
                      <span className="text-[11px] font-bold uppercase tracking-wider">
                        {dest.location}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-[#012d1d] leading-snug">
                      {dest.title}
                    </h3>
                    <p className="text-xs text-[#414844] mt-1 line-clamp-2 leading-relaxed">
                      {dest.description}
                    </p>
                  </div>

                  {/* Price & Action */}
                  <div className="pt-2 flex items-center justify-between border-t border-[#eceeed]/60">
                    <div>
                      <span className="text-[11px] text-[#414844] block">A partir de</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-[20px] font-black text-[#012d1d] tracking-tight">
                          {dest.priceFormatted}
                        </span>
                        <span className="text-xs font-bold text-[#006c48]">Kz</span>
                        <span className="text-[11px] text-[#414844]">{dest.priceUnit}</span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectDestination(dest);
                      }}
                      className="px-4 py-2.5 rounded-full bg-[#1b4332] hover:bg-[#012d1d] text-white text-xs font-bold shadow-sm active:scale-95 transition-all flex items-center gap-1.5"
                    >
                      <span>Ver Detalhes</span>
                      <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>

      {/* Load More Button */}
      {sorted.length > 0 && (
        <div className="px-4 pt-3 pb-8 flex justify-center">
          <button
            onClick={() => {
              // Just a simulated feedback
              alert('Carregados todos os 28 destinos recomendados em Angola!');
            }}
            className="w-full py-3.5 rounded-full bg-[#eceeed] hover:bg-[#e1e3e2] text-[#012d1d] text-xs font-bold transition-colors flex items-center justify-center gap-2 active:scale-98"
          >
            <span className="material-symbols-outlined text-[18px]">expand_more</span>
            <span>Carregar mais destinos angolanos</span>
          </button>
        </div>
      )}
    </div>
  );
};
