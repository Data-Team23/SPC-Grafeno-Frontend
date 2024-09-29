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
        <tr v-for="(row, index) in paginatedData" :key="index">
          <td v-for="(name, colIndex) in displayColumns" :key="colIndex">{{ row[name] }}</td>
          <td v-if="showEditColumn" class="edit-icon" @click="editRow(row, idPropName)">
            <i class="fa-regular fa-pen-to-square"></i>
          </td>
          <td v-if="showDeleteColumn" class="edit-icon" @click="openConfirmationModal(row)">
            <i class="fa-solid fa-trash"></i>
          </td>
        </tr>
        <tr v-for="index in emptyRows" :key="'empty-'+index">
          <td v-for="col in columnNames.length + (showEditColumn || showDeleteColumn ? 1 : 0)" :key="'empty-col-'+col">
          </td>
        </tr>
      </tbody>
    </table>
    <ConfirmationModal
      v-if="showConfirmationModal"
      :showModal="showConfirmationModal"
      title="Confirmação de Deleção"
      message="Tem certeza que deseja excluir?"
      :action="deleteRow"
      @close="showConfirmationModal = false"
    />
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
import ConfirmationModal from "@/components/ConfirmationModal.vue";
import { userApi } from "@/services/api";
import { toast } from "vue3-toastify";
import './styles.css'

const router = useRouter();
const route = useRoute();
const showConfirmationModal = ref(false);
const currentPage = ref(1);
const currentRow = ref(null);
const totalPages = computed(() => Math.ceil(props.data.length / props.itemsPerPage));

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

const paginatedData = computed(() => {
  if (Array.isArray(props.data)) {
    const startIndex = (currentPage.value - 1) * props.itemsPerPage;
    const endIndex = currentPage.value * props.itemsPerPage;
    return props.data.slice(startIndex, endIndex);
  } else {  
    return [];
  }
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

const editRow = (row, idPropName) => {
  const idValue = row[idPropName];
  const currentPath = route.fullPath;
  const newPath = `${currentPath}/${idValue}`;
  router.push(newPath);
};


function openConfirmationModal(row) {
  showConfirmationModal.value = true;
  currentRow.value = row;
}

const deleteRow = async () => {
  if (!currentRow.value) return;

  try {
    const cpf = currentRow.value.cpf;
    console.log("cpf", cpf);
    await userApi.deleteUser(cpf);
    const index = props.data.indexOf(currentRow.value);
    if (index > -1) {
      props.data.splice(index, 1);
    }
    toast.success("Excluído com sucesso!!");
  } catch (error) {
    toast.error("Erro ao excluir.");
  }

  showConfirmationModal.value = false;
};
const emptyRows = computed(() => {
  const remainingRows = props.itemsPerPage - paginatedData.value.length;
  return remainingRows > 0 ? remainingRows : 0;
});

watch(currentPage, () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
</script>
