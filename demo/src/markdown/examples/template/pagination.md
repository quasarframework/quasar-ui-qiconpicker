```
<template>
  <div>
    <div class="row justify-center q-ma-md">
      <q-select v-model="pagination.itemsPerPage" :options="options" label="Items Per Page" class="q-ma-sm col-4" />
    </div>
    <q-separator />
    <q-icon-picker
      v-model="value"
      icon-set="material-icons"
      :pagination.sync="pagination"
      style="height: 220px;"
    />
  </div>
</template>
```
