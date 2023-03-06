import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'

const Header = props => {
  const onLogout = () => {
    Cookies.remove('jswToken')
    const {history} = props
    history.replace('/login')
    console.log('in logout')
  }

  return (
    <nav>
      <img
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        alt="website logo"
      />
      <ul>
        <Link to="/">
          <li>Home</li>
        </Link>

        <Link to="/login">
          <li>Jobs</li>
        </Link>
      </ul>
      <button type="button" onClick={onLogout}>
        logout
      </button>
    </nav>
  )
}
export default withRouter(Header)
