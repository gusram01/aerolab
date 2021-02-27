<template>
  <article>
    <h1 class="menu__title">{{ user.name }}</h1>
    <span class="menu__points">{{ user.points }} </span>
  </article>
</template>
<script>
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
};
</script>
