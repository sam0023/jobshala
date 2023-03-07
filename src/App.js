import {Switch, Route} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import FindJobs from './components/FindJobs'
import DetailedJobSection from './components/DetailedJobSection'
import './App.css'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/jobs" component={FindJobs} />
    <ProtectedRoute exact path="/jobs/:id" component={DetailedJobSection} />
  </Switch>
)
export default App
