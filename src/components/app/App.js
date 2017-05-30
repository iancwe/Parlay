import React, { Component } from 'react'
import './App.css'
import Homedogs from '../home/homedogs'
import profile from '../profile/profile'
import logout from '../log/logout'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import { Navbar, Nav, MenuItem } from 'react-bootstrap'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <Router>
          <div>
            <Navbar>
              <Navbar.Header>
                <Navbar.Brand>
                  <NavLink to='/'>Parlay</NavLink>
                </Navbar.Brand>
                <Navbar.Toggle />
              </Navbar.Header>
              <Navbar.Collapse>
                <Nav pullRight>
                  <MenuItem><NavLink to='/profile' activeClassName='selected' >Profile</NavLink></MenuItem>
                  <MenuItem><NavLink to='/logout' activeClassName='selected' >Log Out</NavLink></MenuItem>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
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
