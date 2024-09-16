<template>
    <!-- change background color/image on theme change -->
    <div :class="[themeStore.showDarkTheme ? '': '']" 
        class="absolute inset-0 w-full bg-no-repeat bg-cover h-60 l"></div>
</template>
<script setup lang="ts">
import { useThemeStore } from '@/stores/theme';

const themeStore = useThemeStore();

</script>