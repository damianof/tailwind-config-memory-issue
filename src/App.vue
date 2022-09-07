<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <h1>Tailwind CSS potential Node memory leak from config safeList > pattern</h1>
  <div class="p-4 my-4 border-2 border-orange-400 rounded-lg bg-slate-300 hover:bg-slate-500 hover:text-white">Test Tailwind classes</div>
  <div class="flex">
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>
