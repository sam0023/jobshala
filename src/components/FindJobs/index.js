import {Component} from 'react'
import Cookies from 'js-cookie'
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

class FindJobs extends Component {
  state = {
    jobsList: [],
    employmentType: [],
    minimumPackage: '',
    apiSearch: '',
    activeSearch: '',
  }

  componentDidMount() {
    this.apiRequest()
  }

  apiRequest = async () => {
    const {employmentType, minimumPackage, apiSearch} = this.state

    const accessToken = Cookies.get('jwtToken')
    console.log('token')
    console.log(accessToken)
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
    console.log('response')
    console.log(response)
    const data = await response.json()
    console.log(data)

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

      this.setState({jobsList: updatedData})
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

  render() {
    const {jobsList} = this.state
    return (
      <div>
        <Header />
        <div>
          <div>
            <Profile />
            <hr />
            <p>Types of Employment</p>
            {employmentTypesList.map(eachItem => (
              <EmploymentOptions
                key={eachItem.employmentTypeId}
                details={eachItem}
                onChangeEmploymentOption={this.onChangeEmploymentOption}
              />
            ))}

            <hr />
            <p>Salary Range</p>

            <SalaryOptions
              options={salaryRangesList}
              onChangePackageType={this.onChangePackageType}
            />
          </div>

          <div>
            {/* {this.renderSearch()} */}
            {jobsList.map(eachJob => (
              <JobCard key={eachJob.id} details={eachJob} />
            ))}
          </div>
        </div>
      </div>
    )
  }
}
export default FindJobs
