const fs = require('fs')
const path = require('path')
const { createFolder, writeFile } = require('./utils')

const rootDir = path.resolve(__dirname, '..')
const srcDir = path.join(rootDir, 'src/components')
const apiDir = path.join(rootDir, 'dist/api')
const typesDir = path.join(rootDir, 'dist/types')
const sourceTypesFile = path.join(rootDir, 'types/types.d.ts')
const distTypesFile = path.join(typesDir, 'types.d.ts')
const distIndexFile = path.join(typesDir, 'index.d.ts')

function pascalCase(value) {
  return value
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')
}

function camelCase(value) {
  const name = pascalCase(value)
  return name.charAt(0).toLowerCase() + name.slice(1)
}

function getDescription(entry) {
  return typeof entry.desc === 'string' ? entry.desc.replace(/\*\//g, '* /') : ''
}

function getComment(entry, indent = '    ') {
  const desc = getDescription(entry)

  if (!desc) return ''

  return `${indent}/**\n${indent} * ${desc.replace(/\n/g, `\n${indent} * `)}\n${indent} */\n`
}

function getType(entry) {
  if (entry.tsType) {
    return entry.tsType
  }

  if (Array.isArray(entry.values) && entry.values.length > 0) {
    return entry.values.map((value) => JSON.stringify(value)).join(' | ')
  }

  switch (entry.type) {
    case 'Array':
      return 'unknown[]'
    case 'Boolean':
      return 'boolean'
    case 'Function':
      return '(...args: unknown[]) => unknown'
    case 'Number':
      return 'number'
    case 'Object':
      return 'Record<string, unknown>'
    case 'String':
      return 'string'
    default:
      return 'unknown'
  }
}

function getPropsTypes(api) {
  return Object.entries(api.props || {})
    .map(([name, entry]) => {
      const propName = camelCase(name)

      return `${getComment(entry)}    ${propName}? : ${getType(entry)}`
    })
    .join('\n')
}

function getMethodsTypes(api) {
  return Object.entries(api.methods || {})
    .map(([name, entry]) => `${getComment(entry)}    ${name} (): void`)
    .join('\n')
}

function getComponentTypes(name, api) {
  const parts = [getPropsTypes(api), getMethodsTypes(api)].filter(Boolean)

  return `export interface ${name} extends ComponentPublicInstance {\n${parts.join('\n')}\n}\n`
}

function normalizeApi(file) {
  const name = path.basename(file, '.json')
  const source = path.join(srcDir, file)
  const api = JSON.parse(fs.readFileSync(source, 'utf-8'))

  return {
    name,
    api: {
      type: api.type || 'component',
      ...api,
    },
  }
}

function writeApiFiles(components) {
  createFolder('dist/api')

  return Promise.all(
    components.map(({ name, api }) =>
      writeFile(path.join(apiDir, `${name}.json`), JSON.stringify(api, null, 2) + '\n'),
    ),
  )
}

function getTypesFile(components) {
  const typeImports = fs.existsSync(sourceTypesFile)
    ? `import { ${getSourceTypeNames()} } from './types'\n\n`
    : ''

  return `import type { ComponentPublicInstance, ComponentOptions } from 'vue'

${components.map(({ name, api }) => getComponentTypes(name, api)).join('\n')}
${typeImports}declare module 'vue' {
    interface ComponentCustomProperties {
    }
}
export * from './types'
export as namespace QIconPicker
${components.map(({ name }) => `export const ${name}: ComponentOptions`).join('\n')}

export const version: string

export interface QIconPickerPlugin {
    version: string
${components.map(({ name }) => `    ${name}: ComponentOptions`).join('\n')}
    install(app: import('vue').App): void
}

declare const plugin: QIconPickerPlugin
export default plugin
`
}

function getSourceTypeNames() {
  const content = fs.readFileSync(sourceTypesFile, 'utf-8')
  const names = []
  const exportRE = /^export\s+(?:type|interface)\s+([A-Za-z0-9_]+)/gm
  let match

  while ((match = exportRE.exec(content)) !== null) {
    names.push(match[1])
  }

  return names.join(', ')
}

async function buildApi() {
  const files = fs
    .readdirSync(srcDir)
    .filter((file) => file.endsWith('.json'))
    .sort((a, b) => a.localeCompare(b))

  const components = files.map(normalizeApi)

  createFolder('dist')
  createFolder('dist/types')

  if (fs.existsSync(sourceTypesFile)) {
    await writeFile(distTypesFile, fs.readFileSync(sourceTypesFile, 'utf-8'))
  }

  await writeApiFiles(components)
  await writeFile(distIndexFile, getTypesFile(components))

  console.log(` 🧾 Generated ${components.length} API file${components.length === 1 ? '' : 's'}`)
}

buildApi().catch((err) => {
  console.error(err)
  process.exit(1)
})
