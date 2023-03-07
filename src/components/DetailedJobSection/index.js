import {Component} from 'react'
import Cookies from 'js-cookie'
import SimilarJobCard from '../SimilarJobCard'
import Skills from '../Skills'
import './index.css'

const renderOption = {
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
    activeView: renderOption.initial,
  }

  componentDidMount() {
    this.requestDetailedJobApi()
  }

  handleSuccessRequest = data => {
    this.setState({activeView: renderOption.loading})
    const {skills} = data
    const updatedSkills = skills.map(eachSkill => ({
      imageUrl: eachSkill.image_url,
      name: eachSkill.name,
    }))
    const similarJobs = data.similar_jobs
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
      jobDetails: data,
      similarJobs: updatedSimilarJobs,
      skills: updatedSkills,
    })
  }

  requestDetailedJobApi = async () => {
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
    console.log('response')
    console.log(response)

    const data = response.json()
    if (response.ok) {
      this.handleSuccessRequest(data)
    }
  }

  render() {
    const {jobDetails, skills, similarJobs} = this.state

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
}
export default DetailedJobSection
