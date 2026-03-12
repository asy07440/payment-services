<!-- AdminSideMenu.vue -->
<template>
  <ConfirmationDialog ref="confirmationDialog" />

  <div class="side-menu-container">
    <v-list class="text-white side-menu" density="comfortable">
      <!-- Main Menu -->
      <div class="section-label">Menu</div>

      <v-list-item
        to="/admin/"
        class="menu-item"
        active-class="active-menu-item"
        rounded="lg"
      >
        <template v-slot:prepend>
          <div class="icon-wrapper">
            <v-icon icon="mdi-view-dashboard" size="22" />
          </div>
        </template>
        <span class="menu-text">Dashboard</span>
      </v-list-item>

      <!-- Scrollable Container untuk Menu yang Panjang -->
      <div class="scrollable-menu-container">
        <!-- Master Data Menu -->
        <v-list-group>
          <template v-slot:activator="{ props, isOpen }">
            <v-list-item v-bind="props" rounded="lg" class="menu-item">
              <template v-slot:prepend>
                <div class="icon-wrapper">
                  <v-icon icon="mdi-folder-open-outline" size="22" />
                </div>
              </template>

              <span class="menu-text">Master</span>

              <template v-slot:append>
                <v-icon
                  size="18"
                  class="menu-arrow"
                  :class="{ 'rotate-90': isOpen }"
                  icon="mdi-chevron-right"
                />
              </template>
            </v-list-item>
          </template>

          <v-list-item
            v-for="item in masterMenu"
            :key="item.to"
            :to="item.to"
            class="submenu-item"
            active-class="active-submenu-item"
            rounded="md"
          >
            <template v-slot:prepend>
              <div class="submenu-icon">
                <v-icon :icon="item.icon" size="20" />
              </div>
            </template>

            <span class="submenu-text">{{ item.title }}</span>
          </v-list-item>
        </v-list-group>

        <!-- Saldo Menu -->
        <v-list-group>
          <template v-slot:activator="{ props, isOpen }">
            <v-list-item v-bind="props" rounded="lg" class="menu-item">
              <template v-slot:prepend>
                <div class="icon-wrapper">
                  <v-icon icon="mdi-cash-multiple" size="22" />
                </div>
              </template>

              <span class="menu-text">Saldo</span>

              <template v-slot:append>
                <v-icon
                  size="18"
                  class="menu-arrow"
                  :class="{ 'rotate-90': isOpen }"
                  icon="mdi-chevron-right"
                />
              </template>
            </v-list-item>
          </template>

          <v-list-item
            to="/admin/saldo"
            class="submenu-item"
            active-class="active-submenu-item"
            rounded="md"
          >
            <template v-slot:prepend>
              <div class="submenu-icon">
                <v-icon icon="mdi-cash-plus" size="20" />
              </div>
            </template>
            <span class="submenu-text">Awal</span>
          </v-list-item>

          <v-list-item
            to="/admin/saldo/harian"
            class="submenu-item"
            active-class="active-submenu-item"
            rounded="md"
          >
            <template v-slot:prepend>
              <div class="submenu-icon">
                <v-icon icon="mdi-calendar-check-outline" size="20" />
              </div>
            </template>
            <span class="submenu-text">Harian</span>
          </v-list-item>
        </v-list-group>

        <!-- Transaksi Menu -->
        <v-list-item
          to="/admin/transaksi-kas"
          class="menu-item"
          active-class="active-menu-item"
          rounded="lg"
        >
          <template v-slot:prepend>
            <div class="icon-wrapper">
              <v-icon icon="mdi-cash-register" size="22" />
            </div>
          </template>
          <span class="menu-text">Transaksi Kas</span>
        </v-list-item>

        <v-list-item
          to="/admin/jurnal"
          class="menu-item"
          active-class="active-menu-item"
          rounded="lg"
        >
          <template v-slot:prepend>
            <div class="icon-wrapper">
              <v-icon icon="mdi-notebook-edit-outline" size="22" />
            </div>
          </template>
          <span class="menu-text">Jurnal</span>
        </v-list-item>

        <v-list-item
          to="/admin/laporan"
          class="menu-item"
          active-class="active-menu-item"
          rounded="lg"
        >
          <template v-slot:prepend>
            <div class="icon-wrapper">
              <v-icon icon="mdi-chart-bar" size="22" />
            </div>
          </template>
          <span class="menu-text">Report</span>
        </v-list-item>
      </div>

      <!-- System Section -->
      <div class="menu-section mt-auto">
        <!-- Logout -->
        <v-list-item
          @click="logout()"
          class="menu-item logout-item"
          rounded="lg"
        >
          <template v-slot:prepend>
            <div class="icon-wrapper logout-icon">
              <v-icon icon="mdi-logout-variant" size="22" />
            </div>
          </template>

          <span class="menu-text">Keluar</span>
        </v-list-item>
      </div>
    </v-list>
  </div>
</template>

<script setup lang="ts">
import _ from "lodash";
import { ref, computed, reactive } from "vue";
import type { ConfirmationDialog } from "#components";
import { getAuth, signOut } from "firebase/auth";

const notificationStore = useNotificationStore();
// const role = computed(() => useUserStore().getdataprivilege);
const confirmationDialog = ref<InstanceType<typeof ConfirmationDialog> | null>(
  null,
);

// Menu data sesuai dengan struktur sebelumnya
const masterMenu = [
  {
    to: "/admin/master/users",
    icon: "mdi-account-multiple-outline",
    title: "Users",
  },
  {
    to: "/admin/master/akun/kategori",
    icon: "mdi-shape-outline",
    title: "Kategori Akun",
  },
  { to: "/admin/master/akun", icon: "mdi-book-account-outline", title: "Akun" },
  {
    to: "/admin/master/perusahaan",
    icon: "mdi-office-building-outline",
    title: "Perusahaan",
  },
];

const logout = async () => {
  const confirmed = await confirmationDialog.value?.show(
    "Konfirmasi Logout",
    "Apakah Anda yakin ingin keluar dari akun?",
  );

  if (!confirmed) {
    return notificationStore.showInfo("Logout dibatalkan.");
  }

  try {
    if (process.client) {
      await signOut(getAuth());
      useUserStore().setUser(null);
      notificationStore.showSuccess("Anda berhasil keluar.");
      navigateTo("/login");
    }
  } catch (error) {
    notificationStore.showError("Gagal keluar dari akun.");
  }
};
</script>

<style scoped>
.side-menu-container {
  height: calc(100vh - 90px);
  display: flex;
  flex-direction: column;
  padding: 0 5px;
  background: transparent !important;
}

.side-menu {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: transparent !important;
}

.section-label {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: rgba(255, 255, 255, 0.6);
  padding: 5px 5px 10px;
  margin-bottom: 4px;
  transition: all 0.3s ease;
  opacity: 1;
}

/* Container untuk menu yang bisa di-scroll */
.scrollable-menu-container {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  margin-bottom: 8px;
}

/* Custom scrollbar untuk container menu */
.scrollable-menu-container::-webkit-scrollbar {
  width: 4px;
}

.scrollable-menu-container::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
}

.scrollable-menu-container::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}

.scrollable-menu-container::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* Animasi untuk section label ketika drawer collapsed */
.v-navigation-drawer--rail .section-label {
  opacity: 0;
  height: 0;
  padding: 0;
  margin: 0;
  overflow: hidden;
}

.menu-item {
  color: rgba(255, 255, 255, 0.9) !important;
  margin-bottom: 6px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  min-height: 48px;
  padding: 0 12px;
  border: 1px solid transparent;
}

.menu-item:hover {
  background: rgba(255, 255, 255, 0.12) !important;
  color: white !important;
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateX(4px);
}

.menu-item:hover .icon-wrapper {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.05);
}

.active-menu-item {
  background: rgba(255, 255, 255, 0.18) !important;
  color: white !important;
  border-color: rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.active-menu-item .icon-wrapper {
  background: rgba(255, 255, 255, 0.25);
}

.icon-wrapper {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  margin-right: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: rgba(255, 255, 255, 0.15);
}

.menu-text {
  font-weight: 600;
  font-size: 0.9rem;
  letter-spacing: 0.2px;
  transition: all 0.3s ease;
  opacity: 1;
}

/* Animasi untuk menu text ketika drawer collapsed */
.v-navigation-drawer--rail .menu-text {
  opacity: 0;
  width: 0;
  overflow: hidden;
}

.menu-arrow {
  color: rgba(255, 255, 255, 0.7) !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.rotate-90 {
  transform: rotate(90deg);
}

/* Submenu Styles */
.submenu-item {
  color: rgba(255, 255, 255, 0.8) !important;
  margin-left: 12px;
  margin-bottom: 4px;
  padding-left: 44px !important;
  min-height: 44px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 8px !important;
}

.submenu-item:hover {
  background: rgba(255, 255, 255, 0.1) !important;
  color: white !important;
  transform: translateX(4px);
}

.active-submenu-item {
  background: rgba(255, 255, 255, 0.15) !important;
  color: white !important;
}

.submenu-icon {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  margin-right: 12px;
  background: rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.submenu-item:hover .submenu-icon {
  background: rgba(255, 255, 255, 0.15);
}

.submenu-text {
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.3s ease;
  opacity: 1;
}

/* Animasi untuk submenu text ketika drawer collapsed */
.v-navigation-drawer--rail .submenu-text {
  opacity: 0;
  width: 0;
  overflow: hidden;
}

/* Logout Item */
.logout-item {
  color: rgba(255, 255, 255, 0.9) !important;
  margin-top: auto;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.logout-item:hover {
  background: rgba(239, 68, 68, 0.2) !important;
  color: white !important;
  border-color: rgba(239, 68, 68, 0.3);
  transform: translateX(4px);
}

.logout-icon {
  background: rgba(239, 68, 68, 0.2);
}

.logout-item:hover .logout-icon {
  background: rgba(239, 68, 68, 0.3);
  transform: scale(1.05);
}

/* Menu Section */
.menu-section {
  padding-top: 16px;
}

/* Smooth transitions untuk semua elemen */
:deep(.v-list-group__items) {
  margin-left: 8px;
  transition: all 0.3s ease;
}

:deep(.v-list-item__prepend) {
  margin-right: 8px;
  transition: all 0.3s ease;
}

:deep(.v-list-item__append) {
  margin-left: 8px;
  transition: all 0.3s ease;
}

/* Animasi untuk group items ketika drawer collapsed */
.v-navigation-drawer--rail :deep(.v-list-group__items) {
  opacity: 0;
  height: 0;
  overflow: hidden;
}

/* Efek ripple custom */
:deep(.v-ripple__container) {
  color: rgba(255, 255, 255, 0.2) !important;
}

/* Enhanced hover effects for better UX */
.menu-item::before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 0;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 0 4px 4px 0;
  transition: height 0.3s ease;
}

.menu-item:hover::before,
.active-menu-item::before {
  height: 60%;
}

/* Subtle glow effect for active items */
.active-menu-item {
  position: relative;
}

.active-menu-item::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 12px;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.3);
  opacity: 0;
  animation: pulse-glow 2s infinite;
  pointer-events: none;
}
</style>
