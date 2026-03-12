import { defineStore } from "pinia";
import type { saldoAwalM } from "~/types/akutansi";


export const useSaldoStore = defineStore("saldo", {
  state: () => {
    return {
      dataSaldoAwal: [] as saldoAwalM[],
    };
  },

  getters: {
    getDataSaldoAwal(state) {
      return state.dataSaldoAwal;
    },
  },

  actions: {
    async updateSaldoAwalAct(lemparSaldoAwal: saldoAwalM) {
      const notificationStore = useNotificationStore();
      try {
        useloadingStore().setLoading(true);

        await updatedatabase(
          "saldo_awal",
          lemparSaldoAwal.id!,
          lemparSaldoAwal
        );
        this.tarikDataSaldoAwalAct();

        notificationStore.showSuccess("Perubahan berhasil disimpan");
        useloadingStore().setLoading(false);
      } catch (error) {
        notificationStore.showError("Gagal memperbarui data");
      }
    },

    async addSaldoAwalAct(lemparSaldoAwal: saldoAwalM) {
      const notificationStore = useNotificationStore();
      try {
        useloadingStore().setLoading(true);
        await tambahdatabase("saldo_awal", lemparSaldoAwal);
        this.tarikDataSaldoAwalAct();

        notificationStore.showSuccess("Data berhasil ditambahkan");
        useloadingStore().setLoading(false);
      } catch (error) {
        notificationStore.showError("Gagal menyimpan data");
        useloadingStore().setLoading(false);
      }
    },

    async deleteSaldoAwalAct(id: string) {
      const notificationStore = useNotificationStore();
      try {
        useloadingStore().setLoading(true);

        await hapusdatabase("saldo_awal", id);
        this.tarikDataSaldoAwalAct();

        notificationStore.showSuccess("Data Berhasil Dihapus");
        useloadingStore().setLoading(false);
      } catch (error) {
        notificationStore.showError("Gagal menghapus data");
      }
    },

    async tarikDataSaldoAwalAct() {
      const datatarik = await queryambilidsesion("saldo_awal");
      this.dataSaldoAwal = datatarik as unknown as saldoAwalM[];
    },
  },
});
