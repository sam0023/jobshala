import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

const viewOptions = {
  initial: 'INITIAL',
  loading: 'Loading',
  success: 'SUCCESS',
  failure: 'Failure',
}

class Profile extends Component {
  state = {
    name: '',
    profileImgUrl: '',
    shortBio: '',
    activeView: viewOptions.initial,
  }

  componentDidMount() {
    this.profileApiRequest()
  }

  profileApiRequest = async () => {
    this.setState({activeView: viewOptions.loading})
    const accessToken = Cookies.get('jwtToken')
    // console.log(accessToken)
    const option = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
    const response = await fetch('https://apis.ccbp.in/profile', option)

    const data = await response.json()

    // console.log(`profile response ${data}`)

    if (response.ok) {
      const profileDetails = data.profile_details
      const {name} = profileDetails
      const profileImgUrl = profileDetails.profile_image_url
      const shortBio = profileDetails.short_bio
      this.setState({
        name,
        profileImgUrl,
        shortBio,
        activeView: viewOptions.success,
      })
    } else {
      this.setState({activeView: viewOptions.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader
        className="loader"
        type="ThreeDots"
        color="#ffffff"
        height="50"
        width="50"
      />
    </div>
  )

  renderSuccessView = () => {
    const {name, profileImgUrl, shortBio} = this.state

    return (
      <div>
        <img src={profileImgUrl} alt="profile" />
        <h1>{name}</h1>
        <p>{shortBio}</p>
      </div>
    )
  }

  renderFinalView = () => {
    const {activeView} = this.state

    // console.log(activeView)
    switch (activeView) {
      case viewOptions.loading:
        return this.renderLoadingView()
      case viewOptions.success:
        return this.renderSuccessView()
      case viewOptions.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  renderFailureView = () => (
    <div>
      <button type="button" onClick={this.profileApiRequest}>
        Retry
      </button>
    </div>
  )

  render() {
    return this.renderFinalView()
  }
}
export default Profile
