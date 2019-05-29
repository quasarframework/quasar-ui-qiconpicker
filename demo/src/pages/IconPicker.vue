<template>
  <q-page>
    <div class="row q-pa-md q-gutter-sm">

      <icon-card
        :tooltips="true"
      />

  <q-card style="width: 100%; max-width: 350px;">
    <q-card-section>
      <div class="text-h6">QIconPicker Example using QInput</div>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <q-input v-model="value" label="Icon" clearable >
        <template v-slot:append>
          <q-icon name="extension" class="cursor-pointer">
            <q-popup-proxy v-model="showIconPicker">

              <q-icon-picker
                v-model="value"
                :filter="value"
                :tooltips="true"
                icon-set="material-icons"
                style="height: 300px; width: 300px;"
                v-close-popup
              />

            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </q-card-section>
    <q-card-section>
      <p>You can use the QInput as a bit of a filter, by typing part of an icon, then clicking on the icon button. The results will then be filtered to show only matching icons. Clear the text before selecting a new icon to see all of them.</p>
      <p>Note: This example is using Material Icons.</p>
    </q-card-section>
  </q-card>

      <!-- <icon-card
        name="eva-icons"
        title="Eva Icons"
        :tooltips="true"
      />

      <icon-card
        name="themify"
        title="Themify Icons"
      />

      <icon-card
        name="ionicons-v4"
        title="Ion Icons"
      />

      <icon-card
        name="mdi-v3"
        title="MDI Icons"
        color="blue-grey-9"
        background-color="orange-1"
      />

      <icon-card
        name="fontawesome-v5"
        title="Fontawesome Icons"
        :tooltips="true"
        color="primary"
        background-color="rgba(255,255,0,.05)"
      />

      <icon-card
        name="material-icons"
        title="Material Icons"
        :tooltips="true"
      /> -->

    </div>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'IconPicker',

  components: {
    'icon-card': () => import('../components/IconCard')
  },

  data () {
    return {
      value: 'extension',
      name: '',
      showIconPicker: false
    }
  }
}
</script>
