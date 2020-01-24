# React Google Optimize

[WIP]

## API (usage)

```jsx
import { Experiment, Variant } from '@cyca/react-google-optimize';

const App = () => {
  return (
    <React.Suspense fallback={<>Loading...</>}>
      <Experiment experimentId="YOUR_EXPERIMENT_ID">
        <Variant>Default Variant</Variant>
        <Variant id={1}>Experimental Variant</Variant>
      </Experiment>
    </React.Suspense>
  );
};

// ----------------

// OR:

import { useGoogleOptimize } from '@cyca/react-google-optimize';

const Experiment = () => {
  const variant = useGoogleOptimize('YOUR_EXPERIMENT_ID');

  switch (variant) {
    case 0:
      return <div>Default Variant</div>;
    case 1:
      return <div>Alternative Variant</div>;
  }
};

const App = () => (
  <React.Suspense>
    <Experiment />
  </React.Suspense>
);
```
