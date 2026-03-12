<template>
  <v-card class="pa-4 rounded-xl border" variant="flat">
    <v-card-title class="text-h6 font-weight-bold px-4 mb-2 d-flex align-center">
      <v-icon icon="mdi-chart-bar" size="22" class="mr-2 text-primary"></v-icon>
      Laporan Keuangan
    </v-card-title>

    <v-list lines="two" class="bg-transparent">
      <v-list-item
        v-for="(laporan, index) in laporanList"
        :key="index"
        class="px-4 py-2"
        :to="laporan.to"
        :disabled="laporan.disabled"
      >
        <template v-slot:prepend>
          <v-avatar :color="laporan.color" variant="tonal" size="50" class="mr-4">
            <v-icon :icon="laporan.icon" size="24"></v-icon>
          </v-avatar>
        </template>

        <v-list-item-title class="font-weight-bold text-subtitle-1">
          {{ laporan.title }}
        </v-list-item-title>
        <v-list-item-subtitle class="text-grey-darken-1">
          {{ laporan.subtitle }}
        </v-list-item-subtitle>

        <template v-slot:append>
          <div class="text-right">
            <div class="font-weight-bold" :class="laporan.trendColor">
              {{ laporan.nominal }}
            </div>
            <div class="text-caption text-grey">
              {{ laporan.period }}
            </div>
          </div>
        </template>
      </v-list-item>
    </v-list>

    <!-- Quick Action untuk buat laporan -->
    <v-divider class="my-2"></v-divider>
    
    <div class="d-flex justify-space-between align-center px-4 py-2">
      <span class="text-subtitle-2 text-grey-darken-1">
        Periode: {{ selectedPeriod }}
      </span>
      
      <v-btn
        variant="flat"
        color="primary"
        size="small"
        prepend-icon="mdi-file-download"
        class="text-none"
        to="/admin/laporan"
      >
        Lihat Semua
      </v-btn>
    </div>
  </v-card>
</template>

<script setup>
const formatRupiah = (value) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

const selectedPeriod = 'Februari 2024';

const laporanList = [
  {
    title: 'Laporan Laba Rugi',
    subtitle: 'Ringkasan pendapatan & beban',
    icon: 'mdi-chart-line',
    color: 'success-lighten-5',
    nominal: 'Laba Rp 87,5 Jt',
    trendColor: 'text-success',
    period: 'Bulan Ini',
    to: '/admin/laporan/laba-rugi'
  },
  {
    title: 'Neraca Keuangan',
    subtitle: 'Aset, kewajiban, ekuitas',
    icon: 'mdi-scale-balance',
    color: 'info-lighten-5',
    nominal: 'Rp 456,8 Jt',
    trendColor: 'text-info',
    period: 'Total Aset',
    to: '/admin/laporan/neraca'
  },
  {
    title: 'Arus Kas',
    subtitle: 'Pemasukan & pengeluaran',
    icon: 'mdi-cash-multiple',
    color: 'warning-lighten-5',
    nominal: 'Kas Masuk Rp 178 Jt',
    trendColor: 'text-warning',
    period: 'YTD',
    to: '/admin/laporan/arus-kas'
  },
  {
    title: 'Jurnal Umum',
    subtitle: 'Semua transaksi periode ini',
    icon: 'mdi-notebook-edit',
    color: 'purple-lighten-5',
    nominal: '245 Entri',
    trendColor: 'text-purple',
    period: 'Bulan Ini',
    to: '/admin/jurnal'
  },
  {
    title: 'Buku Besar',
    subtitle: 'Rekap per akun',
    icon: 'mdi-book-open-page-variant',
    color: 'deep-orange-lighten-5',
    nominal: '32 Akun Aktif',
    trendColor: 'text-deep-orange',
    period: 'Aktif',
    to: '/admin/laporan/buku-besar',
    disabled: true // Dalam pengembangan
  },
  {
    title: 'Laporan Hutang Piutang',
    subtitle: 'Tagihan pelanggan & vendor',
    icon: 'mdi-account-cash',
    color: 'error-lighten-5',
    nominal: 'Rp 24,2 Jt Terhutang',
    trendColor: 'text-error',
    period: 'Jatuh Tempo',
    to: '/admin/laporan/hutang-piutang'
  },
  {
    title: 'Laporan Stok Barang',
    subtitle: 'Nilai dan mutasi inventaris',
    icon: 'mdi-package-variant-closed',
    color: 'teal-lighten-5',
    nominal: '1.250 Unit',
    trendColor: 'text-teal',
    period: 'Update Hari Ini',
    to: '/admin/laporan/stok'
  }
];
</script>

<style scoped>
.v-list-item {
  transition: background-color 0.2s;
}

.v-list-item:hover:not(.v-list-item--disabled) {
  background-color: rgba(0, 0, 0, 0.02);
}

.v-list-item--disabled {
  opacity: 0.6;
}

:deep(.v-list-item-title) {
  letter-spacing: -0.2px;
}
</style>