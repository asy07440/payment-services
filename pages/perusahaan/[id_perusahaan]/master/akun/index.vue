<template>
  <v-row align="center">
    <v-col cols="9">
      <v-breadcrumbs>
        <v-breadcrumbs-item active>
          <span class="font-weight-medium text-h5"> Master Akun </span>
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
            Tambah Data Akun
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

        <v-data-table :headers="data.headAkun" :search="data.search">
          <template v-slot:item.no="{ index }">
            {{ index + 1 }}
          </template>

          <template v-slot:item.action="{ item }">
            <v-row justify="center" align="center">
              <v-btn
                color="#365B97"
                size="20"
                @click="opendialogedit(item)"
                class="ma-2"
              >
                <v-icon size="13">mdi-pencil</v-icon>
              </v-btn>

              <v-btn
                color="red"
                size="20"
                @click="deleteMasterStatusTrackingAct(item.id!)"
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
import type { akunM } from '~/types/akutansi';



definePageMeta({
  layout: "admin",
});

const newAkun = ref<akunM>({
  kode_akun: "",
  nama_akun: "",
  tipe: "",
  kategori: "",
  posisi: "",
  aktif: false,
  id: '',
  kelompok: ''
});

const editAkun = ref<akunM>({
  kode_akun: "",
  nama_akun: "",
  tipe: "",
  kategori: "",
  posisi: "",
  aktif: false,
  id: '',
  kelompok: ''
});

// Posisi = "Debit" | "Kredit"

const data = reactive({
  search: "",
  itemKategori: [],
  dialogAdd: false,

  headAkun: [
    { title: "No", value: "no" },
    { title: "Kode", value: "kode_akun", sortable: true },
    { title: "Nama", value: "nama_akun", sortable: true },
    { title: "Tipe", value: "tipe", sortable: true },
    { title: "Kategori", value: "kategori", sortable: true },
    { title: "Posisi Saldo", value: "posisi", sortable: true },
    { title: "Status Aktif", value: "aktif", sortable: true },
    { title: "Aksi", value: "aksi" },
  ],
});

const openDialogAdd = () => {
  data.dialogAdd = true;
};
</script>
