const eventBus = {};

// eslint-disable-next-line func-names
eventBus.install = function (Vue) {
  // eslint-disable-next-line no-param-reassign
  Vue.prototype.$bus = new Vue();
};

export default eventBus;
