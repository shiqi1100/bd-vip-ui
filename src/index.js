import Calendar from "./components/calendar.vue";
import CalendarMonth from "./components/CalendarMonth.vue";
import fullCalendar from "./components/fullCalendar.vue";


// 函数式组件
import confirm from "./components/confirm";


const component = [Calendar, CalendarMonth, fullCalendar]

const comp = {
    install(app) {
        component.forEach(i => {
            app.component(i.name, Calendar)
        })
    }
}

export default comp


export {
    confirm
}