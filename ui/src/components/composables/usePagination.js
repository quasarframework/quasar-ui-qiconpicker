import {computed, watch} from "vue";
import {QPagination} from "quasar";

export default function usePagination(data, props, emit, slots, setBothColors, __filteredIcons) {

  // index of first item on a page
  const __firstItemIndex = () => {
    const {page, itemsPerPage} = __computedPagination.value
    return (page - 1) * itemsPerPage
  }

  // index of last item on a page
  const __lastItemIndex = () => {
    const {page, itemsPerPage} = __computedPagination.value
    return page * itemsPerPage
  }

  const __fixPagination = (p) => {
    if (p.page < 1) {
      p.page = 1
    }
    if (p.itemsPerPage === void 0 || p.itemsPerPage < 1) {
      p.itemsPerPage = 0 // all
    }
    return p
  }

  const __computedPagination = computed(() => {
    return __fixPagination({
      ...data.innerPagination,
      ...props.pagination
    })
  })

  // returns true if the pagination is the same,
  // otherwise returns false if it has changed
  const __samePagination = (oldPag, newPag) => {
    // eslint-disable-next-line no-unused-vars
    for (const prop in newPag) {
      if (newPag[prop] !== oldPag[prop]) {
        return false
      }
    }
    return true
  }

  const __setPagination = (val) => {
    const newPagination = __fixPagination({
      ...__computedPagination.value,
      ...val
    })

    if (props.pagination) {
      emit('update:pagination', newPagination)
    } else {
      data.innerPagination = newPagination
    }
  }

  const __updatePagination = () => {
    if (props.pagination !== void 0) {
      __setPagination({total: __filteredIcons.length, totalPages: __pagesNumber})
    }
  }

  // public function - goes to previous page
  const prevPage = () => {
    const {page} = __computedPagination.value
    if (page > 1) {
      __setPagination({page: page - 1})
    }
  }

  // public function - goes to next page
  const nextPage = () => {
    const {page, itemsPerPage} = __computedPagination.value
    if (__lastItemIndex > 0 && page * itemsPerPage < __filteredIcons.length) {
      __setPagination({page: page + 1})
    }
  }

  // returns true if on first page
  const __isFirstPage = computed(() => {
    return __computedPagination.value.page === 1
  })

  // the number of pages available based on itemsPerPage
  const __pagesNumber = computed(() => {
    return __computedPagination.value.itemsPerPage === 0
      ? 1
      : Math.max(
        1,
        Math.ceil(__filteredIcons.length / __computedPagination.value.itemsPerPage)
      )
  })

  // returns true if on last page
  const __isLastPage = computed(() => {
    return __lastItemIndex === 0
      ? true
      : __computedPagination.value.page >= __pagesNumber
  })


  const __renderPagination = (h) => {
    if (props.pagination && props.pagination.itemsPerPage === 0) return ''

    const slot = slots.pagination && slots.pagination()
    const {page, totalPages} = __computedPagination.value

    return slot || h(QPagination, setBothColors(props.color, props.backgroundColor, {
      staticClass: 'q-icon-picker__pagination',
      props: {
        ...this.paginationProps,
        value: page,
        max: totalPages
      },
      on: {
        input: v => {
          __setPagination({page: v})
        }
      }
    }))
  }




  watch(() => props.pagination, (newVal, oldVal) => {
    if (!__samePagination(oldVal, newVal)) {
      __updatePagination()
    }
  })

  watch([props.pagination.itemsPerPage, props.pagination.page], () => {
    __updatePagination()
  })

  // whenever the filter or tag change, it resets pagination page to page 1
  watch([props.filter, props.tags], () => {
    __setPagination({page: 1, totalPages: __pagesNumber})
    __updatePagination()
  })

  return {
    __renderPagination,
    __updatePagination,
    __computedPagination,
    __setPagination,
    __firstItemIndex,
    __lastItemIndex
  }
}
