import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import SimilarJobCard from '../SimilarJobCard'
import Skills from '../Skills'
import './index.css'

const viewOptions = {
  initial: 'INITIAL',
  loading: 'Loading',
  success: 'SUCCESS',
  failure: 'Failure',
}

class DetailedJobSection extends Component {
  state = {
    jobDetails: {},
    similarJobs: [],
    skills: [],
    activeView: viewOptions.initial,
  }

  componentDidMount() {
    this.requestDetailedJobApi()
  }

  handleSuccessRequest = data => {
    this.setState({activeView: viewOptions.loading})
    console.log(data)
    const jobDetails = data.job_details
    const {skills} = jobDetails
    const updatedSkills = skills.map(eachSkill => ({
      imageUrl: eachSkill.image_url,
      name: eachSkill.name,
    }))
    const similarJobs = data.similar_jobs
    console.log('similar jobs')
    console.log(similarJobs)
    const updatedSimilarJobs = similarJobs.map(eachJob => ({
      companyLogoUrl: eachJob.company_logo_url,
      employmentType: eachJob.employment_type,
      id: eachJob.id,
      jobDescription: eachJob.job_description,
      location: eachJob.location,
      rating: eachJob.rating,
      title: eachJob.title,
    }))
    this.setState({
      jobDetails,
      similarJobs: updatedSimilarJobs,
      skills: updatedSkills,
      activeView: viewOptions.success,
    })
  }

  requestDetailedJobApi = async () => {
    this.setState({activeView: viewOptions.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const accessToken = Cookies.get('jwtToken')
    const api = `https://apis.ccbp.in/jobs/${id}`
    const option = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
    const response = await fetch(api, option)
    // console.log('response')
    // console.log(response)

    const data = await response.json()
    if (response.ok) {
      this.handleSuccessRequest(data)
    } else {
      this.setState({activeView: viewOptions.failure})
    }
  }

  renderSuccessView = () => {
    // console.log('in sucessView')
    const {jobDetails, skills, similarJobs} = this.state
    console.log(this.state)
    const companyLogoUrl = jobDetails.company_logo_url
    const companyWebsiteUrl = jobDetails.company_website_url
    const employmentType = jobDetails.employment_type
    const {id, location, rating, title} = jobDetails
    const jobDescription = jobDetails.job_description
    const lifeAtCompany = jobDetails.life_at_company
    const packagePerAnnum = jobDetails.package_per_annum

    return (
      <div>
        <div>
          <img src={`${companyLogoUrl}`} alt="company logo" />
          <div>
            <h1>{title}</h1>
            <div>
              <p>{rating}</p>
            </div>
          </div>
        </div>
        <div>
          <div>
            <div>
              <p>{location}</p>
            </div>
            <div>
              <p>{employmentType}</p>
            </div>
          </div>
          <p>{packagePerAnnum}</p>
        </div>
        <hr />
        <div>
          <div>
            <h1>Description</h1>
            <div>
              <p>Visit</p>
            </div>
          </div>
          <p>{jobDescription}</p>
          <h1>Skills</h1>
          <ul>
            {skills.map(eachItem => (
              <Skills key={eachItem.name} details={eachItem} />
            ))}
          </ul>
          <h1>Life at Company</h1>
          <div>
            <p>{lifeAtCompany.description}</p>
            <img src={lifeAtCompany.image_url} alt="life at company" />
          </div>
          <h1>Similar Jobs</h1>
          <ul>
            {similarJobs.map(eachItem => (
              <SimilarJobCard key={eachItem.id} details={eachItem} />
            ))}
          </ul>
        </div>
      </div>
    )
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

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button type="button">Retry</button>
    </div>
  )

  renderFinalView = () => {
    // console.log(`in render final view`)

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
    //   switch (key) {
    //       case value:

    //           break;

    //       default:
    //           break;
    //   }
  }

  render() {
    return this.renderFinalView()
  }
}
export default DetailedJobSection
