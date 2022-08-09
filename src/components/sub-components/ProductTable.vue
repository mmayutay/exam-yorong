<template>
    <LoadingInitiator v-if="bool"></LoadingInitiator>
    <div class="w3-container">
        <div class="w2-responsive">
            <TransitionGroup tag="table" name="fade" class="w3-table w3-bordered">
                <tr>
                    <th>Product Name</th>
                    <th>Price ($) </th>
                    <th>Quantity</th>
                    <th>Category</th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
                <tr v-for="(item, index) in this.listOfAllProducts" :key="item.id">
                    <td> <input type="text" v-model="item.name" :readonly="!this.arrayOfBooleans[index]"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 input"
                            :style="!this.arrayOfBooleans[index] ? 'color: rgba(184, 184, 184)' : 'black'" /></td>
                    <td> <input type="text" v-model="item.price" :readonly="!this.arrayOfBooleans[index]"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 input"
                            :style="!this.arrayOfBooleans[index] ? 'color: rgba(184, 184, 184)' : 'black'"></td>
                    <td> <input type="text" v-model="item.quantity" :readonly="!this.arrayOfBooleans[index]"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 input"
                            :style="!this.arrayOfBooleans[index] ? 'color: rgba(184, 184, 184)' : 'black'"></td>
                    <td>
                        <select
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 select-table"
                            @change="changeParameterChoose($event.target.value)" v-model="item.category.name"
                            :disabled="!this.arrayOfBooleans[index]">
                            <option disabled value="">Please select one</option>
                            <option v-for="category of this.allCategories" :key="category.id">{{ category.name }}
                            </option>
                        </select>
                        <!-- <input type="text" v-model="item.category.name" :readonly="!this.arrayOfBooleans[index]"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            :style="!this.arrayOfBooleans[index] ? 'color: rgba(184, 184, 184)' : 'black'"> -->
                    </td>
                    <td><i class='fa fa-eye' @click="transferSelectedData(item)"></i></td>

                    <td v-if="!this.arrayOfBooleans[index]"><i class='fa fa-edit'
                            @click="enableEditButton(this.listOfAllProducts.indexOf(item))"></i></td>

                    <td v-if="this.arrayOfBooleans[index]"><i class="fa fa-save"
                            @click="showAlreadyEditedData(this.listOfAllProducts[this.listOfAllProducts.indexOf(item)], this.listOfAllProducts[this.listOfAllProducts.indexOf(item)])"></i>
                    </td>
                    <td><i class='fa fa-trash'
                            @click="deleteSelectedProduct(item.id, this.listOfAllProducts.indexOf(item))"></i>
                    </td>
                </tr>
            </TransitionGroup><br>
            <Transition name="fading">
                <PaginationComponent v-if="fade" @dataToPass="theNewData($event)"
                    @index="changeNewDataOfTable($event)" />
            </Transition>
        </div>
    </div>
    <DisplayItemDetails :userData="dataPassed"></DisplayItemDetails>
</template>

<script>
import { updateSelectedFunction, deleteSelectedFunction, getAllProducts, getSelectedItem, returnAllCategories } from '../../services/ProductsService';
import Swal from 'sweetalert2';
import DisplayItemDetails from '../../usable-components/CreatedComponents/DisplayItemDetails.vue';
import { LoadingInitiator } from '../../usable-components/CreatedComponents/LoadingInitiator.vue';
import PaginationComponent from '@/usable-components/CreatedComponents/PaginationComponent.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    data() {
        return {
            listOfAllProducts: [],
            tempDataHandler: [],
            arrayOfBooleans: [],
            searchQuery: "",
            dataPassed: [],
            bool: false,
            fade: false,
            allCategories: []
        };
    },
    mounted() {
        getAllProducts().then(response => {
            this.listOfAllProducts = this.addingBooleanIndex(response);
            this.tempDataHandler = this.listOfAllProducts;
        });

        returnAllCategories().then(response => {
            this.allCategories = response;
        })
    },


    name: 'ProductTable',
    props: ['dataResults'],
    emits: ["addDataToDisplay"],
    components: { DisplayItemDetails, LoadingInitiator, PaginationComponent },
    methods: {
        changeNewDataOfTable(index) {
            this.listOfAllProducts = this.tempDataHandler[index];
        },
        theNewData(result) {
            this.tempDataHandler = result;
            this.listOfAllProducts = result[0];
        },
        transferSelectedData(selectedItem) {
            getSelectedItem(selectedItem.id).then((response) => {
                this.dataPassed = response;
                document.getElementById('id01').style.display = 'block';
            })
        },

        enableEditButton(index) {
            this.arrayOfBooleans[index] = true;
        },

        showAlreadyEditedData(item, index) {
            this.bool = true;
            updateSelectedFunction(item).then((response) => {
                console.log(this.arrayOfBooleans, index)
                this.arrayOfBooleans[this.listOfAllProducts.indexOf(index)] = false;
                this.bool = false;
                Swal.fire('Updated Done!', "An Item was successfully updated!", 'success')
                this.listOfAllProducts[index] = item;
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
                        this.listOfAllProducts.splice(index, 1);
                        Swal.fire(
                            'Deleted!',
                            'Product deleted successfully.',
                            'success'
                        )
                    })
                }
            })
        },


        addingBooleanIndex(array) {
            let values = array.map((response) => {
                this.arrayOfBooleans.push(false)
                return response;
            })
            console.log(values)
            this.fade = true;
        }
    }
})
</script>

<style scoped>
.select-table {
    width: 100%;
    padding: 10px 18px;
    display: inline-block;
    box-sizing: border-box;
    outline: none;
    padding-left: 30px;
    margin-top: 10px;
    margin-bottom: 10px;
    box-shadow: 2px 2px 2px 1px rgba(120, 120, 120, 0.5);
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

.input {
    border-radius: 5px;
    margin: 10px;
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
    cursor: pointer;
    transition: ease 0.3s;
    text-align: center;
}

table {
    border-radius: 10px;
}

th {
    text-align: center;
}

.fa-edit:hover {
    color: rgb(88, 88, 254);
}

.fa-eye:hover {
    color: rgb(76, 246, 76);
}

.fa-trash:hover {
    color: rgb(255, 99, 99);
}

/* 1. declare transition */
.fade-move,
.fade-enter-active,
.fade-leave-active {
    transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. declare enter from and leave to state */
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: scaleY(0.01) translate(30px, 0);
}

/* 3. ensure leaving items are taken out of layout flow so that moving
      animations can be calculated correctly. */
.fade-leave-active {
    position: absolute;
}

.fading-enter-active,
.fading-leave-active {
    transition: opacity 0.5s ease;
}

.fading-enter-from,
.fading-leave-to {
    opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
    transition: all 0.25s ease-out;
}

.slide-up-enter-from {
    opacity: 0;
    transform: translateY(30px);
}

.slide-up-leave-to {
    opacity: 0;
    transform: translateY(-30px);
}
</style>