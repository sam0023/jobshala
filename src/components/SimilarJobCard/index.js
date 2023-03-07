import './index.css'

const SimilarJobCard = props => {
  const {details} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = details

  return (
    <li>
      <div>
        <div>
          <img src={companyLogoUrl} alt="company logo" />
          <div>
            <h1>{title}</h1>
            <div>
              <p>{rating}</p>
            </div>
          </div>
        </div>
        <h1>Description</h1>
        <p>{jobDescription}</p>
        <div>
          <div>
            <p>{location}</p>
          </div>
          <div>
            <p>{employmentType}</p>
          </div>
        </div>
      </div>
    </li>
  )
}
export default SimilarJobCard
