import {h, computed, watch} from "vue";
import {QBtn} from "quasar";

export default function useIcons(data, props, emit, slots) {
  const __filteredIcons = computed(() => {
    let icons = data.iconsList
    if (icons) {
      if (props.tags !== void 0 && props.tags !== '' && props.tags !== null && props.tags.length > 0) {
        icons = icons.filter(icon => {
          return icon.tags.filter(tag => props.tags.includes(tag)).length > 0
        })
      }
      if (props.filter !== void 0 && props.filter !== '' && props.filter !== null) {
        icons = icons.filter(icon => icon.name.includes(props.filter))
      }
    }
    return icons
  })

  // the icons to display after filtering and then pagination
  const __displayedIcons = computed(() => {
    let icons = []
    if (data.iconsList) {
      icons = __filteredIcons

      // should the icons be paged?
      if (props.pagination && props.pagination.itemsPerPage !== 0) {
        icons = icons.slice(this.__firstItemIndex, this.__lastItemIndex)
      }
    }
    return icons
  })


  const __loadIconSet = (iconSet) => {
    this.iconsList = []
    if (iconSet) {
      // detect if UMD version is installed
      if (window.QIconPicker) {
        const name = iconSet.replace(/-([a-z])/g, g => g[1].toUpperCase())
        if (window.QIconPicker.iconSet && window.QIconPicker.iconSet[name]) {
          const iconsSet = window.QIconPicker.iconSet[name]
          data.iconsList = iconsSet.icons
        } else {
          /* eslint-disable */
          console.error('QIconPicker: no icon set loaded called ' + iconSet + '\'')
          console.error('Be sure to load the UMD version of the icon set in a script tag before using QIconPicker UMD version')
          /* eslint-enable */
        }
      } else {
        try {
          const iconsSet = require('@quasar/quasar-ui-qiconpicker/src/components/icon-set/' + iconSet + '.js').default
          data.iconsList = iconsSet.icons
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error('QIconPicker: cannot find icon set found called ' + iconSet + '\'')
        }
      }
    }
  }

  const __renderIcon = (icon) => {
    const slot = (slots.icon && slots.icon())

    const name = (icon.prefix !== void 0 ? icon.prefix + ' ' + icon.name : icon.name)

    if (slot) {
      return slot(name)
    }

    const isSelected = name === this.value
    const color = isSelected ? props.selectedColor : ''
    const backgroundColor = isSelected ? props.selectedBackgroundColor : ''

    return h(QBtn, this.setBothColors(color, backgroundColor, {
      staticClass: 'q-icon-picker__icon' + (isSelected ? ' q-icon-picker__active' : ''),
      style: {
        'font-size': props.fontSize
      },
      domProps: {
        id: name
      },
      props: {
        unelevated: true,
        dense: props.dense,
        noWrap: true,
        icon: name
      },
      on: {
        click: () => {
          emit('input', name)
        }
      }
    }), [
      props.tooltips === true && this.__renderTooltip(h, name)
    ])
  }

// watch
  watch(() => props.iconSet, (val, prevVal) => {
    if (val) {
      __loadIconSet(val)
      this.__updatePagination()
      this.$nextTick(() => {
        // whenever the icon set changes, it resets pagination page to page 1
        this.__setPagination({page: 1})
      })
      // scroll to top of QScrollArea, if applicable
      this.$refs.scrollArea.setScrollPosition(0)
    }
  })

  watch(() => props.icons, (val) => {
    if (this.icons !== void 0 && this.icons.length > 0) {
      this.iconsList = this.icons
    }
    this.__updatePagination()
    this.$nextTick(() => {
      // whenever the icon set changes, it resets pagination page to page 1
      this.__setPagination({page: 1})
    })
    // scroll to top of QScrollArea, if applicable
    this.$refs.scrollArea.setScrollPosition(0)
  })

  const __getCategories = () => {
    const t = []
    this.iconsList.forEach(icon => {
      const tags = icon.tags
      if (tags && tags.length > 0) {
        tags.forEach(tag => {
          if (t.includes(tag) !== true) {
            t.push(tag)
          }
        })
      }
    })
    t.sort()
    this.categories = t
    return true
  }

  const __renderIcons = () => {
    return __displayedIcons.value.map(icon => __renderIcon(h, icon))
  }

  return {
    __renderIcons,
    __filteredIcons,
    __getCategories,
    __renderIcon,
    __loadIconSet
  }
}
