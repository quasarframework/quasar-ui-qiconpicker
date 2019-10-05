const fs = require('fs')
const path = require('path')

const name = 'eva-icons'
const outputLocation = `../../src/component/icon-set/${name}.js`
let icons = []
let blacklisted = [
]

const location = require.resolve('@quasar/extras/eva-icons/eva-icons.css')
const fileContents = fs.readFileSync(location, 'utf8')

fileContents
  .split('\n')
  .forEach(line => {
    if (line.startsWith('.')) {
      const pos = line.indexOf(':before')
      if (pos > 0) {
        line = line.slice(1, pos - 1)
        if (blacklisted.includes(line) === false) {
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
console.log(`Ion Icons generation: Done - count: ${icons.length}`)
