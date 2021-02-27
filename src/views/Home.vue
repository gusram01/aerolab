<template>
  <div class="home">
    <app-user-menu v-if="user.name" :user="user"></app-user-menu>

    <app-paginator
      v-if="this.products && this.products.length"
      :arrLength="this.products.length"
      @items="paginatorItems"
    >
    </app-paginator>
    <app-sort v-if="products" :filters="filters" :products="products" @sortedProducts="handleSort">
      <section class="card__container">
        <app-card
          v-for="product in renderProducts"
          :key="product._id"
          :product="product"
        ></app-card>
      </section>
    </app-sort>

    <app-loader v-else></app-loader>
  </div>
</template>

<script>
import AppUserMenu from '@/components/AppUserMenu.vue';
import AppPaginator from '@/components/AppPaginator.vue';
import AppLoader from '@/components/AppLoader.vue';
import AppCard from '@/components/AppCard.vue';
import AppSort from '@/components/AppSort.vue';
import { getProducts, getUserInfo } from '@/services';

export default {
  name: 'Home',

  data() {
    return {
      filters: ['price', 'category', 'name'],
      products: null,
      first: null,
      last: null,
      sortedProducts: null,
      user: {},
    };
  },
  created() {
    getProducts()
      .then(data => {
        console.log(data);
        this.products = data;
      })
      .catch(err => {
        this.products = err;
      });
    getUserInfo()
      .then(data => {
        if (!data) {
          return;
        }
        this.user = data;
      })
      .catch(err => {
        console.error(err);
      });
  },

  methods: {
    paginatorItems({ first, last }) {
      this.first = first;
      this.last = last;
    },
    handleSort(sortedProducts) {
      this.sortedProducts = sortedProducts;
    },
  },

  computed: {
    renderProducts() {
      return (
        this.sortedProducts && this.sortedProducts.map(item => item).slice(this.first, this.last)
      );
    },
  },

  components: {
    AppUserMenu,
    AppPaginator,
    AppLoader,
    AppCard,
    AppSort,
  },
};
</script>
