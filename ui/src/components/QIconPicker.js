import {h, defineComponent, onBeforeMount, onMounted, reactive, computed} from 'vue'
import {textToRgb} from 'quasar/src/utils/colors'

// Util
import props from './utils/props.js'

// Quasar
import {
  QBtn,
  QScrollArea,
  QTooltip,
  QPagination,
  QResizeObserver
} from 'quasar'
import usePagination from "./composables/usePagination";
import useIcons from "./composables/useIcons";
import useProps from "./composables/useProps";


export default defineComponent({
  name: 'QIconPicker',

  //mixins: [QColorizeMixin],

  props: {
    ...useProps.base
  },
  setup(props, {slots, emit}) {

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
      __filteredIcons,
      __getCategories,
      __loadIconSet,
      __renderIcons
    } = useIcons(data, props, emit, slots)

    const {
      __renderPagination,
      __updatePagination,
      __computedPagination
    } = usePagination(data, props, emit, slots, __filteredIcons)


    onBeforeMount(() => {
      if (props.pagination) {
        emit('update:pagination', {...__computedPagination})
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
        ref: 'scrollArea',
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


    const __renderTooltip = (name) => {
      return h(QTooltip, {}, name)
    }


    return () => {
      const picker = h('div', this.setBothColors(props.color, this.backgroundColor, {
        ref: 'picker',
        staticClass: 'q-icon-picker column'
      }), [
        __renderBody(),
        props.noFooter !== true && props.pagination !== void 0 && __renderFooter()
      ])

      this.$nextTick(() => {
        __getCategories()
        emit('tags', data.categories)
      })

      return picker
    }

  }
})
