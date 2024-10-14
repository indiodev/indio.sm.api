/* eslint-disable @typescript-eslint/explicit-function-return-type */
const AdministratorResponsibleController = () =>
  import('#controllers/administrator/responsible/responsible.controller')
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router
  .group(function () {
    router
      .group(function () {
        router.get('paginate', [AdministratorResponsibleController, 'paginate'])
      })
      .prefix('responsible')
  })
  .prefix('administrator')
  .middleware(middleware.auth())
