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
        style="background: linear-gradient(to top,#0059f0,#0982f6,#0e96f9)"
      >
        TAMBAH PROYEK
      </v-card-title>

      <v-card-text class="pa-8">

        <a-text-field
          v-model="newProyek.nama"
          label="Nama Proyek"
          class="mb-3"
        />

        <a-text-field
          v-model="newProyek.kode"
          label="Kode Proyek"
          class="mb-3"
        />

        <a-textarea
          v-model="newProyek.deskripsi"
          label="Deskripsi"
          class="mb-3"
        />

        <a-text-field
          v-model="newProyek.pic"
          label="PIC / Penanggung Jawab"
          class="mb-3"
        />

        <a-text-field
          v-model="newProyek.client"
          label="Client"
          class="mb-3"
        />

      </v-card-text>

      <v-divider />

      <v-card-actions class="px-5 py-5">
        <v-btn color="red" variant="flat" @click="closeDialogAdd">Batal</v-btn>
        <v-btn color="#365B97" variant="flat" @click="saveProyek">Simpan</v-btn>
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
        style="background: linear-gradient(to top,#0059f0,#0982f6,#0e96f9)"
      >
        EDIT PROYEK
      </v-card-title>

      <v-card-text class="pa-8">

        <a-text-field
          v-model="editProyek.nama"
          label="Nama Proyek"
          class="mb-3"
        />

        <a-text-field
          v-model="editProyek.kode"
          label="Kode Proyek"
          class="mb-3"
        />

        <a-textarea
          v-model="editProyek.deskripsi"
          label="Deskripsi"
          class="mb-3"
        />

        <a-text-field
          v-model="editProyek.pic"
          label="PIC"
          class="mb-3"
        />

        <a-text-field
          v-model="editProyek.client"
          label="Client"
          class="mb-3"
        />

      </v-card-text>

      <v-divider />

      <v-card-actions class="px-5 py-5">
        <v-btn color="red" variant="flat" @click="closeDialogEdit">Batal</v-btn>
        <v-btn color="#365B97" variant="flat" @click="ubahProyek">Edit</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- ================= HEADER ================= -->
  <v-row align="center">
    <v-col cols="9">
      <v-breadcrumbs>
        <v-breadcrumbs-item active>
          <span class="font-weight-medium text-h5">
            Master Proyek
          </span>
        </v-breadcrumbs-item>
      </v-breadcrumbs>
    </v-col>

    <v-col cols="3">
      <v-btn-toggle class="mt-5">
        <v-btn
          style="background-color:#005BAC;color:white"
          size="31"
          @click="openDialogAdd"
        >
          <v-icon icon="mdi-plus" />
        </v-btn>

        <v-btn
          style="background-color:#0074D9;color:white"
          height="31"
          class="text-capitalize font-weight-medium"
          @click="openDialogAdd"
        >
          Tambah Data
        </v-btn>
      </v-btn-toggle>
    </v-col>
  </v-row>

  <!-- ================= TABLE ================= -->
  <v-row>
    <v-col>
      <v-card flat rounded="lg" style="border:1px solid #e0e0e0">
        <v-card-title class="font-weight-bold">
          <v-row align="center" justify="end">

            <button type="button" class="button mr-3" @click="refreshData">
              Refresh Data
            </button>

            <a-text-field
              v-model="data.search"
              placeholder="Cari…"
              hide-details
              density="compact"
              clearable
              style="max-width:250px"
            />

          </v-row>
        </v-card-title>

        <v-divider />

        <v-data-table
          :headers="data.head"
          :items="projekStore.getDataProyek"
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
                class="ma-2"
                @click="openDialogEdit(item)"
              >
                <v-icon size="13">mdi-pencil</v-icon>
              </v-btn>

              <v-btn
                color="red"
                size="20"
                @click="hapusProyek(item.id!)"
              >
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
import { usePerusahaanProjekStore } from "~/stores/perusahaan/projekStore";

import type { ConfirmationDialog } from "#components";
import _ from "lodash";
import type { proyekM } from "~/types/akutansi";

definePageMeta({
  layout: "perusahaan",
});

const projekStore = usePerusahaanProjekStore();
const userStore = useUserStore();
const notificationStore = useNotificationStore();
const confirmationDialog = ref<InstanceType<typeof ConfirmationDialog> | null>(null);

onMounted(async () => {
  await projekStore.tarikDataProyekAct();
});

/* ===================================================
   FORM DATA
=================================================== */

const newProyek = ref<proyekM>({
  id: "",
  nama: "",
  kode: "",
  deskripsi: "",
  pic: "",
  client: "",
  id_perusahaan: "",
});

const editProyek = ref<proyekM>({
  id: "",
  nama: "",
  kode: "",
  deskripsi: "",
  pic: "",
  client: "",
  id_perusahaan: "",
});

const data = reactive({
  dialogAdd: false,
  dialogEdit: false,
  search: "",

  head: [
    { title: "No", value: "no" },
    { title: "Nama", value: "nama", sortable: true },
    { title: "Kode", value: "kode" },
    { title: "PIC", value: "pic" },
    { title: "Client", value: "client" },
    { title: "Aksi", value: "aksi", align: "center" },
  ],
});

/* =============== ADD =============== */

const openDialogAdd = () => (data.dialogAdd = true);

const closeDialogAdd = () => {
  Object.assign(newProyek.value, {
    id: "",
    nama: "",
    kode: "",
    deskripsi: "",
    pic: "",
    client: "",
  });
  data.dialogAdd = false;
};

const saveProyek = () => {
  const p = newProyek.value;

  if (!p.nama) return notificationStore.showError("Nama proyek wajib diisi");
  if (!p.kode) return notificationStore.showError("Kode proyek wajib diisi");

  p.id = "proyek_" + _.kebabCase(p.kode);
  p.id_perusahaan = userStore.getIdPerusahaan;
  p.created_at = tanggalunixskrg();
  p.created_by = userStore.getEmail;

  projekStore.addProyekAct(p);
  data.dialogAdd = false;
};

/* =============== EDIT =============== */

const openDialogEdit = (item: proyekM) => {
  editProyek.value = _.assign({}, item);
  data.dialogEdit = true;
};

const closeDialogEdit = () => {
  data.dialogEdit = false;
};

const ubahProyek = async () => {
  const p = editProyek.value;

  const ok = await confirmationDialog.value?.show(
    "Konfirmasi Edit",
    "Simpan perubahan proyek?"
  );

  if (!ok) return notificationStore.showError("Edit dibatalkan");

  p.updated_at = tanggalunixskrg();
  p.updated_by = userStore.getEmail;

  projekStore.updateProyekAct(p);
  data.dialogEdit = false;
};

/* =============== DELETE =============== */

const hapusProyek = async (id: string) => {
  const ok = await confirmationDialog.value?.show(
    "Konfirmasi Hapus",
    "Hapus proyek ini?"
  );

  if (!ok) return notificationStore.showError("Penghapusan dibatalkan");

  projekStore.deleteProyekAct(id);
};

/* =============== REFRESH =============== */

async function refreshData() {
  useloadingStore().setLoading(true);
  await projekStore.tarikDataProyekAct();
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
  border-radius: .5rem;
  font-size: .6rem;
  padding: .4rem .6rem;
}

.button:hover {
  background-color: #0aa12d;
}
</style>
