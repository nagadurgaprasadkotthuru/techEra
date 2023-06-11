import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Header from '../Header'
import Course from '../Course'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {coursesList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getTechEra()
  }

  getTechEra = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const requestUrl = 'https://apis.ccbp.in/te/courses'
    const response = await fetch(requestUrl)
    const data = await response.json()
    const {courses} = data
    const formattedCourses = courses.map(eachItem => ({
      id: eachItem.id,
      logoUrl: eachItem.logo_url,
      name: eachItem.name,
    }))
    this.setState({
      coursesList: formattedCourses,
      apiStatus: apiStatusConstants.success,
    })
  }

  renderLoaderView = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {coursesList} = this.state
    return (
      <div className="success-view-container">
        <h1 className="heading">Courses</h1>
        <ul className="courses-container">
          {coursesList.map(eachItem => (
            <Course courseDetails={eachItem} key={eachItem.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderSwitchView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="home-bg-container">
        <Header />
        {this.renderSwitchView()}
      </div>
    )
  }
}

export default Home
