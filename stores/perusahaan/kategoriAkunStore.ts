import { defineStore } from "pinia";
import {
  taridatadatabase,
  setdatabase,
  updatedatabase,
  hapusdatabase,
} from "~/composables/useFirestore";


import _ from "lodash";
import type { kategoriAkunM } from "~/types/akutansi";

export const useMasterKategoriAkunStore = defineStore(
  "masterKategoriAkunStore",
  {
    state: () => ({
      dataKategori: [] as kategoriAkunM[],
    }),

    getters: {
      getDataKategoriAkun: (state) => state.dataKategori,
    },

    actions: {
      /* ============================================================
         🔹 TARIK DATA PERUSAHAAN
      ============================================================ */
      async tarikDataKategoriAkunAct() {
        const userStore = useUserStore();
        const idp = userStore.getIdPerusahaan;

        const colPath = `m_perusahaan/${idp}/m_kategori_akun`;

        const cache = sessionStorage.getItem(colPath);
        if (cache) {
          this.dataKategori = JSON.parse(cache);
          return;
        }

        const col = await taridatadatabase(colPath);

        watch(
          col,
          (val) => {
            const arr: kategoriAkunM[] = [];
            val.forEach((item: any) => arr.push(item as kategoriAkunM));

            this.dataKategori = arr;
            sessionStorage.setItem(colPath, JSON.stringify(arr));
          },
          { immediate: true }
        );
      },

      /* ============================================================
         🔹 TAMBAH KATEGORI
      ============================================================ */
      async addKategoriAkunAct(payload: kategoriAkunM) {
        const idp = useUserStore().getIdPerusahaan;
        const colPath = `m_perusahaan/${idp}/m_kategori_akun`;

        await setdatabase(colPath, payload.id!, payload);

        this.dataKategori.push(payload);
        sessionStorage.setItem(colPath, JSON.stringify(this.dataKategori));
      },

      /* ============================================================
         🔹 UPDATE KATEGORI
      ============================================================ */
      async updateKategoriAkunAct(payload: kategoriAkunM) {
        const idp = useUserStore().getIdPerusahaan;
        const colPath = `m_perusahaan/${idp}/m_kategori_akun`;

        await updatedatabase(colPath, payload.id!, payload);

        const idx = this.dataKategori.findIndex((x) => x.id === payload.id);
        if (idx !== -1) this.dataKategori[idx] = payload;

        sessionStorage.setItem(colPath, JSON.stringify(this.dataKategori));
      },

      /* ============================================================
         🔹 HAPUS KATEGORI
      ============================================================ */
      async deleteKategoriAkunAct(id: string) {
        const idp = useUserStore().getIdPerusahaan;
        const colPath = `m_perusahaan/${idp}/m_kategori_akun`;

        await hapusdatabase(colPath, id);

        this.dataKategori = this.dataKategori.filter((x) => x.id !== id);
        sessionStorage.setItem(colPath, JSON.stringify(this.dataKategori));
      },
    },
  }
);
