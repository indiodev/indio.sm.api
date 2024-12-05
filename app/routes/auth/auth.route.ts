/* eslint-disable @typescript-eslint/explicit-function-return-type */
const AuthController = () => import('#controllers/auth/auth.controller')
const AuthRecoveryController = () => import('#controllers/auth/auth_recovery.controller')
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router
  .group(function () {
    router.post('sign-up', [AuthController, 'signUp'])
    router.post('sign-in', [AuthController, 'signIn'])
    router.post('sign-out', [AuthController, 'signOut']).middleware(middleware.auth())

    router.post('check-exist-field', [AuthController, 'checkExistField'])

    router
      .group(() => {
        router.post('generate-and-send-code', [AuthRecoveryController, 'generateAndSendCode'])
        router.post('verify-code', [AuthRecoveryController, 'verifyCode'])
        router
          .post('reset-password', [AuthRecoveryController, 'resetPassword'])
          .middleware(middleware.auth())
      })
      .prefix('recovery')
  })
  .prefix('auth')
