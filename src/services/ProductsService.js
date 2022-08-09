const axios = require('axios');
const route = "http://localhost:8000/api/product";
const categoryRoute = "http://localhost:8000/api/category"

export async function getAllProducts() {
    const response = await axios.get(route);
    return response.data;
}

export async function addNewProduct(allData) {
    const response = await axios.post(route, allData);
    return response.data;
}

export async function deleteSelectedFunction(itemId) {
    const response = await axios.delete(route + itemId);
    return response.data;
}

export async function updateSelectedFunction(item) {
    const response = await axios.put(route + '/' + item.id, item);
    return response.data;
}

export async function getSelectedItem(itemId) {
    const response = await axios.get(route + '/' + itemId);
    return response.data;
}

export async function returnAllCategories() {
    const response = await axios.get(categoryRoute);
    return response.data;
}

export async function addNewCategory(data) {
    const response = await axios.post(categoryRoute, data)
    return response.data;
}