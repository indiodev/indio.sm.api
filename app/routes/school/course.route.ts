/* eslint-disable @typescript-eslint/explicit-function-return-type */
const SchoolCoursePaginateController = () =>
  import('#controllers/school/course/paginate.controller')
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router
  .group(function () {
    router
      .group(function () {
        router.get('paginate', [SchoolCoursePaginateController])
      })
      .prefix('course')
  })
  .prefix('school')
  .middleware(middleware.auth())
