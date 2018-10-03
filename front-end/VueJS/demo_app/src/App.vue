<template>
  <div id="app">
    <Dinosaurs msg="Welcome to My App"/>
    <ul>
      <li v-for='dino in dinos' v-bind:key="dino.name">
        <dino-counter
          v-bind:initial-quantity='dino.quantity'
          v-bind:name="dino.name"
          v-on:increment="incrementTotal" >
        </dino-counter>
      </li>
    </ul>
    <p>Total Dinosaurs: {{ total }}</p>

    <ul>
			<li v-for="dino in dinos" v-bind:key="dino.name">
				<keep-alive>
					<component v-bind:is="currentView" v-bind:initial-quantity="dino.quantity" v-bind:name="dino.name"></component>
				</keep-alive>
			</li>
		</ul>
  </div>
</template>

<script>
import Dinosaurs from './components/Dinosaurs.vue';
import DinoCounter from './components/Dinosaurs-Counter';
import DinoEdit from './components/Dinosaurs-Edit';
import DinoShow from './components/Dinosaurs-Show';

export default {
  name: 'app',
  data: function() {
    return {
      currentView: "dino-show",
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
    'dino-counter': DinoCounter,
    'dino-edit': DinoEdit,
    'dino-show': DinoShow
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
