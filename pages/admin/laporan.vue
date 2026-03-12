<template>
  <ConfirmationDialog ref="confirmationDialog" />

  <v-row align="center">
    <v-col>
      <v-breadcrumbs>
        <v-breadcrumbs-item active>
          <span class="font-weight-medium text-h5"> Laporan </span>
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
        </v-card-title>

        <v-divider class="my-0" />

        <v-card-text>
          <v-data-table
            :headers="data.headLaporan"
            :search="data.search"
            density="comfortable"
            class="rounded-lg"
          >
            <template v-slot:item.no="{ index }">
              {{ index + 1 }}.
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

  headLaporan: [
    { title: "No", value: "no" },
    { title: "Periode", value: "kode_akun", sortable: true },
    { title: "Jenis", value: "nama_akun", sortable: true },
    { title: "Data", value: "data", sortable: true },
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
