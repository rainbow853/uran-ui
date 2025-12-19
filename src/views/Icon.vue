// #region snippet
<template>
  <div class="icons flex-vertical">
    <KLIcon name="wait" color="#999999" size="20px" />
    <KLIcon name="ready" color="#00b23d" />
    <KLIcon name="ongoing" color="#e78d08" />
    <KLIcon name="unrecognized" color="#f61c1c" size="36px" />
    <KLIcon name="end" color="#00b23d" />
    <KLIcon name="error" color="#f61c1c" />
    <KLIcon name="copy" shadow color="#0e5af1" />
    <KLIcon name="edit" shadow disabled color="#0e5af1" />
    <KLIcon name="delete" shadow color="#f61c1c" />
  </div>
</template>
// #endregion snippet
<style scoped>
.icons {
  font-size: 30px;
}

.icons :deep(.kl-icon) {
  padding: 10px;
  margin: 0 20px;
}
</style>
