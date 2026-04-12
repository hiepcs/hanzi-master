import { useState } from 'react';
import { Settings, FastForward, ChevronDown, ChevronUp } from 'lucide-react';
import VoiceSelector from '../shared/VoiceSelector';
import { useI18n } from '../../i18n/I18nContext';

export default function StrokeSidebar({ data, onChange, voices, selectedVoiceURI, onSelectVoice }) {
  const { t } = useI18n();
  const [showSettings, setShowSettings] = useState(false);
  const set = (patch) => onChange({ ...data, ...patch });

  return (
    <div className="flex flex-col gap-5 animate-in fade-in duration-300">
      <textarea
        value={data.text}
        onChange={(e) => set({ text: e.target.value })}
        placeholder={t('stroke.placeholder')}
        className="w-full h-32 md:h-40 bg-slate-50 border border-slate-200 rounded-3xl p-5 text-xl font-medium focus:ring-2 focus:ring-indigo-500 outline-none resize-none shadow-inner custom-scrollbar"
      />
      <div className="border-t border-slate-100 pt-5">
        <button onClick={() => setShowSettings(!showSettings)} className="flex items-center justify-between w-full p-3.5 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-indigo-50 hover:border-indigo-100 transition-colors group">
          <div className="flex items-center gap-2 font-bold text-slate-600 group-hover:text-indigo-600 text-sm transition-colors">
            <Settings size={16} /> {t('stroke.settings')}
          </div>
          {showSettings ? <ChevronUp size={18} className="text-slate-400 group-hover:text-indigo-500" /> : <ChevronDown size={18} className="text-slate-400 group-hover:text-indigo-500" />}
        </button>
        {showSettings && (
          <div className="pt-5 space-y-6 animate-in slide-in-from-top-2 fade-in duration-200">
            <VoiceSelector voices={voices} selectedVoiceURI={selectedVoiceURI} onSelect={onSelectVoice} />
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-bold text-slate-700 flex items-center gap-2"><FastForward size={14} /> {t('stroke.speed')}</span>
                <span className="text-indigo-600 font-black">{data.speed}x</span>
              </div>
              <input type="range" min="0.5" max="3" step="0.1" value={data.speed} onChange={(e) => set({ speed: parseFloat(e.target.value) })} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
            </div>
            <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
              <label className="text-sm font-bold text-slate-700">{t('stroke.color')}</label>
              <input type="color" value={data.color} onChange={(e) => set({ color: e.target.value })} className="w-10 h-10 rounded-xl overflow-hidden border-none cursor-pointer p-0" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
