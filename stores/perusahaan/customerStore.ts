import { defineStore } from "pinia";
import {
  taridatadatabase,
  setdatabase,
  updatedatabase,
  hapusdatabase,
} from "~/composables/useFirestore";


import _ from "lodash";
import type { customerM } from "~/types/akutansi";

export const useMasterCustomerStore = defineStore("masterCustomerStore", {
  state: () => ({
    dataCustomer: [] as customerM[],
  }),

  getters: {
    getDataCustomer: (state) => state.dataCustomer,
  },

  actions: {
    /* ============================================================
       🔹 TARIK DATA DARI FIRESTORE
    ============================================================ */
    async tarikDataCustomerAct() {
      try {
        const cache = sessionStorage.getItem("m_customer");
        if (cache) {
          this.dataCustomer = JSON.parse(cache);
          return;
        }

        const col = await taridatadatabase("m_customer");

        const unsub = watch(
          col,
          (val) => {
            const arr: customerM[] = [];
            val.forEach((item: any) => {
              arr.push(item as customerM);
            });

            this.dataCustomer = arr;
            sessionStorage.setItem("m_customer", JSON.stringify(arr));
          },
          { immediate: true }
        );

        return unsub;
      } catch (error) {
        console.error("Error tarikDataCustomerAct:", error);
      }
    },

    /* ============================================================
       🔹 TAMBAH CUSTOMER
    ============================================================ */
    async addCustomerAct(payload: customerM) {
      try {
        await setdatabase("m_customer", payload.id!, payload);

        this.dataCustomer.push(payload);
        sessionStorage.setItem("m_customer", JSON.stringify(this.dataCustomer));
      } catch (error) {
        console.error("Error addCustomerAct:", error);
      }
    },

    /* ============================================================
       🔹 UPDATE CUSTOMER
    ============================================================ */
    async updateCustomerAct(payload: customerM) {
      try {
        await updatedatabase("m_customer", payload.id!, payload);

        const idx = this.dataCustomer.findIndex((x) => x.id === payload.id);
        if (idx !== -1) this.dataCustomer[idx] = payload;

        sessionStorage.setItem("m_customer", JSON.stringify(this.dataCustomer));
      } catch (error) {
        console.error("Error updateCustomerAct:", error);
      }
    },

    /* ============================================================
       🔹 HAPUS CUSTOMER
    ============================================================ */
    async deleteCustomerAct(id: string) {
      try {
        await hapusdatabase("m_customer", id);

        this.dataCustomer = this.dataCustomer.filter((x) => x.id !== id);
        sessionStorage.setItem("m_customer", JSON.stringify(this.dataCustomer));
      } catch (error) {
        console.error("Error deleteCustomerAct:", error);
      }
    },
  },
});
