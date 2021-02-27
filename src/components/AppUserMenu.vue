<template>
  <article class="menu-user">
    <div class="img">
      <router-link to="/">
        <img :src="logo" alt="logo" />
      </router-link>
    </div>
    <div class="separator"></div>
    <span class="points">{{ user.points }} </span>
    <h2 class="menu-user__title">{{ user.name }}</h2>
    <slot></slot>
  </article>
</template>
<script>
import logo from '../assets/logo.svg';

export default {
  name: 'AppUserMenu',

  props: {
    user: {
      name: String,
      id: String,
      points: Number,
      redeemHistory: Array,
      createDate: String,
    },
  },

  data() {
    return {
      logo,
    };
  },
};
</script>
