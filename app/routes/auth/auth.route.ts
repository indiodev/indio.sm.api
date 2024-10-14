/* eslint-disable @typescript-eslint/explicit-function-return-type */
const AuthController = () => import('#controllers/auth/auth.controller')
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router
  .group(function () {
    router.post('sign-up', [AuthController, 'signUp'])
    router.post('sign-in', [AuthController, 'signIn'])
    router.post('sign-out', [AuthController, 'signOut']).middleware(middleware.auth())

    router.post('check-exist-field', [AuthController, 'checkExistField'])
  })
  .prefix('auth')
