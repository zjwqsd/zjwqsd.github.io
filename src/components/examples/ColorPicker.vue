<script setup>
import { ref } from "vue";

const count = ref(0);
</script>

<template>
    <h1>Color Picker</h1>
    <button @click="count++">Count: {{ count }}</button>
  
</template>
