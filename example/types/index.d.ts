declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_EXPERIMENT_IDS: string;
    NODE_ENV: 'development' | 'production';
  }
}
