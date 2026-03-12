<template>
  <ConfirmationDialog ref="confirmationDialog" />

  <v-dialog
    v-model="data.dialogAdd"
    :width="$vuetify.display.mdAndUp ? '350px' : '380px'"
  >
    <v-card>
      <v-card-title
        class="font-weight-bold text-white pa-3 text-center"
        style="background: linear-gradient(to top, #0059f0, #0982f6, #0e96f9)"
      >
        TAMBAH PERUSAHAAN
      </v-card-title>

      <v-card-text class="pa-8">
        <a-text-field v-model="newPerusahaan.nama" label="Nama" class="mb-3" />

        <a-text-field
          v-model="newPerusahaan.alamat"
          label="Alamat"
          class="mb-3"
        />

        <a-text-field v-model="newPerusahaan.npwp" label="NPWP" class="mb-3" />

        <a-text-field
          v-model="newPerusahaan.telepon"
          label="No Telfon"
          class="mb-3"
        />
        <a-text-field
          v-model="newPerusahaan.email"
          label="Email"
          class="mb-3"
        />
      </v-card-text>

      <v-divider />

      <v-card-actions class="px-5 py-5">
        <v-btn color="red" @click="closeDialogAdd" variant="flat">
          Batal
        </v-btn>

        <v-btn color="#365B97" variant="flat" @click="savePerusahaan">
          Simpan
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog
    v-model="data.dialogEdit"
    :width="$vuetify.display.mdAndUp ? '350px' : '380px'"
  >
    <v-card>
      <v-card-title
        class="font-weight-bold text-white pa-3 text-center"
        style="background: linear-gradient(to top, #0059f0, #0982f6, #0e96f9)"
      >
        EDIT PERUSAHAAN
      </v-card-title>

      <v-card-text class="pa-8">
        <a-text-field v-model="editPerusahaan.nama" label="Nama" class="mb-3" />

        <a-text-field
          v-model="editPerusahaan.alamat"
          label="Alamat"
          class="mb-3"
        />

        <a-text-field v-model="editPerusahaan.npwp" label="NPWP" class="mb-3" />

        <a-text-field
          v-model="editPerusahaan.telepon"
          label="No Telfon"
          class="mb-3"
        />
        <a-text-field
          v-model="editPerusahaan.email"
          label="Email"
          class="mb-3"
        />
      </v-card-text>

      <v-divider />

      <v-card-actions class="px-5 py-5">
        <v-btn color="red" @click="closeDialogEdit" variant="flat">
          Batal
        </v-btn>

        <v-btn color="#365B97" variant="flat" @click="ubahPerusahaan">
          Simpan
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-row align="center" class="mb-2">
    <v-col cols="11">
      <v-breadcrumbs>
        <v-breadcrumbs-item active>
          <span class="font-weight-medium text-h5"> Master Perusahaan </span>
        </v-breadcrumbs-item>
      </v-breadcrumbs>
    </v-col>

    <v-col cols="1">
      <v-btn
        color="white"
        class="border"
        flat
        size="35"
        @click="refreshData"
      >
        <v-icon icon="mdi-cached" />
        <v-tooltip activator="parent" location="top"> Refresh Data </v-tooltip>
      </v-btn>
    </v-col>
  </v-row>

  <v-row>
    <v-col>
      <v-card flat rounded="lg" class="border">
        <v-card-title
          class="d-flex align-center justify-space-between py-3 px-4"
        >
          <div class="d-flex align-center" style="height: 40px">
            <!-- Search di kiri -->
            <a-text-field
              v-model="data.search"
              placeholder="Search"
              density="compact"
              class="mr-3 custom-search-field"
              style="max-width: 250px; height: 40px"
            />
          </div>

          <!-- Tombol di kanan -->
          <div class="d-flex align-center">
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
                  Tambah Kategori Akun
                </v-tooltip>
              </v-btn>
            </v-btn-toggle>
          </div>
        </v-card-title>

        <v-divider class="my-0" />

        <v-card-text>
          <v-data-table
            :headers="data.headPerusahaan"
            :items="perusahaanStore.getDataPerusahaan"
            :search="data.search"
            density="comfortable"
            class="rounded-lg"
          >
            <template v-slot:item.no="{ index }"> {{ index + 1 }}. </template>

            <!-- Tampilkan strip jika alamat kosong -->
            <template v-slot:item.alamat="{ item }">
              <span v-if="item.alamat && item.alamat.trim() !== ''">
                {{ item.alamat }}
              </span>
              <span v-else class="text-grey"> - </span>
            </template>

            <!-- Tampilkan strip jika telepon kosong -->
            <template v-slot:item.telepon="{ item }">
              <span v-if="item.telepon && item.telepon.trim() !== ''">
                {{ item.telepon }}
              </span>
              <span v-else class="text-grey"> - </span>
            </template>

            <!-- Opsional: Juga untuk NPWP dan Email jika ingin konsisten -->
            <template v-slot:item.npwp="{ item }">
              <span v-if="item.npwp && item.npwp.trim() !== ''">
                {{ item.npwp }}
              </span>
              <span v-else class="text-grey"> - </span>
            </template>

            <template v-slot:item.email="{ item }">
              <span v-if="item.email && item.email.trim() !== ''">
                {{ item.email }}
              </span>
              <span v-else class="text-grey"> - </span>
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

                <v-btn color="red" size="20" @click="hapusPerusahaan(item.id!)">
                  <v-icon size="13">mdi-delete</v-icon>
                </v-btn>
              </v-row>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import type { ConfirmationDialog } from "#components";
import _ from "lodash";
import { useMasterPerusahaanStore } from "~/stores/master/perusahaanStore";
import type { perusahaanM } from "~/types/akutansi";

definePageMeta({
  layout: "admin",
});

const userStore = useUserStore();
const perusahaanStore = useMasterPerusahaanStore();
const notificationStore = useNotificationStore();
const confirmationDialog = ref<InstanceType<typeof ConfirmationDialog> | null>(
  null
);

onMounted(async () => {
  await perusahaanStore.tarikDataPerusahaanAct();
});

const newPerusahaan = ref<perusahaanM>({
  nama: "",
  alamat: "",
  npwp: "",
  telepon: "",
  email: "",
});

const editPerusahaan = ref<perusahaanM>({
  nama: "",
  alamat: "",
  npwp: "",
  telepon: "",
  email: "",
});

const data = reactive({
  search: "",
  dialogAdd: false,
  dialogEdit: false,

  headPerusahaan: [
    { title: "No", value: "no" },
    { title: "Nama", value: "nama", sortable: true },
    { title: "Alamat", value: "alamat", sortable: true },
    { title: "NPWP", value: "npwp", sortable: true },
    { title: "Telfon", value: "telepon", sortable: true },
    { title: "Email", value: "email", sortable: true },
    { title: "Aksi", align: "center" as const, value: "aksi" },
  ],
});

const openDialogAdd = () => {
  data.dialogAdd = true;
};

const closeDialogAdd = () => {
  newPerusahaan.value = {
    nama: "",
    alamat: "",
    npwp: "",
    telepon: "",
    email: "",
  };

  data.dialogAdd = false;
};

const savePerusahaan = () => {
  const perusahaanSave = newPerusahaan.value;

  perusahaanSave.created_at = tanggalunixskrg();
  perusahaanSave.created_by = userStore.getEmail;
  perusahaanStore.addMasterPerusahaanAct(perusahaanSave);
  data.dialogAdd = false;
};

const openDialogEdit = (item: perusahaanM) => {
  editPerusahaan.value = _.assign({}, item);
  data.dialogEdit = true;
};

const closeDialogEdit = () => {
  newPerusahaan.value = {
    nama: "",
    alamat: "",
    npwp: "",
    telepon: "",
    email: "",
  };

  data.dialogEdit = false;
};

const ubahPerusahaan = () => {
  const perusahaanSave = newPerusahaan.value;

  perusahaanSave.updated_at = tanggalunixskrg();
  perusahaanSave.updated_by = userStore.getEmail;
  perusahaanStore.updateMasterPerusahaanAct(perusahaanSave);
  data.dialogEdit = false;
};

async function hapusPerusahaan(id: string) {
  const confirmed = await confirmationDialog.value?.show(
    "Konfirmasi Hapus",
    "Anda yakin ingin menghapus data ini?"
  );

  if (!confirmed) {
    return notificationStore.showError("Penghapusan Dibatalkan");
  }

  perusahaanStore.deleteMasterPerusahaanAct(id);
}

async function refreshData() {
  useloadingStore().setLoading(true);
  sessionStorage.removeItem("m_perusahaan"); // Hapus dulu
  await perusahaanStore.tarikDataPerusahaanAct(); // Lalu tarik ulang datanya
  useloadingStore().setLoading(false);
}
</script>

<style scoped>
:deep() thead th {
  font-weight: bold !important;
  background-color: #f7f8f9 !important;
  border-bottom: 2px solid #e0e0e0 !important;
  border-right: 1px solid #e0e0e0 !important;
}

:deep() .v-data-table-header th {
  background-color: #f7f8f9 !important;
}

/* Menghilangkan border right pada kolom terakhir */
:deep() thead th:last-child {
  border-right: none !important;
}

/* Untuk sel data juga bisa ditambahkan border jika diinginkan */
:deep() tbody td {
  border-right: 1px solid #e0e0e0 !important;
}

:deep() tbody td:last-child {
  border-right: none !important;
}

/* Optional: menambahkan border pada seluruh tabel */
:deep() .v-data-table {
  border: 1px solid #e0e0e0;
}

/* Style untuk menyesuaikan tinggi input search */
:deep(.custom-search-field .v-field) {
  height: 40px !important;
}

:deep(.custom-search-field .v-field__field) {
  min-height: 40px !important;
}

:deep(.custom-search-field .v-field__input) {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  min-height: 40px !important;
}
</style>
