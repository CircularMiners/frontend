<script setup lang="ts">
const props = defineProps <{
  buttonName: string
}>()
</script>

<template>
  <v-btn
    outlined
    color="1c658c"
    class="ma-2"
  >
    {{ props.buttonName }}
  </v-btn>
</template>
