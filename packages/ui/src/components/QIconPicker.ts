// @ts-nocheck

import {
  h,
  defineComponent,
  onMounted,
  reactive,
  computed,
  ref,
  nextTick,
  watch,
  Transition,
  type PropType,
  type SlotsType,
  type VNode,
} from 'vue'
import { QBtn, QPagination, QResizeObserver, QScrollArea, QTooltip } from 'quasar'

import { iconSetNames, loadIconSet as loadQuasarExtrasIconSet } from './icon-set-loader'
import type { IconNameArray } from '../../types/types'

export interface QIconPickerSlots {
  /**
   * Slot for changing the display of the icon.
   *
   * @param name The selected icon name.
   * @param-type name String
   * @param-ts-type name string
   * @param-example name bolt
   * @param-example name calendar
   * @param-example name <template #icon="name"><q-btn :name="name" :label="name" no-caps /></template>
   */
  icon: (name: string) => VNode[]
  /**
   * Anything can go into this slot.
   */
  footer: (pagination: Record<string, any>) => VNode[]
  /**
   * Use if you want to provide your own pagination UI. You can control this with the data from the property `model-pagination`.
   */
  pagination: (pagination: Record<string, any>) => VNode[]
}

/**
 * QIconPicker Properties
 */
const useIconPickerProps = {
  /**
   * `v-model`; the selected icon.
   *
   * @category model
   * @example v-model="calendar_today"
   * @example v-model="bolt"
   */
  modelValue: String,
  /**
   * The name of a [Quasar Icon Set](https://quasar.dev/options/quasar-icon-sets). Built-in sets are lazy loaded from `@quasar/extras`.
   *
   * @category source
   * @values material-icons | material-icons-outlined | material-icons-round | material-icons-sharp | material-symbols-outlined | material-symbols-rounded | material-symbols-sharp | ionicons-v8 | mdi-v7 | fontawesome-v7 | line-awesome | eva-icons | themify | bootstrap-icons
   * @example icon-set="material-icons"
   * @example icon-set="fontawesome-v7"
   */
  iconSet: {
    type: String,
    validator: (v) => [...iconSetNames, ''].includes(v),
    default: '',
  },
  /**
   * An array of objects containing icon information. The object must contain the key `name` with the value being the selected icon name. Use the optional `icon` key for SVG path data used for display, for example `{ name: 'bolt', icon: matBolt }`.
   *
   * @category source
   * @tsType IconNameArray
   * @example :icons="[{ name: 'calendar-today' }, { name: 'bolt' }]"
   */
  icons: Array as PropType<IconNameArray>,
  /**
   * Icons will be filtered by the passed string.
   *
   * @category source
   * @example :filter="myFilter"
   */
  filter: String,
  /**
   * Use less of a footprint for the component.
   *
   * @category style
   */
  dense: Boolean,
  /**
   * Turns tooltips on for each displayed icon, showing the icon name.
   *
   * @category behavior
   */
  tooltips: Boolean,
  /**
   * Hides the footer area when pagination is enabled.
   *
   * @category pagination
   */
  noFooter: Boolean,
  /**
   * Size in CSS units, including unit name or standard size name (xs, sm, md, lg, xl).
   *
   * @category style
   * @example size="3rem"
   * @example size="24px"
   * @example size="lg"
   */
  size: {
    type: String,
    default: 'inherit',
  },
  /**
   * Any color from the [Quasar Color Palette](https://quasar.dev/style/color-palette).
   *
   * @category style
   * @example color="orange-8"
   * @example color="yellow-6"
   */
  color: String,
  /**
   * Any text color from the [Quasar Color Palette](https://quasar.dev/style/color-palette).
   *
   * @category style
   * @example text-color="orange-8"
   * @example text-color="red-6"
   */
  textColor: String,
  /**
   * Color used for the selected icon.
   *
   * @category style
   * @example selected-color="orange-8"
   * @example selected-color="#c8c8c8"
   */
  selectedColor: {
    type: String,
    default: 'primary',
  },
  /**
   * Text color used for the selected icon.
   *
   * @category style
   * @example selected-text-color="orange-8"
   * @example selected-text-color="#c8c8c8"
   */
  selectedTextColor: {
    type: String,
    default: 'grey-1',
  },
  /**
   * The properties to pass to the QPagination component.
   *
   * @category pagination
   * @tsType PaginationProps
   * @api-exemption examples
   */
  paginationProps: {
    type: Object,
    default: () => ({
      maxPages: 5,
      input: true,
    }),
  },
  /**
   * For pagination purposes uses Quasar's pagination component. Use `v-model:model-pagination` to synchronize the data. You can use `page` and `itemsPerPage` to control the pagination. QIconPicker will set `totalPages` depending on `icon-set` or `icons` properties. If using a `filter` the page will automatically be reset to 1.
   *
   * @category pagination
   * @tsType Pagination
   * @example v-model:model-pagination="myPagination"
   */
  modelPagination: Object,
  /**
   * Turns on animation.
   *
   * @category behavior
   */
  animated: Boolean,
  /**
   * When animated property is true, transition to use for previous paginated view.
   *
   * @category behavior
   * @example transition-prev="flip-right"
   */
  transitionPrev: {
    type: String,
    default: 'slide-right',
  },
  /**
   * When animated property is true, transition to use for next paginated view.
   *
   * @category behavior
   * @example transition-next="flip-left"
   */
  transitionNext: {
    type: String,
    default: 'slide-left',
  },
}

const direction = {
  NEXT: 'next',
  PREV: 'prev',
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
      if (newPag[prop] !== oldPag[prop]) {
        return false
      }
    }
    return true
  }

  const computedPagination = computed(() => {
    return fixPagination({
      ...data.innerPagination,
      ...props.modelPagination,
    })
  })

  const computedPagesNumber = computed(() => {
    return computedPagination.value.itemsPerPage === 0
      ? 1
      : Math.max(
          1,
          Math.ceil(computedFilteredIcons.value.length / computedPagination.value.itemsPerPage),
        )
  })

  function setPagination(val) {
    const newPagination = fixPagination({
      ...computedPagination.value,
      ...val,
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
      setPagination({
        total: computedFilteredIcons.value.length,
        totalPages: computedPagesNumber.value,
      })
    }
  }

  return {
    samePagination,
    computedPagination,
    setPagination,
    updatePagination,
    computedPagesNumber,
  }
}

/**
 * Icons
 */
function useIconPickerIcons(data, props, computedFirstItemIndex, computedLastItemIndex) {
  let iconSetLoadId = 0

  async function loadIconSet(iconSet) {
    const loadId = ++iconSetLoadId
    data.iconsList = []

    if (iconSet) {
      // detect if UMD version is installed
      if (typeof window !== 'undefined' && window.QIconPicker) {
        const name = iconSet.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
        if (window.QIconPicker.iconSet && window.QIconPicker.iconSet[name]) {
          data.iconsList = window.QIconPicker.iconSet[name].icons
        } else {
          console.error(`QIconPicker: no icon set loaded called ${iconSet}`)
          console.error(
            'Built-in icon sets require ESM bundler support for @quasar/extras lazy imports. With the UMD build, pass an icons array instead.',
          )
        }
      } else {
        if (iconSetNames.includes(iconSet)) {
          try {
            const loadedIconSet = await loadQuasarExtrasIconSet(iconSet)

            if (loadId === iconSetLoadId) {
              data.iconsList = loadedIconSet.icons
            }
          } catch (err) {
            console.error(`QIconPicker: failed to load icon set called ${iconSet}`)
            console.error(err)
          }
        } else {
          console.error(`QIconPicker: cannot find icon set called ${iconSet}`)
        }
      }
    }
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
      if (props.filter !== void 0 && props.filter !== '' && props.filter !== null) {
        const filter = props.filter.toLowerCase()
        icons = icons.filter((icon) => icon.name.toLowerCase().includes(filter))
      }
    }
    return icons
  })

  return {
    loadIconSet,
    computedDisplayedIcons,
    computedFilteredIcons,
  }
}

/**
 * Exposes api functions
 */
function exposeIconPickerApi(
  data,
  computedPagination,
  setPagination,
  computedFirstItemIndex,
  computedLastItemIndex,
  computedFilteredIcons,
  computedPagesNumber,
) {
  /**
   * If paginated, will go to previous page if not on 1st page.
   */
  const prevPage = () => {
    const { page } = computedPagination.value
    if (page > 1) {
      setPagination({ page: page - 1 })
      data.direction = direction.PREV
    }
  }

  /**
   * If paginated, will go to next page, if not on last page.
   */
  const nextPage = () => {
    const { page, itemsPerPage } = computedPagination.value
    if (
      computedLastItemIndex.value > 0 &&
      page * itemsPerPage < computedFilteredIcons.value.length
    ) {
      setPagination({ page: page + 1 })
      data.direction = direction.NEXT
    }
  }

  /**
   * If paginated, will go to the last page.
   */
  const lastPage = () => {
    setPagination({ page: computedPagesNumber.value })
  }

  /**
   * If paginated, will go to the first page.
   */
  const firstPage = () => {
    setPagination({ page: 0 })
  }

  /**
   * True if on last page otherwise false.
   */
  const isLastPage = computed(() => {
    return computedLastItemIndex.value === 0
      ? true
      : computedPagination.value.page >= computedPagesNumber.value
  })

  /**
   * True if on first page otherwise false.
   */
  const isFirstPage = computed(() => {
    return computedPagination.value.page === 1
  })

  return {
    prevPage,
    nextPage,
    lastPage,
    firstPage,
    isLastPage,
    isFirstPage,
  }
}

export default defineComponent({
  name: 'QIconPicker',

  slots: Object as SlotsType<QIconPickerSlots>,

  props: {
    ...useIconPickerProps,
  },

  emits: [
    /**
     * `v-model`; selected icon name, including the icon prefix when required.
     *
     * @param value Selected icon name.
     * @param-type value String
     * @param-ts-type value string
     */
    'update:model-value',
    /**
     * Emitted when the pagination state changes.
     *
     * @param pagination New pagination state.
     * @param-type pagination Object
     * @param-ts-type pagination Pagination
     */
    'update:model-pagination',
  ],

  setup(props, { slots, emit, expose }) {
    const scrollAreaRef = ref(null)
    const data = reactive({
      iconsList: [],
      innerPagination: {
        page: 1,
        itemsPerPage: 0,
        totalPages: 0,
      },
      width: '100',
      height: '100',
      direction: '',
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

    const { loadIconSet, computedDisplayedIcons, computedFilteredIcons } = useIconPickerIcons(
      data,
      props,
      computedFirstItemIndex,
      computedLastItemIndex,
    )

    const {
      samePagination,
      computedPagination,
      setPagination,
      updatePagination,
      computedPagesNumber,
    } = useIconPickerPagination(data, props, emit, computedFilteredIcons)

    const iconPickerApi = exposeIconPickerApi(
      data,
      computedPagination,
      setPagination,
      computedFirstItemIndex,
      computedLastItemIndex,
      computedFilteredIcons,
      computedPagesNumber,
    )

    expose({
      /**
       * If paginated, will go to previous page if not on 1st page.
       */
      prevPage: iconPickerApi.prevPage,
      /**
       * If paginated, will go to next page, if not on last page.
       */
      nextPage: iconPickerApi.nextPage,
      /**
       * If paginated, will go to the last page.
       */
      lastPage: iconPickerApi.lastPage,
      /**
       * If paginated, will go to the first page.
       */
      firstPage: iconPickerApi.firstPage,
      /**
       * True if on last page otherwise false.
       */
      isLastPage: iconPickerApi.isLastPage,
      /**
       * True if on first page otherwise false.
       */
      isFirstPage: iconPickerApi.isFirstPage,
    })

    onMounted(async () => {
      if (props.iconSet) {
        await loadIconSet(props.iconSet)
      } else if (props.icons !== void 0 && props.icons.length > 0) {
        data.iconsList = props.icons
      }
      updatePagination()
    })

    watch(
      () => props.iconSet,
      async (val) => {
        if (val) {
          await loadIconSet(val)
          updatePagination()
          nextTick(() => {
            // whenever the icon set changes, it resets pagination page to page 1
            setPagination({ page: 1 })
          }).catch((e) => console.error(e))
          // scroll to top of QScrollArea, if applicable
          if (scrollAreaRef.value) {
            scrollAreaRef.value.setScrollPosition('vertical', 0)
          }
        }
      },
    )

    watch(
      () => props.icons,
      () => {
        if (props.icons !== void 0 && props.icons.length > 0) {
          data.iconsList = props.icons
        }
        updatePagination()
        nextTick(() => {
          // whenever the icon set changes, it resets pagination page to page 1
          setPagination({ page: 1 })
        }).catch((e) => console.error(e))
        // scroll to top of QScrollArea, if applicable
        if (scrollAreaRef.value) {
          scrollAreaRef.value.setScrollPosition('vertical', 0)
        }
      },
    )

    watch(
      () => props.filter,
      () => {
        // whenever the filter changes, it resets pagination page to page 1
        setPagination({ page: 1, totalPages: computedPagesNumber.value })
        updatePagination()
      },
    )

    if (props.modelPagination) {
      watch(
        () => props.modelPagination,
        (newVal, oldVal) => {
          if (!samePagination(oldVal, newVal)) {
            updatePagination()
          }
        },
      )
    }

    if (props.modelPagination) {
      watch(
        () => props.modelPagination.itemsPerPage,
        () => {
          updatePagination()
        },
      )

      watch(
        () => props.modelPagination.page,
        () => {
          updatePagination()
        },
      )
    }

    return () => {
      function renderPagination() {
        if (props.modelPagination && props.modelPagination.itemsPerPage === 0) return ''
        const { page, totalPages } = computedPagination.value

        return slots.pagination
          ? slots.pagination(computedPagination.value)
          : h(QPagination, {
              class: 'q-icon-picker__pagination',
              ...props.paginationProps,
              modelValue: page,
              max: totalPages,
              'onUpdate:modelValue': (value) => {
                if (props.animated) {
                  if (value > page) {
                    data.direction = direction.NEXT
                  } else {
                    data.direction = direction.PREV
                  }
                }
                setPagination({ page: value })
              },
            })
      }

      function renderFooter() {
        if (props.noFooter !== true && props.modelPagination !== void 0) {
          return h(
            'div',
            {
              class: 'q-icon-picker__footer flex flex-center',
            },
            [slots.footer ? slots.footer(computedPagination.value) : renderPagination()],
          )
        }
      }

      function renderTooltip(name) {
        if (props.tooltips === true) {
          return () => h(QTooltip, {}, () => name)
        }
      }

      function renderIcon(icon) {
        const iconValue = icon.prefix !== void 0 ? icon.prefix + ' ' + icon.name : icon.name
        const displayValue = icon.icon !== void 0 ? icon.icon : iconValue

        if (slots.icon) {
          return slots.icon(iconValue)
        }
        const isSelected = iconValue === props.modelValue
        const textColor = isSelected ? props.selectedTextColor : undefined
        const color = isSelected ? props.selectedColor : undefined
        const size = props.size ? props.size : undefined

        return h(
          QBtn,
          {
            id: icon.name,
            unelevated: true,
            dense: props.dense,
            noWrap: true,
            size: size,
            textColor: textColor,
            color: color,
            icon: displayValue,
            'aria-label': iconValue,
            'aria-pressed': isSelected,
            onClick: () => emit('update:model-value', iconValue),
          },
          renderTooltip(iconValue),
        )
      }

      function renderIcons() {
        return computedDisplayedIcons.value.map((icon) => renderIcon(icon))
      }

      function renderContainer() {
        const container = () =>
          h(
            'div',
            {
              key: computedPagination.value.page,
              class: 'q-icon-picker__container col',
            },
            [...renderIcons()],
          )

        if (props.animated === true) {
          const transition =
            'q-transition--' +
            (data.direction === 'prev' ? props.transitionPrev : props.transitionNext)
          return () =>
            h(
              Transition,
              {
                name: transition,
                appear: true,
              },
              container,
            )
        }

        return container
      }

      function renderScrollArea() {
        return h(
          QScrollArea,
          {
            ref: scrollAreaRef,
            style: {
              width: data.width + 'px',
              height: data.height + 'px',
            },
          },
          renderContainer(),
        )
      }

      function renderBody() {
        return h(
          'div',
          {
            class: 'q-icon-picker__body col column',
          },
          [
            renderScrollArea(),
            h(QResizeObserver, {
              onResize: (size) => {
                data.width = size.width
                data.height = size.height
              },
            }),
          ],
        )
      }

      const classes = ['q-icon-picker', 'column']
      if (props.color) classes.push('bg-' + props.color)
      if (props.textColor) classes.push('text-' + props.textColor)

      return h(
        'div',
        {
          class: classes.join(' '),
        },
        [renderBody(), renderFooter()],
      )
    }
  },
})
