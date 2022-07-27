<template>
    <LoadingInitiator v-if="bool"></LoadingInitiator>
    <div class="container">
        <div class="inputFormAdd">
            <form @submit.prevent="addNewProduct">
                <div class="row">
                    <div class="column">
                        <div class="form-group">
                            <input placeholder="Product Name" type="text" id="name" name="pname"
                                v-model="v$.form.pName.$model">
                            <div class="pre-icon os-icon os-icon-user-male-circle"></div>
                            <!-- Error Message -->
                            <div class="input-errors" v-for="(error, index) of v$.form.pName.$errors" :key="index">
                                <p class="error-msg">{{ error.$message }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <input placeholder="Product Name" type="text" id="name" name="pname"
                            v-model="v$.form.pDescription.$model">
                        <div class="pre-icon os-icon os-icon-user-male-circle"></div>
                        <!-- Error Message -->
                        <div class="input-errors" v-for="(error, index) of v$.form.pDescription.$errors" :key="index">
                            <p class="error-msg">{{ error.$message }}</p>
                        </div>
                    </div>
                </div><br>

                <div class="row">
                    <div class="column">
                        <input placeholder="Product Name" type="text" id="name" name="pname"
                            v-model="v$.form.pPrice.$model">
                        <div class="pre-icon os-icon os-icon-user-male-circle"></div>
                        <!-- Error Message -->
                        <div class="input-errors" v-for="(error, index) of v$.form.pPrice.$errors" :key="index">
                            <p class="error-msg">{{ error.$message }}</p>
                        </div>
                    </div>
                    <div class="column">
                        <input placeholder="Product Name" type="text" id="name" name="pname"
                            v-model="v$.form.pQuantity.$model">
                        <div class="pre-icon os-icon os-icon-user-male-circle"></div>
                        <!-- Error Message -->
                        <div class="input-errors" v-for="(error, index) of v$.form.pQuantity.$errors" :key="index">
                            <p class="error-msg">{{ error.$message }}</p>
                        </div>
                    </div>
                </div> <br>

                <div class="row">
                    <input placeholder="Product Name" type="text" id="name" name="pname"
                        v-model="v$.form.pCategory.$model">
                    <div class="pre-icon os-icon os-icon-user-male-circle"></div>
                    <!-- Error Message -->
                    <div class="input-errors" v-for="(error, index) of v$.form.pCategory.$errors" :key="index">
                        <p class="error-msg">{{ error.$message }}</p>
                    </div>
                </div> <br>

                <button :disabled="v$.form.$invalid">Submit</button><br><br>
            </form>
        </div>
        <br>
    </div>
</template>        
<script>
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
            }
        }
    },

    validations() {
        return {
            form: {
                pName: {
                    required, name_validation: {
                        $validator: validName,
                        $message: 'Product Name is required!'
                    }
                },
                pDescription: {
                    required, name_validation: {
                        $validator: validName,
                        $message: 'Product Description is required!'
                    }
                },
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
        addNewProduct() {
            this.bool = true;
            addNewProduct({
                name: this.form.pName,
                description: this.form.pDescription,
                price: this.form.pPrice,
                quantity: this.form.pQuantity,
                category: this.form.pCategory

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
    background-color: rgba(240, 240, 240, 0.5);
    border-radius: 10px;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    padding: 40px;
    width: 80%;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

input {
    margin: 10px;
    width: 95%;
    padding: 10px;
    padding-left: 30px;
    border-radius: 50px;
    outline: none;
    border: 1px solid rgba(184, 184, 184, 0.3);
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
}

button {
    width: 98%;
    padding: 15px;
    border-radius: 50px;
    outline: none;
    border: 1px solid rgb(138, 138, 138);
    background-color: rgb(97, 97, 255);
    color: white;
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0;
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

p.error-msg {
    color: rgb(255, 74, 74);
    margin: 0;
    text-align: left;
    padding-left: 30px;
}
</style>