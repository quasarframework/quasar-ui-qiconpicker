<template>
  <q-page class="flex flex-center">
     <custom-navigation></custom-navigation>
    <custom-icon-set></custom-icon-set>
     <filter2></filter2>
     <pagination></pagination>
     <using-icon-slot></using-icon-slot>
     <using-q-input></using-q-input>
     <tooltips></tooltips>
     <size></size>
     <selected-color></selected-color>
     <pagination-color></pagination-color>
    <!-- <color></color> -->
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import CustomNavigation from 'components/CustomNavigation'
import CustomIconSet from 'components/CustomIconSet'
import Filter2 from 'components/Filter2'
import Pagination from 'components/Pagination'
import UsingIconSlot from 'components/UsingIconSlot'
import UsingQInput from 'components/UsingQInput'
import Tooltips from 'components/Tooltips'
import Size from 'components/Size'
import SelectedColor from 'components/SelectedColor'
import PaginationColor from 'components/PaginationColor'
// import Color from "components/Color";

export default defineComponent({
  name: 'PageIndex',
  components: {
    CustomNavigation,
    CustomIconSet,
    Filter2,
    Pagination,
    UsingIconSlot,
    UsingQInput,
    Tooltips,
    Size,
    SelectedColor,
    PaginationColor
    // Color
  }
})
</script>
