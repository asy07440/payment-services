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
        TAMBAH USERS
      </v-card-title>

      <v-card-text class="pa-8">
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

      <v-card-actions class="px-5 py-5">
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
    :width="$vuetify.display.mdAndUp ? '30%' : '380px'"
  >
    <v-card>
      <v-card-title
        class="font-weight-bold text-white pa-3 text-center"
        style="background: linear-gradient(to top, #0059f0, #0982f6, #0e96f9)"
      >
        EDIT USERS
      </v-card-title>

      <v-card-text class="pa-8">
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

      <v-card-actions class="px-5 py-5">
        <v-btn color="red" @click="closeDialogEdit" variant="flat">
          Batal
        </v-btn>

        <v-btn color="primary" @click="ubahUsers" variant="flat">
          Simpan
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-row align="center">
    <v-col cols="9">
      <v-breadcrumbs>
        <v-breadcrumbs-item active>
          <span class="font-weight-medium text-h5"> Master Users </span>
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
            Tambah Users
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
            <button type="button" class="button mr-3" @click="refreshData">
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

        <v-data-table :headers="data.headUser" :search="data.search">
          <template v-slot:item.no="{ index }"> {{ index + 1 }}. </template>

          <template v-slot:item.role="{ item }">
            <!-- <v-chip
              :color="
                {
                  Administrator: 'red-darken-2',
                  Management: 'deep-purple',
                  Admin: 'blue',
                  Vendor: 'amber-darken-3',
                  Operasional: 'green',
                  Client: 'grey-darken-1',
                  Sales: 'purple',
                }[item.role] || 'blue-grey'
              "
              text-color="white"
              size="small"
              label
            >
              {{ item.role }}
            </v-chip> -->

            {{ item.role }}
          </template>

          <template v-slot:item.aksi="{ item }">
            <v-row justify="center" align="center">
              <v-btn
                color="#365B97"
                size="20"
                @click="openDialogEdit(item)"
                class="ma-2"
              >
                <v-icon size="13" icon="mdi-pencil" />
              </v-btn>

              <v-btn color="red" size="20" @click="hapusUsers(item.id!)">
                <v-icon size="13" icon="mdi-delete" />
              </v-btn>
            </v-row>
          </template>
        </v-data-table>
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
    { title: "No", value: "no" },
    { title: "Nama User", value: "nama", sortable: true },
    { title: "Email", value: "email", sortable: true },
    { title: "Role", value: "role", sortable: true },
    { title: "Aksi", align: "center" as const, value: "aksi" },
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
}

.button {
  color: white;
  background-color: #b7b7b7;
  font-weight: 500;
  border-radius: 0.5rem;
  font-size: 0.6rem;
  line-height: 0.6rem;
  padding: 0.4rem 0.6rem;
  cursor: pointer;
  text-align: center;
  margin-right: 0.5rem;
  display: inline-flex;
  align-items: center;
  border: none;
  transition: background-color 0.2s ease;
}

.button:hover {
  background-color: #0aa12d;
}

.button svg {
  display: inline;
  width: 1rem;
  height: 1rem;
  margin-right: 0.75rem;
  color: white;
}

/* animasi ikon berputar saat hover */
.button:hover svg {
  animation: spin_357 0.5s linear;
}

@keyframes spin_357 {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
