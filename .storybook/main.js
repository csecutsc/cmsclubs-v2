module.exports = {
  stories: ['../docs/**/*.stories.mdx', '../src/**/*.stories.mdx'],
  // Gatsby specific stuff (DW about it)
  webpackFinal: async (config) => {
    config.module.rules[0].exclude = [/node_modules\/(?!(gatsby)\/)/];
    config.module.rules[0].use[0].loader = require.resolve('babel-loader');
    config.module.rules[0].use[0].options.presets = [
      require.resolve('@babel/preset-react'),
      require.resolve('@babel/preset-env'),
    ];
    config.module.rules[0].use[0].options.plugins = [
      require.resolve('@babel/plugin-proposal-class-properties'),
      require.resolve('babel-plugin-remove-graphql-queries'),
    ];
    config.resolve.mainFields = ['browser', 'module', 'main'];
    return config;
  },
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    {
      name: '@storybook/preset-scss',
      options: {
        cssLoaderOptions: {
          url: false,
          modules: {
            localIdentName: '[path][name]__[local]--[hash:base64:5]',
          },
        },
      },
    },
  ],
};
