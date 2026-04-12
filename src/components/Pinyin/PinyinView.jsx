import { Languages, Volume2 } from 'lucide-react';
import { useI18n } from '../../i18n/I18nContext';

export default function PinyinView({ pinyinResult, showHanzi, onSpeak }) {
  const { t } = useI18n();
  return (
    <div className="w-full animate-in slide-in-from-bottom-4 duration-500 bg-indigo-600 p-6 md:p-8 lg:p-12 rounded-[2.5rem] lg:rounded-[3.5rem] shadow-2xl min-h-[500px] lg:min-h-[600px] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-white/10 rounded-full -mr-20 md:-mr-32 -mt-20 md:-mt-32 blur-3xl pointer-events-none" />
      <div className="relative z-10 mb-8 lg:mb-10 flex justify-between items-center">
        <div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-2 lg:mb-3 flex items-center gap-3 lg:gap-4">
            <Languages className="text-indigo-200 w-8 h-8 lg:w-10 lg:h-10" /> {t('pinyin.title')}
          </h2>
          <p className="text-indigo-100 font-medium text-sm lg:text-lg">{t('pinyin.subtitle')}</p>
        </div>
        {pinyinResult.length > 0 && (
          <button onClick={() => onSpeak(pinyinResult.map((i) => i.char).join(''))} className="p-3 lg:p-4 bg-white/20 hover:bg-white/30 text-white rounded-2xl lg:rounded-3xl transition-all border border-white/20 shadow-xl" title={t('pinyin.speakAll')}>
            <Volume2 size={24} />
          </button>
        )}
      </div>
      <div className="bg-white/10 backdrop-blur-md rounded-[2rem] lg:rounded-[2.5rem] border border-white/20 p-6 lg:p-12 min-h-[250px] lg:min-h-[300px] relative z-10">
        {pinyinResult.length > 0 ? (
          <div className="flex flex-wrap gap-x-4 lg:gap-x-6 gap-y-8 lg:gap-y-10 items-end justify-start">
            {pinyinResult.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center group relative">
                <span className="text-xl lg:text-2xl font-black text-indigo-100 mb-2">{item.pinyin}</span>
                {showHanzi && (
                  <div className="relative group/cell">
                    <span className="text-4xl lg:text-5xl font-bold text-white bg-white/10 px-3 lg:px-4 py-2 lg:py-3 rounded-2xl border border-white/10 shadow-lg block">{item.char}</span>
                    <button onClick={() => onSpeak(item.char)} className="absolute -top-3 -right-3 p-1.5 lg:p-2 bg-white text-indigo-600 rounded-full opacity-0 group-hover/cell:opacity-100 transition-all z-20 shadow-lg">
                      <Volume2 size={12} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="py-16 lg:py-20 text-center text-white/20 font-black italic text-lg lg:text-xl uppercase tracking-widest">{t('pinyin.empty')}</div>
        )}
      </div>
    </div>
  );
}
