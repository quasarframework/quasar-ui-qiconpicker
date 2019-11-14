export default {
  base: {
    value: String,
    iconSet: {
      type: String,
      validator: v => [
        'material-icons',
        'material-icons-outlined',
        'material-icons-round',
        'material-icons-sharp',
        'ionicons-v4',
        'mdi-v4',
        'fontawesome-v5',
        'eva-icons',
        'themify',
        ''].includes(v),
      default: ''
    },
    icons: Array,
    filter: String,
    tag: String,
    dense: Boolean,
    tooltips: Boolean,
    noFooter: Boolean,
    fontSize: {
      type: String,
      default: 'inherit'
    },
    selectedColor: {
      type: String,
      default: 'grey-1'
    },
    selectedBackgroundColor: {
      type: String,
      default: 'primary'
    },
    paginationProps: {
      type: Object,
      default: () => ({
        maxPages: 5,
        input: true
      })
    },
    pagination: Object
  }
}
