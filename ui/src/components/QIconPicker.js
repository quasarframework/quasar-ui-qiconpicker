import {h, defineComponent, onBeforeMount, onMounted, reactive, nextTick, watch, ref, computed} from 'vue'
import {useColorizeProps, useColorize } from 'q-colorize-mixin'


import {
  QBtn,
  QScrollArea,
  QTooltip,
  QResizeObserver
} from 'quasar'
import usePagination from "./composables/usePagination";

const useIconPickerProps = {
  modelValue: String,
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


function useIcons(data, props, emit, slots, setBothColors, __firstItemIndex, __lastItemIndex) {
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
      icons = __filteredIcons.value

      // should the icons be paged?
      if (props.pagination && props.pagination.itemsPerPage !== 0) {
        icons = icons.slice(__firstItemIndex, __lastItemIndex)
      }
    }
    return icons
  })


  const __loadIconSet = (iconSet) => {
    data.iconsList = []
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

  const __renderTooltip = (name) => {
    return h(QTooltip, {}, name)
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

    return h(QBtn, setBothColors(color, backgroundColor, {
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
      props.tooltips === true && __renderTooltip(h, name)
    ])
  }



  const __getCategories = () => {
    const t = []
    data.iconsList.forEach(icon => {
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
    data.categories = t
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






export default defineComponent({
  name: 'QIconPicker',
  props: {
    ...useIconPickerProps,
    ...useColorizeProps
  },
  setup(props, {slots, emit}) {

    const scrollAreaRef = ref(null)
    const pickerRef = ref(null)
    const data = reactive({
      iconsList: [],
      innerPagination: {
        page: 1,
        itemsPerPage: 0,
        totalPages: 0
      },
      categories: [],
      width: '100%',
      height: '100%'
    })


    const {
      setBothColors
    } = useColorize()

    const {
      __renderPagination,
      __updatePagination,
      __computedPagination,
      __setPagination,
      __firstItemIndex,
      __lastItemIndex
    } = usePagination(data, props, emit, slots, setBothColors, __filteredIcons)



    const {
      __filteredIcons,
      __getCategories,
      __loadIconSet,
      __renderIcons
    } = useIcons(data, props, emit, slots, setBothColors, __firstItemIndex, __lastItemIndex)


    // watch
    watch(() => props.iconSet, (val, prevVal) => {
      if (val) {
        __loadIconSet(val)
        __updatePagination()
        nextTick(() => {
          // whenever the icon set changes, it resets pagination page to page 1
          __setPagination({page: 1})
        }).catch(e => console.error(e))
        // scroll to top of QScrollArea, if applicable
        scrollAreaRef.value.setScrollPosition(0)
      }
    })

    watch(() => props.icons, (val) => {
      if (props.icons !== void 0 && props.icons.length > 0) {
        data.iconsList = props.icons
      }
      __updatePagination()
      nextTick(() => {
        // whenever the icon set changes, it resets pagination page to page 1
        __setPagination({page: 1})
      }).catch(e => console.error(e))
      // scroll to top of QScrollArea, if applicable
      scrollAreaRef.value.setScrollPosition(0)
    })


    onBeforeMount(() => {
      if (props.pagination) {
        emit('update:pagination', {...__computedPagination.value})
      }
    })

    onMounted(() => {
      if (props.iconSet) {
        __loadIconSet(props.iconSet)
      } else if (props.icons !== void 0 && props.icons.length > 0) {
        data.iconsList = props.icons
      }
      __updatePagination()
    })


    const __onResize = (size) => {
      this.width = size.width
      this.height = size.height
    }


    const __renderScrollArea = () => {
      return h(QScrollArea, {
        ref: scrollAreaRef,
        style: {
          width: this.width + 'px',
          height: this.height + 'px'
        }
        // staticClass: 'q-icon-picker__scroll-area col column'
      }, [
        __renderContainer()
      ])
    }

    const __renderBody = () => {
      return h('div', {
        staticClass: 'q-icon-picker__body col column'
      }, [
        __renderScrollArea(),
        h(QResizeObserver, {
          on: {
            resize: __onResize
          }
        })
      ])
    }


    const __renderFooter = () => {
      const slot = (slots.footer && slots.footer())
      return h('div', {
        staticClass: 'q-icon-picker__footer flex flex-center'
      }, [
        slot ? slot(__computedPagination) : __renderPagination()
      ])
    }


    const __renderContainer = () => {
      const container = h('div', {
        key: __computedPagination.value.page,
        staticClass: 'q-icon-picker__container col'
      }, [
        ...__renderIcons()
      ])

      if (props.animated === true) {
        const transition = 'q-transition--' + (this.direction === 'prev' ? props.transitionPrev : props.transitionNext)
        return h('transition', {
          props: {
            name: transition,
            appear: true
          }
        }, [
          container
        ])
      }

      return container
    }


    return () => {
      const picker = h('div', setBothColors(props.color, this.backgroundColor, {
        ref: pickerRef,
        staticClass: 'q-icon-picker column'
      }), [
        __renderBody(),
        props.noFooter !== true && props.pagination !== void 0 && __renderFooter()
      ])

      nextTick(() => {
        __getCategories()
        emit('tags', data.categories)
      }).catch(e => console.error(e))

      return picker
    }

  }
})
