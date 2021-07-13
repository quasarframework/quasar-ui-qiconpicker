<template>
  <div class="row justify-left q-ma-sm" style="width: 100%;">
    <q-toggle
      class="col-12"
      v-model="tooltips"
      label="Tooltips"
    ></q-toggle>
    <q-toggle
      class="col-12"
      v-model="dense"
      label="Dense"
    ></q-toggle>
    <q-toggle
      class="col-12"
      v-model="noFooter"
      label="No Footer"
    ></q-toggle>
  </div>
</template>

<script>
export default {
  name: 'Playground',
  data () {
    return {}
  },

  computed: {
    tooltips: {
      get () {
        return this.$store.state.iconpicker.tooltips
      },
      set (b) {
        this.$store.commit('iconpicker/tooltips', b)
      }
    },
    dense: {
      get () {
        return this.$store.state.iconpicker.dense
      },
      set (b) {
        this.$store.commit('iconpicker/dense', b)
      }
    },
    noFooter: {
      get () {
        return this.$store.state.iconpicker.noFooter
      },
      set (b) {
        this.$store.commit('iconpicker/noFooter', b)
      }
    }
  }
}
</script>

<style>
</style>
