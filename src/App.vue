<template>
  <TopNavigationBar @changeHeaderText="changeTextHeader($event)"></TopNavigationBar>
  <div id="main" class="main">
    <h1 style="text-align: center;">{{ title }}</h1><br><br>
    <component :is="currentView" />
  </div>  
</template>

<script>
import TopNavigationBar from './components/TopNavigationBar.vue';

import ProductTable from './components/sub-components/ProductTable.vue';
import NotFound from './components/sub-components/NotFound.vue';
import AddNewProduct from './components/sub-components/AddNewProduct.vue';
import { defineComponent } from 'vue';
import HomeChart from './components/sub-components/HomeChart.vue';

const routes = {
  '/': HomeChart,
  '/list': ProductTable,
  '/add-new-product': AddNewProduct
}

export default defineComponent({
  name: 'App',
  components: {TopNavigationBar},

  data() {
    return {
      currentPath: window.location.hash,
      title: ""
    }
  },
  computed: {
    currentView() {
      return routes[this.currentPath.slice(1) || '/'] || NotFound;
    }
  },
  mounted() {
    console.log(window.location.hash)
    window.addEventListener('hashchange', () => {
      this.currentPath = window.location.hash
    })
  },
  methods: {
    changeTextHeader(text) {
      this.title = text
    }
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.main {
  margin-left: 50px;
}
</style>
