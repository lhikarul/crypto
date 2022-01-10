const {alias, configPaths} = require('react-app-rewire-alias')

const aliasMap = configPaths('./tsconfig.paths.json') // or jsconfig.paths.json

module.exports = alias(aliasMap)
// module.exports.jest = aliasJest(aliasMap)
// const { alias } = require('react-app-rewire-alias');

// module.exports = function override(config) {
//   console.log('hello')
//   alias({
//     '@': 'src',
//     '@views': 'src/views'
//   })
//   return config;
// }