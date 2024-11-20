// src/hooks/useWindowWidth.ts

import { useState, useEffect } from 'react';

const useWindowWidth = () => {
  const [width, setWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 0);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    // Agregar listener al montarse
    window.addEventListener('resize', handleResize);

    // Remover listener al desmontarse
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
};

export default useWindowWidth;