<template>
  <div class="paginator">
    <button class="button action" @click="back">👈 back</button>
    <select v-model="interval">
      <option>5</option>
      <option>10</option>
      <option>15</option>
    </select>
    <button class="button action" @click="next">next 👉</button>

    <span>{{ first }} - {{ last }} of {{ arrLength }}</span>
  </div>
</template>
<script>
import { Paginator } from '@/services';

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
