<template>
    <label class="label-select">
      <i :class="icon"></i>
      <select class="select" :value="modelValue" @change="updateSelection">
        <option value="" disabled>{{ placeholder }}</option>
        <option v-for="option in options" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>
    </label>
  </template>
  
  <script>
  import "./styles.css";
  
  export default {
    name: "SelectComponent",
    props: {
      modelValue: {
        type: String,
        default: ""
      },
      placeholder: {
        type: String,
        default: "Selecione uma opção"
      },
      icon: {
        type: String,
        default: "fa-solid fa-list"
      },
      options: {
        type: Array,
        required: true
      }
    },
    methods: {
      updateSelection(event) {
        this.$emit("update:modelValue", event.target.value);
      }
    }
  }
  </script>  
