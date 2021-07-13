<template>
  <q-page>
    <div ref="infoBar" class="row q-mx-md q-gutter-sm items-center">
      <q-select v-model="iconSet" :options="iconSets" label="Icon Set" emit-value style="min-width: 200px;" />
      <q-separator vertical inset />
      <span>Count: {{ pagination.total }}</span>
      <q-separator vertical inset />
      <span>Selected: <mark>{{ name }}</mark></span>
      <q-separator vertical inset />
      <q-icon :name="name" size="3em" />
      <q-separator v-if="name && name.length > 0" vertical inset />
      <q-space />
      <q-input v-model="filter" label="Filter" outlined clearable class="q-ma-md" />
    </div>
    <q-separator color="light-blue-2" style="width: 100%;"/>
    <div class="row fit">

      <div class="col-auto no-wrap text-grey-7 q-py-lg full-height">
        <q-scroll-area :style="scrollStyle">
          <q-list separator>
            <q-item-label class="text-center full-width q-pb-lg">Categories</q-item-label>
            <q-separator />
            <q-item v-for="cat in categories" clickable v-ripple :key="cat">
              <q-item-section>
                <q-checkbox v-model="selected[cat]" :label="cat" dense />
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </div>

      <div class="column col" style="min-width: 1px; max-width: 1px;">
        <q-separator vertical inset color="light-blue-2" class="full-height"/>
      </div>

      <div class="col">
        <div class="row">
          <div class="column col-grow">
            <q-resize-observer @resize="onResize" />
            <q-icon-picker
              v-model="name"
              :filter="filter"
              :icon-set="iconSet"
              :tags="tags"
              font-size="3em"
              tooltips
              :pagination.sync="pagination"
              @tags="onTags"
              style="height: calc(100vh - 140px)"
            />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Icons',

  data () {
    return {
      name: '',
      filter: '',
      tags: [],
      pagination: {
        itemsPerPage: 0,
        page: 0,
        total: 0
      },
      loaded: false,
      categories: [],
      selected: {},
      height: 600
    }
  },

  computed: {
    ...mapGetters({
      iconSets: 'common/iconSets'
    }),

    iconSet: {
      get () {
        return this.$store.state.common.iconSet
      },
      set (b) {
        this.$store.commit('common/iconSet', b)
      }
    },

    scrollStyle () {
      return {
        width: '130px',
        height: this.height - 39 + 'px'
      }
    }
  },

  watch: {
    iconSet (val) {
      this.loaded = false
      this.tags.splice(0, this.tags.length)
    },
    filter (val) {
      this.loaded = false
    },
    selected: {
      handler (val) {
        const tags = []
        this.categories.forEach(cat => {
          if (val[cat] === true) {
            tags.push(cat)
          }
        })
        this.tags.splice(0, this.tags.length, ...tags)
      },
      deep: true
    }
  },

  methods: {
    onTags (tags) {
      if (this.loaded !== true) {
        const cats = []
        const t = [...tags]
        cats.splice(0, 0, ...t)
        this.categories.splice(0, this.categories.length, ...cats)
        this.categories.concat(...cats)
        this.categories.forEach(cat => {
          this.$set(this.selected, cat, false)
        })
        this.loaded = true
      }
    },

    onResize (size) {
      this.height = size.height
    }
  }
}
</script>

<style>
</style>
