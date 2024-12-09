/* eslint-disable @typescript-eslint/explicit-function-return-type */
// type AdministradorPaymentImport =
//   typeof import('#controllers/administrator/payment/update.controller')
// const AdministratorPaymentController = (): Promise<AdministradorPaymentImport> =>
//   import('#controllers/administrator/payment/update.controller')
const AdministratorPaymentPaginateController = () =>
  import('#controllers/administrator/payment/paginate.controller')
const AdministratorPaymentUpdateController = () =>
  import('#controllers/administrator/payment/update.controller')
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router
  .group(function () {
    router
      .group(function () {
        router.get('paginate', [AdministratorPaymentPaginateController])
        router.patch(':id', [AdministratorPaymentUpdateController])
      })
      .prefix('payment')
  })
  .prefix('administrator')
  .middleware(middleware.auth())
