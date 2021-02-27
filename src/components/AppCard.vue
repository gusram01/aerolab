<template>
  <article class="card">
    <h3>{{ product.name }}</h3>
    <div class="card__image">
      <img :src="product.img.url" :alt="product.name" />
    </div>
    <div class="card__content">
      <p>{{ product.cost }}</p>
      <p>
        {{ product.category }}
      </p>
    </div>
    <button
      v-if="visible"
      class="button action"
      :disabled="disabled.isLoading && disabled.id === product._id"
      @click="handleClick(product._id)"
    >
      redeem
    </button>
  </article>
</template>
<script>
export default {
  name: 'AppCard',

  props: {
    visible: Boolean,
    disabled: {
      isLoading: Boolean,
      id: String,
    },
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

  methods: {
    handleClick(id) {
      if (this.disabled.isLoading) {
        return;
      }
      this.$emit('redeem', id);
    },
  },
};
</script>
