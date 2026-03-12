import { defineStore } from "pinia";
import type { paymentM, paymentStats } from "~/types/payment";

export const usePaymentStore = defineStore("m_payment", {
  state: () => {
    return {
      dataPayment: [] as paymentM[],
      loading: false,
    };
  },

  getters: {
    getDataPayment(state): paymentM[] {
      return state.dataPayment;
    },

    getStats(state): paymentStats {
      const stats: paymentStats = {
        total: state.dataPayment.length,
        completed: 0,
        processing: 0,
        failed: 0,
        totalRevenue: 0,
      };

      state.dataPayment.forEach((payment) => {
        if (payment.status === "completed") {
          stats.completed++;
          stats.totalRevenue += payment.amount;
        } else if (payment.status === "processing") {
          stats.processing++;
        } else if (payment.status === "failed") {
          stats.failed++;
        }
      });

      return stats;
    },
  },

  actions: {
    // CREATE: Tambah Payment
    async addMasterPaymentAct(lemparPayment: paymentM) {
      const notificationStore = useNotificationStore();
      try {
        this.loading = true;

        await setdatabase("m_payment", lemparPayment.id!, lemparPayment);
        await this.tarikDataPaymentAct();

        notificationStore.showSuccess("Data payment berhasil ditambahkan");
        this.loading = false;
      } catch (error) {
        console.error("Error adding payment:", error);
        notificationStore.showError("Gagal menyimpan data payment");
        this.loading = false;
      }
    },

    // READ: Tarik semua data payment
    async tarikDataPaymentAct() {
      this.loading = true;
      try {
        // Cek session storage dulu
        const sessionData = sessionStorage.getItem("m_payment");
        if (sessionData) {
          this.dataPayment = JSON.parse(sessionData) as paymentM[];
          this.loading = false;
          return;
        }

        // Ambil dari Firestore
        const datatarik = await queryambilidsesion("m_payment");
        
        if (datatarik && datatarik.length > 0) {
          this.dataPayment = datatarik as unknown as paymentM[];
        } else {
          this.dataPayment = [];
        }

        // Simpan ke session storage
        sessionStorage.setItem("m_payment", JSON.stringify(this.dataPayment));
        
        this.loading = false;
      } catch (error) {
        console.error("Error fetching payments:", error);
        this.dataPayment = [];
        this.loading = false;
      }
    },

    // UPDATE: Update payment
    async updateMasterPaymentAct(lemparPayment: paymentM) {
      const notificationStore = useNotificationStore();
      try {
        this.loading = true;

        await updatedatabase("m_payment", lemparPayment.id!, lemparPayment);
        await this.tarikDataPaymentAct();

        notificationStore.showSuccess("Perubahan berhasil disimpan");
        this.loading = false;
      } catch (error) {
        console.error("Error updating payment:", error);
        notificationStore.showError("Gagal memperbarui data");
        this.loading = false;
      }
    },

    // DELETE: Hapus payment
    async deleteMasterPaymentAct(id: string) {
      const notificationStore = useNotificationStore();
      try {
        this.loading = true;

        await hapusdatabase("m_payment", id);
        await this.tarikDataPaymentAct();

        notificationStore.showSuccess("Data berhasil dihapus");
        this.loading = false;
      } catch (error) {
        console.error("Error deleting payment:", error);
        notificationStore.showError("Gagal menghapus data");
        this.loading = false;
      }
    },

    // Refresh data (hapus session storage dulu)
    async refreshDataAct() {
      sessionStorage.removeItem("m_payment");
      await this.tarikDataPaymentAct();
    },
  },
});