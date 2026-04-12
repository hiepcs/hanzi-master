import { useEffect, useRef } from 'react';
import { PlayCircle, Volume2 } from 'lucide-react';
import { useI18n } from '../../i18n/I18nContext';

export default function StrokeOrderItem({ char, color, speed, showInfo = false, pinyin = '', meaning = '', onSpeak }) {
  const { t } = useI18n();
  const targetRef = useRef(null);
  const writerRef = useRef(null);
  const isFirst = useRef(true);
  const size = showInfo ? 110 : 140;

  useEffect(() => {
    let mounted = true;
    let timer;
    const init = () => {
      if (!mounted) return;
      if (window.HanziWriter && targetRef.current) {
        targetRef.current.innerHTML = '';
        writerRef.current = window.HanziWriter.create(targetRef.current, char, {
          width: size, height: size, padding: showInfo ? 14 : 20,
          strokeColor: color, radicalColor: '#ef4444', showOutline: true,
          strokeAnimationSpeed: speed, delayBetweenStrokes: 200 / speed,
        });
      } else {
        timer = setTimeout(init, 100);
      }
    };
    timer = setTimeout(init, isFirst.current ? 450 : 50);
    isFirst.current = false;
    return () => { mounted = false; clearTimeout(timer); };
  }, [char, color, speed, showInfo, size]);

  const animate = () => writerRef.current?.animateCharacter();
  const iconSize = showInfo ? 16 : 20;

  return (
    <div className={`flex flex-col items-center bg-white rounded-[2rem] shadow-sm border border-slate-100 transition-all hover:shadow-xl hover:border-indigo-200 ${showInfo ? 'p-4' : 'p-6'}`}>
      <div
        ref={targetRef}
        className="cursor-pointer transform transition-transform hover:scale-105 flex items-center justify-center shrink-0 [&>svg]:!max-w-none"
        style={{ width: size, height: size }}
        onClick={animate}
      />
      {showInfo && (
        <div className="mt-3 text-center w-full px-2">
          <p className="text-indigo-600 font-black text-base">{pinyin}</p>
          <p className="text-slate-500 text-xs leading-tight mt-1 h-10 overflow-hidden font-medium">{meaning}</p>
        </div>
      )}
      <div className={`flex gap-3 items-center w-full justify-center border-t border-slate-50 ${showInfo ? 'mt-3 pt-3' : 'mt-6 pt-5'}`}>
        <button onClick={animate} className="p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm" title={t('stroke.animate')}>
          <PlayCircle size={iconSize} />
        </button>
        <button onClick={() => onSpeak(char)} className="p-2.5 bg-emerald-50 text-emerald-600 rounded-2xl hover:bg-emerald-600 hover:text-white transition-all shadow-sm" title={t('stroke.listen')}>
          <Volume2 size={iconSize} />
        </button>
        {!showInfo && <span className="text-4xl font-black text-slate-800 ml-2">{char}</span>}
      </div>
    </div>
  );
}
