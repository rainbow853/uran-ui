<script setup lang="ts">
defineProps<{
  name: string;
  color?: string;
  size?: string;
  disabled?: boolean;
  shadow?: boolean;
}>();

</script>

<template>
  <div class="kl-icon flex-center" :class="{ disabled, 'shadow-inline': shadow }" :style="{ color, 'font-size': size }">
    <svg class="icon" aria-hidden="true">
      <use :xlink:href="`#kl-${name}`"></use>
    </svg>
  </div>
</template>
