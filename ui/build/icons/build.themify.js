const path = require('path')
const { green, blue, red } = require('kolorist')
const { readFile, writeFile } = require('../utils')

const name = 'themify'
const inputLocation = `../../src/components/icon-set/${name}.js`
const outputLocation = `../../src/components/icon-set/${name}.js`
const oldIcons = {}
const icons = []
const blacklisted = [
]

let fa = readFile(path.resolve(__dirname, inputLocation))
fa = fa.split('\n')
fa.shift()
fa.shift()
fa.shift()
fa.pop()
fa.pop()
fa.pop()
fa = '[\n' + fa.join(',\n') + '\n]\n'
// eslint-disable-next-line no-eval
fa = eval(fa)
fa.forEach(f => {
  const name = f.name
  const tags = f.tags
  oldIcons[name] = { tags: Array(tags).join(',') }
})

const location = require.resolve('@quasar/extras/themify/themify.css')
const fileContents = readFile(location)

fileContents
  .split('\n')
  .forEach(line => {
    line = line.trim()
    if (line.startsWith('.')) {
      const pos = line.indexOf(':before')
      if (pos > 0) {
        line = line.slice(1, pos)
        if (blacklisted.includes(line) === false) {
          if (oldIcons[line]) {
            const tags = oldIcons[line].tags.split(',').map(tag => {
              if (tag === '') return tag
              return "'" + tag + "'"
            }).join(', ')
            icons.push(`{ name: '${line}', tags: [${tags}] }`)
          }
          else {
            icons.push(`{ name: '${line}', tags: [] }`)
          }
        }
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
