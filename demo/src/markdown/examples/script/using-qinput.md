```
<script>
export default {
  data () {
    return {
      value: '',
      showIconPicker: false,
      pagination: {
        itemsPerPage: 35,
        page: 0
      }
    }
  },
  watch: {
    value () {
      this.showIconPicker = false
    }
  }
}
</script>
```
