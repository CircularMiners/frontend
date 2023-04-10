<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const firstName = 'Korawit'
const { t } = useI18n()
</script>

<template>
  <Tester last-name="Rupanya" />
  <h3>Hello World {{ firstName }}</h3>
  <h5>{{ t('intro.desc') }}</h5>
  <v-btn color="primary" @click="() => $router.push('/')">
    Go to Hello
  </v-btn>
</template>
