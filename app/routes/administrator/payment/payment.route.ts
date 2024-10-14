/* eslint-disable @typescript-eslint/explicit-function-return-type */
const AdministratorResponsibleController = () =>
  import('#controllers/administrator/responsible/responsible.controller')
const AdministratorPaymentController = () =>
  import('#controllers/administrator/payment/payment.controller')
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router
  .group(function () {
    router
      .group(function () {
        router.get('paginate', [AdministratorPaymentController, 'paginate'])
        router.patch(':id', [AdministratorPaymentController, 'update'])
      })
      .prefix('payment')
  })
  .prefix('administrator')
  .middleware(middleware.auth())
