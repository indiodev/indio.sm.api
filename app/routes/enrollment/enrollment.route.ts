/* eslint-disable @typescript-eslint/explicit-function-return-type */
const EnrollmentController = () => import('#controllers/enrollment/enrollment.controller')
import router from '@adonisjs/core/services/router'

router
  .group(function () {
    router.post('create-or-update', [EnrollmentController, 'createOrUpdate'])
  })
  .prefix('enrollment')
