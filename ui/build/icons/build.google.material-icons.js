const fetch = require('cross-fetch')
const { blue } = require('chalk')

const themeMap = {
  baseline: 'baseline',
  outlined: 'outlined',
  round: 'round',
  sharp: 'sharp'
}

async function run () {
  try {
    console.log(`${blue('[downloading]')} Google Material Design SVG icons meta data...`)

    const response = await fetch('https://fonts.google.com/metadata/icons')
    const text = await response.text()
    const data = JSON.parse(text.replace(")]}'", ''))
    let icons = data.icons
    icons = icons.map((icon, index) => ({ index, ...icon }))
    Object.keys(themeMap).forEach(theme => {
      // give function clean copy of google icons
      require('./build.material-icons-base.js').run(JSON.parse(JSON.stringify(icons)), themeMap[theme])
    })
  } catch (err) {
    console.log('err', err)
    throw err
  }
}

run()
