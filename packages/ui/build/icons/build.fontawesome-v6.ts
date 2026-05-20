const { buildFontawesomeV6 } = require('./build.extras-icon-set')

buildFontawesomeV6().catch((err) => {
  console.error(err)
  process.exit(1)
})
