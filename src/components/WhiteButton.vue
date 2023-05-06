<script setup lang="ts">
const props = defineProps <{
  buttonName: string
}>()
</script>

<template>
  <v-btn
    color="cyan-darken-2"
    class="ma-2"
  >
    {{ props.buttonName }}
  </v-btn>
</template>
