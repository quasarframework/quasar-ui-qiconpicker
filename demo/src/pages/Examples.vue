<template>
  <hero>
    <div class="q-markdown">
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
    </div>
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

<style lang="stylus">
.example-page
  padding: 16px 46px;
  font-weight: 300;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
</style>
