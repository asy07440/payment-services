<template>
  <v-row>
    <v-col cols="12" md="8">
      <v-card variant="flat" class="rounded-lg pa-4" height="100%">
        <div class="d-flex justify-space-between align-center mb-6">
          <v-card-title class="text-h6 font-weight-bold"
            >Arus Kas Bulanan</v-card-title
          >

          <v-menu offset="4">
            <template v-slot:activator="{ props }">
              <v-btn
                variant="outlined"
                color="grey-lighten-1"
                class="text-none text-grey-darken-3"
                append-icon="mdi-chevron-down"
                v-bind="props"
              >
                Tahun 2024
              </v-btn>
            </template>
            <v-list class="rounded-lg">
              <v-list-item
                v-for="item in ['2023', '2022', '2021']"
                :key="item"
              >
                <v-list-item-title>{{ item }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>

        <div style="height: 400px; position: relative">
          <Bar :data="barChartData" :options="barChartOptions" />
        </div>

        <v-row justify="center" class="mt-4" no-gutters>
          <div class="d-flex align-center mx-3">
            <v-badge dot color="#4CAF50" inline class="mr-2"></v-badge>
            <span class="text-caption font-weight-bold">Pemasukan</span>
          </div>
          <div class="d-flex align-center mx-3">
            <v-badge dot color="#F44336" inline class="mr-2"></v-badge>
            <span class="text-caption font-weight-bold">Pengeluaran</span>
          </div>
          <div class="d-flex align-center mx-3">
            <v-badge dot color="#2196F3" inline class="mr-2"></v-badge>
            <span class="text-caption font-weight-bold">Saldo Akhir</span>
          </div>
        </v-row>
      </v-card>
    </v-col>

    <v-col cols="12" md="4">
      <v-card variant="flat" class="rounded-lg pa-4" height="100%">
        <div class="d-flex justify-space-between align-center mb-6">
          <v-card-title class="text-h6 font-weight-bold"
            >Distribusi Pengeluaran</v-card-title
          >
          <v-select
            density="compact"
            variant="outlined"
            hide-details
            style="max-width: 120px"
            :items="['Bulan Ini', 'Bulan Lalu']"
            model-value="Bulan Ini"
          ></v-select>
        </div>

        <div style="height: 350px">
          <PolarArea :data="polarChartData" :options="polarChartOptions" />
        </div>

        <v-row justify="center" class="mt-6 px-2" no-gutters>
          <v-col
            v-for="(item, i) in pengeluaranKategori"
            :key="i"
            cols="auto"
            class="ma-1"
          >
            <div class="d-flex align-center">
              <v-icon size="small" :color="polarColors[i]" class="mr-1"
                >mdi-circle</v-icon
              >
              <span class="text-caption font-weight-bold text-grey-darken-2">{{
                item
              }}</span>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
import { Bar, PolarArea } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  RadialLinearScale,
  ArcElement,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  RadialLinearScale,
  ArcElement,
);

// --- Data untuk BAR CHART (Arus Kas Bulanan) ---
const bulan = [
  "Jan", "Feb", "Mar", "Apr", "Mei", "Jun", 
  "Jul", "Agu", "Sep", "Okt", "Nov", "Des"
];

// Data dalam Juta Rupiah
const pemasukanData = [125, 140, 135, 150, 165, 170, 180, 190, 185, 200, 210, 220];
const pengeluaranData = [80, 95, 85, 100, 110, 115, 120, 125, 130, 135, 140, 145];
const saldoAkhirData = [45, 45, 50, 50, 55, 55, 60, 65, 55, 65, 70, 75];

const barChartData = {
  labels: bulan,
  datasets: [
    {
      label: "Pemasukan",
      data: pemasukanData,
      backgroundColor: "#4CAF50",
      borderRadius: 4,
      barPercentage: 0.6,
      categoryPercentage: 0.5,
    },
    {
      label: "Pengeluaran",
      data: pengeluaranData,
      backgroundColor: "#F44336",
      borderRadius: 4,
      barPercentage: 0.6,
      categoryPercentage: 0.5,
    },
    {
      label: "Saldo Akhir", // Line chart untuk saldo
      type: "line",
      data: saldoAkhirData,
      borderColor: "#2196F3",
      borderWidth: 3,
      backgroundColor: "transparent",
      pointBackgroundColor: "#2196F3",
      pointBorderColor: "#FFF",
      pointRadius: 4,
      pointHoverRadius: 6,
      tension: 0.1,
      yAxisID: "y1",
    },
  ],
};

const barChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    y: {
      title: { display: true, text: "Juta Rupiah" },
      grid: { color: "#F5F5F5" },
      border: { display: false },
      beginAtZero: true,
    },
    y1: {
      position: "right",
      title: { display: true, text: "Saldo (Juta)" },
      grid: { drawOnChartArea: false },
      beginAtZero: true,
    },
    x: { grid: { display: false } },
  },
};

// --- Data untuk POLAR CHART (Distribusi Pengeluaran) ---
const pengeluaranKategori = [
  "Operasional",
  "Gaji Karyawan",
  "Pembelian Stok",
  "Utilitas",
  "Lainnya",
];

const polarColors = ["#FF7043", "#4CAF50", "#2196F3", "#FFC107", "#9C27B0"];

const polarChartData = {
  labels: pengeluaranKategori,
  datasets: [
    {
      data: [35, 25, 20, 12, 8], // Persentase
      backgroundColor: polarColors.map((c) => c + "CC"),
      borderWidth: 0,
    },
  ],
};

const polarChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    r: {
      ticks: { display: false, stepSize: 10 },
      grid: { color: "#EEE" },
    },
  },
};
</script>

<style scoped>
.v-card {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05) !important;
  border: 1px solid #ededed !important;
}
</style>