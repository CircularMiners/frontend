<script setup lang="ts">
const props = defineProps<{
  lastName: string
}>()
</script>

<template>
  <h3>Hello World {{ props.lastName }}</h3>
</template>
