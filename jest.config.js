// Or async function
module.exports = async config => {
  return {
    ...config,
    verbose: true,
    preset: 'react-native',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    transformIgnorePatterns: [
      'node_modules/?!(@react-native-segmented-control)',
    ],
  };
};
