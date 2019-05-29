```
<template>
  <div>
    <div class="q-ma-md">
      <strong>Selected:</strong> {{ value }}
    </div>
    <q-icon-picker
      v-model="value"
      :icons="icons"
      style="height: 400px;"
    />
  </div>
</template>
```
