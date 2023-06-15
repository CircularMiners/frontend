<script setup lang="ts">

</script>

<template>
  <div class="home">
    <h1>Welcome to the home page!</h1>
  </div>
  <img src="../assets/MineMeme.png" alt="Meme" class="center">
</template>

  <style scoped>
  .home {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
.center{
  position: absolute;
  top:50%;
  left: 50%;
  transform: translate(-50% , -50%)
}
  </style>

<route lang="yaml">
meta:
  requiresAuth: true
</route>
