const { buildMaterialSymbols } = require('./build.extras-icon-set')

Promise.all([
  buildMaterialSymbols({
    name: 'material-symbols-outlined',
    constantPrefix: 'symOutlined',
    iconPrefix: 'sym_o_',
  }),
  buildMaterialSymbols({
    name: 'material-symbols-rounded',
    constantPrefix: 'symRounded',
    iconPrefix: 'sym_r_',
  }),
  buildMaterialSymbols({
    name: 'material-symbols-sharp',
    constantPrefix: 'symSharp',
    iconPrefix: 'sym_s_',
  }),
]).catch((err) => {
  console.error(err)
  process.exit(1)
})
