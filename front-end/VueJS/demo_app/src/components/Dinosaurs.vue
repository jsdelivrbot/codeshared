<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <header>Dinosaurs {{title}}</header>
    <form v-on:submit.prevent='addItem'>
      <input id="itemForm" v-model="input">
			<button v-bind:disabled="buttonDisabled">{{ buttonText }}</button>
    </form>

    <template v-if="items.length > 0">
			<h4>Dinosaur List</h4>
			<ul>
				<li v-for="item in items" v-bind:key="item.text">
					<button v-show="item.quantity < 5" v-on:click="item.quantity += 1">+</button> {{ item.quantity }}
					<button v-show="item.quantity > 1" v-on:click="item.quantity -= 1" >-</button> {{ item.text }}
          <button v-on:click="removeItem"  class="extinct">Make Extinct</button>

          <label>
            <input type="radio" v-bind:value="item" v-model="chosenDino">
            {{item}}
          </label>
          <br>
				</li>
        <span>Favorite: {{chosenDino}}</span>
        <hr>
        <h4>Multi Select:</h4>
        <select v-model="selected" multiple>
          <option v-for="item in items" v-bind:key="item.text" v-bind:value="item.quantity">
            {{item.text}}
          </option>
        </select>
        <br>
        <span>Selected IDs: {{ selected }}</span>
        <br>
			</ul>
		</template>
		<p v-else>You have no Dinosaurs yet</p>
		<ul>
			<li>Total Dinosaurs: {{ totalDinos }} <span>Updated: {{ dinosUpdated }}</span></li>
			<li>Total Species: {{ totalSpecies }} <span>Updated: {{ speciesUpdated }}</span></li>
		</ul>
  </div>
</template>

<script>
export default {
  name: 'Dinosaurs',
  props: {
    msg: String
  },
  data: function() {
    return {
      title: 'Dinosaurs',
      input: '',
      total: 0,
      buttonText: `Add Dinosaur`,
      speciesUpdated: 0,
      dinosUpdated: 0,
      chosenDino: '',
      selected: [],
      items: [
        { text: 'Tyrannosaurus', quantity: 5 },
        { text: 'Triceratops', quantity: 3 },
        { text: 'Stegosaurus', quantity: 6 }
      ]
    };
  },
  filters: {
    capitalize: value => {
      if (!value) {
        return '';
      }
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
    bold: value => {
      if (!value) {
        return '';
      }
      value = value.toString().bold();
      return value;
    }
  },
  computed: {
    totalDinos: function() {
      this.dinosUpdated += 1;
      let sum = 0;
      let items = this.items;

      items.forEach(item => {
        sum += item.quantity;
      });

      return sum;
    },
    totalSpecies: function() {
      this.speciesUpdated++;
      return this.items.length;
    },
    buttonDisabled: function() {
      return this.input === '';
    }
  },
  watch: {
    input: function() {
      this.buttonText = this.input ? 'Add ' + this.input : 'Add Dinasour';
    }
  },
  methods: {
    addItem: function(e) {
      e.preventDefault();
      if (!this.input) return;

      this.items.push({ text: this.input, quantity: 1 });
      this.input = '';
    },
    removeItem: function(item) {
      this.items.splice(item, 1);
    },
    addDinos: function() {
      this.total += parseInt(this.amount);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
