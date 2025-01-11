<template>
    <div>
      <h2>Dashboard</h2>
      <div class="con-chart">
        <Bar id="my-chart-id-1" :options="chartOptions1" :data="chartData1" />
        <Bar id="my-chart-id-2" :options="chartOptions2" :data="chartData2" />
      </div>
      <div class="line-chart-container">
        <Line :data="lineChartData" :options="lineChartOptions" />
        <Radar :data="radarData" :options="radarOptions" />
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import { Bar, Line, Radar } from "vue-chartjs";
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    RadialLinearScale,
    Filler,
  } from "chart.js";
  
  ChartJS.register(
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    RadialLinearScale,
    Filler
  );
  
  export default {
    name: "BarChart",
    components: { Bar, Line, Radar },
    data() {
      return {
        ageGroups: {}, // เก็บข้อมูลอายุผู้ป่วย
        cancerSummary: {}, // เก็บข้อมูลอายุผู้ป่วย
        chartData1: {
          labels: [
            "มะเร็งปอด",
            "มะเร็งกระเพาะอาหาร",
            "มะเร็งลำไส้ใหญ่",
            "มะเร็งตับ",
            "มะเร็งตับอ่อน",
            "มะเร็งต่อมไทรอยด์",
            "มะเร็งไต",
            "มะเร็งกระเพาะปัสสาวะ",
            "มะเร็งอัณฑะ",
            "มะเร็งต่อมลูกหมาก",
            "มะเร็งถุงน้ำดี",
            "มะเร็งมดลูก",
            "มะเร็งเต้านม",
            "มะเร็งรังไข่",
          ],
          datasets: [
            {
              label: "ผู้ป่วยชาย",
              backgroundColor: "rgba(54, 162, 235, 0.6)",
              data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            },
            {
              label: "ผู้ป่วยหญิง",
              backgroundColor: "rgba(255, 99, 132, 0.6)",
              data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            },
          ],
        },
        chartData2: {
          labels: ["0-18", "19-35", "36-50", "51-65", "65+"],
          datasets: [
            {
              label: "ผู้ป่วยชาย",
              backgroundColor: "rgba(75, 192, 192, 0.6)",
              data: [0, 0, 0, 0, 0], // Default values, will be updated after fetching data
            },
            {
              label: "ผู้ป่วยหญิง",
              backgroundColor: "rgba(153, 102, 255, 0.6)",
              data: [0, 0, 0, 0, 0], // Default values, will be updated after fetching data
            },
          ],
        },
        chartOptions1: {
          responsive: true,
          plugins: {
            legend: {
              position: "bottom",
            },
            title: {
              display: true,
              text: "กราฟแท่งแสดงจำนวนผู้ป่วยแยกตามชนิดมะเร็ง",
            },
          },
        },
        chartOptions2: {
          responsive: true,
          plugins: {
            legend: {
              position: "bottom",
            },
            title: {
              display: true,
              text: "กราฟแท่งแสดงจำนวนผู้ป่วยแยกตามกลุ่มอายุ",
            },
          },
        },
        lineChartData: {
          labels: [
            "เดือนที่ 1",
            "เดือนที่ 2",
            "เดือนที่ 3",
            "เดือนที่ 4",
            "เดือนที่ 5",
            "เดือนที่ 6",
            "เดือนที่ 7",
          ],
          datasets: [
            {
              label: "ระดับความรุนแรงเฉลี่ยของผู้ป่วยทั้งหมด",
              backgroundColor: "rgba(75,192,192,0.2)",
              borderColor: "rgba(75,192,192,1)",
              data: [1, 4, 5, 3, 2, 2, 1],
              fill: true,
            },
          ],
        },
        lineChartOptions: {
          responsive: true,
          plugins: {
            legend: {
              position: "bottom",
            },
            title: {
              display: true,
              text: "กราฟเส้นแสดงระดับความรุนแรงเฉลี่ยของผู้ป่วยทั้งหมด ของมะเร็งแต่ละชนิด",
            },
          },
        },
        radarData: {
          labels: [
            "ผมร่วง",
            "ใจสั่น",
            "ครั่นเนื้อครั่นตัว",
            "เหนื่อยง่าย",
            "วิงเวียนศีรษะ",
            "อาเจียน",
            "ผิวหนังสีเข้ม",
          ],
          datasets: [
            {
              label: "มะเร็งปอด",
              backgroundColor: "rgba(179,181,198,0.2)",
              borderColor: "rgba(179,181,198,1)",
              pointBackgroundColor: "rgba(179,181,198,1)",
              pointBorderColor: "#fff",
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: "rgba(179,181,198,1)",
              data: [65, 59, 90, 81, 56, 55, 40],
            },
            {
              label: "มะเร็งกระเพาะอาหาร",
              backgroundColor: "rgba(255,99,132,0.2)",
              borderColor: "rgba(255,99,132,1)",
              pointBackgroundColor: "rgba(255,99,132,1)",
              pointBorderColor: "#fff",
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: "rgba(255,99,132,1)",
              data: [28, 48, 40, 19, 96, 27, 100],
            },
            {
              label: "มะเร็งลำไส้ใหญ่",
              backgroundColor: "rgba(255,206,86,0.2)",
              borderColor: "rgba(255,206,86,1)",
              pointBackgroundColor: "rgba(255,206,86,1)",
              pointBorderColor: "#fff",
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: "rgba(255,99,132,1)",
              data: [28, 48, 40, 19, 96, 27, 100],
            },
            {
              label: "มะเร็งตับ",
              backgroundColor: "rgba(75,192,192,0.2)",
              borderColor: "rgba(75,192,192,1)",
              pointBackgroundColor: "rgba(75,192,192,1)",
              pointBorderColor: "#fff",
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: "rgba(255,99,132,1)",
              data: [28, 48, 40, 19, 96, 27, 100],
            },
            {
              label: "มะเร็งตับอ่อน",
              backgroundColor: "rgba(153,102,255,0.2)",
              borderColor: "rgba(153,102,255,1)",
              pointBackgroundColor: "rgba(153,102,255,1)",
              pointBorderColor: "#fff",
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: "rgba(255,99,132,1)",
              data: [28, 48, 40, 19, 96, 27, 100],
            },
            {
              label: "มะเร็งต่อมไทรอยด์",
              backgroundColor: "rgba(255,159,64,0.2)",
              borderColor: "rgba(255,159,64,1)",
              pointBackgroundColor: "rgba(255,159,64,1)",
              pointBorderColor: "#fff",
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: "rgba(255,99,132,1)",
              data: [28, 48, 40, 19, 96, 27, 100],
            },
            {
              label: "มะเร็งไต",
              backgroundColor: "rgba(255,255,102,0.2)",
              borderColor: "rgba(255,255,102,1)",
              pointBackgroundColor: "rgba(255,255,102,1)",
              pointBorderColor: "#fff",
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: "rgba(255,99,132,1)",
              data: [28, 48, 40, 19, 96, 27, 100],
            },
            {
              label: "มะเร็งกระเพาะปัสสาวะ",
              backgroundColor: "rgba(102,255,102,0.2)",
              borderColor: "rgba(102,255,102,1)",
              pointBackgroundColor: "rgba(102,255,102,1)",
              pointBorderColor: "#fff",
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: "rgba(255,99,132,1)",
              data: [28, 48, 40, 19, 96, 27, 100],
            },
            {
              label: "มะเร็งอัณฑะ",
              backgroundColor: "rgba(102,204,255,0.2)",
              borderColor: "rgba(102,204,255,1)",
              pointBackgroundColor: "rgba(102,204,255,1)",
              pointBorderColor: "#fff",
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: "rgba(255,99,132,1)",
              data: [28, 48, 40, 19, 96, 27, 100],
            },
            {
              label: "มะเร็งต่อมลูกหมาก",
              backgroundColor: "rgba(255,102,255,0.2)",
              borderColor: "rgba(255,102,255,1)",
              pointBackgroundColor: "rgba(255,102,255,1)",
              pointBorderColor: "#fff",
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: "rgba(255,99,132,1)",
              data: [28, 48, 40, 19, 96, 27, 100],
            },
            {
              label: "มะเร็งถุงน้ำดี",
              backgroundColor: "rgba(255,102,178,0.2)",
              borderColor: "rgba(255,102,178,1)",
              pointBackgroundColor: "rgba(255,102,178,1)",
              pointBorderColor: "#fff",
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: "rgba(255,99,132,1)",
              data: [28, 48, 40, 19, 96, 27, 100],
            },
            {
              label: "มะเร็งมดลูก",
              backgroundColor: "rgba(178,102,255,0.2)",
              borderColor: "rgba(178,102,255,1)",
              pointBackgroundColor: "rgba(178,102,255,1)",
              pointBorderColor: "#fff",
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: "rgba(255,99,132,1)",
              data: [28, 48, 40, 19, 96, 27, 100],
            },
            {
              label: "มะเร็งเต้านม",
              backgroundColor: "rgba(102,178,255,0.2)",
              borderColor: "rgba(102,178,255,1)",
              pointBackgroundColor: "rgba(102,178,255,1)",
              pointBorderColor: "#fff",
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: "rgba(255,99,132,1)",
              data: [28, 48, 40, 19, 96, 27, 100],
            },
            {
              label: "มะเร็งรังไข่",
              backgroundColor: "rgba(102,255,178,0.2)",
              borderColor: "rgba(102,255,178,1)",
              pointBackgroundColor: "rgba(102,255,178,1)",
              pointBorderColor: "#fff",
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: "rgba(255,99,132,1)",
              data: [28, 48, 40, 19, 96, 27, 100],
            },
          ],
        },
        radarOptions: {
          responsive: true,
          maintainAspectRatio: false,
        },
      };
    },
    methods: {
        async fetchAgeGroups() {
        try {
        const response = await axios.get("http://localhost:8080/age-groups");
        this.ageGroups = response.data;

        console.log(this.ageGroups); // ตรวจสอบข้อมูลใน console
        
        // สร้างข้อมูลใหม่ให้กับ chartData2
        this.chartData2 = {
          labels: ["0-18", "19-35", "36-50", "51-65", "65+"],
          datasets: [
            {
              label: "ผู้ป่วยชาย",
              backgroundColor: "rgba(75, 192, 192, 0.6)",
              data: [
                this.ageGroups["0-18Male"] || 0,
                this.ageGroups["19-35Male"] || 0,
                this.ageGroups["36-50Male"] || 0,
                this.ageGroups["51-65Male"] || 0,
                this.ageGroups["65+Male"] || 0,
              ],
            },
            {
              label: "ผู้ป่วยหญิง",
              backgroundColor: "rgba(153, 102, 255, 0.6)",
              data: [
                this.ageGroups["0-18Female"] || 0,
                this.ageGroups["19-35Female"] || 0,
                this.ageGroups["36-50Female"] || 0,
                this.ageGroups["51-65Female"] || 0,
                this.ageGroups["65+Female"] || 0,
              ],
            },
          ],
        };
      } catch (error) {
        console.error("Error fetching age groups:", error);
      }
    },
    async fetchCancerData() {
        try {
        const response = await axios.get("http://localhost:8080/cancer-summary");
        this.cancerSummary = response.data;

        console.log(this.cancerSummary); // ตรวจสอบข้อมูลใน console
        
        // สร้างข้อมูลใหม่ให้กับ chartData2
        this.chartData1 = {
          labels: [
            "มะเร็งปอด",
            "มะเร็งกระเพาะอาหาร",
            "มะเร็งลำไส้ใหญ่",
            "มะเร็งตับ",
            "มะเร็งตับอ่อน",
            "มะเร็งต่อมไทรอยด์",
            "มะเร็งไต",
            "มะเร็งกระเพาะปัสสาวะ",
            "มะเร็งอัณฑะ",
            "มะเร็งต่อมลูกหมาก",
            "มะเร็งถุงน้ำดี",
            "มะเร็งมดลูก",
            "มะเร็งเต้านม",
            "มะเร็งรังไข่",
          ],
          datasets: [
            {
              label: "ผู้ป่วยชาย",
              backgroundColor: "rgba(75, 192, 192, 0.6)",
              data: [
                this.cancerSummary["มะเร็งปอด ชาย"] || 0,
                this.cancerSummary["มะเร็งกระเพาะอาหาร ชาย"] || 0,
                this.cancerSummary["มะเร็งลำไส้ใหญ่ ชาย"] || 0,
                this.cancerSummary["มะเร็งตับ ชาย"] || 0,
                this.cancerSummary["มะเร็งตับอ่อน ชาย"] || 0,
                this.cancerSummary["มะเร็งต่อมไทรอยด์ ชาย"] || 0,
                this.cancerSummary["มะเร็งไต ชาย"] || 0,
                this.cancerSummary["มะเร็งกระเพาะปัสสาวะ ชาย"] || 0,
                this.cancerSummary["มะเร็งอัณฑะ ชาย"] || 0,
                this.cancerSummary["มะเร็งต่อมลูกหมาก ชาย"] || 0,
                this.cancerSummary["มะเร็งถุงน้ำดี ชาย"] || 0,
                this.cancerSummary["มะเร็งมดลูก ชาย"] || 0,
                this.cancerSummary["มะเร็งเต้านม ชาย"] || 0,
                this.cancerSummary["มะเร็งรังไข่ ชาย"] || 0,
              ],
            },
            {
              label: "ผู้ป่วยหญิง",
              backgroundColor: "rgba(153, 102, 255, 0.6)",
              data: [
              this.cancerSummary["มะเร็งปอด หญิง"] || 0,
                this.cancerSummary["มะเร็งกระเพาะอาหาร หญิง"] || 0,
                this.cancerSummary["มะเร็งลำไส้ใหญ่ หญิง"] || 0,
                this.cancerSummary["มะเร็งตับ หญิง"] || 0,
                this.cancerSummary["มะเร็งตับอ่อน หญิง"] || 0,
                this.cancerSummary["มะเร็งต่อมไทรอยด์ หญิง"] || 0,
                this.cancerSummary["มะเร็งไต หญิง"] || 0,
                this.cancerSummary["มะเร็งกระเพาะปัสสาวะ หญิง"] || 0,
                this.cancerSummary["มะเร็งอัณฑะ หญิง"] || 0,
                this.cancerSummary["มะเร็งต่อมลูกหมาก หญิง"] || 0,
                this.cancerSummary["มะเร็งถุงน้ำดี หญิง"] || 0,
                this.cancerSummary["มะเร็งมดลูก หญิง"] || 0,
                this.cancerSummary["มะเร็งเต้านม หญิง"] || 0,
                this.cancerSummary["มะเร็งรังไข่ หญิง"] || 0,
              ],
            },
          ],
        };
      } catch (error) {
        console.error("Error fetching cancerSummary", error);
      }
    },
    },
    created() {
      this.fetchAgeGroups(); // เรียกใช้ฟังก์ชันเมื่อ component ถูกสร้าง
      this.fetchCancerData(); //chart1
    },
  };
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
  
  .line-chart-container {
    margin-top: 30px;
    display: flex;
    justify-content: center;
    width: 100%;
  }
  
  h2 {
    text-align: center;
    margin: 20px 0;
  }
  </style>
  