/* eslint-disable @typescript-eslint/explicit-function-return-type */
const ResponsiblePaymentController = () => import('#controllers/responsible/payment.controller')
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router
  .group(function () {
    router
      .group(function () {
        router.get('paginate', [ResponsiblePaymentController, 'paginate'])
        router.post(':id/upload-proof-of-payment-document', [
          ResponsiblePaymentController,
          'uploadProofOfPaymentDocument',
        ])
      })
      .prefix('payment')
  })
  .prefix('responsible')
  .middleware(middleware.auth())
