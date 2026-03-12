<template>
  <ConfirmationDialog ref="confirmationDialog" />

  <v-dialog
    v-model="data.dialogAdd"
    :width="$vuetify.display.mdAndUp ? '30%' : '380px'"
  >
    <v-card>
      <v-card-title
        class="font-weight-bold text-white pa-3 text-center"
        style="background: linear-gradient(to top, #0059f0, #0982f6, #0e96f9)"
      >
        TAMBAH KATEGORI AKUN
      </v-card-title>

      <v-card-text class="pa-8">
        <a-text-field
          v-model="newKategoriAkun.nama"
          label="Nama Kategori Akun"
          class="mb-3"
        />

        <a-select
          v-model="newKategoriAkun.tipe"
          :items="data.itemTipe"
          label="Tipe"
          class="mb-3"
        />

        <a-select
          v-model="newKategoriAkun.posisi"
          :items="data.itemPosisi"
          label="Posisi"
          class="mb-3"
        />

        <a-select
          v-model="newKategoriAkun.kelompok"
          :items="data.itemKelompok"
          label="Kelompok"
          class="mb-3"
        />

        <v-row>
          <v-col cols="12" sm="6">
            <a-field-number
              v-model="newKategoriAkun.urutan"
              label="Urutan"
              class="mb-3"
            />
          </v-col>

          <v-col cols="12" sm="6">
            <v-checkbox
              v-model="newKategoriAkun.aktif"
              color="success"
              label="Status Aktif"
              value="success"
              hide-details
              class="mt-4"
            />
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider />

      <v-card-actions class="px-5 py-5">
        <v-btn color="red" @click="closeDialogAdd" variant="flat">
          Batal
        </v-btn>

        <v-btn color="#365B97" variant="flat" @click="saveKategoriAkun">
          Simpan
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog v-model="data.dialogEdit" max-width="30%">
    <v-card>
      <v-card-title
        class="font-weight-bold text-white pa-4 text-center"
        style="background: linear-gradient(to top, #0059f0, #0982f6, #0e96f9)"
      >
        EDIT KATEGORI AKUN
      </v-card-title>

      <v-card-text class="pa-8">
        <a-text-field
          v-model="editKategoriAkun.nama"
          label="Nama Kategori Akun"
          class="mb-3"
        />

        <a-select
          v-model="editKategoriAkun.tipe"
          :items="data.itemTipe"
          label="Tipe"
          class="mb-3"
        />

        <a-select
          v-model="editKategoriAkun.tipe"
          :items="data.itemPosisi"
          label="Posisi"
          class="mb-3"
        />

        <a-select
          v-model="editKategoriAkun.tipe"
          :items="data.itemKelompok"
          label="Kelompok"
          class="mb-3"
        />

        <v-row>
          <v-col cols="12" sm="6">
            <a-field-number
              v-model="editKategoriAkun.urutan"
              label="Urutan"
              class="mb-3"
            />
          </v-col>

          <v-col cols="12" sm="6">
            <v-checkbox
              v-model="editKategoriAkun.aktif"
              color="success"
              label="Status Aktif"
              value="success"
              hide-details
              class="mt-4"
            />
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider />

      <v-card-actions class="px-5 py-5">
        <v-btn color="red" @click="closeDialogEdit" variant="flat">
          Batal
        </v-btn>

        <v-btn color="#365B97" variant="flat" @click="ubahKategoriAkun">
          Edit
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-row align="center">
    <v-col cols="9">
      <v-breadcrumbs>
        <v-breadcrumbs-item active>
          <span class="font-weight-medium text-h5"> Master Kategori Akun </span>
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
            Tambah Data Kategori Akun
          </v-tooltip>
        </v-btn>
      </v-btn-toggle>
    </v-col>
  </v-row>

  <v-row>
    <v-col>
      <v-card flat rounded="lg" class="border">
        <v-card-title class="font-weight-bold">
          <v-row class="ma-0" align="center" justify="end" style="width: 100%">
            <!-- Tombol Refresh -->
            <button type="button" class="button mr-3">
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

            <!-- Kolom Pencarian -->
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
          :headers="data.headKategoriAkun"
          :items="data.dataKategoriAkun"
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
                <v-icon size="13" icon="mdi-pencil" />
              </v-btn>

              <v-btn color="red" size="20" @click="hapusKategoriAkun(item.id!)">
                <v-icon size="13" icon="mdi-delete" />
              </v-btn>
            </v-row>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import _ from "lodash";
import type { ConfirmationDialog } from "#components";
import { useMasterAkunStore } from "~/stores/master/akunStore";
import type { kategoriAkunM } from "~/types/akutansi";

definePageMeta({
  layout: "admin",
});

const userStore = useUserStore();
const kategoriAkunStore = useMasterAkunStore();
const notificationStore = useNotificationStore();
const confirmationDialog = ref<InstanceType<typeof ConfirmationDialog> | null>(
  null
);

onMounted(async () => {
  await kategoriAkunStore.tarikDataKategoriAkunAct();
});

const newKategoriAkun = ref<kategoriAkunM>({
  nama: "",
  tipe: "",
  posisi: "",
  kelompok: "",
  urutan: 0,
  aktif: false,
  id: ""
});

const editKategoriAkun = ref<kategoriAkunM>({
  nama: "",
  tipe: "",
  posisi: "",
  kelompok: "",
  urutan: 0,
  aktif: false,
  id: ""
});

const data = reactive({
  search: "",
  dialogAdd: false,
  dialogEdit: false,

  itemTipe: ["Aset", "Kewajiban", "Modal", "Pendapatan", "Beban"],
  itemPosisi: ["Debit", "Kredit"],
  itemKelompok: ["Neraca", "Laba Rugi"],

  headKategoriAkun: [
    { title: "No", value: "no" },
    { title: "Nama Kategori", value: "nama", sortable: true },
    { title: "Tipe", value: "tipe", sortable: true },
    { title: "Posisi", value: "posisi", sortable: true },
    { title: "Kelompok", value: "kelompok", sortable: true },
    { title: "Urutan", value: "urutan", sortable: true },
    { title: "Status", value: "aktif", sortable: true },
    { title: "Aksi", align: "center" as const, value: "aksi" },
  ],

  dataKategoriAkun: [
    {
      no: 1,
      nama: "Aset Lancar",
      tipe: "Neraca",
      posisi: "Debit",
      kelompok: "Aktiva",
      urutan: 1,
      aktif: true,
      aksi: "",
    },
    {
      no: 2,
      nama: "Aset Tetap",
      tipe: "Neraca",
      posisi: "Debit",
      kelompok: "Aktiva",
      urutan: 2,
      aktif: true,
      aksi: "",
    },
    {
      no: 3,
      nama: "Liabilitas Jangka Pendek",
      tipe: "Neraca",
      posisi: "Kredit",
      kelompok: "Pasiva",
      urutan: 3,
      aktif: true,
      aksi: "",
    },
  ],
});

const openDialogAdd = () => {
  data.dialogAdd = true;
};

const closeDialogAdd = () => {
  newKategoriAkun.value = {
    nama: "",
    tipe: "",
    posisi: "",
    kelompok: "",
    urutan: 0,
    aktif: false,
  };

  data.dialogAdd = false;
};

const saveKategoriAkun = () => {
  const kategoriAkunSave = newKategoriAkun.value;

  if (kategoriAkunSave.nama == "") {
    return notificationStore.showError("Nama kategori akun tidak boleh kosong");
  }

  kategoriAkunSave.created_at = tanggalunixskrg();
  kategoriAkunSave.created_by = userStore.getEmail;
  kategoriAkunStore.addMasterKategoriAkunAct(kategoriAkunSave);
  closeDialogAdd();
};

const openDialogEdit = (item: kategoriAkunM) => {
  editKategoriAkun.value = _.assign({}, item);
  data.dialogEdit = true;
};

const closeDialogEdit = () => {
  editKategoriAkun.value = {
    nama: "",
    tipe: "",
    posisi: "",
    kelompok: "",
    urutan: 0,
    aktif: false,
  };

  data.dialogEdit = false;
};

const ubahKategoriAkun = () => {
  const kategoriAkunEdit = newKategoriAkun.value;

  if (kategoriAkunEdit.nama == "") {
    return notificationStore.showError("Nama kategori akun tidak boleh kosong");
  }

  kategoriAkunEdit.updated_at = tanggalunixskrg();
  kategoriAkunEdit.updated_by = userStore.getEmail;
  kategoriAkunStore.addMasterKategoriAkunAct(kategoriAkunEdit);
  closeDialogAdd();
};

async function hapusKategoriAkun(id: string) {
  const confirmed = await confirmationDialog.value?.show(
    "Konfirmasi Hapus",
    "Anda yakin ingin menghapus data ini?"
  );

  if (!confirmed) {
    return notificationStore.showError("Penghapusan Dibatalkan");
  }

  kategoriAkunStore.deleteMasterKategoriAkunAct(id);
}

async function refreshData() {
  useloadingStore().setLoading(true);
  sessionStorage.removeItem("m_kategori_akun"); // Hapus dulu
  await kategoriAkunStore.tarikDataKategoriAkunAct(); // Lalu tarik ulang datanya
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

/* animasi ikon berputar saat hover */
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
