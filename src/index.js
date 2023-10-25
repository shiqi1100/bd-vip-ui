import Calendar from "./components/calendar.vue";

const component = [Calendar]

const comp = {
    install(app) {
        component.forEach(i => {
            app.component(i.name, Calendar)
        })
    }
}

export default comp
