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
        TAMBAH USERS
      </v-card-title>

      <v-card-text>
        <a-text-field v-model="newUsers.nama" label="Nama" class="mb-3" />

        <a-text-field v-model="newUsers.email" label="Email" class="mb-3" />

        <a-select
          v-model="newUsers.role"
          :items="data.itemRole"
          label="Role"
          class="mb-3"
        />
      </v-card-text>

      <v-divider />

      <v-card-actions class="pa-3 bg-grey-lighten-4">
        <v-btn color="red" @click="closeDialogAdd" variant="flat">
          Batal
        </v-btn>

        <v-btn color="primary" @click="saveUsers" variant="flat">
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
        EDIT USERS
      </v-card-title>

      <v-card-text>
        <a-text-field v-model="editUsers.nama" label="Nama" class="mb-3" />

        <a-text-field v-model="editUsers.email" label="Email" class="mb-3" />

        <a-select
          v-model="editUsers.role"
          :items="data.itemRole"
          label="Role"
          class="mb-3"
        />
      </v-card-text>

      <v-divider />

      <v-card-actions class="pa-3 bg-grey-lighten-4">
        <v-btn color="red" @click="closeDialogEdit" variant="flat">
          Batal
        </v-btn>

        <v-btn color="primary" @click="ubahUsers" variant="flat"> Edit </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-row align="center" class="mb-2">
    <v-col cols="11">
      <v-breadcrumbs>
        <v-breadcrumbs-item active>
          <span class="font-weight-medium text-h5"> Master Users </span>
        </v-breadcrumbs-item>
      </v-breadcrumbs>
    </v-col>

    <v-col cols="1">
      <v-btn
        color="white"
        class="border"
        flat
        size="35"
        @click="refreshData"
      >
        <v-icon icon="mdi-cached" />
        <v-tooltip activator="parent" location="top"> Refresh Data </v-tooltip>
      </v-btn>
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
                  Tambah Users
                </v-tooltip>
              </v-btn>
            </v-btn-toggle>
          </div>
        </v-card-title>

        <v-divider class="my-0" />

        <v-card-text>
          <v-data-table
            :headers="data.headUser"
            :search="data.search"
            :items="masterUserStore.getDataUsers"
            density="comfortable"
            class="rounded-lg"
          >
            <template v-slot:item.no="{ index }"> {{ index + 1 }}. </template>

            <template v-slot:item.role="{ item }">
              {{ item.role }}
            </template>

            <template v-slot:item.aksi="{ item }">
              <v-row justify="center" align="center" class="ma-0">
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
                  @click="hapusUsers(item.id!)"
                  class="ma-1"
                >
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
import _ from "lodash";
import type { ConfirmationDialog } from "#components";
import { useMasterUsersStore } from "~/stores/master/userStore";
import type { usersM } from "~/types/akutansi";

definePageMeta({
  layout: "admin",
});

const userStore = useUserStore();
const masterUserStore = useMasterUsersStore();
const notificationStore = useNotificationStore();
const confirmationDialog = ref<InstanceType<typeof ConfirmationDialog> | null>(
  null
);

onMounted(async () => {
  await masterUserStore.tarikDataUsersAct();
});

const newUsers = ref<usersM>({
  email: "",
  nama: "",
  role: "",
  id_perusahaan: "",
});

const editUsers = ref<usersM>({
  email: "",
  nama: "",
  role: "",
  id_perusahaan: "",
});

const data = reactive({
  search: "",
  dialogAdd: false,
  dialogEdit: false,
  itemRole: ["Administrator", "Akuntan", "Viewer"],

  headUser: [
    { title: "No", value: "no", width: "50px" },
    { title: "Nama User", value: "displayName", sortable: true },
    { title: "Email", value: "email", sortable: true },
    { title: "Role", value: "role", sortable: true },
    { title: "Aksi", align: "center" as const, value: "aksi", width: "100px" },
  ],
});

const openDialogAdd = () => {
  data.dialogAdd = true;
};

const closeDialogAdd = () => {
  data.dialogAdd = false;
};

const saveUsers = () => {
  const usersSave = newUsers.value;

  if (usersSave.nama == "") {
    return notificationStore.showError("Nama kategori akun tidak boleh kosong");
  }

  usersSave.created_at = tanggalunixskrg();
  usersSave.created_by = userStore.getEmail;
  masterUserStore.addMasterUsersAct(usersSave);
  closeDialogAdd();
};

const openDialogEdit = (item: usersM) => {
  editUsers.value = _.assign({}, item);
  data.dialogEdit = true;
};

const closeDialogEdit = () => {
  data.dialogEdit = false;
};

const ubahUsers = () => {
  const usersEdit = newUsers.value;

  if (usersEdit.nama == "") {
    return notificationStore.showError("Nama kategori akun tidak boleh kosong");
  }

  usersEdit.created_at = tanggalunixskrg();
  usersEdit.created_by = userStore.getEmail;
  masterUserStore.addMasterUsersAct(usersEdit);
  closeDialogAdd();
};

const hapusUsers = async (id: string) => {
  const confirmed = await confirmationDialog.value?.show(
    "Konfirmasi Hapus",
    "Anda yakin ingin menghapus data ini?"
  );

  if (!confirmed) {
    return notificationStore.showError("Penghapusan Dibatalkan");
  }

  masterUserStore.deleteMasterUsersAct(id);
};

async function refreshData() {
  useloadingStore().setLoading(true);
  sessionStorage.removeItem("m_users"); // Hapus dulu
  await masterUserStore.tarikDataUsersAct(); // Lalu tarik ulang datanya
  useloadingStore().setLoading(false);
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
