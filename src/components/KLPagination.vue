<script setup lang="ts">
</script>

<template>
  <div class="kl-pagination flex-center">
    <el-pagination v-bind="$attrs" class="pagination" background layout="prev, pager, next" prev-text="上一页"
      next-text="下一页" />
  </div>
</template>

<style>
.kl-pagination .el-pagination {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.kl-pagination .el-pagination .btn-next,
.kl-pagination .el-pagination .btn-prev,
.kl-pagination .el-pager li {
  background: #f1f1f1;
  mix-blend-mode: normal;
  box-shadow: var(--kl-shadow-inline);
  border-radius: 2px;
  border: 0;
  height: 30px;
  padding: 0 10px;
  margin: 0 10px;
}

.kl-pagination .el-pagination.is-background .el-pager li.is-active {
  box-shadow: inset -3px -3px 2px #d5dce4, inset 3px 3px 2px #a6bad5, 0px 0px 2px 2px #fff;
  background: linear-gradient(110.58deg, #ebf2f8 -8.29%, #f8fcff 121.14%);
  color: var(--kl-click-color);
}
</style>
