import { defineStore } from "pinia";
import { taridatadatabase, setdatabase, updatedatabase, hapusdatabase } from "~/composables/useFirestore";

import _ from "lodash";
import type { departemenM } from "~/types/akutansi";

export const useMasterDepartemenStore = defineStore("masterDepartemenStore", {
  state: () => ({
    dataDepartemen: [] as departemenM[],
  }),

  getters: {
    getDataDepartemen: (state) => state.dataDepartemen,
  },

  actions: {
    /* ============================================================
       🔹 TARIK DATA DARI FIRESTORE (REACTIVE)
    ============================================================ */
    async tarikDataDepartemenAct() {
      try {
        // Cek cache
        const cache = sessionStorage.getItem("m_departemen");
        if (cache) {
          this.dataDepartemen = JSON.parse(cache);
          return;
        }

        const col = await taridatadatabase("m_departemen");

        // VueFire reactive data → map ke array biasa
        const unsub = watch(
          col,
          (val) => {
            const arr: departemenM[] = [];
            val.forEach((item: any) => {
              const b = item as departemenM;
              arr.push(b);
            });

            this.dataDepartemen = arr;

            sessionStorage.setItem("m_departemen", JSON.stringify(arr));
          },
          { immediate: true }
        );

        return unsub;
      } catch (error) {
        console.error("Error tarikDataDepartemenAct:", error);
      }
    },

    /* ============================================================
       🔹 TAMBAH DATA
    ============================================================ */
    async addDepartemenAct(payload: departemenM) {
      try {
        await setdatabase("m_departemen", payload.id!, payload);

        this.dataDepartemen.push(payload);
        sessionStorage.setItem("m_departemen", JSON.stringify(this.dataDepartemen));
      } catch (error) {
        console.error("Error addDepartemenAct:", error);
      }
    },

    /* ============================================================
       🔹 UPDATE DATA
    ============================================================ */
    async updateDepartemenAct(payload: departemenM) {
      try {
        await updatedatabase("m_departemen", payload.id!, payload);

        const idx = this.dataDepartemen.findIndex((x) => x.id === payload.id);
        if (idx !== -1) this.dataDepartemen[idx] = payload;

        sessionStorage.setItem("m_departemen", JSON.stringify(this.dataDepartemen));
      } catch (error) {
        console.error("Error updateDepartemenAct:", error);
      }
    },

    /* ============================================================
       🔹 HAPUS DATA
    ============================================================ */
    async deleteDepartemenAct(id: string) {
      try {
        await hapusdatabase("m_departemen", id);

        this.dataDepartemen = this.dataDepartemen.filter((x) => x.id !== id);
        sessionStorage.setItem("m_departemen", JSON.stringify(this.dataDepartemen));
      } catch (error) {
        console.error("Error deleteDepartemenAct:", error);
      }
    },
  },
});
