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
        TAMBAH JURNAL
      </v-card-title>

      <v-card-text class="pa-8">
        <a-date-picker
          v-model="newJurnal.tanggal"
          label="Tanggal"
          class="mb-3"
        />

        <a-text-field
          v-model="newJurnal.keterangan"
          label="Keterangan"
          class="mb-3"
        />

        <v-row>
          <v-col cols="12" sm="6">
            <a-field-number
              v-model="newJurnal.total_debit"
              label="Total Debit"
              class="mb-3"
            />
          </v-col>

          <v-col cols="12" sm="6">
            <a-field-number
              v-model="newJurnal.total_kredit"
              label="Total Kredit"
              class="mb-3"
            />
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider />

      <v-card-actions class="px-5 py-5">
        <v-btn color="red" variant="flat" @click="closeDialogAdd">
          Batal
        </v-btn>

        <v-btn color="#365B97" variant="flat" @click="savejurnal">
          Simpan
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-row>
    <v-col>
      <v-breadcrumbs>
        <v-breadcrumbs-item active>
          <span class="font-weight-medium text-h5"> Jurnal </span>
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
            :headers="data.headJurnal"
            :items="jurnaltore.getDataJurnal"
            :search="data.search"
            density="comfortable"
            class="rounded-lg"
          >
            <template v-slot:item.no="{ index }"> {{ index + 1 }}. </template>

            <template v-slot:item.total_debit="{ item }">
              {{ rupiah(item.total_debit) }}
            </template>

            <template v-slot:item.total_kredit="{ item }">
              {{ rupiah(item.total_kredit) }}
            </template>

            <template v-slot:item.aksi="{ item }">
              <v-row justify="center" align="center">
                <v-btn color="red" size="20" @click="hapusjurnal(item.id!)">
                  <v-icon size="13" icon="mdi-delete" />
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
import moment from "moment";
import type { jurnalM } from "~/types/akutansi";

definePageMeta({
  layout: "admin",
});
const notificationStore = useNotificationStore();
const confirmationDialog = ref<InstanceType<typeof ConfirmationDialog> | null>(
  null
);
const jurnaltore = useJurnalStore();

onMounted(async () => {
  await jurnaltore.tarikDataJurnalAct();
});

const newJurnal = ref<jurnalM>({
  tanggal: "",
  keterangan: "",
  total_debit: 0,
  total_kredit: 0,
});

const data = reactive({
  search: "",
  dialogAdd: false,
  dialogEdit: false,

  headJurnal: [
    { title: "No", value: "no" },
    { title: "Tanggal", value: "tanggal", sortable: true },
    { title: "Keterangan", value: "keterangan", sortable: true },
    { title: "Total Debit ", value: "total_debit", sortable: true },
    { title: "Total Kredit", value: "total_kredit", sortable: true },
    { title: "Aksi", align: "center" as const, value: "aksi" },
  ],
});

const openDialogAdd = () => {
  data.dialogAdd = true;
};

const closeDialogAdd = () => {
  newJurnal.value = {
    tanggal: "",
    keterangan: "",
    total_debit: 0,
    total_kredit: 0,
  };
  data.dialogAdd = false;
};

function savejurnal() {
  if (newJurnal.value.tanggal == "") {
    return notificationStore.showError("tanggal tidak boleh kosong");
  }
  if (newJurnal.value.keterangan == "") {
    return notificationStore.showError("keterangan tidak boleh kosong");
  }
  if (newJurnal.value.total_debit == 0) {
    return notificationStore.showError("total debit tidak boleh kosong");
  }
  if (newJurnal.value.total_kredit == 0) {
    return notificationStore.showError("total kredit tidak boleh kosong");
  }
  newJurnal.value.created_at = moment().unix();
  newJurnal.value.created_by = useUserStore().getEmail;
  jurnaltore.addJurnalAct(newJurnal.value);
  closeDialogAdd();
}

function hapusjurnal(id: string) {
  jurnaltore.deleteJurnalAct(id);
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
