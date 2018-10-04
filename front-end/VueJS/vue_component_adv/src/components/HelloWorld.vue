<template>
  <Settings>
    <Layout slot-scope="{settingsHeader, settingsFooter}">
          <Header slot='header' :header='settingsHeader'></Header>
          <div slot="content">Amazing Content</div>
          <Footer slot='footer' :footer='settingsFooter'></Footer>
    </Layout>
  </Settings>
</template>

<script>
import Layout from './Layout';
import Settings from './Settings';
import { Header, Footer } from './LayoutComponents';

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: { Layout, Settings, Header, Footer }
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
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
