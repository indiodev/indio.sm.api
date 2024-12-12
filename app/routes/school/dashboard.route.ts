/* eslint-disable @typescript-eslint/explicit-function-return-type */
const SchoolDashboardController = () => import('#controllers/school/dashboard.controller')
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router
  .group(function () {
    router.get('dashboard', [SchoolDashboardController])
  })
  .prefix('school')
  .middleware(middleware.auth())
