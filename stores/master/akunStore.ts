import { defineStore } from "pinia";
import type { akunM, kategoriAkunM } from "~/types/akutansi";

export const useMasterAkunStore = defineStore("m_akun", {
  state: () => {
    return {
      dataMasterAkun: [] as akunM[],
      dataMasterKategoriAkun: [] as kategoriAkunM[],
    };
  },

  getters: {
    getDataAkun(state) {
      return state.dataMasterAkun;
    },

    getDataKategoriAkun(state) {
      return state.dataMasterKategoriAkun;
    },
  },

  actions: {
    // Template Kategori Akun
    async updateMasterTemplateKategoriAkunAct(
      lemparTemplateKategoriAkun: kategoriAkunM
    ) {
      const notificationStore = useNotificationStore();
      try {
        useloadingStore().setLoading(true);

        await updatedatabase(
          "m_template_kategori",
          lemparTemplateKategoriAkun.id!,
          lemparTemplateKategoriAkun
        );
        this.tarikDataTemplateKategoriAkunAct();

        notificationStore.showSuccess("Perubahan berhasil disimpan");
        useloadingStore().setLoading(false);
      } catch (error) {
        notificationStore.showError("Gagal memperbarui data");
      }
    },

    async addMasterTemplateKategoriAkunAct(lemparKategoriAkun: kategoriAkunM) {
      const notificationStore = useNotificationStore();
      try {
        useloadingStore().setLoading(true);

        await setdatabase(
          "m_template_kategori",
          lemparKategoriAkun.id!,
          lemparKategoriAkun
        );
        this.tarikDataTemplateKategoriAkunAct();

        notificationStore.showSuccess("Data berhasil ditambahkan");
        useloadingStore().setLoading(false);
      } catch (error) {
        notificationStore.showError("Gagal menyimpan data");
        useloadingStore().setLoading(false);
      }
    },

    async deleteMasterTemplateKategoriAkunAct(id: string) {
      const notificationStore = useNotificationStore();
      try {
        useloadingStore().setLoading(true);

        await hapusdatabase("m_template_kategori", id);
        this.tarikDataTemplateKategoriAkunAct();

        notificationStore.showSuccess("Data Berhasil Dihapus");
        useloadingStore().setLoading(false);
      } catch (error) {
        notificationStore.showError("Gagal menghapus data");
      }
    },

    async tarikDataTemplateKategoriAkunAct() {
      const datatarik = await queryambilidsesion("m_template_kategori");
      this.dataMasterKategoriAkun = datatarik as unknown as kategoriAkunM[];
    },

    // Template Akun
    async updateMasterTemplateAkunAct(lemparTemplateAkun: akunM) {
      const notificationStore = useNotificationStore();
      try {
        useloadingStore().setLoading(true);

        await updatedatabase(
          "m_template_akun",
          lemparTemplateAkun.id!,
          lemparTemplateAkun
        );
        this.tarikDataTemplateAkunAct();

        notificationStore.showSuccess("Perubahan berhasil disimpan");
        useloadingStore().setLoading(false);
      } catch (error) {
        notificationStore.showError("Gagal memperbarui data");
      }
    },

    async addMasterTemplateAkunAct(lemparTemplateAkun: akunM) {
      const notificationStore = useNotificationStore();
      try {
        useloadingStore().setLoading(true);

        await setdatabase(
          "m_template_akun",
          lemparTemplateAkun.id!,
          lemparTemplateAkun
        );
        this.tarikDataTemplateAkunAct();

        notificationStore.showSuccess("Data berhasil ditambahkan");
        useloadingStore().setLoading(false);
      } catch (error) {
        notificationStore.showError("Gagal menyimpan data");
        useloadingStore().setLoading(false);
      }
    },

    async deleteMasterTemplateAkunAct(id: string) {
      const notificationStore = useNotificationStore();
      try {
        useloadingStore().setLoading(true);

        await hapusdatabase("m_template_akun", id);
        this.tarikDataTemplateAkunAct();

        notificationStore.showSuccess("Data Berhasil Dihapus");
        useloadingStore().setLoading(false);
      } catch (error) {
        notificationStore.showError("Gagal menghapus data");
      }
    },

    async tarikDataTemplateAkunAct() {
      const datatarik = await queryambilidsesion("m_template_akun");
      this.dataMasterAkun = datatarik as unknown as akunM[];
    },
  },
});
