<script setup>
import moment from "moment";

definePageMeta({
  layout: "blank",
});
</script>

<template>
  <div class="welcome-page">
    <div class="header-wrapper">
      <div class="header-triangle border-layer"></div>
      <div class="header-triangle main-layer"></div>
    </div>

    <div class="content-area">
      <p class="font-weight-medium welcome-text">Selamat Datang</p>

      <p class="main-title">
        Portal Pembayaran Digital <br />
        <span class="text-primary">PAYMENT SERVICES</span>
      </p>

      <v-row justify="center" class="description-row">
        <v-col cols="12" sm="8" md="6">
          <p class="text-grey-darken-1 text-center description-text">
            Solusi pembayaran yang aman, cepat, dan terpercaya. 
            Kelola transaksi bisnis Anda secara real-time dengan kemudahan akses 
            di setiap langkah.
          </p>
          <div class="text-center">
            <v-btn
              color="primary"
              class="text-capitalize mt-10"
              rounded="lg"
              to="/login"
            >
              Masuk ke Portal
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </div>

    <footer class="footer-bar">Payment Services © 2026</footer>
  </div>
</template>

<style scoped>
/* ===============================
 * Struktur Dasar Halaman
 * =============================== */
.welcome-page {
  position: relative;
  min-height: 100vh;
  background-color: #f1f3f7;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  overflow-x: hidden;
}

/* ===============================
 * HEADER: Segitiga Utama + Border
 * =============================== */
.header-wrapper {
  position: relative;
  width: 100%;
  height: 220px;
}

.header-triangle {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  clip-path: polygon(0 0, 100% 0, 100% 78%, 50% 95%, 0 78%);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.border-layer {
  background: #2196f3;
  transform: translateY(10px);
  z-index: 1;
}

.main-layer {
  background: linear-gradient(180deg, #007bff 0%, #005ad1 100%);
  z-index: 2;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

@media (min-width: 600px) {
  .header-wrapper {
    height: 280px;
  }
  .border-layer {
    transform: translateY(14px);
  }
}

/* ===============================
 * Area Konten Utama
 * =============================== */
.content-area {
  padding: 20px;
  z-index: 3;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: -60px; /* Disesuaikan agar konten tidak terlalu jauh dari header */
}

.welcome-text {
  font-size: clamp(16px, 3.5vw, 20px);
  margin-bottom: 10px;
}

.main-title {
  font-size: clamp(28px, 7vw, 45px);
  font-weight: 900;
  line-height: 1.1;
  margin-bottom: 20px;
}

.description-text {
  font-size: clamp(12px, 2.5vw, 16px);
  line-height: 1.4;
}

/* ===============================
 * Footer
 * =============================== */
.footer-bar {
  position: sticky;
  bottom: 0;
  width: 100%;
  background-color: #007bff;
  color: #fff;
  text-align: center;
  font-size: 11px;
  padding: 6px 0;
  z-index: 10;
}
</style>