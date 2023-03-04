import {Link} from 'react-router-dom'
import {Component} from 'react'
import './index.css'

class Login extends Component {
  onSubmitForm = () => {
    const {history} = this.props
    history.push('/')
  }

  render() {
    return (
      <div>
        <div>
          <img />
          <form onSubmit={this.onSubmitForm}>
            <label htmlFor="username">USERNAME</label>
            <input id="username" type="text" />
            <label htmlFor="password">PASSWORD</label>
            <input id="password" type="password" />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    )
  }
}
export default Login
