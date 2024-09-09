<template>
    <button @click="handleClick">{{ textButton }}</button>
</template>

<script>
import './styles.css'
export default {
    name: "Button",
    props: {
        textButton: {
            type: String,
            default: 'Enviar'
        },
        onClick: {
            type: Function,
            default: () => {}
        }
    },
    methods: {
        handleClick() {
            this.onClick();
        }
    }
}
</script>