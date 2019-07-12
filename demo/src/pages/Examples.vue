<template>
  <hero>
    <div class="q-markdown">

<div class="q-markdown--note q-markdown--note--danger"><p class="q-markdown--note-title">WARNING</p>
<p>Icon sets contain hundreds, even thousands of icons. This page utilizes several examples and would grind to a halt if measures were not taken. For this reason, most of the examples below are using the pagination property.</p>
</div>

      <example-title title="Basic" />
      <example-card title="Default" name="Default" />
      <example-card title="Size" name="Size" />
      <example-card title="Tooltips" name="Tooltips" />
      <example-card title="Color" name="Color" />
      <example-card title="Selected Color" name="SelectedColor" />

      <example-title title="Advanced" />
      <p>Type in the <code class="q-markdown--token">QInput</code> below to activate the filter.</p>
      <example-card title="Filter" name="Filter2" />
      <p>The <code class="q-markdown--token">icons</code> property allows you to use a pre-defined set of icons.</p>
      <example-card title="Custom Icon Set" name="CustomIconSet" />
      <example-card title="Using QInput" name="UsingQInput" />
      <example-card title="Using Icon Slot" name="UsingIconSlot" />
      <example-card title="Pagination" name="Pagination" />
      <example-card title="Pagination Color" name="PaginationColor" />
    </div>
    <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
      <q-btn fab icon="keyboard_arrow_up" color="primary" />
    </q-page-scroller>
  </hero>
</template>

<script>
import Hero from '../components/Hero'
import ExampleTitle from '../components/ExampleTitle'
import ExampleCard from '../components/ExampleCard'
import { slugify } from 'assets/page-utils'

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
    this.addToToc('Using Icon Slot', 2)
    this.addToToc('Pagination', 2)
    this.addToToc('Pagination Color', 2)

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
