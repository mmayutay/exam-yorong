<template>
    <div class="row">
        <div class="column">
            <div class="card">
                <Bar :chart-options="chartOptions" :chart-data="chartData" :chart-id="chartId"
                    :dataset-id-key="datasetIdKey" :plugins="plugins" :css-classes="cssClasses" :styles="styles"
                    :width="width" :height="height" />
            </div>
        </div>
        <div class="column2">
            <div class="card">
                <div class="container">
                    <br><br><br>
                    <h4><b>12</b></h4>
                    <p>Newly Added Product</p>
                    <br>
                    <h4><b>15</b></h4>
                    <p>Current Product</p>
                    <br><br><br>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
    name: 'BarChart',
    components: { Bar },
    props: {
        chartId: {
            type: String,
            default: 'bar-chart'
        },
        datasetIdKey: {
            type: String,
            default: 'label'
        },
        width: {
            type: Number,
            default: 200
        },
        height: {
            type: Number,
            default: 100
        },
        cssClasses: {
            default: '',
            type: String
        },
        styles: {
            type: Object,
            default: () => { }
        },
        plugins: {
            type: Object,
            default: () => { }
        }
    },
    data() {
        return {
            chartData: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [{ data: [40, 39, 10, 40, 39, 80, 40] }]
            },
            chartOptions: {
                responsive: true
            }
        }
    }
}

</script>

<style scoped>
* {
    box-sizing: border-box;
}

/* Create two equal columns that floats next to each other */
.column {
    float: left;
    width: 60%;
    padding: 10px;
    animation: fadeInAnimation ease 0.4s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
}

.column2 {
    float: left;
    width: 40%;
    padding: 10px;
    animation: fadeInAnimation ease 0.8s;
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

/* Clear floats after the columns */
.row:after {
    content: "";
    display: table;
    clear: both;
}

.card {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
}

.card:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

.container {
    padding: 2px 16px;
    text-align: center;
}
</style>