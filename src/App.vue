<template>
  <TopNavigationBar @changeHeaderText="changeTextHeader($event)"></TopNavigationBar>
  <div id="main" class="main">
    <div class="classHeader">
      <h1 style="text-align: center;">{{ title }}</h1>
    </div><br><br><br>
    <component :is="currentView" />
  </div>
</template>

<script>
import TopNavigationBar from './components/TopNavigationBar.vue';
import LoadingInitiator from './usable-components/CreatedComponents/LoadingInitiator.vue';
import  * as storage  from './usable-components/CreatedFunctions/partialStorage.js';

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
  components: { TopNavigationBar, LoadingInitiator },
  props: ['isLoadNow'],

  data() {
    return {
      currentPath: window.location.hash,
      title: "",
      loader: false
    }
  },
  computed: {
    currentView() {
      return routes[this.currentPath.slice(1) || '/'] || NotFound;
    }
  },
  mounted() {
    this.title = localStorage.getItem("currentRoute");
    this.loader = storage.getSelectedData();
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


h1 {
  margin-top: 0;
  padding: 20px;
}
</style>
