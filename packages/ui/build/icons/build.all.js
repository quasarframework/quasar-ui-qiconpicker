const parallel = require('os').cpus().length > 1
const runJob = parallel ? require('child_process').fork : require
const { join } = require('path')

runJob(join(__dirname, './build.google.material-icons.js'))
runJob(join(__dirname, './build.mdi-v6.js'))
runJob(join(__dirname, './build.mdi-v7.js'))
runJob(join(__dirname, './build.ionicons-v6.js'))
runJob(join(__dirname, './build.ionicons-v7.js'))
runJob(join(__dirname, './build.eva.js'))
runJob(join(__dirname, './build.themify.js'))
runJob(join(__dirname, './build.fontawesome-v5.js'))
runJob(join(__dirname, './build.fontawesome-v6.js'))
runJob(join(__dirname, './build.line-awesome.js'))
runJob(join(__dirname, './build.bootstrap-icons.js'))
runJob(join(__dirname, './build.material-symbols.js'))
