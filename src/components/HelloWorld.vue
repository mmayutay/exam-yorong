<template>
  <div class="w3-bar w3-border w3-card-4 w3-light-grey w3-right-align">
    <a onclick="document.getElementById('id01').style.display='block'" class="w3-bar-item w3-button nav">Add New
      Product</a>
    <div class="w3-dropdown-hover nav">
      <button class="w3-button">Choose Type</button>
      <div class="w3-dropdown-content w3-bar-block w3-card-4">
        <a @click="stockFilter('show all')" class="w3-bar-item w3-button">Show all</a>
        <a @click="stockFilter('without')" class="w3-bar-item w3-button">No Stocks</a>
        <a @click="stockFilter('with')" class="w3-bar-item w3-button">With Stocks</a>
      </div>
    </div>
    <input class="w3-bar-item w3-input" v-model="searchQuery" :placeholder="typeToSearch" />
    <a @click="resultQuery()" class="w3-bar-item w3-button w3-green">Go</a>
  </div>
  <div class="w3-container">
    <h2>Product table</h2>

    <table class="w3-table-all w3-card-4">
      <tr>
        <th @click="selectedTypeToSearch('Name')">Name</th>
        <th @click="selectedTypeToSearch('Description')">Description</th>
        <th @click="selectedTypeToSearch('Price')">Price</th>
        <th @click="selectedTypeToSearch('Quantity')">Quantity</th>
        <th @click="selectedTypeToSearch('Category')">Category</th>
        <th></th>
        <th></th>
      </tr>
      <tr v-for="item in this.listOfAllProducts" v-bind:key="item">
        <td> <input type="text" v-model="item.name" :readonly="!textEdit" /></td>
        <td> <input type="text" v-model="item.description" :readonly="!textEdit"></td>
        <td> <input type="text" v-model="item.price" :readonly="!textEdit"></td>
        <td> <input type="text" v-model="item.quantity" :readonly="!textEdit"></td>
        <td> <input type="text" v-model="item.category" :readonly="!textEdit"></td>
        <td><button v-if="!buttonType" @click="enableEditButton(this.listOfAllProducts.indexOf(item))">Update</button>
        </td>
        <td><button v-if="buttonType"
            @click="showAlreadyEditedData(this.listOfAllProducts[this.listOfAllProducts.indexOf(item)], this.listOfAllProducts[this.listOfAllProducts.indexOf(item)])">Save</button>
        </td>
        <td><button @click="deleteSelectedProduct(item.id, this.listOfAllProducts.indexOf(item))">Delete</button></td>
      </tr>
    </table>
  </div>
  <div>
    <div id="id01" class="w3-modal">
      <div class="w3-modal-content"><br>
        <h1 style="text-align: center;">Add New Product</h1>
        <div class="w3-container">
          <span onclick="document.getElementById('id01').style.display='none'"
            class="w3-button w3-display-topright">&times;</span>
          <div class="input">
            <label for="name">Name</label>
            <input type="text" id="name" name="name" v-model="name">

            <label for="desc">Description</label>
            <input type="text" id="desc" name="desc" v-model="description">

            <label for="price">Price</label>
            <input type="text" id="price" name="price" v-model="price">

            <label for="Quantity">Quantity</label>
            <input type="number" id="Quantity" name="Quantity" v-model="quantity">

            <label for="category">Category</label>
            <input type="text" id="category" name="category" v-model="category">

            <input type="submit" value="Submit" @click="addNewProduct()">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllProducts, addNewProduct, deleteSelectedFunction, updateSelectedFunction } from '../services/ProductsService';
import Swal from 'sweetalert2';

export default {
  mounted() {
    getAllProducts().then(response => {
      this.listOfAllProducts = response;
      this.tempDataHandler = this.listOfAllProducts;
    })
  },
  data() {
    return {
      listOfAllProducts: [],
      tempDataHandler: [],
      buttonType: false,
      textEdit: false,
      searchQuery: "",
      typeToSearch: "Name"
    }
  },
  name: 'HelloWorld',
  props: {
    msg: String,
    data: {
      name: "",
      description: "",
      price: "",
      quantity: "",
      category: ""
    }
  },
  methods: {

    selectedTypeToSearch(type) {
      this.typeToSearch = type;
    },

    showAlreadyEditedData(item, index) {
      updateSelectedFunction(item).then((response) => {
        console.log(response)
        Swal.fire('Updated Done!', "An Item is successfully updated!", 'success')
        this.listOfAllProducts[index] = item;
      })
    },

    enableEditButton(index) {
      console.log(index)
      this.textEdit = true;
      this.buttonType = true;
    },

    addNewProduct() {
      addNewProduct({ name: this.name, description: this.description, price: this.price, quantity: this.quantity, category: this.category }).then(response => {
        this.listOfAllProducts.push(response);
      })
    },

    deleteSelectedProduct(itemid, index) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You want to delete this selected product?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          deleteSelectedFunction(itemid).then(response => {
            console.log(response)
            this.listOfAllProducts.splice(1, index - 1);
            Swal.fire(
              'Deleted!',
              'Product deleted successfully.',
              'success'
            )
          })
        }
      })
    },

    stockFilter(type) {
      console.log(this.tempDataHandler)
      if (type == "with") {
        this.listOfAllProducts.length = 0;
        for (let index = 0; index < this.tempDataHandler.length; index++) {
          if (this.tempDataHandler[index].quantity >= 1) {
            this.listOfAllProducts.push(this.tempDataHandler[index]);
          }
        }
      } else if (type == "without") {
        this.listOfAllProducts.length = 0;
        for (let index = 0; index < this.tempDataHandler.length; index++) {
          if (this.tempDataHandler[index].quantity <= 0) {
            this.listOfAllProducts.push(this.tempDataHandler[index]);
          }
        }
      } else {
        console.log(this.tempDataHandler)
        location.reload()
      }
    },

    resultQuery() {      
      if (this.searchQuery) {
        this.listOfAllProducts = this.listOfAllProducts.filter((item) => {
          return this.searchQuery.toLowerCase().split('').every(v => 
          item[this.typeToSearch.toLowerCase()].toLowerCase().includes(v))
        })
      } else {
        return this.listOfAllProducts;
      }
    }
  }
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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

.nav {
  padding-left: 15%;
  padding-right: 15%;
}
</style>
