<template>
  <main id="viewport">
    <SidePanel id="side-panel" />
    <RouterView id="right-view" />
  </main>
</template>

<script setup>
import { RouterView } from "vue-router";
import SidePanel from "./components/SidePanel.vue";
</script>

<style scoped>
#viewport {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
}

@media only screen and (min-width: 821px) {
  #viewport {
    flex-direction: row;
    max-width: 1440px;
  }
}
</style>
