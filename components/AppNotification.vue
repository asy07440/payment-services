<template>
  <v-snackbar
    v-model="notificationStore.snackbar"
    :color="getColor(notificationStore.type)"
    :timeout="3000"
    location="top right"
    rounded="lg"
    :elevation="1"
    transition="slide-y-transition"
    class="notification-apple"
  >
    <div class="d-flex align-center">
      <v-icon
        v-if="notificationStore.type === 'success'"
        size="24"
        class="ms-2 me-3"
        icon=" mdi-check-circle"
      />

      <v-icon
        v-else-if="notificationStore.type === 'error'"
        size="24"
        class="ms-2 me-3"
        icon="mdi-close-circle-outline"
      />

      <v-icon
        v-else-if="notificationStore.type === 'info'"
        size="24"
        class="ms-2 me-3"
        icon="mdi-information-outline"
      />

      <div class="text-body-1 font-weight-bold text-white mr-5">
        {{ notificationStore.message }}
      </div>
    </div>
  </v-snackbar>
</template>

<script setup lang="ts">
import { useNotificationStore } from "~/stores/notificationStore";

const notificationStore = useNotificationStore();
function getColor(type: string): string {
  switch (type) {
    case "success":
      return "rgba(51, 198, 93, 0.9)";
    case "error":
      return "rgba(255, 59, 48, 0.9)";
    case "info":
      return "rgba(10, 132, 255, 0.9)";
    default:
      return "rgba(90, 90, 90, 0.9)";
  }
}
</script>

<style scoped>
.notification-apple .v-snackbar__content {
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
</style>
