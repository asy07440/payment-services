<template>
  <ConfirmationDialog ref="confirmationDialog" />

  <!-- ========================= DIALOG ADD ========================= -->
  <v-dialog
    v-model="data.dialogAdd"
    :width="$vuetify.display.mdAndUp ? '30%' : '380px'"
  >
    <v-card>
      <v-card-title
        class="font-weight-bold text-white pa-3 text-center"
        style="background: linear-gradient(to top, #0059f0, #0982f6, #0e96f9)"
      >
        TAMBAH VENDOR
      </v-card-title>

      <v-card-text class="pa-8">

        <a-text-field
          v-model="newVendor.nama"
          label="Nama Vendor"
          class="mb-3"
        />

        <a-text-field
          v-model="newVendor.telepon"
          label="Telepon"
          class="mb-3"
        />

        <a-text-field
          v-model="newVendor.email"
          label="Email"
          class="mb-3"
        />

        <a-text-field
          v-model="newVendor.alamat"
          label="Alamat"
          class="mb-3"
        />

      </v-card-text>

      <v-divider />

      <v-card-actions class="px-5 py-5">
        <v-btn color="red" variant="flat" @click="closeDialogAdd">
          Batal
        </v-btn>

        <v-btn color="#365B97" variant="flat" @click="saveVendor">
          Simpan
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>


  <!-- ========================= DIALOG EDIT ========================= -->
  <v-dialog
    v-model="data.dialogEdit"
    :width="$vuetify.display.mdAndUp ? '30%' : '380px'"
  >
    <v-card>
      <v-card-title
        class="font-weight-bold text-white pa-3 text-center"
        style="background: linear-gradient(to top, #0059f0, #0982f6, #0e96f9)"
      >
        EDIT VENDOR
      </v-card-title>

      <v-card-text class="pa-8">

        <a-text-field
          v-model="editVendor.nama"
          label="Nama Vendor"
          class="mb-3"
        />

        <a-text-field
          v-model="editVendor.telepon"
          label="Telepon"
          class="mb-3"
        />

        <a-text-field
          v-model="editVendor.email"
          label="Email"
          class="mb-3"
        />

        <a-text-field
          v-model="editVendor.alamat"
          label="Alamat"
          class="mb-3"
        />

      </v-card-text>

      <v-divider />

      <v-card-actions class="px-5 py-5">
        <v-btn color="red" variant="flat" @click="closeDialogEdit">
          Batal
        </v-btn>

        <v-btn color="#365B97" variant="flat" @click="ubahVendor">
          Edit
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>


  <!-- ========================= HEADER ========================= -->
  <v-row align="center">
    <v-col cols="9">
      <v-breadcrumbs>
        <v-breadcrumbs-item active>
          <span class="font-weight-medium text-h5"> Master Vendor </span>
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
            Tambah Data Vendor
          </v-tooltip>
        </v-btn>
      </v-btn-toggle>
    </v-col>
  </v-row>



  <!-- ========================= TABLE ========================= -->
  <v-row>
    <v-col>
      <v-card flat rounded="lg" class="border">
        <v-card-title class="font-weight-bold">
          <v-row
            class="ma-0"
            align="center"
            justify="end"
            style="width: 100%"
          >
            <button type="button" class="button mr-3" @click="refreshData">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-arrow-repeat"
                viewBox="0 0 16 16"
              >
                <path
                  d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"
                ></path>
                <path
                  fill-rule="evenodd"
                  d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"
                ></path>
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
          :headers="data.headVendor"
          :items="vendorStore.getDataVendor"
          :search="data.search"
        >
          <template v-slot:item.no="{ index }">
            {{ index + 1 }}
          </template>

          <template v-slot:item.aksi="{ item }">
            <v-row justify="center" align="center">
              <v-btn
                color="#365B97"
                size="20"
                @click="openDialogEdit(item)"
                class="ma-2"
              >
                <v-icon size="13">mdi-pencil</v-icon>
              </v-btn>

              <v-btn color="red" size="20" @click="hapusVendor(item.id!)">
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
import type { vendorM } from "~/types/akutansi";

definePageMeta({
  layout: "perusahaan",
});

const vendorStore = useMasterVendorStore();
const userStore = useUserStore();
const notificationStore = useNotificationStore();
const confirmationDialog = ref<InstanceType<typeof ConfirmationDialog> | null>(null);

onMounted(async () => {
  await vendorStore.tarikDataVendorAct();
});

const newVendor = ref<vendorM>({
  id: "",
  nama: "",
  alamat: "",
  telepon: "",
  email: "",
  id_perusahaan: "",
});

const editVendor = ref<vendorM>({
  id: "",
  nama: "",
  alamat: "",
  telepon: "",
  email: "",
  id_perusahaan: "",
});

const data = reactive({
  search: "",
  dialogAdd: false,
  dialogEdit: false,

  headVendor: [
    { title: "No", value: "no" },
    { title: "Nama", value: "nama", sortable: true },
    { title: "Telepon", value: "telepon" },
    { title: "Email", value: "email" },
    { title: "Alamat", value: "alamat" },
    { title: "Aksi", align: "center" as const, value: "aksi" },
  ],
});

const openDialogAdd = () => {
  data.dialogAdd = true;
};

const closeDialogAdd = () => {
  newVendor.value = {
    id: "",
    nama: "",
    alamat: "",
    telepon: "",
    email: "",
    id_perusahaan: "",
  };
  data.dialogAdd = false;
};

const saveVendor = () => {
  const d = newVendor.value;

  if (!d.nama) return notificationStore.showError("Nama wajib diisi");

  d.id = "vendor_" + _.kebabCase(d.nama);
  d.id_perusahaan = userStore.getIdPerusahaan;
  d.created_at = tanggalunixskrg();
  d.created_by = userStore.getEmail;

  vendorStore.addVendorAct(d);
  data.dialogAdd = false;
};

const openDialogEdit = (item: vendorM) => {
  editVendor.value = _.assign({}, item);
  data.dialogEdit = true;
};

const closeDialogEdit = () => {
  data.dialogEdit = false;
};

const ubahVendor = async () => {
  const d = editVendor.value;

  const confirmed = await confirmationDialog.value?.show(
    "Konfirmasi Edit",
    "Anda yakin ingin menyimpan perubahan ini?"
  );

  if (!confirmed) {
    return notificationStore.showError("Perubahan Dibatalkan");
  }

  d.updated_at = tanggalunixskrg();
  d.updated_by = userStore.getEmail;

  vendorStore.updateVendorAct(d);
  data.dialogEdit = false;
};

const hapusVendor = async (id: string) => {
  const confirmed = await confirmationDialog.value?.show(
    "Konfirmasi Hapus",
    "Anda yakin ingin menghapus vendor ini?"
  );

  if (!confirmed) {
    return notificationStore.showError("Penghapusan Dibatalkan");
  }

  vendorStore.deleteVendorAct(id);
};

async function refreshData() {
  useloadingStore().setLoading(true);
  await vendorStore.tarikDataVendorAct();
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
  text-align: center;
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
  display: inline;
  width: 1rem;
  height: 1rem;
  margin-right: 0.75rem;
  color: white;
}

.button:hover svg {
  animation: spin_357 0.5s linear;
}

@keyframes spin_357 {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
