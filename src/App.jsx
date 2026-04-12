import { useState, useMemo } from 'react';
import { Sliders } from 'lucide-react';
import { useVoices } from './hooks/useVoices';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useI18n } from './i18n/I18nContext';
import { extractHanzi, DEFAULT_FONT_FAMILY } from './util/hanzi';
import Header from './components/Header';
import TemplateSidebar from './components/Template/TemplateSidebar';
import TemplatePreview from './components/Template/TemplatePreview';
import StrokeSidebar from './components/Stroke/StrokeSidebar';
import StrokeView from './components/Stroke/StrokeView';
import PinyinSidebar from './components/Pinyin/PinyinSidebar';
import PinyinView from './components/Pinyin/PinyinView';
import RadicalsSidebar from './components/Radicals/RadicalsSidebar';
import RadicalsView from './components/Radicals/RadicalsView';

export default function App() {
  const { t } = useI18n();
  const [viewMode, setViewMode] = useState('stroke');
  const [radicalSearch, setRadicalSearch] = useState('');
  const { voices, selectedVoiceURI, setSelectedVoiceURI, speak } = useVoices();

  const [templateData, setTemplateData] = useLocalStorage('hanzi:template', {
    text: '', paperSize: 'a4', columns: 12, gridStyle: 'star', rowGap: 4,
    lineColor: '#cbd5e1', guideColor: '#94a3b8', repeatText: true,
    insertGapRows: false, fontSize: 75, fontFamily: DEFAULT_FONT_FAMILY,
  });
  const [strokeData, setStrokeData] = useLocalStorage('hanzi:stroke', { text: '', speed: 1.5, color: '#1e293b' });
  const [pinyinData, setPinyinData] = useLocalStorage('hanzi:pinyin', { text: '', toneType: 'symbol', nonTone: false, showHanzi: true });

  const pinyinResult = useMemo(() => {
    if (!pinyinData.text || !window.pinyinPro) return [];
    const chars = extractHanzi(pinyinData.text);
    if (!chars.length) return [];
    const result = window.pinyinPro.pinyin(chars.join(''), { type: 'array', toneType: pinyinData.toneType, nonTone: pinyinData.nonTone });
    return chars.map((char, i) => ({ char, pinyin: result[i] || '' }));
  }, [pinyinData.text, pinyinData.toneType, pinyinData.nonTone]);

  const voiceProps = { voices, selectedVoiceURI, onSelectVoice: setSelectedVoiceURI };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans overflow-x-hidden text-[14px]">
      <style>{`
        @media print {
          @page { size: ${templateData.paperSize === 'a4' ? '210mm 297mm' : '8.5in 11in'}; margin: 0; }
          .print\\:hidden { display: none !important; }
          main { display: block !important; margin: 0 !important; padding: 0 !important; max-width: none !important; }
        }
      `}</style>

      <Header viewMode={viewMode} onChangeMode={setViewMode} />

      <main className="flex-1 flex flex-col lg:flex-row p-3 lg:p-8 gap-5 lg:gap-8 max-w-[1600px] mx-auto w-full items-start">
        {/* Sidebar */}
        <aside className="w-full lg:w-[380px] lg:sticky lg:top-24 lg:max-h-[calc(100vh-120px)] lg:overflow-y-auto custom-scrollbar bg-white p-5 lg:p-6 rounded-[2rem] lg:rounded-[2.5rem] shadow-sm border border-slate-200 print:hidden shrink-0 flex flex-col gap-5">
          <div className="flex items-center gap-2 text-indigo-600">
            <Sliders size={18} />
            <h2 className="text-xs font-black uppercase tracking-widest">{t('sidebar.title')}</h2>
          </div>
          {viewMode === 'template' && <TemplateSidebar data={templateData} onChange={setTemplateData} />}
          {viewMode === 'stroke' && <StrokeSidebar data={strokeData} onChange={setStrokeData} {...voiceProps} />}
          {viewMode === 'pinyin' && <PinyinSidebar data={pinyinData} onChange={setPinyinData} pinyinResult={pinyinResult} {...voiceProps} />}
          {viewMode === 'radicals' && <RadicalsSidebar search={radicalSearch} onSearchChange={setRadicalSearch} {...voiceProps} />}
        </aside>

        {/* Main Content */}
        <div className="flex-1 w-full min-w-0">
          {viewMode === 'template' && <TemplatePreview data={templateData} />}
          {viewMode === 'stroke' && <StrokeView data={strokeData} onSpeak={speak} />}
          {viewMode === 'pinyin' && <PinyinView pinyinResult={pinyinResult} showHanzi={pinyinData.showHanzi} onSpeak={speak} />}
          {viewMode === 'radicals' && <RadicalsView search={radicalSearch} onSpeak={speak} />}
        </div>
      </main>
    </div>
  );
}
