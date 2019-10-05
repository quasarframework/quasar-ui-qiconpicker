const fs = require('fs')
const path = require('path')

const name = 'mdi-v4'
const outputLocation = `../../src/component/icon-set/${name}.js`
let icons = []
let blacklisted = [
  'md',
  'mdi-blank',
  'mdi-18px.mdi-set, .mdi-18px.md',
  'mdi-24px.mdi-set, .mdi-24px.md',
  'mdi-36px.mdi-set, .mdi-36px.md',
  'mdi-48px.mdi-set, .mdi-48px.md',
  'mdi-dar',
  'mdi-dark.mdi-inactiv',
  'mdi-ligh',
  'mdi-light.mdi-inactiv',
  'mdi-rotate-4',
  'mdi-rotate-9',
  'mdi-rotate-13',
  'mdi-rotate-18',
  'mdi-rotate-22',
  'mdi-rotate-27',
  'mdi-rotate-31',
  'mdi-flip-',
  'mdi-spi'
]

const location = require.resolve('@quasar/extras/mdi-v4/mdi-v4.css')
const fileContents = fs.readFileSync(location, 'utf8')

fileContents
  .split('\n')
  .forEach(line => {
    if (line.startsWith('.')) {
      const pos = line.indexOf(':before')
      if (pos > 0) {
        line = line.slice(1, pos - 1)
        if (blacklisted.includes(line) === false) {
          // console.log(`${line}`)
          icons.push(line)
        }
      }
    }
  })

  let output = 'export default {\n'
  output += `  name: ${name},\n`
  output += '  icons: [\n'

  icons.forEach((icon, index) => {
    output += `    { name: '${icon}' },\n`
  })

  output += '  ]\n'
  output += '}\n'

fs.writeFileSync(path.resolve(__dirname, outputLocation), output, 'utf8')
console.log(`MDI Icons generation: Done - count: ${icons.length}`)
