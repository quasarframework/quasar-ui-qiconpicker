```
<template>
  <div>
    <div class="q-ma-md">
      <strong>Selected:</strong> {{ value }}
    </div>
    <q-icon-picker
      v-model="value"
      :icons="icons"
      :pagination.sync="pagination"
      style="height: 100px;"
    />
  </div>
</template>
```
