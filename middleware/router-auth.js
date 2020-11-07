// This is `@middleware/router-auth.js`

export default function({ store, redirect, route }) {
    store.state.user != null && route.name == 'login' ? redirect('/user') : ''
    store.state.user == null && isUserRoute(route) ? redirect('/login') : ''
  }
  
  function isUserRoute(route) {
    if (route.matched.some(record => record.path == '/user')) {
      return true
    }
  }