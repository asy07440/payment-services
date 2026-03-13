<template>
  <v-dialog
    v-model="dialog"
    max-width="90%"
    transition="fade-transition"
  >
    <div class="card">
      <div class="card-icon-wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FF9800" width="60px" height="60px">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
        </svg>
      </div>
      <div class="card-content">
        <span class="card-heading">{{ title }}</span>
        <span class="card-description">{{ message }}</span>
      </div>

      <div class="card-button-wrapper">
        <button class="card-button secondary" @click="onCancel">Cancel</button>
        <button class="card-button primary" @click="onConfirm">Submit</button>
      </div>
    </div>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";

const dialog = ref(false);
const title = ref("");
const message = ref("");
let resolvePromise: (value: boolean) => void;

function show(dialogTitle: string, dialogMessage: string): Promise<boolean> {
  title.value = dialogTitle;
  message.value = dialogMessage;
  dialog.value = true;
  return new Promise((resolve) => {
    resolvePromise = resolve;
  });
}

function onConfirm() {
  dialog.value = false;
  resolvePromise(true);
}

function onCancel() {
  dialog.value = false;
  resolvePromise(false);
}

defineExpose({ show });
</script>

<style scoped>
.card {
  width: 380px; /* Slightly wider to match image */
  height: fit-content;
  background: #fff;
  border-radius: 8px; /* Softer border-radius */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px; /* Reduced gap */
  padding: 30px; /* More padding */
  position: relative;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); /* Updated shadow for a softer look */
  margin: auto;
}

.card-icon-wrapper {
  margin-bottom: 10px;
}

.card-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px; /* Adjusted gap */
  text-align: center;
}

.card-heading {
  font-size: 20px; /* Slightly smaller to match image */
  font-weight: 600; /* Adjusted font weight */
  color: #333; /* Darker text */
  margin-bottom: 5px; /* Reduced margin */
}

.card-description {
  font-weight: 400;
  font-size: 14px;
  color: #666;
  line-height: 1.4; /* Improved readability */
}

.card-button-wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px; /* Increased gap between buttons */
  margin-top: 20px; /* More space above buttons */
}

.card-button {
  width: 100%; /* Make buttons full width in their container */
  max-width: 130px; /* Max width for buttons */
  height: 40px; /* Taller buttons */
  border-radius: 6px; /* Softer border-radius */
  border: 1px solid #e0e0e0; /* Add a subtle border */
  cursor: pointer;
  font-weight: 500; /* Adjusted font weight */
  font-size: 15px;
  transition: all 0.2s ease-in-out;
}

.primary {
  background-color: #3f51b5; /* Blue from the image */
  color: white;
  border-color: #3f51b5; /* Match border to background */
}

.primary:hover {
  background-color: #303f9f; /* Darker blue on hover */
  border-color: #303f9f;
}

.secondary {
  background-color: white;
  color: #555; /* Darker text for secondary */
  border-color: #cccccc; /* Lighter border for secondary */
}

.secondary:hover {
  background-color: #f0f0f0;
  border-color: #b3b3b3;
}

/* RESPONSIVE UNTUK HP */
@media (max-width: 600px) {
  .card {
    width: 95%;
    padding: 25px;
    gap: 10px;
  }

  .card-heading {
    font-size: 18px;
  }

  .card-description {
    font-size: 13px;
  }

  .card-button-wrapper {
    flex-direction: row; /* Keep buttons in a row for better mobile experience */
    gap: 10px;
  }

  .card-button {
    width: 50%; /* Adjust width for mobile */
    max-width: none; /* Remove max-width on mobile */
    height: 38px;
    font-size: 14px;
  }
}
</style>