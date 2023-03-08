import './index.css'

const Skills = props => {
  const {details} = props
  const {imageUrl, name} = details

  return (
    <li>
      <img src={imageUrl} alt={name} />
      <p>{name}</p>
    </li>
  )
}

export default Skills
