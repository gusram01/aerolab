<template>
  <div class="home">
    <div class="hero">
      <h1 class="principal-title">Loyalty Rewards</h1>
      <img :src="imgHeader" alt="hero header" />
    </div>

    <app-user-menu v-if="user.name" :user="user">
      <app-paginator
        v-if="this.products && this.products.length"
        :arrLength="this.products.length"
        @items="paginatorItems"
      />
    </app-user-menu>

    <app-sort v-if="products" :filters="filters" :products="products" @sortedProducts="handleSort">
      <section class="card__container">
        <app-card
          v-for="product in renderProducts"
          :key="product._id"
          :product="product"
          :disabled="disabled"
          :points="user.points"
          @redeem="handleRedeem"
        />
      </section>
    </app-sort>

    <app-loader v-else />
  </div>
</template>

<script>
import AppUserMenu from '@/components/AppUserMenu.vue';
import AppPaginator from '@/components/AppPaginator.vue';
import AppLoader from '@/components/AppLoader.vue';
import AppCard from '@/components/AppCard.vue';
import AppSort from '@/components/AppSort.vue';
import {
  //  getProducts,
  getUserInfo,
  redeemById,
} from '@/services';
import imgHeader from '../assets/header.webp';
import { dummy } from '../helpers/dummy';

export default {
  name: 'Home',

  data() {
    return {
      filters: ['price', 'category', 'name'],
      products: dummy,
      first: null,
      last: null,
      sortedProducts: null,
      user: {},
      redeemError: null,
      disabled: {
        isLoading: false,
        id: null,
      },
      imgHeader,
    };
  },
  created() {
    // getProducts()
    //   .then(data => {
    //     this.products = data;
    //   })
    //   .catch(err => {
    //     this.products = err;
    //   });
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
    handleRedeem(id) {
      const prod = this.products.filter(product => product._id === id)[0];
      if (prod.cost > this.user.points) {
        return;
      }

      this.disabled.isLoading = true;
      this.disabled.id = id;

      redeemById(id)
        .then(resp => {
          if (!resp) {
            this.redeemError = true;
          }
          return getUserInfo();
        })
        .then(data => {
          if (!data) {
            return;
          }
          this.user = data;
        })
        .catch(err => {
          console.error(err);
        })
        .finally(() => {
          this.disabled.isLoading = false;
          this.disabled.id = null;
        });
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
