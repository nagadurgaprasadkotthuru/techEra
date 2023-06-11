import {Link} from 'react-router-dom'

import './index.css'

const Course = props => {
  const {courseDetails} = props
  const {id, logoUrl, name} = courseDetails
  return (
    <li className="course-list-item">
      <Link to={`/courses/${id}`} className="nav-link">
        <img className="course-logo" alt={name} src={logoUrl} />
        <p className="name">{name}</p>
      </Link>
    </li>
  )
}

export default Course
