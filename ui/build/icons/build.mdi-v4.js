const path = require('path')
const { green, blue } = require('chalk')
const { readFile, writeFile } = require('../utils')

const name = 'mdi-v4'
const inputLocation = `../../src/components/icon-set/${name}.js`
const outputLocation = `../../src/components/icon-set/${name}.js`
let oldIcons = {}
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

const location = require.resolve('@quasar/extras/mdi-v4/mdi-v4.css')
const fileContents = readFile(location)

fileContents
  .split('\n')
  .forEach(line => {
    line = line.trim()
    if (line.startsWith('.')) {
      const pos = line.indexOf(':before')
      if (pos > 0) {
        line = line.slice(1, pos - 1)
        if (blacklisted.includes(line) === false) {
          if (oldIcons[line]) {
            const tags = oldIcons[line].tags.split(',').map(tag => {
              if (tag === '') return tag
              return "'" + tag + "'"
            }).join(', ')
            icons.push(`{ name: '${line}', tags: [${tags}] }`)
          } else {
            icons.push(`{ name: '${line}', tags: [] }`)
          }
        }
      }
    }
  })

if (icons.length === 0) {
  console.log(`${red('[error]')}  MDI icons parsed 0 icons...exiting`)
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
