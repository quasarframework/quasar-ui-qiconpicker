const fs = require('fs')
const path = require('path')

const typesFile = path.resolve(__dirname, '../dist/types/index.d.ts')
const waitTimeout = 30000
const waitInterval = 100

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

async function waitForTypesFile() {
  const start = Date.now()

  while (fs.existsSync(typesFile) !== true) {
    if (Date.now() - start > waitTimeout) {
      throw new Error(`Timed out waiting for ${typesFile}`)
    }

    await sleep(waitInterval)
  }
}

async function patchTypes() {
  await waitForTypesFile()

  let content = fs.readFileSync(typesFile, 'utf-8')

  if (content.includes('export const version: string') === false) {
    content += `

export const version: string

export interface QIconPickerPlugin {
    version: string
    QIconPicker: ComponentOptions
    install(app: import('vue').App): void
}

declare const plugin: QIconPickerPlugin
export default plugin
`
  }

  fs.writeFileSync(typesFile, content, 'utf-8')
}

module.exports = { patchTypes }

if (require.main === module) {
  patchTypes().catch((err) => {
    console.error(err)
    process.exit(1)
  })
}
