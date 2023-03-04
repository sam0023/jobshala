import Cookies from 'js-cookie'
import {Redirect, Route} from 'react-router-dom'

const ProtectedRoute = props => {
  if (Cookies.get('jswToken') === undefined) {
    console.log('protected to /login')
    return <Redirect to="/login" />
  }

  return <Route {...props} />
}
export default ProtectedRoute
