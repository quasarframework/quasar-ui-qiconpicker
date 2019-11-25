<template>
  <hero>
    <div class="q-markdown">
      <q-markdown>
::: warning
Icon sets contain hundreds, even thousands of icons. This page utilizes several examples and would grind to a halt if measures were not taken. For this reason, most of the examples below are using the pagination property.
:::
      </q-markdown>
      <example-title title="Basic" />
      <example-card title="Default" name="Default" :tag-parts="getTagParts(require('!!raw-loader!../examples/Default.vue').default)" />
      <example-card title="Size" name="Size" :tag-parts="getTagParts(require('!!raw-loader!../examples/Size.vue').default)" />
      <example-card title="Tooltips" name="Tooltips" :tag-parts="getTagParts(require('!!raw-loader!../examples/Tooltips.vue').default)" />
      <example-card title="Color" name="Color" :tag-parts="getTagParts(require('!!raw-loader!../examples/Color.vue').default)" />
      <example-card title="Selected Color" name="SelectedColor" :tag-parts="getTagParts(require('!!raw-loader!../examples/SelectedColor.vue').default)" />

      <example-title title="Advanced" />
      <q-markdown>
Type in the `QInput` below to activate the filter.
      </q-markdown>
      <example-card title="Filter" name="Filter2" :tag-parts="getTagParts(require('!!raw-loader!../examples/Filter2.vue').default)" />
      <q-markdown>
The `icons` property allows you to use a customized set of icons.
      </q-markdown>
      <example-card title="Custom Icon Set" name="CustomIconSet" :tag-parts="getTagParts(require('!!raw-loader!../examples/CustomIconSet.vue').default)" />
      <example-card title="Using QInput" name="UsingQInput" :tag-parts="getTagParts(require('!!raw-loader!../examples/UsingQInput.vue').default)" />
      <example-card title="Pagination" name="Pagination" :tag-parts="getTagParts(require('!!raw-loader!../examples/Pagination.vue').default)" />
      <example-card title="Pagination Color" name="PaginationColor" :tag-parts="getTagParts(require('!!raw-loader!../examples/PaginationColor.vue').default)" />
      <example-card title="Using Icon Slot" name="UsingIconSlot" :tag-parts="getTagParts(require('!!raw-loader!../examples/UsingIconSlot.vue').default)" />
    </div>
    <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
      <q-btn
        fab
        icon="keyboard_arrow_up"
        :class="{ 'text-black bg-grey-4': $q.dark.isActive, 'text-white bg-primary': !$q.dark.isActive }"
      />
    </q-page-scroller>
  </hero>
</template>

<script>
import Hero from '../components/Hero'
import ExampleTitle from '../components/ExampleTitle'
import ExampleCard from '../components/ExampleCard'
import { slugify } from 'assets/page-utils'
import { getTagParts } from '@quasar/quasar-ui-qmarkdown'

export default {
  name: 'Examples',

  components: {
    Hero,
    ExampleTitle,
    ExampleCard
  },

  data () {
    return {
      tempToc: []
    }
  },

  mounted () {
    this.toc = []
    this.tempToc = []

    this.addToToc('Basic')
    this.addToToc('Default', 2)
    this.addToToc('Size', 2)
    this.addToToc('Tooltips', 2)
    this.addToToc('Color', 2)
    this.addToToc('Selected Color', 2)

    this.addToToc('Advanced')
    this.addToToc('Filter', 2)
    this.addToToc('Custom Icon Set', 2)
    this.addToToc('Using QInput', 2)
    this.addToToc('Pagination', 2)
    this.addToToc('Pagination Color', 2)
    this.addToToc('Using Icon Slot', 2)

    this.toc = this.tempToc
  },

  computed: {
    toc:
    {
      get () {
        return this.$store.state.common.toc
      },
      set (toc) {
        this.$store.commit('common/toc', toc)
      }
    }
  },

  methods: {
    getTagParts,
    addToToc (name, level = 1) {
      const slug = slugify(name)
      this.tempToc.push({
        children: [],
        id: slug,
        label: name,
        level: level
      })
    }
  }
}
</script>
