<template>
  <v-layout>
    <v-app>
      <!-- Global Notification & Loading -->
      <AppNotification />
      <LoadingApp />

      <!-- Header khusus perusahaan -->
      <PerusahaanHeader />

      <!-- Konten utama -->
      <v-main>
        <v-container>
          <slot />
        </v-container>
      </v-main>
    </v-app>
  </v-layout>
</template>

<script setup>
/**
 * Tidak perlu import AppNotification & LoadingApp
 * karena Nuxt akan auto-register jika ada dalam components/
 * Pastikan kamu punya komponen:
 *  - components/PerusahaanHeader.vue
 */
</script>
