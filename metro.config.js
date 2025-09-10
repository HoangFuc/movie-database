const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

const config = {
  reporter: {
    update(event) {
      // Forward Metro events
      require('metro/src/lib/reporting').update(event);

      // Forward console logs
      if (event.type === 'log') {
        event.data.forEach(msg => {
          console.log(msg);
        });
      }
    },
  },
};

module.exports = mergeConfig(defaultConfig, config);
