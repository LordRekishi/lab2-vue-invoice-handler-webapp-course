<template>
  <main id="accordion">
    <button @click="isOpen = !isOpen"><slot name="title"></slot></button>

    <section id="inside">
      <slot name="content" v-if="isOpen"></slot>
    </section>
  </main>
</template>

<script setup>
import { ref } from "vue";

const isOpen = ref(false);
</script>

<style scoped>
#accordion {
  width: 100%;
}

#accordion button {
  width: 100%;
}

#inside {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
