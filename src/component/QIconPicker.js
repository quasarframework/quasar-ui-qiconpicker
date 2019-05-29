import Vue from 'vue'

// Styles
import './icon-picker.styl'

// Mixins
import Colorize from './mixins/colorize'

// Util
import props from './utils/props'

// Quasar
import { QBtn, QScrollArea, QTooltip } from 'quasar'

export default Vue.extend({
  name: 'q-icon-picker',

  mixins: [Colorize],

  props: props.base,

  data () {
    return {
      iconsList: []
    }
  },

  mounted () {
    if (this.iconSet) {
      this.loadIconSet(this.iconSet)
      this.$forceUpdate()
    }
    else if (this.icons !== void 0 && this.icons.length > 0) {
      this.iconsList = this.icons
    }
  },

  computed: {
    displayedIcons () {
      if (this.iconsList) {
        if (this.filter === void 0 || this.filter === null || this.filter === '') {
          return this.iconsList
        }
        let icons = this.iconsList.filter(icon => icon.name.includes(this.filter))

        // // should the icons be paged?
        // if (this.startIndex !== void 0) {
        //   let count = 0
        //   icons = icons.map((icon, index) => {
        //     if (index < this.startIndex) {
        //       return false
        //     }
        //     // should a limited number of icons be displayed?
        //     if (this.displayCount !== void 0) {
        //       if (count > this.displayCount) {
        //         return false
        //       }
        //       ++count
        //     }
        //     return true
        //   })
        // }
        // this.$emit('info', { count: icons.length, index: this.startIndex, displayCount: this.displayCount })
        return icons
      }
      return []
    }
  },

  watch: {
    iconSet (val) {
      this.loadIconSet(val)
    },
    icons (val) {
      if (this.icons !== void 0 && this.icons.length > 0) {
        this.iconsList = this.icons
      }
    }
  },

  methods: {
    loadIconSet (set) {
      console.log('loadIconSet:', set)
      if (set) {
        let icons = require(`./utils/${set}.json`)
        this.iconsList = icons
      } else {
        this.iconsList = []
      }
    },

    __renderScrollArea (h) {
      return h(QScrollArea, {
        ref: 'scrollArea'
      }, [
        this.__renderContainer(h)
      ])
    },

    __renderBody (h) {
      return h(QScrollArea, {
        staticClass: 'q-icon-picker__body'
      }, [
        this.__renderContainer(h)
      ])
    },

    __renderContainer (h) {
      return h('div', {
        staticClass: 'q-icon-picker__container'
      }, [
        ...this.__renderIcons(h)
      ])
    },

    __renderTooltip (h, name) {
      return h(QTooltip, {
      }, name)
    },

    __renderIcons (h) {
      return this.displayedIcons.map(icon => this.__renderIcon(h, icon))
    },

    __renderIcon (h, icon) {
      const slot = this.$scopedSlots.icon

      if (slot) {
        return slot(icon.name)
      }

      const isSelected = icon.name === this.value
      const color = isSelected ? this.selectedColor : ''
      const backgroundColor = isSelected ? this.selectedBackgroundColor : ''

      return h(QBtn, this.setBothColors(color, backgroundColor, {
        staticClass: 'q-icon-picker__icon',
        style: {
          'font-size': this.fontSize
        },
        domProps: {
          id: icon.name
        },
        props: {
          unelevated: true,
          dense: this.dense,
          icon: icon.name
        },
        on: {
          'click': () => { 
            this.$emit('input', icon.name)
          }
        }
      }), [
        this.tooltips === true && this.__renderTooltip(h, icon.name)
      ])
    }
  },

  render (h) {
    return h('div', this.setBothColors(this.color, this.backgroundColor, {
      ref: 'icon-picker',
      staticClass: 'q-icon-picker flex'
    }), [
      this.__renderBody(h)
    ])
  }
})