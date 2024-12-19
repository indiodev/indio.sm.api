/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import '#routes/administrator/payment.route'
import '#routes/administrator/responsible.route'
import '#routes/authentication.route'
import '#routes/enrollment/enrollment.route'
import '#routes/enrollment/school.route'
import '#routes/responsible/payment.route'
import '#routes/school/course.route'
import '#routes/school/dashboard.route'
import '#routes/school/responsible.route'
import '#routes/school/student.route'

import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    message: 'Bem vindos a Escolarize API',
  }
})
