<template>
  <q-page>
    <div class="row q-pa-md q-gutter-sm items-center">
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
    <q-separator style="width: 100%;"/>
    <div class="row full-width full-height">
      <div class="column col full-height" style="min-width: 100px; max-width: 100px;">
        <q-list bordered separator>
          <q-item v-for="cat in categories" clickable v-ripple :key="cat">
            <q-item-section>
              {{ cat }}
            </q-item-section>
          </q-item>
        </q-list>
      </div>
      <div class="column col-grow">
        <div class="row">
          <div class="column col" style="min-width: 10px; max-width: 10px;">
            <q-separator vertical inset class="full-height"/>
          </div>
          <div class="column col-grow">
            <q-icon-picker
              ref="icons"
              v-model="name"
              :filter="filter"
              :icon-set="iconSet"
              :tag="tag"
              font-size="3em"
              tooltips
              :pagination.sync="pagination"
              @loaded="onLoaded"
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
      tag: '',
      pagination: {
        itemsPerPage: 0,
        page: 0,
        total: 0
      }
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

    categories () {
      // get all unique categories and return them in an array
      // also add 'all' in case some tags are empty
      debugger
      let cats = ['all']
      if (this.$refs.icons) {
        let tags = this.$refs.icons.getTags()
        cats.cat(tags)
      }
      return cats
    }
  }
}
</script>

<style>
</style>
