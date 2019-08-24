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
    <q-icon-picker
      v-model="name"
      :filter="filter"
      :icon-set="iconSet"
      font-size="3em"
      tooltips
      :pagination.sync="pagination"
      style="height: calc(100vh - 140px)"
    />
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
    }
  }
}
</script>

<style>
</style>
