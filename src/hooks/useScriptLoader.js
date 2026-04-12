import { useState, useEffect } from 'react';

export function useScriptLoader(src, id) {
  const [loaded, setLoaded] = useState(() => !!document.getElementById(id));

  useEffect(() => {
    if (document.getElementById(id)) {
      setLoaded(true);
      return;
    }
    const script = document.createElement('script');
    script.id = id;
    script.src = src;
    script.async = true;
    script.onload = () => setLoaded(true);
    document.head.appendChild(script);
  }, [src, id]);

  return loaded;
}
