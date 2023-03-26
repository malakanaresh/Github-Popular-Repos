// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {itemDetails} = props
  const {avatarUrl, forksCount, id, issuesCount, name, starsCount} = itemDetails
  return (
    <li className="malaka">
      <img src={avatarUrl} alt={name} className="avatar" />
      <p>{name}</p>
      <div className="naresh">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="star"
          className="stars"
        />
        <p>{starsCount} stars</p>
      </div>
      <div className="naresh">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="stars"
        />
        <p>{forksCount} forks</p>
      </div>
      <div className="naresh">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="stars"
        />
        <p>{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
