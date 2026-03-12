import { defineStore } from "pinia";
import type { perusahaanM } from "~/types/akutansi";


export const useMasterPerusahaanStore = defineStore("m_perusahaan", {
  state: () => {
    return {
      dataPerusahaan: [] as perusahaanM[],
    };
  },

  getters: {
    getDataPerusahaan(state) {
      return state.dataPerusahaan;
    },
  },

  actions: {
    async updateMasterPerusahaanAct(lemparPerusahaan: perusahaanM) {
      const notificationStore = useNotificationStore();
      try {
        useloadingStore().setLoading(true);

        await updatedatabase("m_perusahaan", lemparPerusahaan.id!, lemparPerusahaan);
        this.tarikDataPerusahaanAct();

        notificationStore.showSuccess("Perubahan berhasil disimpan");
        useloadingStore().setLoading(false);
      } catch (error) {
        notificationStore.showError("Gagal memperbarui data");
      }
    },

    async addMasterPerusahaanAct(lemparPerusahaan: perusahaanM) {
      const notificationStore = useNotificationStore();
      try {
        useloadingStore().setLoading(true);
        const id = 'PRSH-' + makerandom()
        await setdatabase('m_perusahaan', id, lemparPerusahaan)
        // await createUserApi(
        //   lemparPerusahaan.email,
        //   "qwerty",
        //   lemparPerusahaan.nama,
        //   "master_perusahaan"
        // );

        this.tarikDataPerusahaanAct();

        notificationStore.showSuccess("Data berhasil ditambahkan");
        useloadingStore().setLoading(false);
      } catch (error) {
        notificationStore.showError("Gagal menyimpan data");
        useloadingStore().setLoading(false);
      }
    },

    async deleteMasterPerusahaanAct(id: string) {
      const notificationStore = useNotificationStore();
      try {
        useloadingStore().setLoading(true);

        await hapusdatabase("m_perusahaan", id);
        this.tarikDataPerusahaanAct();

        notificationStore.showSuccess("Data Berhasil Dihapus");
        useloadingStore().setLoading(false);
      } catch (error) {
        notificationStore.showError("Gagal menghapus data");
      }
    },

    async tarikDataPerusahaanAct() {
      const datatarik = await queryambilidsesion("m_perusahaan");
      this.dataPerusahaan = datatarik as unknown as perusahaanM[];
    },
  },
});
