<script setup lang="ts">
import { ref, computed } from "vue";
import type { ConfirmationDialog } from "#components";
import { useUserStore } from "../../stores/userStore";
import { useLogout } from "@/composables/useLogout";

const confirmationDialog = ref<InstanceType<typeof ConfirmationDialog> | null>(null);
const notificationStore = useNotificationStore();
const userstore = useUserStore();
const { logout } = useLogout();

const idPerusahaan = computed(() => userstore.getIdPerusahaan);

const doLogout = async () => {
  const confirmed = await confirmationDialog.value?.show(
    "Konfirmasi Logout",
    "Apakah Anda yakin ingin keluar dari akun?"
  );
  if (!confirmed) return notificationStore.showInfo("Logout dibatalkan.");

  try {
    await logout();
    notificationStore.showSuccess("Anda berhasil keluar.");
  } catch (error) {
    notificationStore.showError("Gagal keluar dari akun.");
  }
};

/* ============================================
   MENU DEFINITION (SANGAT RINGKAS)
============================================ */
const menu = [
  {
    header: "Menu",
  },
  {
    title: "Dashboard",
    icon: "mdi-view-dashboard-outline",
    to: (id: string) => `/perusahaan/${id}/`,
  },
  {
    title: "Master Data",
    icon: "mdi-database-cog-outline",
    children: [
      { title: "Kategori Akun", icon: "mdi-book-account-outline", path: "master/kategori-akun" },
      { title: "Chart of Accounts", icon: "mdi-book-account-outline", path: "master/coa" },
      { title: "Departemen", icon: "mdi-office-building-outline", path: "departemen" },
      { title: "Proyek", icon: "mdi-briefcase-outline", path: "proyek" },
      { title: "Vendor", icon: "mdi-truck-outline", path: "vendor" },
      { title: "Customer", icon: "mdi-account-group-outline", path: "customer" },
      { title: "Produk", icon: "mdi-package-variant-closed", path: "produk" },
    ],
  },
  {
    title: "Kas & Bank",
    icon: "mdi-bank-outline",
    children: [
      { title: "Kas Masuk", icon: "mdi-arrow-down-bold-circle-outline", path: "kas-masuk" },
      { title: "Kas Keluar", icon: "mdi-arrow-up-bold-circle-outline", path: "kas-keluar" },
      { title: "Transfer Bank", icon: "mdi-bank-transfer", path: "transfer-bank" },
      { title: "Rekonsiliasi Bank", icon: "mdi-bank-check", path: "rekonsiliasi-bank" },
    ],
  },
  {
    title: "Penjualan",
    icon: "mdi-cart-arrow-right",
    children: [
      { title: "Quotation", icon: "mdi-file-document-edit-outline", path: "quotation" },
      { title: "Invoice", icon: "mdi-file-document-outline", path: "invoice" },
      { title: "Pembayaran", icon: "mdi-credit-card-check-outline", path: "pembayaran" },
      { title: "Piutang", icon: "mdi-account-cash-outline", path: "piutang" },
    ],
  },
  {
    title: "Pembelian",
    icon: "mdi-cart-plus",
    children: [
      { title: "PR", icon: "mdi-file-edit-outline", path: "pr" },
      { title: "PO", icon: "mdi-file-document-multiple-outline", path: "po" },
      { title: "Penerimaan Barang", icon: "mdi-truck-fast-outline", path: "penerimaan-barang" },
      { title: "Hutang", icon: "mdi-cash-minus", path: "hutang" },
    ],
  },
  {
    title: "Persediaan",
    icon: "mdi-warehouse",
    children: [
      { title: "Kartu Stok", icon: "mdi-clipboard-list-outline", path: "kartu-stok" },
      { title: "Stock In", icon: "mdi-arrow-down-bold-circle-outline", path: "stok-in" },
      { title: "Stock Out", icon: "mdi-arrow-up-bold-circle-outline", path: "stok-out" },
      { title: "Penyesuaian Stok", icon: "mdi-scale-balance", path: "penyesuaian-stok" },
    ],
  },
  {
    title: "Akuntansi",
    icon: "mdi-notebook-outline",
    children: [
      { title: "Jurnal Umum", icon: "mdi-notebook-edit-outline", path: "jurnal" },
      { title: "Posting Jurnal", icon: "mdi-check-circle-outline", path: "posting-jurnal" },
      { title: "Buku Besar", icon: "mdi-book-open-variant", path: "buku-besar" },
      { title: "Trial Balance", icon: "mdi-scale-balance", path: "trial-balance" },
    ],
  },
  {
    title: "Laporan Keuangan",
    icon: "mdi-chart-bar",
    children: [
      { title: "Neraca", icon: "mdi-balance-scale", path: "laporan/neraca" },
      { title: "Laba Rugi", icon: "mdi-chart-line-variant", path: "laporan/laba-rugi" },
      { title: "Arus Kas", icon: "mdi-cash-sync", path: "laporan/arus-kas" },
    ],
  },
  {
    header: "Settings",
  },
];
</script>


<template>
  <ConfirmationDialog ref="confirmationDialog" />

  <div class="text-body-2 pa-2 font-weight-medium">
    <v-list class="font-list">

      <template v-for="(item, index) in menu" :key="index">

        <!-- HEADER -->
        <v-row
          v-if="item.header"
          align="center"
          no-gutters
          class="pa-4 section-header"
        >
          <v-col class="text-white font-weight-bold">{{ item.header }}</v-col>
          <v-col v-if="item.header === 'Settings'">
            <v-divider class="border-opacity-100 mt-1" color="white" />
          </v-col>
        </v-row>

        <!-- SINGLE ITEM -->
        <v-list-item
          v-if="item.to"
          :to="item.to(idPerusahaan)"
          rounded="lg"
        >
          <template #prepend>
            <v-icon :icon="item.icon" />
          </template>
          {{ item.title }}
        </v-list-item>

        <!-- GROUP -->
        <v-list-group v-if="item.children">
          <template #activator="{ props }">
            <v-list-item v-bind="props" rounded="lg">
              <template #prepend>
                <v-icon :icon="item.icon" />
              </template>
              {{ item.title }}
            </v-list-item>
          </template>

          <v-list-item
            v-for="(c, i) in item.children"
            :key="i"
            :to="`/perusahaan/${idPerusahaan}/${c.path}`"
            rounded="lg"
          >
            <template #prepend>
              <v-icon :icon="c.icon" />
            </template>
            {{ c.title }}
          </v-list-item>
        </v-list-group>

      </template>

      <!-- LOGOUT -->
      <v-list-item rounded="lg" @click="doLogout">
        <template #prepend>
          <v-icon icon="mdi-logout-variant" size="small" />
        </template>
        Keluar
      </v-list-item>

    </v-list>
  </div>
</template>


<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600;700&display=swap");

.font-list,
.font-list * {
  font-family: "Source Sans Pro", sans-serif !important;
}

/* Warna teks & ikon — sama seperti admin */
.v-list-item-title,
.v-list-item-subtitle,
.v-icon {
  color: #ffffff !important;
}

.v-list-item {
  color: #ffffff !important;
  font-weight: 600;
}

.section-header > .v-col {
  color: #d0d0d0 !important;
  font-weight: 600;
  font-size: 0.85rem;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.v-list-item:hover {
  background-color: rgba(255, 255, 255, 0.1) !important;
}

.v-list-item--active {
  background-color: rgba(255, 255, 255, 0.15) !important;
  font-weight: 600;
}
</style>
