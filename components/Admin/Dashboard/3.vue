<template>
  <v-card variant="flat" class="border rounded-xl pa-2">
    <v-card-item class="pb-4">
      <template v-slot:prepend>
        <v-icon
          icon="mdi-swap-vertical-circle"
          color="indigo"
          size="large"
          class="me-2"
        ></v-icon>
      </template>
      <v-card-title class="text-h6 font-weight-bold">
        Aktivitas Transaksi
      </v-card-title>
      <template v-slot:append>
        <v-btn
          variant="tonal"
          color="indigo"
          class="text-none font-weight-bold rounded-lg"
          size="small"
          prepend-icon="mdi-eye-outline"
          to="/admin/transaksi-kas"
        >
          Lihat Semua
        </v-btn>
      </template>
    </v-card-item>

    <v-divider class="mx-4 mb-2" opacity="0.05"></v-divider>

    <v-list bg-transparent class="pa-2">
      <v-list-item
        v-for="(item, index) in transaksiTerbaru"
        :key="index"
        class="rounded-lg mb-2 py-3 px-4 transition-all"
        :ripple="true"
      >
        <template v-slot:prepend>
          <v-avatar
            :color="
              item.jenis === 'Pemasukan'
                ? 'success-lighten-5'
                : 'error-lighten-5'
            "
            size="48"
            class="me-4"
          >
            <v-icon
              :color="item.jenis === 'Pemasukan' ? 'success' : 'error'"
              :icon="
                item.jenis === 'Pemasukan'
                  ? 'mdi-arrow-bottom-left'
                  : 'mdi-arrow-top-right'
              "
            ></v-icon>
          </v-avatar>
        </template>

        <v-list-item-title class="font-weight-bold text-body-1 mb-1">
          {{ item.deskripsi }}
        </v-list-item-title>
        <v-list-item-subtitle class="d-flex align-center opacity-70">
          <v-chip size="x-small" variant="flat" class="me-2 font-weight-medium">
            {{ item.kas }}
          </v-chip>
          <span class="text-caption">{{ item.tanggal }}</span>
        </v-list-item-subtitle>

        <template v-slot:append>
          <div class="text-right">
            <div
              :class="
                item.jenis === 'Pemasukan' ? 'text-success' : 'text-error'
              "
              class="text-subtitle-1 font-weight-bold"
            >
              {{ item.jenis === "Pemasukan" ? "+" : "-" }} Rp
              {{ formatRupiah(item.jumlah) }}
            </div>
            <div class="text-caption text-grey">Selesai</div>
          </div>
        </template>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script setup>
const formatRupiah = (value) => {
  return value.toLocaleString("id-ID");
};

const transaksiTerbaru = [
  {
    deskripsi: "Penjualan Tunai",
    tanggal: "23 Feb 2024",
    kas: "Kas Kecil",
    jenis: "Pemasukan",
    jumlah: 2500000,
  },
  {
    deskripsi: "Pembelian Stok Barang",
    tanggal: "23 Feb 2024",
    kas: "Bank BCA",
    jenis: "Pengeluaran",
    jumlah: 1750000,
  },
  {
    deskripsi: "Pembayaran Listrik",
    tanggal: "22 Feb 2024",
    kas: "Kas Kecil",
    jenis: "Pengeluaran",
    jumlah: 850000,
  },
  {
    deskripsi: "Setor Tunai",
    tanggal: "22 Feb 2024",
    kas: "Bank Mandiri",
    jenis: "Pemasukan",
    jumlah: 5000000,
  },
  {
    deskripsi: "Pendapatan Jasa Service",
    tanggal: "21 Feb 2024",
    kas: "Bank BCA",
    jenis: "Pemasukan",
    jumlah: 1200000,
  },
  {
    deskripsi: "Biaya Transportasi Kurir",
    tanggal: "21 Feb 2024",
    kas: "Kas Kecil",
    jenis: "Pengeluaran",
    jumlah: 150000,
  },
  {
    deskripsi: "Gaji Karyawan Harian",
    tanggal: "20 Feb 2024",
    kas: "Bank Mandiri",
    jenis: "Pengeluaran",
    jumlah: 3000000,
  },
];
</script>

<style scoped>
.transition-all {
  transition: all 0.2s ease-in-out;
}

.v-list-item:hover {
  background-color: #f8fafc !important;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

/* Custom warna pastel jika Vuetify theme belum didefinisikan secara spesifik */
.bg-success-lighten-5 {
  background-color: #f0fdf4 !important;
}
.bg-error-lighten-5 {
  background-color: #fef2f2 !important;
}
</style>
