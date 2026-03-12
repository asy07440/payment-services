<template>
  <ConfirmationDialog ref="confirmationDialog" />

  <v-row align="center">
    <v-col>
      <v-breadcrumbs>
        <v-breadcrumbs-item active>
          <span class="font-weight-medium text-h5"> Saldo Harian </span>
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
          <!-- <div class="d-flex align-center">
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
          </div> -->
        </v-card-title>

        <v-divider class="my-0" />

        <v-card-text>
          <v-data-table
            :headers="data.headSaldoHarian"
            :search="data.search"
            density="comfortable"
            class="rounded-lg"
          >
            <template v-slot:item.no="{ index }">
              {{ index + 1 }}
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

            <template v-slot:item.aktif="{ item }">
              <v-chip
                :color="item.aktif ? 'green' : 'red'"
                size="small"
                text-color="white"
                rounded="lg"
                variant="flat"
              >
                {{ item.aktif ? "Aktif" : "Tidak Aktif" }}
              </v-chip>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
});

const data = reactive({
  search: "",

  headSaldoHarian: [
    { title: "No", value: "no" },
    { title: "Kode Akun", value: "kode_akun", sortable: true },
    { title: "Nama Akun", value: "nama_akun", sortable: true },
    { title: "Total Debit", value: "total_debit", sortable: true },
    { title: "Total Kredit", value: "total_kredit", sortable: true },
    {
      title: "Posisi Saldo",
      align: "center" as const,
      value: "posisi",
      sortable: true,
    },
    { title: "Saldo", value: "saldo", sortable: true },
  ],
});
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
