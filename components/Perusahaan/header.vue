<script setup lang="ts">
import _ from "lodash";
import { ref, computed } from "vue";
import { useUserStore } from "../../stores/userStore";
import type { ConfirmationDialog } from "#components";
import { useLogout } from "../../composables/useLogout";

const confirmationDialog = ref<InstanceType<typeof ConfirmationDialog> | null>(
  null
);

const userstore = useUserStore();
const drawer = ref(true);

const displayname = computed(() => userstore.getDisplayName);
const role = computed(() => userstore.getRole);
const idPerusahaan = computed(() => userstore.getIdPerusahaan);

const { logout } = useLogout();
</script>

<template>
  <ConfirmationDialog ref="confirmationDialog" />

  <!-- APP BAR -->
  <v-app-bar
    flat
    color="rgba(255, 255, 255, 0.9)"
    class="border-b"
    height="70"
    style="backdrop-filter: blur(10px)"
  >
    <template #prepend>
      <!-- Logo Perusahaan -->
      <img
        src="https://imagedelivery.net/_tN3dTar-XzU6X9_PBgTbA/ce75ea4b-2d01-4d6c-d59f-4ba28e301b00/heromobile"
        height="50"
        class="ma-14"
        alt="Company Logo"
      />

      <!-- Toggle Drawer -->
      <v-app-bar-nav-icon flat color="#0f766e" @click="drawer = !drawer">
        <v-icon>
          {{ drawer ? "mdi-menu-open" : "mdi-menu" }}
        </v-icon>
      </v-app-bar-nav-icon>
    </template>

    <template #append>
      <v-btn icon class="mr-3 on-hover-effect" color="grey-darken-1">
        <v-icon>mdi-bell-outline</v-icon>
      </v-btn>

      <v-divider vertical class="mr-5" />

      <!-- Profile Avatar + Name -->
      <v-menu rounded="xl" transition="slide-y-transition" :offset="[0, 10]">
        <template #activator="{ props }">
          <div
            class="d-flex align-center mr-4"
            v-bind="props"
            style="cursor: pointer"
          >
            <v-avatar color="#0f766e" size="45" rounded="lg" class="mr-3">
              <span class="text-h6 text-white font-weight-bold">
                {{ _.toUpper(displayname[0]) }}
              </span>
            </v-avatar>

            <div class="text-left user-info">
              <h4 class="text-black font-weight-bold username">
                {{ displayname }}
              </h4>
              <h5 class="text-grey-darken-1 font-weight-regular userrole">
                {{ role }}
              </h5>
            </div>
          </div>
        </template>

        <!-- Dropdown User Card -->
        <v-sheet
          rounded="xl"
          class="pa-5 elevation-0 d-flex justify-center"
          flat
          style="min-width: 300px; background-color: transparent; margin-top: -30px"
        >
          <div class="card my-4">
            <div class="card__img">
              <svg width="100%" xmlns="http://www.w3.org/2000/svg">
                <rect height="450" width="540" fill="#ffffff"></rect>
                <defs>
                  <linearGradient
                    gradientTransform="rotate(222,648,379)"
                    y2="100%"
                    y1="0"
                    x2="0"
                    x1="0"
                    id="a"
                  >
                    <stop stop-color="#0f766e" offset="0"></stop>
                    <stop stop-color="#0d9488" offset="1"></stop>
                  </linearGradient>

                  <pattern
                    viewBox="0 0 1080 900"
                    y="0"
                    x="0"
                    height="250"
                    width="300"
                    id="b"
                    patternUnits="userSpaceOnUse"
                  >
                    <g fill-opacity="0.5">
                      <polygon points="90 150 0 300 180 300" fill="#064e3b"></polygon>
                      <polygon points="90 150 180 0 0 0" fill="#0f766e"></polygon>
                      <polygon points="270 150 360 0 180 0" fill="#059669"></polygon>
                      <polygon points="450 150 360 300 540 300" fill="#34d399"></polygon>
                      <polygon points="450 150 540 0 360 0" fill="#6ee7b7"></polygon>
                    </g>
                  </pattern>
                </defs>

                <rect height="100%" width="100%" fill="url(#a)"></rect>
                <rect height="100%" width="100%" fill="url(#b)"></rect>
              </svg>
            </div>

            <div class="card__avatar">
              <v-avatar color="#0f766e" size="60" rounded="circle">
                <span class="text-h5 text-white font-weight-bold">
                  {{ _.toUpper(displayname[0]) }}
                </span>
              </v-avatar>
            </div>

            <div class="card__title">{{ displayname }}</div>
            <div class="card__subtitle">Master Perusahaan</div>

            <div class="card__wrapper">
              <button class="logout-btn" @click="logout">Logout</button>
            </div>
          </div>
        </v-sheet>
      </v-menu>
    </template>
  </v-app-bar>

  <!-- DRAWER -->
  <v-navigation-drawer
    v-model="drawer"
    :rail="!drawer"
    expand-on-hover
    width="243"
    flat
    style="
      background: linear-gradient(135deg, #0f766e, #0d9488);
      position: fixed;
    "
  >
    <perusahaan-side-menu />
  </v-navigation-drawer>
</template>

<style scoped>
.on-hover-effect {
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}
.on-hover-effect:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

/* Profile info */
.user-info {
  display: flex;
  flex-direction: column;
}
.username {
  margin-top: -4px;
  margin-bottom: 2px;
  line-height: 1.2;
}
.userrole {
  margin-top: 0;
  font-size: 14px;
  line-height: 1.1;
  color: #555;
}

/* Card styling */
.card {
  --main-color: #0f766e;
  --submain-color: #888;
  --bg-color: #fff;
  font-family: "Inter", sans-serif;
  position: relative;
  width: 300px;
  height: 360px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
  background: var(--bg-color);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15), 0 0 8px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(12px);
}

.card__img {
  height: 150px;
  width: 100%;
}

.card__img svg {
  height: 100%;
  border-radius: 20px 20px 0 0;
}

.card__avatar {
  position: absolute;
  width: 80px;
  height: 80px;
  background: #fff;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  top: calc(45% - 55px);
  box-shadow: 0 4px 15px rgba(13, 148, 136, 0.25);
}

.card__title {
  margin-top: 60px;
  font-weight: 600;
  font-size: 18px;
  color: #222;
}

.card__subtitle {
  margin-top: 8px;
  font-weight: 400;
  font-size: 15px;
  color: var(--submain-color);
}

.logout-btn {
  margin-top: 25px;
  width: 130px;
  height: 40px;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  font-size: 14px;
  color: #fff;
  background: var(--main-color);
  text-transform: uppercase;
  transition: all 0.3s ease;
  box-shadow: 0 3px 10px rgba(13, 148, 136, 0.3);
  cursor: pointer;
}

.logout-btn:hover {
  background: #0d8075;
  box-shadow: 0 4px 14px rgba(13, 148, 136, 0.4);
}
</style>
