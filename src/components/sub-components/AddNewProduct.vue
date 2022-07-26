<template>
    <div class="w3-container container">
        <div class="w3-card-4 inputForm">
            <div class="row">
                <div class="column">
                    <input placeholder="Product Name" type="text" id="name" name="name" v-model="name">
                </div>
                <div class="column">
                    <input placeholder="Product Description" type="text" id="desc" name="desc" v-model="description">
                </div>
            </div><br>

            <div class="row">
                <div class="column">
                    <input placeholder="Product Price" type="number" id="price" name="price" v-model="price">
                </div>
                <div class="column">
                    <input placeholder="Quantity" type="number" id="Quantity" name="Quantity" v-model="quantity">
                </div>
            </div> <br>

            <div class="row">
                <input placeholder="Category" style="width: 98%;" type="text" id="category" name="category"
                    v-model="category">
            </div> <br>

            <button @click="addNewProduct()">Submit</button><br><br><br>
        </div>
    </div>
</template>        
<script>
import { addNewProduct } from '@/services/ProductsService';
import Swal from 'sweetalert2';

export default {
    name: 'AddNewProduct',
    props: {
        data: {
            name: "",
            description: "",
            price: "",
            quantity: "",
            category: ""
        }
    },
    methods: {
        addNewProduct() {
            addNewProduct({ name: this.name, description: this.description, price: this.price, quantity: this.quantity, category: this.category }).then(() => {
                Swal.fire("Item Added!", "An item was successfully Added!", "success")
            });
        }
    }
}
</script>

<style scoped>
.container {
    width: 100%;
}

.inputForm {
    background-color: rgba(240, 240, 240, 0.5);
    border-radius: 10px;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    padding: 40px;
    width: 80%;
}

input {
    margin: 10px;
    width: 95%;
    padding: 10px;
    padding-left: 30px;
    border-radius: 50px;
    outline: none;
    border: 1px solid rgba(184, 184, 184, 0.3);
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
}

button {
    width: 98%;
    padding: 15px;
    border-radius: 50px;
    outline: none;
    border: 1px solid rgb(138, 138, 138);
    background-color: rgb(97, 97, 255);
    color: white;
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0;
}

button:hover {
    background-color: rgb(77, 77, 203);
}

* {
    box-sizing: border-box;
}

/* Create two equal columns that floats next to each other */
.column {
    float: left;
    width: 50%;
    /* Should be removed. Only for demonstration */
}

.row {
    margin-left: auto;
    margin-right: auto;
    width: 100%;
}

/* Clear floats after the columns */
.row:after {
    content: "";
    display: table;
    clear: both;
}
</style>