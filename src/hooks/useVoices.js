import { useState, useEffect, useCallback } from 'react';
import { extractHanzi } from '../util/hanzi';

export function useVoices(speechRate = 0.8) {
  const [voices, setVoices] = useState([]);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState('');

  useEffect(() => {
    const synth = window.speechSynthesis;
    if (!synth) return;

    const load = () => {
      const zh = synth.getVoices().filter((v) => v.lang.toLowerCase().includes('zh'));
      setVoices(zh);
      if (zh.length > 0 && !selectedVoiceURI) setSelectedVoiceURI(zh[0].voiceURI);
    };

    load();
    synth.onvoiceschanged = load;
  }, [selectedVoiceURI]);

  const speak = useCallback(
    (text) => {
      const synth = window.speechSynthesis;
      if (!synth) return;
      synth.cancel();
      const hanzi = extractHanzi(text).join('');
      if (!hanzi) return;
      const u = new SpeechSynthesisUtterance(hanzi);
      u.lang = 'zh-CN';
      u.rate = speechRate;
      if (selectedVoiceURI) {
        const v = voices.find((v) => v.voiceURI === selectedVoiceURI);
        if (v) u.voice = v;
      }
      synth.speak(u);
    },
    [voices, selectedVoiceURI, speechRate],
  );

  return { voices, selectedVoiceURI, setSelectedVoiceURI, speak };
}
