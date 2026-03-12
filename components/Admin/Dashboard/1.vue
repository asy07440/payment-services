<template>
  <v-row>
    <v-col v-for="(stat, index) in stats" :key="index" cols="12" sm="6" lg="3">
      <v-card variant="flat" class="rounded-xl pa-4 fill-height">
        <div class="d-flex justify-space-between align-center mb-2">
          <div>
            <div class="text-subtitle-1 font-weight-medium text-grey-darken-1">
              {{ stat.title }}
            </div>
            <div class="text-h4 font-weight-bold">
              {{ stat.value }}
            </div>
          </div>

          <v-avatar :color="stat.iconBg" size="56">
            <v-icon :color="stat.iconColor" size="28">{{ stat.icon }}</v-icon>
          </v-avatar>
        </div>

        <div class="d-flex align-center mt-4">
          <v-chip
            :color="stat.trend.isUp ? 'success' : 'error'"
            :variant="stat.trend.isUp ? 'tonal' : 'tonal'"
            size="small"
            class="font-weight-bold mr-2"
          >
            <v-icon start size="14">
              {{ stat.trend.isUp ? "mdi-arrow-up" : "mdi-arrow-down" }}
            </v-icon>
            {{ stat.trend.value }}
          </v-chip>
          <span class="text-caption text-grey-darken-1">{{ stat.period }}</span>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup>
definePageMeta({
  layout: "admin",
});

const stats = [
  {
    title: "Saldo Kas",
    value: "Rp 178,5 Jt",
    trend: { value: "+12,5%", isUp: true },
    icon: "mdi-cash-multiple",
    iconBg: "indigo-lighten-4",
    iconColor: "indigo-accent-2",
    period: "dari bulan lalu",
  },
  {
    title: "Pemasukan Hari Ini",
    value: "Rp 25,7 Jt",
    trend: { value: "+8,3%", isUp: true },
    icon: "mdi-cash-plus",
    iconBg: "green-lighten-4",
    iconColor: "green-darken-2",
    period: "dari kemarin",
  },
  {
    title: "Pengeluaran Hari Ini",
    value: "Rp 12,4 Jt",
    trend: { value: "-5,2%", isUp: false },
    icon: "mdi-cash-minus",
    iconBg: "red-lighten-4",
    iconColor: "red-darken-1",
    period: "dari kemarin",
  },
  {
    title: "Total Transaksi",
    value: "156",
    trend: { value: "+23", isUp: true },
    icon: "mdi-cash-register",
    iconBg: "orange-lighten-4",
    iconColor: "orange-darken-2",
    period: "transaksi hari ini",
  },
];
</script>

<style scoped>
.v-card {
  border: 1px solid rgba(0, 0, 0, 0.05) !important;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.v-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.1) !important;
}
</style>
