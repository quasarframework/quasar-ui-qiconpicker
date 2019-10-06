/*
  This generator is a bit different from the rest. Fontawesome uses
  a prefix (ex: 'fab', 'fas', etc) to determine which font file to
  use. However, this information is not in the css file that we will
  be parsing. So, we open the old fontawesome-v5.js file (which was
  made for web, not node), read it in, make adjustments, and eval it
  (yeah I know, eval bad). Then we make a map of fonts and the
  prefixes so we can add the prefix back. If it's a new font, we make
  the prefix '---' so we can search the file for it and hand-curate
  the prefix manually. Then, we have a finished file.
*/
const path = require('path')
const { green, blue } = require('chalk')
const { readFile, writeFile } = require('../utils')

const name = 'fontawesome-v5'
const inputLocation = `../../src/component/icon-set/${name}.js`
const outputLocation = `../../src/component/icon-set/${name}.js`
let oldIcons = {}
let icons = []
let blacklisted = [
  'fa-font-awesome-logo-full'
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
  let names = f.name.split(' ')
  oldIcons[names[1]] = names[0]
})

const location = require.resolve('@quasar/extras/fontawesome-v5/fontawesome-v5.css')
const fileContents = readFile(location)

fileContents
  .split('\n')
  .forEach(line => {
    if (line.startsWith('.')) {
      const pos = line.indexOf(':before')
      if (pos > 0) {
        line = line.slice(1, pos)
        if (blacklisted.includes(line) === false) {
          if (oldIcons[line]) {
            icons.push(oldIcons[line] + ' ' + line)
          } else {
            icons.push('--- ' + line)
          }
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