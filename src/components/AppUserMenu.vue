<template>
  <article class="menu-user">
    <div class="img">
      <router-link to="/">
        <img :src="logo" alt="logo" />
      </router-link>
      <router-link class="button accent outline" :to="{ name: 'History' }"> History </router-link>
      <button class="button accent outline">Charge</button>
    </div>

    <div class="separator"></div>
    <span class="points">{{ user.points }} </span>
    <h2 class="menu-user__title" :class="{ active: active }" @click="handleClick">
      <small> Welcome </small>
      {{ user.name }}
    </h2>

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
      active: false,
    };
  },

  methods: {
    handleClick() {
      this.active = !this.active;
    },
  },
};
</script>
