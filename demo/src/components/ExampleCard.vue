<template>
  <section :id="slugifiedTitle" class="q-pa-md">
    <q-card flat bordered class="no-shadow">
      <q-toolbar>
        <q-ribbon
          position="left"
          color="rgba(0,0,0,.58)"
          background-color="#c0c0c0"
          leaf-color="#a0a0a0"
          leaf-position="bottom"
          decoration="rounded-out"
          class="fit"
        >
          <q-toolbar-title
          class="example-title"
          style="padding: 5px 20px;"
          @click="copyHeading(slugifiedTitle)">{{ title }}</q-toolbar-title>
        </q-ribbon>
      </q-toolbar>
      <q-separator />
      <component v-bind:is="name" />
    </q-card>
  </section>
</template>

<script>
import { copyHeading, slugify } from 'assets/page-utils'

export default {
  name: 'ExampleCard',

  components: {
    Default: () => import('./examples/Default'),
    Size: () => import('./examples/Size'),
    Tooltips: () => import('./examples/Tooltips'),
    Color: () => import('./examples/Color'),
    SelectedColor: () => import('./examples/SelectedColor'),
    Filter2: () => import('./examples/Filter'),
    CustomIconSet: () => import('./examples/CustomIconSet'),
    UsingQInput: () => import('./examples/UsingQInput'),
    UsingIconSlot: () => import('./examples/UsingIconSlot'),
    Pagination: () => import('./examples/Pagination'),
    PaginationColor: () => import('./examples/PaginationColor')
  },

  props: {
    title: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },

  computed: {
    slugifiedTitle () {
      return slugify(this.title)
    }
  },

  methods: {
    copyHeading
  }
}
</script>
