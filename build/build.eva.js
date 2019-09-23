const fs = require('fs')
const path = require('path')

const outputLocation = '../src/component/utils/eva-icons.js'
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

let output = 'export default [\n'
icons.forEach((icon, index) => {
  if (index !== 0) output += ',\n'
  output += `  { name: '${icon}' }`
})
output += '\n]\n'

fs.writeFileSync(path.resolve(__dirname, outputLocation), output, 'utf8')
console.log(`Ion Icons generation: Done - count: ${icons.length}`)
