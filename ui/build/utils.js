const
  fs = require('fs'),
  path = require('path'),
  zlib = require('zlib'),
  { green, blue, red, cyan } = require('chalk'),
  kebabRegex = /[A-Z\u00C0-\u00D6\u00D8-\u00DE]/g

function getSize (code) {
  return (code.length / 1024).toFixed(2) + 'kb'
}

/*
  Keep valid tags short - no plural
  Try to keep list this list (no additions)
  For instance, Fontawesome 'Fruits & Vegetables'
  can go into the 'food' tag. 'Currency' and 'Finance'
  can go into into 'money' tag. 'Hotel' can go into
  the 'travel' tag. 'Audio & Video' can go into the
  'media' tag, etc. Also, 'builings' can go to 'map'.
  Use 'opther' when it cannot be categorized and we
  will review to see where it may fit in best.
  After modifications, run "yarn build" to validate
  and generate new files.
*/
module.exports.validateTags = function (tags) {
  const validTags = [
    'accessibility',
    'alert',
    'animal',
    'arrow',
    'auto',
    'brand',
    'datetime',
    'editor',
    'file',
    'food',
    'hardware',
    'health',
    'map',
    'media',
    'money',
    'nature',
    'other',
    'people',
    'travel',
    'weather',
    'web'
  ]
  tags.forEach(tag => {
    if (validTags.includes(tag) !== true) {
      console.error('\n' + red('[Error]'), `Invalid tag type found: ${tag}`)
      console.log()
      proccess.exit(1)
    }
  })
}

module.exports.createFolder = function (folder) {
  const dir = path.join(__dirname, '..', folder)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }
}

module.exports.writeFile = function (dest, code, zip) {
  const banner = dest.indexOf('.json') > -1
    ? red('[json]')
    : dest.indexOf('.js') > -1
      ? green('[js]  ')
      : dest.indexOf('.ts') > -1
        ? cyan('[ts]  ')
        : blue('[css] ')

  return new Promise((resolve, reject) => {
    function report (extra) {
      console.log(`${banner} ${path.relative(process.cwd(), dest).padEnd(41)} ${getSize(code).padStart(8)}${extra || ''}`)
      resolve(code)
    }

    fs.writeFile(dest, code, err => {
      if (err) return reject(err)
      if (zip) {
        zlib.gzip(code, (err, zipped) => {
          if (err) return reject(err)
          report(` (gzipped: ${getSize(zipped).padStart(8)})`)
        })
      }
      else {
        report()
      }
    })
  })
}

module.exports.readFile = function (file) {
  return fs.readFileSync(file, 'utf-8')
}

module.exports.logError = function (err) {
  console.error('\n' + red('[Error]'), err)
  console.log()
}
