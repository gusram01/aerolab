<template>
  <article class="card">
    <h2>{{ product.name }}</h2>
    <div class="card__image">
      <img :src="product.img.url" :alt="product.name" />
    </div>
    <div class="card__content">
      <p>{{ product.cost }}</p>
      <p>
        {{ product.category }}
      </p>
    </div>
  </article>
</template>
<script>
export default {
  name: 'AppCard',

  props: {
    product: {
      _id: String,
      name: String,
      cost: Number,
      category: String,
      img: {
        url: String,
        hdUrl: String,
      },
    },
  },
};
</script>
