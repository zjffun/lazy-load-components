<template>
  <el-table :data="list">
    <el-table-column label="index" prop="index"> </el-table-column>
    <el-table-column label="test">
      <template #default="scope">
        <VLazyLoading :delay="1000">
          <el-select>
            <el-option
              v-for="item of options"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </VLazyLoading>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import VLazyLoading from "../src/index.vue";
import {
  ElTable,
  ElTableColumn,
  ElSelect,
  ElOption,
  ElRadioGroup,
  ElRadioButton,
} from "element-plus";

import "element-plus/dist/index.css";

const type = ref("lazyLoading");

const list = ref(Array.from({ length: 1000 }).map((_, i) => ({ index: i })));
const options = ref(
  Array.from({ length: 10 }).map((_, i) => ({ label: i, value: i }))
);
</script>
