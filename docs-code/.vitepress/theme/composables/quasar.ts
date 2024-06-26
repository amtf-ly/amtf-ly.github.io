import { Cookies, Dark, Quasar, Notify ,LocalStorage} from "quasar"
// Import icon libraries
import "@quasar/extras/material-icons/material-icons.css"
// import 'animate.css';
// Import Quasar css
// import 'quasar/dist/quasar.css'
// import "quasar/src/css/index.sass"
import { App } from "vue"
import quasarLang from "quasar/lang/zh-CN"

export function initQuasar(app: App) {
    app.use(
        Quasar,
        {
            lang: quasarLang,
            plugins: {
                Dark,
                Cookies,
                Notify,
                LocalStorage,
            },
        },
        {
            req: {
                headers: {},
            },
        }
    )
}
