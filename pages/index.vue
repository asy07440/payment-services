<script setup>
import moment from "moment";

definePageMeta({
  layout: "blank",
});
const data = reactive({
  jamunix: 0,
  jammoment: 0,
});

const update = async () => {
  const b = await $fetch("https://time.alipusman.workers.dev/");
  data.jamunix = b.unix;
  data.jammoment = moment().unix();
};
</script>

<template>
  <div class="welcome-page">
    <div class="header-wrapper">
      <div class="header-triangle border-layer"></div>

      <div class="header-triangle main-layer">
        <img
          src="https://imagedelivery.net/_tN3dTar-XzU6X9_PBgTbA/1043a53d-dea0-4de7-86a2-7dfcb529f000/heromobile"
          alt="Aresa Digital Logo"
          :width="$vuetify.display.smAndDown ? 180 : 180"
          class="logo"
        />
      </div>
    </div>

    <div class="content-area">
      <p class="font-weight-medium welcome-text">Selamat Datang</p>

      <p class="main-title">
        Di Sistem Akuntansi Digital <br />
        <span class="text-primary">ARESA DIGITAL ACCOUNTING</span>
      </p>

      <v-row justify="center" class="description-row">
        <v-col cols="12" sm="8" md="6">
          <p class="text-grey-darken-1 text-center description-text">
            Kelola keuangan bisnis Anda dengan mudah, akurat, dan real-time.
            Solusi akuntansi modern untuk laporan yang cepat dan keputusan
            bisnis yang tepat.
          </p>
          <div class="text-center">
            <v-btn
              color="primary"
              class="text-capitalize mt-10"
              rounded="lg"
              to="/login"
            >
              Masuk
            </v-btn>
          </div>
        </v-col>
      </v-row>

      <!-- <v-btn color="success" @click="update()">text</v-btn>

      {{ data.jamunix }}
      {{ data.jammoment }} -->
    </div>

    <footer class="footer-bar">Aresa Digital © 2025</footer>
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
  height: 220px; /* default mobile */
}

/* Shape dasar */
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

/* Lapisan bawah: border */
.border-layer {
  background: #2196f3;
  transform: translateY(10px); /* geser ke bawah untuk efek border */
  z-index: 1;
}

/* Lapisan atas: segitiga utama dengan gradasi */
.main-layer {
  background: linear-gradient(180deg, #007bff 0%, #005ad1 100%);
  z-index: 2;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

/* Responsif: desktop lebih tinggi & border lebih tebal */
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
  padding-left: 20px;
  padding-right: 20px;
  padding-top: clamp(20px, 6vh, 40px);
  padding-bottom: clamp(30px, 5vh, 60px);
  z-index: 3;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 95%;
}

/* ===============================
 * Teks dan Spasi
 * =============================== */
.welcome-text {
  font-size: clamp(16px, 3.5vw, 20px);
  margin-bottom: clamp(5px, 0.6vh, 10px);
}

.main-title {
  font-size: clamp(28px, 7vw, 45px);
  font-weight: 900;
  line-height: 1.1;
  margin-bottom: clamp(5px, 1vh, 20px);
}

.description-row {
  margin-top: clamp(10px, 2vh, 20px) !important;
  margin-bottom: clamp(15px, 3vh, 35px) !important;
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
  left: 0;
  width: 100%;
  background-color: #007bff;
  color: #fff;
  text-align: center;
  font-size: 11px;
  padding: 6px 0;
  z-index: 10;
}
</style>
