<template>
  <div class="sort">
    <div class="sort__actions">
      <span>Order by </span>
      <div class="badge__container">
        <button
          class="button badge"
          v-for="filter in filters"
          :key="filter"
          @click="chosenFilter(filter)"
          :class="{ active: activeSort[filter] !== 0 }"
        >
          <img :src="chevronDown" alt="" width="25px" v-if="activeSort[filter] === 2" />
          <img :src="chevronUp" alt="" width="25px" v-if="activeSort[filter] === 1" />
          {{ filter }}
        </button>
      </div>
    </div>
    <slot></slot>
  </div>
</template>
<script>
import chevronDown from '../assets/chevron-down.svg';
import chevronUp from '../assets/chevron-up.svg';

export default {
  name: 'AppSort',

  props: {
    products: Array,
    filters: Array,
  },

  data() {
    return {
      // every filter added need to declare the key inside this object
      activeSort: {
        price: 0,
        category: 0,
        name: 0,
      },
      sortedProducts: [],
      chevronDown,
      chevronUp,
    };
  },

  created() {
    this.sortedProducts = this.products;
    this.$emit('sortedProducts', this.sortedProducts);
  },

  methods: {
    chosenFilter(filter) {
      // validate if any filter is active
      Object.keys(this.activeSort).forEach(key => {
        if (filter === key) {
          return;
        }
        this.activeSort[key] = 0;
      });

      // using aux variable to know the filter state
      this.activeSort[filter] += 1;
      if (this.activeSort[filter] > 2) {
        this.activeSort[filter] = 0;
      }

      // apply the correct action for the state of filter
      if (this.activeSort[filter] === 0) {
        this.sortedProducts = this.products;
      }
      if (this.activeSort[filter] === 1) {
        this.sortedProducts = this.sortUp(filter, this.sortedProducts);
      }
      if (this.activeSort[filter] === 2) {
        this.sortedProducts = this.sortDown(filter, this.sortedProducts);
      }
      this.$emit('sortedProducts', this.sortedProducts);
    },

    sortUp(filter, arr) {
      return arr
        .map(item => item)
        .sort((a, b) => {
          let x = a[filter === 'price' ? 'cost' : filter];
          let y = b[filter === 'price' ? 'cost' : filter];
          if (filter === 'name') {
            x = x.toUpperCase();
            y = y.toUpperCase();
          }
          if (x < y) {
            return -1;
          }
          if (x > y) {
            return 1;
          }
          return 0;
        });
    },

    sortDown(filter, arr) {
      return arr
        .map(item => item)
        .sort((a, b) => {
          let x = a[filter === 'price' ? 'cost' : filter];
          let y = b[filter === 'price' ? 'cost' : filter];
          if (filter === 'name') {
            x = x.toUpperCase();
            y = y.toUpperCase();
          }
          if (x > y) {
            return -1;
          }
          if (x < y) {
            return 1;
          }
          return 0;
        });
    },
  },
};
</script>
