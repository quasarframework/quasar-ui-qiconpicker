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
        'mdi-v5',
        'fontawesome-v5',
        'eva-icons',
        'themify',
        'line-awesome',
        'bootstrap-icons',
        ''].includes(v),
      default: ''
    },
    icons: Array,
    filter: String,
    tags: Array,
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
    pagination: Object,
    animated: Boolean,
    transitionPrev: {
      type: String,
      default: 'slide-right'
    },
    transitionNext: {
      type: String,
      default: 'slide-left'
    }
  }
}
