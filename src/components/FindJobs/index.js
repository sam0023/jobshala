import {Component} from 'react'
import Profile from '../Profile'
import Header from '../Header'
import JobCard from '../JobCard'

import './index.css'

class FindJobs extends Components {
  state = {
    jobsList: [],
    employmentType: [],
    salaryRange: '',
    search: '',
  }

  render() {
    const {jobsList} = this.state
    return (
      <div>
        <Header />
        <div>
          <div>
            <Profile />
            {this.renderOptions()}
          </div>

          <div>
            {this.renderSearch()}
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
