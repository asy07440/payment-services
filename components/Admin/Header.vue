<!-- AdminHeader.vue -->
<template>
  <v-navigation-drawer
    v-model="drawer"
    :rail="!drawer"
    expand-on-hover
    flat
    :width="220"
    :rail-width="60"
    style="
      background: linear-gradient(
        145deg,
        #0081ff 0%,
        #0066cc 50%,
        #004d99 100%
      );
      position: fixed;
      border: none;
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1),
        0 4px 20px rgba(0, 0, 0, 0.12);
    "
  >
    <template v-slot:prepend>
      <v-list-item class="ma-1 pa-1">
        <div class="d-flex align-center justify-center w-100">
          <img
            src="https://imagedelivery.net/_tN3dTar-XzU6X9_PBgTbA/1043a53d-dea0-4de7-86a2-7dfcb529f000/heromobile"
            alt="Aresa"
            class="logo-img"
            :class="{ 'logo-rail': !drawer }"
          />
        </div>
      </v-list-item>

      <v-divider class="border-opacity-50 my-1" color="white" />
    </template>

    <admin-side-menu />
  </v-navigation-drawer>

  <v-app-bar
    flat
    color="#ffffff"
    height="64"
    style="border-bottom: 1px solid #e2e8f0"
  >
    <template v-slot:prepend>
      <div class="d-flex align-center ml-2">
        <v-btn
          icon
          variant="text"
          @click="toggleDrawer"
          class="menu-toggle"
          :class="{ 'is-active': !drawer }"
          size="small"
        >
          <!-- Premium Animated Hamburger Menu -->
          <div class="premium-hamburger">
            <div class="hamburger-bar top-bar"></div>
            <div class="hamburger-bar middle-bar"></div>
            <div class="hamburger-bar bottom-bar"></div>
            <div class="hamburger-circle"></div>
          </div>
        </v-btn>
      </div>
    </template>

    <v-spacer />

    <template v-slot:append>
      <!-- Notification Bell -->
      <div class="notification-wrapper mr-3">
        <v-btn
          icon
          variant="text"
          class="notification-btn"
          color="grey-darken-1"
          size="small"
        >
          <v-icon size="20">mdi-bell-outline</v-icon>
          <span class="notification-badge">3</span>
        </v-btn>
      </div>

      <v-divider vertical class="mr-3" />

      <!-- User Profile -->
      <v-menu
        rounded="lg"
        transition="scale-transition"
        :offset="[0, 8]"
        min-width="180"
      >
        <template v-slot:activator="{ props }">
          <v-btn variant="text" v-bind="props" class="user-btn" height="40">
            <v-avatar size="32" color="#0074d9" class="mr-2">
              <span class="text-white text-caption font-weight-bold">
                {{ _.toUpper(displayname[0]) }}
              </span>
            </v-avatar>
            <div class="text-left mr-2" v-if="drawer">
              <div class="text-caption font-weight-medium text-slate-700">
                {{ displayname }}
              </div>
              <div class="text-xs text-slate-500">
                {{ role }}
              </div>
            </div>
            <!-- Chevron minimalis -->
            <div class="minimal-chevron">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path
                  d="M2.5 3.75L5 6.25L7.5 3.75"
                  stroke="currentColor"
                  stroke-width="1.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </v-btn>
        </template>

        <v-sheet rounded="lg" class="pa-2 elevation-2 profile-card border">
          <!-- User Info -->
          <div class="user-info">
            <div class="user-avatar">
              <v-avatar color="#0074d9" size="40" class="mr-2">
                <span class="text-white font-weight-bold">
                  {{ _.toUpper(displayname[0]) }}
                </span>
              </v-avatar>
              <div class="user-details">
                <div class="user-name">{{ displayname }}</div>
                <div class="user-role">{{ role }}</div>
              </div>
            </div>
          </div>

          <v-divider class="my-2" style="border-color: #f1f5f9" />

          <!-- Logout -->
          <v-btn
            variant="flat"
            prepend-icon="mdi-logout"
            block
            class="justify-start logout-btn"
            size="small"
            color="#ef4444"
            @click="logout"
          >
            <span class="text-white font-weight-medium">Keluar</span>
          </v-btn>
        </v-sheet>
      </v-menu>
    </template>
  </v-app-bar>
</template>

<script setup>
import _ from "lodash";
import { ref, computed } from "vue";
import { useUserStore } from "@/stores/userStore";
import { getAuth, signOut } from "firebase/auth";
import { navigateTo } from "#app";

const useuser = useUserStore();
const drawer = ref(true);

const logout = async () => {
  const auth = getAuth();
  try {
    await signOut(auth);
    useuser.setUser(null);
    navigateTo("/");
  } catch (error) {
    console.error("Logout gagal:", error);
  }
};

const displayname = computed(() => {
  return useuser.getDisplayName || "Admin";
});

const role = computed(() => {
  return useuser.getRole || "Administrator";
});

const toggleDrawer = () => {
  drawer.value = !drawer.value;
};
</script>

<style scoped>
.logo-img {
  height: 50px;
  object-fit: cover;
  filter: brightness(0) invert(1);
  transition: all 0.3s ease;
}

.logo-rail {
  height: 32px;
}

.menu-toggle {
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  border-radius: 12px;
  width: 44px;
  height: 44px;
  position: relative;
  overflow: visible;
  background: transparent !important;
}

.menu-toggle:hover {
  background-color: rgba(0, 116, 217, 0.08) !important;
  transform: scale(1.05);
}

.menu-toggle:active {
  transform: scale(0.95);
}

/* Premium Hamburger Menu Styles - DIKECILKAN */
.premium-hamburger {
  position: relative;
  width: 22px;
  height: 22px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.hamburger-bar {
  width: 18px;
  height: 2px;
  background: linear-gradient(135deg, #64748b 0%, #475569 100%);
  border-radius: 2px;
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  position: absolute;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.hamburger-bar.top-bar {
  transform: translateY(-6px);
  width: 14px;
  margin-left: 4px;
}

.hamburger-bar.middle-bar {
  width: 18px;
}

.hamburger-bar.bottom-bar {
  transform: translateY(6px);
  width: 12px;
  margin-left: 6px;
}

.hamburger-circle {
  position: absolute;
  width: 32px;
  height: 32px;
  border: 1.5px solid transparent;
  border-radius: 50%;
  transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  opacity: 0;
}

/* Hover Effects */
.menu-toggle:hover .hamburger-bar {
  background: linear-gradient(135deg, #0074d9 0%, #005bac 100%);
  box-shadow: 0 2px 4px rgba(0, 116, 217, 0.3);
}

.menu-toggle:hover .hamburger-circle {
  opacity: 1;
  border-color: rgba(0, 116, 217, 0.2);
  transform: scale(1.1);
}

.menu-toggle:hover .top-bar {
  width: 18px;
  margin-left: 0;
}

.menu-toggle:hover .bottom-bar {
  width: 18px;
  margin-left: 0;
}

/* Active State (X Transformation) */
.menu-toggle.is-active .premium-hamburger {
  transform: rotate(180deg);
}

.menu-toggle.is-active .hamburger-bar {
  background: linear-gradient(135deg, #0074d9 0%, #005bac 100%);
  box-shadow: 0 2px 4px rgba(0, 116, 217, 0.4);
}

.menu-toggle.is-active .top-bar {
  transform: rotate(45deg) translate(4px, 4px);
  width: 18px;
  margin-left: 0;
}

.menu-toggle.is-active .middle-bar {
  transform: scale(0);
  opacity: 0;
}

.menu-toggle.is-active .bottom-bar {
  transform: rotate(-45deg) translate(4px, -4px);
  width: 18px;
  margin-left: 0;
}

.menu-toggle.is-active .hamburger-circle {
  opacity: 1;
  border-color: rgba(0, 116, 217, 0.3);
  transform: scale(1.1) rotate(90deg);
  box-shadow: 0 0 0 3px rgba(0, 116, 217, 0.1);
}

/* Active Hover Effects */
.menu-toggle.is-active:hover .hamburger-bar {
  background: linear-gradient(135deg, #005bac 0%, #004a99 100%);
  box-shadow: 0 3px 6px rgba(0, 91, 172, 0.5);
}

.menu-toggle.is-active:hover .hamburger-circle {
  border-color: rgba(0, 91, 172, 0.4);
  box-shadow: 0 0 0 4px rgba(0, 91, 172, 0.15);
}

/* Pulse Animation */
@keyframes pulse-glow {
  0% {
    box-shadow: 0 0 0 0 rgba(0, 116, 217, 0.4);
  }
  70% {
    box-shadow: 0 0 0 8px rgba(0, 116, 217, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(0, 116, 217, 0);
  }
}

.menu-toggle.is-active .hamburger-circle {
  animation: pulse-glow 2s infinite;
}

/* Ripple Effect */
.menu-toggle::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(0, 116, 217, 0.1);
  transform: translate(-50%, -50%);
  transition: all 0.3s ease;
}

.menu-toggle:active::before {
  width: 100%;
  height: 100%;
  transition: all 0.2s ease;
}

/* Minimal Chevron Styles - LEBIH KECIL */
.minimal-chevron {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 4px;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  color: #64748b;
  width: 14px;
  height: 14px;
}

/* Hover effect untuk chevron */
.user-btn:hover .minimal-chevron {
  color: #0074d9;
  transform: translateY(0.5px);
}

/* Animation ketika menu aktif */
.user-btn.v-menu--active .minimal-chevron {
  transform: rotate(180deg);
  color: #0074d9;
}

/* Notification Styles */
.notification-wrapper {
  position: relative;
}

.notification-btn {
  position: relative;
  transition: all 0.2s ease;
  border-radius: 10px;
  width: 38px;
  height: 38px;
}

.notification-btn:hover {
  background-color: rgba(0, 116, 217, 0.08) !important;
  transform: translateY(-1px);
}

.notification-badge {
  position: absolute;
  top: 6px;
  right: 6px;
  background: #ef4444;
  color: white;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  font-size: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  box-shadow: 0 1px 3px rgba(239, 68, 68, 0.3);
}

/* User Profile Styles */
.user-btn {
  transition: all 0.2s ease;
  border-radius: 8px;
  padding: 0 6px;
}

.user-btn:hover {
  background-color: rgba(0, 116, 217, 0.08);
  transform: translateY(-1px);
}

.profile-card {
  background: white;
  backdrop-filter: blur(10px);
}

.user-info {
  padding: 2px 0;
}

.user-avatar {
  display: flex;
  align-items: center;
}

.user-details {
  flex: 1;
}

.user-name {
  font-weight: 600;
  font-size: 0.85rem;
  color: #1e293b;
  line-height: 1.2;
}

.user-role {
  font-size: 0.7rem;
  color: #64748b;
  margin-top: 1px;
  background: linear-gradient(135deg, #0074d9 0%, #005bac 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 500;
}

.logout-btn {
  border-radius: 6px;
  transition: all 0.2s ease;
  margin-top: 2px;
}

.logout-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 3px 6px rgba(239, 68, 68, 0.3);
}

.text-slate-700 {
  color: #334155;
}

.text-slate-500 {
  color: #64748b;
}

.text-slate-800 {
  color: #1e293b;
}

/* Responsive Design */
@media (max-width: 768px) {
  .menu-toggle {
    width: 40px;
    height: 40px;
  }

  .premium-hamburger {
    width: 20px;
    height: 20px;
  }

  .hamburger-bar {
    width: 16px;
    height: 1.5px;
  }

  .hamburger-bar.top-bar {
    width: 12px;
    transform: translateY(-5px);
  }

  .hamburger-bar.bottom-bar {
    width: 10px;
    transform: translateY(5px);
  }

  .user-btn {
    padding: 0 3px;
  }

  .minimal-chevron {
    width: 12px;
    height: 12px;
    margin-left: 3px;
  }

  .minimal-chevron svg {
    width: 8px;
    height: 8px;
  }

  .notification-btn {
    width: 36px;
    height: 36px;
  }

  .notification-badge {
    width: 14px;
    height: 14px;
    font-size: 8px;
    top: 5px;
    right: 5px;
  }
}

/* Tambahan untuk smooth transition */
.v-navigation-drawer {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

/* Efek hover untuk menu items agar kontras dengan gradient */
:deep(.v-list-item--active) {
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.2) 0%,
    rgba(255, 255, 255, 0.15) 100%
  ) !important;
  border-left: 2px solid rgba(255, 255, 255, 0.8);
}

:deep(.v-list-item:hover) {
  background: rgba(255, 255, 255, 0.08) !important;
}

/* Atur ulang padding dan margin untuk komponen yang lebih kecil */
:deep(.v-list-item) {
  min-height: 44px !important;
  padding-left: 12px !important;
  padding-right: 12px !important;
}

:deep(.v-list-item__prepend) {
  margin-right: 12px !important;
}

:deep(.v-list-item__content) {
  font-size: 0.8rem !important;
}
</style>
