import { Search, Info } from 'lucide-react';
import VoiceSelector from '../shared/VoiceSelector';
import { useI18n } from '../../i18n/I18nContext';

export default function RadicalsSidebar({ search, onSearchChange, voices, selectedVoiceURI, onSelectVoice }) {
  const { t } = useI18n();
  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-left-2 duration-300 flex flex-col gap-4">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={t('radicals.search')}
          className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none shadow-inner"
        />
      </div>
      <VoiceSelector voices={voices} selectedVoiceURI={selectedVoiceURI} onSelect={onSelectVoice} />
      <div className="p-3.5 bg-indigo-50 rounded-2xl border border-indigo-100 flex items-start gap-3">
        <Info size={16} className="text-indigo-600 shrink-0 mt-0.5" />
        <p className="text-[11px] text-indigo-800 leading-normal font-medium">{t('radicals.info')}</p>
      </div>
    </div>
  );
}
