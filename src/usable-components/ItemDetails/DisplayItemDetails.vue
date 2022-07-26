<template>

    <div class="w3-container">

        <div id="id01" class="w3-modal">
            <div class="w3-modal-content w3-animate-top w3-card-4">
                <header class="w3-container">
                    <span onclick="document.getElementById('id01').style.display='none'"
                        class="w3-button w3-display-topright">&times;</span>
                </header>
                <div class="w3-card-4 inputForm">
                    <div class="row">
                        <div class="column">
                            <input placeholder="Product Name" type="text" id="name" name="name" :value="userData.name">
                        </div>
                        <div class="column">
                            <input placeholder="Product Description" type="text" id="desc" name="desc" :value="userData.description">
                        </div>
                    </div>

                    <div class="row">
                        <div class="column">
                            <input placeholder="Product Price" type="number" id="price" name="price" :value="userData.price">
                        </div>
                        <div class="column">
                            <input placeholder="Quantity" type="number" id="Quantity" name="Quantity" :value="userData.quantity">
                        </div>
                    </div>

                    <div class="row">
                        <input placeholder="Category" style="width: 95%;" type="text" id="category" name="category" :value="userData.category">
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

    created: function() {
        console.log(this.userData);
    }
}
</script>

<style>
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