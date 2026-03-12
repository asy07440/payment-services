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
        TAMBAH AKUN
      </v-card-title>

      <v-card-text>
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

        <a-select
          v-model="newAkun.id_kategori"
          :items="akunStore.getDataKategoriAkun"
          item-title="nama"
          item-value="id"
          label="Kategori"
          class="mb-3"
        />

        <a-text-field v-model="newAkun.tipe" label="Tipe" class="mb-3" />

        <a-text-field v-model="newAkun.posisi" label="Posisi" class="mb-3" />
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
          @click="saveAkun"
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
        EDIT AKUN
      </v-card-title>

      <v-card-text class="pa-8">
        <a-text-field
          v-model="editAkun.kode_akun"
          label="Kode Akun"
          class="mb-3"
          disabled
        />

        <a-text-field
          v-model="editAkun.nama_akun"
          label="Nama Akun"
          class="mb-3"
        />

        <a-select
          v-model="editAkun.id_kategori"
          :items="akunStore.getDataKategoriAkun"
          item-title="nama"
          item-value="id"
          label="Kategori"
          class="mb-3"
        />

        <a-text-field v-model="editAkun.tipe" label="Tipe" class="mb-3" />

        <a-text-field v-model="editAkun.posisi" label="Posisi" class="mb-3" />
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
          @click="ubahAkun"
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
          <span class="font-weight-medium text-h5"> Master Akun </span>
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
              Tambah Akun
            </v-tooltip>
          </v-btn>
        </v-btn-toggle>
      </div>
    </v-card-title>

    <v-divider class="my-0" />

    <v-card-text>
      <v-data-table
        :headers="data.headAkun"
        :items="akunStore.getDataAkun"
        :search="data.search"
        density="comfortable"
        class="rounded-lg"
      >
        <template v-slot:item.no="{ index }"> {{ index + 1 }}. </template>

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

            <v-btn color="red" size="20" @click="hapusAkun(item.id!)">
              <v-icon size="13">mdi-delete</v-icon>
            </v-btn>
          </v-row>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type { ConfirmationDialog } from "#components";
import _ from "lodash";
import { useMasterAkunStore } from "~/stores/master/akunStore";
import type { akunM } from "~/types/akutansi";

definePageMeta({
  layout: "admin",
});

const userStore = useUserStore();
const akunStore = useMasterAkunStore();
const notificationStore = useNotificationStore();
const confirmationDialog = ref<InstanceType<typeof ConfirmationDialog> | null>(
  null
);

onMounted(async () => {
  await akunStore.tarikDataTemplateAkunAct();
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
    { title: "No", value: "no", width: "50px" },
    { title: "Kode", value: "kode_akun", sortable: true },
    { title: "Nama", value: "nama_akun", sortable: true },
    { title: "Tipe", value: "tipe", sortable: true },
    {
      title: "Posisi Saldo",
      value: "posisi",
      align: "center" as const,
      sortable: true,
    },
    {
      title: "Status",
      align: "center" as const,
      value: "aktif",
      sortable: true,
    },
    { title: "Aksi", align: "center" as const, value: "aksi", width: "90px" },
  ],
});

watch(
  () => newAkun.value.id_kategori,
  (id_kategori) => {
    const kategoriStore = akunStore.getDataKategoriAkun;

    const b = _.find(kategoriStore, (o: any) => o.id == id_kategori);
    if (!_.isUndefined(b)) {
      newAkun.value.posisi = b!.posisi;
      newAkun.value.aktif = b!.aktif;
      newAkun.value.tipe = b!.tipe;
      newAkun.value.kelompok = b!.kelompok;
      newAkun.value.kategori = b!.nama;
    }
  }
);

watch(
  () => editAkun.value.id_kategori,
  (id_kategori) => {
    const kategoriStore = akunStore.getDataKategoriAkun;

    const b = _.find(kategoriStore, (o: any) => o.id == id_kategori);
    if (!_.isUndefined(b)) {
      editAkun.value.posisi = b!.posisi;
      editAkun.value.aktif = b!.aktif;
      editAkun.value.tipe = b!.tipe;
      editAkun.value.kelompok = b!.kelompok;
      editAkun.value.kategori = b!.nama;
    }
  }
);

const openDialogAdd = async () => {
  await akunStore.tarikDataTemplateKategoriAkunAct();
  data.dialogAdd = true;
};

const closeDialogAdd = () => {
  newAkun.value = {
    kode_akun: "",
    nama_akun: "",
    tipe: "",
    kategori: "",
    posisi: "",
    aktif: false,
    kelompok: "",
    id: "",
  };

  data.dialogAdd = false;
};

const saveAkun = () => {
  const akunSave = newAkun.value;
  const id = "akun_" + akunSave.kode_akun;

  // Validasi wajib diisi
  if (!akunSave.kode_akun) {
    return notificationStore.showError("Kode Akun wajib diisi");
  }

  if (!akunSave.nama_akun) {
    return notificationStore.showError("Nama Akun wajib diisi");
  }

  if (!akunSave.id_kategori) {
    return notificationStore.showError("Kategori wajib dipilih");
  }

  if (!akunSave.tipe) {
    return notificationStore.showError("Tipe wajib diisi");
  }

  if (!akunSave.posisi) {
    return notificationStore.showError("Posisi wajib diisi");
  }

  // Cek duplikat kode akun
  const sudahAda = _.some(akunStore.getDataAkun, {
    kode_akun: akunSave.kode_akun,
  });

  if (sudahAda) {
    return notificationStore.showError("Kode Akun sudah digunakan");
  }

  akunSave.id = id;
  akunSave.created_at = tanggalunixskrg();
  akunSave.created_by = userStore.getEmail;
  akunStore.addMasterTemplateAkunAct(akunSave);
  data.dialogAdd = false;
};

const openDialogEdit = async (item: akunM) => {
  await akunStore.tarikDataTemplateKategoriAkunAct();
  editAkun.value = _.assign({}, item);
  data.dialogEdit = true;
};

const closeDialogEdit = () => {
  newAkun.value = {
    kode_akun: "",
    nama_akun: "",
    tipe: "",
    kategori: "",
    posisi: "",
    aktif: false,
    kelompok: "",
    id: "",
  };

  data.dialogEdit = false;
};

const ubahAkun = async () => {
  const akunEdit = editAkun.value;
  const id = "akun_" + akunEdit.kode_akun;

  const confirmed = await confirmationDialog.value?.show(
    "Konfirmasi Edit",
    "Anda yakin ingin menyimpan perubahan ini?"
  );

  if (!confirmed) {
    return notificationStore.showError("Perubahan Dibatalkan");
  }

  akunEdit.id = id;
  akunEdit.updated_at = tanggalunixskrg();
  akunEdit.updated_by = userStore.getEmail;
  akunStore.updateMasterTemplateAkunAct(akunEdit);
  data.dialogEdit = false;
};

async function hapusAkun(id: string) {
  const confirmed = await confirmationDialog.value?.show(
    "Konfirmasi Hapus",
    "Anda yakin ingin menghapus data ini?"
  );

  if (!confirmed) {
    return notificationStore.showError("Penghapusan Dibatalkan");
  }

  akunStore.deleteMasterTemplateAkunAct(id);
}

async function refreshData() {
  useloadingStore().setLoading(true);
  sessionStorage.removeItem("m_kategori_akun"); // Hapus dulu
  await akunStore.tarikDataTemplateAkunAct(); // Lalu tarik ulang datanya
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
