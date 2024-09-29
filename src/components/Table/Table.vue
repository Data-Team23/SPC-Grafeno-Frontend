<template>
  <div>
    <table v-if="paginatedData">
      <caption>Dados importados</caption>
      <thead>
        <tr v-if="columnNames.length <= 0">
          <th v-for="(value, index) in paginatedData[0]" :key="index">{{ index }}</th>
          <th v-if="showEditColumn"></th>
          <th v-if="showDeleteColumn"></th>
        </tr>
        <tr v-if="columnNames.length > 0">
          <th v-for="(name, index) in columnNames" :key="index">{{ name }}</th>
          <th v-if="showEditColumn"></th>
          <th v-if="showDeleteColumn"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in paginatedData" :key="index">
          <td v-for="(name, colIndex) in displayColumns" :key="colIndex">{{ row[name] }}</td>
          <td v-if="showEditColumn" class="edit-icon" @click="() => emitEditRow(row)">
            <i class="fa-regular fa-pen-to-square"></i>
          </td>
          <td v-if="showDeleteColumn" class="edit-icon" @click="() => emitDeleteRow(row)">
            <i class="fa-solid fa-trash"></i>
          </td>
        </tr>
        <tr v-for="index in emptyRows" :key="'empty-'+index">
          <td v-for="col in displayColumns.length" :key="'empty-col-'+col"></td>
          <td v-if="showEditColumn"></td>
          <td v-if="showDeleteColumn"></td>
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
import './styles.css';
import { ref, computed, defineEmits } from 'vue';

const emit = defineEmits(['editRow', 'deleteRow']);

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
const totalPages = computed(() => Math.ceil(props.data.length / props.itemsPerPage));

const paginatedData = computed(() => {
  const startIndex = (currentPage.value - 1) * props.itemsPerPage;
  const endIndex = currentPage.value * props.itemsPerPage;
  return props.data.slice(startIndex, endIndex);
});

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

const emptyRows = computed(() => {
  const remainingRows = props.itemsPerPage - paginatedData.value.length;
  return remainingRows > 0 ? remainingRows : 0;
});

const emitEditRow = (row) => {
  emit("editRow", row);
};

const emitDeleteRow = (row) => {
  emit("deleteRow", row);
};
</script>
