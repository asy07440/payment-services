<script setup lang="ts">
definePageMeta({
  layout: "perusahaan",
});

import { useUserStore } from "../../../stores/userStore";
import { computed, onMounted, ref } from "vue";

const userstore = useUserStore();

// ID Perusahaan dari route
const route = useRoute();
const idPerusahaan = route.params.id;

// Greeting
const displayname = computed(() => userstore.getDisplayName);

// Dummy data KPI (nanti bisa diganti API Firestore)
const loading = ref(true);

const kpi = ref({
  saldoHarian: 0,
  jurnalHariIni: 0,
  transaksiHariIni: 0,
  saldoAwal: 0,
});

onMounted(async () => {
  // contoh delay loading (nanti bisa diganti fetch data)
  setTimeout(() => {
    kpi.value.saldoHarian = 52000000;
    kpi.value.transaksiHariIni = 12;
    kpi.value.jurnalHariIni = 7;
    kpi.value.saldoAwal = 100000000;
    loading.value = false;
  }, 600);
});
</script>

<template>
  <div>
    <!-- Greeting Section -->
    <v-row class="mb-6">
      <v-col>
        <h1 class="text-h5 font-weight-bold">
          Selamat datang, {{ displayname }} 👋
        </h1>
        <p class="text-body-2 text-grey-darken-1 mt-1">
          Berikut ringkasan aktivitas perusahaan Anda hari ini.
        </p>
      </v-col>
    </v-row>

    <!-- KPI CARDS -->
    <v-row>
      <!-- Saldo Awal -->
      <v-col cols="12" sm="6" md="3">
        <v-card class="pa-4" rounded="lg" elevation="2" color="#f0fdfa">
          <div class="d-flex align-center">
            <v-avatar color="#0d9488" class="mr-4" rounded="lg">
              <v-icon size="28" class="text-white">mdi-cash-multiple</v-icon>
            </v-avatar>
            <div>
              <p class="text-body-2 text-grey-darken-1 mb-1">Saldo Awal</p>
              <h3 class="text-h6 font-weight-bold">
                {{ loading ? "-" : kpi.saldoAwal.toLocaleString("id-ID") }}
              </h3>
            </div>
          </div>
        </v-card>
      </v-col>

      <!-- Saldo Harian -->
      <v-col cols="12" sm="6" md="3">
        <v-card class="pa-4" rounded="lg" elevation="2" color="#ecfdf5">
          <div class="d-flex align-center">
            <v-avatar color="#10b981" class="mr-4" rounded="lg">
              <v-icon size="28" class="text-white">mdi-cash-plus</v-icon>
            </v-avatar>
            <div>
              <p class="text-body-2 text-grey-darken-1 mb-1">Saldo Harian</p>
              <h3 class="text-h6 font-weight-bold">
                {{ loading ? "-" : kpi.saldoHarian.toLocaleString("id-ID") }}
              </h3>
            </div>
          </div>
        </v-card>
      </v-col>

      <!-- Jurnal -->
      <v-col cols="12" sm="6" md="3">
        <v-card class="pa-4" rounded="lg" elevation="2" color="#f0f9ff">
          <div class="d-flex align-center">
            <v-avatar color="#0284c7" class="mr-4" rounded="lg">
              <v-icon size="28" class="text-white">mdi-notebook-edit-outline</v-icon>
            </v-avatar>
            <div>
              <p class="text-body-2 text-grey-darken-1 mb-1">Jurnal Hari Ini</p>
              <h3 class="text-h6 font-weight-bold">
                {{ loading ? "-" : kpi.jurnalHariIni }}
              </h3>
            </div>
          </div>
        </v-card>
      </v-col>

      <!-- Transaksi -->
      <v-col cols="12" sm="6" md="3">
        <v-card class="pa-4" rounded="lg" elevation="2" color="#fdf2f8">
          <div class="d-flex align-center">
            <v-avatar color="#db2777" class="mr-4" rounded="lg">
              <v-icon size="28" class="text-white">mdi-cash-register</v-icon>
            </v-avatar>
            <div>
              <p class="text-body-2 text-grey-darken-1 mb-1">
                Transaksi Hari Ini
              </p>
              <h3 class="text-h6 font-weight-bold">
                {{ loading ? "-" : kpi.transaksiHariIni }}
              </h3>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- SECTION NEXT STEPS -->
    <v-row class="mt-8">
      <v-col cols="12">
        <h2 class="text-h6 font-weight-bold mb-3">Aksi Cepat</h2>
      </v-col>

      <v-col cols="12" md="4">
        <v-card
          to="/perusahaan/{{ idPerusahaan }}/jurnal"
          class="pa-4 d-flex flex-column justify-space-between"
          rounded="lg"
          elevation="2"
        >
          <div>
            <h3 class="text-subtitle-1 font-weight-bold mb-2">Buat Jurnal Baru</h3>
            <p class="text-body-2 text-grey-darken-1">
              Catat transaksi perusahaan Anda dengan cepat dan tepat.
            </p>
          </div>
          <v-btn
            color="primary"
            class="mt-4"
            prepend-icon="mdi-plus-circle"
            variant="flat"
          >
            Buat Jurnal
          </v-btn>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card
          class="pa-4"
          rounded="lg"
          elevation="2"
          :to="`/perusahaan/${idPerusahaan}/transaksi-kas`"
        >
          <h3 class="text-subtitle-1 font-weight-bold mb-2">Transaksi Kas</h3>
          <p class="text-body-2 text-grey-darken-1">
            Kelola pemasukan dan pengeluaran kas harian perusahaan.
          </p>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card
          class="pa-4"
          rounded="lg"
          elevation="2"
          :to="`/perusahaan/${idPerusahaan}/laporan`"
        >
          <h3 class="text-subtitle-1 font-weight-bold mb-2">Laporan</h3>
          <p class="text-body-2 text-grey-darken-1">
            Lihat laporan keuangan lengkap perusahaan Anda.
          </p>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
