/** @type { import('@storybook/react-webpack5').StorybookConfig } */

const custom = require('../webpack.config');

const config = {
  core: {
    options: {
      lazyCompilation: true,
      fsCache: true,
    },
  },
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  webpackFinal: async (config) => {
    // Remove the default `babel-loader` for `.js`/`.jsx` files
    config.module.rules = config.module.rules.filter((rule) => {
      return !rule.loader?.includes('babel')
    })
    config.module.rules = config.module.rules.map(rule => {
      if(rule.oneOf) {
        const modifiedRule = {
          ...rule,
          oneOf: rule.oneOf.filter((rule) => {
            return !rule.loader?.includes('babel')
          })
        }
        
        return modifiedRule;
      }
      
      return rule;
    })
    const mjsRules = config.module.rules
    .filter(rule => !rule.oneOf 
      // && !rule.test?.toString().includes('md')
    )
    // .map(rule => {
    //   return {...rule, test: rule.test?.toString()}
    // })
    // .filter(rule => rule.test?.includes('mjs'));
    console.log(JSON.stringify(mjsRules, null, 2))
    return {
      ...config,
      module: {
        ...config.module,
        rules: [
          // ...config.module.rules,
          ...mjsRules,
          ...custom.module.rules,
          // .filter(rule => rule.loader !== 'swc-loader'),
          {
            test: /\.stories\.[jt]sx?$/,
            loader: require.resolve('@storybook/source-loader'),
            // include: path.resolve(__dirname, '../assets/stories'),
            // enforce: 'pre',
            // options: {
            //   parser: 'typescript',
            // },
          },
        ]
      }
    };
  },
  addons: [
    {
      name: 'storybook-addon-swc',
      options: {
        enable: true,
        enableSwcLoader: true,
        enableSwcMinify: false,
        swcLoaderOptions: {},
        swcMinifyOptions: {},
      },
    },
    "@storybook/preset-create-react-app",
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  typescript: {
    check: false,
  },
  staticDirs: ["../public"],
};
export default config;
