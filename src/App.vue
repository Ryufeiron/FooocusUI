<template>
  <el-config-provider>
    <HomeView />
  </el-config-provider>
</template>

<script setup lang="ts">
import HomeView from './views/HomeView.vue'
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100vw;
}

#app {
  height: 100%;
  width: 100%;
}
</style>
