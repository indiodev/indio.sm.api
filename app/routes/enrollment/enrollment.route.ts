/* eslint-disable @typescript-eslint/explicit-function-return-type */

const EnrollmentCreateController = () => import('#controllers/enrollment/create.controller')
import router from '@adonisjs/core/services/router'

router
  .group(function () {
    router.post('create', [EnrollmentCreateController])
  })
  .prefix('enrollment')
