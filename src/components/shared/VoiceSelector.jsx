import { Volume2 } from 'lucide-react';
import { useI18n } from '../../i18n/I18nContext';

export default function VoiceSelector({ voices, selectedVoiceURI, onSelect }) {
  const { t } = useI18n();
  if (!voices.length) return null;
  return (
    <div className="pt-4 border-t border-slate-100">
      <div className="flex justify-between items-center text-sm mb-2">
        <span className="font-bold text-slate-700 flex items-center gap-2">
          <Volume2 size={14} /> {t('voice.label')}
        </span>
      </div>
      <select
        value={selectedVoiceURI}
        onChange={(e) => onSelect(e.target.value)}
        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-bold outline-none cursor-pointer truncate"
      >
        {voices.map((v, i) => (
          <option key={i} value={v.voiceURI}>
            {v.name} ({v.lang})
          </option>
        ))}
      </select>
      <p className="text-[10px] text-slate-400 mt-2 leading-tight">{t('voice.hint')}</p>
    </div>
  );
}
