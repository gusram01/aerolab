<template>
  <div id="app">
    <div class="hero">
      <h1 class="principal-title">Loyalty Rewards</h1>
      <img :src="imgHeader" alt="hero header" />
    </div>
    <router-view />
  </div>
</template>
<script>
import imgHeader from './assets/header.webp';

export default {
  data() {
    return {
      imgHeader,
    };
  },
};
</script>

<style lang="scss">
@import './styles/vendors/normalize';
@import './styles/helpers/variables';
@import './styles/helpers/mixins';
@import './styles/base/general';
@import './styles/base/buttons-links';
@import './styles/layout/index-layout';
</style>
