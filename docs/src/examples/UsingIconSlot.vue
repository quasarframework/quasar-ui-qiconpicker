<template>
  <div class="q-pa-lg flex flex-center">
    <div style="width: 700px;">
      <div class="wrapper">
        <q-icon-picker
          v-model="data.value"
          v-model:model-pagination="data.pagination"
          icon-set="material-icons"
          :pagination-props="{
            'max-pages': 5,
            'input': true,
            'color': 'yellow-10',
            'input-class': 'text-yellow-10'
          }"
          class="container"
          style="height: 400px;"
        >
          <template #icon="name">
            <q-btn
              :label="name"
              :icon="name"
              no-caps
              no-wrap
              align="left"
              style="width: 32%"
              class="q-ma-xs ellipsis col-4 icon-item"
            />
          </template>
        </q-icon-picker>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { QIconPicker } from '@quasar/quasar-ui-qiconpicker/src/index'
import '@quasar/quasar-ui-qiconpicker/src/index.sass'

export default defineComponent({
  components: {
    QIconPicker
  },
  setup() {
    const data = ref( {
      value: '',
      pagination: {
        itemsPerPage: 24,
        page: 0
      }
    })

    return {
      data
    }

  }
})
</script>
<style lang="sass">
.wrapper
  background: linear-gradient(#3D4246,#24282B)
  border-radius: 4px
  border-top: 1px solid #53575C
  border-left: 1px solid #53575C
  box-shadow: 1px 1px #17191C,0 0 10px #323338
  padding: 8px
  padding-bottom: 12px

.container
  border: 1px solid #0F1014
  border-radius: 3px
  background: #0F1014

.icon-item
  display: inline-flex
  float: left
  height: 36px
  max-height: 36px
  color: #D9D9D9
  text-align: center
  text-shadow: 0 1px #0F1014
  display: table
  background: linear-gradient(#44494F,#2F3237)
  border-radius: 3px
  border-right: 1px solid #0F1014
  border-bottom: 1px solid #0F1014
  border-top: 1px solid #53575C
  border-left: 1px solid #53575C
  box-shadow: 1px 1px #17191C
  cursor: pointer
</style>

