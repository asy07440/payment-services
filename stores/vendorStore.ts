import { defineStore } from "pinia";
import {
  taridatadatabase,
  setdatabase,
  updatedatabase,
  hapusdatabase,
} from "~/composables/useFirestore";


import _ from "lodash";
import type { vendorM } from "~/types/akutansi";

export const useMasterVendorStore = defineStore("masterVendorStore", {
  state: () => ({
    dataVendor: [] as vendorM[],
  }),

  getters: {
    getDataVendor: (state) => state.dataVendor,
  },

  actions: {
    /* ============================================================
       🔹 TARIK DATA DARI FIRESTORE (REACTIVE)
    ============================================================ */
    async tarikDataVendorAct() {
      try {
        const cache = sessionStorage.getItem("m_vendor");
        if (cache) {
          this.dataVendor = JSON.parse(cache);
          return;
        }

        const col = await taridatadatabase("m_vendor");

        const unsub = watch(
          col,
          (val) => {
            const arr: vendorM[] = [];
            val.forEach((item: any) => {
              const b = item as vendorM;
              arr.push(b);
            });

            this.dataVendor = arr;
            sessionStorage.setItem("m_vendor", JSON.stringify(arr));
          },
          { immediate: true }
        );

        return unsub;
      } catch (error) {
        console.error("Error tarikDataVendorAct:", error);
      }
    },

    /* ============================================================
       🔹 TAMBAH VENDOR
    ============================================================ */
    async addVendorAct(payload: vendorM) {
      try {
        await setdatabase("m_vendor", payload.id!, payload);

        this.dataVendor.push(payload);
        sessionStorage.setItem("m_vendor", JSON.stringify(this.dataVendor));
      } catch (error) {
        console.error("Error addVendorAct:", error);
      }
    },

    /* ============================================================
       🔹 UPDATE VENDOR
    ============================================================ */
    async updateVendorAct(payload: vendorM) {
      try {
        await updatedatabase("m_vendor", payload.id!, payload);

        const idx = this.dataVendor.findIndex((x) => x.id === payload.id);
        if (idx !== -1) this.dataVendor[idx] = payload;

        sessionStorage.setItem("m_vendor", JSON.stringify(this.dataVendor));
      } catch (error) {
        console.error("Error updateVendorAct:", error);
      }
    },

    /* ============================================================
       🔹 HAPUS VENDOR
    ============================================================ */
    async deleteVendorAct(id: string) {
      try {
        await hapusdatabase("m_vendor", id);

        this.dataVendor = this.dataVendor.filter((x) => x.id !== id);
        sessionStorage.setItem("m_vendor", JSON.stringify(this.dataVendor));
      } catch (error) {
        console.error("Error deleteVendorAct:", error);
      }
    },
  },
});
