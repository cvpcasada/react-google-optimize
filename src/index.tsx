import * as React from 'react';
import useGoogleOptimize from './use-google-optimize';

const VariantContext = React.createContext(0);

export { useGoogleOptimize };

export const Experiment: React.FC<{
  id: string;
  timeout?: number;
}> = ({ id, timeout = Infinity, children }) => {
  const variant = useGoogleOptimize(id, timeout);

  return (
    <VariantContext.Provider value={variant}>
      {children}
    </VariantContext.Provider>
  );
};

export const Variant: React.FC<{ id?: number }> = ({ id = 0, children }) => {
  const variant = React.useContext(VariantContext);
  if (variant === id) return <>{children}</>;
  return null;
};
