<template>
    <div>
      <table v-if="paginatedData">
        <caption>Dados importados</caption>
        <thead>
          <tr v-if="columnNames.length <= 0">
            <th v-for="(value, index) in paginatedData[0]" :key="index">{{ index }}</th>
            <th v-if="showEditColumn"></th>
          </tr>
          <tr v-if="columnNames.length > 0">
            <th v-for="(name, index) in columnNames" :key="index">{{ name }}</th>
            <th v-if="showEditColumn"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="displayColumns.length <= 0" v-for="(row, index) in paginatedData" :key="index">
            <td v-for="(value, key) in row" :key="key">{{ value }}</td>
          </tr>
          <tr v-if="displayColumns.length > 0" v-for="(row, index) in paginatedData" :key="index">
            <td v-for="(name, colIndex) in displayColumns" :key="colIndex">{{ row[name] }}</td>
            <td v-if="showEditColumn" class="edit-icon" @click="editRow(row, idPropName)">
              <i class="fa-regular fa-pen-to-square"></i>
            </td>
            <td v-if="showDeleteColumn" class="edit-icon" @click="deleteRow()">
              <i class="fa-solid fa-trash"></i>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="pagination-buttons">
        <button @click="previousPage" :disabled="currentPage === 1">Anterior</button>
        <span>Página {{ currentPage }} de {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">Próxima</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, computed } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import './styles.css'
  
  const router = useRouter();
  const route = useRoute();
  
  const props = defineProps({
    data: {
      type: Array,
      required: true
    },
    itemsPerPage: {
      type: Number,
      default: 8
    },
    columnNames: {
      type: Array,
      default: () => []
    },
    showEditColumn: {
      type: Boolean,
      default: false
    },
    showDeleteColumn: {
      type: Boolean,
      default: false
    },
    displayColumns: {
      type: Array,
      default: () => []
    },
    idPropName: {
      type: String,
      default: 'id'
    }
  });
  
  const currentPage = ref(1);
  
  const paginatedData = computed(() => {
    if (Array.isArray(props.data)) {
      const startIndex = (currentPage.value - 1) * props.itemsPerPage;
      const endIndex = currentPage.value * props.itemsPerPage;
      return props.data.slice(startIndex, endIndex);
    } else {  
      return [];
    }
  });
  
  const totalPages = computed(() => Math.ceil(props.data.length / props.itemsPerPage));
  
  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++;
    }
  };
  
  const previousPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--;
    }
  };
  
  const editRow = (row, idPropName) => {
    const idValue = row[idPropName]
    const currentPath = route.fullPath;
    const newPath = `${currentPath}/${idValue}`;
    router.push(newPath);
  };

  const deleteRow = () => {
    console.log("DELETE FUCTION")
  }
  
  watch(currentPage, () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  
  </script>