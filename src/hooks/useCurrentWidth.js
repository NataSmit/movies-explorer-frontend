import React from 'react';
import {useEffect, useState} from 'react';

export const useCurrentWidth = () =>{
  const [windowInnerWidth, setWindowInnerWidth] = useState(window.innerWidth);

  useEffect(() => {
    let timeoutId = null;

    function handleWindowWidth() {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setWindowInnerWidth(window.innerWidth), 150);
    }

     window.addEventListener('resize', handleWindowWidth)
     return () => window.removeEventListener('resize', handleWindowWidth)
  }, [])

  return windowInnerWidth;
}