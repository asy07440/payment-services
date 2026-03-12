import { defineStore } from "pinia";
import type { transaksiKasM } from "~/types/transaksiKasModel";

export const useTransaksiKasStore = defineStore("TransaksiKas", {
    state: () => {
        return {
            dataTransaksiKas: [] as transaksiKasM[],
        };
    },

    getters: {
        getDataTransaksiKas(state) {
            return state.dataTransaksiKas;
        },
    },

    actions: {
        async updateTransaksiKasAct(lemparTransaksiKas: transaksiKasM) {
            const notificationStore = useNotificationStore();
            try {
                useloadingStore().setLoading(true);

                await updatedatabase(
                    "transaksi_kas",
                    lemparTransaksiKas.id!,
                    lemparTransaksiKas
                );
                this.tarikDataTransaksiKasAct();

                notificationStore.showSuccess("Perubahan berhasil disimpan");
                useloadingStore().setLoading(false);
            } catch (error) {
                notificationStore.showError("Gagal memperbarui data");
            }
        },

        async addTransaksiKasAct(lemparTransaksiKas: transaksiKasM) {
            const notificationStore = useNotificationStore();
            try {
                useloadingStore().setLoading(true);
                await tambahdatabase("transaksi_kas", lemparTransaksiKas);
                this.tarikDataTransaksiKasAct();

                notificationStore.showSuccess("Data berhasil ditambahkan");
                useloadingStore().setLoading(false);
            } catch (error) {
                notificationStore.showError("Gagal menyimpan data");
                useloadingStore().setLoading(false);
            }
        },

        async deleteTransaksiKasAct(id: string) {
            const notificationStore = useNotificationStore();
            try {
                useloadingStore().setLoading(true);

                await hapusdatabase("transaksi_kas", id);
                this.tarikDataTransaksiKasAct();

                notificationStore.showSuccess("Data Berhasil Dihapus");
                useloadingStore().setLoading(false);
            } catch (error) {
                notificationStore.showError("Gagal menghapus data");
            }
        },

        async tarikDataTransaksiKasAct() {
            const datatarik = await queryambilid("transaksi_kas");
            this.dataTransaksiKas = datatarik as unknown as transaksiKasM[];
        },
    },
});
