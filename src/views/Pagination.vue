<script setup lang="ts">
import { ref } from 'vue';
const total = ref(1024);
const pageSize = 10;
const currentPage = ref(1);
</script>

<template>
  <KLPagination :total="total" v-model="currentPage" :page-size="pageSize" />
</template>
