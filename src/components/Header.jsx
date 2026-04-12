import { Layout, Layers, PlayCircle, Languages, BookOpen } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';

const MODES = [
  { id: 'stroke', icon: PlayCircle, key: 'nav.stroke' },
  { id: 'pinyin', icon: Languages, key: 'nav.pinyin' },
  { id: 'radicals', icon: BookOpen, key: 'nav.radicals' },
  { id: 'template', icon: Layers, key: 'nav.template' },
];

export default function Header({ viewMode, onChangeMode }) {
  const { lang, setLang, t } = useI18n();

  return (
    <header className="bg-white border-b border-slate-200 px-4 md:px-6 py-3 md:py-4 flex items-center justify-between sticky top-0 z-30 print:hidden shadow-sm">
      <div className="flex items-center gap-2 md:gap-3">
        <div className="bg-indigo-600 p-2 md:p-2.5 rounded-[1rem] text-white shadow-lg shadow-indigo-100">
          <Layout size={20} className="md:w-6 md:h-6" />
        </div>
        <div className="hidden md:block">
          <h1 className="text-xl font-black tracking-tight text-slate-800 uppercase leading-none">{t('app.title')}</h1>
          <p className="text-[10px] font-bold text-slate-400 tracking-widest mt-1">{t('app.subtitle')}</p>
        </div>
      </div>
      <div className="flex gap-1 bg-slate-100 p-1 rounded-2xl border border-slate-200 overflow-x-auto no-scrollbar max-w-[70vw]">
        {MODES.map((m) => (
          <button
            key={m.id}
            onClick={() => onChangeMode(m.id)}
            className={`px-3 lg:px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all flex items-center gap-1.5 md:gap-2 shrink-0 ${viewMode === m.id ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <m.icon size={16} className="md:w-[18px] md:h-[18px]" />
            <span className="hidden sm:inline">{t(m.key)}</span>
          </button>
        ))}
      </div>
      <button
        onClick={() => setLang(lang === 'vi' ? 'en' : 'vi')}
        className="px-3 py-2 rounded-xl text-xs font-black border border-slate-200 bg-slate-50 hover:bg-indigo-50 hover:border-indigo-200 transition-colors uppercase tracking-wider"
      >
        {lang === 'vi' ? 'EN' : 'VI'}
      </button>
    </header>
  );
}
