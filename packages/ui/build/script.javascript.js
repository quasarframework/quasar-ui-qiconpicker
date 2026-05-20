const fs = require('fs')
const path = require('path')
const { rolldown } = require('rolldown')
const uglify = require('uglify-js')

const buildConf = require('./config')
const buildUtils = require('./utils')

const uglifyJsOptions = {
  compress: {
    // Turn off flags with small gains to speed up minification.
    arrows: false,
    collapse_vars: false,
    comparisons: false,
    hoist_funs: false,
    hoist_props: false,
    hoist_vars: false,
    inline: false,
    loops: false,
    negate_iife: false,
    properties: false,
    reduce_funcs: false,
    reduce_vars: false,
    switches: false,
    toplevel: false,
    typeofs: false,

    // A few flags with a noticeable gains/speed ratio.
    booleans: true,
    if_return: true,
    sequences: true,
    unused: true,

    // Required features to drop conditional branches.
    conditionals: true,
    dead_code: true,
    evaluate: true,
  },
}

const builds = [
  {
    rolldown: {
      input: {
        input: pathResolve('../src/index.esm.js'),
      },
      output: {
        file: pathResolve('../dist/index.esm.js'),
        format: 'esm',
      },
    },
    build: {
      unminified: true,
      minified: true,
      minExt: true,
    },
  },
  {
    rolldown: {
      input: {
        input: pathResolve('../src/index.cjs.js'),
      },
      output: {
        file: pathResolve('../dist/index.cjs.js'),
        format: 'cjs',
        exports: 'auto',
      },
    },
    build: {
      unminified: true,
      minified: true,
      minExt: true,
    },
  },
  {
    rolldown: {
      input: {
        input: pathResolve('../src/index.umd.js'),
      },
      output: {
        name: 'QIconPicker',
        file: pathResolve('../dist/index.umd.js'),
        format: 'umd',
      },
    },
    build: {
      unminified: true,
      minified: true,
      minExt: true,
    },
  },
]

addAssets(builds, 'icon-set', 'iconSet')

build(builds)

/**
 * Helpers
 */

function pathResolve(_path) {
  return path.resolve(__dirname, _path)
}

function addAssets(builds, type, injectName) {
  const files = fs.readdirSync(pathResolve(`../src/components/${type}`))
  const outputDir = pathResolve(`../dist/${type}`)

  fs.mkdirSync(outputDir, { recursive: true })

  files
    .filter((file) => file.endsWith('.js'))
    .forEach((file) => {
      const name = file.slice(0, -3).replace(/-([a-z])/g, (g) => g[1].toUpperCase())

      builds.push({
        rolldown: {
          input: {
            input: pathResolve(`../src/components/${type}/${file}`),
          },
          output: {
            file: addExtension(pathResolve(`../dist/${type}/${file}`), 'umd'),
            format: 'umd',
            name: `QIconPicker.${injectName}.${name}`,
          },
        },
        build: {
          minified: true,
        },
      })
    })
}

async function build(builds) {
  try {
    for (const config of builds.map(genConfig)) {
      await buildEntry(config)
    }
  } catch (err) {
    buildUtils.logError(err)
    process.exit(1)
  }
}

function genConfig(opts) {
  Object.assign(opts.rolldown.input, {
    external: ['vue', 'quasar'],
  })

  Object.assign(opts.rolldown.output, {
    banner: buildConf.banner,
    globals: { vue: 'Vue', quasar: 'Quasar' },
    exports: 'auto',
  })

  return opts
}

function addExtension(filename, ext = 'min') {
  const insertionPoint = filename.lastIndexOf('.')
  return `${filename.slice(0, insertionPoint)}.${ext}${filename.slice(insertionPoint)}`
}

async function buildEntry(config) {
  const bundle = await rolldown(config.rolldown.input)
  const { output } = await bundle.generate(config.rolldown.output)
  const code =
    config.rolldown.output.format === 'umd' ? injectVueRequirement(output[0].code) : output[0].code

  if (config.build.unminified) {
    await buildUtils.writeFile(config.rolldown.output.file, code)
  }

  if (config.build.minified) {
    const minified = uglify.minify(code, uglifyJsOptions)

    if (minified.error) {
      throw minified.error
    }

    await buildUtils.writeFile(
      config.build.minExt === true
        ? addExtension(config.rolldown.output.file)
        : config.rolldown.output.file,
      buildConf.banner + minified.code,
      true,
    )
  }

  await bundle.close()
}

function injectVueRequirement(code) {
  const index = code.indexOf(`Vue = Vue && Vue.hasOwnProperty('default') ? Vue['default'] : Vue`)

  if (index === -1) {
    return code
  }

  const checkMe = ` if (Vue === void 0) {
    console.error('[ QIconPicker ] Vue is required to run. Please add a script tag for it before loading QIconPicker.')
    return
  }
  `

  return code.substring(0, index - 1) + checkMe + code.substring(index)
}
