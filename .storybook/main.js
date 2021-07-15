const path = require('path');
const toPath = _path => path.join(process.cwd(), _path);

module.exports = {
  "stories": [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  webpackFinal: async config => {
    const emotionReactEleven = path.dirname(require.resolve('@emotion/react/package.json'));
    const emotionStyledEleven = path.dirname(require.resolve('@emotion/styled/package.json'));
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          '@emotion/styled': emotionStyledEleven,
          '@emotion/core': emotionReactEleven,
        },
      },
    };
  },
}