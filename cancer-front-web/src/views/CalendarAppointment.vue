<template>
  <v-container>
    <!-- FullCalendar -->
    <FullCalendar :options="calendarOptions" :key="calendarKey" />
    
    <div
      class="modal fade"
      id="exampleModal6"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      data-bs-backdrop="false"
      data-bs-keyboard="false"
      style="z-index: 1055 !important;"
    >
      <div class="modal-dialog modal-lg" style="z-index: 1055;">
        <div class="modal-content">
          <div class="modal-header" style="background-color: #90eeb7">
            <h1 class="modal-title fs-5" id="exampleModalLabel" style="color: #1c2939">
              <b>กำหนดนัดหมายใหม่</b>
            </h1>
          </div>
          <div class="modal-body">
            <div class="mb-3 row">
              <strong>หมอ: {{ selectedDoctorName }}</strong>
              <ul>
                <li v-for="patient in selectedPatientList" :key="patient.id">{{ patient.firstName }} {{ patient.lastName }}</li>
              </ul>
            </div>
            <div class="mb-3 row">
              <label for="exampleFormControlInput1" class="col-sm-4 form-label">
                เลือกวันที่นัดหมาย
              </label>
              <div class="col-sm-8">
                <VueDatePicker
                  v-model="date"
                  :enable-time-picker="false"
                  placeholder="กรุณาระบุวัน"
                  selectText="เลือก"
                  cancelText="ยกเลิก"
                  :locale="'th'"
                  lang="th"
                  format="dd/MM/yyyy"
                  :min-date="new Date()"
                  :disabled-week-days="[6, 0]"
                />
              </div>
            </div>
            <div class="mb-3 row">
              <label for="exampleFormControlInput1" class="col-sm-4 form-label">
                เลือกเวลาที่นัดหมาย
              </label>
              <div class="col-sm-8">
                <VueDatePicker
                  v-model="time"
                  time-picker
                  placeholder="กรุณาระบุเวลา"
                  selectText="เลือก"
                  cancelText="ยกเลิก"
                >
                  <template #input-icon>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-clock input-slot-image"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"
                      />
                      <path
                        d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0"
                      />
                    </svg>
                  </template>
                </VueDatePicker>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">
              ยกเลิก
            </button>
            <button type="button" class="btn btn-success" data-bs-dismiss="modal" @click="addAppoint">
              ตกลง
            </button>
          </div>
        </div>
      </div>
    </div>

  </v-container>
</template>

<script>
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listGridPlugin from "@fullcalendar/list";
import axios from 'axios';

export default {
  components: {
    FullCalendar,
  },
  data() {
    return {
      patientList: [],
      doctorName: '',
      selectedPatient: null,
      selectedDoctorName: '',
      selectedPatientList: [],
      // FullCalendar options
      calendarOptions: {
        plugins: [
          dayGridPlugin,
          interactionPlugin,
          timeGridPlugin,
          listGridPlugin,
        ],
        initialView: "listWeek", // ใช้ listWeek เพื่อให้แสดงเป็นรายการ
        headerToolbar: {
          left: "prev,next today",
          center: "title",
          right: "listWeek,dayGridMonth,timeGridWeek,timeGridDay",
        },
        events: [],  // จะถูกกรอกใน mounted
        locale: "th",
        eventContent: (eventInfo) => {
          const doctorName = eventInfo.event.extendedProps.doctorName;
          const patients = eventInfo.event.extendedProps.patients;

          const patientList = patients
            ? patients.map(patient => `<li>${patient.firstName} ${patient.lastName}</li>`).join('')
            : '';

          return {
            html: `
              <button type="button" class="btn btn-link" data-bs-toggle="modal" data-bs-target="#exampleModal6" @click="openModal('${doctorName}', ${JSON.stringify(patients)})">
                <div style="padding: 10px; z-index: 100 !important;">
                  <strong>หมอ: ${doctorName}</strong>
                  <ul>${patientList}</ul>
                </div>
              </button>
            `,
          };
        },
        datesSet: this.onDatesSet
      },
      currentViewType: "listWeek",
    };
  },
  mounted() {
    this.fetchAppointments();
  },
  methods: {
    openModal(doctorName, patients) {
      console.log("firstfirstfirstfirst")
      this.selectedDoctorName = doctorName;
      this.selectedPatientList = patients;
    },

    async fetchAppointments() {
      try {
        const response = await axios.get("http://localhost:8080/getAppointment");
        const appointments = response.data;
        const groupedAppointments = this.groupAppointmentsByDateAndDoctor(appointments);
        this.calendarOptions.events = groupedAppointments.map(group => {
          return group.doctors.map(doctor => {
            return {
              title: `หมอ: ${doctor.doctorName}`,
              date: group.date,
              extendedProps: {
                doctorName: doctor.doctorName,
                date: group.date,
                patients: doctor.patients,
              },
            };
          });
        }).flat();
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    },

    groupAppointmentsByDateAndDoctor(appointments) {
      const groupedByDate = {};
      appointments.forEach(appointment => {
        const dateKey = appointment.appointDate ? appointment.appointDate.split("T")[0] : null;
        if (dateKey === null) {
          console.warn("Appointment without a valid date", appointment);
          return;
        }
        if (!groupedByDate[dateKey]) {
          groupedByDate[dateKey] = {
            date: dateKey,
            doctors: [],
          };
        }
        const doctorKey = `${appointment.doctorFirstName} ${appointment.doctorLastName}`;
        const doctorGroup = groupedByDate[dateKey].doctors.find(doctor => doctor.doctorName === doctorKey);
        if (!doctorGroup) {
          groupedByDate[dateKey].doctors.push({
            doctorName: doctorKey,
            patients: [{
              firstName: appointment.patientFirstName,
              lastName: appointment.patientLastName,
            }],
          });
        } else {
          doctorGroup.patients.push({
            firstName: appointment.patientFirstName,
            lastName: appointment.patientLastName,
          });
        }
      });
      return Object.values(groupedByDate);
    },
  },
};
</script>
