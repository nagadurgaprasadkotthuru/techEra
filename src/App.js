import {Route, Switch, Redirect} from 'react-router-dom'

import Home from './components/Home'
import CourseDetailsItem from './components/CourseDetailsItem'
import NotFound from './components/NotFound'

import './App.css'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/courses/:id" component={CourseDetailsItem} />
    <Route exact path="/bad-path" component={NotFound} />
    <Redirect to="/bad-path" />
  </Switch>
)

export default App
