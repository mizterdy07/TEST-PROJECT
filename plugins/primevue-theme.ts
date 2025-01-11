import { defineNuxtPlugin } from '#app';
import { useColorMode } from '#imports';
import { watch, onMounted } from 'vue';
export default defineNuxtPlugin((nuxtApp) => {
 const colorMode = useColorMode(); // Call useColorMode directly

  // Set the initial class based on the color mode
  onMounted(() => {
    const htmlElement = document.documentElement;
    htmlElement.classList.add(colorMode.preference); // Add initial class
  });

  // Watch for changes in color mode
  watch(()=>colorMode.preference, (newMode) => {
    const htmlElement = document.documentElement;
    htmlElement.classList.toggle('dark', newMode === 'dark');
    htmlElement.classList.toggle('light', newMode === 'light');
  });
});
