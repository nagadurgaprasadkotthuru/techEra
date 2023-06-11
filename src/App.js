import {Route, Switch} from 'react-router-dom'

import Home from './components/Home'
import CourseDetailsItem from './components/CourseDetailsItem'

import './App.css'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/courses/:id" component={CourseDetailsItem} />
  </Switch>
)

export default App
