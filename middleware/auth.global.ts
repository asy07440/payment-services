import type { Store, PiniaCustomStateProperties } from "pinia";

export default defineNuxtRouteMiddleware(async (to) => {
  const user = useUserStore();

  // 1. Tunggu Firebase Auth selesai rehydrate (Hanya di Client)
  if (process.client && !user.__authReady) {
    await untilAuthIsReady(user);
  }

  // Definisi rute yang membutuhkan proteksi
  const isAdminArea = to.path.startsWith("/admin");
  const isPerusahaanArea = to.path.startsWith("/perusahaan");

  // 2. LOGIKA JIKA SUDAH LOGIN
  if (user.isLoggedIn) {
    // Jika mencoba akses /login padahal sudah masuk, arahkan ke dashboard yang sesuai
    if (to.path === "/login") {
      if (user.isAdmin) return navigateTo("/admin/");
      if (user.isMasterPerusahaan)
        return navigateTo(`/perusahaan/${user.idPerusahaan}/`);
      return navigateTo("/");
    }

    // Proteksi Admin Area: Jika masuk /admin tapi bukan admin
    if (isAdminArea && !user.isAdmin) {
      return navigateTo("/");
    }

    // Proteksi Perusahaan Area
    if (isPerusahaanArea) {
      // Jika bukan master perusahaan, tendang ke luar
      if (!user.isMasterPerusahaan) return navigateTo("/");

      // Jika mencoba akses ID perusahaan orang lain, paksa ke ID miliknya sendiri
      const idParam = to.params.id;
      if (idParam && idParam !== user.idPerusahaan) {
        return navigateTo(`/perusahaan/${user.idPerusahaan}/`);
      }
    }
  }

  // 3. LOGIKA JIKA BELUM LOGIN
  else {
    // Jika mencoba akses area terproteksi saat belum login, arahkan ke /login
    if (isAdminArea || isPerusahaanArea) {
      return navigateTo("/login");
    }
    // Jika akses / atau halaman publik lainnya, biarkan saja (default)
  }
});

/**
 * Fungsi pembantu untuk menunggu status Firebase Auth siap di Pinia Store
 */
function untilAuthIsReady(user: any) {
  return new Promise((resolve) => {
    // Jika dijalankan di server, langsung resolve karena Firebase Auth client-side
    if (!process.client) return resolve(true);

    // Jika sudah ready sejak awal, langsung jalan
    if (user.__authReady) return resolve(true);

    const interval = setInterval(() => {
      if (user.__authReady) {
        clearInterval(interval);
        resolve(true);
      }
    }, 50); // Cek setiap 50ms

    // Timeout setelah 5 detik agar tidak terjadi infinite loop jika ada error
    setTimeout(() => {
      clearInterval(interval);
      resolve(false);
    }, 5000);
  });
}
