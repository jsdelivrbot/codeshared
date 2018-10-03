<template>
  <div><strong>{{ name }}</strong> | {{ diet }}</div>
</template>

<script>
export default {
  name: 'DinoShow',
  props: ["name", "diet"]
}
</script>

