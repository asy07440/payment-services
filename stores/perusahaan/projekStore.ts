import { defineStore } from "pinia";
import {
  taridatadatabase,
  setdatabase,
  updatedatabase,
  hapusdatabase,
} from "~/composables/useFirestore";


import _ from "lodash";
import type { proyekM } from "~/types/akutansi";

export const usePerusahaanProjekStore = defineStore("perusahaanProjekStore", {
  state: () => ({
    dataProyek: [] as proyekM[],
  }),

  getters: {
    getDataProyek: (state) => state.dataProyek,
  },

  actions: {
    /* ============================================================
       🔹 TARIK DATA PROYEK MULTI PERUSAHAAN
    ============================================================ */
    async tarikDataProyekAct() {
      const idp = useUserStore().getIdPerusahaan;
      const path = `m_perusahaan/${idp}/m_proyek`;

      const cache = sessionStorage.getItem(path);
      if (cache) {
        this.dataProyek = JSON.parse(cache);
        return;
      }

      const col = await taridatadatabase(path);

      watch(
        col,
        (val) => {
          const arr: proyekM[] = [];
          val.forEach((item: any) => arr.push(item as proyekM));

          this.dataProyek = arr;
          sessionStorage.setItem(path, JSON.stringify(arr));
        },
        { immediate: true }
      );
    },

    /* ============================================================
       🔹 TAMBAH PROYEK
    ============================================================ */
    async addProyekAct(payload: proyekM) {
      const idp = useUserStore().getIdPerusahaan;
      const path = `m_perusahaan/${idp}/m_proyek`;

      await setdatabase(path, payload.id!, payload);

      this.dataProyek.push(payload);
      sessionStorage.setItem(path, JSON.stringify(this.dataProyek));
    },

    /* ============================================================
       🔹 UPDATE PROYEK
    ============================================================ */
    async updateProyekAct(payload: proyekM) {
      const idp = useUserStore().getIdPerusahaan;
      const path = `m_perusahaan/${idp}/m_proyek`;

      await updatedatabase(path, payload.id!, payload);

      const idx = this.dataProyek.findIndex((x) => x.id === payload.id);
      if (idx !== -1) this.dataProyek[idx] = payload;

      sessionStorage.setItem(path, JSON.stringify(this.dataProyek));
    },

    /* ============================================================
       🔹 HAPUS PROYEK
    ============================================================ */
    async deleteProyekAct(id: string) {
      const idp = useUserStore().getIdPerusahaan;
      const path = `m_perusahaan/${idp}/m_proyek`;

      await hapusdatabase(path, id);

      this.dataProyek = this.dataProyek.filter((x) => x.id !== id);
      sessionStorage.setItem(path, JSON.stringify(this.dataProyek));
    },
  },
});
