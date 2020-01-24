import { useRef, useEffect } from 'react';
import { createResource } from './create-resource';

const resource = createResource<number>(
  (experimentId, timeout = Infinity, cleanupCallbackRef) =>
    new Promise(resolve => {
      let timeoutId: number;

      if (timeout !== Infinity) {
        timeoutId = window.setTimeout(() => {
          cleanupCallbackRef?.current();
          // Defaults to the 'Original'
          resolve(0);
        }, timeout);
      }

      const callback = (value: string) => {
        timeoutId && clearTimeout(timeoutId);
        resolve(Number(value));
      };

      window.gtag('event', 'optimize.callback', {
        name: experimentId,
        callback,
      });

      cleanupCallbackRef.current = () =>
        window.gtag('event', 'optimize.callback', {
          name: experimentId,
          callback,
          remove: true,
        });
    })
);

export const useGoogleOptimize = (experimentId: string, timeout = Infinity) => {
  const cleanupCallbackRef = useRef<Function>();
  const variant = resource.read(experimentId, timeout, cleanupCallbackRef);

  useEffect(() => {
    return () => {
      if (cleanupCallbackRef.current) {
        cleanupCallbackRef.current();
      }
    };
  }, []);

  return variant;
};

export default useGoogleOptimize;
