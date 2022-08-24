import { useState, useEffect } from 'react';

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // cleanup function
    // const cleanUp = () => {
    //    console.log('run if useEffect dep change');
    //   window.removeEventListener('resize', handleResize);
    // };
    // return cleanUp();
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return windowSize;
};
export default useWindowSize;