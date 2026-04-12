import { useMemo } from 'react';
import { PlayCircle, Type, Volume2 } from 'lucide-react';
import StrokeOrderItem from '../shared/StrokeOrderItem';
import { uniqueHanzi } from '../../util/hanzi';
import { useI18n } from '../../i18n/I18nContext';

export default function StrokeView({ data, onSpeak }) {
  const { t } = useI18n();
  const chars = useMemo(() => uniqueHanzi(data.text), [data.text]);

  return (
    <div className="w-full animate-in slide-in-from-right-4 duration-500 bg-slate-900 p-6 md:p-8 lg:p-12 rounded-[2.5rem] lg:rounded-[3.5rem] shadow-2xl min-h-[500px] lg:min-h-[600px] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-indigo-500/10 rounded-full -mr-20 md:-mr-32 -mt-20 md:-mt-32 blur-3xl pointer-events-none" />
      <div className="relative z-10 mb-8 lg:mb-10 flex justify-between items-center">
        <div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-2 lg:mb-3 flex items-center gap-3 lg:gap-4">
            <PlayCircle className="text-indigo-400 w-8 h-8 lg:w-10 lg:h-10" /> {t('stroke.title')}
          </h2>
          <p className="text-slate-400 font-medium text-sm lg:text-lg">{t('stroke.subtitle')}</p>
        </div>
        {chars.length > 0 && (
          <button onClick={() => onSpeak(chars.join(''))} className="p-3 lg:p-4 bg-white/10 hover:bg-white/20 text-indigo-400 rounded-2xl lg:rounded-3xl transition-all border border-white/10 shadow-xl" title={t('stroke.listenAll')}>
            <Volume2 size={24} />
          </button>
        )}
      </div>
      {chars.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 lg:gap-8 relative z-10">
          {chars.map((c) => (
            <StrokeOrderItem key={`${c}-${data.speed}-${data.color}`} char={c} color={data.color} speed={data.speed} onSpeak={onSpeak} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 lg:py-32 bg-white/5 rounded-[2rem] lg:rounded-[3rem] border-2 border-dashed border-white/10 backdrop-blur-sm relative z-10 mx-4 lg:mx-0">
          <Type className="mx-auto mb-4 lg:mb-6 text-white/10 w-12 h-12 lg:w-16 lg:h-16" />
          <p className="text-white/40 font-black italic text-lg lg:text-xl uppercase tracking-widest">{t('stroke.empty')}</p>
        </div>
      )}
    </div>
  );
}
