<template>
  <ConfirmationDialog ref="confirmationDialog" />

  <!-- ========== DIALOG ADD ========== -->
  <v-dialog
    v-model="data.dialogAdd"
    :width="$vuetify.display.mdAndUp ? '30%' : '380px'"
  >
    <v-card>
      <v-card-title
        class="font-weight-bold text-white pa-3 text-center"
        style="background: linear-gradient(to top, #0059f0, #0982f6, #0e96f9)"
      >
        TAMBAH COA
      </v-card-title>

      <v-card-text class="pa-8">

        <a-text-field
          v-model="newAkun.kode_akun"
          label="Kode Akun"
          class="mb-3"
        />

        <a-text-field
          v-model="newAkun.nama_akun"
          label="Nama Akun"
          class="mb-3"
        />

        <!-- Dropdown kategori -->
        <a-select
          v-model="newAkun.id_kategori"
          :items="coaStore.getDataKategoriAkun"
          item-title="nama"
          item-value="id"
          label="Kategori Akun"
          class="mb-3"
        />

        <a-text-field v-model="newAkun.tipe" label="Tipe" class="mb-3" />
        <a-text-field v-model="newAkun.posisi" label="Posisi" class="mb-3" />

      </v-card-text>

      <v-divider />

      <v-card-actions class="px-5 py-5">
        <v-btn color="red" variant="flat" @click="closeDialogAdd">
          Batal
        </v-btn>
        <v-btn color="#365B97" variant="flat" @click="saveAkun">
          Simpan
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- ========== DIALOG EDIT ========== -->
  <v-dialog
    v-model="data.dialogEdit"
    :width="$vuetify.display.mdAndUp ? '30%' : '380px'"
  >
    <v-card>
      <v-card-title
        class="font-weight-bold text-white pa-3 text-center"
        style="background: linear-gradient(to top, #0059f0, #0982f6, #0e96f9)"
      >
        EDIT COA
      </v-card-title>

      <v-card-text class="pa-8">

        <a-text-field
          v-model="editAkun.kode_akun"
          label="Kode Akun"
          class="mb-3"
        />

        <a-text-field
          v-model="editAkun.nama_akun"
          label="Nama Akun"
          class="mb-3"
        />

        <a-select
          v-model="editAkun.id_kategori"
          :items="coaStore.getDataKategoriAkun"
          item-title="nama"
          item-value="id"
          label="Kategori Akun"
          class="mb-3"
        />

        <a-text-field v-model="editAkun.tipe" label="Tipe" class="mb-3" />
        <a-text-field v-model="editAkun.posisi" label="Posisi" class="mb-3" />

      </v-card-text>

      <v-divider />

      <v-card-actions class="px-5 py-5">
        <v-btn color="red" variant="flat" @click="closeDialogEdit">
          Batal
        </v-btn>
        <v-btn color="#365B97" variant="flat" @click="ubahAkun">
          Edit
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- ========== HEADER ========== -->
  <v-row align="center">
    <v-col cols="9">
      <v-breadcrumbs>
        <v-breadcrumbs-item active>
          <span class="font-weight-medium text-h5"> Chart of Accounts (COA) </span>
        </v-breadcrumbs-item>
      </v-breadcrumbs>
    </v-col>

    <v-col cols="3">
      <v-btn-toggle class="mt-5">
        <v-btn
          style="background-color:#005BAC; color:white"
          size="31"
          @click="openDialogAdd"
        >
          <v-icon icon="mdi-plus" />
        </v-btn>
        <v-btn
          style="background-color:#0074D9; color:white"
          height="31"
          class="text-capitalize font-weight-medium"
          @click="openDialogAdd"
        >
          Tambah Akun
        </v-btn>
      </v-btn-toggle>
    </v-col>
  </v-row>

  <!-- ========== TABLE ========== -->
  <v-row>
    <v-col>
      <v-card flat rounded="lg" style="border:1px solid #e0e0e0">
        <v-card-title class="font-weight-bold">
          <v-row class="ma-0" align="center" justify="end">

            <button type="button" class="button mr-3" @click="refreshData">Refresh Data</button>

            <a-text-field
              v-model="data.search"
              placeholder="Ketik untuk mencari..."
              hide-details
              density="compact"
              clearable
              style="max-width:250px"
            />

          </v-row>
        </v-card-title>

        <v-divider />

        <v-data-table
          :headers="data.headAkun"
          :items="coaStore.getDataAkun"
          :search="data.search"
        >
          <template #item.no="{ index }">
            {{ index + 1 }}
          </template>

          <template #item.aktif="{ item }">
            <v-chip
              :color="item.aktif ? 'green' : 'red'"
              size="small"
              text-color="white"
              rounded="lg"
            >
              {{ item.aktif ? "Aktif" : "Tidak Aktif" }}
            </v-chip>
          </template>

          <template #item.aksi="{ item }">
            <v-row justify="center">
              <v-btn
                color="#365B97"
                size="20"
                class="ma-2"
                @click="openDialogEdit(item)"
              >
                <v-icon size="13">mdi-pencil</v-icon>
              </v-btn>
              <v-btn color="red" size="20" @click="hapusAkun(item.id)">
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
import { useMasterCoaStore } from "~/stores/perusahaan/coaStore";
import type { akunM } from "~/types/akutansi";

definePageMeta({
  layout: "perusahaan",
});

const coaStore = useMasterCoaStore();
const userStore = useUserStore();
const notificationStore = useNotificationStore();
const confirmationDialog = ref<InstanceType<typeof ConfirmationDialog> | null>(null);

onMounted(async () => {
  await coaStore.tarikKategoriAkunAct();
  await coaStore.tarikDataAkunAct();
});

const newAkun = ref<akunM>({
  id: "",
  kode_akun: "",
  nama_akun: "",
  tipe: "",
  kategori: "",
  posisi: "",
  aktif: false,
  kelompok: "",
});

const editAkun = ref<akunM>({
  id: "",
  kode_akun: "",
  nama_akun: "",
  tipe: "",
  kategori: "",
  posisi: "",
  aktif: false,
  kelompok: "",
});

const data = reactive({
  search: "",
  dialogAdd: false,
  dialogEdit: false,

  headAkun: [
    { title: "No", value: "no" },
    { title: "Kode", value: "kode_akun" },
    { title: "Nama Akun", value: "nama_akun" },
    { title: "Tipe", value: "tipe" },
    { title: "Posisi", value: "posisi" },
    { title: "Status", value: "aktif" },
    { title: "Aksi", align: "center", value: "aksi" },
  ],
});

watch(
  () => newAkun.value.id_kategori,
  (val) => {
    const k = _.find(coaStore.getDataKategoriAkun, (o:any) => o.id === val);
    if (k) {
      newAkun.value.posisi = k.posisi;
      newAkun.value.aktif = k.aktif;
      newAkun.value.tipe = k.tipe;
      newAkun.value.kelompok = k.kelompok;
      newAkun.value.kategori = k.nama;
    }
  }
);

watch(
  () => editAkun.value.id_kategori,
  (val) => {
    const k = _.find(coaStore.getDataKategoriAkun, (o:any) => o.id === val);
    if (k) {
      editAkun.value.posisi = k.posisi;
      editAkun.value.aktif = k.aktif;
      editAkun.value.tipe = k.tipe;
      editAkun.value.kelompok = k.kelompok;
      editAkun.value.kategori = k.nama;
    }
  }
);

const openDialogAdd = () => { data.dialogAdd = true; };

const closeDialogAdd = () => {
  Object.assign(newAkun.value, {
    id: "",
    kode_akun: "",
    nama_akun: "",
    tipe: "",
    kategori: "",
    posisi: "",
    aktif: false,
    kelompok: "",
  });
  data.dialogAdd = false;
};

const saveAkun = () => {
  const a = newAkun.value;

  if (!a.kode_akun) return notificationStore.showError("Kode akun wajib diisi");
  if (!a.nama_akun) return notificationStore.showError("Nama akun wajib diisi");
  if (!a.id_kategori) return notificationStore.showError("Kategori akun wajib dipilih");

  a.id = "akun_" + _.kebabCase(a.kode_akun);
  a.created_at = tanggalunixskrg();
  a.created_by = userStore.getEmail;

  coaStore.addAkunAct(a);
  data.dialogAdd = false;
};

const openDialogEdit = (item: akunM) => {
  editAkun.value = _.assign({}, item);
  data.dialogEdit = true;
};

const closeDialogEdit = () => {
  data.dialogEdit = false;
};

const ubahAkun = async () => {
  const a = editAkun.value;

  const ok = await confirmationDialog.value?.show(
    "Konfirmasi Edit",
    "Anda yakin ingin menyimpan perubahan akun?"
  );

  if (!ok) return notificationStore.showError("Edit dibatalkan");

  a.updated_at = tanggalunixskrg();
  a.updated_by = userStore.getEmail;

  coaStore.updateAkunAct(a);
  data.dialogEdit = false;
};

const hapusAkun = async (id: string) => {
  const ok = await confirmationDialog.value?.show(
    "Konfirmasi Hapus",
    "Anda yakin ingin menghapus akun ini?"
  );

  if (!ok) return notificationStore.showError("Penghapusan dibatalkan");

  coaStore.deleteAkunAct(id);
};

async function refreshData() {
  useloadingStore().setLoading(true);
  sessionStorage.removeItem("m_akun");
  await coaStore.tarikDataAkunAct();
  useloadingStore().setLoading(false);
}
</script>

<style scoped>
/* sama dengan style template Anda */
:deep() thead th {
  font-weight: bold !important;
}

.button {
  color: white;
  background-color: #b7b7b7;
  font-weight: 500;
  border-radius: 0.5rem;
  font-size: .6rem;
  padding: .4rem .6rem;
  cursor: pointer;
  margin-right: .5rem;
  display: inline-flex;
  align-items: center;
  border: none;
}

.button:hover { background-color: #0aa12d; }
.button svg { width: 1rem; height: 1rem; margin-right: .75rem; }

.button:hover svg {
  animation: spin_357 .5s linear;
}

@keyframes spin_357 {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
