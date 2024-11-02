<template>
    <div>
        <h2>Dashboard</h2>
        <div class="con-chart">
            <Bar
                id="my-chart-id-1"
                :options="chartOptions1"
                :data="chartData1"
            />
            <Bar
                id="my-chart-id-2"
                :options="chartOptions2"
                :data="chartData2"
            />
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
    data() {
        return {
            chartData1: {
                labels: ['มะเร็งกระเพาะอาหาร', 'มะเร็งตับ', 'มะเร็งลำไส้', 'มะเร็งปอด', 'มะเร็งไต'],
                datasets: [
                    {
                        label: 'ผู้ป่วยชาย',
                        backgroundColor: 'rgba(54, 162, 235, 0.6)',
                        data: [30, 40, 35, 20, 10]
                    },
                    {
                        label: 'ผู้ป่วยหญิง',
                        backgroundColor: 'rgba(255, 99, 132, 0.6)',
                        data: [25, 35, 30, 15, 5]
                    }
                ]
            },
            chartData2: {
                labels: ['0-18', '19-35', '36-50', '51-65', '65+'],
                datasets: [
                    {
                        label: 'ผู้ป่วยชาย',
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        data: [15, 30, 25, 10, 5]
                    },
                    {
                        label: 'ผู้ป่วยหญิง',
                        backgroundColor: 'rgba(153, 102, 255, 0.6)',
                        data: [20, 25, 20, 10, 3]
                    }
                ]
            },
            chartOptions1: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                    title: {
                        display: true,
                        text: 'กราฟแท่งแสดงจำนวนผู้ป่วยแยกตามชนิดมะเร็ง'
                    }
                }
            },
            chartOptions2: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                    title: {
                        display: true,
                        text: 'กราฟแท่งแสดงจำนวนผู้ป่วยแยกตามกลุ่มอายุ'
                    }
                }
            }
        }
    }
}
</script>

<style scoped>
canvas {
    max-width: 45%;
    height: 400px !important;
}

.con-chart {
    display: flex;
    gap: 20px;
    justify-content: center;
}

h2 {
    text-align: center;
    margin: 20px 0;
}
</style>
