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
        TAMBAH SALDO AWAL
      </v-card-title>

      <v-card-text class="pa-8">
        <a-select
          v-model="newSaldoAwal.kode_akun"
          :items="akunStore.getDataAkun"
          item-title="kode_akun"
          item-value="id"
          label="Kode Akun"
          class="mb-3"
        />

        <a-text-field
          v-model="newSaldoAwal.nama_akun"
          disabled
          label="Nama Akun"
          class="mb-3"
        />

        <a-text-field
          v-model="newSaldoAwal.posisi"
          label="Posisi"
          disabled
          class="mb-3"
        />

        <a-field-number
          v-model.number="newSaldoAwal.saldo_awal"
          label="Saldo Awal"
          type="number"
          class="mb-3"
        />
      </v-card-text>

      <v-divider />

      <v-card-actions class="px-5 py-5">
        <v-btn color="red" @click="closeDialogAdd" variant="flat">
          Batal
        </v-btn>

        <v-btn color="#365B97" variant="flat" @click="saveSaldoAwal">
          Simpan
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog
    v-model="data.dialogEdit"
    :width="$vuetify.display.mdAndUp ? '30%' : '380px'"
  >
    <v-card>
      <v-card-title
        class="font-weight-bold text-white pa-3 text-center"
        style="background: linear-gradient(to top, #0059f0, #0982f6, #0e96f9)"
      >
        EDIT SALDO AWAL
      </v-card-title>

      <v-card-text class="pa-8">
        <a-select
          v-model="editSaldoAwal.kode_akun"
          :items="akunStore.getDataAkun"
          item-title="kode_akun"
          item-value="id"
          label="Kode Akun"
          class="mb-3"
        />

        <a-text-field
          v-model="editSaldoAwal.nama_akun"
          disabled
          label="Nama Akun"
          class="mb-3"
        />

        <a-text-field
          v-model="editSaldoAwal.posisi"
          label="Posisi"
          disabled
          class="mb-3"
        />

        <a-field-number
          v-model.number="editSaldoAwal.saldo_awal"
          label="Saldo Awal"
          type="number"
          class="mb-3"
        />
      </v-card-text>

      <v-divider />

      <v-card-actions class="px-5 py-5">
        <v-btn color="red" @click="closeDialogAdd" variant="flat">
          Batal
        </v-btn>

        <v-btn color="#365B97" variant="flat" @click="ubahSaldoAwal">
          Edit
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-row>
    <v-col>
      <v-breadcrumbs>
        <v-breadcrumbs-item active>
          <span class="font-weight-medium text-h5"> Saldo Awal </span>
        </v-breadcrumbs-item>
      </v-breadcrumbs>
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
                  Tambah Akun
                </v-tooltip>
              </v-btn>
            </v-btn-toggle>
          </div>
        </v-card-title>

        <v-divider class="my-0" />

        <v-card-text>
          <v-data-table
            :headers="data.headSaldoAwal"
            :search="data.search"
            :items="saldoAwalStore.getDataSaldoAwal"
            density="comfortable"
            class="rounded-lg"
          >
            <template v-slot:item.no="{ index }">
              {{ index + 1 }}
            </template>

            <template v-slot:item.saldo_awal="{ item }">
              {{ rupiah(item.saldo_awal) }}
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
                    item.posisi === 'Debit'
                      ? 'mdi-arrow-left'
                      : 'mdi-arrow-right'
                  "
                />
                {{ item.posisi }}
              </v-chip>
            </template>

            <template v-slot:item.aksi="{ item }">
              <v-row justify="center" align="center">
                <v-btn
                  color="blue"
                  size="20"
                  @click="openDialogEdit(item)"
                  class="ma-2"
                >
                  <v-icon size="13">mdi-pencil</v-icon>
                </v-btn>

                <v-btn color="red" size="20" @click="hapusSaldoAwal(item.id!)">
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
import _ from "lodash";
import type { ConfirmationDialog } from "#components";
import { useMasterAkunStore } from "~/stores/master/akunStore";
import type { saldoAwalM } from "~/types/akutansi";

definePageMeta({
  layout: "admin",
});

const akunStore = useMasterAkunStore();
const userStore = useUserStore();
const saldoAwalStore = useSaldoStore();
const notificationStore = useNotificationStore();
const confirmationDialog = ref<InstanceType<typeof ConfirmationDialog> | null>(
  null
);

onMounted(async () => {
  await saldoAwalStore.tarikDataSaldoAwalAct();
});

const newSaldoAwal = ref<saldoAwalM>({
  kode_akun: "",
  nama_akun: "",
  saldo_awal: 0,
  posisi: "",
});

const editSaldoAwal = ref<saldoAwalM>({
  kode_akun: "",
  nama_akun: "",
  saldo_awal: 0,
  posisi: "",
});

const data = reactive({
  search: "",
  dialogAdd: false,
  dialogEdit: false,

  headSaldoAwal: [
    { title: "No", value: "no" },
    { title: "Kode Akun", value: "kode_akun", sortable: true },
    { title: "Nama Akun", value: "nama_akun", sortable: true },
    { title: "Saldo Awal", value: "saldo_awal", sortable: true },
    {
      title: "Posisi Saldo",
      align: "center" as const,
      value: "posisi",
      sortable: true,
    },
    { title: "Aksi", align: "center" as const, value: "aksi" },
  ],
});

watch(
  () => newSaldoAwal.value.kode_akun,
  (id_akun) => {
    const dataAkun = akunStore.getDataAkun;

    const b = _.find(dataAkun, (o: any) => o.id == id_akun);
    if (!_.isUndefined(b)) {
      newSaldoAwal.value.posisi = b!.posisi;
      newSaldoAwal.value.nama_akun = b!.nama_akun;
    }
  }
);

watch(
  () => editSaldoAwal.value.kode_akun,
  (id_akun) => {
    const dataAkun = akunStore.getDataAkun;

    const b = _.find(dataAkun, (o: any) => o.id == id_akun);
    if (!_.isUndefined(b)) {
      editSaldoAwal.value.posisi = b!.posisi;
      editSaldoAwal.value.nama_akun = b!.nama_akun;
    }
  }
);

const openDialogAdd = async () => {
  await akunStore.tarikDataTemplateAkunAct();
  data.dialogAdd = true;
};

const closeDialogAdd = () => {
  newSaldoAwal.value = {
    kode_akun: "",
    nama_akun: "",
    saldo_awal: 0,
    posisi: "",
  };
  data.dialogAdd = false;
};

const saveSaldoAwal = () => {
  const saldoSave = newSaldoAwal.value;

  // Validasi wajib diisi
  if (saldoSave.saldo_awal === null || saldoSave.saldo_awal === undefined) {
    notificationStore.showError("Saldo Awal wajib diisi");
    return;
  }

  if (saldoSave.saldo_awal < 0) {
    notificationStore.showError("Saldo Awal tidak boleh negatif");
    return;
  }

  // Isi metadata
  saldoSave.created_at = tanggalunixskrg();
  saldoSave.created_by = userStore.getEmail;

  // Simpan data
  saldoAwalStore.addSaldoAwalAct(saldoSave);

  // Tutup dialog dan reset form
  closeDialogAdd();

  // Notifikasi sukses
  notificationStore.showSuccess("Saldo awal berhasil disimpan");
};

const openDialogEdit = async (item: saldoAwalM) => {
  await akunStore.tarikDataTemplateAkunAct();
  editSaldoAwal.value = _.assign({}, item);
  data.dialogEdit = true;
};

const closeDialogEdit = () => {
  newSaldoAwal.value = {
    kode_akun: "",
    nama_akun: "",
    saldo_awal: 0,
    posisi: "",
  };
  data.dialogEdit = false;
};

async function hapusSaldoAwal(id: string) {
  const confirmed = await confirmationDialog.value?.show(
    "Konfirmasi Hapus",
    "Anda yakin ingin menghapus data ini?"
  );

  if (!confirmed) {
    return notificationStore.showError("Penghapusan Dibatalkan");
  }

  saldoAwalStore.deleteSaldoAwalAct(id);
}

const ubahSaldoAwal = async () => {
  const saldoAwalEdit = editSaldoAwal.value;

  // Validasi wajib diisi
  const confirmed = await confirmationDialog.value?.show(
    "Konfirmasi Edit",
    "Anda yakin ingin menyimpan perubahan ini?"
  );

  if (!confirmed) {
    return notificationStore.showError("Perubahan Dibatalkan");
  }

  // Isi metadata
  saldoAwalEdit.created_at = tanggalunixskrg();
  saldoAwalEdit.created_by = userStore.getEmail;

  // Simpan data
  saldoAwalStore.addSaldoAwalAct(saldoAwalEdit);

  // Tutup dialog dan reset form
  closeDialogEdit();

  // Notifikasi sukses
  notificationStore.showSuccess("Saldo awal berhasil disimpan");
};
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
