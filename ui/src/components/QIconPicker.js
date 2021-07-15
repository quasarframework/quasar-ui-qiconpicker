import {h, defineComponent, onBeforeMount, onMounted, reactive, computed, ref, nextTick, watch, toRefs} from 'vue'
import {useColorizeProps, useColorize} from 'q-colorize-mixin'
import {QBtn, QPagination, QResizeObserver, QScrollArea, QTooltip} from "quasar";

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
    // eslint-disable-next-line no-unused-vars
    for (const prop in newPag) {
      if (newPag[prop] !== oldPag[prop]) {
        return false
      }
    }
    return true
  }

  const computedPagination = computed(() => {
    return fixPagination({
      ...data.innerPagination,
      ...props.pagination
    })
  })

  const computedPagesNumber = computed(() => {
    return computedPagination.value.itemsPerPage === 0
      ? 1
      : Math.max(
        1,
        Math.ceil(computedFilteredIcons.value.length / computedPagination.value.itemsPerPage)
      )
  })

  function setPagination(val) {
    console.info(val)
    const newPagination = fixPagination({
      ...computedPagination.value,
      ...val
    })
    console.log(newPagination)

    if (props.pagination) {
      emit('update:pagination', newPagination)
    } else {
      data.innerPagination = newPagination
    }
  }

  function updatePagination() {
    if (props.pagination !== void 0) {
      setPagination({total: computedFilteredIcons.value.length, totalPages: computedPagesNumber.value})
    }
  }

  // returns true if on first page
  const computedIsFirstPage = computed(() => {
    return computedPagination.value.page === 1
  })


  return {
    samePagination,
    computedPagination,
    setPagination,
    updatePagination,
    computedPagesNumber
  }
}

// Public functions
function useIconPickerExposed(expose, computedPagination, setPagination, computedFirstItemIndex, computedLastItemIndex, computedFilteredIcons) {
  // goes to previous page
  function prevPage() {
    const {page} = computedPagination.value
    if (page > 1) {
      setPagination({page: page - 1})
    }
  }

  // oes to next page
  function nextPage() {
    const {page, itemsPerPage} = computedPagination.value
    if (computedLastItemIndex.value > 0 && page * itemsPerPage < computedFilteredIcons.value.length) {
      setPagination({page: page + 1})
    }
  }

  expose({
    prevPage,
    nextPage
  })
}

function useIconPickerIcons(data, props, computedFirstItemIndex, computedLastItemIndex) {

  function loadIconSet(iconSet) {
    data.iconsList = []
    if (iconSet) {
      // detect if UMD version is installed
      if (window.QIconPicker) {
        const name = iconSet.replace(/-([a-z])/g, g => g[1].toUpperCase())
        if (window.QIconPicker.iconSet && window.QIconPicker.iconSet[name]) {
          data.iconsList = window.QIconPicker.iconSet[name].icons
        } else {
          console.error(`QIconPicker: no icon set loaded called ${iconSet}`)
          console.error('Be sure to load the UMD version of the icon set in a script tag before using QIconPicker UMD version')
        }
      } else {
        try {
          data.iconsList = require(`@quasar/quasar-ui-qiconpicker/src/components/icon-set/${iconSet}.js`).default.icons
        } catch (e) {
          console.error(`QIconPicker: cannot find icon set found called ${iconSet}`)
        }
      }
    }
    console.info(`Loaded ${data.iconsList.length} icons.`)
  }


  const computedDisplayedIcons = computed(() => {
    let icons = []
    if (data.iconsList) {
      icons = computedFilteredIcons.value

      // should the icons be paged?
      if (props.pagination && props.pagination.itemsPerPage !== 0) {
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
  return {
    loadIconSet,
    computedDisplayedIcons,
    computedFilteredIcons
  }
}


export default defineComponent({
  name: 'QIconPicker',
  props: {
    ...useIconPickerProps,
    ...useColorizeProps
  },
  emits: [
    'update:modelValue',
    'update:tags',
    'update:pagination'
  ],
  setup(props, {attrs, slots, emit, expose}) {
    const pickerRef = ref(null)
    const scrollAreaRef = ref(null)
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

    // index of first item on a page
    const computedFirstItemIndex = computed(() => {
      const {page, itemsPerPage} = computedPagination.value
      return (page - 1) * itemsPerPage
    })

    // index of last item on a page
    const computedLastItemIndex = computed(() => {
      const {page, itemsPerPage} = computedPagination.value
      return page * itemsPerPage
    })


    const {
      setBothColors
    } = useColorize()

    const {
      loadIconSet,
      computedDisplayedIcons,
      computedFilteredIcons
    } = useIconPickerIcons(data, props, computedFirstItemIndex, computedLastItemIndex)

    const {
      samePagination,
      computedPagination,
      setPagination,
      updatePagination,
      computedPagesNumber
    } = useIconPickerPagination(data, props, emit, computedFilteredIcons)

    useIconPickerExposed(expose, computedPagination, setPagination, computedFirstItemIndex, computedLastItemIndex, computedFilteredIcons)


    const isLastPage = computed(() => {
      return computedLastItemIndex.value === 0
        ? true
        : computedPagination.value.page >= computedPagesNumber.value
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


    onBeforeMount(() => {
      if (props.pagination) {
        emit('update:pagination', {...computedPagination.value})
      }
    })

    onMounted(() => {
      if (props.iconSet) {
        loadIconSet(props.iconSet)
      } else if (props.icons !== void 0 && props.icons.length > 0) {
        data.iconsList = props.icons
      }
      updatePagination()
    })

    function onResize(size) {
      attrs.style.width = size.width
      attrs.style.height = size.height
    }


    watch(() => props.iconSet, (val) => {
      if (val) {
        loadIconSet(val)
        updatePagination()
        nextTick(() => {
          // whenever the icon set changes, it resets pagination page to page 1
          setPagination({page: 1})
        }).catch(e => console.error(e))
        // scroll to top of QScrollArea, if applicable
        scrollAreaRef.setScrollPosition(0)
      }
    })

    watch(() => props.icons, (val) => {
      if (props.icons !== void 0 && props.icons.length > 0) {
        data.iconsList = props.icons
      }
      updatePagination()
      nextTick(() => {
        // whenever the icon set changes, it resets pagination page to page 1
        setPagination({page: 1})
      }).catch(e => console.error(e))
      // scroll to top of QScrollArea, if applicable
      scrollAreaRef.setScrollPosition(0)
    })


    watch(() => props.filter, () => {
      // whenever the filter changes, it resets pagination page to page 1
      setPagination({page: 1, totalPages: computedPagesNumber.value})
      updatePagination()
    })

    watch(() => props.tags, (val) => {
      // whenever the tags change, it resets pagination page to page 1
      setPagination({page: 1, totalPages: computedPagesNumber.value})
      updatePagination()
    })


    watch(() => props.pagination, (newVal, oldVal) => {
      if (!samePagination(oldVal, newVal)) {
        updatePagination()
      }
    })

    const {itemsPerPage, page} = toRefs(props.pagination)
    watch([itemsPerPage, page], () => {
      updatePagination()
    })


    return () => {

      function renderPagination() {
        if (props.pagination && props.pagination.itemsPerPage === 0) return ''
        const slot = (slots.pagination && slots.pagination())
        const {page, totalPages} = computedPagination.value
        return slot || h(QPagination, {
          class: ['q-icon-picker__pagination'],
          ...props.paginationProps,
          modelValue: page,
          max: totalPages,
          'onUpdate:modelValue': value => {
            setPagination({page: value})
          }
        })
      }


      function renderFooter() {
        const slot = (slots.footer && slots.footer())

        return h('div', {
          class: 'q-icon-picker__footer flex flex-center'
        }, [
          slot ? slot(computedPagination.value) : renderPagination()
        ])
      }

      function renderTooltip(name) {
        if (props.tooltips === true) {
          return () => h(QTooltip, {}, [name])
        }
      }

      function renderIcon(icon) {
        // const slot = slots.icon

        const name = (icon.prefix !== void 0 ? icon.prefix + ' ' + icon.name : icon.name)

        // if (slot) {
        //   return hSlot(slot,).icon(name)
        // }
        const isSelected = name === props.modelValue
        const color = isSelected ? props.selectedColor : ''
        const backgroundColor = isSelected ? props.selectedBackgroundColor : ''

        return h(QBtn, {
          class: ['q-icon-picker__icon' + (isSelected ? ' q-icon-picker__active' : ''), setBothColors(color, backgroundColor).class],
          style: [{'font-size': props.fontSize}],
          id: name,
          unelevated: true,
          dense: props.dense,
          noWrap: true,
          icon: name,
          onClick: () => emit('update:modelValue', name),
        }, renderTooltip(name))
      }


      function renderIcons() {
        return computedDisplayedIcons.value.map(icon => renderIcon(icon))
      }


      function renderContainer() {

        const container = h('div', {
          key: computedPagination.value.page,
          class: 'q-icon-picker__container col'
        }, [...renderIcons()])

        // if (this.animated === true) {
        //   const transition = 'q-transition--' + (this.direction === 'prev' ? props.transitionPrev : props.transitionNext)
        //   return h('transition', {
        //     props: {
        //       name: transition,
        //       appear: true
        //     }
        //   }, [
        //     container
        //   ])
        // }

        return () => container
      }


      function renderScrollArea() {
        return h(QScrollArea, {
          ref: scrollAreaRef,
          style: [{width: attrs.style.width}, {height: attrs.style.height}]
        }, renderContainer())
      }

      function renderBody() {
        if (props.noFooter !== true && props.pagination !== void 0) {
          return h('div', {
            class: 'q-icon-picker__body col column'
          }, [
            renderScrollArea(),
            h(QResizeObserver, {
              onResize: onResize
            })
          ])
        }
      }


      const picker = h('div', {
        ref: pickerRef,
        class: ['q-icon-picker column', setBothColors(attrs.style.color, attrs.style.backgroundColor).class]
      }, [
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
