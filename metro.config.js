// const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

// /**
//  * Metro configuration
//  * https://reactnative.dev/docs/metro
//  *
//  * @type {import('metro-config').MetroConfig}
//  */
// const config = {};

// module.exports = mergeConfig(getDefaultConfig(__dirname), config);




// Import the required functions
const { getDefaultConfig } = require('@react-native/metro-config');
const { wrapWithReanimatedMetroConfig } = require('react-native-reanimated/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const defaultConfig = getDefaultConfig(__dirname);

// If you have any custom config, you can add it to the `config` object
const config = {
  // Your custom Metro configurations (if any)
};

// Merge the default config with your custom config, and wrap it with Reanimated config
module.exports = wrapWithReanimatedMetroConfig({
  ...defaultConfig,
  ...config,  // Any custom Metro configurations
});
