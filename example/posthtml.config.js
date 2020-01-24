module.exports = {
  plugins: {
    'posthtml-expressions': {
      locals: {
        REACT_APP_GA_ID: process.env.REACT_APP_GA_ID,
        REACT_APP_OPTIMIZE_ID: process.env.REACT_APP_OPTIMIZE_ID,
        REACT_APP_EXPERIMENT_IDS: process.env.REACT_APP_EXPERIMENT_IDS,
      },
    },
  },
};
