import { useMemo } from 'react';
import { BookOpen } from 'lucide-react';
import StrokeOrderItem from '../shared/StrokeOrderItem';
import { COMMON_RADICALS } from '../../constants/radicals';
import { useI18n } from '../../i18n/I18nContext';

export default function RadicalsView({ search, onSpeak }) {
  const { t } = useI18n();
  const filtered = useMemo(
    () =>
      COMMON_RADICALS.filter(
        (r) =>
          r.char.includes(search) ||
          r.pinyin.toLowerCase().includes(search.toLowerCase()) ||
          r.meaning.toLowerCase().includes(search.toLowerCase()),
      ),
    [search],
  );

  return (
    <div className="w-full animate-in slide-in-from-right-4 duration-500 bg-indigo-900 p-6 md:p-8 lg:p-12 rounded-[2.5rem] lg:rounded-[3.5rem] shadow-2xl min-h-[500px] lg:min-h-[600px] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-white/5 rounded-full -mr-20 md:-mr-32 -mt-20 md:-mt-32 blur-3xl pointer-events-none" />
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-8 lg:mb-10 flex items-center gap-3 lg:gap-4 relative z-10">
        <BookOpen className="text-indigo-400 w-8 h-8 lg:w-10 lg:h-10" /> {t('radicals.title')}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 lg:gap-6 relative z-10">
        {filtered.length > 0 ? (
          filtered.map((r) => (
            <StrokeOrderItem key={r.char} char={r.char} color="#1e293b" speed={1.5} showInfo pinyin={r.pinyin} meaning={r.meaning} onSpeak={onSpeak} />
          ))
        ) : (
          <div className="col-span-full py-24 lg:py-32 text-center text-white/20 font-black italic text-lg lg:text-xl uppercase tracking-widest">
            {t('radicals.empty')}
          </div>
        )}
      </div>
    </div>
  );
}
