<template>
  <ConfirmationDialog ref="confirmationDialog" />

  <!-- Breadcrumb -->
  <v-row align="center" class="mb-4">
    <v-col cols="12">
      <v-breadcrumbs>
        <v-breadcrumbs-item active>
          <span class="font-weight-medium text-h5"> Dashboard </span>
        </v-breadcrumbs-item>
      </v-breadcrumbs>
    </v-col>
  </v-row>

  <!-- Summary Widget / Stats Cards -->
  <v-row class="mb-6">
    <v-col cols="12" sm="6" md="3">
      <v-card class="stat-card" elevation="2">
        <v-card-text class="d-flex align-center">
          <div class="stat-icon bg-primary">
            <v-icon icon="mdi-currency-usd" size="28" color="white" />
          </div>
          <div class="stat-content ml-4">
            <div class="stat-label">Total Revenue</div>
            <div class="stat-value">Rp {{ formatNumber(stats.totalRevenue) }}</div>
            <div class="stat-detail">Dari {{ stats.completed }} transaksi</div>
          </div>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12" sm="6" md="3">
      <v-card class="stat-card" elevation="2">
        <v-card-text class="d-flex align-center">
          <div class="stat-icon bg-success">
            <v-icon icon="mdi-check-circle" size="28" color="white" />
          </div>
          <div class="stat-content ml-4">
            <div class="stat-label">Completed</div>
            <div class="stat-value">{{ stats.completed }}</div>
            <div class="stat-detail">{{ ((stats.completed / stats.total) * 100 || 0).toFixed(1) }}% dari total</div>
          </div>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12" sm="6" md="3">
      <v-card class="stat-card" elevation="2">
        <v-card-text class="d-flex align-center">
          <div class="stat-icon bg-warning">
            <v-icon icon="mdi-clock-outline" size="28" color="white" />
          </div>
          <div class="stat-content ml-4">
            <div class="stat-label">Processing</div>
            <div class="stat-value">{{ stats.processing }}</div>
            <div class="stat-detail">{{ ((stats.processing / stats.total) * 100 || 0).toFixed(1) }}% dari total</div>
          </div>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12" sm="6" md="3">
      <v-card class="stat-card" elevation="2">
        <v-card-text class="d-flex align-center">
          <div class="stat-icon bg-error">
            <v-icon icon="mdi-alert-circle" size="28" color="white" />
          </div>
          <div class="stat-content ml-4">
            <div class="stat-label">Failed</div>
            <div class="stat-value">{{ stats.failed }}</div>
            <div class="stat-detail">{{ ((stats.failed / stats.total) * 100 || 0).toFixed(1) }}% dari total</div>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>

  <!-- Filter Tabs -->
  <v-card class="mb-4" elevation="1">
    <v-tabs v-model="data.activeTab" color="primary" @update:model-value="handleTabChange">
      <v-tab value="all">Semua Payments</v-tab>
      <v-tab value="completed">Completed</v-tab>
      <v-tab value="processing">Processing</v-tab>
      <v-tab value="failed">Failed</v-tab>
    </v-tabs>
  </v-card>

  <!-- Main Card -->
  <v-card flat rounded="lg" class="border">
    <v-card-title class="d-flex align-center justify-space-between py-3 px-4">
      <div class="d-flex align-center" style="height: 40px">
        <span class="text-h6">Daftar Payments Terbaru</span>
      </div>

      <!-- Tombol di kanan -->
      <div class="d-flex align-center">
        <v-btn
          color="white"
          flat
          size="30"
          class="mr-3 border"
          @click="refreshData"
        >
          <v-icon icon="mdi-cached" size="20" />
          <v-tooltip activator="parent" location="top">
            Refresh Data
          </v-tooltip>
        </v-btn>

        <v-btn
          :style="{ backgroundColor: '#005BAC', color: 'white' }"
          size="40"
          to="/admin/payments"
          class="d-flex align-center justify-center"
        >
          <v-icon icon="mdi-arrow-right" size="20" />
          <v-tooltip activator="parent" location="top">
            Lihat Semua Payments
          </v-tooltip>
        </v-btn>
      </div>
    </v-card-title>

    <v-divider class="my-0" />

    <v-card-text>
      <!-- Loading State -->
      <div v-if="paymentStore.loading" class="text-center py-6">
        <v-progress-circular indeterminate color="primary" size="40" />
        <p class="mt-2 text-grey">Memuat data payments...</p>
      </div>

      <!-- Data Table -->
      <v-data-table
        v-else
        :headers="data.headPayment"
        :items="displayedPayments"
        density="comfortable"
        class="rounded-lg payment-table"
        :sort-by="[{ key: 'date', order: 'desc' }]"
      >
        <template v-slot:item.no="{ index }">
          {{ index + 1 }}.
        </template>

        <template v-slot:item.paymentId="{ item }">
          <span class="font-weight-medium">{{ item.paymentId }}</span>
        </template>

        <template v-slot:item.amount="{ item }">
          Rp {{ formatNumber(item.amount) }}
        </template>

        <template v-slot:item.date="{ item }">
          {{ formatDate(item.date) }}
        </template>

        <template v-slot:item.status="{ item }">
          <v-chip
            :color="getStatusColor(item.status)"
            size="small"
            class="status-chip"
          >
            <v-icon start :icon="getStatusIcon(item.status)" size="14" />
            {{ item.status }}
          </v-chip>
        </template>

        <template v-slot:item.aksi="{ item }">
          <v-row justify="center" align="center">
            <v-btn
              color="#365B97"
              size="20"
              @click="viewDetail(item)"
              class="ma-2"
            >
              <v-icon size="13">mdi-eye</v-icon>
              <v-tooltip activator="parent" location="top">Lihat Detail</v-tooltip>
            </v-btn>
          </v-row>
        </template>

        <!-- Empty State -->
        <template v-slot:no-data>
          <div class="text-center py-8">
            <v-icon icon="mdi-credit-card-off" size="48" color="grey-lighten-1" />
            <p class="text-grey mt-2">Tidak ada data payment</p>
          </div>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>

  <!-- Dialog Detail Payment (sama seperti di halaman payments) -->
  <v-dialog
    v-model="data.dialogDetail"
    :width="$vuetify.display.mdAndUp ? '600px' : '380px'"
  >
    <v-card>
      <v-card-title
        class="font-weight-bold text-white pa-3 text-center"
        style="background: linear-gradient(to top, #0059f0, #0982f6, #0e96f9)"
      >
        DETAIL PAYMENT
      </v-card-title>

      <v-card-text class="pa-6">
        <v-row>
          <v-col cols="12" class="pb-0">
            <div class="text-subtitle-2 font-weight-bold text-grey">Payment ID</div>
            <div class="text-h6 mb-3">{{ selectedPayment.paymentId }}</div>
          </v-col>

          <v-col cols="12" sm="6" class="pb-0">
            <div class="text-subtitle-2 font-weight-bold text-grey">Merchant Name</div>
            <div class="text-body-1 mb-3">{{ selectedPayment.merchantName }}</div>
          </v-col>

          <v-col cols="12" sm="6" class="pb-0">
            <div class="text-subtitle-2 font-weight-bold text-grey">Date</div>
            <div class="text-body-1 mb-3">{{ formatDate(selectedPayment.date) }}</div>
          </v-col>

          <v-col cols="12" sm="6" class="pb-0">
            <div class="text-subtitle-2 font-weight-bold text-grey">Amount</div>
            <div class="text-body-1 mb-3 font-weight-bold text-primary">
              Rp {{ formatNumber(selectedPayment.amount) }}
            </div>
          </v-col>

          <v-col cols="12" sm="6" class="pb-0">
            <div class="text-subtitle-2 font-weight-bold text-grey">Status</div>
            <v-chip
              :color="getStatusColor(selectedPayment.status)"
              size="small"
              class="mt-1"
            >
              {{ selectedPayment.status }}
            </v-chip>
          </v-col>

          <v-col cols="12" class="pb-0" v-if="selectedPayment.customerEmail">
            <div class="text-subtitle-2 font-weight-bold text-grey">Customer Email</div>
            <div class="text-body-1 mb-3">{{ selectedPayment.customerEmail }}</div>
          </v-col>

          <v-col cols="12" class="pb-0" v-if="selectedPayment.paymentMethod">
            <div class="text-subtitle-2 font-weight-bold text-grey">Payment Method</div>
            <div class="text-body-1 mb-3">{{ selectedPayment.paymentMethod }}</div>
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider />

      <v-card-actions class="pa-3 bg-grey-lighten-4">
        <v-spacer />
        <v-btn
          color="primary"
          @click="data.dialogDetail = false"
          variant="flat"
          class="text-capitalize px-6"
          size="small"
        >
          Tutup
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import type { ConfirmationDialog } from "#components";
import _ from "lodash";
import { usePaymentStore } from "~/stores/paymentStore";
import type { paymentM } from "~/types/payment";

definePageMeta({
  layout: "admin",
});

const paymentStore = usePaymentStore();
const notificationStore = useNotificationStore();
const confirmationDialog = ref<InstanceType<typeof ConfirmationDialog> | null>(null);

// Selected payment untuk detail
const selectedPayment = ref<paymentM>({
  id: "",
  paymentId: "",
  merchantName: "",
  date: 0,
  amount: 0,
  status: "",
  customerEmail: "",
  paymentMethod: "",
});

// State
const data = reactive({
  activeTab: "all",
  dialogDetail: false,

  headPayment: [
    { title: "No", value: "no", width: "50px" },
    { title: "Payment ID", value: "paymentId", sortable: true },
    { title: "Merchant Name", value: "merchantName", sortable: true },
    { title: "Date", value: "date", sortable: true },
    { title: "Amount", value: "amount", align: "end" as const, sortable: true },
    { title: "Status", value: "status", align: "center" as const, sortable: true },
    { title: "Aksi", align: "center" as const, value: "aksi", width: "80px" },
  ],
});

// Stats dari store
const stats = computed(() => {
  return paymentStore.getStats;
});

// Payments yang ditampilkan (filter by tab)
const displayedPayments = computed(() => {
  if (data.activeTab === "all") {
    return paymentStore.getDataPayment.slice(0, 10); // Tampilkan 10 data terbaru
  }
  return paymentStore.getDataPayment
    .filter(p => p.status === data.activeTab)
    .slice(0, 10);
});

// Handle tab change
const handleTabChange = () => {
  // Sudah otomatis terfilter oleh computed
};

// Lihat detail payment
const viewDetail = (item: paymentM) => {
  selectedPayment.value = _.cloneDeep(item);
  data.dialogDetail = true;
};

// Helper functions
const formatNumber = (value: number) => {
  return new Intl.NumberFormat("id-ID").format(value);
};

const formatDate = (timestamp: number) => {
  if (!timestamp) return "-";
  return new Date(timestamp).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    completed: "success",
    processing: "warning",
    failed: "error",
  };
  return colors[status] || "grey";
};

const getStatusIcon = (status: string) => {
  const icons: Record<string, string> = {
    completed: "mdi-check-circle",
    processing: "mdi-clock-outline",
    failed: "mdi-alert-circle",
  };
  return icons[status] || "mdi-circle";
};

// Refresh data
const refreshData = async () => {
  await paymentStore.refreshDataAct();
  notificationStore.showSuccess("Data berhasil diperbarui");
};

// Load data saat komponen dimount
onMounted(async () => {
  await paymentStore.tarikDataPaymentAct();
});
</script>

<style scoped>
.stat-card {
  transition: transform 0.2s;
  border-radius: 12px;
  cursor: pointer;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1) !important;
}

.stat-icon {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-label {
  font-size: 0.85rem;
  color: rgba(0, 0, 0, 0.6);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.2;
}

.stat-detail {
  font-size: 0.75rem;
  color: rgba(0, 0, 0, 0.5);
  margin-top: 4px;
}

.status-chip {
  text-transform: capitalize;
  font-weight: 500;
  min-width: 100px;
}

.payment-table :deep(thead th) {
  font-weight: bold !important;
  background-color: #f7f8f9 !important;
  border-right: 1px solid #e0e0e0 !important;
}

.payment-table :deep(tbody td) {
  border-right: 1px solid #e0e0e0 !important;
}

.payment-table :deep(.v-data-table) {
  border: 1px solid #e0e0e0;
}

/* Animasi untuk tabs */
:deep(.v-tab) {
  text-transform: capitalize;
  font-weight: 500;
  letter-spacing: 0.3px;
}

:deep(.v-tab--selected) {
  font-weight: 600;
}
</style>