process.env.NODE_ENV = 'production'

const { spawn } = require('node:child_process')
const { cpus } = require('node:os')
const { resolve } = require('node:path')
const { createFolder } = require('./build.utils')
const { green, blue } = require('kolorist')

const rootDir = resolve(__dirname, '..')
const parallel = cpus().length > 1

function runScript(script) {
  return new Promise((resolve, reject) => {
    const child = spawn('pnpm', ['exec', 'tsx', script], {
      cwd: rootDir,
      shell: process.platform === 'win32',
      stdio: 'inherit',
    })

    child.on('error', reject)
    child.on('exit', (code) => {
      if (code === 0) {
        resolve()
        return
      }

      reject(new Error(`${script} failed with exit code ${code}`))
    })
  })
}

async function main() {
  console.log()

  require('./script.app-ext').syncAppExt()
  require('./script.clean')

  console.log(
    ` 📦 Building ${green('v' + require('../package.json').version)}...${parallel ? blue(' [multi-threaded]') : ''}\n`,
  )

  createFolder('dist')

  require('./script.version')

  await require('./build.api').buildApi()

  const jobs = ['build/script.javascript.ts', 'build/script.css.ts']

  if (parallel) {
    await Promise.all(jobs.map(runScript))
    return
  }

  for (const job of jobs) {
    await runScript(job)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
