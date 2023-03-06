import {Component} from 'react'
import './index.css'

class Profile extends Component {
  state = {
    name: '',
    profileImgUrl: '',
    shortBio: '',
  }

  componentDidMount() {
    this.profileApiRequest()
  }

  profileApiRequest = async () => {
    const response = await fetch('https://apis.ccbp.in/profile')

    const data = response.json()

    if (response.ok) {
      const profileDetails = data.profile_details
      const {name} = profileDetails
      const profileImgUrl = profileDetails.profile_image_url
      const shortBio = profileDetails.short_bio
      this.setState({name, profileImgUrl, shortBio})
    }
  }

  render() {
    const {name, profileImgUrl, shortBio} = this.state

    return (
      <div>
        <img src={profileImgUrl} alt="profile" />
        <h1>{name}</h1>
        <p>{shortBio}</p>
      </div>
    )
  }
}
export default Profile
