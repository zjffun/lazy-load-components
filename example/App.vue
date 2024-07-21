<template>
  <div v-loading="loading">
    <el-radio-group v-model="type" size="large">
      <el-radio-button label="Lazy Loading" value="lazyLoading" />
      <el-radio-button
        label="Without Lazy Loading"
        value="withoutLazyLoading"
      />
    </el-radio-group>
    <div v-if="type === 'lazyLoading'">
      <LazyLoading></LazyLoading>
    </div>
    <div v-else-if="type === 'withoutLazyLoading'">
      <WithoutLazyLoading></WithoutLazyLoading>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import LazyLoading from "./LazyLoading.vue";
import WithoutLazyLoading from "./WithoutLazyLoading.vue";
import { ElRadioGroup, ElRadioButton } from "element-plus";

import "element-plus/dist/index.css";

const type = ref("lazyLoading");

const loading = ref(false);

const list = ref(Array.from({ length: 1000 }).map((_, i) => ({ index: i })));
const options = ref(
  Array.from({ length: 10 }).map((_, i) => ({ label: i, value: i }))
);
</script>
