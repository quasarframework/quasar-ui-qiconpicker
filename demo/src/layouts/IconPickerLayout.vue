<template>
  <q-layout view="HHh Lpr lFf">

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

        <q-icon name="bolt" class="q-ml-md" size="1.5rem"></q-icon>

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
      content-class="white"
      :width="350"
    >
      <div class="col-12">
        <q-expansion-item
          expand-separator
          default-opened
          group="somegroup"
          icon="fas fa-cogs"
          label="Playground"
          caption="Play with properties"
        >
          <playground></playground>
        </q-expansion-item>

        <q-expansion-item
          expand-separator
          group="somegroup"
          icon="fas fa-link"
          label="Essential Links"
        >
        <essential-links />
        </q-expansion-item>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'IconPickerLayout',
  components: {
    'playground': () => import('../components/Playground'),
    'essential-links': () => import('../components/EssentialLinks')
  },
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    openURL
  }
}
</script>

<style>
</style>
