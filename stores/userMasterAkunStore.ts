import { defineStore } from "pinia";
import { useFirestoreCompanyCrud } from '../composables/useFIrestoreCompanyCrud'
import type { akunM } from "~/types/akutansi";


const { getAll, addData, updateData, deleteData } = useFirestoreCompanyCrud()

export const useMasterAkunStore = defineStore('m_akun', {
  state: () => ({
    dataMasterAkun: [] as akunM[],
  }),

  actions: {
    async tarikDataAkunAct(perusahaanId: string) {
      this.dataMasterAkun = await getAll(perusahaanId, 'm_akun') as akunM[]
    },

    async addMasterAkunAct(perusahaanId: string, akun: akunM) {
      await addData(perusahaanId, 'm_akun', akun)
      await this.tarikDataAkunAct(perusahaanId)
    },

    async updateMasterAkunAct(perusahaanId: string, akun: akunM) {
      await updateData(perusahaanId, 'm_akun', akun.id!, akun)
      await this.tarikDataAkunAct(perusahaanId)
    },

    async deleteMasterAkunAct(perusahaanId: string, id: string) {
      await deleteData(perusahaanId, 'm_akun', id)
      await this.tarikDataAkunAct(perusahaanId)
    },
  },
})
