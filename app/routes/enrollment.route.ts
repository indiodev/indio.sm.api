/* eslint-disable @typescript-eslint/explicit-function-return-type */
const EnrollmentCreateOrUpdateController = () =>
  import('#controllers/enrollment/create-or-update.controller')
import router from '@adonisjs/core/services/router'

router
  .group(function () {
    router.post('create-or-update', [EnrollmentCreateOrUpdateController])
  })
  .prefix('enrollment')
