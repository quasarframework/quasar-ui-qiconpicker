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

        <q-toolbar-title>
          QIconPicker <span class="text-subtitle2">v{{ version }}</span>
        </q-toolbar-title>

        <q-space />

        <q-btn flat round @click="$q.dark.toggle()" :icon="$q.dark.isActive ? 'brightness_2' : 'brightness_5'" />
        <div v-if="$q.screen.width > 500">Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
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
          <q-separator />
          <playground></playground>
        </q-expansion-item>

        <q-expansion-item
          expand-separator
          group="somegroup"
          icon="fas fa-link"
          label="Essential Links"
        >
        <q-separator />
        <essential-links />
        </q-expansion-item>
        <q-separator />
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { version } from 'ui'

export default {
  name: 'IconPickerLayout',
  components: {
    playground: () => import('../components/Playground'),
    'essential-links': () => import('../components/EssentialLinks')
  },
  data () {
    return {
      version,
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  }
}
</script>

<style>
</style>
