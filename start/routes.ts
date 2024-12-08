/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import '#routes/administrator/payment/payment.route'
import '#routes/administrator/responsible/responsible.route'
import '#routes/auth/auth.route'
import '#routes/responsible/payment.route'
import '#routes/enrollment/enrollment.route'

import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    message: 'Bem vindos ao JEDAIS API',
  }
})
