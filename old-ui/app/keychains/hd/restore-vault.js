// const inherits = require('util').inherits
// const PersistentForm = require('../../../lib/persistent-form')
// const connect = require('react-redux').connect
// const h = require('react-hyperscript')
// const actions = require('../../../../ui/app/actions')

// module.exports = connect(mapStateToProps)(RestoreVaultScreen)

// inherits(RestoreVaultScreen, PersistentForm)
// function RestoreVaultScreen () {
//   PersistentForm.call(this)
// }

// function mapStateToProps (state) {
//   return {
//     warning: state.appState.warning,
//     forgottenPassword: state.appState.forgottenPassword,
//   }
// }

// RestoreVaultScreen.prototype.render = function () {
//   var state = this.props
//   this.persistentFormParentId = 'restore-vault-form'

//   return (

//     h('div', {
//       style: {
//         width: '100%',
//       },
//     }, [
//       h('.section-title', { style: {
//         height: '1px',
//         width: '100%',
//       }}),
//       h('.initialize-screen.flex-column.flex-center.flex-grow', {
//         style: {
//           paddingLeft: '30px',
//           paddingRight: '30px',
//         },
//       }, [
//         h('h3.flex-center', {
//           style: {
//             fontFamily: 'Nunito SemiBold',
//             background: '#ffffff',
//             color: '#333333',
//             width: '100%',
//             fontSize: '16px',
//             padding: 30,
//           },
//         }, [
//           h('.page-subtitle', 'Restore Vault'),
//         ]),

//         // wallet seed entry
//         h('h3.flex-left', {
//           style: {
//             width: '100%',
//             marginBottom: '20px',
//             fontFamily: 'Nunito SemiBold',
//           },
//         }, 'Wallet Seed'),
//         h('textarea.twelve-word-phrase', {
//           placeholder: 'Enter your secret twelve word phrase here to restore your vault.',
//         }),

//         // password
//         h('input.large-input', {
//           type: 'password',
//           id: 'password-box',
//           placeholder: 'New Password (min 8 chars)',
//           dataset: {
//             persistentFormId: 'password',
//           },
//           style: {
//             width: '100%',
//             marginTop: 20,
//             border: '1px solid #e2e2e2',
//           },
//         }),

//         // confirm password
//         h('input.large-input', {
//           type: 'password',
//           id: 'password-box-confirm',
//           placeholder: 'Confirm Password',
//           onKeyPress: this.createOnEnter.bind(this),
//           dataset: {
//             persistentFormId: 'password-confirmation',
//           },
//           style: {
//             width: '100%',
//             marginTop: 20,
//             border: '1px solid #e2e2e2',
//           },
//         }),

//         (state.warning) && (
//           h('div', {
//             style: {
//               padding: '20px 0 0',
//               width: '100%',
//             },
//           }, [
//             h('div.error.in-progress-notification', state.warning),
//           ])
//         ),

//         // submit

//         h('.flex-row.flex-space-between.flex-right', {
//           style: {
//             marginTop: 20,
//             width: '100%',
//           },
//         }, [

//           // cancel
//           h('button.btn-violet', {
//             onClick: this.showInitializeMenu.bind(this),
//           }, 'Cancel'),

//           // submit
//           h('button', {
//             onClick: this.createNewVaultAndRestore.bind(this),
//           }, 'Ok'),

//         ]),
//       ]),
//     ])
//   )
// }

// RestoreVaultScreen.prototype.showInitializeMenu = function () {
//   if (this.props.forgottenPassword) {
//     this.props.dispatch(actions.backToUnlockView())
//   } else {
//     this.props.dispatch(actions.showInitializeMenu())
//   }
// }

// RestoreVaultScreen.prototype.createOnEnter = function (event) {
//   if (event.key === 'Enter') {
//     this.createNewVaultAndRestore()
//   }
// }

// RestoreVaultScreen.prototype.createNewVaultAndRestore = function () {
//   // check password
//   var passwordBox = document.getElementById('password-box')
//   var password = passwordBox.value
  
//   var passwordConfirmBox = document.getElementById('password-box-confirm')
//   var passwordConfirm = passwordConfirmBox.value
//   if (password.length < 8) {
//     this.warning = 'Password not long enough'
//     this.props.dispatch(actions.displayWarning(this.warning))
//     return
//   }
//   if (password !== passwordConfirm) {
//     this.warning = 'Passwords don\'t match'
//     this.props.dispatch(actions.displayWarning(this.warning))
//     return
//   }
//   // check seed
//   var seedBox = document.querySelector('textarea.twelve-word-phrase')
//   var seed = seedBox.value.trim()

//   // true if the string has more than a space between words.
//   if (seed.split('  ').length > 1) {
//     this.warning = 'there can only be a space between words'
//     this.props.dispatch(actions.displayWarning(this.warning))
//     return
//   }
//   // true if seed contains a character that is not between a-z or a space
//   if (!seed.match(/^[a-z ]+$/)) {
//     this.warning = 'seed words only have lowercase characters'
//     this.props.dispatch(actions.displayWarning(this.warning))
//     return
//   }
//   if (seed.split(' ').length !== 12) {
//     this.warning = 'seed phrases are 12 words long'
//     this.props.dispatch(actions.displayWarning(this.warning))
//     return
//   }
//   // submit
//   this.warning = null
//   this.props.dispatch(actions.displayWarning(this.warning))
//   this.props.dispatch(actions.createNewVaultAndRestore(password, seed))
// }

const inherits = require('util').inherits
const Component = require('react').Component
const h = require('react-hyperscript')
const connect = require('react-redux').connect
const actions = require('../../../../ui/app/actions')

module.exports = connect(mapStateToProps)(ConfirmChangePassword)

function mapStateToProps (state) {
  return {
    metamask: state.metamask,
    warning: state.appState.warning,
  }
}

inherits(ConfirmChangePassword, Component)
function ConfirmChangePassword () {
  Component.call(this)
}

ConfirmChangePassword.prototype.render = function () {
  const state = this.props
  const passwordInputAdditionalStyle = {
    width: '100%',
    marginTop: 10,
    marginBottom: 20,
  }
  return h('.flex-column.flex-grow', {
    style: {
      overflowX: 'auto',
      overflowY: 'hidden',
    },
  }, [
    // subtitle and nav
    h('.section-title.flex-row.flex-center', [
      h('i.fa.fa-arrow-left.fa-lg.cursor-pointer', {
        onClick: () => {
          this.props.dispatch(actions.showAccountsPage())
        },
        style: {
          position: 'absolute',
          left: '30px',
        },
      }),
      h('h2.page-subtitle', 'Change Password'),
    ]),
    h('div', {
      style: {
        margin: '0 30px',
      },
    }, [
      h('.error', {
        style: {
          display: state.warning ? 'block' : 'none',
        },
      }, state.warning),
      //  wallet seed entry
        h('h3.flex-left', {
          style: {
            width: '100%',
            marginBottom: '0px',
            fontFamily: 'Nunito SemiBold',
          },
        }, 'Wallet Seed'),
      h('textarea.twelve-word-phrase', {
        style: {
          width: '100%',
          height: '100px',
        },
          placeholder: 'Enter your secret twelve word phrase here to restore your vault.',
        }),

      h('span', 'Old password'),
      h('input.large-input', {
        type: 'password',
        id: 'old-password-box',
        ref: 'OldPasswordBox',
        style: passwordInputAdditionalStyle,
      }),
      h('span', 'New password'),
      h('input.large-input', {
        type: 'password',
        id: 'new-password-box',
        ref: 'NewPasswordBox',
        style: passwordInputAdditionalStyle,
      }),
      h('span', 'Confirm new password'),
      h('input.large-input', {
        type: 'password',
        id: 'password-box-confirm',
        ref: 'PasswordBoxConfirm',
        style: passwordInputAdditionalStyle,
        onKeyPress: this.createOnEnter.bind(this),
      }),
    ]),
    
    h('.flex-row.flex-right', {
      style: {
        marginRight: '30px',
      },
    }, [
      h('button.btn-violet',
        {
          onClick: () => {
            this.props.dispatch(actions.showAccountsPage())
          },
        },
        'No'),
      h('button',
        {
          onClick: () => {
            this.ChangePassword()
          },
        },
        'Yes'),
    ]),
  ])
}

ConfirmChangePassword.prototype.componentWillUnmount = function () {
  this.props.dispatch(actions.displayWarning(''))
}

ConfirmChangePassword.prototype.createOnEnter = function (event) {
  if (event.key === 'Enter') {
    this.ChangePassword()
  }
}

ConfirmChangePassword.prototype.ChangePassword = function () {
  const { props, refs } = this
  const oldPasswordBox = refs.OldPasswordBox
  const oldPassword = oldPasswordBox.value
  const newPasswordBox = refs.NewPasswordBox
  const newPassword = newPasswordBox.value
  const newPasswordConfirmBox = refs.PasswordBoxConfirm
  const newPasswordConfirm = newPasswordConfirmBox.value

  if (newPassword.length < 8) {
    this.warning = 'Password not long enough'

    props.dispatch(actions.displayWarning(this.warning))
    return
  }
  if (newPassword !== newPasswordConfirm) {
    this.warning = 'Passwords don\'t match'
    props.dispatch(actions.displayWarning(this.warning))
    return
  }
  if (newPassword === oldPassword) {
    this.warning = 'New password should be different from previous password'
    props.dispatch(actions.displayWarning(this.warning))
    return
  }
  props.dispatch(actions.changePassword(oldPassword, newPassword))
    .then(() => {
      props.dispatch(actions.showAccountsPage())
    })
    .catch((err) => {
      this.warning = err.message
      props.dispatch(actions.displayWarning(this.warning))
    })
}
