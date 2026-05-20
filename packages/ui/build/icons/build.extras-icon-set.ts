const fs = require('fs')
const path = require('path')
const { green, blue, red } = require('kolorist')
const { validateTags, writeFile } = require('../build.utils')

function iconSetPath(name) {
  return path.resolve(__dirname, `../../src/components/icon-set/${name}.js`)
}

function pascalToKebab(value) {
  return value
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase()
}

function pascalToSnake(value) {
  return pascalToKebab(value).replace(/-/g, '_')
}

function readExistingIconMetadata(names) {
  const oldIcons = new Map()

  names.forEach((name) => {
    const location = iconSetPath(name)

    if (fs.existsSync(location) !== true) {
      return
    }

    let source = fs.readFileSync(location, 'utf-8')
    source = source.split('\n')
    source.shift()
    source.shift()
    source.shift()
    source.pop()
    source.pop()
    source.pop()
    source = '[\n' + source.join('\n') + '\n]\n'

    // Existing icon-set source files are data-only JS object literals.
    // eslint-disable-next-line no-eval
    const icons = eval(source)

    icons.forEach((icon) => {
      const tags = Array.isArray(icon.tags) ? icon.tags : []
      oldIcons.set(icon.name, tags)

      if (icon.prefix !== void 0) {
        oldIcons.set(`${icon.prefix} ${icon.name}`, tags)
      }
    })
  })

  return oldIcons
}

function formatTags(tags) {
  const normalized = [...new Set(tags.filter(Boolean))].sort()
  validateTags(normalized)

  return normalized.map((tag) => JSON.stringify(tag)).join(', ')
}

function writeIconSet(name, icons) {
  if (icons.length === 0) {
    console.log(`${red('[error]')}  ${name} icons parsed 0 icons...exiting`)
    process.exit(1)
  }

  let output = 'export default {\n'
  output += `  name: ${JSON.stringify(name)},\n`
  output += '  icons: [\n'

  icons.forEach((icon, index) => {
    if (index !== 0) {
      output += ',\n'
    }

    const properties = [
      `name: ${JSON.stringify(icon.name)}`,
      icon.prefix !== void 0 ? `prefix: ${JSON.stringify(icon.prefix)}` : void 0,
      icon.icon !== void 0 ? `icon: ${JSON.stringify(icon.icon)}` : void 0,
      `tags: [${formatTags(icon.tags || [])}]`,
    ].filter(Boolean)

    output += `    { ${properties.join(', ')} }`
  })

  output += '\n  ]\n'
  output += '}\n'

  return writeFile(iconSetPath(name), output).then(() => {
    console.log(`${blue('[icon]')} ${green(name + ':')} ${icons.length} generated`)
  })
}

function buildSvgIconSet({ name, packageName = name, oldSetNames = [] }) {
  const oldIcons = readExistingIconMetadata([name, ...oldSetNames])
  const iconsJson = require(`@quasar/extras/${packageName}/icons.json`)
  const extras = require(`@quasar/extras/${packageName}`)

  const icons = iconsJson.map((exportName) => ({
    name: exportName,
    icon: extras[exportName],
    tags: oldIcons.get(exportName) || [],
  }))

  return writeIconSet(name, icons)
}

function buildFontawesomeV6() {
  const name = 'fontawesome-v6'
  const oldIcons = readExistingIconMetadata([name, 'fontawesome-v5'])
  const iconsJson = require('@quasar/extras/fontawesome-v6/icons.json')
  const prefixes = new Set(['fab', 'far', 'fas'])

  const icons = iconsJson
    .map((exportName) => {
      const prefix = exportName.slice(0, 3)

      if (prefixes.has(prefix) !== true) {
        return void 0
      }

      const iconName = `fa-${pascalToKebab(exportName.slice(3))}`
      const tags = oldIcons.get(`${prefix} ${iconName}`) || oldIcons.get(iconName) || []

      if (prefix === 'fab' && tags.includes('brand') !== true) {
        tags.push('brand')
      }

      return {
        name: iconName,
        prefix,
        tags,
      }
    })
    .filter(Boolean)

  return writeIconSet(name, icons)
}

function buildMaterialSymbols({ name, constantPrefix, iconPrefix }) {
  const oldIcons = readExistingIconMetadata([name])
  const iconsJson = require(`@quasar/extras/${name}/icons.json`)

  const icons = iconsJson.map((exportName) => {
    const iconName = iconPrefix + pascalToSnake(exportName.slice(constantPrefix.length))

    return {
      name: iconName,
      tags: oldIcons.get(iconName) || [],
    }
  })

  return writeIconSet(name, icons)
}

module.exports = {
  buildFontawesomeV6,
  buildMaterialSymbols,
  buildSvgIconSet,
}
