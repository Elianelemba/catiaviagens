import React, { useState } from 'react';
import { Destination, PaymentMethodId, Booking } from '../types/travel';

interface CheckoutModalProps {
  destination: Destination;
  onClose: () => void;
  onPaymentSuccess: (newBooking: Booking) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  destination,
  onClose,
  onPaymentSuccess,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodId>('mcx');
  const [mcxPhone, setMcxPhone] = useState('923 456 789');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showConfirmationSuccess, setShowConfirmationSuccess] = useState(false);
  const [generatedBooking, setGeneratedBooking] = useState<Booking | null>(null);

  // Financial calculations
  const basePackage = destination.priceAmount > 50000 ? destination.priceAmount * 2 : 320000;
  const iva = Math.round(basePackage * 0.14);
  const discount = 15000;
  const total = basePackage + iva - discount;

  const formatKz = (val: number) => val.toLocaleString('pt-AO');

  const handleFinishPayment = () => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const randomRef = `CAT-${Math.floor(10000 + Math.random() * 90000)}-AO`;
      
      const newBooking: Booking = {
        id: `book-${Date.now()}`,
        referenceNumber: randomRef,
        title: destination.title,
        location: destination.location,
        typeBadge: destination.category === 'voos' ? 'Voo + Hotel' : 'Pacote VIP',
        status: 'confirmado',
        dateRange: '15 - 17 Dez 2025',
        imageUrl: destination.imageUrl,
        travelersText: '2 Viajantes Registados',
        leadPassengerName: 'Adolfo Alexandre',
        paymentMethod:
          selectedMethod === 'mcx'
            ? 'Multicaixa Express (MCX)'
            : selectedMethod === 'ref'
            ? 'Referência Multicaixa'
            : selectedMethod === 'transfer'
            ? 'Transferência Bancária (IBAN)'
            : 'Cartão Visa/Mastercard',
        totalAmount: total,
        totalFormatted: formatKz(total),
        flight: {
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
        },
      };

      setGeneratedBooking(newBooking);
      setShowConfirmationSuccess(true);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#012d1d]/85 backdrop-blur-md overflow-y-auto no-scrollbar flex justify-center">
      <div className="relative w-full max-w-md bg-[#f8faf9] min-h-screen flex flex-col pb-12 animate-in fade-in duration-200">
        
        {/* Sticky App Bar */}
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
              <h1 className="text-base font-bold text-[#012d1d] leading-tight truncate max-w-[210px]">
                Checkout E Pagamento
              </h1>
            </div>
            
            <div className="flex items-center gap-1">
              <button
                onClick={() => alert('Referência partilhada')}
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

        {/* Stepper Header */}
        <div className="px-4 pt-3 pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#012d1d] text-white text-xs font-bold">
                2
              </span>
              <span className="text-xs text-[#012d1d] font-bold">
                Passo 2 de 3: Pagamento Seguro
              </span>
            </div>
            <span className="text-xs text-[#006c48] font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px] material-symbols-fill">
                verified_user
              </span>
              SSL 256-bit
            </span>
          </div>

          <div className="w-full bg-[#e6e9e8] h-1.5 rounded-full mt-2.5 overflow-hidden flex">
            <div className="bg-[#006c48] h-full rounded-full w-2/3 transition-all duration-500" />
          </div>
        </div>

        {/* Form Body */}
        <div className="px-4 space-y-4">
          {/* Destination Item Summary */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#eceeed]">
            <div className="flex gap-3.5 items-start">
              <div className="relative w-22 h-22 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                <img
                  src={destination.imageUrl}
                  alt={destination.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-1 left-1 bg-[#012d1d]/85 backdrop-blur-xs text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md">
                  Pacote VIP
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 text-[#006c48] mb-0.5">
                  <span className="material-symbols-outlined text-[14px]">location_on</span>
                  <span className="text-[10px] uppercase tracking-wider font-bold">
                    {destination.location}
                  </span>
                </div>
                <h2 className="text-sm font-bold text-[#012d1d] leading-snug truncate">
                  {destination.title}
                </h2>
                <p className="text-[11px] text-[#414844] mt-0.5">
                  3 Dias • 2 Noites • Chalé Vista Mar
                </p>
                <div className="flex items-center gap-1 mt-1 text-[#414844] text-[11px] font-semibold">
                  <span className="material-symbols-outlined text-[14px] text-[#006c48]">
                    calendar_month
                  </span>
                  <span>15 – 17 Dez 2025</span>
                </div>
              </div>
            </div>

            <div className="mt-3 pt-2 bg-[#f2f4f3] rounded-xl p-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#92f7c3] text-[#002113] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[16px]">group</span>
                </div>
                <div>
                  <p className="text-xs text-[#012d1d] font-bold">2 Viajantes Registados</p>
                  <p className="text-[10px] text-[#414844]">Titular: Adolfo Alexandre</p>
                </div>
              </div>
              <span className="text-[10px] bg-[#c1ecd4] text-[#002114] px-2 py-0.5 rounded-full font-bold">
                Doc: BI Confirmado
              </span>
            </div>
          </div>

          {/* Payment Methods Section */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-[#012d1d]">Método de Pagamento</h3>
              <span className="text-[11px] text-[#006c48] font-bold flex items-center gap-0.5">
                <span className="material-symbols-outlined text-[13px]">lock</span> Moeda Local (AOA / Kz)
              </span>
            </div>

            <div className="space-y-2">
              {/* Multicaixa Express (MCX) */}
              <div
                onClick={() => setSelectedMethod('mcx')}
                className={`bg-white rounded-2xl p-3.5 cursor-pointer transition-all border ${
                  selectedMethod === 'mcx'
                    ? 'border-[#006c48] shadow-md ring-1 ring-[#006c48]'
                    : 'border-[#eceeed] shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#92f7c3]/40 text-[#00734d] flex items-center justify-center">
                      <span className="material-symbols-outlined text-[20px]">phone_android</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs text-[#012d1d] font-bold">
                          Multicaixa Express (MCX)
                        </span>
                        <span className="bg-[#92f7c3] text-[#002113] text-[9px] px-1.5 py-0.5 rounded-full font-black">
                          Recomendado
                        </span>
                      </div>
                      <p className="text-[11px] text-[#414844] mt-0.5">
                        Confirmação instantânea por notificação no telemóvel
                      </p>
                    </div>
                  </div>

                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      selectedMethod === 'mcx'
                        ? 'bg-[#012d1d] text-white'
                        : 'bg-slate-200 text-transparent'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[14px]">check</span>
                  </div>
                </div>

                {selectedMethod === 'mcx' && (
                  <div className="mt-3 pt-2.5 border-t border-[#eceeed]">
                    <label className="block text-xs text-[#012d1d] font-bold mb-1">
                      Número de Telemóvel Associado ao MCX
                    </label>
                    <div className="flex items-center bg-[#f8faf9] rounded-xl px-3 py-2 border border-[#eceeed]">
                      <div className="flex items-center gap-1 pr-2 text-[#414844] text-xs font-bold border-r border-[#eceeed]">
                        <span className="material-symbols-outlined text-[15px] text-[#006c48]">
                          flag
                        </span>
                        <span>+244</span>
                      </div>
                      <input
                        type="tel"
                        value={mcxPhone}
                        onChange={(e) => setMcxPhone(e.target.value)}
                        placeholder="9XX XXX XXX"
                        className="bg-transparent text-sm text-[#012d1d] font-bold w-full pl-2 outline-none"
                      />
                    </div>
                    <p className="text-[10px] text-[#414844] mt-1.5 flex items-center gap-1">
                      <span className="material-symbols-outlined text-[13px] text-[#006c48]">
                        info
                      </span>
                      Receberá um pedido de autorização de {formatKz(total)} Kz na app Multicaixa Express.
                    </p>
                  </div>
                )}
              </div>

              {/* Referência Multicaixa */}
              <div
                onClick={() => setSelectedMethod('ref')}
                className={`bg-white rounded-2xl p-3.5 cursor-pointer transition-all border ${
                  selectedMethod === 'ref'
                    ? 'border-[#006c48] shadow-md ring-1 ring-[#006c48]'
                    : 'border-[#eceeed] shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#eceeed] text-[#414844] flex items-center justify-center">
                      <span className="material-symbols-outlined text-[20px]">pin</span>
                    </div>
                    <div>
                      <span className="text-xs text-[#012d1d] font-bold">
                        Referência Multicaixa
                      </span>
                      <p className="text-[11px] text-[#414844]">
                        Pague no Multicaixa ATM ou Internet Banking
                      </p>
                    </div>
                  </div>

                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      selectedMethod === 'ref'
                        ? 'bg-[#012d1d] text-white'
                        : 'bg-slate-200 text-transparent'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[14px]">check</span>
                  </div>
                </div>

                {selectedMethod === 'ref' && (
                  <div className="mt-3 pt-2.5 border-t border-[#eceeed]">
                    <div className="bg-[#f2f4f3] p-3 rounded-xl space-y-1.5 text-xs">
                      <div className="flex justify-between">
                        <span className="text-[#414844]">Entidade:</span>
                        <span className="font-bold text-[#012d1d] font-mono">00142 (Cátia Viagens)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#414844]">Referência:</span>
                        <span className="font-bold text-[#012d1d] font-mono">924 810 523</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#414844]">Validade:</span>
                        <span className="font-bold text-[#006c48]">24 Horas</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Transferência Bancária IBAN */}
              <div
                onClick={() => setSelectedMethod('transfer')}
                className={`bg-white rounded-2xl p-3.5 cursor-pointer transition-all border ${
                  selectedMethod === 'transfer'
                    ? 'border-[#006c48] shadow-md ring-1 ring-[#006c48]'
                    : 'border-[#eceeed] shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#eceeed] text-[#414844] flex items-center justify-center">
                      <span className="material-symbols-outlined text-[20px]">account_balance</span>
                    </div>
                    <div>
                      <span className="text-xs text-[#012d1d] font-bold">
                        Transferência Bancária (IBAN)
                      </span>
                      <p className="text-[11px] text-[#414844]">
                        Contas BAI, BFA, BIC • Envio de comprovativo
                      </p>
                    </div>
                  </div>

                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      selectedMethod === 'transfer'
                        ? 'bg-[#012d1d] text-white'
                        : 'bg-slate-200 text-transparent'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[14px]">check</span>
                  </div>
                </div>

                {selectedMethod === 'transfer' && (
                  <div className="mt-3 pt-2.5 border-t border-[#eceeed]">
                    <div className="bg-[#f2f4f3] p-3 rounded-xl space-y-1.5 text-[11px] text-[#414844]">
                      <p><strong className="text-[#012d1d]">Banco BAI:</strong> AO06 0040.0000.8291.9281.1018.4</p>
                      <p><strong className="text-[#012d1d]">Banco BFA:</strong> AO06 0006.0000.1293.4810.1023.1</p>
                      <p className="text-[10px] text-[#006c48] font-bold">
                        Beneficiário: Cátia Viagens Lda • Envie o comprovativo via WhatsApp
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Cartão Visa / Mastercard */}
              <div
                onClick={() => setSelectedMethod('card')}
                className={`bg-white rounded-2xl p-3.5 cursor-pointer transition-all border ${
                  selectedMethod === 'card'
                    ? 'border-[#006c48] shadow-md ring-1 ring-[#006c48]'
                    : 'border-[#eceeed] shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#eceeed] text-[#414844] flex items-center justify-center">
                      <span className="material-symbols-outlined text-[20px]">credit_card</span>
                    </div>
                    <div>
                      <span className="text-xs text-[#012d1d] font-bold">
                        Cartão Visa / Mastercard
                      </span>
                      <p className="text-[11px] text-[#414844]">
                        Pagamentos internacionais ou cartões pré-pagos
                      </p>
                    </div>
                  </div>

                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      selectedMethod === 'card'
                        ? 'bg-[#012d1d] text-white'
                        : 'bg-slate-200 text-transparent'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[14px]">check</span>
                  </div>
                </div>

                {selectedMethod === 'card' && (
                  <div className="mt-3 pt-2.5 border-t border-[#eceeed]">
                    <div className="bg-[#f2f4f3] p-3 rounded-xl text-xs text-[#414844]">
                      <p>Redirecionamento seguro para gateway bancária com verificação 3D Secure e confirmação via SMS.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Resumo de Tarifas */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#eceeed]">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-[#012d1d]">Resumo de Tarifas</h3>
              <span className="text-[10px] text-[#006c48] bg-[#92f7c3] px-2.5 py-0.5 rounded-full font-bold">
                Kwanza (AOA)
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center text-[#414844]">
                <span>Pacote Expedição (2 Viajantes • 2 Noites)</span>
                <span className="font-semibold text-[#191c1c]">{formatKz(basePackage)} Kz</span>
              </div>
              <div className="flex justify-between items-center text-[#414844]">
                <span className="flex items-center gap-1">
                  Taxas Turísticas & IVA (14%)
                  <span className="material-symbols-outlined text-[14px] text-[#717973]">help</span>
                </span>
                <span className="font-semibold text-[#191c1c]">{formatKz(iva)} Kz</span>
              </div>
              <div className="flex justify-between items-center text-[#006c48] font-bold">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px]">local_offer</span>
                  Desconto Cátia Viagens (Promo Especial)
                </span>
                <span>- {formatKz(discount)} Kz</span>
              </div>
            </div>

            <div className="mt-3 pt-2.5 bg-[#f2f4f3] rounded-xl p-3 flex justify-between items-end">
              <div>
                <span className="text-[10px] text-[#414844] block uppercase tracking-wider font-bold">
                  Total a Pagar
                </span>
                <span className="text-xl font-black text-[#012d1d] tracking-tight">
                  {formatKz(total)} Kz
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-[#006c48] bg-[#c1ecd4] px-2 py-0.5 rounded-full font-bold">
                  Sem Taxas Ocultas
                </span>
              </div>
            </div>
          </div>

          {/* Cancellation Policy Banner */}
          <div className="bg-[#012d1d]/5 rounded-xl p-3 flex items-start gap-2.5 border border-[#012d1d]/10">
            <span className="material-symbols-outlined text-[#006c48] text-[20px] shrink-0 mt-0.5">
              policy
            </span>
            <p className="text-[11px] text-[#414844] leading-relaxed">
              Ao confirmar, você aceita as <span className="text-[#006c48] font-bold underline">Políticas de Cancelamento</span> da Cátia Viagens. Cancelamento 100% gratuito até 48 horas antes da partida.
            </p>
          </div>

          {/* Action CTA */}
          <div className="pt-1">
            <button
              onClick={handleFinishPayment}
              disabled={isProcessing}
              className="w-full bg-[#1b4332] hover:bg-[#012d1d] disabled:opacity-75 text-white h-[52px] rounded-full flex items-center justify-center gap-2 text-xs font-bold shadow-md active:scale-[0.99] transition-transform"
            >
              {isProcessing ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>A processar no Multicaixa...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">lock</span>
                  <span>Finalizar Pagamento ({formatKz(total)} Kz)</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-3 mt-3 text-[#414844] text-[10px] font-semibold">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-[#006c48]">verified</span>
                Agência Licenciada MINHOTUR
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-[#006c48]">support_agent</span>
                Apoio 24/7 em Luanda
              </span>
            </div>
          </div>
        </div>

        {/* Confirmation Success Modal */}
        {showConfirmationSuccess && generatedBooking && (
          <div className="fixed inset-0 z-60 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
            <div className="bg-white rounded-3xl p-6 max-w-sm w-full text-center space-y-4 shadow-2xl">
              <div className="w-16 h-16 rounded-full bg-[#92f7c3] text-[#002113] flex items-center justify-center mx-auto shadow-md">
                <span className="material-symbols-outlined text-[36px]">check_circle</span>
              </div>

              <div>
                <span className="text-[10px] font-bold text-[#006c48] uppercase tracking-wider">
                  Reserva Confirmada
                </span>
                <h3 className="text-lg font-bold text-[#012d1d] mt-0.5">
                  Pagamento Concluído!
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  A sua reserva em <strong>{generatedBooking.title}</strong> foi confirmada e emitida com sucesso.
                </p>
              </div>

              <div className="bg-[#f2f4f3] rounded-2xl p-3 text-xs space-y-1 text-left font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-500">Referência:</span>
                  <span className="font-bold text-[#012d1d]">{generatedBooking.referenceNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Método:</span>
                  <span className="font-bold text-[#012d1d]">{generatedBooking.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Valor Pago:</span>
                  <span className="font-bold text-[#006c48]">{generatedBooking.totalFormatted} Kz</span>
                </div>
              </div>

              <div className="space-y-2 pt-1">
                <button
                  onClick={() => {
                    onPaymentSuccess(generatedBooking);
                  }}
                  className="w-full h-11 rounded-full bg-[#012d1d] hover:bg-[#1b4332] text-white text-xs font-bold transition-colors"
                >
                  Ver nas Minhas Reservas
                </button>
                <button
                  onClick={onClose}
                  className="w-full h-10 rounded-full bg-[#eceeed] text-[#012d1d] text-xs font-bold hover:bg-[#e1e3e2] transition-colors"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
