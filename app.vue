<template>
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <UApp>
      <NuxtPage :transition="{
        name: 'page',
        mode: 'out-in',
      }" />
    </UApp>
  </NuxtLayout>
</template>
