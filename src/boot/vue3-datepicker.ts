import Datepicker from 'vue3-datepicker';
import { boot } from 'quasar/wrappers'

export default boot(({ app }) => {
  app.use(Datepicker)
})