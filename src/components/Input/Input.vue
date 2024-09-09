<template>
    <label class="label">
        <i :class="icon"></i>
        <input class="input" :type="type" :value="modelValue" :placeholder="placeholder"
            @input="updateInput">
    </label>
</template>

<script>
import "./styles.css"
export default {
    name: "Input",
    props: {
        label: {
            type: String,
            default: ""
        },
        type: {
            type: String,
            default: "text"
        },
        modelValue: {
            type: [String, Object, Number],
            default: ""
        },
        placeholder: {
            type: String,
            default: "Informe o placeholder"
        },
        icon: {
            type: String,
            default: "fa-solid fa-envelope"
        }
    },
    methods: {
        updateInput(event) {
            this.$emit("update:modelValue", event.target.value)
        }
    }
}
</script>