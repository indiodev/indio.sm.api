/* eslint-disable @typescript-eslint/explicit-function-return-type */
const AuthenticationSignUpController = () => import('#controllers/authentication/signup.controller')
const AuthenticationSignInController = () => import('#controllers/authentication/signin.controller')
const AuthenticationSignOutController = () =>
  import('#controllers/authentication/signout.controller')
const AuthenticationCheckExistFieldController = () =>
  import('#controllers/authentication/check-exist-field.controller')
const AuthenticationRecoveryVerifyCodeController = () =>
  import('#controllers/authentication/recovery/verify-code.controller')
const AuthenticationRecoveryResetPasswordController = () =>
  import('#controllers/authentication/recovery/reset-password.controller')
const AuthenticationRecoveryGenerateAndSendController = () =>
  import('#controllers/authentication/recovery/generate-and-send-code.controller')
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

router
  .group(function () {
    router.post('sign-up', [AuthenticationSignUpController])
    router.post('sign-in', [AuthenticationSignInController])
    router.post('sign-out', [AuthenticationSignOutController]).middleware(middleware.auth())

    router.post('check-exist-field', [AuthenticationCheckExistFieldController])

    router
      .group(() => {
        router.post('generate-and-send-code', [AuthenticationRecoveryGenerateAndSendController])
        router.post('verify-code', [AuthenticationRecoveryVerifyCodeController])
        router
          .post('reset-password', [AuthenticationRecoveryResetPasswordController])
          .middleware(middleware.auth())
      })
      .prefix('recovery')
  })
  .prefix('auth')
