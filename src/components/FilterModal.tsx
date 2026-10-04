import React, { useState } from 'react';

interface FilterModalProps {
  onClose: () => void;
  onApplyFilters: (filters: { province: string; maxPrice: number; category: string }) => void;
}

export const FilterModal: React.FC<FilterModalProps> = ({
  onClose,
  onApplyFilters,
}) => {
  const [selectedProvince, setSelectedProvince] = useState<string>('Todas');
  const [maxPrice, setMaxPrice] = useState<number>(200000);
  const [selectedCategory, setSelectedCategory] = useState<string>('todas');

  const provinces = ['Todas', 'Luanda', 'Huíla', 'Benguela', 'Malanje', 'Namibe'];

  return (
    <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
      <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-5 space-y-4 shadow-2xl animate-in slide-in-from-bottom duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#012d1d] text-[22px]">tune</span>
            <h3 className="font-bold text-base text-[#012d1d]">Filtros Avançados</h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar filtros"
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Province selector */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-[#012d1d] block">Província de Angola</label>
          <div className="flex flex-wrap gap-1.5">
            {provinces.map((prov) => (
              <button
                key={prov}
                onClick={() => setSelectedProvince(prov)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedProvince === prov
                    ? 'bg-[#012d1d] text-white shadow-xs'
                    : 'bg-[#f2f4f3] text-slate-600 hover:bg-slate-200'
                }`}
              >
                {prov}
              </button>
            ))}
          </div>
        </div>

        {/* Max price slider */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-[#012d1d]">Preço Máximo por Pessoa</label>
            <span className="text-xs font-black text-[#006c48]">
              {maxPrice.toLocaleString('pt-AO')} Kz
            </span>
          </div>
          <input
            type="range"
            min="30000"
            max="250000"
            step="10000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full accent-[#006c48] cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400">
            <span>30.000 Kz</span>
            <span>250.000 Kz</span>
          </div>
        </div>

        {/* Category selection */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-[#012d1d]">Tipo de Experiência</label>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {[
              { id: 'todas', label: 'Todas as Experiências' },
              { id: 'praias', label: 'Praias & Litoral' },
              { id: 'ecoturismo', label: 'Ecoturismo & Quedas' },
              { id: 'safari', label: 'Safaris & Montanhas' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`p-2.5 rounded-xl text-left font-semibold border transition-all ${
                  selectedCategory === cat.id
                    ? 'border-[#006c48] bg-emerald-50 text-[#002114]'
                    : 'border-slate-200 bg-white text-slate-600'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="pt-2 flex items-center gap-2">
          <button
            onClick={() => {
              setSelectedProvince('Todas');
              setMaxPrice(250000);
              setSelectedCategory('todas');
              onApplyFilters({ province: 'Todas', maxPrice: 250000, category: 'todas' });
              onClose();
            }}
            className="flex-1 py-3 rounded-full text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            Limpar
          </button>

          <button
            onClick={() => {
              onApplyFilters({ province: selectedProvince, maxPrice, category: selectedCategory });
              onClose();
            }}
            className="flex-1 py-3 rounded-full text-xs font-bold text-white bg-[#012d1d] hover:bg-[#1b4332] shadow-sm transition-colors"
          >
            Aplicar Filtros
          </button>
        </div>

      </div>
    </div>
  );
};
