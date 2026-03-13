<template>
  <ConfirmationDialog ref="confirmationDialog" />

  <!-- Dialog Tambah Payment -->
  <v-dialog
    v-model="data.dialogAdd"
    :width="$vuetify.display.mdAndUp ? '450px' : '380px'"
  >
    <v-card>
      <v-card-title
        class="font-weight-bold text-white pa-3 text-center"
        style="background: linear-gradient(to top, #0059f0, #0982f6, #0e96f9)"
      >
        TAMBAH PAYMENT
      </v-card-title>

      <v-card-text class="pa-4">
        <a-text-field
          v-model="newPayment.paymentId"
          label="Payment ID"
          class="mb-3"
          placeholder="INV-2024-00001"
        />

        <a-text-field
          v-model="newPayment.merchantName"
          label="Merchant Name"
          class="mb-3"
          placeholder="Toko ABC"
        />

        <v-row>
          <v-col cols="12" sm="6" >
            <a-text-field
              v-model="newPayment.amount"
              label="Amount"
              type="number"
              class="mb-3"
              placeholder="100000"
              prefix="Rp"
            />
          </v-col>

          <v-col cols="12" sm="6" >
            <a-select
              v-model="newPayment.status"
              :items="statusOptions"
              label="Status"
              class="mb-3"
              density="comfortable"
              variant="outlined"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6" >
            <a-text-field
              v-model="newPayment.customerEmail"
              label="Customer Email"
              class="mb-3"
              placeholder="customer@example.com"
              type="email"
            />
          </v-col>

          <v-col cols="12" sm="6" >
            <v-select
              v-model="newPayment.paymentMethod"
              :items="paymentMethods"
              label="Payment Method"
              class="mb-3"
              density="comfortable"
              variant="outlined"
            />
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider />

      <v-card-actions class="pa-3 bg-grey-lighten-4">
        <v-btn
          variant="flat"
          color="grey-darken-2"
          @click="closeDialogAdd"
          class="text-capitalize px-3"
          size="small"
        >
          Batal
        </v-btn>

        <v-btn
          color="primary"
          @click="savePayment"
          variant="flat"
          class="text-capitalize px-3"
          size="small"
        >
          Simpan
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- Dialog Edit Payment -->
  <v-dialog
    v-model="data.dialogEdit"
    :width="$vuetify.display.mdAndUp ? '450px' : '380px'"
  >
    <v-card>
      <v-card-title
        class="font-weight-bold text-white pa-3 text-center"
        style="background: linear-gradient(to top, #0059f0, #0982f6, #0e96f9)"
      >
        EDIT PAYMENT
      </v-card-title>

      <v-card-text class="pa-4">
        <a-text-field
          v-model="editPayment.paymentId"
          label="Payment ID"
          class="mb-3"
          disabled
        />

        <a-text-field
          v-model="editPayment.merchantName"
          label="Merchant Name"
          class="mb-3"
        />

        <v-row>
          <v-col cols="12" sm="6" >
            <a-text-field
              v-model="editPayment.amount"
              label="Amount"
              type="number"
              class="mb-3"
              prefix="Rp"
            />
          </v-col>

          <v-col cols="12" sm="6" >
            <v-select
              v-model="editPayment.status"
              :items="statusOptions"
              label="Status"
              class="mb-3"
              density="comfortable"
              variant="outlined"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6" >
            <a-text-field
              v-model="editPayment.customerEmail"
              label="Customer Email"
              class="mb-3"
              type="email"
            />
          </v-col>

          <v-col cols="12" sm="6" >
            <v-select
              v-model="editPayment.paymentMethod"
              :items="paymentMethods"
              label="Payment Method"
              class="mb-3"
              density="comfortable"
              variant="outlined"
            />
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider />

      <v-card-actions class="pa-3 bg-grey-lighten-4">
        <v-btn
          variant="flat"
          color="grey-darken-2"
          @click="closeDialogEdit"
          class="text-capitalize px-3"
          size="small"
        >
          Batal
        </v-btn>

        <v-btn
          color="primary"
          @click="updatePayment"
          variant="flat"
          class="text-capitalize px-3"
          size="small"
        >
          Update
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- Dialog Detail Payment -->
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

  <!-- Filter Cards / Summary Widget -->
  <v-row class="mb-4">
    <v-col cols="12" sm="6" md="3">
      <v-card class="stat-card" elevation="2" @click="filterByStatus('all')" :class="{ 'stat-card-active': data.activeFilter === 'all' }">
        <v-card-text class="d-flex align-center">
          <div class="stat-icon bg-primary">
            <v-icon icon="mdi-currency-usd" size="24" color="white" />
          </div>
          <div class="stat-content ml-3">
            <div class="stat-label">Total Revenue</div>
            <div class="stat-value">Rp {{ formatNumber(stats.totalRevenue) }}</div>
            <div class="stat-detail">{{ stats.total }} transaksi</div>
          </div>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12" sm="6" md="3">
      <v-card class="stat-card" elevation="2" @click="filterByStatus('completed')" :class="{ 'stat-card-active': data.activeFilter === 'completed' }">
        <v-card-text class="d-flex align-center">
          <div class="stat-icon bg-success">
            <v-icon icon="mdi-check-circle" size="24" color="white" />
          </div>
          <div class="stat-content ml-3">
            <div class="stat-label">Completed</div>
            <div class="stat-value">{{ stats.completed }}</div>
          </div>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12" sm="6" md="3">
      <v-card class="stat-card" elevation="2" @click="filterByStatus('processing')" :class="{ 'stat-card-active': data.activeFilter === 'processing' }">
        <v-card-text class="d-flex align-center">
          <div class="stat-icon bg-warning">
            <v-icon icon="mdi-clock-outline" size="24" color="white" />
          </div>
          <div class="stat-content ml-3">
            <div class="stat-label">Processing</div>
            <div class="stat-value">{{ stats.processing }}</div>
          </div>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12" sm="6" md="3">
      <v-card class="stat-card" elevation="2" @click="filterByStatus('failed')" :class="{ 'stat-card-active': data.activeFilter === 'failed' }">
        <v-card-text class="d-flex align-center">
          <div class="stat-icon bg-error">
            <v-icon icon="mdi-alert-circle" size="24" color="white" />
          </div>
          <div class="stat-content ml-3">
            <div class="stat-label">Failed</div>
            <div class="stat-value">{{ stats.failed }}</div>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>

  <!-- Main Card -->
  <v-row align="center">
    <v-col>
      <v-breadcrumbs>
        <v-breadcrumbs-item active>
          <span class="font-weight-medium text-h5"> Payments Management </span>
        </v-breadcrumbs-item>
      </v-breadcrumbs>
    </v-col>
  </v-row>

  <v-card flat rounded="lg" class="border">
    <v-card-title class="d-flex align-center justify-space-between py-3 px-4">
      <div class="d-flex align-center" style="height: 40px">
        <!-- Search di kiri -->
        <a-text-field
          v-model="data.search"
          placeholder="Cari Payment ID atau Merchant"
          density="compact"
          class="mr-3 custom-search-field"
          style="max-width: 350px; height: 40px"
          prepend-inner-icon="mdi-magnify"
        />
      </div>

      <!-- Tombol di kanan -->
      <div class="d-flex align-center">
        <!-- Filter Dropdown -->
        <v-select
          v-model="data.statusFilter"
          :items="statusOptions"
          label="Filter Status"
          density="compact"
          variant="outlined"
          hide-details
          class="mr-3"
          style="max-width: 180px; height: 40px;"
          @update:model-value="applyFilter"
          clearable
        />

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

        <!-- TOMBOL TAMBAH DATA (Sama seperti di Master Akun) -->
        <v-btn-toggle class="d-flex align-center" style="height: 30px">
          <v-btn
            :style="{ backgroundColor: '#005BAC', color: 'white' }"
            size="40"
            @click="openDialogAdd"
            class="d-flex align-center justify-center"
          >
            <v-icon icon="mdi-plus" size="20" />
          </v-btn>

          <v-btn
            :style="{ backgroundColor: '#0074D9', color: 'white' }"
            height="40"
            class="text-capitalize font-weight-medium px-3 d-flex align-center"
            @click="openDialogAdd"
          >
            Tambah Data
            <v-tooltip activator="parent" location="top">
              Tambah Payment
            </v-tooltip>
          </v-btn>
        </v-btn-toggle>
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
        :items="filteredPayments"
        :search="data.search"
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

        <!-- Kolom Aksi (Edit, Hapus, Detail) -->
        <template v-slot:item.aksi="{ item }">
          <v-row justify="center" align="center">
            <v-btn
              color="#365B97"
              size="20"
              @click="viewDetail(item)"
              class="ma-1"
            >
              <v-icon size="13">mdi-eye</v-icon>
              <v-tooltip activator="parent" location="top">Lihat Detail</v-tooltip>
            </v-btn>

            <v-btn
              color="#4CAF50"
              size="20"
              @click="openDialogEdit(item)"
              class="ma-1"
            >
              <v-icon size="13">mdi-pencil</v-icon>
              <v-tooltip activator="parent" location="top">Edit</v-tooltip>
            </v-btn>

            <v-btn
              color="red"
              size="20"
              @click="hapusPayment(item.id!)"
              class="ma-1"
            >
              <v-icon size="13">mdi-delete</v-icon>
              <v-tooltip activator="parent" location="top">Hapus</v-tooltip>
            </v-btn>
          </v-row>
        </template>

        <!-- Empty State -->
        <template v-slot:no-data>
          <div class="text-center py-8">
            <v-icon icon="mdi-credit-card-off" size="48" color="grey-lighten-1" />
            <p class="text-grey mt-2">Belum ada data payment</p>
            <v-btn
              color="primary"
              @click="openDialogAdd"
              class="mt-2"
              variant="flat"
            >
              Tambah Payment Pertama
            </v-btn>
          </div>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type { ConfirmationDialog } from "#components";
import _ from "lodash";
import { usePaymentStore } from "~/stores/paymentStore";
import type { paymentM } from "~/types/payment";

definePageMeta({
  layout: "admin"
});

const userStore = useUserStore();
const paymentStore = usePaymentStore();
const notificationStore = useNotificationStore();
const confirmationDialog = ref<InstanceType<typeof ConfirmationDialog> | null>(null);

// Options
const statusOptions = [
  { title: "Completed", value: "completed" },
  { title: "Processing", value: "processing" },
  { title: "Failed", value: "failed" },
];

const paymentMethods = [
  "Credit Card",
  "Bank Transfer",
  "E-Wallet", 
  "Virtual Account",
  "QRIS",
  "Debit Card"
];

// New Payment Form
const newPayment = ref<paymentM>({
  id: "",
  paymentId: "",
  merchantName: "",
  date: 0,
  amount: 0,
  status: "processing",
  customerEmail: "",
  paymentMethod: "",
});

// Edit Payment Form
const editPayment = ref<paymentM>({
  id: "",
  paymentId: "",
  merchantName: "",
  date: 0,
  amount: 0,
  status: "processing",
  customerEmail: "",
  paymentMethod: "",
});

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
  search: "",
  statusFilter: null as string | null,
  activeFilter: "all" as string,
  dialogAdd: false,
  dialogEdit: false,
  dialogDetail: false,

  headPayment: [
    { title: "No", value: "no", width: "50px" },
    { title: "Payment ID", value: "paymentId", sortable: true },
    { title: "Merchant Name", value: "merchantName", sortable: true },
    { title: "Date", value: "date", sortable: true },
    { title: "Amount", value: "amount", align: "end" as const, sortable: true },
    { title: "Status", value: "status", align: "center" as const, sortable: true },
    { title: "Aksi", align: "center" as const, value: "aksi", width: "140px" },
  ],
});

// Computed stats dari store
const stats = computed(() => {
  return paymentStore.getStats;
});

// Filter payments berdasarkan status dan search
const filteredPayments = computed(() => {
  let filtered = paymentStore.getDataPayment;

  // Filter by status dari dropdown atau card
  if (data.statusFilter) {
    filtered = filtered.filter(p => p.status === data.statusFilter);
  } else if (data.activeFilter !== "all") {
    filtered = filtered.filter(p => p.status === data.activeFilter);
  }

  return filtered;
});

// Filter by status dari card
const filterByStatus = (status: string) => {
  data.activeFilter = status;
  if (status === "all") {
    data.statusFilter = null;
  } else {
    data.statusFilter = status;
  }
};

// Apply filter dari dropdown
const applyFilter = () => {
  data.activeFilter = data.statusFilter || "all";
};

// Dialog Add
const openDialogAdd = () => {
  // Set default date to now
  newPayment.value = {
    id: "",
    paymentId: "",
    merchantName: "",
    date: Date.now(),
    amount: 0,
    status: "processing",
    customerEmail: "",
    paymentMethod: "",
  };
  data.dialogAdd = true;
};

const closeDialogAdd = () => {
  newPayment.value = {
    id: "",
    paymentId: "",
    merchantName: "",
    date: 0,
    amount: 0,
    status: "processing",
    customerEmail: "",
    paymentMethod: "",
  };
  data.dialogAdd = false;
};

// Save Payment
const savePayment = async () => {
  const paymentSave = newPayment.value;

  // Validasi wajib diisi
  if (!paymentSave.paymentId) {
    return notificationStore.showError("Payment ID wajib diisi");
  }

  if (!paymentSave.merchantName) {
    return notificationStore.showError("Merchant Name wajib diisi");
  }

  if (!paymentSave.amount || paymentSave.amount <= 0) {
    return notificationStore.showError("Amount wajib diisi dengan benar");
  }

  if (!paymentSave.status) {
    return notificationStore.showError("Status wajib dipilih");
  }

  // Cek duplikat Payment ID
  const sudahAda = _.some(paymentStore.getDataPayment, {
    paymentId: paymentSave.paymentId,
  });

  if (sudahAda) {
    return notificationStore.showError("Payment ID sudah digunakan");
  }

  // Generate ID
  const id = "payment_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
  paymentSave.id = id;
  paymentSave.date = Date.now(); // Set date to now
  paymentSave.created_at = Date.now();
  paymentSave.created_by = userStore.getEmail;

  // Simpan ke store
  await paymentStore.addMasterPaymentAct(paymentSave);
  
  closeDialogAdd();
};

// Dialog Edit
const openDialogEdit = (item: paymentM) => {
  editPayment.value = _.cloneDeep(item);
  data.dialogEdit = true;
};

const closeDialogEdit = () => {
  editPayment.value = {
    id: "",
    paymentId: "",
    merchantName: "",
    date: 0,
    amount: 0,
    status: "processing",
    customerEmail: "",
    paymentMethod: "",
  };
  data.dialogEdit = false;
};

// Update Payment
const updatePayment = async () => {
  const paymentEdit = editPayment.value;

  const confirmed = await confirmationDialog.value?.show(
    "Konfirmasi Edit",
    "Anda yakin ingin menyimpan perubahan ini?"
  );

  if (!confirmed) {
    return notificationStore.showInfo("Perubahan Dibatalkan");
  }

  paymentEdit.updated_at = Date.now();
  paymentEdit.updated_by = userStore.getEmail;

  await paymentStore.updateMasterPaymentAct(paymentEdit);
  data.dialogEdit = false;
};

// Hapus Payment
async function hapusPayment(id: string) {
  const confirmed = await confirmationDialog.value?.show(
    "Konfirmasi Hapus",
    "Anda yakin ingin menghapus data ini?"
  );

  if (!confirmed) {
    return notificationStore.showInfo("Penghapusan Dibatalkan");
  }

  await paymentStore.deleteMasterPaymentAct(id);
}

// Lihat Detail
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
  transition: all 0.2s;
  border-radius: 12px;
  cursor: pointer;
  border: 2px solid transparent;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
}

.stat-card-active {
  border-color: #0059f0;
  background-color: #f0f7ff;
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-label {
  font-size: 0.8rem;
  color: rgba(0, 0, 0, 0.6);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-value {
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 1.2;
}

.stat-detail {
  font-size: 0.7rem;
  color: rgba(0, 0, 0, 0.5);
  margin-top: 2px;
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
</style>