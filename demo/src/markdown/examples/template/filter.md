```
<template>
  <div>
    <q-input v-model="filter" label="Filter" outlined clearable class="q-ma-md" />
    <q-icon-picker
      v-model="value"
      icon-set="material-icons"
      :filter="filter"
      :pagination.sync="pagination"
      style="height: 220px;"
    />
  </div>
</template>
```
