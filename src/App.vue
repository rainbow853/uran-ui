<script lang="ts" setup>
import { ref } from 'vue'
import type { Component } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import Button from './views/Button.vue'
import Icon from './views/Icon.vue'
import Input from './views/Input.vue'
import PopoverList from './views/PopoverList.vue'
import NavBar from './views/NavBar.vue'
import Pagination from '../src/views/Pagination.vue'
import Crosshair from '../src/views/Crosshair.vue'
import CameraImage from './views/CameraImage.vue'
const Com: { [key: string]: Component } = {
  Icon,
  Button,
  Input,
  PopoverList,
  NavBar,
  Pagination,
  Crosshair,
  CameraImage,
}

const activeName = ref('CameraImage')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
</script>
<template>
  <el-tabs v-model="activeName" type="border-card" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane :label="'KL' + name" :name="name" v-for="(com, name) in Com" :key="com.name">
      <component :is="Com[name]" />
    </el-tab-pane>
  </el-tabs>
</template>
<style>
#app,
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

.demo-tabs {
  margin: 30px;
}

.h-100 {
  height: 100px;
}

.el-table.summary-table {
  width: 800px;
}

.summary-table .cell {
  user-select: text;
}
</style>