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
import { getUserHistory, warnSwal, loaderSwal, closeSwal } from '@/services';

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
    loaderSwal();
    getUserHistory()
      .then(data => {
        if (!data) {
          this.products = [];
          warnSwal('Oops, it seems there is no history yet!!');
          return;
        }

        this.products = data;
        closeSwal();
      })
      .catch(() => {
        warnSwal('Oops, something went wrong, please try again later 😞');
        this.products = [];
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
