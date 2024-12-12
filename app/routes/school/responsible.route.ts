/* eslint-disable @typescript-eslint/explicit-function-return-type */

const SchoolResponsiblePaginateController = () =>
  import('#controllers/school/responsible/paginate.controller')
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router
  .group(function () {
    router
      .group(function () {
        router.get('paginate', [SchoolResponsiblePaginateController])
      })
      .prefix('responsible')
  })
  .prefix('school')
  .middleware(middleware.auth())
