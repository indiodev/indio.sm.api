/* eslint-disable @typescript-eslint/explicit-function-return-type */

const AdministratorResponsiblePaginateController = () =>
  import('#controllers/administrator/responsible/responsible.controller')
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router
  .group(function () {
    router
      .group(function () {
        router.get('paginate', [AdministratorResponsiblePaginateController])
      })
      .prefix('responsible')
  })
  .prefix('administrator')
  .middleware(middleware.auth())
