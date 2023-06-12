import Header from '../Header'

import './index.css'

const NotFound = () => (
  <div className="not-found-container1">
    <Header />
    <div className="not-found-container2">
      <img
        className="not-found-img"
        alt="not found"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
      />
      <h1 className="not-found-heading">Page Not Found</h1>
      <p className="not-found-description">
        We are sorry, the page you requested could not be found.
      </p>
    </div>
  </div>
)

export default NotFound
