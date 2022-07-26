<template>

  <TopNavigationBar></TopNavigationBar>

</template>

<script>
import { updateSelectedFunction } from '../services/ProductsService';
import Swal from 'sweetalert2';
import TopNavigationBar from './sub-components/TopNavigationBar.vue';

export default {
  data() {
    return {
      listOfAllProducts: [],
      tempDataHandler: [],
      buttonType: false,
      textEdit: false,
      searchQuery: "",
      typeToSearch: "Name"
    };
  },
  name: "HelloWorld",
  components: { TopNavigationBar },
  props: {
    msg: String
  },
  methods: {
    selectedTypeToSearch(type) {
      this.typeToSearch = type;
    },
    showAlreadyEditedData(item, index) {
      updateSelectedFunction(item).then((response) => {
        console.log(response);
        Swal.fire("Updated Done!", "An Item is successfully updated!", "success");
        this.listOfAllProducts[index] = item;
      });
    },
    enableEditButton(index) {
      console.log(index);
      this.textEdit = true;
      this.buttonType = true;
    },
  }
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  box-sizing: border-box;
}

/* Create two equal columns that floats next to each other */
.column1 {
  float: left;
  width: 20%;
  /* Should be removed. Only for demonstration */
}

.column2 {
  float: left;
  width: 80%;
  padding: 10px;
  height: 300px;
  /* Should be removed. Only for demonstration */
}

.row {
  height: 100%;
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}


input[type=text],
input[type=number],
select {
  width: 100%;
  padding: 10px 18px;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  outline: none;
}

input[type=submit] {
  width: 100%;
  background-color: #4CAF50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type=submit]:hover {
  background-color: #45a049;
}

div.input {
  border-radius: 5px;
  padding: 20px;
}
</style>
