<template>
  <div class="history">
    <router-link class="button accent outline" :to="{ name: 'Home' }"> Go back </router-link>
    <section class="card__container" v-if="products">
      <app-card
        v-for="product in products"
        :key="+product.productId + product.createDate"
        :product="product"
        :points="user.points"
      />
    </section>

    <app-loader v-else />
  </div>
</template>

<script>
import AppLoader from '@/components/AppLoader.vue';
import AppCard from '@/components/AppCard.vue';
import { getUserHistory } from '@/services';

export default {
  name: 'History',

  data() {
    return {
      products: null,
      sortedProducts: null,
      user: {},
      redeemError: null,
    };
  },
  created() {
    getUserHistory()
      .then(data => {
        this.products = data;
      })
      .catch(err => {
        this.products = err;
      });
  },

  methods: {
    handleSort(sortedProducts) {
      this.sortedProducts = sortedProducts;
    },
  },

  components: {
    AppLoader,
    AppCard,
  },
};
</script>
