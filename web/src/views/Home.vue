<template>
  <div class="Home">
    <ElButton @click="() => $router.push('/PkgVersion')">vue版本获取</ElButton>
  </div>
</template>

<script setup name="Home">
import { useRouter } from 'vue-router'
const $router = useRouter()
</script>
