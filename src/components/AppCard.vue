<template>
  <article class="card">
    <h3>{{ product.name }}</h3>
    <div class="card__image">
      <img :src="product.img.url" :alt="product.name" />
    </div>
    <p class="card__category">
      {{ product.category }}
    </p>
    <div class="card__actions" v-if="!historyMode">
      <p class="points" v-if="calcPoints">
        {{ product.cost }}
      </p>
      <p v-else>
        Almost there:
        <span>
          {{ product.cost - points }}
          💎
        </span>
        more...
      </p>
      <button
        v-if="calcPoints"
        class="button action"
        :disabled="disabled.isLoading && disabled.id === product._id"
        @click="handleClick(product._id)"
      >
        <img :src="shopBag" alt="shop bag icon" />
      </button>
    </div>
    <div class="card__history" v-else>
      <p>This product was redeeme at: {{ product.createDate }}</p>
      <p>
        With amount of:
        {{ product.cost }}
        💎
      </p>
    </div>
  </article>
</template>

<script>
import shopBag from '../assets/shopbag.svg';

export default {
  name: 'AppCard',

  props: {
    points: Number,
    disabled: {
      isLoading: Boolean,
      id: String,
    },
    product: {
      _id: String,
      name: String,
      cost: Number,
      category: String,
      createDate: String,
      img: {
        url: String,
        hdUrl: String,
      },
    },
  },

  data() {
    return {
      shopBag,
      historyMode: false,
    };
  },

  created() {
    this.historyMode = this.$route.meta.historyMode;
  },

  methods: {
    handleClick(id) {
      if (this.disabled.isLoading) {
        return;
      }
      this.$emit('redeem', id);
    },
  },

  computed: {
    calcPoints() {
      return this.points >= this.product.cost;
    },
  },
};
</script>
