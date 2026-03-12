<template>
  <v-breadcrumbs>
    <v-breadcrumbs-item active>
      <span class="font-weight-medium text-h5"> Dashboard </span>
    </v-breadcrumbs-item>
  </v-breadcrumbs>

  <AdminDashboard1 />
  <AdminDashboard2 />

  <v-row>
    <v-col cols="12" sm="4">
      <AdminDashboard3 />
    </v-col>

     <v-col cols="12" sm="4">
      <AdminDashboard4 />
    </v-col>

    <v-col cols="12" sm="4">
      <AdminDashboard5 />
    </v-col>
  </v-row>
</template>

<script setup>
definePageMeta({
  layout: "admin",
});
</script>
