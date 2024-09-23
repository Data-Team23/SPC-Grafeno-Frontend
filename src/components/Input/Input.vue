<template>
    <label class="label">
        <i :class="icon"></i>
        <input class="input" :type="type" :value="maskedValue" :placeholder="placeholder"
            @input="updateInput">
    </label>
</template>

<script>
import "./styles.css";

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
        },
        mask: {
            type: String,
            default: ""
        }
    },
    computed: {
        maskedValue() {
            return this.applyMask(this.modelValue, this.mask);
        }
    },
    methods: {
        updateInput(event) {
            let value = event.target.value;
            if (this.mask) {
                value = this.removeMask(value);
            }
            this.$emit("update:modelValue", value);
        },
        applyMask(value, mask) {
            if (!mask) return value;
            const cleanedValue = value.replace(/\D/g, '');

            if (mask === "(##) #####-####") {
                return cleanedValue.replace(/(\d{2})(\d)/, '($1) $2')
                                   .replace(/(\d{5})(\d)/, '$1-$2');
            } else if (mask === "(##) ####-####") {
                return cleanedValue.replace(/(\d{2})(\d)/, '($1) $2')
                                   .replace(/(\d{4})(\d)/, '$1-$2');
            } else if (mask === "###.###.###-##") {
                return cleanedValue.replace(/(\d{3})(\d)/, '$1.$2')
                                   .replace(/(\d{3})(\d)/, '$1.$2')
                                   .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
            }
            return value;
        },
        removeMask(value) {
            return value.replace(/\D/g, '');
        }
    }
}
</script>
