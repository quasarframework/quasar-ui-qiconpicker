// Mixins
import { QColorizeMixin } from 'q-colorize-mixin'

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

export default {
  name: 'QIconPicker',

  mixins: [QColorizeMixin],

  props: {
    ...props.base
  },

  data () {
    return {
      iconsList: [],
      innerPagination: {
        page: 1,
        itemsPerPage: 0,
        totalPages: 0
      },
      categories: [],
      width: '100%',
      height: '100%'
    }
  },

  beforeMount () {
    if (this.pagination) {
      this.$emit('update:pagination', { ...this.__computedPagination })
    }
  },

  mounted () {
    if (this.iconSet) {
      this.__loadIconSet(this.iconSet)
    }
    else if (this.icons !== void 0 && this.icons.length > 0) {
      this.iconsList = this.icons
    }
    this.__updatePagination()
  },

  computed: {
    __filteredIcons () {
      let icons = this.iconsList
      if (icons) {
        if (this.tags !== void 0 && this.tags !== '' && this.tags !== null && this.tags.length > 0) {
          icons = icons.filter(icon => {
            return icon.tags.filter(tag => this.tags.includes(tag)).length > 0
          })
        }
        if (this.filter !== void 0 && this.filter !== '' && this.filter !== null) {
          icons = icons.filter(icon => icon.name.includes(this.filter))
        }
      }
      return icons
    },

    // the icons to display after filtering and then pagination
    __displayedIcons () {
      let icons = []
      if (this.iconsList) {
        icons = this.__filteredIcons

        // should the icons be paged?
        if (this.pagination && this.pagination.itemsPerPage !== 0) {
          icons = icons.slice(this.__firstItemIndex, this.__lastItemIndex)
        }
      }
      return icons
    },

    __computedPagination () {
      return this.__fixPagination({
        ...this.innerPagination,
        ...this.pagination
      })
    },

    // index of first item on a page
    __firstItemIndex () {
      const { page, itemsPerPage } = this.__computedPagination
      return (page - 1) * itemsPerPage
    },

    // index of last item on a page
    __lastItemIndex () {
      const { page, itemsPerPage } = this.__computedPagination
      return page * itemsPerPage
    },

    // returns true if on first page
    __isFirstPage () {
      return this.__computedPagination.page === 1
    },

    // the number of pages available based on itemsPerPage
    __pagesNumber () {
      return this.__computedPagination.itemsPerPage === 0
        ? 1
        : Math.max(
          1,
          Math.ceil(this.__filteredIcons.length / this.__computedPagination.itemsPerPage)
        )
    },

    // returns true if on last page
    __isLastPage () {
      return this.__lastItemIndex === 0
        ? true
        : this.__computedPagination.page >= this.__pagesNumber
    }
  },

  watch: {
    iconSet (val) {
      if (val) {
        this.__loadIconSet(val)
        this.__updatePagination()
        this.$nextTick(() => {
          // whenever the icon set changes, it resets pagination page to page 1
          this.__setPagination({ page: 1 })
        })
        // scroll to top of QScrollArea, if applicable
        this.$refs.scrollArea.setScrollPosition(0)
      }
    },

    icons (val) {
      if (this.icons !== void 0 && this.icons.length > 0) {
        this.iconsList = this.icons
      }
      this.__updatePagination()
      this.$nextTick(() => {
        // whenever the icon set changes, it resets pagination page to page 1
        this.__setPagination({ page: 1 })
      })
      // scroll to top of QScrollArea, if applicable
      this.$refs.scrollArea.setScrollPosition(0)
    },

    pagination (newVal, oldVal) {
      if (!this.__samePagination(oldVal, newVal)) {
        this.__updatePagination()
      }
    },

    'pagination.itemsPerPage' () {
      this.__updatePagination()
    },

    'pagination.page' () {
      this.__updatePagination()
    },

    filter () {
      // whenever the filter changes, it resets pagination page to page 1
      this.__setPagination({ page: 1, totalPages: this.__pagesNumber })
      this.__updatePagination()
    },

    tags (val) {
      // whenever the tags change, it resets pagination page to page 1
      this.__setPagination({ page: 1, totalPages: this.__pagesNumber })
      this.__updatePagination()
    }
  },

  methods: {
    __loadIconSet (iconSet) {
      this.iconsList = []
      if (iconSet) {
        // detect if UMD version is installed
        if (window.QIconPicker) {
          const name = iconSet.replace(/-([a-z])/g, g => g[1].toUpperCase())
          if (window.QIconPicker.iconSet && window.QIconPicker.iconSet[name]) {
            const iconsSet = window.QIconPicker.iconSet[name]
            this.iconsList = iconsSet.icons
          }
          else {
            /* eslint-disable */
            console.error('QIconPicker: no icon set loaded called ' + iconSet +'\'')
            console.error('Be sure to load the UMD version of the icon set in a script tag before using QIconPicker UMD version')
            /* eslint-enable */
          }
        }
        else {
          try {
            const iconsSet = require('@quasar/quasar-ui-qiconpicker/src/components/icon-set/' + iconSet + '.js').default
            this.iconsList = iconsSet.icons
          }
          catch (e) {
            // eslint-disable-next-line no-console
            console.error('QIconPicker: cannot find icon set found called ' + iconSet + '\'')
          }
        }
      }
    },

    __fixPagination (p) {
      if (p.page < 1) {
        p.page = 1
      }
      if (p.itemsPerPage === void 0 || p.itemsPerPage < 1) {
        p.itemsPerPage = 0 // all
      }
      return p
    },

    // returns true if the pagination is the same,
    // otherwise returns false if it has changed
    __samePagination (oldPag, newPag) {
      // eslint-disable-next-line no-unused-vars
      for (const prop in newPag) {
        if (newPag[prop] !== oldPag[prop]) {
          return false
        }
      }
      return true
    },

    __setPagination (val) {
      const newPagination = this.__fixPagination({
        ...this.__computedPagination,
        ...val
      })

      if (this.pagination) {
        this.$emit('update:pagination', newPagination)
      }
      else {
        this.innerPagination = newPagination
      }
    },

    __updatePagination () {
      if (this.pagination !== void 0) {
        this.__setPagination({ total: this.__filteredIcons.length, totalPages: this.__pagesNumber })
      }
    },

    // public function - goes to previous page
    prevPage () {
      const { page } = this.__computedPagination
      if (page > 1) {
        this.__setPagination({ page: page - 1 })
      }
    },

    // public function - goes to next page
    nextPage () {
      const { page, itemsPerPage } = this.__computedPagination
      if (this.__lastItemIndex > 0 && page * itemsPerPage < this.__filteredIcons.length) {
        this.__setPagination({ page: page + 1 })
      }
    },

    __getCategories () {
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
    },

    __onResize (size) {
      this.width = size.width
      this.height = size.height
    },

    __renderBody (h) {
      return h('div', {
        staticClass: 'q-icon-picker__body col column'
      }, [
        this.__renderScrollArea(h),
        h(QResizeObserver, {
          on: {
            resize: this.__onResize
          }
        })
      ])
    },

    __renderFooter (h) {
      const slot = this.$scopedSlots.footer

      return h('div', {
        staticClass: 'q-icon-picker__footer flex flex-center'
      }, [
        slot ? slot(this.__computedPagination) : this.__renderPagination(h)
      ])
    },

    __renderPagination (h) {
      if (this.pagination && this.pagination.itemsPerPage === 0) return ''

      const slot = this.$scopedSlots.pagination
      const { page, totalPages } = this.__computedPagination

      return slot || h(QPagination, this.setBothColors(this.color, this.backgroundColor, {
        staticClass: 'q-icon-picker__pagination',
        props: {
          ...this.paginationProps,
          value: page,
          max: totalPages
        },
        on: {
          input: v => {
            this.__setPagination({ page: v })
          }
        }
      }))
    },

    __renderScrollArea (h) {
      return h(QScrollArea, {
        ref: 'scrollArea',
        style: {
          width: this.width + 'px',
          height: this.height + 'px'
        }
        // staticClass: 'q-icon-picker__scroll-area col column'
      }, [
        this.__renderContainer(h)
      ])
    },

    __renderContainer (h) {
      const container = h('div', {
        key: this.__computedPagination.page,
        staticClass: 'q-icon-picker__container col'
      }, [
        ...this.__renderIcons(h)
      ])

      if (this.animated === true) {
        const transition = 'q-transition--' + (this.direction === 'prev' ? this.transitionPrev : this.transitionNext)
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
    },

    __renderTooltip (h, name) {
      return h(QTooltip, {
      }, name)
    },

    __renderIcons (h) {
      return this.__displayedIcons.map(icon => this.__renderIcon(h, icon))
    },

    __renderIcon (h, icon) {
      const slot = this.$scopedSlots.icon

      const name = (icon.prefix !== void 0 ? icon.prefix + ' ' + icon.name : icon.name)

      if (slot) {
        return slot(name)
      }

      const isSelected = name === this.value
      const color = isSelected ? this.selectedColor : ''
      const backgroundColor = isSelected ? this.selectedBackgroundColor : ''

      return h(QBtn, this.setBothColors(color, backgroundColor, {
        staticClass: 'q-icon-picker__icon' + (isSelected ? ' q-icon-picker__active' : ''),
        style: {
          'font-size': this.fontSize
        },
        domProps: {
          id: name
        },
        props: {
          unelevated: true,
          dense: this.dense,
          noWrap: true,
          icon: name
        },
        on: {
          click: () => {
            this.$emit('input', name)
          }
        }
      }), [
        this.tooltips === true && this.__renderTooltip(h, name)
      ])
    }
  },

  render (h) {
    const picker = h('div', this.setBothColors(this.color, this.backgroundColor, {
      ref: 'picker',
      staticClass: 'q-icon-picker column'
    }), [
      this.__renderBody(h),
      this.noFooter !== true && this.pagination !== void 0 && this.__renderFooter(h)
    ])

    this.$nextTick(() => {
      this.__getCategories()
      this.$emit('tags', this.categories)
    })

    return picker
  }
}
