import React from 'react';

interface NotificationsModalProps {
  onClose: () => void;
  onClear: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  onClose,
  onClear,
}) => {
  const notifications = [
    {
      id: 'notif-1',
      title: 'Voo Confirmado DT-130 (LAD → SDD)',
      message: 'O seu bilhete digital para o Lubango foi emitido. Check-in disponível 24h antes do voo.',
      time: 'Há 25 minutos',
      unread: true,
      icon: 'flight_takeoff',
    },
    {
      id: 'notif-2',
      title: 'Pagamento Multicaixa Express Validado',
      message: 'O recibo CAT-90218-AO foi gerado e associado ao seu Bilhete de Identidade.',
      time: 'Há 2 horas',
      unread: true,
      icon: 'verified',
    },
    {
      id: 'notif-3',
      title: 'Novo Pacote: Fim de Semana em Cabo Ledo',
      message: 'Aproveite 20% de desconto na Praia de Cabo Ledo com aulas de surf e almoço típico inclusos.',
      time: 'Ontem',
      unread: false,
      icon: 'local_offer',
    },
  ];

  return (
    <div className="fixed inset-0 z-60 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
      <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-5 space-y-4 shadow-2xl animate-in slide-in-from-bottom duration-200 max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#012d1d] text-[22px]">notifications</span>
            <h3 className="font-bold text-base text-[#012d1d]">Notificações</h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="space-y-2.5 overflow-y-auto flex-1 pr-1">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`p-3 rounded-2xl border transition-colors ${
                n.unread ? 'bg-emerald-50/60 border-emerald-100' : 'bg-white border-slate-100'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#1b4332] text-[#92f7c3] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[17px]">{n.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-xs text-[#012d1d] truncate">{n.title}</h4>
                    {n.unread && <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />}
                  </div>
                  <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">{n.message}</p>
                  <span className="text-[10px] text-slate-400 mt-1 block">{n.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => {
            onClear();
            onClose();
          }}
          className="w-full py-2.5 rounded-full text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
        >
          Marcar todas como lidas
        </button>
      </div>
    </div>
  );
};
