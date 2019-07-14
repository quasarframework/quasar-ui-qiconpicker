<template>
  <q-layout view="HHh LpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title v-if="$q.screen.width > 500">
          QIconPicker
          <q-tooltip v-if="$q.screen.width < 1077">
            QIconPicker
          </q-tooltip>
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-style="background-color: #f8f8ff"
    >
      <q-list>
        <q-item-label header>
          <q-icon name="fas fa-link" size="1.5em" class="q-mr-md" /><span style="font-size: 1.5em">Essential Links</span></q-item-label>
      </q-list>
      <essential-links />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import { scroll } from 'quasar'

export default {
  name: 'MyLayout',
  components: {
    'essential-links': () => import('../components/EssentialLinks')
  },
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  mounted () {
    // code to handle anchor link on refresh/new page, etc
    if (location.hash !== '') {
      const id = location.hash.substring(1, location.hash.length)
      setTimeout(() => {
        this.scrollTo(id)
      }, 200)
    }
  },
  computed: {
    ...mapGetters({
      toc: 'common/toc'
    })
  },
  methods: {
    scrollTo (id) {
      this.activeToc = id
      const el = document.getElementById(id)

      if (el) {
        this.scrollPage(el)
      }
    },
    scrollPage (el) {
      const offset = el.offsetTop - 50
      scroll.setScrollPosition(window, offset, 500)
    }
  }
}
</script>
