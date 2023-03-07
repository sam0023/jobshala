import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Profile from '../Profile'

import EmploymentOptions from '../EmploymentOptions'
import SalaryOptions from '../SalaryOptions'
import Header from '../Header'
import JobCard from '../JobCard'

import './index.css'
// import {async} from 'rxjs'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const views = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class FindJobs extends Component {
  state = {
    jobsList: [],
    employmentType: [],
    minimumPackage: '',
    apiSearch: '',
    activeSearch: '',
    activeView: views.initial,
  }

  componentDidMount() {
    this.apiRequest()
  }

  apiRequest = async () => {
    this.setState({activeView: views.loading})
    const {employmentType, minimumPackage, apiSearch} = this.state
    console.log(`api search ${apiSearch}`)

    const accessToken = Cookies.get('jwtToken')
    // console.log('token')
    // console.log(accessToken)
    const option = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
    const api = `https://apis.ccbp.in/jobs?employment_type=${employmentType.join(
      ',',
    )}&minimum_package=${minimumPackage}&search=${apiSearch}`

    const response = await fetch(api, option)
    // console.log('response')
    // console.log(response)
    const data = await response.json()
    // console.log(data)

    if (response.ok) {
      const {jobs} = data

      const updatedData = jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))

      this.setState({jobsList: updatedData, activeView: views.success})
    } else {
      this.setState({activeView: views.failure})
    }
  }

  onChangeEmploymentOption = (option, isSelected) => {
    const {employmentType} = this.state
    console.log(`employmentType ${employmentType}`)
    let updatedEmploymentType
    if (isSelected) {
      updatedEmploymentType = [...employmentType, option]
    } else {
      updatedEmploymentType = employmentType.filter(
        eachItem => eachItem !== option,
      )
    }
    this.setState({employmentType: updatedEmploymentType}, this.apiRequest)
  }

  onChangePackageType = minimumPackage => {
    this.setState({minimumPackage}, this.apiRequest)
  }

  onChangeSearch = event => {
    const activeSearch = event.target.value
    this.setState({activeSearch})
  }

  onClickSearch = () => {
    const {activeSearch} = this.state
    this.setState({apiSearch: activeSearch}, this.apiRequest)
  }

  onPressEnter = event => {
    if (event.key === 'Enter') {
      const {activeSearch} = this.state
      this.setState({apiSearch: activeSearch}, this.apiRequest)
    }
  }

  renderLoadingView = () => {
    console.log('print loading')
    return (
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
  }

  renderSuccessView = () => {
    const {jobsList} = this.state

    if (jobsList.length === 0) {
      return (
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
          />
          <h1>No Jobs Found</h1>
          <p>We could not find any jobs. Try other filters</p>
        </div>
      )
    }

    return jobsList.map(eachJob => (
      <JobCard key={eachJob.id} details={eachJob} />
    ))
  }

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button type="button" onClick={this.apiRequest}>
        Retry
      </button>
    </div>
  )

  renderFinalView = () => {
    const {activeView} = this.state

    switch (activeView) {
      case views.loading:
        return this.renderLoadingView()

      case views.success:
        return this.renderSuccessView()
      case views.failure:
        return this.renderFailureView()

      default:
        return null
    }
  }

  render() {
    // const {jobsList} = this.state
    return (
      <div>
        <Header />
        <div>
          <div>
            <Profile />
            <hr />
            <h1>Type of Employment</h1>
            <ul>
              {employmentTypesList.map(eachItem => (
                <EmploymentOptions
                  key={eachItem.employmentTypeId}
                  details={eachItem}
                  onChangeEmploymentOption={this.onChangeEmploymentOption}
                />
              ))}
            </ul>

            <hr />
            <h1>Salary Range</h1>

            <SalaryOptions
              options={salaryRangesList}
              onChangePackageType={this.onChangePackageType}
            />
          </div>

          <div>
            <div>
              <input
                type="search"
                onChange={this.onChangeSearch}
                onKeyDown={this.onPressEnter}
              />

              <button
                type="button"
                onClick={this.onClickSearch}
                data-testid="searchButton"
              >
                <BsSearch />
              </button>
            </div>
            <ul>
              {this.renderFinalView()}
              {/* {jobsList.map(eachJob => (
                <JobCard key={eachJob.id} details={eachJob} />
              ))} */}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default FindJobs
