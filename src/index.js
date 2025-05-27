import Calendar from "./components/calendar.vue";
import CalendarMonth from "./components/CalendarMonth.vue";
import fullCalendar from "./components/fullCalendar.vue";


// 函数式组件
export * from "./components/confirm/index.js";


const component = [Calendar, CalendarMonth, fullCalendar]

const comp = {
    install(app) {
        component.forEach(i => {
            app.component(i.name, i)
        })
    }
}

export default comp

