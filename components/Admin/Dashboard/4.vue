<script setup>
const formatRupiah = (value) => {
  return value.toLocaleString("id-ID");
};

const jurnalTerbaru = [
  {
    deskripsi: "Penjualan Tunai",
    akunDebit: "Kas Kecil",
    akunKredit: "Pendapatan Penjualan",
    nominal: 2500000,
    jenis: "Pemasukan",
    waktu: "10 menit lalu",
    noRef: "JRN-2024-00123",
    status: "Posted",
    icon: "mdi-cash-plus",
    iconBg: "success-lighten-5",
    iconColor: "success-darken-2",
  },
  {
    deskripsi: "Pembelian Perlengkapan",
    akunDebit: "Perlengkapan Kantor",
    akunKredit: "Kas Kecil",
    nominal: 850000,
    jenis: "Pengeluaran",
    waktu: "1 jam lalu",
    noRef: "JRN-2024-00122",
    status: "Posted",
    icon: "mdi-cart-minus",
    iconBg: "error-lighten-5",
    iconColor: "error-darken-2",
  },
  {
    deskripsi: "Pembayaran Listrik",
    akunDebit: "Beban Listrik",
    akunKredit: "Bank BCA",
    nominal: 1250000,
    jenis: "Pengeluaran",
    waktu: "3 jam lalu",
    noRef: "JRN-2024-00121",
    status: "Posted",
    icon: "mdi-lightning-bolt",
    iconBg: "warning-lighten-5",
    iconColor: "warning-darken-2",
  },
];
</script>

<template>
  <v-card variant="flat" class="border rounded-xl shadow-sm hover-card">
    <v-card-title class=" d-flex align-center">
      <div class="d-flex align-center">
        <v-icon
          icon="mdi-notebook-edit-outline"
          size="24"
          class="mr-3 text-primary"
        ></v-icon>
        <div>
          <div class="text-h6 font-weight-bold leading-tight">
            Jurnal Terbaru
          </div>
          <div class="text-caption text-medium-emphasis">
            Ringkasan aktivitas transaksi terakhir
          </div>
        </div>
      </div>
      <v-spacer></v-spacer>
      <v-chip
        size="x-small"
        variant="flat"
        color="primary-lighten-5"
        class="text-primary font-weight-bold"
      >
        {{ jurnalTerbaru.length }} Transaksi
      </v-chip>
    </v-card-title>

    <v-divider class="mb-4" />

    <v-timeline
      side="end"
      align="start"
    >
      <v-timeline-item
        v-for="(jurnal, index) in jurnalTerbaru"
        :key="index"
        size="small"
        dot-color="transparent"
      >
        <template v-slot:icon>
          <v-avatar
            :color="jurnal.iconBg"
            size="38"
            class="border-sm"
            :style="{
              borderColor: `rgba(var(--v-theme-${jurnal.iconColor}), 0.2) !important`,
            }"
          >
            <v-icon
              :color="jurnal.iconColor"
              :icon="jurnal.icon"
              size="18"
            ></v-icon>
          </v-avatar>
        </template>

        <div class="pb-6">
          <div class="d-flex justify-space-between align-start">
            <div>
              <div class="text-subtitle-2 font-weight-bold text-grey-darken-4">
                {{ jurnal.deskripsi }}
              </div>
              <div class="text-caption text-disabled d-flex align-center mt-n1">
                <v-icon size="12" class="mr-1">mdi-clock-outline</v-icon>
                {{ jurnal.waktu }}
              </div>
            </div>

            <div class="text-right">
              <div
                class="text-subtitle-2 font-weight-black"
                :class="
                  jurnal.jenis === 'Pemasukan' ? 'text-success' : 'text-error'
                "
              >
                {{ jurnal.jenis === "Pemasukan" ? "+" : "-" }} Rp
                {{ formatRupiah(jurnal.nominal) }}
              </div>
              <div class="text-caption text-grey-darken-1 font-italic">
                {{ jurnal.noRef }}
              </div>
            </div>
          </div>

          <v-sheet
            color="grey-lighten-5"
            class="pa-2 rounded-lg mt-3 border-dashed border-thin"
          >
            <div class="d-flex align-center text-caption">
              <div class="flex-1">
                <span class="text-grey-darken-1">Dr:</span>
                <span class="font-weight-bold ml-1 text-blue-darken-2">{{
                  jurnal.akunDebit
                }}</span>
              </div>
              <v-icon size="14" class="mx-2 text-disabled"
                >mdi-arrow-right</v-icon
              >
              <div class="flex-1 text-right">
                <span class="text-grey-darken-1">Cr:</span>
                <span class="font-weight-bold ml-1 text-orange-darken-2">{{
                  jurnal.akunKredit
                }}</span>
              </div>
            </div>
          </v-sheet>

          <div class="mt-2">
            <v-chip
              size="x-small"
              :color="jurnal.status === 'Posted' ? 'success' : 'warning'"
              variant="tonal"
              class="font-weight-bold"
            >
              <v-icon start size="10">{{
                jurnal.status === "Posted"
                  ? "mdi-check-circle"
                  : "mdi-circle-slice-8"
              }}</v-icon>
              {{ jurnal.status }}
            </v-chip>
          </div>
        </div>
      </v-timeline-item>
    </v-timeline>

    <v-btn
      variant="flat"
      color="grey-lighten-4"
      to="/admin/jurnal"
      block
      class="text-none font-weight-bold text-primary"
    >
      Lihat Laporan Lengkap
      <v-icon end size="18">mdi-chevron-right</v-icon>
    </v-btn>
  </v-card>
</template>

<style scoped>
.hover-card {
  transition: all 0.3s ease;
}

</style>
