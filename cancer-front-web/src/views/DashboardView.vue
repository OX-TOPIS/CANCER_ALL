<template>
    <div>
      <!-- หัวข้อ -->
      <h2>ข้อมูลสถิติของผู้ป่วยโรงพยาบาลมะเร็งชลบุรี</h2>

      <!-- Filter -->
      <div class="d-flex">



        <!-- GENDER -->
        <div>
          <label for="">เพศของผู้ป่วย</label>
          <div class="dropdown">
            <button
              class="btn btn-primary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style="background-color: #0A6B3A; color: white;"
            >
              เพศของผู้ป่วย
            </button>
            <ul class="dropdown-menu">
              <li v-for="gender in genders" :key="gender.value">
                <label class="dropdown-item">
                  <input
                    type="checkbox"
                    :value="gender.value"
                    v-model="showGender"
                  />
                  {{ gender.label }}
                </label>
              </li>
            </ul>
            <div class="mt-3">
              <strong>เพศที่เลือก:</strong> {{ selectedGenders }}
            </div>
          </div>
        </div>
        <!-- CANCER TYPE -->
        <div>
        <label for="">ประเภทมะเร็ง</label>
        <div class="dropdown">
          <button
            class="btn btn-primary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style="background-color: #0A6B3A; color: white;"
          >
            ประเภทมะเร็ง
          </button>
          <ul class="dropdown-menu">
            <li v-for="cancer in cancers" :key="cancer.value" >
              <label class="dropdown-item">
                <input
                  type="checkbox"
                  :value="cancer.value"
                  v-model="showCancer"
                />
                {{ cancer.label }}
              </label>
            </li>
          </ul>
          <div class="mt-3">
            <strong>ประเภทมะเร็งที่เลือก:</strong> {{ selectedCancers }}
          </div>
        </div>
      </div>
      <!-- RANGE AGE -->
      <div>
        <label for="">ช่วงอายุ</label>
        <div class="dropdown">
          <button
            class="btn btn-primary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style="background-color: #0A6B3A; color: white;"
          >
            ช่วงอายุ
          </button>
          <ul class="dropdown-menu">
            <li v-for="rangeage in rangeages" :key="rangeage.value" >
              <label class="dropdown-item">
                <input
                  type="checkbox"
                  :value="rangeage.value"
                  v-model="showRangeage"
                />
                {{ rangeage.label }}
              </label>
            </li>
          </ul>
          <div class="mt-3">
            <strong>ช่วงอายุที่เลือก:</strong> {{ selectedRangeages }}
          </div>
        </div>
      </div>
      <!-- CANCER STATE -->
      <div>
        <label for=""> ระยะของมะเร็ง</label>
        <div class="dropdown">
          <button
            class="btn btn-primary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style="background-color: #0A6B3A; color: white;"
          >
            ระยะของมะเร็ง
          </button>
          <ul class="dropdown-menu">
            <li v-for="cancerstate in cancerstates" :key="cancerstate.value" >
              <label class="dropdown-item">
                <input
                  type="checkbox"
                  :value="cancerstate.value"
                  v-model="showCancerstate"
                />
                {{ cancerstate.label }}
              </label>
            </li>
          </ul>
          <div class="mt-3">
            <strong>ช่วงอายุที่เลือก:</strong> {{ selectedCancerstates }}
          </div>
        </div>
      </div>
      <!-- FEEDBACK -->
      <div>
        <label for=""> ผลข้างเคียง</label>
        <div class="dropdown">
          <button
            class="btn btn-primary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style="background-color: #0A6B3A; color: white;"
          >
          ผลข้างเคียง
          </button>
          <ul class="dropdown-menu">
            <li v-for="feedback in feedbacks" :key="feedback.value" >
              <label class="dropdown-item">
                <input
                  type="checkbox"
                  :value="feedback.value"
                  v-model="showFeedback"
                />
                {{ feedback.label }}
              </label>
            </li>
          </ul>
          <div class="mt-3">
            <strong>ผลข้างเคียง:</strong> {{ selectedFeedbacks }}
          </div>
        </div>
      </div>
      <!-- DISEASE -->
      <div>
        <label for="">โรคประจำตัว</label>
        <div class="dropdown">
          <button
            class="btn btn-primary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            style="background-color: #0A6B3A; color: white;"
          >
          โรคประจำตัว
          </button>
          <ul class="dropdown-menu">
            <li v-for="disease in diseases" :key="disease.value" >
              <label class="dropdown-item">
                <input
                  type="checkbox"
                  :value="disease.value"
                  v-model="showDisease"
                />
                {{ disease.label }}
              </label>
            </li>
          </ul>
          <div class="mt-3">
            <strong>โรคประจำตัว:</strong> {{ selectedDiseases }}
          </div>
        </div>
      </div>

      </div>
      <!--END Filter -->




      <!-- กราฟ -->
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
        // เพิ่มมาตอนทำ Filter
        genders: [
          { label: "เพศชาย", value: "male" },
          { label: "เพศหญิง", value: "female" },
        ],
        showGender: [],
        cancers: [
        { label: "มะเร็งปอด", value: "มะเร็งปอด" },
        { label: "มะเร็งกระเพาะอาหาร", value: "มะเร็งกระเพาะอาหาร" },
        { label: "มะเร็งลำไส้ใหญ่", value: "มะเร็งลำไส้ใหญ่" },
        { label: "มะเร็งตับ", value: "มะเร็งตับ" },
        { label: "มะเร็งตับอ่อน", value: "มะเร็งตับอ่อน" },
        { label: "มะเร็งต่อมไทรอยด์", value: "มะเร็งต่อมไทรอยด์" },
        { label: "มะเร็งไต", value: "มะเร็งไต" },
        { label: "มะเร็งกระเพาะปัสสาวะ", value: "มะเร็งกระเพาะปัสสาวะ" },
        { label: "มะเร็งอัณฑะ", value: "มะเร็งอัณฑะ" },
        { label: "มะเร็งต่อมลูกหมาก", value: "มะเร็งต่อมลูกหมาก" },
        { label: "มะเร็งถุงน้ำดี", value: "มะเร็งถุงน้ำดี" },
        { label: "มะเร็งมดลูก", value: "มะเร็งมดลูก" },
        { label: "มะเร็งเต้านม", value: "มะเร็งเต้านม" },
        { label: "มะเร็งรังไข่", value: "มะเร็งรังไข่" },
        ],
        showCancer: ["มะเร็งปอด", "มะเร็งกระเพาะอาหาร"],
        rangeages: [
          { label: "อายุ 1-10", value: "อายุ 1-10" },
          { label: "อายุ 2-20", value: "อายุ 2-20" },
        ],
        showRangeage: [],
        cancerstates: [
          { label: "cancerstate 1", value: "cancerstate 1" },
          { label: "cancerstate 2", value: "cancerstate 2" },
        ],
        showCancerstate: [],
        feedbacks: [
          { label: "feedbacks 1", value: "feedbacks 1" },
          { label: "feedbacks 2", value: "feedbacks 2" },
        ],
        showFeedback: [],
        diseases: [
          { label: "diseases 1", value: "diseases 1" },
          { label: "diseases 2", value: "diseases 2" },
        ],
        showDisease: [],
        // END เพิ่มมาตอนทำ Filter

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
              text: "กราฟเส้นแสดงระดับความรุนแรงเฉลี่ยของผู้ป่วยทั้งหมดของมะเร็งแต่ละชนิด",
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
        
      } catch (error) {
        console.error("Error fetching cancerSummary", error);
      }
    },
    },
    created() {
      this.fetchAgeGroups(); // เรียกใช้ฟังก์ชันเมื่อ component ถูกสร้าง
      this.fetchCancerData(); //chart1
    },
    computed: {
      // แปลงค่าที่เลือก (showGender) กลับมาเป็นชื่อภาษาไทย
      selectedGenders() {
        return this.genders
          .filter((gender) => this.showGender.includes(gender.value))
          .map((gender) => gender.value);
      },
      selectedCancers() {
        return this.cancers
          .filter((cancer) => this.showCancer.includes(cancer.value))
          .map((cancer) => cancer.value);
      },
      selectedRangeages() {
        return this.rangeages
          .filter((rangeage) => this.showRangeage.includes(rangeage.value))
          .map((rangeage) => rangeage.value);
      },
      selectedCancerstates() {
        return this.cancerstates
          .filter((cancerstate) => this.showCancerstate.includes(cancerstate.value))
          .map((cancerstate) => cancerstate.value);
      },
      selectedFeedbacks() {
        return this.feedbacks
          .filter((feedback) => this.showFeedback.includes(feedback.value))
          .map((feedback) => feedback.value);
      },
      selectedDiseases() {
        return this.diseases
          .filter((disease) => this.showDisease.includes(disease.value))
          .map((disease) => disease.value);
      },
      chartData1() {
      // สร้างข้อมูลกราฟใหม่ตาม selectedCancers
      return {
        labels: this.selectedCancers,
        datasets: [
          {
            label: "ผู้ป่วยชาย",
            backgroundColor: "rgba(75, 192, 192, 0.6)",
            data: this.selectedCancers.map(
              (label) => this.cancerSummary[`${label} ชาย`] || 0
            ),
          },
          {
            label: "ผู้ป่วยหญิง",
            backgroundColor: "rgba(153, 102, 255, 0.6)",
            data: this.selectedCancers.map(
              (label) => this.cancerSummary[`${label} หญิง`] || 0
            ),
          },
        ],
      };
    },
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
  