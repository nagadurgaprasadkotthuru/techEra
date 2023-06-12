import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CourseDetailsItem extends Component {
  state = {courseDetails: '', apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.detailsOfCourse()
  }

  detailsOfCourse = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const requestUrl = `https://apis.ccbp.in/te/courses/${id}`
    const response = await fetch(requestUrl)
    if (response.ok) {
      const data = await response.json()
      const courseDetails = data.course_details
      const formattedCourseDetails = {
        id: courseDetails.id,
        imageUrl: courseDetails.image_url,
        description: courseDetails.description,
        name: courseDetails.name,
      }
      this.setState({
        courseDetails: formattedCourseDetails,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        className="failure-img"
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        className="retry-button"
        type="button"
        onClick={this.detailsOfCourse}
      >
        Retry
      </button>
    </div>
  )

  renderLoaderView = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {courseDetails} = this.state
    const {name, imageUrl, description} = courseDetails
    return (
      <div className="success-view-container">
        <img className="course-details-image" alt={name} src={imageUrl} />
        <div className="heading-description-container">
          <h1 className="course-details-heading">{name}</h1>
          <p className="course-details-description">{description}</p>
        </div>
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
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="course-details-item-container">
        <Header />
        {this.renderSwitchView()}
      </div>
    )
  }
}

export default CourseDetailsItem
