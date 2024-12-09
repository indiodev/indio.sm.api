/* eslint-disable @typescript-eslint/explicit-function-return-type */

const EnrollmentSchoolFindController = () =>
  import('#controllers/enrollment/school/find.controller')
import router from '@adonisjs/core/services/router'

router
  .group(function () {
    router.get(':slug', [EnrollmentSchoolFindController])
  })
  .prefix('school')
  .prefix('enrollment')
