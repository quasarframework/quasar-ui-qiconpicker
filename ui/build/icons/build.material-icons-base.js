const path = require('path')
const { green, blue, red } = require('kolorist')
const { readFile, writeFile } = require('../utils')

const themeMap = {
  baseline: '',
  outlined: 'o_',
  round: 'r_',
  sharp: 's_'
}

function run (googleIcons, theme) {
  const name = 'material-icons' + (theme === 'baseline' ? '' : '-' + theme)
  // console.log(`${blue('[building]')}  ${name}...`)
  const inputLocation = `../../src/components/icon-set/${name}.js`
  const outputLocation = `../../src/components/icon-set/${name}.js`
  const oldIcons = {}
  const icons = []
  const blacklisted = [
  ]
  const whiteListed = {
    baseline: [
      'border_color',
      'do_not_disturb',
      'do_not_disturb_alt',
      'do_not_disturb_off',
      'do_not_disturb_on',
      'file_download',
      'file_upload',
      'format_color_fill',
      'format_color_text',
      'info_outline',
      'label_outline',
      'lightbulb_outline',
      'lock_outline',
      'mode_edit',
      'motorcycle',
      'network_cell',
      'network_wifi',
      'pie_chart_outlined',
      'sim_card_alert'
    ],
    outlined: [
      'motorcycle',
      'pie_chart_outlined'
    ],
    round: [
      'info_outline',
      'label_outline',
      'lightbulb_outline',
      'lock_outline',
      'motorcycle',
      'pie_chart_outlined'
    ],
    sharp: [
      'label_outline',
      'lightbulb_outline',
      'lock_outline',
      'motorcycle'
    ]
  }

  let fa = readFile(path.resolve(__dirname, inputLocation))
  fa = fa.split('\n')
  fa.shift()
  fa.shift()
  fa.shift()
  fa.pop()
  fa.pop()
  fa.pop()
  fa = '[\n' + fa.join('\n') + '\n]\n'
  // eslint-disable-next-line no-eval
  fa = eval(fa)
  fa.forEach(f => {
    const name = f.name
    const tags = f.tags
    oldIcons[name] = { tags: Array(tags).join(',') }
  })

  googleIcons.forEach(gi => {
    gi.name = themeMap[theme] + gi.name
  })

  whiteListed[theme].forEach(name => {
    googleIcons.push({ name: themeMap[theme] + name })
  })

  googleIcons.sort((a, b) => {
    return ('' + a.name).localeCompare(b.name)
  })

  googleIcons
    .forEach(gi => {
      const name = gi.name
      if (blacklisted.includes(name) === false) {
        if (oldIcons[name]) {
          const tags = oldIcons[name].tags.split(',').map(tag => {
            if (tag === '') return tag
            return "'" + tag + "'"
          }).join(', ')
          icons.push(`{ name: '${name}', tags: [${tags}] }`)
        }
        else {
          icons.push(`{ name: '${name}', tags: [] }`)
        }
      }
    })

  if (icons.length === 0) {
    console.log(`${red('[error]')}  ${name} icons parsed 0 icons...exiting`)
    process.exit(1)
  }

  let output = 'export default {\n'
  output += `  name: '${name}',\n`
  output += '  icons: [\n'

  icons.forEach((icon, index) => {
    if (index !== 0) {
      output += ',\n'
    }

    output += `    ${icon}`
  })

  output += '\n  ]\n'
  output += '}\n'

  writeFile(path.resolve(__dirname, outputLocation), output)
  console.log(`${blue('[icon]')} ${green(name + ':')} ${icons.length} generated`)
}

module.exports = {
  run
}
