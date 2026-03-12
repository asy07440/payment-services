import { defineStore } from "pinia";
import type { jurnalM } from "~/types/akutansi";


export const useJurnalStore = defineStore("saldo", {
    state: () => {
        return {
            dataJurnal: [] as jurnalM[],
        };
    },

    getters: {
        getDataJurnal(state) {
            return state.dataJurnal;
        },
    },

    actions: {
        async updateJurnalAct(lemparJurnal: jurnalM) {
            const notificationStore = useNotificationStore();
            try {
                useloadingStore().setLoading(true);

                await updatedatabase(
                    "jurnal",
                    lemparJurnal.id!,
                    lemparJurnal
                );
                this.tarikDataJurnalAct();

                notificationStore.showSuccess("Perubahan berhasil disimpan");
                useloadingStore().setLoading(false);
            } catch (error) {
                notificationStore.showError("Gagal memperbarui data");
            }
        },

        async addJurnalAct(lemparJurnal: jurnalM) {
            const notificationStore = useNotificationStore();
            try {
                useloadingStore().setLoading(true);
                await tambahdatabase("jurnal", lemparJurnal);
                this.tarikDataJurnalAct();

                notificationStore.showSuccess("Data berhasil ditambahkan");
                useloadingStore().setLoading(false);
            } catch (error) {
                notificationStore.showError("Gagal menyimpan data");
                useloadingStore().setLoading(false);
            }
        },

        async deleteJurnalAct(id: string) {
            const notificationStore = useNotificationStore();
            try {
                useloadingStore().setLoading(true);

                await hapusdatabase("jurnal", id);
                this.tarikDataJurnalAct();

                notificationStore.showSuccess("Data Berhasil Dihapus");
                useloadingStore().setLoading(false);
            } catch (error) {
                notificationStore.showError("Gagal menghapus data");
            }
        },

        async tarikDataJurnalAct() {
            const datatarik = await queryambilid("jurnal");
            this.dataJurnal = datatarik as unknown as jurnalM[];
        },
    },
});
