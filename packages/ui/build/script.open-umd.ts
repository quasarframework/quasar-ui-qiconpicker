const { resolve } = require('node:path')

async function openUmdTest() {
  const { default: open } = await import('open')

  await open(resolve(__dirname, '../umd-test.html'))
}

openUmdTest().catch((err) => {
  console.error(err)
  process.exit(1)
})
