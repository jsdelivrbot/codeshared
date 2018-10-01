<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h5>Hello {{title}}</h5>
    <ul>
      <li v-for='item in items' v-bind:key='item.age'>
        <p>{{item.name | capitalize | bold}}</p>
        <span>The age is: {{item.age}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data: () => {
    return {
      title: 'My App',
      items: [{ name: 'danny', age: 33 }, { name: 'ryan', age: 29 }, { name: 'ruby', age: 28 }]
    };
  },
  filters: {
    capitalize: (value) => {
      if (!value) {
        return '';
      }
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
    bold: (value) => {
      if (!value) {
        return '';
      }
      value = value.toString().bold();
      return value;
    }
  },
  methods: {
    addItem: () => {
      console.log('add item');
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
