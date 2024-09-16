<script setup lang="ts">
import { useDeviceStore } from '@/stores/device';
import {TopBar, HeroBackground} from '@/components/atoms';

import {TodoInput, TodoList, TodoFilters} from '@/components/atoms/todo'

const deviceStore = useDeviceStore();
</script>
<template>
  
  <main class="flex justify-center w-full">
    <hero-background />
    <div class="flex flex-col w-full max-w-3xl gap-10 px-6 pt-10">
      <top-bar />
      <section class="relative flex flex-col items-center justify-center gap-6 pb-10">
        <todo-input />
        <todo-list />
        <todo-filters v-if="deviceStore.mobile" />
        
      </section>
    </div>
  </main>
</template>

<style scoped >

</style>
