<template>
  <div id="app">
    <!-- <Dinosaurs msg="Welcome to My App"/> -->
    <ul>
      <li v-for='dino in dinos' v-bind:key="dino.name">
        <dino-counter
          v-bind:initialQuantity='dino.quantity'
          v-bind:name="dino.name"
          v-on:increment="incrementTotal" >
        </dino-counter>
      </li>
    </ul>
    <p>Total Dinosaurs: {{ total }}</p>
  </div>
</template>

<template type="text/x-template" id="dino-counter">
  <div>
		<button v-on:click="increment">{{ quantity }}</button> {{ name }}
	</div>
</template>

<script>
import Dinosaurs from './components/Dinosaurs.vue';

export default {
  name: 'app',
  data: function() {
    return {
      total: 0,
      dinos: [
        { name: 'Tyrannosaurus', quantity: 5 },
        { name: 'Triceratops', quantity: 4 },
        { name: 'Stegosaurus', quantity: 6 }
      ]
    };
  },
  methods: {
    incrementTotal: function(amount) {
      this.total += amount;
    }
  },
  components: {
    Dinosaurs,
    'dino-counter': {
      template: '#dino-counter',
      props: ['initialQuantity', 'name'],
      data: function() {
        this.$emit('increment', this.initialQuantity);
        return {
          quantity: this.initialQuantity
        };
      },
      methods: {
        increment: function() {
          this.quantity += 1;
          this.$emit('increment', 1);
        }
      }
    }
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
