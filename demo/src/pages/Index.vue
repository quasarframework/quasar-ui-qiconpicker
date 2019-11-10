<template>
  <hero>
    <q-markdown :src="markdown" toc @data="onToc" />
    <component-api
      title="QIconPicker API"
      :json="json"
    />
    <q-markdown>
# Donate
If you appreciate the work that went into this, please consider donating to [Quasar](https://donate.quasar.dev) or [Jeff](https://github.com/sponsors/hawkeye64).

---
This page created with [QMarkdown](https://quasarframework.github.io/app-extension-qmarkdown), another great Quasar App Extension.
    </q-markdown>
    <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
      <q-btn fab icon="keyboard_arrow_up" color="primary" />
    </q-page-scroller>
  </hero>
</template>

<script>
import Hero from '../components/Hero'
import markdown from '../markdown/iconpicker.md'
import json from 'api'

export default {
  name: 'PageIndex',

  components: {
    Hero
  },

  data () {
    return {
      markdown: markdown,
      json: json
    }
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
    onToc (toc) {
      // add the manual ones
      toc.push({ id: 'QIconPicker-API', label: 'QIconPicker API', level: 1, children: Array(0) })
      toc.push({ id: 'Donate', label: 'Donate', level: 1, children: Array(0) })

      this.toc = toc
    }
  }
}
</script>
