import React from 'react'
import axios from 'axios'

class Homedogs extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      apiLeague: '426'
    }
  }

  // Function to be run when you select EPL
  eng () {
    console.log('epl Chosen')
    this.setState({
      apiLeague: '426'
    })
  }

  // Function to be run when you select Laliga
  spain () {
    console.log('laliga Chosen')
    this.setState({
      apiLeague: '436'
    })
  }

  // Function to be run when you select Bundesliga
  german () {
    console.log('Bundesliga Chosen')
    this.setState({
      apiLeague: '430'
    })
  }

  // Mounting dashboard league api
  componentDidUpdate () {
    axios({
      headers: { 'X-Auth-Token': process.env.REACT_APP_footballAPI },
      method: 'get',
      url: 'http://api.football-data.org/v1/soccerseasons/' + this.state.apiLeague + '/teams',
      responseType: 'json',
      crossDomain: true
    })
  .then((response) => {
    let fixtures = response.data.teams
    console.log('this is from the first then', fixtures)
    return fixtures
  })
  .catch((err) => {
    console.log(err)
  })
  }

  render () {
    return (
      // div for the main layout component
      <div>
        <h3>Matches Filter</h3>
        {/* container for result module component */}
        <div>
          {/* container for the league choices */}
          <div>
            <label>Leagues</label>
            <form>
              <label>
                <input type='radio' name='league' value='epl' onClick={() => this.eng()} /> English
            </label>
              <label>
                <input type='radio' name='league' value='laliga' onClick={() => this.spain()} /> Spanish
            </label>
              <label>
                <input type='radio' name='league' value='germ' onClick={() => this.german()} /> German
            </label>
              <label> Team:
              <select>
                <option>Hull Ciy</option>
                <option>Man Ciy</option>
              </select>
              </label>
            </form>
          </div>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <table>
            <thead>
              <tr>
                <th>Return of Investment (ROI)</th>
                <th>5%</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    )
  }

}

export default Homedogs
