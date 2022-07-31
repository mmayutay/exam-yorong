<template>

    <div class="w3-container">

        <div id="id01" class="w3-modal">
            <div style="border-radius: 10px;" class="w3-modal-content w3-animate-top w3-card-4">
                <header class="w3-container">
                    <span onclick="document.getElementById('id01').style.display='none'"
                        class="w3-button w3-display-topright">&times;</span>
                </header>
                <div class="w3-card-4 inputForm">
                    <h1>{{ userData.name }}</h1>
                    <div class="row">
                        <label for="desc">Description</label>
                        <input disabled placeholder="Product Description" type="text" id="desc" name="desc"
                            :value="userData.description">
                    </div>

                    <div class="row">
                        <div class="column">
                            <label for="price">Price</label>
                            <input disabled placeholder="Product Price" type="number" id="price" name="price"
                                :value="userData.price">
                        </div>
                        <div class="column">
                            <label for="quantity">Quantity</label>
                            <input disabled placeholder="Quantity" type="number" id="Quantity" name="quantity"
                                :value="userData.quantity">
                        </div>
                    </div>

                    <div class="row">
                        <label for="category">Total Product Amount</label>
                        <input disabled placeholder="Total Product Amount" style="width: 95%;" type="text" id="amount"
                            name="category" :value="(userData.quantity * userData.price)">
                    </div>

                    <div class="row">
                        <label for="category">Category</label>
                        <input disabled placeholder="Category" style="width: 95%;" type="text" id="category"
                            name="category" :value="userData.category?.name">
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>

// import { getSelectedData } from './partialStorage';

export default {
    props: ['userData'],
}
</script>

<style>
h1 {
    text-transform: uppercase;
    text-align: center;
}

.container {
    width: 100%;
}

.inputForm {
    background-color: rgba(240, 240, 240, 0.5);
    border-radius: 10px;
    margin-left: auto;
    margin-right: auto;
    padding: 40px;
    width: 100%;
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

label {
    padding-left: 30px;
    color: rgb(172, 172, 172);
}

button {
    width: 95%;
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
</style>