<template>
  <ConfirmationDialog ref="confirmationDialog" />

  <!-- ===================== DIALOG ADD ===================== -->
  <v-dialog
    v-model="data.dialogAdd"
    :width="$vuetify.display.mdAndUp ? '30%' : '380px'"
  >
    <v-card>
      <v-card-title
        class="font-weight-bold text-white pa-3 text-center"
        style="background: linear-gradient(to top, #0059f0, #0982f6, #0e96f9)"
      >
        TAMBAH CUSTOMER
      </v-card-title>

      <v-card-text class="pa-8">

        <a-text-field
          v-model="newCustomer.nama"
          label="Nama Customer"
          class="mb-3"
        />

        <a-text-field
          v-model="newCustomer.telepon"
          label="Telepon"
          class="mb-3"
        />

        <a-text-field
          v-model="newCustomer.email"
          label="Email"
          class="mb-3"
        />

        <a-text-field
          v-model="newCustomer.alamat"
          label="Alamat"
          class="mb-3"
        />

      </v-card-text>

      <v-divider />

      <v-card-actions class="px-5 py-5">
        <v-btn color="red" variant="flat" @click="closeDialogAdd">
          Batal
        </v-btn>
        <v-btn color="#365B97" variant="flat" @click="saveCustomer">
          Simpan
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- ===================== DIALOG EDIT ===================== -->
  <v-dialog
    v-model="data.dialogEdit"
    :width="$vuetify.display.mdAndUp ? '30%' : '380px'"
  >
    <v-card>
      <v-card-title
        class="font-weight-bold text-white pa-3 text-center"
        style="background: linear-gradient(to top, #0059f0, #0982f6, #0e96f9)"
      >
        EDIT CUSTOMER
      </v-card-title>

      <v-card-text class="pa-8">

        <a-text-field
          v-model="editCustomer.nama"
          label="Nama Customer"
          class="mb-3"
        />

        <a-text-field
          v-model="editCustomer.telepon"
          label="Telepon"
          class="mb-3"
        />

        <a-text-field
          v-model="editCustomer.email"
          label="Email"
          class="mb-3"
        />

        <a-text-field
          v-model="editCustomer.alamat"
          label="Alamat"
          class="mb-3"
        />

      </v-card-text>

      <v-divider />

      <v-card-actions class="px-5 py-5">
        <v-btn color="red" variant="flat" @click="closeDialogEdit">
          Batal
        </v-btn>
        <v-btn color="#365B97" variant="flat" @click="ubahCustomer">
          Edit
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- ===================== HEADER ===================== -->
  <v-row align="center">
    <v-col cols="9">
      <v-breadcrumbs>
        <v-breadcrumbs-item active>
          <span class="font-weight-medium text-h5"> Master Customer </span>
        </v-breadcrumbs-item>
      </v-breadcrumbs>
    </v-col>

    <v-col cols="3">
      <v-btn-toggle class="mt-5">
        <v-btn
          :style="{ backgroundColor: '#005BAC', color: 'white' }"
          size="31"
          @click="openDialogAdd"
        >
          <v-icon icon="mdi-plus" />
        </v-btn>

        <v-btn
          :style="{ backgroundColor: '#0074D9', color: 'white' }"
          height="31"
          class="text-capitalize font-weight-medium"
          @click="openDialogAdd"
        >
          Tambah Data
          <v-tooltip activator="parent" location="top">
            Tambah Data Customer
          </v-tooltip>
        </v-btn>
      </v-btn-toggle>
    </v-col>
  </v-row>

  <!-- ===================== TABLE ===================== -->
  <v-row>
    <v-col>
      <v-card flat rounded="lg" class="border">
        <v-card-title class="font-weight-bold">
          <v-row class="ma-0" align="center" justify="end" style="width: 100%">
            <button type="button" class="button mr-3" @click="refreshData">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-arrow-repeat"
                viewBox="0 0 16 16"
              >
                <path d="M11.534 7h3.932..." />
              </svg>
              Refresh Data
            </button>

            <a-text-field
              v-model="data.search"
              placeholder="Ketik untuk mencari..."
              hide-details
              density="compact"
              clearable
              style="max-width: 250px"
            />
          </v-row>
        </v-card-title>

        <v-divider />

        <v-data-table
          :headers="data.headCustomer"
          :items="customerStore.getDataCustomer"
          :search="data.search"
        >
          <template #item.no="{ index }">
            {{ index + 1 }}
          </template>

          <template #item.aksi="{ item }">
            <v-row justify="center" align="center">
              <v-btn
                color="#365B97"
                size="20"
                @click="openDialogEdit(item)"
                class="ma-2"
              >
                <v-icon size="13">mdi-pencil</v-icon>
              </v-btn>

              <v-btn color="red" size="20" @click="hapusCustomer(item.id!)">
                <v-icon size="13">mdi-delete</v-icon>
              </v-btn>
            </v-row>
          </template>
        </v-data-table>

      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import type { ConfirmationDialog } from "#components";

import _ from "lodash";
import { useMasterCustomerStore } from "~/stores/perusahaan/customerStore";
import type { customerM } from "~/types/akutansi";

definePageMeta({
  layout: "perusahaan",
});

const customerStore = useMasterCustomerStore();
const userStore = useUserStore();
const notificationStore = useNotificationStore();
const confirmationDialog = ref<InstanceType<typeof ConfirmationDialog> | null>(null);

onMounted(async () => {
  await customerStore.tarikDataCustomerAct();
});

const newCustomer = ref<customerM>({
  id: "",
  nama: "",
  telepon: "",
  email: "",
  alamat: "",
  id_perusahaan: "",
});

const editCustomer = ref<customerM>({
  id: "",
  nama: "",
  telepon: "",
  email: "",
  alamat: "",
  id_perusahaan: "",
});

const data = reactive({
  search: "",
  dialogAdd: false,
  dialogEdit: false,

  headCustomer: [
    { title: "No", value: "no" },
    { title: "Nama", value: "nama", sortable: true },
    { title: "Telepon", value: "telepon" },
    { title: "Email", value: "email" },
    { title: "Alamat", value: "alamat" },
    { title: "Aksi", align: "center", value: "aksi" },
  ],
});

const openDialogAdd = () => {
  data.dialogAdd = true;
};

const closeDialogAdd = () => {
  newCustomer.value = {
    id: "",
    nama: "",
    telepon: "",
    email: "",
    alamat: "",
    id_perusahaan: "",
  };
  data.dialogAdd = false;
};

const saveCustomer = () => {
  const c = newCustomer.value;

  if (!c.nama) return notificationStore.showError("Nama wajib diisi");

  c.id = "cust_" + _.kebabCase(c.nama);
  c.id_perusahaan = userStore.getIdPerusahaan;
  c.created_at = tanggalunixskrg();
  c.created_by = userStore.getEmail;

  customerStore.addCustomerAct(c);
  data.dialogAdd = false;
};

const openDialogEdit = (item: customerM) => {
  editCustomer.value = _.assign({}, item);
  data.dialogEdit = true;
};

const closeDialogEdit = () => {
  data.dialogEdit = false;
};

const ubahCustomer = async () => {
  const c = editCustomer.value;

  const confirmed = await confirmationDialog.value?.show(
    "Konfirmasi Edit",
    "Anda yakin ingin menyimpan perubahan ini?"
  );

  if (!confirmed) {
    return notificationStore.showError("Perubahan Dibatalkan");
  }

  c.updated_at = tanggalunixskrg();
  c.updated_by = userStore.getEmail;

  customerStore.updateCustomerAct(c);
  data.dialogEdit = false;
};

const hapusCustomer = async (id: string) => {
  const confirmed = await confirmationDialog.value?.show(
    "Konfirmasi Hapus",
    "Anda yakin ingin menghapus customer ini?"
  );

  if (!confirmed) {
    return notificationStore.showError("Penghapusan Dibatalkan");
  }

  customerStore.deleteCustomerAct(id);
};

async function refreshData() {
  useloadingStore().setLoading(true);
  await customerStore.tarikDataCustomerAct();
  useloadingStore().setLoading(false);
}
</script>

<style scoped>
:deep() thead th {
  font-weight: bold !important;
}

.button {
  color: white;
  background-color: #b7b7b7;
  font-weight: 500;
  border-radius: 0.5rem;
  font-size: 0.6rem;
  line-height: 0.6rem;
  padding: 0.4rem 0.6rem;
  cursor: pointer;
  margin-right: 0.5rem;
  display: inline-flex;
  align-items: center;
  border: none;
  transition: background-color 0.2s ease;
}

.button:hover {
  background-color: #0aa12d;
}

.button svg {
  width: 1rem;
  height: 1rem;
  margin-right: 0.75rem;
  color: white;
}

.button:hover svg {
  animation: spin_357 0.5s linear;
}

@keyframes spin_357 {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
