<template>
  <div class="row justify-center q-ma-md">
    <div style="width: 700px">
      <div class="row q-col-gutter-sm q-mb-md">
        <div class="col-12 col-sm-7">
          <q-input v-model="search" label="Search custom metadata" outlined dense clearable />
        </div>
        <div class="col-12 col-sm-5">
          <q-select v-model="category" :options="categories" label="Category" outlined dense />
        </div>
      </div>

      <q-icon-picker
        v-model="value"
        v-model:model-pagination="pagination"
        :icons="filteredIcons"
        tooltips
        style="height: 190px"
      />

      <div class="q-mt-md">
        Selected: <code>{{ value || 'none' }}</code>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { QIconPicker } from '@quasar/quasar-ui-qiconpicker'
import {
  matArrowBack,
  matArrowForward,
  matDelete,
  matEdit,
  matImage,
  matMovie,
  matPause,
  matPhotoCamera,
  matPlayArrow,
  matSave,
} from '@quasar/extras/material-icons'

defineOptions({ name: 'CustomSearchMetadata' })

type CustomIcon = {
  name: string
  icon: string
  category: string
  keywords: string[]
}

const categories = ['All', 'Actions', 'Media', 'Navigation']
const category = ref('All')
const search = ref('')
const value = ref('')
const pagination = ref({
  itemsPerPage: 50,
  page: 1,
})

const icons: CustomIcon[] = [
  { name: 'edit-document', icon: matEdit, category: 'Actions', keywords: ['write', 'pencil'] },
  { name: 'save-document', icon: matSave, category: 'Actions', keywords: ['disk', 'persist'] },
  { name: 'delete-document', icon: matDelete, category: 'Actions', keywords: ['remove', 'trash'] },
  { name: 'play-media', icon: matPlayArrow, category: 'Media', keywords: ['start', 'video'] },
  { name: 'pause-media', icon: matPause, category: 'Media', keywords: ['stop', 'video'] },
  { name: 'movie-media', icon: matMovie, category: 'Media', keywords: ['film', 'video'] },
  { name: 'camera-media', icon: matPhotoCamera, category: 'Media', keywords: ['photo', 'picture'] },
  { name: 'image-media', icon: matImage, category: 'Media', keywords: ['photo', 'gallery'] },
  { name: 'back-navigation', icon: matArrowBack, category: 'Navigation', keywords: ['previous'] },
  { name: 'forward-navigation', icon: matArrowForward, category: 'Navigation', keywords: ['next'] },
]

const filteredIcons = computed(() => {
  const term = search.value.trim().toLowerCase()

  return icons.filter((icon) => {
    const matchesCategory = category.value === 'All' || icon.category === category.value
    const matchesSearch =
      term === '' ||
      icon.name.includes(term) ||
      icon.category.toLowerCase().includes(term) ||
      icon.keywords.some((keyword) => keyword.includes(term))

    return matchesCategory && matchesSearch
  })
})
</script>
