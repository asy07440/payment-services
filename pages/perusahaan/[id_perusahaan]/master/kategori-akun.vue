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
        TAMBAH KATEGORI AKUN
      </v-card-title>

      <v-card-text class="pa-8">
        <a-text-field
          v-model="newKat.nama"
          label="Nama Kategori"
          class="mb-3"
        />

        <a-select
          v-model="newKat.tipe"
          :items="['Aset','Kewajiban','Modal','Pendapatan','Beban']"
          label="Tipe"
          class="mb-3"
        />

        <a-select
          v-model="newKat.posisi"
          :items="['Debit','Kredit']"
          label="Posisi Saldo"
          class="mb-3"
        />

        <a-text-field
          v-model="newKat.kelompok"
          label="Kelompok Laporan"
          class="mb-3"
        />

        <a-text-field
          v-model.number="newKat.urutan"
          label="Urutan"
          type="number"
          class="mb-3"
        />

        <a-text-field
          v-model="newKat.deskripsi"
          label="Deskripsi"
          class="mb-3"
        />

      </v-card-text>

      <v-divider />

      <v-card-actions class="px-5 py-5">
        <v-btn color="red" variant="flat" @click="closeDialogAdd">Batal</v-btn>
        <v-btn color="#365B97" variant="flat" @click="saveKategori">Simpan</v-btn>
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
        EDIT KATEGORI AKUN
      </v-card-title>

      <v-card-text class="pa-8">

        <a-text-field
          v-model="editKat.nama"
          label="Nama Kategori"
          class="mb-3"
        />

        <a-select
          v-model="editKat.tipe"
          :items="['Aset','Kewajiban','Modal','Pendapatan','Beban']"
          label="Tipe"
          class="mb-3"
        />

        <a-select
          v-model="editKat.posisi"
          :items="['Debit','Kredit']"
          label="Posisi Saldo"
          class="mb-3"
        />

        <a-text-field
          v-model="editKat.kelompok"
          label="Kelompok Laporan"
          class="mb-3"
        />

        <a-text-field
          v-model.number="editKat.urutan"
          label="Urutan"
          type="number"
          class="mb-3"
        />

        <a-text-field
          v-model="editKat.deskripsi"
          label="Deskripsi"
          class="mb-3"
        />

      </v-card-text>

      <v-divider />

      <v-card-actions class="px-5 py-5">
        <v-btn color="red" variant="flat" @click="closeDialogEdit">Batal</v-btn>
        <v-btn color="#365B97" variant="flat" @click="ubahKategori">Edit</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- ========== HEADER PAGE ========== -->
  <v-row align="center">
    <v-col cols="9">
      <v-breadcrumbs>
        <v-breadcrumbs-item active>
          <span class="font-weight-medium text-h5"> Kategori Akun </span>
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
        </v-btn>
      </v-btn-toggle>
    </v-col>
  </v-row>

  <!-- ========== TABLE ========== -->
  <v-row>
    <v-col>
      <v-card flat rounded="lg" class="border">
        <v-card-title class="font-weight-bold">
          <v-row class="ma-0" align="center" justify="end">

            <button type="button" class="button mr-3" @click="refreshData">
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
          :headers="data.headKategori"
          :items="kategoriStore.getDataKategoriAkun"
          :search="data.search"
        >
          <template #item.no="{ index }">
            {{ index + 1 }}
          </template>

          <template #item.aktif="{ item }">
            <v-chip :color="item.aktif ? 'green' : 'red'" size="small">
              {{ item.aktif ? "Aktif" : "Tidak Aktif" }}
            </v-chip>
          </template>

          <template #item.aksi="{ item }">
            <v-row justify="center">
              <v-btn
                size="20"
                color="#365B97"
                class="ma-2"
                @click="openDialogEdit(item)"
              >
                <v-icon size="14">mdi-pencil</v-icon>
              </v-btn>

              <v-btn size="20" color="red" @click="hapusKategori(item.id)">
                <v-icon size="14">mdi-delete</v-icon>
              </v-btn>
            </v-row>
          </template>
        </v-data-table>

      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { useMasterKategoriAkunStore } from "~/stores/perusahaan/kategoriAkunStore";

import type { ConfirmationDialog } from "#components";
import _ from "lodash";
import type { kategoriAkunM } from "~/types/akutansi";

definePageMeta({
  layout: "perusahaan",
});

const kategoriStore = useMasterKategoriAkunStore();
const userStore = useUserStore();
const notificationStore = useNotificationStore();
const confirmationDialog =
  ref<InstanceType<typeof ConfirmationDialog> | null>(null);

onMounted(async () => {
  await kategoriStore.tarikDataKategoriAkunAct();
});

const newKat = ref<kategoriAkunM>({
  id: "",
  nama: "",
  tipe: "",
  posisi: "",
  kelompok: "",
  urutan: 0,
  aktif: true,
});

const editKat = ref<kategoriAkunM>({
  id: "",
  nama: "",
  tipe: "",
  posisi: "",
  kelompok: "",
  urutan: 0,
  aktif: true,
});

const data = reactive({
  search: "",
  dialogAdd: false,
  dialogEdit: false,

  headKategori: [
    { title: "No", value: "no" },
    { title: "Nama", value: "nama", sortable: true },
    { title: "Tipe", value: "tipe" },
    { title: "Posisi", value: "posisi" },
    { title: "Kelompok", value: "kelompok" },
    { title: "Urutan", value: "urutan" },
    { title: "Aksi", value: "aksi", align: "center" },
  ],
});

const openDialogAdd = () => {
  data.dialogAdd = true;
};

const closeDialogAdd = () => {
  Object.assign(newKat.value, {
    id: "",
    nama: "",
    tipe: "",
    posisi: "",
    kelompok: "",
    urutan: 0,
    aktif: true,
  });
  data.dialogAdd = false;
};

const saveKategori = () => {
  const a = newKat.value;

  if (!a.nama) return notificationStore.showError("Nama kategori wajib diisi");
  if (!a.tipe) return notificationStore.showError("Tipe wajib diisi");
  if (!a.posisi) return notificationStore.showError("Posisi wajib diisi");

  a.id = "kat_" + _.kebabCase(a.nama);
  a.created_at = tanggalunixskrg();
  a.created_by = userStore.getEmail;

  kategoriStore.addKategoriAkunAct(a);
  data.dialogAdd = false;
};

const openDialogEdit = (item: kategoriAkunM) => {
  editKat.value = _.assign({}, item);
  data.dialogEdit = true;
};

const closeDialogEdit = () => {
  data.dialogEdit = false;
};

const ubahKategori = async () => {
  const a = editKat.value;

  const ok = await confirmationDialog.value?.show(
    "Konfirmasi Edit",
    "Simpan perubahan kategori?"
  );

  if (!ok) return notificationStore.showError("Edit dibatalkan");

  a.updated_at = tanggalunixskrg();
  a.updated_by = userStore.getEmail;

  kategoriStore.updateKategoriAkunAct(a);
  data.dialogEdit = false;
};

const hapusKategori = async (id: string) => {
  const ok = await confirmationDialog.value?.show(
    "Konfirmasi Hapus",
    "Hapus kategori akun ini?"
  );

  if (!ok) return notificationStore.showError("Penghapusan dibatalkan");

  kategoriStore.deleteKategoriAkunAct(id);
};

async function refreshData() {
  useloadingStore().setLoading(true);
  sessionStorage.removeItem("m_kategori_akun");
  await kategoriStore.tarikDataKategoriAkunAct();
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
  padding: 0.4rem 0.6rem;
  cursor: pointer;
  margin-right: 0.5rem;
  display: inline-flex;
  align-items: center;
  border: none;
}

.button:hover {
  background-color: #0aa12d;
}

.button svg {
  width: 1rem;
  height: 1rem;
  margin-right: 0.75rem;
}

.button:hover svg {
  animation: spin_357 0.5s linear;
}

@keyframes spin_357 {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
