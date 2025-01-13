<template>
  <!-- <NuxtRouteAnnouncer />
  <NuxtWelcome /> -->
  <UApp>
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage :transition="{
        name: 'page',
        mode: 'out-in',
      }" />
    </NuxtLayout>
  </UApp>
</template>
