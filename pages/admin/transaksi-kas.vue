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
        TAMBAH TRANSAKASI KAS
      </v-card-title>

      <v-card-text class="pa-8">
        <a-date-picker
          v-model="newTransakasiKas.tanggal"
          label="Tanggal"
          class="mb-3"
        />

        <a-select
          v-model="newTransakasiKas.tipe"
          :items="['KAS MASUK', 'KAS KELUAR']"
          label="Tipe"
          class="mb-3"
        />

        <a-select
          v-model="pilihAkunKas"
          :items="saldoAwalStore.getDataSaldoAwal"
          item-title="nama_akun"
          item-value="id"
          label="Akun Kas"
          class="mb-3"
        />

        <a-select
          v-model="pilihAkunLawan"
          :items="saldoAwalStore.getDataSaldoAwal"
          item-title="nama_akun"
          item-value="id"
          label="Akun Lawan"
          class="mb-3"
        />

        <a-text-field
          v-model="newTransakasiKas.keterangan"
          label="Keterangan"
          class="mb-3"
        />

        <v-row>
          <v-col cols="12" sm="6">
            <a-field-number
              v-model="newTransakasiKas.total"
              label="Total"
              class="mb-3"
            />
          </v-col>

          <v-col cols="12" sm="6">
            <v-checkbox
              v-model="newTransakasiKas.status_jurnal"
              color="success"
              label="Status Jurnal"
              hide-details
              class="mt-4"
            />
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider />

      <v-card-actions class="px-5 py-5">
        <v-btn color="red" variant="flat" @click="closeDialogAdd">
          Batal
        </v-btn>

        <v-btn color="#365B97" variant="flat" @click="savetransaksikas">
          Simpan
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-row>
    <v-col>
      <v-breadcrumbs>
        <v-breadcrumbs-item active>
          <span class="font-weight-medium text-h5"> Transaksi Kas </span>
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
            :headers="data.headTransaksiKas"
            :search="data.search"
            :items="transaksikasstore.getDataTransaksiKas"
            density="comfortable"
            class="rounded-lg"
          >
            <template v-slot:item.no="{ index }">
              {{ index + 1 }}.
            </template>

            <template v-slot:item.total="{ item }">
              {{ rupiah(item.total) }}
            </template>

            <template v-slot:item.status_jurnal="{ item }">
              <v-chip
                :color="item.status_jurnal ? '#19be17' : 'red'"
                size="small"
                text-color="white"
                rounded="lg"
                class="font-weight-bold"
              >
                {{ item.status_jurnal ? "Aktif" : "Tidak Aktif" }}
              </v-chip>
            </template>

            <template v-slot:item.aksi="{ item }">
              <v-row justify="center" align="center">
                <v-btn color="red" size="20">
                  <v-icon
                    size="13"
                    icon="mdi-delete"
                    @click="hapustransaksi(item.id)"
                  />
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
import moment from "moment";
import type { akunKasM, transaksiKasM } from "~/types/akutansi";

definePageMeta({
  layout: "admin",
});

const saldoAwalStore = useSaldoStore();
const transaksikasstore = useTransaksiKasStore();
const notificationStore = useNotificationStore();
const confirmationDialog = ref<InstanceType<typeof ConfirmationDialog> | null>(
  null
);

onMounted(async () => {
  await transaksikasstore.tarikDataTransaksiKasAct();
});

const newTransakasiKas = ref<transaksiKasM>({
  tanggal: "",
  tipe: "",
  akun_kas: [],
  akun_lawan: [],
  keterangan: "",
  total: 0,
  status_jurnal: false,
  id_perusahaan: "",
});

const newakunkas = ref<akunKasM>({
  nama: "",
  kode: "",
});

const data = reactive({
  search: "",
  dialogAdd: false,
  dialogEdit: false,

  headTransaksiKas: [
    { title: "No", value: "no" },
    { title: "Tanggal", value: "tanggal", sortable: true },
    { title: "Keterangan", value: "keterangan", sortable: true },
    { title: "Total ", value: "total", sortable: true },
    { title: "Dibuat Oleh", value: "created_by", sortable: true },
    {
      title: "Status Jurnal",
      align: "center" as const,
      value: "status_jurnal",
      sortable: true,
    },
    { title: "Aksi", align: "center" as const, value: "aksi" },
  ],
});

// watch(
//   () => newakunkas.value.kode,
//   (id_kategori) => {
//     const kategoriStore = saldoAwalStore.getDataSaldoAwal;

//     const b = _.find(kategoriStore, (o: any) => o.id == id_kategori);
//     if (!_.isUndefined(b)) {
//       newakunkas.value.nama = b!.nama_akun;
//     }
//   }
// );

// dua ref sementara untuk select
const pilihAkunKas = ref("");
const pilihAkunLawan = ref("");

watch(pilihAkunKas, (id) => {
  if (!id) return;
  const akun = _.find(saldoAwalStore.getDataSaldoAwal, (o: any) => o.id === id);
  if (akun) {
    const sudahAda = newTransakasiKas.value.akun_kas.some((a) => a.kode === id);
    if (!sudahAda) {
      newTransakasiKas.value.akun_kas.push({
        kode: id,
        nama: akun.nama_akun,
      });
    }
  }
});

watch(pilihAkunLawan, (id) => {
  if (!id) return;
  const akun = _.find(saldoAwalStore.getDataSaldoAwal, (o: any) => o.id === id);
  if (akun) {
    const sudahAda = newTransakasiKas.value.akun_lawan.some(
      (a) => a.kode === id
    );
    if (!sudahAda) {
      newTransakasiKas.value.akun_lawan.push({
        kode: id,
        nama: akun.nama_akun,
      });
    }
  }
});

const openDialogAdd = async () => {
  await saldoAwalStore.tarikDataSaldoAwalAct();
  data.dialogAdd = true;
};

const closeDialogAdd = () => {
  data.dialogAdd = false;
  pilihAkunKas.value = "";
  pilihAkunLawan.value = "";
  newTransakasiKas.value = {
    tanggal: "",
    tipe: "",
    akun_kas: [],
    akun_lawan: [],
    keterangan: "",
    total: 0,
    status_jurnal: false,
  };
};

function savetransaksikas() {
  if (newTransakasiKas.value.tanggal == "") {
    return notificationStore.showError("tanggal tidak boleh kosong");
  }
  if (newTransakasiKas.value.tipe == "") {
    return notificationStore.showError("tipe tidak boleh kosong");
  }
  if (pilihAkunKas.value == "") {
    return notificationStore.showError("akun kas tidak boleh kosong");
  }
  if (pilihAkunLawan.value == "") {
    return notificationStore.showError("akun lawan kas tidak boleh kosong");
  }
  if (newTransakasiKas.value.keterangan == "") {
    return notificationStore.showError("keterangan tidak boleh kosong");
  }
  if (newTransakasiKas.value.total == 0) {
    return notificationStore.showError("total tidak boleh 0");
  }
  newTransakasiKas.value.created_at = moment().unix();
  newTransakasiKas.value.created_by = useUserStore().getEmail;
  transaksikasstore.addTransaksiKasAct(newTransakasiKas.value);
  closeDialogAdd();
}

function hapustransaksi(id: string) {
  transaksikasstore.deleteTransaksiKasAct(id);
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
