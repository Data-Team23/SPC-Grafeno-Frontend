<template>
  <div>
    <!-- Data filter components -->
    <!-- <div class="filter-container">
        <Select
          v-model="selectedColumn"
          :options="filterOptions"
          placeholder="Selecione o cluster"
        >
        </Select>
        <Input
          placeholder="Filtrar"
          icon="fa-solid fa-magnifying-glass"
          v-model="filterQuery"
        />
    </div> -->
    <table v-if="paginatedData">
      <caption>
        Dados importados
      </caption>
      <thead>
        <tr>
          <th
            v-for="(name, index) in columnNames"
            :key="index"
            @click="sortTable(displayColumns[index])"
            :class="getSortClass(displayColumns[index])"
          >
            {{ name }} 
            <span v-if="sortColumn === displayColumns[index]">
              {{ sortDirection === 'asc' ? '↑' : '↓' }}
            </span>
          </th>
          <th v-if="showEditColumn"></th>
          <th v-if="showDeleteColumn"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in paginatedData" :key="index">
          <td v-for="(name, colIndex) in displayColumns" :key="colIndex">
            {{ row[name] }}
          </td>
          <td
            v-if="showEditColumn"
            class="edit-icon"
            @click="() => emitEditRow(row)"
          >
            <i class="fa-regular fa-pen-to-square"></i>
          </td>
          <td
            v-if="showDeleteColumn"
            class="edit-icon"
            @click="() => emitDeleteRow(row)"
          >
            <i class="fa-solid fa-trash"></i>
          </td>
        </tr>
        <tr v-for="index in emptyRows" :key="'empty-' + index">
          <td
            v-for="col in displayColumns.length"
            :key="'empty-col-' + col"
          ></td>
          <td v-if="showEditColumn"></td>
          <td v-if="showDeleteColumn"></td>
        </tr>
      </tbody>
    </table>
    <div class="pagination-buttons">
      <button @click="previousPage" :disabled="currentPage === 1">
        Anterior
      </button>
      <span>Página {{ currentPage }} de {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">
        Próxima
      </button>
    </div>
  </div>
</template>

<script setup>
import Input from "@/components/Input/Input.vue";
import Select from "@/components/Select/Select.vue";
import "./styles.css";
import { ref, computed, defineEmits } from "vue";

const emit = defineEmits(["editRow", "deleteRow"]);

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
  itemsPerPage: {
    type: Number,
    default: 5,
  },
  columnNames: {
    type: Array,
    default: () => [],
  },
  showEditColumn: {
    type: Boolean,
    default: false,
  },
  showDeleteColumn: {
    type: Boolean,
    default: false,
  },
  displayColumns: {
    type: Array,
    default: () => [],
  },
  idPropName: {
    type: String,
    default: "id",
  },
});

const sortColumn = ref(null);
const sortDirection = ref("asc");
const filterQuery = ref("")
const selectedColumn = ref("");

const currentPage = ref(1);
const totalPages = computed(() =>
  Math.ceil(filteredData.value.length / props.itemsPerPage)
);

const paginatedData = computed(() => {
  const startIndex = (currentPage.value - 1) * props.itemsPerPage;
  const endIndex = currentPage.value * props.itemsPerPage;
  return sortedData.value.slice(startIndex, endIndex);
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

const filterOptions = computed(() =>
  props.columnNames.map((name, index) => ({
    label: name,
    value: props.displayColumns[index],
  }))
);

const filteredData = computed(() => {
  if (!filterQuery.value) return props.data;

  return props.data.filter((item) => {
    return String(item[selectedColumn.value])
      .toLowerCase()
      .includes(filterQuery.value.toLowerCase())
    }
  );
});

const sortedData = computed(() => {

  if (!sortColumn.value) return filteredData.value;

  return filteredData.value.slice().sort((a, b) => {
    let aValue = a[sortColumn.value]
    let bValue = b[sortColumn.value]
    
    if(typeof a[sortColumn.value] == "string") {
      aValue = a[sortColumn.value].toString().toLowerCase();
      bValue = b[sortColumn.value].toString().toLowerCase();
      if (aValue < bValue) return sortDirection.value === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection.value === "asc" ? 1 : -1;
    }

    if (aValue < bValue) return sortDirection.value === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection.value === "asc" ? 1 : -1;
    return 0;
  });
});

const sortTable = (column) => {
  if (sortColumn.value === column) {
    sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
  } else {
    sortColumn.value = column;
    sortDirection.value = "asc";
  }
};

const getSortClass = (column) => {
  return sortColumn.value === column ? "sorted-column" : "";
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
