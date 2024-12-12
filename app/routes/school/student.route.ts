/* eslint-disable @typescript-eslint/explicit-function-return-type */
const SchoolStudentPaginateController = () =>
  import('#controllers/school/school/paginate.controller')
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router
  .group(function () {
    router
      .group(function () {
        router.get('paginate', [SchoolStudentPaginateController])
      })
      .prefix('student')
  })
  .prefix('school')
  .middleware(middleware.auth())
