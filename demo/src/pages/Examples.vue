<template>
  <hero>
    <div class="q-markdown">
      <q-markdown>
::: warning
Icon sets contain hundreds, even thousands of icons. This page utilizes several examples and would grind to a halt if measures were not taken. For this reason, most of the examples below are using the pagination property.
:::
      </q-markdown>
      <example-title title="Basic" />
      <example-viewer title="Default" file="Default" :location-url="locationUrl" :js-paths="jsPaths" :css-paths="cssPaths" />
      <example-viewer title="Size" file="Size" :location-url="locationUrl" :js-paths="jsPaths" :css-paths="cssPaths" />
      <example-viewer title="Tooltips" file="Tooltips" :location-url="locationUrl" :js-paths="jsPaths" :css-paths="cssPaths" />
      <example-viewer title="Color" file="Color" :location-url="locationUrl" :js-paths="jsPaths" :css-paths="cssPaths" />
      <example-viewer title="Selected Color" file="SelectedColor" :location-url="locationUrl" :js-paths="jsPaths" :css-paths="cssPaths" />

      <example-title title="Advanced" />
      <example-viewer title="Filter" file="Filter2" :location-url="locationUrl" :js-paths="jsPaths" :css-paths="cssPaths">
        <q-markdown>
Type in the `QInput` below to activate the filter.
        </q-markdown>
      </example-viewer>
      <example-viewer title="Custom Icon Set" file="CustomIconSet" :location-url="locationUrl" :js-paths="jsPaths" :css-paths="cssPaths">
        <q-markdown>
The `icons` property allows you to use a customized set of icons.
        </q-markdown>
      </example-viewer>
      <example-viewer title="Using QInput" file="UsingQInput" :location-url="locationUrl" :js-paths="jsPaths" :css-paths="cssPaths" />
      <example-viewer title="Pagination" file="Pagination" :location-url="locationUrl" :js-paths="jsPaths" :css-paths="cssPaths">
        <q-markdown class="q-ma-md">
You can use the `pagination` property to control the number of icons displayed at one time. Don't forget to put the `.sync` modifier on the `pagination` property (ie: `:pagination.sync="pagination"`) so the data can flow both ways.

        </q-markdown>
      </example-viewer>
      <example-viewer title="Pagination Color" file="PaginationColor" :location-url="locationUrl" :js-paths="jsPaths" :css-paths="cssPaths">
        <q-markdown class="q-ma-md">
`QPagination` is used for the pagination. You can pass any of it's props to it via the `pagination-props` property which takes an object filled with properties.

Enter colors only from the Quasar color palette (ex: "orange-8")
        </q-markdown>

      </example-viewer>
      <example-viewer title="Using Icon Slot" file="UsingIconSlot" :location-url="locationUrl" :js-paths="jsPaths" :css-paths="cssPaths">
        <q-markdown class="q-ma-md">
Besides using the scopedSlot `icon`, which gives the `name` of the current icon, you can skin everything the way you wish.
        </q-markdown>
      </example-viewer>
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
import { slugify } from 'assets/page-utils'
import { version } from 'ui'

export default {
  name: 'Examples',

  components: {
    Hero,
    ExampleTitle
  },

  data () {
    return {
      tempToc: [],
      locationUrl: 'https://github.com/quasarframework/quasar-ui-qiconpicker/tree/dev/demo/src/examples/',
      jsPaths: [
        `https://cdn.jsdelivr.net/npm/@quasar/quasar-ui-qiconpicker@${version}/dist/index.umd.min.js`,
        `https://cdn.jsdelivr.net/npm/@quasar/quasar-ui-qiconpicker@${version}/dist/icon-set/eva-icons.umd.js`,
        `https://cdn.jsdelivr.net/npm/@quasar/quasar-ui-qiconpicker@${version}/dist/icon-set/fontawesome-v5.umd.js`,
        `https://cdn.jsdelivr.net/npm/@quasar/quasar-ui-qiconpicker@${version}/dist/icon-set/ionicons-v4.umd.js`,
        `https://cdn.jsdelivr.net/npm/@quasar/quasar-ui-qiconpicker@${version}/dist/icon-set/material-icons.umd.js`,
        `https://cdn.jsdelivr.net/npm/@quasar/quasar-ui-qiconpicker@${version}/dist/icon-set/material-icons-outlined.umd.js`,
        `https://cdn.jsdelivr.net/npm/@quasar/quasar-ui-qiconpicker@${version}/dist/icon-set/material-icons-round.umd.js`,
        `https://cdn.jsdelivr.net/npm/@quasar/quasar-ui-qiconpicker@${version}/dist/icon-set/material-icons-sharp.umd.js`,
        `https://cdn.jsdelivr.net/npm/@quasar/quasar-ui-qiconpicker@${version}/dist/icon-set/mdi-v4.umd.js`,
        `https://cdn.jsdelivr.net/npm/@quasar/quasar-ui-qiconpicker@${version}/dist/icon-set/themify.umd.js`

      ],
      cssPaths: [
        `https://cdn.jsdelivr.net/npm/@quasar/quasar-ui-qiconpicker@${version}/dist/index.min.css`,
        'https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.12.0/css/all.css',
        'https://fonts.googleapis.com/css?family=Roboto:300,400,500|Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp',
        'https://unpkg.com/ionicons@latest/dist/css/ionicons.min.css',
        'https://unpkg.com/@icon/themify-icons/themify-icons.css',
        'https://cdn.jsdelivr.net/gh/lykmapipo/themify-icons@0.1.2/css/themify-icons.css',
        'https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/4.7.95/css/materialdesignicons.min.css'
      ]
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
    addToToc (name, level = 1) {
      let n = name
      if (level > 1) {
        n = 'example-' + n
      }
      const slug = slugify(n)
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
