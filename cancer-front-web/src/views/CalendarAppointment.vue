<template>
  <div class="p-4">
    <FullCalendar :options="calendarOptions" />
  </div>
</template>
<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import listGridPlugin from '@fullcalendar/list'
export default {
  components: {
    FullCalendar,
  },
  data() {
    return {
      calendarOptions: {
        plugins: [ 
          dayGridPlugin, 
          interactionPlugin, 
          timeGridPlugin,
          listGridPlugin
        ],
        initialView: 'dayGridMonth',
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        },
        events: [
          {
            title: 'Conference',
            start: '2024-12-01T10:30:00',
            end: '2024-12-01T12:30:00',
          },
          {
            title: 'Conference2',
            start: '2024-12-01T16:00:00',
            end: '2024-12-01T17:30:00',
          },
          {
            title: 'Project deadline',
            start: '2024-12-02T12:30:00',
            end: '2024-12-02T15:30:00',
          },
        ],
        locale: 'th',
      }
    }
  }
}
</script>