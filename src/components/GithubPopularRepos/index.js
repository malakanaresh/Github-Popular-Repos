import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

// Write your code here

class GithubPopularRepos extends Component {
  state = {
    repositoryList: [],
    languages: languageFiltersData[0].id,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.callApiItems()
  }

  renderPrimeDealsList = () => {
    const {repositoryList} = this.state
    return (
      <div>
        <h1>Popular</h1>
        <ul className="all-languages">
          {languageFiltersData.map(eachLanguage => (
            <LanguageFilterItem
              key={eachLanguage.id}
              allLanguages={eachLanguage}
              onChangeLanguage={this.onChangeLanguage}
            />
          ))}
        </ul>

        <ul>
          {repositoryList.map(eachItem => (
            <RepositoryItem key={eachItem.id} itemDetails={eachItem} />
          ))}
        </ul>
      </div>
    )
  }

  renderPrimeDealsFailureView = () => (
    <div>
      <h1>Popular</h1>
      <ul className="all-languages">
        {languageFiltersData.map(eachLanguage => (
          <LanguageFilterItem
            key={eachLanguage.id}
            allLanguages={eachLanguage}
            onChangeLanguage={this.onChangeLanguage}
          />
        ))}
      </ul>

      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure"
      />
      <h1>Something went wrong</h1>
    </div>
  )

  renderLoadingView = () => (
    <div>
      <h1>Popular</h1>
      <ul className="all-languages">
        {languageFiltersData.map(eachLanguage => (
          <LanguageFilterItem
            key={eachLanguage.id}
            allLanguages={eachLanguage}
            onChangeLanguage={this.onChangeLanguage}
          />
        ))}
      </ul>
      <div className="products-loader-container">
        <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
      </div>
    </div>
  )

  onChangeLanguage = id => {
    const newLanguage = languageFiltersData.filter(eachTwo => eachTwo.id === id)
    this.setState({languages: newLanguage[0].language})
    this.callApiItems()
  }

  callApiItems = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const {languages} = this.state
    const url = `https://apis.ccbp.in/popular-repos?language=${languages}`
    const response = await fetch(url)
    const data = await response.json()
    if (response.ok === true) {
      const updatedRepos = data.popular_repos.map(repo => ({
        avatarUrl: repo.avatar_url,
        forksCount: repo.forks_count,
        id: repo.id,
        issuesCount: repo.issues_count,
        name: repo.name,
        starsCount: repo.stars_count,
      }))

      this.setState({repositoryList: updatedRepos})
      this.setState({
        apiStatus: apiStatusConstants.success,
      })
    } else if (response.status === 401) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  render() {
    const {languages, apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderPrimeDealsList()
      case apiStatusConstants.failure:
        return this.renderPrimeDealsFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.initial:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}

export default GithubPopularRepos
