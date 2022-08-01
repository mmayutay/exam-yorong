<template>
    <div class="paginationRow">
        <div class="paginationColumn">
            <div class="paginationSelect select">
                <select
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 select"
                    @change="changeParameterChoose($event.target.value)">
                    <option disabled>Please select one</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                </select>
                <p>Showing 1 - {{ selected }} out of {{ results }} results</p>
            </div>
        </div>
        <div class="paginationColumn">
            <div class="w3-right pagination">
                <nav aria-label="Page navigation example">
                    <ul class="inline-flex items-center -space-x-px">
                        <li>
                            <a href="#"
                                class="block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                <span class="sr-only">Previous</span>
                                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                        clip-rule="evenodd"></path>
                                </svg>
                            </a>
                        </li>
                        <li>
                            <a href="#" v-for="(count, index) in this.dataResult" :key="count"
                             class="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                             @click="changeTableData(index)">{{ index + 1 }}</a>
                        </li>
                        <li>
                            <a href="#"
                                class="block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                                <span class="sr-only">Next</span>
                                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        clip-rule="evenodd"></path>
                                </svg>
                            </a>
                        </li>
                    </ul>
                </nav>
                <!-- <div class="w3-bar w3-border">
                    <a class="w3-bar-item w3-button">&laquo;</a>
                    <a v-for="(count, index) in this.dataResult" :key="count" class="w3-bar-item w3-button" @click="changeTableData(index)">{{ index + 1
                    }}</a>
                    <a class="w3-bar-item w3-button">&raquo;</a> -->
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import { getAllProducts } from '../../services/ProductsService.js';

export default defineComponent({
    emits: ['dataToPass', 'index'],
    data() {
        return {
            results: 0,
            dataResult: [],
            selected: 5
        }
    },
    mounted() {
        this.dataFetcher(5);
    },
    methods: {
        changeParameterChoose(selected) {
            this.selected = selected;
            this.dataFetcher(Number(selected))
        },
        // This method is for the behaviour of the pagination
        checkDivide(result, toDisplay) {
            this.dataResult = [];
            let partialHandler = []
            for (let index = 0; index < result.length; index++) {
                partialHandler.push(result[index]);
                if (partialHandler.length != toDisplay) {
                    if (result[result.length - 1] == partialHandler[partialHandler.length - 1]) {
                        this.dataResult.push(partialHandler);
                    }
                } else {
                    this.dataResult.push(partialHandler);
                    partialHandler = [];
                }
            }
            this.$emit('dataToPass', this.dataResult);
        },
        dataFetcher(num) {
            getAllProducts().then(response => {
                this.results = response.length;
                this.checkDivide(response, num);
            })
        },
        changeTableData(index) {
            this.$emit('index', index);
        }
    }
})

</script>

<style lang="css">
/* Create two equal columns that floats next to each other */
.paginationColumn {
    float: left;
    width: 50%;
    padding: 10px;
    height: 300px;
    /* Should be removed. Only for demonstration */
}

/* Clear floats after the columns */
.paginationRow:after {
    content: "";
    display: table;
}

.select {
    margin-top: 0;
    outline: none;
    width: 50%;
}

a {
    cursor: pointer;
}
</style>