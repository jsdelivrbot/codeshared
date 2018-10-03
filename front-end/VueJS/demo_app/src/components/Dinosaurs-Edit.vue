<template  >
		<div id="dino-edit"><button v-on:click="increment"> {{ quantity }}</button> {{ name }}</div>
</template>

<script>
export default {
  name: 'DinoEdit',
  props: ['initialQuantity', 'name', 'index'],
  data: function() {
    return {
      quantity: this.initialQuantity
    };
  },
  methods: {
    increment: function() {
      this.quantity += 1;
    }
  }
};
</script>



