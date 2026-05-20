const { buildSvgIconSet } = require('./build.extras-icon-set')

buildSvgIconSet({
  name: 'ionicons-v7',
  oldSetNames: ['ionicons-v6'],
}).catch((err) => {
  console.error(err)
  process.exit(1)
})
