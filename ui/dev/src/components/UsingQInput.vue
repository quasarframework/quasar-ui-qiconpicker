<template>
  <div class="q-pa-lg flex flex-center">
    <div style="width: 700px;">
      <q-input v-model="data.value" label="Icon" clearable>
        <template v-slot:append>
          <q-icon name="extension" class="cursor-pointer">
            <q-popup-proxy v-model="data.showIconPicker">

              <q-icon-picker
                v-model="data.value"
                :filter="data.value"
                icon-set="material-icons"
                tooltips
                :pagination="data.pagination"
                @update:pagination="data.pagination = $event"
                style="height: 300px; width: 300px; background-color: white;"
              ></q-icon-picker>

            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>
  </div>
</template>

<script>
import {defineComponent, ref, watch} from 'vue';

export default defineComponent({
  setup() {
    const data = ref({
      value: '',
      showIconPicker: false,
      pagination: {
        itemsPerPage: 35,
        page: 0
      }
    })

    watch(()=> data.value.value, () =>  {
      data.value.showIconPicker = false
    })

    return {
      data
    }


  }
})
</script>
