/* eslint-disable @typescript-eslint/explicit-function-return-type */

const ResponsiblePaymentPaginateController = () =>
  import('#controllers/responsible/payment/paginate.controller')
const ResponsiblePaymentUploadReceiptController = () =>
  import('#controllers/responsible/payment/upload-receipt.controller')
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router
  .group(function () {
    router
      .group(function () {
        router.get('paginate', [ResponsiblePaymentPaginateController])
        router.post(':id/upload-payment-document', [ResponsiblePaymentUploadReceiptController])
      })
      .prefix('payment')
  })
  .prefix('responsible')
  .middleware(middleware.auth())
