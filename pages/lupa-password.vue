<script setup lang="ts">
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

definePageMeta({
  layout: "blank",
});

const notificationStore = useNotificationStore();
const loadingStore = useloadingStore();
const userStore = useUserStore();

const data = reactive({
  email: "",
});

// ==========================
// 📧 RESET PASSWORD LOGIC
// ==========================
const resetpass = async (email: string) => {
  const auth = getAuth();
  return sendPasswordResetEmail(auth, email)
    .then(() => {
      userStore.setUser(null);
      return "ok";
    })
    .catch((error) => {
      return error.message;
    });
};

const handleResetPassword = async () => {
  if (!data.email) {
    notificationStore.showError("Masukkan email Anda terlebih dahulu");
    return;
  }

  loadingStore.setLoading(true);

  try {
    const result = await resetpass(data.email);

    if (result === "ok") {
      notificationStore.showSuccess(
        "Silakan periksa kotak masuk email Anda untuk instruksi pengaturan ulang kata sandi."
      );
      // Redirect kembali ke login setelah sukses
      navigateTo("/login");
    } else {
      notificationStore.showError(
        "Terjadi kesalahan. Pastikan email terdaftar."
      );
    }
  } catch (error) {
    notificationStore.showError("Terjadi kesalahan sistem.");
  } finally {
    loadingStore.setLoading(false);
  }
};
</script>

<template>
  <div class="welcome-page">
    <div class="header-wrapper">
      <div class="header-triangle border-layer"></div>
      <div class="header-triangle main-layer">
        <img
          src="https://imagedelivery.net/_tN3dTar-XzU6X9_PBgTbA/ce75ea4b-2d01-4d6c-d59f-4ba28e301b00/heromobile"
          alt="Aresa Logo"
          :width="$vuetify.display.smAndDown ? 180 : 250"
          class="logo"
        />
      </div>
    </div>

    <div class="content-area">
      <form class="form-container" @submit.prevent="handleResetPassword">
        <div class="title-container">
          <p class="title">Lupa Kata Sandi?</p>
          <span class="subtitle">
            Masukkan email Anda untuk menerima link pengaturan ulang kata sandi.
          </span>
        </div>

        <div class="input-container">
          <label class="input-label" for="email_field">Email Terdaftar</label>
          <svg
            fill="none"
            viewBox="0 0 24 24"
            height="24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
            class="icon"
          >
            <path
              stroke-linejoin="round"
              stroke-linecap="round"
              stroke-width="1.5"
              stroke="#007bff"
              d="M7 8.5L9.94202 10.2394C11.6572 11.2535 12.3428 11.2535 14.058 10.2394L17 8.5"
            ></path>
            <path
              stroke-linejoin="round"
              stroke-width="1.5"
              stroke="#007bff"
              d="M2.01577 13.4756C2.08114 16.5412 2.11383 18.0739 3.24496 19.2094C4.37608 20.3448 5.95033 20.3843 9.09883 20.4634C11.0393 20.5122 12.9607 20.5122 14.9012 20.4634C18.0497 20.3843 19.6239 20.3448 20.7551 19.2094C21.8862 18.0739 21.9189 16.5412 21.9842 13.4756C22.0053 12.4899 22.0053 11.5101 21.9842 10.5244C21.9189 7.45886 21.8862 5.92609 20.7551 4.79066C19.6239 3.65523 18.0497 3.61568 14.9012 3.53657C12.9607 3.48781 11.0393 3.48781 9.09882 3.53656C5.95033 3.61566 4.37608 3.65521 3.24495 4.79065C2.11382 5.92608 2.08114 7.45885 2.01576 10.5244C1.99474 11.5101 1.99475 12.4899 2.01577 13.4756Z"
            ></path>
          </svg>
          <input
            v-model="data.email"
            placeholder="nama@email.com"
            type="email"
            id="email_field"
            class="input-field"
            required
          />
        </div>

        <button type="submit" class="login-btn">
          <span>Kirim Instruksi</span>
          <v-icon icon="mdi-email-send-outline" end size="small" class="ml-2" />
        </button>

        <div class="back-link">
          <NuxtLink to="/login" class="text-caption">
            Kembali ke Login
          </NuxtLink>
        </div>

        <p class="note">© 2025 Aresa Accounting System</p>
      </form>
    </div>

    <footer class="footer-bar">Aresa Digital © 2025</footer>
  </div>
</template>

<style scoped>
/* Reuse CSS dari halaman login Anda agar konsisten */
.welcome-page {
  position: relative;
  min-height: 100vh;
  overflow-y: hidden;
  background-color: #f1f3f7;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

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
}

.border-layer {
  background: #2196f3;
  transform: translateY(10px);
  z-index: 1;
}
.main-layer {
  background: linear-gradient(180deg, #007bff 0%, #005ad1 100%);
  z-index: 2;
}
.logo {
  margin-top: -30px;
}

.content-area {
  padding: 15px 20px;
  z-index: 3;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: -80px;
}

.form-container {
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 25px 30px;
  background-color: #ffffff;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
}

.title {
  margin: 0;
  font-size: 1.4rem;
  font-weight: 800;
  color: #212121;
}
.subtitle {
  font-size: 0.8rem;
  color: #6c757d;
}

.input-container {
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.icon {
  width: 20px;
  position: absolute;
  z-index: 5;
  left: 12px;
  bottom: 12px;
}
.input-label {
  font-size: 0.75rem;
  color: #6c757d;
  font-weight: 600;
  text-align: left;
}
.input-field {
  width: 100%;
  height: 48px;
  padding: 0 15px 0 40px;
  border-radius: 8px;
  border: 1px solid #ced4da;
  background-color: #f8f9fa;
}

.login-btn {
  width: 100%;
  height: 44px;
  background: #007bff;
  border: 0;
  border-radius: 8px;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-link {
  margin-top: 10px;
}
.back-link a {
  color: #007bff;
  text-decoration: none;
  font-weight: 500;
}

.note {
  font-size: 0.7rem;
  color: #adb5bd;
  margin-top: 15px;
}
.footer-bar {
  width: 100%;
  background-color: #007bff;
  color: #fff;
  text-align: center;
  font-size: 11px;
  padding: 6px 0;
  margin-top: auto;
}
</style>
