import { useState } from 'react';
import { Settings, Copy, Check, ChevronDown, ChevronUp } from 'lucide-react';
import VoiceSelector from '../shared/VoiceSelector';
import { useI18n } from '../../i18n/I18nContext';

export default function PinyinSidebar({ data, onChange, pinyinResult, voices, selectedVoiceURI, onSelectVoice }) {
  const { t } = useI18n();
  const [showSettings, setShowSettings] = useState(false);
  const [copied, setCopied] = useState(false);
  const set = (patch) => onChange({ ...data, ...patch });

  const handleCopy = () => {
    if (!pinyinResult.length) return;
    const text = pinyinResult.map((i) => i.pinyin).join(' ');
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      Object.assign(ta.style, { top: '0', left: '0', position: 'fixed', opacity: '0' });
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      if (document.execCommand('copy')) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
      document.body.removeChild(ta);
    } catch { /* ignore */ }
  };

  return (
    <div className="flex flex-col gap-5 animate-in fade-in duration-300">
      <textarea
        value={data.text}
        onChange={(e) => set({ text: e.target.value })}
        placeholder={t('pinyin.placeholder')}
        className="w-full h-32 md:h-40 bg-slate-50 border border-slate-200 rounded-3xl p-5 text-xl font-medium focus:ring-2 focus:ring-indigo-500 outline-none resize-none shadow-inner custom-scrollbar"
      />
      <div className="border-t border-slate-100 pt-5">
        <button onClick={() => setShowSettings(!showSettings)} className="flex items-center justify-between w-full p-3.5 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-indigo-50 hover:border-indigo-100 transition-colors group">
          <div className="flex items-center gap-2 font-bold text-slate-600 group-hover:text-indigo-600 text-sm transition-colors">
            <Settings size={16} /> {t('pinyin.settings')}
          </div>
          {showSettings ? <ChevronUp size={18} className="text-slate-400 group-hover:text-indigo-500" /> : <ChevronDown size={18} className="text-slate-400 group-hover:text-indigo-500" />}
        </button>
        {showSettings && (
          <div className="pt-5 space-y-4 animate-in slide-in-from-top-2 fade-in duration-200">
            <VoiceSelector voices={voices} selectedVoiceURI={selectedVoiceURI} onSelect={onSelectVoice} />
            <div className="grid grid-cols-2 gap-2 mb-2 pt-2 border-t border-slate-100">
              <button onClick={() => set({ toneType: 'symbol' })} className={`py-2.5 text-[10px] uppercase font-black rounded-xl border transition-all ${data.toneType === 'symbol' ? 'bg-indigo-600 border-indigo-600 text-white shadow-md' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>{t('pinyin.toneSymbol')}</button>
              <button onClick={() => set({ toneType: 'num' })} className={`py-2.5 text-[10px] uppercase font-black rounded-xl border transition-all ${data.toneType === 'num' ? 'bg-indigo-600 border-indigo-600 text-white shadow-md' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>{t('pinyin.toneNum')}</button>
            </div>
            <div className="flex items-center gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-100 cursor-pointer" onClick={() => set({ showHanzi: !data.showHanzi })}>
              <input type="checkbox" checked={data.showHanzi} readOnly className="w-5 h-5 rounded text-indigo-600 cursor-pointer" />
              <label className="text-sm font-bold text-slate-700 cursor-pointer select-none">{t('pinyin.showHanzi')}</label>
            </div>
            <div className="flex items-center gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-100 cursor-pointer" onClick={() => set({ nonTone: !data.nonTone })}>
              <input type="checkbox" checked={data.nonTone} readOnly className="w-5 h-5 rounded text-indigo-600 cursor-pointer" />
              <label className="text-sm font-bold text-slate-700 cursor-pointer select-none">{t('pinyin.removeTone')}</label>
            </div>
          </div>
        )}
      </div>
      <button onClick={handleCopy} disabled={!pinyinResult.length} className={`w-full mt-2 ${copied ? 'bg-emerald-500' : 'bg-indigo-600 hover:bg-indigo-700'} text-white px-5 py-4 rounded-[1.5rem] font-black uppercase tracking-widest transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3`}>
        {copied ? <Check size={20} /> : <Copy size={20} />} {copied ? t('pinyin.copied') : t('pinyin.copy')}
      </button>
    </div>
  );
}
