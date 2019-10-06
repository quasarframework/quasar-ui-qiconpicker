const path = require('path')
const { green, blue } = require('chalk')
const { readFile, writeFile } = require('../utils')

const name = 'ionicons-v4'
const outputLocation = `../../src/component/icon-set/${name}.js`
let icons = []
let blacklisted = [
  'ionicons'
]

const location = require.resolve('@quasar/extras/ionicons-v4/ionicons-v4.css')
const fileContents = readFile(location)

fileContents
  .split('\n')
  .forEach(line => {
    if (line.startsWith('.')) {
      const pos = line.indexOf(':before')
      if (pos > 0) {
        line = line.slice(1, pos)
        if (blacklisted.includes(line) === false) {
          icons.push(line)
        }
      }
    }
  })

let output = 'export default {\n'
output += `  name: '${name}',\n`
output += '  icons: [\n'

icons.forEach((icon, index) => {
  output += `    { name: '${icon}' },\n`
})

output += '  ]\n'
output += '}\n'

writeFile(path.resolve(__dirname, outputLocation), output)
console.log(`${blue('[icon]')} ${green(name + ':')} ${icons.length} generated`)
