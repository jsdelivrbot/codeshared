<template>
  <div>
    <slot :settingsHeader="header" :settingsFooter="footer"></slot>
  </div>
</template>


<script>
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({})
export default class Settings extends Vue {
  header = 'Awesome Site';
  footer = 'Incredible Footer';
}
</script>

