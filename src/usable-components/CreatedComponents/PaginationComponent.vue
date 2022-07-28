<template>
    <div class="row">
        <div class="column">
            <div class="paginationSelect">
                <select @change="changeParameterChoose($event.target.value)">
                    <option disabled>Please select one</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                </select>
                <p>Showing 1 - {{ selected }} out of {{ results }} results</p>
            </div>
        </div>
        <div class="column">
            <div class="w3-right pagination">
                <div class="w3-bar w3-border">
                    <a class="w3-bar-item w3-button">&laquo;</a>
                    <a v-for="(count, index) in this.dataResult" :key="count" class="w3-bar-item w3-button" @click="changeTableData(index)">{{ index + 1
                    }}</a>
                    <a class="w3-bar-item w3-button">&raquo;</a>
                </div>
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

select {
    outline: none;
}

a {
    cursor: pointer;
}
</style>