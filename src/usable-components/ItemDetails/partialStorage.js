var partialStorage = [];


export function storeSelectedData(data) {
    partialStorage = data;
}

export function getSelectedData() {
    return partialStorage;
}