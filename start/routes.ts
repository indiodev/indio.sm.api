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

import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    message: 'Bem vindos a Escolarize API',
  }
})
