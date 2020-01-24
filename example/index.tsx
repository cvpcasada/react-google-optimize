import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Experiment, Variant } from '../.';

const EXPERIMENT_IDS = process.env.REACT_APP_EXPERIMENT_IDS.split(',');

const App = () => {
  return (
    <React.Suspense fallback={<div>loading experiments</div>}>
      <Experiment id={EXPERIMENT_IDS[0]}>
        <Variant>Default Variant</Variant>
        <Variant id={1}>Experimental Variant</Variant>
      </Experiment>
    </React.Suspense>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
