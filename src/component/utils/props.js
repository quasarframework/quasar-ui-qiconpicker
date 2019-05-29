export default {
  base: {
    value: String,
    iconSet: {
      type: String,
      validator: v => ['material-icons', 'ionicons-v4', 'mdi-v3', 'fontawesome-v5', 'eva-icons', 'themify', ''].includes(v)
    },
    icons: Array,
    filter: String,
    dense: Boolean,
    tooltips: Boolean,
    selectedColor: {
      type: String,
      default: 'grey-1'
    },
    selectedBackgroundColor: {
      type: String,
      default: 'primary'
    },
    // displayCount: [Number, String],
    // startIndex: [Number, String]
    fontSize: {
      type: String,
      default: 'inherit'
    }
  }
}