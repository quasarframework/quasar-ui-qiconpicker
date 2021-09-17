import { h, defineComponent, onMounted, reactive, computed, ref, nextTick, watch, Transition } from 'vue'
import { QBtn, QPagination, QResizeObserver, QScrollArea, QTooltip } from "quasar";

/**
 * QIconPicker Properties
 */
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
      'mdi-v6',
      'fontawesome-v5',
      'eva-icons',
      'themify',
      'line-awesome',
      'bootstrap-icons',
      ''
    ].includes(v),
    default: ''
  },
  icons: Array,
  filter: String,
  tags: Array,
  dense: Boolean,
  tooltips: Boolean,
  noFooter: Boolean,
  size: {
    type: String,
    default: 'inherit'
  },
  color: String,
  textColor: String,
  selectedColor: {
    type: String,
    default: 'primary'
  },
  selectedTextColor: {
    type: String,
    default: 'grey-1'
  },
  paginationProps: {
    type: Object,
    default: () => ({
      maxPages: 5,
      input: true
    })
  },
  modelPagination: Object,
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

const direction = {
  NEXT: 'next',
  PREV: 'prev'
}

/**
 * Pagination
 */
function useIconPickerPagination(data, props, emit, computedFilteredIcons) {

  function fixPagination(p) {
    if (p.page < 1) {
      p.page = 1
    }
    if (p.itemsPerPage === void 0 || p.itemsPerPage < 1) {
      p.itemsPerPage = 0 // all
    }
    return p
  }

  // returns true if the pagination is the same,
  // otherwise returns false if it has changed
  function samePagination(oldPag, newPag) {
    for (const prop in newPag) {
      if (newPag[ prop ] !== oldPag[ prop ]) {
        return false
      }
    }
    return true
  }

  const computedPagination = computed(() => {
    return fixPagination({
      ...data.innerPagination,
      ...props.modelPagination
    })
  })

  const computedPagesNumber = computed(() => {
    return computedPagination.value.itemsPerPage === 0 ? 1
      : Math.max(1, Math.ceil(computedFilteredIcons.value.length / computedPagination.value.itemsPerPage))
  })

  function setPagination(val) {
    const newPagination = fixPagination({
      ...computedPagination.value,
      ...val
    })

    if (!samePagination(data.innerPagination, newPagination)) {
      if (props.modelPagination) {
        emit('update:model-pagination', newPagination)
      }
      data.innerPagination = newPagination
    }
  }

  function updatePagination() {
    if (props.modelPagination !== void 0) {
      setPagination({ total: computedFilteredIcons.value.length, totalPages: computedPagesNumber.value })
    }
  }

  return {
    samePagination,
    computedPagination,
    setPagination,
    updatePagination,
    computedPagesNumber
  }
}

/**
 * Icons
 */
function useIconPickerIcons(data, props, computedFirstItemIndex, computedLastItemIndex) {

  function loadIconSet(iconSet) {
    data.iconsList = []
    if (iconSet) {
      // detect if UMD version is installed
      if (window.QIconPicker) {
        const name = iconSet.replace(/-([a-z])/g, g => g[ 1 ].toUpperCase())
        if (window.QIconPicker.iconSet && window.QIconPicker.iconSet[ name ]) {
          data.iconsList = window.QIconPicker.iconSet[ name ].icons
        }
        else {
          console.error(`QIconPicker: no icon set loaded called ${ iconSet }`)
          console.error('Be sure to load the UMD version of the icon set in a script tag before using QIconPicker UMD version')
        }
      }
      else {
        try {
          data.iconsList = require(`@quasar/quasar-ui-qiconpicker/src/components/icon-set/${ iconSet }.js`).default.icons
        }
        catch (e) {
          console.error(`QIconPicker: cannot find icon set found called ${ iconSet }`)
        }
      }
    }
    console.info(`Loaded ${ data.iconsList.length } icons.`)
  }

  const computedDisplayedIcons = computed(() => {
    let icons = []
    if (data.iconsList) {
      icons = computedFilteredIcons.value

      // should the icons be paged?
      if (props.modelPagination && props.modelPagination.itemsPerPage !== 0) {
        icons = icons.slice(computedFirstItemIndex.value, computedLastItemIndex.value)
      }
    }
    return icons
  })

  const computedFilteredIcons = computed(() => {
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

  function categories() {
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

  return {
    loadIconSet,
    computedDisplayedIcons,
    computedFilteredIcons,
    categories
  }
}

/**
 * Exposes api functions
 */
function exposeIconPickerApi(data, expose, computedPagination, setPagination, computedFirstItemIndex, computedLastItemIndex, computedFilteredIcons, computedPagesNumber) {
  // goes to previous page
  const prevPage = () => {
    const { page } = computedPagination.value
    if (page > 1) {
      setPagination({ page: page - 1 })
      data.direction = direction.PREV
    }
  }

  // goes to next page
  const nextPage = () => {
    const { page, itemsPerPage } = computedPagination.value
    if (computedLastItemIndex.value > 0 && page * itemsPerPage < computedFilteredIcons.value.length) {
      setPagination({ page: page + 1 })
      data.direction = direction.NEXT
    }
  }

  // goes to last page
  const lastPage = () => {
    setPagination({ page: computedPagesNumber.value })
  }

  // goes to first page
  const firstPage = () => {
    setPagination({ page: 0 })
  }

  // checks if we are on the last page
  const isLastPage = computed(() => {
    return computedLastItemIndex.value === 0
      ? true
      : computedPagination.value.page >= computedPagesNumber.value
  })


  // checks if we are on the first page
  const isFirstPage = computed(() => {
    return computedPagination.value.page === 1
  })

  expose({
    prevPage,
    nextPage,
    lastPage,
    firstPage,
    isLastPage,
    isFirstPage
  })
}


export default defineComponent({
  name: 'QIconPicker',

  props: {
    ...useIconPickerProps
  },

  emits: [
    'update:model-value',
    'update:tags',
    'update:model-pagination'
  ],

  setup(props, { slots, emit, expose }) {
    const scrollAreaRef = ref(null)
    const data = reactive({
      iconsList: [],
      innerPagination: {
        page: 1,
        itemsPerPage: 0,
        totalPages: 0
      },
      categories: [],
      width: '100',
      height: '100',
      direction: ''
    })

    // index of first item on a page
    const computedFirstItemIndex = computed(() => {
      const { page, itemsPerPage } = computedPagination.value
      return (page - 1) * itemsPerPage
    })

    // index of last item on a page
    const computedLastItemIndex = computed(() => {
      const { page, itemsPerPage } = computedPagination.value
      return page * itemsPerPage
    })

    const {
      loadIconSet,
      computedDisplayedIcons,
      computedFilteredIcons,
      categories
    } = useIconPickerIcons(data, props, computedFirstItemIndex, computedLastItemIndex)

    const {
      samePagination,
      computedPagination,
      setPagination,
      updatePagination,
      computedPagesNumber
    } = useIconPickerPagination(data, props, emit, computedFilteredIcons)

    exposeIconPickerApi(data, expose, computedPagination, setPagination, computedFirstItemIndex, computedLastItemIndex, computedFilteredIcons, computedPagesNumber)

    onMounted(() => {
      if (props.iconSet) {
        loadIconSet(props.iconSet)
      }
      else if (props.icons !== void 0 && props.icons.length > 0) {
        data.iconsList = props.icons
      }
      updatePagination()
    })


    watch(() => props.iconSet, (val) => {
      if (val) {
        loadIconSet(val)
        updatePagination()
        nextTick(() => {
          // whenever the icon set changes, it resets pagination page to page 1
          setPagination({ page: 1 })
        }).catch(e => console.error(e))
        // scroll to top of QScrollArea, if applicable
        if(scrollAreaRef.value) {
          scrollAreaRef.value.setScrollPosition(0)
        }
      }
    })

    watch(() => props.icons, (val) => {
      if (props.icons !== void 0 && props.icons.length > 0) {
        data.iconsList = props.icons
      }
      updatePagination()
      nextTick(() => {
        // whenever the icon set changes, it resets pagination page to page 1
        setPagination({ page: 1 })
      }).catch(e => console.error(e))
      // scroll to top of QScrollArea, if applicable
      if(scrollAreaRef.value) {
        scrollAreaRef.value.setScrollPosition(0)
      }
    })

    watch(() => props.filter, () => {
      // whenever the filter changes, it resets pagination page to page 1
      setPagination({ page: 1, totalPages: computedPagesNumber.value })
      updatePagination()
    })

    watch(() => props.tags, (val) => {
      // whenever the tags change, it resets pagination page to page 1
      setPagination({ page: 1, totalPages: computedPagesNumber.value })
      updatePagination()
    })

    if (props.modelPagination) {
      watch(() => props.modelPagination, (newVal, oldVal) => {
        if (!samePagination(oldVal, newVal)) {
          updatePagination()
        }
      })
    }

    if (props.modelPagination) {
      watch(() => props.modelPagination.itemsPerPage, () => {
        updatePagination()
      })

      watch(() =>props.modelPagination.page, () => {
        updatePagination()
      })
    }

    return () => {

      function renderPagination() {
        if (props.modelPagination && props.modelPagination.itemsPerPage === 0) return ''
        const slot = (slots.pagination && slots.pagination())
        const { page, totalPages } = computedPagination.value

        return slot || h(QPagination, {
          class: 'q-icon-picker__pagination',
          ...props.paginationProps,
          modelValue: page,
          max: totalPages,
          'onUpdate:modelValue': value => {
            if (props.animated) {
              if (value > page) {
                data.direction = direction.NEXT
              }
              else {
                data.direction = direction.PREV
              }
            }
            setPagination({ page: value })
          }
        })
      }

      function renderFooter() {
        if (props.noFooter !== true && props.modelPagination !== void 0) {
          const slot = (slots.footer && slots.footer())

          return h('div', {
            class: 'q-icon-picker__footer flex flex-center'
          }, [
            slot ? slot(computedPagination.value) : renderPagination()
          ])
        }
      }

      function renderTooltip(name) {
        if (props.tooltips === true) {
          return () => h(QTooltip, {}, () => name)
        }
      }

      function renderIcon(icon) {
        const name = (icon.prefix !== void 0 ? icon.prefix + ' ' + icon.name : icon.name)

        if (slots.icon && slots.icon()) {
          return slots.icon(name)
        }
        const isSelected = name === props.modelValue
        const textColor = isSelected ? props.selectedTextColor : undefined
        const color = isSelected ? props.selectedColor : undefined
        const size = props.size ? props.size : undefined

        return h(QBtn, {
          id: name,
          unelevated: true,
          dense: props.dense,
          noWrap: true,
          size: size,
          textColor: textColor,
          color: color,
          icon: name,
          onClick: () => emit('update:model-value', name),
        }, renderTooltip(name))
      }

      function renderIcons() {
        return computedDisplayedIcons.value.map(icon => renderIcon(icon))
      }

      function renderContainer() {
        const container = () => h('div', {
          key: computedPagination.value.page,
          class: 'q-icon-picker__container col'
        },  [...renderIcons()])

        if (props.animated === true) {
          const transition = 'q-transition--' + (data.direction === 'prev' ? props.transitionPrev : props.transitionNext)
          return () => h(Transition, {
            name: transition,
            appear: true
          }, container)
        }

        return container
      }


      function renderScrollArea() {
        return h(QScrollArea, {
          ref: scrollAreaRef,
          style: {
            width: data.width + 'px',
            height: data.height + 'px'
          }
        }, renderContainer())
      }

      function renderBody() {
        return h('div', {
          class: 'q-icon-picker__body col column'
        }, [
          renderScrollArea(),
          h(QResizeObserver, {
            onResize: (size) => {
              data.width = size.width
              data.height = size.height
            }
          })
        ])
      }

      const classes = [
        'q-icon-picker',
        'column'
      ]
      if (props.color) classes.push('bg-' + props.color)
      if (props.textColor) classes.push('text-' + props.textColor)

      const picker = h('div', {
        class: classes.join(' ')
      },  [
        renderBody(),
        renderFooter()
      ])

      nextTick(() => {
        categories()
        emit('update:tags', data.categories)
      }).catch(e => console.error(e))

      return picker
    }
  }
})
