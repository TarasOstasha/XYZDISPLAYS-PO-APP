import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        {/* <Route path="/users/:id">
          <UserProfile />
        </Route> */}
      </Switch>
    </Router>
  )
}

export default App
