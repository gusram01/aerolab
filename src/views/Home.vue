<template>
  <div class="home">
    <app-user-menu v-if="user.name" :user="user" @charge="handleCharge">
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
  getProducts,
  getUserInfo,
  redeemById,
  chargePoints,
  warnSwal,
  loaderSwal,
  successSwal,
} from '@/services';

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
      redeemError: null,
      disabled: {
        isLoading: false,
        id: null,
      },
    };
  },
  created() {
    getProducts()
      .then(data => {
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

    handleCharge() {
      loaderSwal();

      chargePoints()
        .then(resp => {
          if (!resp) {
            return false;
          }
          return getUserInfo();
        })
        .then(data => {
          if (!data) {
            warnSwal('Oops, something went wrong, please try again later 😞');
            return;
          }
          this.user = data;
          successSwal('Now yo have more ');
        })
        .catch(err => {
          console.error(err);
          warnSwal('Oops, something went wrong, please try again later 😞');
        });
    },

    handleRedeem(id) {
      const prod = this.products.filter(product => product._id === id)[0];
      if (prod.cost > this.user.points) {
        return;
      }

      this.disabled.isLoading = true;
      this.disabled.id = id;

      loaderSwal();

      redeemById(id)
        .then(resp => {
          if (!resp) {
            this.redeemError = true;
            warnSwal('Oops, something went wrong, please try again later 😞');
          }
          return getUserInfo();
        })
        .then(data => {
          if (!data) {
            return;
          }
          this.user = data;
          successSwal("You're on fire");
        })
        .catch(err => {
          console.error(err);
          warnSwal('Oops, something went wrong, please try again later 😞');
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
