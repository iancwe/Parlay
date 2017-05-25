import React, { Component } from 'react'
import './App.css'
import Homedogs from '../home/homedogs'
import profile from '../profile/profile'
import logout from '../log/logout'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <Router>
          <div>
            <ul>
              <li><NavLink to='/' activeClassName='selected' >Parlay</NavLink></li>
              <li><NavLink to='/profile' activeClassName='selected' >Profile</NavLink></li>
              <li><NavLink to='/logout' activeClassName='selected' >Log Out</NavLink></li>
            </ul>
            <hr />
            <div className='App-intro'>
              <Route exact path='/' component={Homedogs} />
              <Route exact path='/profile' component={profile} />
              <Route exact path='/logout' component={logout} />
            </div>
          </div>
        </Router>
      </div>
    )
  }
}

export default App
