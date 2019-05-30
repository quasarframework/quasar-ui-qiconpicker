export default {
  base: {
    value: String,
    iconSet: {
      type: String,
      validator: v => ['material-icons', 'ionicons-v4', 'mdi-v3', 'fontawesome-v5', 'eva-icons', 'themify', ''].includes(v),
      default: ''
    },
    icons: Array,
    filter: String,
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
    paginationColor: String,
    paginationBackgroundColor: String,
    pagination: Object
  }
}
