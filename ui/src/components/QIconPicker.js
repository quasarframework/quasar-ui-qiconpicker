// Mixins
import { QColorizeMixin } from 'q-colorize-mixin'

// Util
import props from './utils/props.js'

// Quasar
import { QBtn, QScrollArea, QTooltip, QPagination } from 'quasar'

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
      }
    }
  },

  beforeMount () {
    if (this.pagination) {
      this.$emit('update:pagination', { ...this.computedPagination })
    }
  },

  mounted () {
    if (this.iconSet) {
      this.__loadIconSet(this.iconSet)
    } else if (this.icons !== void 0 && this.icons.length > 0) {
      this.iconsList = this.icons
    }
    this.__updatePagination()
  },

  computed: {
    filteredIcons () {
      let icons = this.iconsList
      if (this.iconsList) {
        if (this.filter !== void 0 && this.filter !== '' && this.filter !== null) {
          icons = this.iconsList.filter(icon => icon.name.includes(this.filter))
        }
      }
      return icons
    },

    // the icons to display after filtering and then pagination
    displayedIcons () {
      let icons = []
      if (this.iconsList) {
        icons = this.filteredIcons

        // should the icons be paged?
        if (this.pagination && this.pagination.itemsPerPage !== 0) {
          icons = icons.slice(this.firstItemIndex, this.lastItemIndex)
        }
      }
      return icons
    },

    computedPagination () {
      return this.__fixPagination({
        ...this.innerPagination,
        ...this.pagination
      })
    },

    // index of first item on a page
    firstItemIndex () {
      const { page, itemsPerPage } = this.computedPagination
      return (page - 1) * itemsPerPage
    },

    // index of last item on a page
    lastItemIndex () {
      const { page, itemsPerPage } = this.computedPagination
      return page * itemsPerPage
    },

    // returns true if on first page
    isFirstPage () {
      return this.computedPagination.page === 1
    },

    // the number of pages available based on itemsPerPage
    pagesNumber () {
      return this.computedPagination.itemsPerPage === 0
        ? 1
        : Math.max(
          1,
          Math.ceil(this.filteredIcons.length / this.computedPagination.itemsPerPage)
        )
    },

    // returns true if on last page
    isLastPage () {
      return this.lastItemIndex === 0
        ? true
        : this.computedPagination.page >= this.pagesNumber
    }
  },

  watch: {
    iconSet (val) {
      this.__loadIconSet(val)
      this.__updatePagination()
      this.$nextTick(() => {
        // whenever the icon set changes, it resets pagination page to page 1
        this.__setPagination({ page: 1 })
      })
      // scroll to top of QScrollArea, if applicable
      this.$refs.scrollArea.setScrollPosition(0)
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
      this.__setPagination({ page: 1, totalPages: this.pagesNumber })
    }
  },

  methods: {
    __loadIconSet (set) {
      this.iconsList = []
      if (set) {
        // detect if UMD version is installed
        if (window.QIconPicker) {
          const name = set.replace(/-([a-z])/g, g => g[1].toUpperCase())
          if (window.QIconPicker.iconSet && window.QIconPicker.iconSet[name]) {
            const iconsSet = window.QIconPicker.iconSet[name]
            this.iconsList = iconsSet.icons
          }
          else {
            console.error(`QIconPicker: no icon set loaded called '${set}'`)
            console.error('Be sure to load the UMD version of the icon set in a script tag before using with UMD')
          }
        }
        else {
          try {
            const iconsSet = require(`@quasar/quasar-ui-qiconpicker/src/components/icon-set/${set}.js`).default
            this.iconsList = iconsSet.icons
          }
          catch (e) {
            console.error(`Not found: @quasar/quasar-ui-qiconpicker/src/components/icon-set/${set}.js`)
            try {
              const iconsSet = require(`../src/components/icon-set/${set}.js`).default
              this.iconsList = iconsSet.icons
            }
            catch (e) {
              console.error(`Not found: ../src/components/icon-set/${set}.js`)
              try {
                const iconsSet = require(`./icon-set/${set}.js`).default
                this.iconsList = iconsSet.icons
              }
              catch (e) {
                // console.error(`Not found: ./icon-set/${set}.js`)
                console.error(`QIconPicker: no icon set found called '${set}'`)
              }
            }
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
      for (let prop in newPag) {
        if (newPag[prop] !== oldPag[prop]) {
          return false
        }
      }
      return true
    },

    __setPagination (val) {
      const newPagination = this.__fixPagination({
        ...this.computedPagination,
        ...val
      })

      if (this.pagination) {
        this.$emit('update:pagination', newPagination)
      } else {
        this.innerPagination = newPagination
      }
    },

    __updatePagination () {
      if (this.pagination !== void 0) {
        this.__setPagination({ total: this.filteredIcons.length, totalPages: this.pagesNumber })
      }
    },

    // public function - goes to previous page
    prevPage () {
      const { page } = this.computedPagination
      if (page > 1) {
        this.__setPagination({ page: page - 1 })
      }
    },

    // public function - goes to next page
    nextPage () {
      const { page, itemsPerPage } = this.computedPagination
      if (this.lastItemIndex > 0 && page * itemsPerPage < this.filteredIcons.length) {
        this.__setPagination({ page: page + 1 })
      }
    },

    __renderBody (h) {
      return h('div', {
        staticClass: 'q-icon-picker__body'
      }, [
        this.__renderScrollArea(h)
      ])
    },

    __renderFooter (h) {
      const slot = this.$scopedSlots.footer

      return h('div', {
        staticClass: 'q-icon-picker__footer flex flex-center'
      }, [
        slot ? slot(this.computedPagination) : this.__renderPagination(h)
      ])
    },

    __renderPagination (h) {
      if (this.pagination && this.pagination.itemsPerPage === 0) return ''

      const slot = this.$scopedSlots.pagination
      const { page, totalPages } = this.computedPagination

      return slot || h(QPagination, this.setBothColors(this.color, this.backgroundColor, {
        staticClass: 'q-icon-picker__pagination',
        props: {
          value: page,
          max: totalPages,
          input: true,
          color: this.paginationColor
        },
        on: {
          'input': v => {
            this.__setPagination({ page: v })
          }
        }
      }))
    },

    __renderScrollArea (h) {
      return h(QScrollArea, {
        ref: 'scrollArea',
        staticClass: 'q-icon-picker__scroll-area fit'
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
      this.__renderBody(h),
      this.noFooter !== true && this.pagination !== void 0 && this.__renderFooter(h)
    ])
  }
}
