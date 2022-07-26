<template>
    <div class="w3-container">
        <div class="w2-responsive">
            <table class="w3-table-all w3-card-4 w3-round">
                <tr>
                    <th @click="selectedTypeToSearch('Name')">Product Name</th>
                    <th @click="selectedTypeToSearch('Price')">Price</th>
                    <th @click="selectedTypeToSearch('Quantity')">Quantity</th>
                    <th @click="selectedTypeToSearch('Category')">Category</th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
                <tr v-for="item in this.listOfAllProducts" v-bind:key="item">
                    <td> <input type="text" v-model="item.name" :readonly="!textEdit" /></td>
                    <td> <input type="text" v-model="item.price" :readonly="!textEdit"></td>
                    <td> <input type="text" v-model="item.quantity" :readonly="!textEdit"></td>
                    <td> <input type="text" v-model="item.category" :readonly="!textEdit"></td>
                    <td><i class='fa fa-eye' @click="transferSelectedData(item)"></i></td>
                    <td v-if="!buttonType"><i class='fa fa-edit'
                            @click="enableEditButton(this.listOfAllProducts.indexOf(item))"></i>
                    </td>
                    <td v-if="buttonType"><i class="fa fa-save"
                            @click="showAlreadyEditedData(this.listOfAllProducts[this.listOfAllProducts.indexOf(item)], this.listOfAllProducts[this.listOfAllProducts.indexOf(item)])"></i>
                    </td>
                    <td><i class='fa fa-trash'
                            @click="deleteSelectedProduct(item.id, this.listOfAllProducts.indexOf(item))"></i>
                    </td>
                </tr>
            </table>
        </div>
    </div>
    <DisplayItemDetails :userData="dataPassed"></DisplayItemDetails>
</template>

<script>

import { updateSelectedFunction, deleteSelectedFunction, getAllProducts } from '../../services/ProductsService';
import Swal from 'sweetalert2';
import DisplayItemDetails from '@/usable-components/ItemDetails/DisplayItemDetails.vue';
// import { storeSelectedData } from '../../usable-components/ItemDetails/partialStorage';
import { defineComponent } from 'vue';

export default defineComponent({
    data() {
        return {
            listOfAllProducts: [],
            tempDataHandler: [],
            buttonType: false,
            textEdit: false,
            searchQuery: "",
            typeToSearch: "Name",
            dataPassed: []
        };
    },
    mounted() {
        getAllProducts().then(response => {
            this.listOfAllProducts = response;
            this.tempDataHandler = this.listOfAllProducts;
        });
    },


    name: 'ProductTable',
    emits: ["addDataToDisplay"],
    components: {DisplayItemDetails},
    methods: {
        selectedTypeToSearch(type) {
            this.typeToSearch = type;
        },

        transferSelectedData(selectedItem) {
            this.dataPassed = selectedItem;
            document.getElementById('id01').style.display='block';
        },  

        enableEditButton(index) {
            console.log(index)
            this.textEdit = true;
            this.buttonType = true;
        },

        showAlreadyEditedData(item, index) {
            updateSelectedFunction(item).then((response) => {
                console.log(response)
                Swal.fire('Updated Done!', "An Item is successfully updated!", 'success')
                this.listOfAllProducts[index] = item;
                this.buttonType = false;
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
        }
    }
})

</script>

<style scoped>
input[type=text],
input[type=number],
select {
    width: 100%;
    padding: 10px 18px;
    display: inline-block;
    border-radius: 50px;
    box-sizing: border-box;
    outline: none;
    padding-left: 30px;
    border: 1px solid rgba(184, 184, 184, 0.3);
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
    margin-top: 10px;
    margin-bottom: 10px;
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

.fa {
    font-size: 25px;
    width: 50px;
    margin-top: 20px;
    margin-bottom: 10px;
}
table {
    border-radius: 10px;
}
</style>