<template>
    <LoadingInitiator v-if="bool"></LoadingInitiator>
    <div class="container">
        <div class="inputFormAdd">
            <form @submit.prevent="addNewProduct">
                <div class="grid gap-6 mb-6 md:grid-cols-2">
                    <div class="column">
                        <div class="form-group">
                            <input placeholder="Product Name" type="text" name="pname"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 input"
                                v-model="v$.form.pName.$model">
                            <div class="pre-icon os-icon os-icon-user-male-circle"></div>
                            <!-- Error Message -->
                            <div class="input-errors" v-for="(error, index) of v$.form.pName.$errors" :key="index">
                                <p class="error-msg">{{ error.$message }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <input placeholder="Product Description" type="text" id="description" name="description"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 input"
                            v-model="v$.form.pDescription.$model">
                        <div class="pre-icon os-icon os-icon-user-male-circle"></div>
                        <!-- Error Message -->
                        <div class="input-errors" v-for="(error, index) of v$.form.pDescription.$errors" :key="index">
                            <p class="error-msg">{{ error.$message }}</p>
                        </div>
                    </div>

                    <div class="column">
                        <input placeholder="Product Price" type="number" id="price" name="price"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 input"
                            v-model="v$.form.pPrice.$model">
                        <div class="pre-icon os-icon os-icon-user-male-circle"></div>
                        <!-- Error Message -->
                        <div class="input-errors" v-for="(error, index) of v$.form.pPrice.$errors" :key="index">
                            <p class="error-msg">{{ error.$message }}</p>
                        </div>
                    </div>
                    <div class="column">
                        <input placeholder="Product Quantity" type="number" id="quantity" name="quantity"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 input"
                            v-model="v$.form.pQuantity.$model">
                        <div class="pre-icon os-icon os-icon-user-male-circle"></div>
                        <!-- Error Message -->
                        <div class="input-errors" v-for="(error, index) of v$.form.pQuantity.$errors" :key="index">
                            <p class="error-msg">{{ error.$message }}</p>
                        </div>
                    </div>
                    <div class="column">
                        <input placeholder="Total Amount ($)" type="number" id="totalAmount" name="totalAmount" disabled
                            :value="this.form.pPrice * this.form.pQuantity"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 input">
                    </div>

                    <div class="column">
                        <select
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 select-add"
                            @change="returnIdSelectCateg($event.target.value)" v-model="v$.form.pCategory.$model">
                            <option disabled value="">Please select one</option>
                            <option v-for="category of this.listCategories" v-bind:key="category.id">{{ category.name }}
                            </option>
                        </select>
                        <div class="pre-icon os-icon os-icon-user-male-circle"></div>
                        <div class="input-errors" v-for="(error, index) of v$.form.pCategory.$errors" :key="index">
                            <p class="error-msg">{{ error.$message }}</p>
                        </div>
                    </div>
                </div> <br>

                <button class="button" :disabled="v$.form.$invalid">Submit</button><br><br>
            </form>
        </div>
        <br>
    </div>
</template>        
<script>
import { returnAllCategories } from '@/services/ProductsService';
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { addNewProduct } from '@/services/ProductsService';
import LoadingInitiator from '../../usable-components/CreatedComponents/LoadingInitiator.vue';

import Swal from 'sweetalert2';

export function validName(name) {
    let validNamePattern = new RegExp("^[a-zA-Z]+(?:[-'\\s][a-zA-Z]+)*$");
    if (validNamePattern.test(name)) {
        return true;
    }
    return false;
}

export default {

    setup() {
        return { v$: useVuelidate() }
    },

    mounted() {
        returnAllCategories().then((response) => {
            this.listCategories = response;
        })
    },

    name: 'AddNewProduct',
    components: { LoadingInitiator },
    data() {
        return {
            bool: false,
            form: {
                pName: "",
                pDescription: "",
                pPrice: "",
                pQuantity: "",
                pCategory: "",
            },
            listCategories: [],
            selectedCategory: ''
        }
    },

    validations() {
        return {
            form: {
                pName: { required },
                pDescription: { required },
                pPrice: { required },
                pQuantity: { required },
                pCategory: {
                    required, name_validation: {
                        $validator: validName,
                        $message: 'Product Category is required!'
                    }
                }
            },
        }
    },

    methods: {
        returnIdSelectCateg(value) {
            let selectedValue = this.listCategories.map(response => {
                return value === response.name ? response.id : undefined;
            })
            this.selectedCategory = selectedValue[0];
        },
        addNewProduct() {
            this.bool = true;
            this.form.pCategory = this.selectedCategory;
            addNewProduct({
                name: this.form.pName,
                description: this.form.pDescription,
                price: this.form.pPrice,
                quantity: this.form.pQuantity,
                category_id: this.form.pCategory

            }).then(() => {
                this.bool = false;
                Swal.fire("Item Added!", "An item was successfully Added!", "success")
            });
        }
    }
}
</script>

<style setup>
.container {
    width: 100%;
    animation: fadeInAnimation ease 0.3s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
}

@keyframes fadeInAnimation {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

.inputFormAdd {
    border-radius: 10px;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    padding: 40px;
    width: 80%;
    box-shadow: 0 2px 4px 2px rgba(63, 63, 63, 0.2);
    transition: ease 0.3s;
}

.inputFormAdd:hover {
    box-shadow: 0 2px 4px 0 rgba(63, 63, 63, 0.2);
}

.inputFormAdd:hover input {
    box-shadow: 0 3px 6px 0 rgba(63, 63, 63, 0.2);
}

.inputFormAdd:hover .select-add {
    box-shadow: 0 3px 6px 0 rgba(63, 63, 63, 0.2);
}

.input,
.select-add {
    padding: 10px;
    padding-left: 30px;
    outline: none;
    box-shadow: 0 2px 4px 0 rgba(63, 63, 63, 0.2);
}

.button {
    width: 98%;
    padding: 15px;
    border-radius: 50px;
    outline: none;
    border: 1px solid rgb(138, 138, 138);
    background-color: rgb(97, 97, 255);
    color: white;
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0;
}

.button:hover {
    background-color: rgb(77, 77, 203);
}

* {
    box-sizing: border-box;
}

/* Create two equal columns that floats next to each other */
.column {
    float: left;
    width: 100%;
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

p.error-msg {
    color: rgb(255, 74, 74);
    margin: 0;
    text-align: left;
    padding-left: 30px;
}
</style>