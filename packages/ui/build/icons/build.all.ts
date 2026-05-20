const { spawn } = require('node:child_process')
const { cpus } = require('node:os')
const { resolve } = require('node:path')

const rootDir = resolve(__dirname, '../..')
const parallel = cpus().length > 1
const scripts = [
  'build.google.material-icons.ts',
  'build.mdi-v6.ts',
  'build.mdi-v7.ts',
  'build.ionicons-v6.ts',
  'build.ionicons-v7.ts',
  'build.eva.ts',
  'build.themify.ts',
  'build.fontawesome-v5.ts',
  'build.fontawesome-v6.ts',
  'build.line-awesome.ts',
  'build.bootstrap-icons.ts',
  'build.material-symbols.ts',
]

function runScript(script) {
  return new Promise((resolve, reject) => {
    const child = spawn('pnpm', ['exec', 'tsx', `build/icons/${script}`], {
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
  if (parallel) {
    await Promise.all(scripts.map(runScript))
    return
  }

  for (const script of scripts) {
    await runScript(script)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
