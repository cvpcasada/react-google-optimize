# React Google Optimize

## API (usage)

```jsx
import { Experiment, Variant } from '@cyca/react-google-optimize';

const App = () => {
  // note: please specify timeout else it defaults to INFINITY
  // variant id default is 0
  return (
    <React.Suspense fallback="Loading...">
      <Experiment experimentId="YOUR_EXPERIMENT_ID" timeout={1000}>
        <Variant>Default Variant</Variant>
        <Variant id={1}>Experimental Variant</Variant>
      </Experiment>
    </React.Suspense>
  );
};

// ----------------

// OR:

import { useGoogleOptimize } from '@cyca/react-google-optimize';

const MyExperiment = () => {
  const variant = useGoogleOptimize('YOUR_EXPERIMENT_ID', 3000);

  switch (variant) {
    case 0:
      return <div>Default Variant</div>;
    case 1:
      return <div>Alternative Variant</div>;
  }
};

const App = () => (
  <React.Suspense fallback="Loading...">
    <MyExperiment experimentId="YOUR_EXPERIMENT_ID" />
  </React.Suspense>
);
```
