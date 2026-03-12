import { defineStore } from "pinia";
import {
  taridatadatabase,
  setdatabase,
  updatedatabase,
  hapusdatabase,
} from "~/composables/useFirestore";


import _ from "lodash";
import type { akunM, kategoriAkunM } from "~/types/akutansi";

export const useMasterCoaStore = defineStore("masterCoaStore", {
  state: () => ({
    dataAkun: [] as akunM[],
    dataKategori: [] as kategoriAkunM[],
  }),

  getters: {
    getDataAkun: (state) => state.dataAkun,
    getDataKategoriAkun: (state) => state.dataKategori,
  },

  actions: {
    async tarikKategoriAkunAct() {
      const idp = useUserStore().getIdPerusahaan;
      const path = `m_perusahaan/${idp}/m_kategori_akun`;

      const cache = sessionStorage.getItem(path);
      if (cache) {
        this.dataKategori = JSON.parse(cache);
        return;
      }

      const col = await taridatadatabase(path);

      watch(
        col,
        (val) => {
          const arr: kategoriAkunM[] = [];
          val.forEach((i: any) => arr.push(i));
          this.dataKategori = arr;
          sessionStorage.setItem(path, JSON.stringify(arr));
        },
        { immediate: true }
      );
    },

    async tarikDataAkunAct() {
      const idp = useUserStore().getIdPerusahaan;
      const path = `m_perusahaan/${idp}/m_akun`;

      const cache = sessionStorage.getItem(path);
      if (cache) {
        this.dataAkun = JSON.parse(cache);
        return;
      }

      const col = await taridatadatabase(path);

      watch(
        col,
        (val) => {
          const arr: akunM[] = [];
          val.forEach((i: any) => arr.push(i));
          this.dataAkun = arr;
          sessionStorage.setItem(path, JSON.stringify(arr));
        },
        { immediate: true }
      );
    },

    async addAkunAct(payload: akunM) {
      const idp = useUserStore().getIdPerusahaan;
      const path = `m_perusahaan/${idp}/m_akun`;

      await setdatabase(path, payload.id!, payload);
      this.dataAkun.push(payload);
      sessionStorage.setItem(path, JSON.stringify(this.dataAkun));
    },

    async updateAkunAct(payload: akunM) {
      const idp = useUserStore().getIdPerusahaan;
      const path = `m_perusahaan/${idp}/m_akun`;

      await updatedatabase(path, payload.id!, payload);

      const idx = this.dataAkun.findIndex((x) => x.id === payload.id);
      if (idx !== -1) this.dataAkun[idx] = payload;

      sessionStorage.setItem(path, JSON.stringify(this.dataAkun));
    },

    async deleteAkunAct(id: string) {
      const idp = useUserStore().getIdPerusahaan;
      const path = `m_perusahaan/${idp}/m_akun`;

      await hapusdatabase(path, id);

      this.dataAkun = this.dataAkun.filter((x) => x.id !== id);
      sessionStorage.setItem(path, JSON.stringify(this.dataAkun));
    },
  },
});
