import { defineStore } from "pinia";
import {
  taridatadatabase,
  setdatabase,
  updatedatabase,
  hapusdatabase,
} from "~/composables/useFirestore";


import _ from "lodash";
import type { vendorM } from "~/types/akutansi";

export const usePerusahaanVendorStore = defineStore("perusahaanVendorStore", {
  state: () => ({
    dataVendor: [] as vendorM[],
  }),

  getters: {
    getDataVendor: (state) => state.dataVendor,
  },

  actions: {
    /* ============================================================
       🔹 GET DATA VENDOR (REACTIVE — SESUAI PERUSAHAAN)
    ============================================================ */
    async tarikDataVendorAct() {
      try {
        const userStore = useUserStore();
        const idp = userStore.getIdPerusahaan;

        const path = `m_perusahaan/${idp}/m_vendor`;

        const cache = sessionStorage.getItem(path);
        if (cache) {
          this.dataVendor = JSON.parse(cache);
          return;
        }

        const col = await taridatadatabase(path);

        watch(
          col,
          (val) => {
            const arr: vendorM[] = [];
            val.forEach((item: any) => arr.push(item as vendorM));

            this.dataVendor = arr;
            sessionStorage.setItem(path, JSON.stringify(arr));
          },
          { immediate: true }
        );
      } catch (error) {
        console.error("Error tarikDataVendorAct:", error);
      }
    },

    /* ============================================================
       🔹 ADD NEW VENDOR
    ============================================================ */
    async addVendorAct(payload: vendorM) {
      const idp = useUserStore().getIdPerusahaan;
      const path = `m_perusahaan/${idp}/m_vendor`;

      await setdatabase(path, payload.id!, payload);

      this.dataVendor.push(payload);
      sessionStorage.setItem(path, JSON.stringify(this.dataVendor));
    },

    /* ============================================================
       🔹 UPDATE VENDOR
    ============================================================ */
    async updateVendorAct(payload: vendorM) {
      const idp = useUserStore().getIdPerusahaan;
      const path = `m_perusahaan/${idp}/m_vendor`;

      await updatedatabase(path, payload.id!, payload);

      const idx = this.dataVendor.findIndex((x) => x.id === payload.id);
      if (idx !== -1) this.dataVendor[idx] = payload;

      sessionStorage.setItem(path, JSON.stringify(this.dataVendor));
    },

    /* ============================================================
       🔹 DELETE VENDOR
    ============================================================ */
    async deleteVendorAct(id: string) {
      const idp = useUserStore().getIdPerusahaan;
      const path = `m_perusahaan/${idp}/m_vendor`;

      await hapusdatabase(path, id);

      this.dataVendor = this.dataVendor.filter((x) => x.id !== id);
      sessionStorage.setItem(path, JSON.stringify(this.dataVendor));
    },
  },
});
