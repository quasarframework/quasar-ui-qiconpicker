import {h, defineComponent, onBeforeMount, onMounted, reactive, nextTick, watch, ref} from 'vue'
import {useColorizeProps, useColorize } from 'q-colorize-mixin'

// Quasar
import {
  QScrollArea,
  QTooltip,
  QResizeObserver
} from 'quasar'
import usePagination from "./composables/usePagination";
import useIcons from "./composables/useIcons";


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
