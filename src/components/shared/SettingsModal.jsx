import { X, Volume2, FastForward } from 'lucide-react';
import { useI18n } from '../../i18n/I18nContext';

export default function SettingsModal({ voices, selectedVoiceURI, onSelectVoice, speechRate, onSpeechRateChange, onClose }) {
  const { t } = useI18n();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div className="relative bg-white rounded-[2rem] shadow-2xl w-full max-w-md p-6 space-y-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-black uppercase tracking-widest text-indigo-600">{t('settings.title')}</h2>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-100 transition-colors">
            <X size={18} className="text-slate-400" />
          </button>
        </div>

        {voices.length > 0 && (
          <div className="space-y-2">
            <span className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <Volume2 size={14} /> {t('voice.label')}
            </span>
            <select
              value={selectedVoiceURI}
              onChange={(e) => onSelectVoice(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-bold outline-none cursor-pointer truncate"
            >
              {voices.map((v, i) => (
                <option key={i} value={v.voiceURI}>{v.name} ({v.lang})</option>
              ))}
            </select>
            <p className="text-[10px] text-slate-400 leading-tight">{t('voice.hint')}</p>
          </div>
        )}

        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="font-bold text-slate-700 flex items-center gap-2">
              <FastForward size={14} /> {t('settings.speechRate')}
            </span>
            <span className="text-indigo-600 font-black">{speechRate}x</span>
          </div>
          <input
            type="range" min="0.3" max="1.5" step="0.1" value={speechRate}
            onChange={(e) => onSpeechRateChange(parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
        </div>
      </div>
    </div>
  );
}
