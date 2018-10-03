<template>
  <div>
    <button v-on:click="increment">{{ quantity }}
    </button> {{ name }}
  </div>
</template>

<script>
export default {
  name: 'DinoCounter',
  props: ['initialQuantity', 'name'],
  data: function() {
    this.$emit('increment', this.initialQuantity);
    return {
      quantity: 0,
    };
  },
  methods: {
    increment: function() {
      this.quantity += 1;
      this.$emit('increment', 1);
    }
  }
};
</script>

