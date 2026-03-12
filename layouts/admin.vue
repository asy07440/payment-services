<template>
  <v-layout>
    <v-app>
      <AppNotification />
      <LoadingApp />
      <AdminHeader />
      <v-main style="background-color: #f7f8f9;">
        <v-container fluid>
          <slot />
        </v-container>
      </v-main>
    </v-app>
  </v-layout>
</template>
