<template>
  <div class="paginator">
    <span class="paginator__label">{{ first }} to {{ last }} of {{ arrLength }}</span>
    <span class="separator"></span>
    <button class="button action" @click="back">
      <img :src="chevronLeft" alt="buton change page" />
    </button>

    <div class="paginator__select">
      <label for="items"># items</label>
      <select v-model="interval" id="items">
        <option>5</option>
        <option>10</option>
        <option>15</option>
      </select>
    </div>

    <button class="button action" @click="next">
      <img :src="chevronRight" alt="buton change page" />
    </button>
  </div>
</template>
<script>
import { Paginator } from '@/services';
import chevronLeft from '../assets/mid-chevron-left.svg';
import chevronRight from '../assets/mid-chevron-right.svg';

export default {
  name: 'AppPaginator',

  props: {
    arrLength: Number,
  },

  data() {
    return {
      first: null,
      last: null,
      interval: 5,
      paginator: Paginator,
      chevronLeft,
      chevronRight,
    };
  },

  created() {
    this.paginator = new Paginator(this.arrLength, this.interval);
    this.setItemsCounters();
    this.emitItemsCounters();
  },

  methods: {
    next() {
      this.paginator.next();
      this.setItemsCounters();
      this.emitItemsCounters();
    },
    back() {
      this.paginator.back();
      this.setItemsCounters();
      this.emitItemsCounters();
    },
    setItemsCounters() {
      this.first = this.paginator.first;
      this.last = this.paginator.last;
    },
    emitItemsCounters() {
      this.$emit('items', { first: this.first, last: this.last });
    },
  },

  watch: {
    interval() {
      this.last = this.paginator.restart(+this.interval);
      this.setItemsCounters();
      return this.emitItemsCounters();
    },
  },
};
</script>
