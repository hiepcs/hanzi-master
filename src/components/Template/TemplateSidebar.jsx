import { useState } from 'react';
import { Printer, Settings, ChevronDown, ChevronUp } from 'lucide-react';
import { PAPER_DIMS } from '../../util/hanzi';
import { useI18n } from '../../i18n/I18nContext';

export default function TemplateSidebar({ data, onChange }) {
  const { t } = useI18n();
  const [showSettings, setShowSettings] = useState(false);
  const set = (patch) => onChange({ ...data, ...patch });

  return (
    <div className="flex flex-col gap-5 animate-in fade-in duration-300">
      <textarea
        value={data.text}
        onChange={(e) => set({ text: e.target.value })}
        placeholder={t('template.placeholder')}
        className="w-full h-32 md:h-40 bg-slate-50 border border-slate-200 rounded-3xl p-5 text-xl font-medium focus:ring-2 focus:ring-indigo-500 outline-none resize-none shadow-inner custom-scrollbar"
      />
      <div
        className="flex items-center gap-3 bg-indigo-50 p-3.5 md:p-4 rounded-2xl border border-indigo-100 cursor-pointer"
        onClick={() => set({ insertGapRows: !data.insertGapRows })}
      >
        <input type="checkbox" checked={data.insertGapRows} readOnly className="w-5 h-5 rounded text-indigo-600 cursor-pointer" />
        <label className="text-sm font-bold text-indigo-900 cursor-pointer select-none">{t('template.gapRows')}</label>
      </div>

      <div className="border-t border-slate-100 pt-5">
        <button onClick={() => setShowSettings(!showSettings)} className="flex items-center justify-between w-full p-3.5 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-indigo-50 hover:border-indigo-100 transition-colors group">
          <div className="flex items-center gap-2 font-bold text-slate-600 group-hover:text-indigo-600 text-sm transition-colors">
            <Settings size={16} /> {t('template.advancedSettings')}
          </div>
          {showSettings ? <ChevronUp size={18} className="text-slate-400 group-hover:text-indigo-500" /> : <ChevronDown size={18} className="text-slate-400 group-hover:text-indigo-500" />}
        </button>

        {showSettings && (
          <div className="pt-5 space-y-6 animate-in slide-in-from-top-2 fade-in duration-200">
            <select value={data.paperSize} onChange={(e) => set({ paperSize: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-sm font-bold outline-none cursor-pointer">
              {Object.entries(PAPER_DIMS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
            </select>
            <div>
              <div className="flex justify-between text-sm mb-2"><span className="font-bold text-slate-700">{t('template.columns')}</span><span className="text-indigo-600 font-black">{data.columns}</span></div>
              <input type="range" min="5" max="25" value={data.columns} onChange={(e) => set({ columns: parseInt(e.target.value) })} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
            </div>
            <div>
              <label className="text-sm font-bold block mb-3">{t('template.gridStyle')}</label>
              <div className="grid grid-cols-3 gap-2">
                {[['star', t('template.gridStar')], ['cross', t('template.gridCross')], ['none', t('template.gridNone')]].map(([style, label]) => (
                  <button key={style} onClick={() => set({ gridStyle: style })} className={`py-2.5 text-[10px] uppercase font-black rounded-xl border transition-all ${data.gridStyle === style ? 'bg-indigo-600 border-indigo-600 text-white shadow-md' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <button onClick={() => window.print()} className="w-full mt-2 bg-slate-900 hover:bg-black text-white px-5 py-4 rounded-[1.5rem] font-black uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95">
        <Printer size={20} /> {t('template.print')}
      </button>
    </div>
  );
}
