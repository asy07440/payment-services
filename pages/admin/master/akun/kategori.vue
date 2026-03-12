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
        TAMBAH KATEGORI AKUN
      </v-card-title>

      <v-card-text>
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
              hide-details
              class="mt-4"
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
          @click="saveKategoriAkun"
          variant="flat"
          class="text-capitalize px-3"
          size="small"
        >
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
        EDIT KATEGORI AKUN
      </v-card-title>

      <v-card-text>
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
          v-model="editKategoriAkun.posisi"
          :items="data.itemPosisi"
          label="Posisi"
          class="mb-3"
        />

        <a-select
          v-model="editKategoriAkun.kelompok"
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
              hide-details
              class="mt-4"
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
          @click="ubahKategoriAkun"
          variant="flat"
          class="text-capitalize px-3"
          size="small"
        >
          Edit
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-row align="center">
    <v-col>
      <v-breadcrumbs>
        <v-breadcrumbs-item active>
          <span class="font-weight-medium text-h5"> Master Kategori Akun </span>
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
          placeholder="Search"
          density="compact"
          class="mr-3 custom-search-field"
          style="max-width: 350px; height: 40px"
        />
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
        :headers="data.headKategoriAkun"
        :items="kategoriAkunStore.getDataKategoriAkun"
        :search="data.search"
        :sort-by="[{ key: 'createdAt', order: 'desc' }]"
        :hover="true"
        density="comfortable"
        class="rounded-lg"
      >
        <template v-slot:item.no="{ index }"> {{ index + 1 }}. </template>

        <!-- Chip untuk Kelompok -->
        <template v-slot:item.kelompok="{ item }">
          <v-chip
            :color="item.kelompok === 'Neraca' ? 'blue' : 'green'"
            size="small"
            rounded="lg"
            variant="flat"
            class="font-weight-bold"
          >
            <v-icon
              start
              :icon="
                item.kelompok === 'Neraca'
                  ? 'mdi-scale-balance'
                  : 'mdi-chart-line'
              "
            />
            {{ item.kelompok }}
          </v-chip>
        </template>

        <!-- Chip untuk Posisi -->
        <template v-slot:item.posisi="{ item }">
          <v-chip
            :color="item.posisi === 'Debit' ? 'teal' : 'orange'"
            size="small"
            rounded="lg"
            :style="{
              borderBottom:
                item.posisi === 'Debit'
                  ? '2px solid #0f9284'
                  : '2px solid #f9b90d',
            }"
            :class="
              item.posisi === 'Debit'
                ? 'font-weight-bold'
                : 'font-weight-bold text-orange'
            "
          >
            <v-icon
              start
              :icon="
                item.posisi === 'Debit' ? 'mdi-arrow-left' : 'mdi-arrow-right'
              "
            />
            {{ item.posisi }}
          </v-chip>
        </template>

        <template v-slot:item.aktif="{ item }">
          <v-chip
            :color="item.aktif ? '#19be17' : 'red'"
            size="small"
            text-color="white"
            rounded="lg"
            class="font-weight-bold"
          >
            {{ item.aktif ? "Aktif" : "Tidak Aktif" }}
          </v-chip>
        </template>

        <template v-slot:item.aksi="{ item }">
          <v-row justify="center" align="center">
            <v-btn
              color="#365B97"
              size="20"
              @click="openDialogEdit(item)"
              class="ma-1"
            >
              <v-icon size="13" icon="mdi-pencil" />
            </v-btn>

            <v-btn
              color="red"
              size="20"
              @click="hapusKategoriAkun(item.id!)"
              class="ma-1"
            >
              <v-icon size="13" icon="mdi-delete" />
            </v-btn>
          </v-row>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
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
  await kategoriAkunStore.tarikDataTemplateKategoriAkunAct();
});

const newKategoriAkun = ref<kategoriAkunM>({
  nama: "",
  tipe: "",
  id: "",
  posisi: "",
  kelompok: "",
  urutan: 0,
  aktif: false,
});

const editKategoriAkun = ref<kategoriAkunM>({
  nama: "",
  tipe: "",
  id: "",
  posisi: "",
  kelompok: "",
  urutan: 0,
  aktif: false,
});

const data = reactive({
  search: "",
  dialogAdd: false,
  dialogEdit: false,
  itemTipe: ["Aset", "Kewajiban", "Modal", "Pendapatan", "Beban"],
  itemPosisi: ["Debit", "Kredit"],
  itemKelompok: ["Neraca", "Laba Rugi"],

  headKategoriAkun: [
    { title: "No", value: "no", width: "50px" },
    { title: "Nama Kategori", value: "nama", sortable: true },
    { title: "Tipe", value: "tipe", sortable: true },
    {
      title: "Posisi",
      value: "posisi",
      align: "center" as const,
      sortable: true,
    },
    {
      title: "Kelompok",
      value: "kelompok",
      align: "center" as const,
      sortable: true,
    },
    { title: "Urutan", value: "urutan", sortable: true, width: "50px" },
    {
      title: "Status",
      align: "center" as const,
      value: "aktif",
      sortable: true,
      width: "50px",
    },
    { title: "Aksi", align: "center" as const, value: "aksi" },
  ],
});

// const tambahdata = async () => {
//   for await (const element of data.dataKategoriAkun) {
//     setdatabase("m_template_kategori", element.id, element);
//     console.log('cek data', element.id)
//   }
// };

const openDialogAdd = () => {
  data.dialogAdd = true;
};

const closeDialogAdd = () => {
  newKategoriAkun.value = {
    nama: "",
    id: "",
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
  const namaSnake = _.snakeCase(kategoriAkunSave.nama);
  const id = "kat_" + namaSnake;

  kategoriAkunSave.id = id;

  if (kategoriAkunSave.nama == "") {
    return notificationStore.showError("Nama kategori akun tidak boleh kosong");
  }

  if (!kategoriAkunSave.nama || kategoriAkunSave.nama.trim() === "") {
    return notificationStore.showError("Nama kategori akun wajib diisi");
  }

  if (!kategoriAkunSave.tipe) {
    return notificationStore.showError("Tipe wajib dipilih");
  }

  if (!kategoriAkunSave.posisi) {
    return notificationStore.showError("Posisi wajib dipilih");
  }

  if (!kategoriAkunSave.kelompok) {
    return notificationStore.showError("Kelompok wajib dipilih");
  }

  if (
    kategoriAkunSave.urutan === null ||
    kategoriAkunSave.urutan === undefined ||
    isNaN(Number(kategoriAkunSave.urutan))
  ) {
    return notificationStore.showError("Urutan harus berupa angka");
  }

  kategoriAkunSave.created_at = tanggalunixskrg();
  kategoriAkunSave.created_by = userStore.getEmail;
  kategoriAkunStore.addMasterTemplateKategoriAkunAct(kategoriAkunSave);
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
    id: "",
    posisi: "",
    kelompok: "",
    urutan: 0,
    aktif: false,
  };

  data.dialogEdit = false;
};

const ubahKategoriAkun = async () => {
  const kategoriAkunEdit = newKategoriAkun.value;

  if (kategoriAkunEdit.nama == "") {
    return notificationStore.showError("Nama kategori akun tidak boleh kosong");
  }

  const confirmed = await confirmationDialog.value?.show(
    "Konfirmasi Edit",
    "Anda yakin ingin menyimpan perubahan ini?"
  );

  if (!confirmed) {
    return notificationStore.showError("Perubahan Dibatalkan");
  }

  kategoriAkunEdit.updated_at = tanggalunixskrg();
  kategoriAkunEdit.updated_by = userStore.getEmail;
  kategoriAkunStore.updateMasterTemplateKategoriAkunAct(kategoriAkunEdit);
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

  kategoriAkunStore.deleteMasterTemplateKategoriAkunAct(id);
}

async function refreshData() {
  useloadingStore().setLoading(true);
  sessionStorage.removeItem("m_template_kategori"); // Hapus dulu
  await kategoriAkunStore.tarikDataTemplateKategoriAkunAct(); // Lalu tarik ulang datanya
  useloadingStore().setLoading(false);
}
</script>

<style scoped>
:deep() thead th {
  font-weight: bold !important;
  background-color: #f7f8f9 !important;
  border-right: 1px solid #e0e0e0 !important;
}

/* Untuk sel data juga bisa ditambahkan border jika diinginkan */
:deep() tbody td {
  border-right: 1px solid #e0e0e0 !important;
}

:deep() .v-data-table {
  border: 1px solid #e0e0e0;
}
</style>
