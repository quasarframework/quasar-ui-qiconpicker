const path = require('path')
const {green, blue, red} = require('kolorist')
const {readFile, writeFile} = require('../utils')

const themeMap = {
  baseline: '',
  outlined: 'o_',
  round: 'r_',
  sharp: 's_'
}

function run(googleIcons, theme) {
  const name = 'material-icons' + (theme === 'baseline' ? '' : '-' + theme)
  // console.log(`${blue('[building]')}  ${name}...`)
  const inputLocation = `../../src/components/icon-set/${name}.js`
  const outputLocation = `../../src/components/icon-set/${name}.js`
  const oldIcons = {}
  const icons = []
  const blacklisted = [
    'grade',
    'grading',
    'dynamic_feed',
    'o_dynamic_feed',
    'r_dynamic_feed',
    's_dynamic_feed',
    's_grade',
    's_grading',
    'r_grade',
    'r_grading',
    'o_grade',
    'o_grading'
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
    oldIcons[name] = {tags: Array(tags).join(',')}
  })

  googleIcons.forEach(gi => {
    gi.name = themeMap[theme] + gi.name
  })

  whiteListed[theme].forEach(name => {
    googleIcons.push({name: themeMap[theme] + name})
  })

  googleIcons.sort((a, b) => {
    return ('' + a.name).localeCompare(b.name)
  })

  googleIcons
    .forEach(gi => {
      const name = gi.name
      if (blacklisted.includes(name) === false) {
        if (oldIcons[name]) {

          const oldTags = oldIcons[name].tags
            .split(',')

          // Merge old and new tags
          const tagsWithoutDuplicates = [...new Set(oldTags.concat(gi.tags))];
          const newTags = tagsWithoutDuplicates
            .filter(tag => tag !== "")
            .map(tag => "'" + tag + "'")
            .join(', ')

          // Add merged tags old/new
          icons.push(`{ name: '${name}', tags: [${newTags}] }`)
        } else {
          // Add new tags
          icons.push(`{ name: '${name}', tags: [${gi.tags}] }`)
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
    .catch(exception => console.error(exception))
  console.log(`${blue('[icon]')} ${green(name + ':')} ${icons.length} generated`)
}

module.exports = {
  run
}
