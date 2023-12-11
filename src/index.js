import Calendar from "./components/calendar.vue";
import CalendarMonth from "./components/CalendarMonth.vue";
import fullCalendar from "./components/fullCalendar.vue";

const component = [Calendar, CalendarMonth, fullCalendar]

const comp = {
    install(app) {
        component.forEach(i => {
            app.component(i.name, Calendar)
        })
    }
}

export default comp
