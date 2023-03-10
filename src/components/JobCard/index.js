import {Link} from 'react-router-dom'
import './index.css'

const jobCard = props => {
  const {details} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = details

  return (
    <li>
      <Link to={`/jobs/${id}`}>
        <div>
          <img src={companyLogoUrl} alt="company logo" />
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
          <p>{packagePerAnnum}LPA</p>
        </div>
        <hr />
        <h1>Description</h1>
        <p>{jobDescription}</p>
      </Link>
    </li>
  )
}
export default jobCard
