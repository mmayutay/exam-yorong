const axios = require('axios');
const route = "http://localhost:8000/api/";

export async function getAllProducts() {
    const response = await axios.get(route + 'return-list-products');
    return response.data;
}

export async function addNewProduct(allData) {
    const response = await axios.post(route + 'product/add', allData);
    return response.data;
}

export async function deleteSelectedFunction(itemId) {
    const response = await axios.get(route + 'product/delete/' + itemId);
    return response.data;
}

export async function updateSelectedFunction(item) {
    const response = await axios.post(route + 'product/update', item);
    return response.data;
}

export async function getSelectedItem(itemId) {
    const response = await axios.get(route + 'product/get-selected-item/' + itemId);
    return response.data;
}

export async function returnAllCategories() {
    const response = await axios.get(route + 'return-all-categories');
    return response.data;
}