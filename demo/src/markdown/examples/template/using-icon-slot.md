```
<template>
    <q-icon-picker
      v-model="value"
      icon-set="material-icons"
      :pagination.sync="pagination"
      style="height: 400px;"
    >
      <template #icon="name">
        <q-btn
          :label="name"
          :icon="name"
          no-caps
          class="q-ma-xs"
        />
      </template>
    </q-icon-picker>
</template>
```
